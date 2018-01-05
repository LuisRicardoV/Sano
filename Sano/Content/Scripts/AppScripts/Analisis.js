window.AnalisisData = {
    UrlTrades: undefined,
    myVar: undefined

};

window.Analisis = {
    Init: function (parameters) {
        $.extend(AnalisisData, parameters);
        $('body').on('click', '#btnAnalisis', this.Encender);

        $('body').on('click', '#btnApagar', this.Apagar);


        $('#ChartBuy').trigger('configure',
        {
            "min": 0,
            "max": 100,
            "fgColor": "#4e9c0c",
            "skin": "tron",
            "cursor": true
        });

        $('#ChartSell').trigger('configure',
       {
           "min": 0,
           "max": 100,
           "fgColor": "#4e9c0c",
           "skin": "tron",
           "cursor": true
       });

          $('#ChartBuy25').trigger('configure',
        {
            "min": 0,
            "max": 100,
            "fgColor": "#4e9c0c",
            "skin": "tron",
            "cursor": true
        });

        $('#ChartSell25').trigger('configure',
       {
           "min": 0,
           "max": 100,
           "fgColor": "#4e9c0c",
           "skin": "tron",
           "cursor": true
       });




        $("#ChartBuy").knob({ 'min': 0, 'max': 100 });
        $("#ChartSell").knob({ 'min': 0, 'max': 100 });

        $("#ChartBuy25").knob({ 'min': 0, 'max': 100 });
        $("#ChartSell25").knob({ 'min': 0, 'max': 100 });

    },
    Encender: function () {
        $("#btnAnalisis").prop("disabled", true);
        $("#btnApagar").prop("disabled", false);
        AnalisisData.myVar = setInterval(function () { Analisis.IntervalApi() }, 4000);
    },
    Apagar: function () {
        $("#btnAnalisis").prop("disabled", false);
        $("#btnApagar").prop("disabled", true);
        clearInterval(AnalisisData.myVar);
    },
    IntervalApi: function () {
        var apiUrl = 'https://api.bitso.com/v3/trades/?book=xrp_mxn&limit=100'
        $.getJSON(apiUrl)
                 .done(function (data) {
                     // On success, 'data' contains a list of products.
                     $.each(data, function (key, item) {
                         if (key == 'payload') {

                             Analisis.Count(item);

                             //General.ajax({
                             //    url: AnalisisData.UrlTrades,
                             //    data: JSON.stringify(item),
                             //    dataType: "json",
                             //    type: "post",
                             //    contentType: 'application/json; charset=utf-8',
                             //    Callback: function (response) {
                             //        if (response.success) {
                             //            $.utilsMessage({ msj: response.message, cssClass: "success", fadeOut: 1 });
                             //            //Actualizar grid
                             //        }
                             //        else {
                             //            $.utilsMessage({ msj: response.message, fadeOut: 0 });
                             //        }
                             //    }
                             //});


                         }
                     });
                 });



        var apiUrls = 'https://api.bitso.com/v3/order_book/?book=xrp_mxn'
        $.getJSON(apiUrls)
                 .done(function (data) {
                     $.each(data, function (key, item) {
                         if (key == 'payload') {
                            Analisis.Compra(item.asks);
                            Analisis.Venta(item.bids);
                         }
                     });
                 });
    },
    Count: function (data) {

        var TotalXrp = 0;
        var TotalXrp25 = 0;

        var sell = 0;
        var sellxrp = 0;
        var buy = 0;
        var buyxrp = 0;


        var sell_25 = 0;
        var sellxrp_25 = 0;
        var buy_25 = 0;
        var buyxrp_25 = 0;

        var count25 = 0;

        $.each(data, function (key, item) {

            

            if (item.maker_side == "buy") {
                TotalXrp = TotalXrp + Number(item.amount);
                buyxrp = buyxrp + Number(item.amount);

                if (count25 < 25) {
                    TotalXrp25 = TotalXrp25 + Number(item.amount);
                    buyxrp_25 = buyxrp_25 + Number(item.amount);
                }

                count25 = count25 + 1;

            } else if (item.maker_side == "sell") {
                TotalXrp = TotalXrp + Number(item.amount);
                sellxrp = sellxrp + Number(item.amount);

                if (count25 < 25) {
                    TotalXrp25 = TotalXrp25 + Number(item.amount);
                    sellxrp_25 = sellxrp_25 + Number(item.amount);
                }
                count25 = count25 + 1;
            }
        });


        $h2Buy = $('#TotalBuyXrp').find('h2');;
        $h2Buy.text(buyxrp.toFixed(3));
        buy = (buyxrp * 100) / TotalXrp
        $('#ChartBuy').val(Number(buy.toFixed(2))).trigger('change');

        $h2Sell = $('#TotalSellXrp').find('h2');
        $h2Sell.text(sellxrp.toFixed(3));
        sell = (sellxrp * 100) / TotalXrp
        $('#ChartSell').val(Number(sell.toFixed(2))).trigger('change');


        $h2Buy25 = $('#TotalBuyXrp25').find('h2');
        $h2Buy25.text(buyxrp_25.toFixed(3));
        buy_25 = (buyxrp_25 * 100) / TotalXrp25
        $('#ChartBuy25').val(Number(buy_25.toFixed(2))).trigger('change');

        $h2Sell25 = $('#TotalSellXrp25').find('h2');
        $h2Sell25.text(sellxrp_25.toFixed(3));
        sell_25 = (sellxrp_25 * 100) / TotalXrp25
        $('#ChartSell25').val(Number(sell_25.toFixed(2))).trigger('change');

      
       

    },

    Compra: function (data) {
        var TotalXrpCompra = 0;
        var PrecioPromCompra = 0;
        var CountCompra= 0

        $.each(data, function (key, item) {
            TotalXrpCompra = TotalXrpCompra + Number(item.amount);
            PrecioPromCompra = PrecioPromCompra + Number(item.price);
            CountCompra = CountCompra + 1;
        });

        var precio = PrecioPromCompra / CountCompra;
        $h2 = $('#PrecioPromCompra').find('h2');
        $h2.text(precio.toFixed(3));

        $h2 = $('#TotalXrpCompra').find('h2');
        $h2.text(TotalXrpCompra.toFixed(3));

    },
    Venta: function (data) {
        var TotalXrpVenta = 0;
        var PrecioPromVenta = 0;
        var CountVenta = 0
        $.each(data, function (key, item) {

            TotalXrpVenta = TotalXrpVenta + Number(item.amount);
            PrecioPromVenta = PrecioPromVenta + Number(item.price);
            CountVenta = CountVenta + 1;

        });

        var precio = PrecioPromVenta / CountVenta;
        $h2 = $('#PrecioPromVenta').find('h2');
        $h2.text(precio.toFixed(3));

        $h2 = $('#TotalXrpVenta').find('h2');
        $h2.text(TotalXrpVenta.toFixed(3));


    }



}