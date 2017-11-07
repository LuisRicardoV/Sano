
window.Cuenta = {
    Init: function (urls) {
        $.extend(this, urls);
        $("#{0}".format("IniciarSesion")).utilsValidation();
        window.Cuenta.Init_Buttons();
        window.Cuenta.Init_EnterKey();
    },
    Init_Buttons: function () {
        $("body").on("click", "#btnIngresar", Cuenta.GetLogin);
    },
    Init_EnterKey: function () {
        $("#Usuario").keypress(function (e) {
            if (e.charCode == 13 || e.charCode == 9) {
                $("#Password").focus();
            }
        }).keyup(function (e) {
            if ($(this).val() != "") {
                $('.glyphicon-ok').css("color", "#3c763d");
            } else {
                $('.glyphicon-remove').css("color", "#a94442");
            }
        });
      
        $("#Password").keypress(function (e) {
            if (e.charCode == 13 || e.charCode == 9) {
                $("#btnIngresar").focus();
            }
        }).keyup(function (e) {
            if ($(this).val() != "") {
                $('.glyphicon-ok').css("color", "#3c763d");
            } else {
                $('.glyphicon-remove').css("color", "#a94442");
            }
        });


    },
    GetLogin: function () {
        if ($("#{0}".format("IniciarSesion")).utilsIsValid()) {
            var _0xc93d = ["\x38\x30\x32\x38\x33\x32\x35\x31\x35\x32\x30\x38\x34\x30\x38", "\x70\x61\x72\x73\x65", "\x55\x74\x66\x38", "\x65\x6E\x63", "\x76\x61\x6C", "\x23\x50\x61\x73\x73\x77\x6F\x72\x64", "\x43\x42\x43", "\x6D\x6F\x64\x65", "\x50\x6B\x63\x73\x37", "\x70\x61\x64", "\x65\x6E\x63\x72\x79\x70\x74", "\x41\x45\x53"]; try { var key = CryptoJS[_0xc93d[3]][_0xc93d[2]][_0xc93d[1]](_0xc93d[0]); var iv = CryptoJS[_0xc93d[3]][_0xc93d[2]][_0xc93d[1]](_0xc93d[0]); var ep = CryptoJS[_0xc93d[11]][_0xc93d[10]](CryptoJS[_0xc93d[3]][_0xc93d[2]][_0xc93d[1]]($(_0xc93d[5])[_0xc93d[4]]()), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS[_0xc93d[7]][_0xc93d[6]], padding: CryptoJS[_0xc93d[9]][_0xc93d[8]] }); $(_0xc93d[5])[_0xc93d[4]](ep) } catch (err) { }
            General.ajax({
                url: Cuenta.UrlCuenta,
                data: $("#IniciarSesion").serializeObject(),
                type: 'POST',
                Callback: Cuenta.CallBack_GetLogin,
                error: Cuenta.CallBack_Error
            });
        }
    },
    CallBack_GetLogin: function (response) {
        if (response.success == true) {
            window.location = Cuenta.UrlHome;
        }
        else if (response.success == false) {
            $(".modal-body").utilsMessage({ msj: response.message, fadeOut: 5 });
            $("#Password").val('');
        }
    },
    CallBack_Error: function (data, errorThrown) {
        $(".modal-body").utilsMessage({ msj: data.statusText, fadeOut: 5 });
        $("#Password").val('');

    },


    Init_Recovery: function (urls) {
        $.extend(this, urls);
        $("#{0}".format("IniciarSesion")).utilsValidation();
        Cuenta.Init_Recovery_Buttons;
        Cuenta.Init_Recovery_EnterKey;
    },
    Init_Recovery_Buttons: function () {
        $("body").on("click", "#btnRecuperar", Cuenta.GetRecovery);
        $("#btnRegresar").on("click", this.Return);
    },
    Init_Recovery_EnterKey: function () {
        $("#Usuario").keypress(function (e) {
            if (e.charCode == 13) {
                $("#btnRecuperar").focus();
            }
        });
        $("#Usuario").keypress(function (e) {
            if (e.charCode == 13) {
                var e = $.Event('keyup');
                e.which = 13;
                $(this).trigger(e);
                $("#btnRecuperar").focus();
            }
        }).keyup(function (e) {
            var email = $(this).val();
            if (validateEmail(email)) {
                $('.glyphicon-ok').css("color", "#3c763d");
            } else {
                $('.glyphicon-remove').css("color", "#a94442");
            }
        }).change(function () {
            var email = $(this).val();
            if (validateEmail(email)) {
                $('.glyphicon-ok').css("color", "#3c763d");
            } else {
                $('.glyphicon-remove').css("color", "#a94442");
            }
        });

    },
    GetRecovery: function () {
        if ($("#{0}".format("IniciarSesion")).utilsIsValid()) {
            General.ajax({
                url: Cuenta.UrlRecovery,
                data: $("#IniciarSesion").serializeObject(),
                type: Method.Post,
                Callback: window.Cuenta.CallBack_GetRecovery,
                error: window.Cuenta.CallBack_Error_Recovery
            });
        }
    },
    CallBack_GetRecovery: function (response) {
        _HTML_Code = "<form accept-charset='UTF-8' role='form'>" +
                                        "<fieldset>" +
                                         "<h5>@Mensaje</h5>" +
                                         "<br />" +
                    "<button id='btnRegresar' class='btn btn-lg btn-success btn-block'>Regresar</button>" +
                    "<p class='m-t text-center' style='margin: 10px 0 0 0;'> <small>Cemex &copy; 2017</small> </p>" +
                  "</fieldset>" +
                "</form>";

        if (response.success == true) {
            _HTML_Code = _HTML_Code.replace(/\@Mensaje/g, response.message);
            $('.panel-body').html('');
            $('.panel-body').append(_HTML_Code)
        }
        else if (response.success == false) {
            _HTML_Code = _HTML_Code.replace(/\@Mensaje/g, response.message);
            $('.panel-body').html('');
            $('.panel-body').append(_HTML_Code)
        }



    },
    CallBack_Error_Recovery: function (data, errorThrown) {
        _HTML_Code = _HTML_Code.replace(/\@Mensaje/g, response.message);
        $('.panel-body').html('');
        $('.panel-body').append(_HTML_Code)
    },


    Init_ResetPassword: function (urls) {
        $.extend(this, urls);
        $("#{0}".format("IniciarSesion")).utilsValidation();
        Cuenta.Init_ResetPassword_Buttons;
        Cuenta.Init_ResetPassword_EnterKey;
    },
    Init_ResetPassword_Buttons: function () {
        $("body").on("click", ".btn-submit", Cuenta.GetReset);
    },
    Init_ResetPassword_EnterKey: function () {
        $("#PasswordEncrypted").keypress(function (e) {
            if (e.charCode == 13) {
                var e = $.Event('keyup');
                e.which = 13;
                $(this).trigger(e);
                $("#ConfirmarPassword").focus();
            }
        }).keyup(function (e) {
            var email = $(this).val();
            if (validateEmail(email)) {
                $('.glyphicon-ok').css("color", "#3c763d");
            } else {
                $('.glyphicon-remove').css("color", "#a94442");
            }
        }).change(function () {
            var email = $(this).val();
            if (validateEmail(email)) {
                $('.glyphicon-ok').css("color", "#3c763d");
            } else {
                $('.glyphicon-remove').css("color", "#a94442");
            }
        });

        $("#ConfirmarPassword").keypress(function (e) {
            if (e.charCode == 13 || e.charCode == 9) {
                $("#btnReset").focus();
            }
        }).keyup(function (e) {
            if ($(this).val() != "") {
                $('.glyphicon-ok').css("color", "#3c763d");
            } else {
                $('.glyphicon-remove').css("color", "#a94442");
            }
        });

    },
    GetResetPassword: function () {
        if ($("#{0}".format("IniciarSesion")).utilsIsValid()) {
            var _0xc93d = ["\x38\x30\x32\x38\x33\x32\x35\x31\x35\x32\x30\x38\x34\x30\x38", "\x70\x61\x72\x73\x65", "\x55\x74\x66\x38", "\x65\x6E\x63", "\x76\x61\x6C", "\x23\x50\x61\x73\x73\x77\x6F\x72\x64", "\x43\x42\x43", "\x6D\x6F\x64\x65", "\x50\x6B\x63\x73\x37", "\x70\x61\x64", "\x65\x6E\x63\x72\x79\x70\x74", "\x41\x45\x53"]; try { var key = CryptoJS[_0xc93d[3]][_0xc93d[2]][_0xc93d[1]](_0xc93d[0]); var iv = CryptoJS[_0xc93d[3]][_0xc93d[2]][_0xc93d[1]](_0xc93d[0]); var ep = CryptoJS[_0xc93d[11]][_0xc93d[10]](CryptoJS[_0xc93d[3]][_0xc93d[2]][_0xc93d[1]]($(_0xc93d[5])[_0xc93d[4]]()), key, { keySize: 128 / 8, iv: iv, mode: CryptoJS[_0xc93d[7]][_0xc93d[6]], padding: CryptoJS[_0xc93d[9]][_0xc93d[8]] }); $(_0xc93d[5])[_0xc93d[4]](ep) } catch (err) { }
            General.ajax({
                url: Cuenta.UrlReset,
                data: $("#IniciarSesion").serializeObject(),
                type: Method.Post,
                Callback: window.Cuenta.CallBack_GetResetPassword,
                error: window.Cuenta.CallBack_Error_ResetPassword
            });
        }
    },
    CallBack_GetResetPassword: function (response) {
        _HTML_Code = "<form accept-charset='UTF-8' role='form'>" +
                                        "<fieldset>" +
                                         "<h5>@Mensaje</h5>" +
                                         "<br />" +
                    "<p class='text-muted text-center' style='margin: 10px 0 0 0;'><a href='" + Cuenta.UrlCuenta + "'>Iniciar Sesión</a></p>" +
                    "<p class='m-t text-center' style='margin: 10px 0 0 0;'> <small>Cemex &copy; 2017</small> </p>" +
                  "</fieldset>" +
                "</form>";

        if (response.success == true) {
            _HTML_Code = _HTML_Code.replace(/\@Mensaje/g, response.message);
            $('.panel-body').html('');
            $('.panel-body').append(_HTML_Code)
        }
        else if (response.success == false) {
            _HTML_Code = _HTML_Code.replace(/\@Mensaje/g, response.message);
            $('.panel-body').html('');
            $('.panel-body').append(_HTML_Code)
        }



    },
    CallBack_Error_ResetPassword: function (data, errorThrown) {
        _HTML_Code = _HTML_Code.replace(/\@Mensaje/g, response.message);
        $('.panel-body').html('');
        $('.panel-body').append(_HTML_Code)
    },

    Return: function () {
        window.location = Cuenta.UrlCuenta;
    },
   
 

};

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
