window.ConfiguracionData = {
    defaultFileName: undefined,
    defaultFile: undefined,
    UrlGuardarDatos: undefined,
    UrlGuardarImagen: undefined,
};
window.Configuracion = {
    Init: function (parameters) {
        $.extend(ConfiguracionData, parameters);
        Configuracion.InitDropify();
        $('body').on('click', '#btnGuardarDatos', this.ActionGuardarDatos);
        $('body').on('click', '#btnGuardarImagen', this.ActionGuardarImagen);

    },
    ActionGuardarDatos: function () {
        var content = $("#{0}".format("DatosUsuario")).serializeObject();
        General.ajax({
            headers: {
                'Content-Type': 'application/json'
            },
            url: ConfiguracionData.UrlGuardarDatos,
            data: JSON.stringify({
                content: content
            }),
            type: "POST",
            Callback: function (response) {
                if (response.success) {
                    $(".container-fluid").utilsMessage({ msj: response.message, cssClass: "success", fadeOut: 15 });
                } else {
                    $(".container-fluid").utilsMessage({ msj: response.message });
                }
            },
            error: Configuracion.CallbackError
        });
    },
    CallbackError: function (response) {
        $('.modal-body').utilsMessage({ msj: response.message, fadeOut: 10 });
    },
    ActionGuardarImagen: function () {
        // Checking whether FormData is available in browser  
        if (window.FormData !== undefined) {

            var fileUpload = $("#FileUpload").get(0);
            var files = fileUpload.files;

            // Create FormData object  
            var fileData = new FormData();

            // Looping over all files and add it to FormData object  
            for (var i = 0; i < files.length; i++) {
                fileData.append(files[i].name, files[i]);
            }

            // Adding one more key to FormData object  
            fileData.append('username', "Manas");

            General.ajax({
                url: ConfiguracionData.UrlGuardarImagen,
                type: "POST",
                contentType: false,
                processData: false,
                data: fileData,
                Callback: function (response) {
                    if (response.success) {
                        $(".container-fluid").utilsMessage({ msj: response.message, cssClass: "success", fadeOut: 15 });
                    } else {
                        $(".container-fluid").utilsMessage({ msj: response.message });
                    }
                },
                error: Configuracion.CallbackError
            });
        }
        else {
            alert("Su navegador no permite subir imagenes, intente con otro.");
        }
    },
    InitDropify: function () {
      
    }
};
