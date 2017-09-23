/*prototypes*/
(function () {

    if (!Number.prototype.toLowerCase) {
        Object.defineProperty(Number.prototype, "toLowerCase", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                return this.toString();
            }
        });
    }
    if (!String.prototype.format) {
        Object.defineProperty(String.prototype, "format", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                var args = arguments;
                return this.replace(/{(\d+)}/g, function (match, number) {
                    return typeof args[number] != 'undefined' ? args[number] : match;
                });
            }
        });
    }
    if (!Number.prototype.padLeft) {
        Object.defineProperty(Number.prototype, "padLeft", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (n, str) {
                return Array(n - String(this).length + 1).join(str || '0') + this;
            }
        });
    }
    if (!String.prototype.toDate) {
        Object.defineProperty(String.prototype, 'toDate', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                var myDate = new Date(parseInt(new String(this.toString()).replace(/\/+Date\(([\d+-]+)\)\/+/, '$1')));
                return (myDate.getDate().padLeft(2)) + "/" + (myDate.getMonth() + 1).padLeft(2) + "/" + myDate.getFullYear();
            }
        });
    }
    if (!Object.prototype.cloneObject) {
        Object.defineProperty(Object.prototype, "cloneObject", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function () {
                var newObj = (this instanceof Array) ? [] : {};
                for (var i in this) {
                    if (i == 'cloneObject') continue;
                    if (this[i] && typeof this[i] == "object") {
                        newObj[i] = this[i].cloneObject();
                    } else
                        newObj[i] = this[i];
                }
                return newObj;
            }
        });
    }
    if (!Array.prototype.Get) {
        Object.defineProperty(Array.prototype, "Get", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (propertyName, valueProperty) {
                for (var i = 0, len = this.length; i < len; i++) {
                    if (typeof this[i] != "object") continue;
                    if (this[i][propertyName] === valueProperty) return this[i];
                }
            }
        });
    }
    if (!Array.prototype.GetAll) {
        Object.defineProperty(Array.prototype, "GetAll", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: function (propertyName, valueProperty) {
                var elements = [];
                for (var i = 0, len = this.length; i < len; i++) {
                    if (typeof this[i] != "object") continue;
                    if (this[i][propertyName] === valueProperty) elements.push(this[i]);
                }
                return elements;
            }
        });
    }

    // Define overriding method.
    //$.fn.extend({
    //    on: function () {
    //        var existe = false;
    //        try {
    //            var _type = arguments[0];
    //            var _selector = arguments[1];
    //            var _function = arguments[2];
    //            var __events = $._data($("body")[0], "events")[_type];
    //            if (__events !== undefined) {
    //                $.each(__events, function (i, v) {
    //                    if (v["selector"] == _selector)
    //                        existe = true;
    //                });
    //            }
    //            //// Execute the original method.
    //            if (existe === false) {
    //                return SuperJQ.on.apply(this, arguments);
    //            }
    //        }
    //        catch (e) {
    //            return SuperJQ.on.apply(this, arguments);
    //        }
    //    }
    //});
})();
(function () {
    $('body').on('focusout', '.jsMayus', function () {
        $(this).val($(this).val().toUpperCase());
    });
    $('body').on('focusout', '.jsMinus', function () {
        $(this).val($(this).val().toLocaleLowerCase());
    });
    $('body').on('paste', '.jsPaste', function () {
        return false;
    });
})();
(function () {
    // Store a reference to the original remove method.
    var SuperJQ = jQuery.fn.cloneObject();
    // Define overriding method.
    jQuery.fn.extend({
        on: function () {
            var existe = false;
            try {
                var _type = arguments[0];
                var _selector = arguments[1];
                var _function = arguments[2];
                var __events = $._data($("body")[0], "events")[_type];
                if (__events !== undefined) {
                    $.each(__events, function (i, v) {
                        if (v["selector"] == _selector)
                            existe = true;
                    });
                }
                //// Execute the original method.
                if (existe == false) {
                    return SuperJQ.on.apply(this, arguments);
                }
            }
            catch (e) {
                return SuperJQ.on.apply(this, arguments);
            }
        }
    });
})();

/*
(function ($) {
    $.fn.serializeAll = function () {
        var rselectTextarea = /^(?:select|textarea)/i;
        var rinput = /^(?:color|date|datetime|datetime-local|email|file|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;
        var rCRLF = /\r?\n/g;

        var arr = this.map(function () {
            return this.elements ? jQuery.makeArray(this.elements) : this;
        })
        .filter(function () {
            return this.name && !this.disabled &&
                (this.checked || rselectTextarea.test(this.nodeName) ||
                    rinput.test(this.type));
        })
        .map(function (i, elem) {
            var val = jQuery(this).val();

            return val == null ?
                null :
                jQuery.isArray(val) ?
                    jQuery.map(val, function (val, i) {
                        return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
                    }) :
                    { name: elem.name, value: val.replace(rCRLF, "\r\n") };
        }).get();

        return $.param(arr);
    }
})(jQuery);
*/

/*Extenciones Ajax*/
(function ($) {
    $.ajaxSetup({
        type: 'post',
        cache: false,
        datatype: 'json',
        statusCode: {
            401: General.code400,
            403: General.code403,
            404: General.code404,
            500: General.code500,
            409: General.code409,
            412: General.code412,
            600: General.code412
        }
    });
    var utilsValidationElements = {
        Atleastonerequired: function (value, validator, $field) {
            var father = '';
            if ($field.attr('name').indexOf('.') != -1)
                father = $field.attr('name').split('.').slice(0, -1).join('.');
            if (father.length > 0)
                father += '_';
            var valido = false;
            $.each($field.data('valAtleastonerequiredProperties').split(','), function (index, value) {
                if ($('#{0}{1}'.format(father, value)).length > 0 && $('#{0}{1}'.format(father, value)).val() !== '') {
                    valido = true;
                    return false;
                }
            });
            if (valido) {
                $.each($field.data('valAtleastonerequiredProperties').split(','), function (index, value) {
                    validator.updateStatus('{0}{1}'.format(father, value), validator.STATUS_VALID, 'callback');
                });
            }
            else {
                $.each($field.data('valAtleastonerequiredProperties').split(','), function (index, value) {
                    validator.updateStatus('{0}{1}'.format(father, value), 'INVALID', 'callback');
                });
            }
            return valido;
        },
        LessThan: function (value, validator, $field) {
            var val;
            if (value === '-')
                val = 0;
            else
                val = $field.asNumber();
            if (typeof $field.data('lessthan') !== 'udnefined') {
                if (val < parseFloat($field.data('greaterthan')) || val > parseFloat($field.data('lessthan')))
                    return false;
            }
            else if (val > parseFloat($field.data('lessthan')))
                return false;
            return true;
        },
        BigerThan: function (value, validator, $field) {
            var val;
            if (value === '-')
                val = 0;
            else
                val = $field.asNumber();
            if (typeof $field.data('lessthan') !== 'udnefined') {
                if (val < parseFloat($field.data('greaterthan')) || val > parseFloat($field.data('lessthan')))
                    return false;
            }
            else if (val < parseFloat($field.data('greaterthan')))
                return false;
            return true;
        },
        Between: function (value, validator, $field) {
            var val;
            var range = $field.data('between').split(',');
            if (value === '-')
                val = -1;
            else
                val = $field.asNumber();
            if (val <= parseFloat(range[0]) || val > parseFloat(range[1]))
                return false;
            else
                return true;
        }
    };
    $.fn.extend({
        groupVal: function () {
            return $(this).filter(':checked').val();
        },
        serializeObject: function () {
            var o = {};
            if (jQuery().mask)
                $(this).find("input[data-msk=true], textarea[data-msk=true]").unmask();
            if (jQuery().formatCurrency) {
                $(this).find("input[data-currency=True]").each(function (key, value) {
                    $(value).val($(value).asNumber());
                });
            }
            $(this).find("input:checkbox").each(function (k, v) {
                $('input[type=hidden][name="{0}"]'.format(v.name)).remove();
            });
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        },
        toDate: function () {
            var myDate = new Date(parseInt(new String($(this).val()).replace(/\/+Date\(([\d+-]+)\)\/+/, '$1')));
            $(this).val((myDate.getDate().padLeft(2)) + "/" + (myDate.getMonth() + 1).padLeft(2) + "/" + myDate.getFullYear());
        },
        utilsValidation: function () {
            var fields = {};
            //var selects = [];

            var formId = $(this).attr("id");

            $.each($("#{0} input[type=date][data-val], input[type=text][data-val], input[type=radio][data-val], input[type=checkbox][data-val], textarea[data-val], select[data-val],input[type=password][data-val]".format(formId)), function (key, value) {
                var dataAttributes = $(value).data();
                if (dataAttributes.val.toString().toUpperCase() == "TRUE") {
                    //debugger
                    //var isSelect = ( dataAttributes.liveSearch != undefined ? true : false);
                    var validate = {};
                    var validators = {};
                    $.each(dataAttributes, function (key, attr) {
                        switch (key) {
                            case 'valRequired':
                                validate['notEmpty'] = { message: "" + attr + "", enabled: true };
                                break;
                            case 'valAtleastonerequired':
                                var messages = attr.split('&');
                                var template = _Resourcers[messages[0]] || 'Elegir al menos un {0}';
                                var msg = template.format(messages[1]);
                                validate['callback'] = { message: msg, callback: utilsValidationElements.Atleastonerequired };
                                break;
                            case 'valMaxlength':
                                validate['stringLength'] = { max: dataAttributes.valMaxlengthMax, message: "" + attr + "" };
                                break;
                            case 'valMinlength':
                                validate['stringLength'] = { min: dataAttributes.valMinlengthMin, message: "" + attr + "" };
                                break;
                            case 'valEqualto':
                                var eqalTo = dataAttributes.valEqualtoOther.split('.');
                                validate['identical'] = { field: eqalTo[eqalTo.length - 1], message: "" + attr + "" };
                                break;
                            case 'valRegexPattern':
                                validate['regexp'] = { regexp: attr, message: "" + $(value).data('val-regex') + "" };
                                break;
                            case 'lessthan':
                                console.log('seteare less');
                                if (typeof dataAttributes['customcurrency'] !== 'undefined')
                                    validate['callback'] = { message: "" + dataAttributes['lessthanmessage'] + "", callback: utilsValidationElements.LessThan };
                                else
                                    validate['lessThan'] = { value: attr, message: "" + dataAttributes['lessthanmessage'] + "" };
                                break;
                            case 'greaterthan':
                                console.log('seteare greater');
                                if (typeof dataAttributes['customcurrency'] !== 'undefined')
                                    validate['callback'] = { message: "" + dataAttributes['greaterthanmessage'] + "", callback: utilsValidationElements.BigerThan };
                                else
                                    validate['greaterThan'] = { value: attr, message: "" + dataAttributes['greaterthanmessage'] + "" };
                                break;
                            case 'between':
                                console.log(dataAttributes);
                                if (typeof dataAttributes['customcurrency'] !== 'undefined')
                                    validate['callback'] = { message: "" + dataAttributes['betweenmessage'] + "", callback: utilsValidationElements.Between };
                                break;
                        }
                    });
                    validators['validators'] = validate;
                    var nameItem = value.name;
                    fields[nameItem] = validators;
                    //if (isSelect) {
                    //debugger;
                    //    selects.push(value.id);
                    //}
                }
            });

            var errorContainer = $(this).attr("errorcontainer");

            $(this).formValidation({
                //framework: 'bootstrap',
                //excluded: [':disabled', ':hidden', ':not(:visible)', '.ignoreField'],
                excluded: [':disabled', '.ignoreField', ':not(:visible):not(.selectpicker)'],
                /*excluded: function($field, validator) {
                    debugger
                    if ($field.is(":disabled") || $field.hasClass("ignoreField"))
                        return false;

                    if ($field.is(":not(:visible)"))
                        if(!$field.hasClass("selectpicker"))
                        return false;

                    return true;    // or false
                },*/
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: fields,
                err: {
                    container: errorContainer
                }
            });

            /*
            debugger;
            $(selects).each(function (index, _id) {

                $('#' + formId).find('[id="' + _id + '"]')
                                                    .selectpicker()
                                                    .change(function (e) {
                                                        $('#' + formId).formValidation('revalidateField', _id);
                                                    })
                                                    .end();

            });*/

            $(this).on('submit', function () { if (typeof $(this).data('submit') === 'undefined') return false; });
            $(this).find("i").each(function () {
                if ($(this).parent().find(".glyphicon").is("span"))
                    $(this).addClass("hide");
            });
        },
        utilsIsValid: function () {
            $(this).data('formValidation').resetForm();
            $(this).formValidation('validate');
            var fv = $(this).data('formValidation');
            $(this).formValidation('validate');
            var response = fv.isValid($(this));
            var fieldsinvalid = fv.getInvalidFields($(this));
            return response;
        },
        ajaxLoad: function (parameters) {
            //debugger;
            var self = this;
            var $element = $(self);
            if ($(".isloading-overlay").length == 0)
                $element.isLoading({ position: "overlay" });
            parameters.statusCode = {
                200: function (response) {
                    switch (typeof response) {
                        case 'string':
                            $element.empty();
                            $element.html(response);
                            break;
                        case 'object':
                            if (typeof response['success'] !== 'undefined' && response['success'] == false) {
                                $.utilsMessageOld({ msj: response['message'] });
                            }
                            break;
                    }
                    if (typeof parameters.Callback !== 'undefined') {
                        var call = $.Callbacks('memory once');
                        call.add(parameters.Callback);
                        call.fire(response);
                    }
                    if ($("div.isloading-overlay").length > 0)
                        $("div.isloading-overlay").parent().isLoading("hide");
                }
            };
            parameters.type = parameters.type || "get";
            parameters.datatype = "html";
            if (parameters.files) {
                parameters.processData = false;
                parameters.contentType = false;
            }
            parameters.done = function () {
                $("div.isloading-overlay").parent().isLoading("hide");
            };
            parameters = $.setAjaxDefaults(parameters);
            $.ajax(parameters);
            //$.ajax(parameters);
        },
        utilsMessage: function (parameters) {
            if (typeof parameters === "undefined")
                parameters = {};
            parameters.selecctor = $(this).selector;
            $.utilsMessage(parameters);
        },
        utilsMessageOld: function (parameters) {
            if (typeof parameters === "undefined")
                parameters = {};
            parameters.selecctor = $(this).selector;
            $.utilsMessageOld(parameters);
        },
        fillForm: function (data, replace) {
            if (replace === "undefined")
                replace = true;
            if ($(this).is("form")) {
                $.each(data, function (key, value) {
                    var selector = "{0} #{1}".format($(this).selector, key);
                    if ($(selector).length > 0) {
                        if (replace)
                            $(selector).val(value);
                    }
                });
            }
        },
        isSiblingDisabled: function () {
            return ($(this).siblings().is(":disabled") || $(this).siblings().is("[readonly]"));
        },
        typeahead2: function (parameters) {
            debugger;
            console.log(this[0]);
        }
    });
    var oldAjax = $.ajax;
    jQuery.ajax = function () {
        if (arguments[0].files === true || typeof arguments[0].ProgressBar !== 'undefined') {
            var progressBar = arguments[0].ProgressBar;
            var $argument = arguments[0];
            arguments[0]['xhr'] = function () {
                var xhr = new window.XMLHttpRequest();
                //Upload progress
                xhr.upload.addEventListener("progress", function (evnt) {
                    Loader.StatusBarUpload(evnt, progressBar, $argument['ProcessFactor']);
                }, false);
                //Download progress
                xhr.addEventListener("progress", function (evnt) {
                    Loader.StatusBarDownLoad(evnt, progressBar, $argument['ProcessFactor']);
                }, false);
                return xhr;
            }
        }
        return oldAjax.apply(this, arguments);
    }
})(jQuery);



jQuery.setAjaxDefaults = function (params) {
    var ajax = params;
    ajax.url = params.url || '';
    ajax.type = params.type || 'post';
    ajax.cache = params.cache || false;
    ajax.datatype = params.datatype || 'html';
    ajax.data = params.data || {};
    if (params.files === true) {
        ajax.ProgressBar = params.ProgressBar;
        ajax.processData = false;
        ajax.contentType = false;
    }
    ajax.ProcessFactor = params.ProcessFactor;
    if (typeof params.statusCode != 'undefined')
        params.status200 = params.statusCode["200"];
    ajax.statusCode = {
        200: params.status200,
        401: General.code400,
        403: General.code403,
        404: General.code404,
        500: General.code500,
        409: General.code409,
        412: General.code412,
        302: function () {
            $.utilsMessageOld({ msj: "ops! the page is not working." });
            if ($("div.isloading-overlay").length > 0)
                $("div.isloading-overlay").parent().isLoading("hide");
        }
    };
    return ajax;
};

jQuery.utilsMessage = function (parameters) {

    //debugger;
    //var defaults = {
    //    msj: "Better check yourself, you're not looking too good.",
    //    cssClass: "danger",
    //    fadeOut: 0,
    //    selecctor: "#page"
    //};
    //if (typeof parameters != "undefined") {
    //    parameters.msj = typeof parameters.msj === "undefined" ? defaults.msj : parameters.msj;
    //    parameters.cssClass = typeof parameters.cssClass === "undefined" ? defaults.cssClass : parameters.cssClass;
    //    parameters.fadeOut = typeof parameters.fadeOut === "undefined" ? defaults.fadeOut : parameters.fadeOut * 1000;
    //    parameters.selecctor = typeof parameters.selecctor === "undefined" ? defaults.selecctor : parameters.selecctor;
    //}
    //else
    //    parameters = defaults;
    //$(".alert-dismissible").remove();
    //$(parameters.selecctor).prepend($.templateMsj(parameters));
    //if (parameters.fadeOut > 0) {
    //    $(".alert-{0}".format(parameters.cssClass)).fadeOut(parameters.fadeOut, function () { $(this).remove(); });
    //}

    var defaults = {
        msj: "Better check yourself, you're not looking too good.",
        cssClass: "danger",
        delay: 0,
        timer: 1000,
        fadeOut: 0,
        icon: "exclamation-sign"
    };

    //debugger;
    if (typeof parameters != "undefined") {
        parameters.msj = typeof parameters.msj === "undefined" ? defaults.msj : parameters.msj;
        parameters.cssClass = typeof parameters.cssClass === "undefined" ? defaults.cssClass : parameters.cssClass;
        parameters.fadeOut = typeof parameters.fadeOut === "undefined" ? defaults.fadeOut : parameters.fadeOut * 1000;
        parameters.icon = typeof parameters.icon === "undefined" ? defaults.icon : parameters.icon;
    }
    else
        parameters = defaults;

    if (parameters.cssClass != "danger" && parameters.cssClass != "info") {
        parameters.delay = typeof parameters.delay === "undefined" ? 1000 : parameters.delay;
        parameters.timer = typeof parameters.timer === "undefined" ? 3000 : parameters.timer;
    }
    else if (parameters.fadeOut > 0) {
        parameters.delay = 1000;
        parameters.timer = parameters.fadeOut;
    }
    else {
        parameters.delay = defaults.delay;
        parameters.timer = defaults.timer;
    }

    if (parameters.cssClass == "success") {
        parameters.icon = "ok";
    } else if (parameters.cssClass == "warning") {
        parameters.icon = "warning-sign";
    } else if (parameters.cssClass == "info") {
        parameters.icon = "info-sign";
    } else {
        parameters.icon = defaults.icon;
    }

    jQuery.notify({
        //title: '<strong>' + title + '</strong>',
        title: '<strong></strong>',
        message: parameters.msj,
        icon: parameters.icon
    },
	{
	    // settings
	    allow_dismiss: true,
	    type: parameters.cssClass,
	    z_index: 2000,
	    placement: {
	        from: "bottom",
	        align: "center"
	    },
	    offset: {
	        x: 20,
	        y: 100
	    },
	    delay: parameters.delay,
	    timer: parameters.timer
	},
	{
	    animate:
		{
		    enter: 'animated bounceInDown',
		    exit: 'animated bounceOutUp'
		}
	});

};


jQuery.utilsMessageOld = function (parameters) {
    var defaults = {
        msj: "Better check yourself, you're not looking too good.",
        cssClass: "danger",
        fadeOut: 0,
        selecctor: ".container-fluid"
    };
    if (typeof parameters != "undefined") {
        parameters.msj = typeof parameters.msj === "undefined" ? defaults.msj : parameters.msj;
        parameters.cssClass = typeof parameters.cssClass === "undefined" ? defaults.cssClass : parameters.cssClass;
        parameters.fadeOut = typeof parameters.fadeOut === "undefined" ? defaults.fadeOut : parameters.fadeOut * 1000;
        parameters.selecctor = typeof parameters.selecctor === "undefined" ? defaults.selecctor : parameters.selecctor;
    }
    else
        parameters = defaults;
    $(".alert-dismissible").remove();
    $(parameters.selecctor).prepend($.templateMsj(parameters));
    if (parameters.fadeOut > 0) {
        $(".alert-{0}".format(parameters.cssClass)).fadeOut(parameters.fadeOut, function () { $(this).remove(); });
    }

};

jQuery.getYears = function (year, month, day) {

    var birthdate = new Date(year, month, day);
    var ageDifMs = Date.now() - birthdate.getTime();
    var ageDate = new Date(ageDifMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

jQuery.templateMsj = function (options) {
    return '<div style="margin-top:10px;"class="alert alert-{0} alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>{1}</strong> <span></span></div>'.format(options.cssClass, options.msj);
};


jQuery.ajaxLoad = function (parameters) {
    //debugger;
    var URL = typeof parameters.url === "undefined" ? "" : parameters.url;
    var DATA = typeof parameters.data === "undefined" || parameters.data == {} ? DATA = {} : DATA = parameters.data;
    var METHOD = typeof parameters.method === "undefined" ? METHOD = "GET" : METHOD = parameters.method;
    var form = $('<form>').attr({
        method: METHOD,
        action: URL
    });
    $('body').isLoading({ position: "overlay" });
    Internal.iterateValues(DATA, [], form);
    $('body').append(form);
    //debugger;
    form.submit();
};

var Internal = {
    getInput: function (name, value, parent) {
        var parentString;
        if (parent.length > 0) {
            parentString = parent[0];
            for (var i = 1; i < parent.length; ++i) {
                parentString += "[" + parent[i] + "]";
            }
            name = parentString + "[" + name + "]";
        }
        return $("<input>").attr({
            type: "hidden",
            name: name,
            value: value
        });
    },
    iterateValues: function (values, parent, form) {
        var iterateParent = [];
        for (var i in values) {
            if (typeof values[i] == "object") {
                iterateParent = parent.slice();
                iterateParent.push(i);
                Internal.iterateValues(values[i], iterateParent, form);
            } else {
                Internal.getInput(i, values[i], parent).appendTo(form);
            }
        }
    },
    getDefaultsModal: function (params) {
        param.Size = param.Size || Size.Default;
        params.callbackOk = params.callbackOk || undefined;
        params.callbackCancel = params.callbackCancel || undefined;
        params.txtBtnOk = params.txtBtnOk || '';
        params.txtBtnCancel = params.txtBtnCancel || undefined;
        params.tittle = params.tittle || undefined;
        return params;
    }
};

function hasEventListener(element, eventName, namespace) {
    var returnValue = false;
    var events = $(element).data("events");
    if (events) {
        $.each(events, function (index, value) {
            if (index == eventName) {
                if (namespace) {
                    $.each(value, function (index, value) {
                        if (value.namespace == namespace) {
                            returnValue = true;
                            return false;
                        }
                    });
                }
                else {
                    returnValue = true;
                    return false;
                }
            }
        });
    }
    return returnValue;
}


