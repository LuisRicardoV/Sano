window.PaisElements = {
    FormName: undefined,
    UrlLogin: undefined,
};

window.Pais = {
    init: function (parameters) {
        $.extend(PaisElements, parameters);
    },
    InitDataTable: function (tableName) {
        $(tableName).DataTable({ "order": [[3, "desc"]] });
    },
    InitRowDataTable: function (tableName) {

        var objTable = $(tableName).DataTable({
            responsive: true,
            "order":
                [
                    [3, "asc"]
                ],
            "columnDefs":
                [
                    {
                        "targets": [0],
                        "visible": false,
                        "searchable": false
                    }
                ]
        });
        var objEvento = tableName + " tbody"

        $(objEvento).on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                objTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        $('#button').click(function () {
            objTable.row('.selected').remove().draw(false);
        });



    }
};

