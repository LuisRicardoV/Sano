window.AreaPedidoData = {
};

window.AreaPedido = {
    Init: function (parameters) {
        $.extend(AreaPedidoData, parameters);
        $('body').on('click', '[data-toggle]', this.ActionOpenSideBar);
        $('body').on('click', '.item-menu', this.ActionMenu);
        $('body').on('click', '.Platillo', this.ActionPadNumerico);
        $('body').on('click', '#BtnBackMenu', this.ActionBackMenu);
        $('body').on('click', '.val-PADNUMERICO', this.ActionPadNumericoCalc);
        $('body').on('click', '.val-PADNUMERICO-ENTER', this.ActionPadNumericoEnter);
        $('body').on('click', '.val-PADNUMERICO-DELETE', this.ActionPadNumericoDel);
        $('body').on('click', '#BtnAdd', this.ActionBtnAdd);
        $('body').on('click', '#BtnBack', this.ActionBtnBack);



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
    ActionMenu: function (event) {
        event.preventDefault();
        $("#menu-container").hide(500);
        $("#menu-container-PLATILLO").show(500);
    },
    ActionBackMenu: function (event) {
        event.preventDefault();
        $("#menu-container").show(500);
        $("#menu-container-PLATILLO").hide(500);
    },
    ActionPadNumerico: function (event) {
        event.preventDefault();
        $("#menu-container-PLATILLO").hide(500);
        $("#menu-container-PADNUMERICO").show(500);
    },
    ActionPadNumericoCalc: function (event) {
        event.preventDefault();
        var a = $(this).attr("href");
        $(".screen-PADNUMERICO").append(a);
        $(".outcome-PADNUMERICO").val($(".outcome-PADNUMERICO").val() + a);
    },
    ActionPadNumericoEnter: function (event) {
        event.preventDefault();
        $("#menu-container-PADNUMERICO").hide();
        $("#menu-container-COMPLEMENTOS").show();
    },
    ActionPadNumericoDel: function (event) {
        event.preventDefault();
        $(".screen-PADNUMERICO").html('');
        $(".outcome-PADNUMERICO").val('');
    },
    ActionBtnAdd: function (event) {
        event.preventDefault();
       
    },

    ActionBtnBack: function (event) {
        event.preventDefault();
        $("#menu-container-PADNUMERICO").show(500);
        $("#menu-container-COMPLEMENTOS").hide(500);
    },
  
};