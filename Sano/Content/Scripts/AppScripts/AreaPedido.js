window.AreaPedidoData = {
};

window.AreaPedido = {
    Init: function (parameters) {
        $.extend(AreaPedidoData, parameters);
        $('body').on('click', '[data-toggle]', this.ActionOpenSideBar);
        $('body').on('click', '.item-menu', this.ActionMenuContainerDETALLE);
        $('body').on('click', '.Platillo', this.ActionPadNumerico);
        $('body').on('click', '#btnBackMenuGENERAL', this.ActionBackMenuGENERAL);
        $('body').on('click', '#btnBackMenuDETALLE', this.ActionBackMenuDETALLE);
        $('body').on('click', '#btnBackMenuPADNUMERICO', this.ActionBackMenuPADNUMERICO);
        $('body').on('click', '.val-PADNUMERICO', this.ActionPadNumericoCalc);
        $('body').on('click', '.val-PADNUMERICO-ENTER', this.ActionPadNumericoEnter);
        $('body').on('click', '.val-PADNUMERICO-DELETE', this.ActionPadNumericoDel);
        $('body').on('click', '#BtnAdd', this.ActionBtnAdd);

        $(".swipe-area").on("swipe", function (event, phase, direction, distance, duration, fingers) {
            event.preventDefault();
            if (phase == "move" && direction == "left") {
                $(".container").addClass("open-sidebar");
                return false;
            }
            if (phase == "move" && direction == "right") {
                $(".container").removeClass("open-sidebar");
                return false;
            }
        });
    },
    ActionOpenSideBar: function (event) {
        event.preventDefault();
        var toggle_el = $(this).data("toggle");
        $(toggle_el).toggleClass("open-sidebar");
    },
    ActionMenuContainerDETALLE: function (event) {
        event.preventDefault();
        $("#menu-container-GENERAL").hide(300);
        $("#menu-container-DETALLE").show(300);
    },
    ActionBackMenuGENERAL: function (event) {
        event.preventDefault();
        $("#menu-container-DETALLE").hide(300);
        $("#menu-container-GENERAL").show(300);
    },
    ActionBackMenuDETALLE: function (event) {
        event.preventDefault();
        $("#menu-container-PADNUMERICO").hide(300);
        $("#menu-container-DETALLE").show(300);
    },
    ActionPadNumerico: function (event) {
        event.preventDefault();
        $("#menu-container-DETALLE").hide(300);
        $("#menu-container-PADNUMERICO").show(300);
    },
    ActionPadNumericoCalc: function (event) {
        event.preventDefault();
        var a = $(this).attr("href");
        $(".screen-PADNUMERICO").append(a);
        $(".outcome-PADNUMERICO").val($(".outcome-PADNUMERICO").val() + a);
    },
    ActionPadNumericoEnter: function (event) {
        event.preventDefault();
        $("#menu-container-PADNUMERICO").hide(300);
        $("#menu-container-COMPLEMENTOS").show(300);
    },
    ActionPadNumericoDel: function (event) {
        event.preventDefault();
        $(".screen-PADNUMERICO").html('');
        $(".outcome-PADNUMERICO").val('');
    },
    ActionBtnAdd: function (event) {
        event.preventDefault();
    },

    ActionBackMenuPADNUMERICO: function (event) {
        event.preventDefault();
        $("#menu-container-COMPLEMENTOS").hide(300);
        $("#menu-container-PADNUMERICO").show(300);
    },
  
};