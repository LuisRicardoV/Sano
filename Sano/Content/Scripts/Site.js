window.General = {
    code400: function () {
        if ($('.msg401').length > 0)
            Modal.hideModal('msg401');
        if (typeof _Resourcers.Common_Cancel != 'undefined')
            Resourcers.init('Common');
        Modal.show({
            txtBtnOk: _Resourcers.Common_Cancel,
            message: "No autorizado!",
            className: "msg401"
        });
    },
    code403: function () {
        if ($('.msg403').length > 0)
            Modal.hideModal('msg403');
        if (typeof _Resourcers.Common_Cancel === 'undefined')
            Resourcers.init('Common');
        Modal.show({
            txtBtnOk: _Resourcers.Common_Cancel,
            message: _Resourcers.Common_Unauthorized,
            className: "msg403",
            title: _Resourcers.Common_TitleForbiden,
            onEscape: General.CallbackPermision
        });
    },
    code404: function () {
        $("body").find("div[role=alert]").remove();
        $.utilsMessage({ msj: 'La petición realizada no se encuentra, favor de intentarlo de nuevo mas tarde.' });
        if ($("div.isloading-overlay").length > 0) $("body").isLoading("hide");
    },
    code500: function () {
        $("body").find("div[role=alert]").remove();
        $.utilsMessage({ msj: 'El servidor no se encuentra disponible, intenta de nuevo' });
        Loader.HideLoader();
    },
    code409: function () {
        $("body").find("div[role=alert]").remove();
        $.utilsMessage({ msj: 'Sesión ha expirado por inactividad en el sistema' });
        Loader.HideLoader();
    },
    code412: function (response) {
        if (typeof response.message !== 'undefined') {
            Modal.show({
                message: response.message || '',
                size: Size.Small,
                txtBtnOk: "Continuar",
                callbackOk: function () {
                    $.ajaxLoad({
                        url: response.Url,
                        data: response.data,
                        method: response.method
                    });
                },
                title: "Inicar sesión para continuar",
                closeButton: false
            });
        }
        else if (response.PopUpWindow === true) {
            window.open(
                response.Url + '?' + $.param(response.data),
                "PopUp",
                General.BuildOptionsPopUp(response)
            );
        }
        else {
            $.ajaxLoad({
                url: response.Url,
                data: response.data,
                method: response.method
            });
        }
    },
    ajax: function (params) {
        params.statusCode = {
            200: function (response) {
                if (params.Callback !== '') {
                    var call = $.Callbacks();
                    call.add(params.Callback);
                    call.fire(response);
                }
            }
        };
        params.datatype = "JSON";
        if (typeof params.files != 'undefined') {
            params.processData = false;
            params.contentType = false;
        }
        params.files = params.files || false;
        params = $.setAjaxDefaults(params);
        $.ajax(params);
    },
    BuildOptionsPopUp: function (data) {
        var str = '';
        if (typeof data['width'] != 'undefined')
            str = 'width={0}'.format(window.innerWidth * (data['width'] / 100));
        else
            str = 'width={0}'.format(window.innerWidth * (0.8));
        if (typeof data['height'] != 'undefined')
            str += ',height={0}'.format(window.innerWidth * (data['height'] / 100));
        else
            str += ',height={0}'.format(window.innerWidth * (0.8));

        str += ',resizable={0}'.format(data['resizable'] || 'no');
        str += ',scrollbars={0}'.format(data['scrollbars'] || 'yes');
        str += ',toolbar={0}'.format(data['toolbar'] || 'no');
        str += ',menubar={0}'.format(data['menubar'] || 'no');
        str += ',location={0}'.format(data['location'] || 'no');
        str += ',directories={0}'.format(data['directories'] || 'no');
        str += ',status={0}'.format(data['status'] || 'no');
        str += ',left={0}'.format(data['left'] || '10');
        str += ',top={0}'.format(data['top'] || '10');
        return str;
    },
    QueryStringToJSON: function (data) {
        var pairs = data.split('&');
        var result = {};
        pairs.forEach(function (pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });

        return JSON.parse(JSON.stringify(result));
    },
    DocumentWriteWrapper: function (jq, func) {
        var oldwrite = document.write, content = '';
        document.write = function (text) {
            content += text;
        }
        func();
        document.write = oldwrite;
        jq.html(content);
    },
    CollapseFilters: function (filterId, collapse) {

        $filter = $('#' + filterId);

        if (collapse == true)
            $filter.collapse('hide');
    },
    SetAuth: function () {
        AuthUser.IdUsuario = Lockr.get("idUsuario");
        AuthUser.IdEmpresa = Lockr.get("idEmpresa");
        AuthUser.Usuario = Lockr.get("userName");
        AuthUser.IdAreaIdUsuario = Lockr.get("idArea");
        AuthUser.Nombre = Lockr.get("givenName");
    },
    goNextCtrl: function () {
        var ctrl = this;
        var func = function () {
            //"nextctrl" es un selector
            var nextctrl = $(ctrl).attr("nextctrl");
            if (nextctrl != undefined)
                $(nextctrl).focus();
        }

        $(this).on("keydown", function (e) {
            if (e.keyCode == 13) {
                func();
            }
        });
    },
    DeleteReport: function (filename) {
        General.ajax({
            url: "/Files/DeletePrintedFile",
            data: { filename: filename },
            type: "POST",
            Callback: function () {
                console.log("Archivo " + filename + " fue eliminado.");
            }
        });
    },
    ConfigureSecurity: function (Permisos) {
        $.each(Permisos, function (index, item) {
            var control = $('*[data-securitycontrol="{0}"]'.format(item.IdOpcion));
            var controlTag = '';

            if (control.length > 0) {
                if (item.Acceso == 0 || item.Acceso == false) {

                    if (item.IdTipoAcceso == 2) /*IdTipoAcceso = 2 -> Deshabilitado*/ {
                        controlTag = control[0].tagName.toLocaleLowerCase();
                        if (controlTag == 'input')
                            control.attr('readonly', 'readonly');
                        else if (controlTag == 'button')
                            control.attr('disabled', 'disabled');
                        else if (controlTag == 'div' || controlTag == 'li')
                            control.addClass("disable-div");
                        else if (controlTag == 'i') // caso de los botones del grid
                        {
                            var grandpather = $(control[0]).parent().parent();
                            if (grandpather != undefined) {
                                if ($(grandpather).hasClass(".dt-button")) {
                                    $(grandpather).attr('disabled', 'disabled');
                                }
                            }
                        }
                    }
                    else if (item.IdTipoAcceso == 3) /*IdTipoAcceso = 3 -> Invisible*/ {
                        controlTag = control[0].tagName.toLocaleLowerCase();
                        if (controlTag == "i") {
                            var grandpather = $(control[0]).parent().parent();
                            if (grandpather != undefined) {
                                if ($(grandpather).hasClass("dt-button")) {
                                    $(grandpather).hide();
                                }
                            }
                        }
                        else
                            control.css('display', 'none');
                    }
                    else
                        control.css('display', 'none'); /*Por defecto*/
                }
            }
        });
    },
    ExistsAccesoOpcion: function (Permisos, IdOpcion) {
        var element = _.where(Permisos, { IdOpcion: IdOpcion });

        if (element.length > 0) {
            element = element[0];

            if (element.Acceso == 0 || element.Acceso == false)
                return false;
            else
                return true;
        }
        else
            return false;
    },
    GetElementPermiso: function (Permisos, IdOpcion) {
        var element = _.where(Permisos, { IdOpcion: IdOpcion });

        if (element.length > 0)
            return element[0];
        else
            return undefined;
    },
    GetElementsPermiso: function (Permisos, opciones) {
        var elements = _.filter(Permisos, function (item) {
            if (jQuery.inArray(item.IdOpcion, opciones) >= 0) {
                if (item.Acceso == 1 || item.Acceso == true) {
                    return item;
                }
            }
        });

        return elements;
    },
    ConfigureGridViewSecurity: function (Permisos, GridView) {
        $.each(Permisos, function (index, item) {
            if ($('*[data-securitycontrol="{0}"]'.format(item.IdOpcion)).length > 0) {
                if (item.Acceso == 0 || item.Acceso == false) {
                    GridView.api().column($('*[data-securitycontrol="{0}"]'.format(item.IdOpcion))).visible(false);
                }
            }
        });
    },
    HideGridColumnRender: function (GridView, renderName) {
        GridView.api().column($('*[data-render="{0}"]'.format(renderName))).visible(false);
    },
    btnEditar: '<button type="button" {0} class="btn btn-xs btn-primary {1}" title="{2}"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button>',
    btnEliminar: '<button type="button" {0} class="btn btn-xs btn-orange {1}" title="{2}"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>',
    btnCancelar: '<button type="button" {0} class="btn btn-xs btn-danger {1}" title="{2}"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button>',
    LoadLookup: function (IdCtrlHidden, IdCtrlSearchForInt, IdCtrlSearchForString, CtrlFocusNext, UrlMethodSearchForInt, UrlMethodSearchForString) {

        $(IdCtrlSearchForInt).on('keydown', function (e) {

            var resultReturn = false;

            if (e.keyCode >= 35 && e.keyCode <= 40 || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105)
                resultReturn = true;
            else if (e.keyCode == 8 || e.keyCode == 46 || e.keyCode == 13 || e.keyCode == 9)
                resultReturn = true;
            else
                resultReturn = false;

            if (!resultReturn)
                return false;

            if ($(IdCtrlSearchForInt).val() != '') {
                if (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode > 96 && e.keyCode < 105) {
                    if ($(IdCtrlHidden).val() != ($(IdCtrlSearchForInt).val() + e.key)) {
                        $(IdCtrlSearchForString).val("");
                        $(IdCtrlHidden).val("");
                    }
                }
            }

            if (e.keyCode == 8 || e.keyCode == 46) {
                $(IdCtrlSearchForString).val("");
                $(IdCtrlHidden).val("");
            } else if (e.keyCode == 13 || (e.keyCode == 9 && !e.shiftKey)) {
                if ($(IdCtrlSearchForInt).val() == '') {
                    if (UrlMethodSearchForString == '')
                        CtrlFocusNext.focus();
                    else {
                        $(IdCtrlSearchForString).val("");
                        $(IdCtrlHidden).val("");
                        $(this).val("");
                        $(IdCtrlSearchForString).focus();
                    }
                } else {
                    if (UrlMethodSearchForString == '')
                        CtrlFocusNext.focus();
                    else {
                        if (UrlMethodSearchForInt == '')
                            $(IdCtrlSearchForString).focus();
                        else {
                            $.ajax({
                                url: UrlMethodSearchForInt,
                                type: 'POST',
                                async: true,
                                data: {
                                    value: $(IdCtrlSearchForInt).val()
                                },
                                success: function (response) {
                                    {
                                        var errorCallback = function () {
                                            $(IdCtrlSearchForString).val("");
                                            $(IdCtrlSearchForInt).val("");
                                            $(this).val("");
                                        };

                                        if (response.Data != undefined) {
                                            $(IdCtrlSearchForString).val(response.Data);
                                            $(IdCtrlHidden).val($(IdCtrlSearchForInt).val());
                                            CtrlFocusNext.focus();
                                        } else if (response.Error != undefined) {
                                            errorCallback();
                                            if ($('body').hasClass('modal-open')) {
                                                $('.modal-body').utilsMessage({
                                                    msj: response.Error,
                                                    fadeOut: 5
                                                });
                                            } else {
                                                $('.container-fluid').utilsMessage({
                                                    msj: response.Error,
                                                    fadeOut: 5
                                                });
                                            }
                                        } else
                                            errorCallback();
                                    }
                                }
                            });
                        }
                    }
                }
            }
        });

        $(IdCtrlSearchForString).keydown(function (e) {
            if (e.keyCode == 8 || e.keyCode == 46) {
                $(IdCtrlSearchForInt).val("");
                $(IdCtrlHidden).val("");
            } else if (e.keyCode == 13 || (e.keyCode == 9 && !e.shiftKey)) {
                if ($(IdCtrlSearchForString).val() == '')
                    CtrlFocusNext.focus();
            }
        });

        if (UrlMethodSearchForString != '') {
            $(IdCtrlSearchForString).typeahead({
                items: '2147483647',
                minLength: '3',
                autoSelect: 'True',
                source: function (query, process) {
                    $.ajax({
                        url: UrlMethodSearchForString,
                        type: "POST",
                        async: true,
                        data: {
                            value: $(IdCtrlSearchForString).val()
                        },
                        success: function (results) {
                            objects = [];
                            mapObjects = {};

                            $.each(results.Data, function (i, item) {
                                mapObjects[item.Value] = item;
                                objects.push(item.Value);
                            });

                            return process(objects);
                        }
                    });
                },
                updater: function (item) {
                    var selectedItem = mapObjects[item];
                    $(IdCtrlHidden).val(selectedItem.Key);
                    $(IdCtrlSearchForInt).val(selectedItem.Key);
                    CtrlFocusNext.focus();
                    return item;
                }
            });

            $(IdCtrlSearchForString).attr('autocomplete', 'off');
        }
    }
};


window.Grid = {
    defaultsGrid: {
        "dom": '<"buscar"f>t<"lengt"l><"info"i><"pagination"p>',
        "bFilter": true,
        "bJQueryUI": false,
        "bProcessing": true,
        "drawCallback": function () {
            //tooltips.init();
            //Loader.HideLoader();
        },
        "oLanguage": {
            "oPaginate": {
                "sPrevious": "Anterior",
                "sNext": "Siguiente",
                "sLast": "Última",
                "sFirst": "Primera"
            },
            "sLengthMenu": '<div id="combo_datatable">Mostrar<select class="form-control">' +
            '<option value="5">5</option>' +
            '<option value="10">10</option>' +
            '<option value="20">20</option>' +
            '<option value="30">30</option>' +
            '<option value="40">40</option>' +
            '<option value="50">50</option>' +
            '<option value="100">100</option>' +
            '</select>',
            "sInfo": "&nbsp;Mostrando del _START_ a _END_ (Total: _TOTAL_ resultados)",
            "sInfoFiltered": " - filtrados de _MAX_ registros",
            "sInfoEmpty": "",
            "sLoadingRecords": "Cargando...",
            "sZeroRecords": "<div class='text-center'>No hay registros para mostrar</div>",
            "sProcessing": "<i class='fa fa-spinner fa-spin'></i> Cargando registros...",
            "sSearch": "<span id='div_buscar' class='add-on'><i class='icon-search'></i></span>Buscar:",
            "sEmptyTable": "No se encontraron datos"
        },
        pagingType: "full_numbers"
    },
    Renders: {
        currency: function (data, type, row) {
            return accounting.formatMoney(data);
        },
        DateFormatDMY: function (data, type, row) {
            var result;

            if (data != undefined)
                result = moment(data).format("DD/MM/YYYY");
            else
                result = '';

            return result;
        },
        DateFormatMDY: function (data, type, row) {
            var result;

            if (data != undefined)
                result = moment(data).format("MM/DD/YYYY");
            else
                result = '';

            return result;
        },
        DateFormatYMD: function (data, type, row) {
            var result;

            if (data != undefined)
                result = moment(data).format("YYYY/MM/DD");
            else
                result = '';

            return result;
        },
        DateFormatDMYHHmm: function (data, type, row) {
            var result;

            if (data != undefined)
                result = moment(data).format("DD/MM/YYYY HH:mm");
            else
                result = '';

            return result;
        },
        DateFormatHHmm: function (data, type, row) {
            var result;

            if (data != undefined)
                result = moment(data).format("HH:mm");
            else
                result = '';

            return result;
        },
        Checkbox: function (data, type, row) {
            //debugger;
            return "<input type='checkbox' " + ((data == 1 || data == true) ? "checked" : "") + " disabled />";

        },
        CreateMenu: function (data, type, row) {
            var result;

            var valor = data.split("-");
            return result = "<div class='btn-group'>" +
                            "<button type='button' data-registro ='" + valor[0] + "' data-ingreso = '" + valor[1] + "' class='btnOpciones context-menu-one btn btn-default'>" +
                                    "Opciones <span class='caret'></span></span></button>";

        },
        CreateListTriage: function (data, type, row) {
            var result;
            var valor = data.split("|");

            if (valor[2] == null || valor[2] == 0)
                return result = "<div class='btn-group-sm'>" +
                                "<button type='button' data-registro ='" + valor[0] + "' data-ingreso = '" + valor[1] + "' class='btnTriage context-menu-one btn btn-block btn-default'><span>" +
                                valor[3] + "</span><span class='caret'></span>";
            else
                return result = "<div class='btn-group-sm'>" +
                                "<button type='button' data-registro ='" + valor[0] + "' data-ingreso = '" + valor[1] + "' class='btnTriage context-menu-one btn btn-block " + valor[4] + "'><span>" +
                                valor[3] + "</span><span class='caret'></span>";
        },
        CreateListCubiculos: function (data, type, row) {
            var result;
            var valor = data.split("|");

            if (valor[2] == null || valor[2] == 0)
                return result = "<div class='btn-group-sm'>" +
                                "<button type='button' data-registro ='" + valor[0] + "' data-ingreso = '" + valor[1] + "' class='btnCubiculos btn btn-default btn-block'>SELECCIONE...<span class='NoCubiculo'>" +
                                "</span><span class='caret'></span>";
            else
                return result = "<div class='btn-group-sm'>" +
                                "<button type='button' data-registro ='" + valor[0] + "' data-ingreso = '" + valor[1] + "' class='btnCubiculos btn btn-primary btn-block'><span class='NoCubiculo'>" +
                                valor[2] + "</span><span class='caret'></span></button>";
        },
        maskOnPhone: function (data, type, row) {
            //debugger;
            if (row.Phone === null || row.Phone === "") {
                return "<div></div>";
            }
            else {
                return "<div class='mask-on-div'>" + row.Phone + "</div>";
            }
        },
        crudActionsPrePacientes: function (data, type, row) {
            var edit = "<button type=\"button\" class=\"btn btn-xs btn-primary EditarPrePaciente\" data-idprepacientepadre='{0}' data-idpariente='{1}' data-tipoparentesco='{2}'  title='Editar Dependiente'>Editar</button>".format(row.IdPrePaciente, row.IdPariente, row.TipoParentesco);
            var del = "<button type=\"button\" class=\"btn btn-xs btn-danger EliminarPrePaciente\" data-idprepacientepadre='{0}' data-idpariente='{1}' data-tipoparentesco='{2}'  title='Eliminar Dependiente'>Eliminar</button>".format(row.IdPrePaciente, row.IdPariente, row.TipoParentesco);
            return edit + "&nbsp;" + del;
        },
        /*----------------------------------------------------------*/
        btnEditDeleteTallaYPeso: function (data, type, row) {
            var btnEditar = General.btnEditar.format("data-IdTallaPx='" + row.IdTallaPx + "' data-securitycontrol='1977'", "btnEditarRow", "Editar Talla y Peso");
            var btnEliminar = General.btnEliminar.format("data-IdTallaPx='" + row.IdTallaPx + "' data-securitycontrol='1978'", "btnEliminarRow", "Eliminar Talla Y Peso");
            return btnEditar + "&nbsp;" + btnEliminar;
        },
        btnEditDeleteMxInicio: function (data, type, row) {
            var btnEditar = General.btnEditar.format("data-idllave='" + row.idllave + "'  data-securitycontrol='1981'", "btnEditarMxInicioRow", "Editar Mx de Inicio");
            var btnEliminar = General.btnEliminar.format("data-idllave='" + row.idllave + "'  data-securitycontrol='1982'", "btnEliminarMxInicioRow", "Eliminar Mx de Inicio");
            return btnEditar + "&nbsp;" + btnEliminar;
        },
        btnDeleteAlergias: function (data, type, row) {
            var btnEliminar = General.btnEliminar.format("data-id='" + row.ID + "' data-tipoid='" + row.TipoID + "' data-securitycontrol='1987'", "btnEliminarAlergiasRow", "Eliminar Alergia");
            return btnEliminar;
        },
        btnEditDeleteDiagnosticos: function (data, type, row) {
            var btnEditar = General.btnEditar.format("data-renglon='" + row.Renglon + "' data-securitycontrol='1990'", "btnEditarDiagnosticosRow", "Editar Diagnostico");
            var btnEliminar = General.btnEliminar.format("data-renglon='" + row.Renglon + "' data-securitycontrol='1993'", "btnEliminarDiagnosticosRow", "Eliminar Diagnostico");
            return btnEditar + "&nbsp;" + btnEliminar;
        },
        talla1Columna: function (data, type, row) {
            return row.Talla + " " + row.UnidadTalla;
        },
        peso1Columna: function (data, type, row) {
            return row.Peso + " " + row.UnidadPeso;
        },
        /*----------------------------------------------------------*/
        btnEditDeleteUnidades: function (data, type, row) {
            //debugger
            var edit = "<button type=\"button\" class=\"btn btn-xs btn-primary btnEditarUnidadesRow \"  data-idunidad='{0}' title='Editar'><span class=\"glyphicon glyphicon-edit\" aria-hidden=\"true\"></span></button>".format(row.IdUnidad);
            var del = "<button type=\"button\" class=\"btn btn-xs btn-orange btnEliminarUnidadesRow \" data-idunidad='{0}' title='Eliminar'><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></button>".format(row.IdUnidad);
            return edit + "&nbsp;" + del;
        },
        btnEditDeleteCargosUnidades: function (data, type, row) {
            //debugger
            var edit = "<button type=\"button\" class=\"btn btn-xs btn-primary btnEditarCargosUnidadesRow \" data-idcargo='{0}' data-idunidad='{1}' title='Editar'><span class=\"glyphicon glyphicon-edit\" aria-hidden=\"true\"></span></button>".format(row.IdCargo, row.IdUnidad);
            var del = "<button type=\"button\" class=\"btn btn-xs btn-orange btnEliminarCargosUnidadesRow \" data-idcargo='{0}' data-idunidad='{1}'  title='Eliminar'><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></button>".format(row.IdCargo, row.IdUnidad);
            return edit + "&nbsp;" + del;
        },
        btnEditDeleteGuiaPracticaClinica: function (data, type, row) {
            //debugger
            var edit = "<button type=\"button\" class=\"btn btn-xs btn-primary btnEditarGuiaPracticaClinicaRow \" data-idguia='{0}' title='Editar'><span class=\"glyphicon glyphicon-edit\" aria-hidden=\"true\"></span></button>".format(row.IdGuia);
            var del = "<button type=\"button\" class=\"btn btn-xs btn-orange btnEliminarGuiaPracticaClinicaRow \" data-idguia='{0}'  title='Eliminar'><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></button>".format(row.IdGuia);
            return edit + "&nbsp;" + del;
        },
        btnEditHabitaciones: function (data, type, row) {
            //debugger
            var edit = "<button type=\"button\" class=\"btn btn-xs btn-primary btnEditarHabitacionesRow \" data-idcuarto='{0}' title='Editar'><span class=\"glyphicon glyphicon-edit\" aria-hidden=\"true\"></span></button>".format(row.IdCuarto);
            return edit;
        },
        btnEditDeleteTecnicasQuirurgicas: function (data, type, row) {
            //debugger    
            var edit = "<button type=\"button\" class=\"btn btn-xs btn-primary btnEditarTecnicasQuirurgicasRow \" data-idtecnica='{0}' title='Editar'><span class=\"glyphicon glyphicon-edit\" aria-hidden=\"true\"></span></button>".format(row.idtecnica);
            var del = "<button type=\"button\" class=\"btn btn-xs btn-orange btnEliminarQuirurgicasRow \" data-idtecnica='{0}'  title='Eliminar'><span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span></button>".format(row.idtecnica);
            return edit + "&nbsp;" + del;
        },
        btnActivaDesactivaMedicos: function (data, type, row) {
            //debugger
            var edit = "";

            if (row.Estatus == 0) {
                edit = "<button type=\"button\" class=\"btn btn-xs btn-success btnActivaDesactivaMedicosRow \" data-iddoctor='{0}' title='Activar Medico'><span class=\"glyphicon glyphicon-ok\" aria-hidden=\"true\"></span></button>".format(row.IdDoctor);
            }
            else {
                edit = "<button type=\"button\" class=\"btn btn-xs btn-danger btnActivaDesactivaMedicosRow \" data-iddoctor='{0}' title='Desactivar Medico'><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span></button>".format(row.IdDoctor);
            }
            return edit;
        }
    },
    BuildGrid: function () {
        debugger;
        var $tbl = arguments[0];
        if ($tbl.indexOf('#') == -1)
            $tbl = '#' + $tbl;
        $tbl = $($tbl);
        var parametros = $.extend(true, {}, Grid.defaultsGrid, arguments[1]);
        if (arguments[1] != undefined) {
            if (arguments[1].render != undefined)
                $.extend(this.Renders, arguments[1].render);
        }
        parametros.sAjaxSource = $tbl.data('source');
        parametros.fnServerData = Grid.BuildServerData($tbl.data('filters'), $tbl);
        parametros.columns = Grid.BuildColumns($tbl);
        if ($tbl.find('[data-orderdefault]').length == 1) {
            parametros.order = [[$tbl.find('[data-orderdefault]').index(), $tbl.find('[data-orderdefault]').data('orderdefault')]];
        }
        parametros.columnDefs = Grid.BuildColumnDefs($tbl);
        return $tbl.dataTable(parametros);
    },
    BuildColumns: function (tbl) {
        var columns = [];
        tbl.find('th').each(function (k, v) {
            var column = {};
            column['data'] = $(v).data('name');
            if (typeof $(v).data('orderable') === 'undefined') {
                column['orderable'] = false;
            }
            else {
                column['orderable'] = ($(v).data('orderable') === true);
            }
            //debugger
            columns.push(column);
        });
        return columns;
    },
    BuildColumnDefs: function (tbl) {
        var columnsDef = [];
        tbl.find('th').each(function (k, v) {
            var column = {};
            var $v = $(v);
            column['name'] = $v.data('name');
            column['targets'] = k;
            if ($v.data('width') !== 'undefined')
                column['width'] = $v.data('width');
            if ($v.data('render') !== 'undefined')
                column['render'] = Grid.Renders[$v.data('render')];
            if ($v.data('class') !== 'undefinded')
                column['className'] = $v.data('class');
            columnsDef.push(column);
        });
        return columnsDef;
    },
    BuildServerData: function (frm, $tbl) {
        if (typeof frm !== 'undefined') {
            returnFn = function (sSource, aoData, fnCallback) {
                //debugger
                if (LoadDatatable[$tbl.attr("id")] || LoadDatatable[$tbl.attr("id")] == undefined) {
                    var indexSort = -1;
                    var dirSort = 'asc';
                    var columnSort = '';
                    $.each(aoData, function (k, v) {
                        if (v.name === 'iSortCol_0')
                            indexSort = v.value;
                        else if (v.name === 'sSortDir_0')
                            dirSort = v.value;
                        else if (v.name === 'sColumns')
                            columnSort = v.value;

                    });
                    if (indexSort != -1 && indexSort !== 0) {
                        columnSort = columnSort.split(',')[indexSort];
                        aoData.push({ name: "sortColumn", value: "{0},{1}".format(columnSort, dirSort) });
                    }
                    $.each($(frm).serializeObject(), function (k, v) {
                        aoData.push({ name: k, value: v });
                    });

                    //MAR agrega los checkbox
                    $(":checkbox", frm).each(function (index, elem) {
                        aoData.push({ name: $(elem).attr("id"), value: $(elem).is(":checked") });
                    })
                    //debugger
                    $.ajax({
                        "dataType": 'json',
                        "type": "POST",
                        "url": sSource,
                        "data": aoData,
                        "success": fnCallback,
                        "beforeSend": function () {
                            Grid.BeforeSend($tbl);
                        },
                        "complete": function (data) {
                            Grid.CompletePost(data);
                        }
                    });
                }
            };
        }
        return returnFn;
    },
    BeforeSend: function (tbl) {
        Loader.ShowLoader(tbl);
    },
    CompletePost: function (data) {
        Loader.HideLoader();
    }
};