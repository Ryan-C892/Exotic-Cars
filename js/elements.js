// Form elements //

function Form_SelectVehicle(vid, detailid) {
    var div = $("#" + detailid);
    if (vid == "") {
        div.html("");
        div.hide();
    } else {
        var url = _AppUrls.Clients + "ajax/formvehicle.aspx?ClientID=" + _ClientId + "&VehicleID=" + vid + "&TS=" + Number(new Date());
        //url = url.replace("http://", "https://");
        div.load(url + " #divMain");
        div.show();
    }
}

function SelectMake(make) {
    var vtype = $("input[id$='xVehicleType']").get(0).value;

    var models = $("select.model").get(0);
    if (vtype != "O") {
        while (models.length > 0) models.remove(0);
        var selectedMake = make.options[make.selectedIndex].value;
        if (MakeList[selectedMake] === undefined) {
            var opt1 = document.createElement("OPTION");
            opt1.text = "Other";
            opt1.value = "Other";
            models.options.add(opt1);
        } else {
            if (MakeList[selectedMake].length > 0) {
                //var om = false;
                for (i = 0; i < MakeList[selectedMake].length; i++) {
                    if (MakeList[selectedMake][i] == "Other") {
                        //om = true;
                    }
                    else {
                        var opt2 = document.createElement("OPTION");
                        opt2.text = MakeList[selectedMake][i];
                        opt2.value = MakeList[selectedMake][i];
                        models.options.add(opt2);
                    }
                }

                var opt3 = document.createElement("OPTION");
                opt3.text = "Other";
                opt3.value = "Other";
                models.options.add(opt3);

            }
            else {

                var opt4 = document.createElement("OPTION");
                opt4.text = "All Models";
                opt4.value = "All Models";
                models.options.add(opt4);
            }
        }
    }
}

function Inventory_SetSortBy(elementId, sortBy) {
    $("#" + elementId + "_xSortBy").val(sortBy);
    $("#" + elementId + "_form").submit();
}

function Inventory_SetPage(elementId, pageId) {
    $("#" + elementId + "_xPageId").val(pageId);
    $("#" + elementId + "_form").submit();
}

function Inventory_SetPageSize(elementId, pageSize) {
    $("#" + elementId + "_xPageSize").val(pageSize);
    $("#" + elementId + "_form").submit();
}

function Inventory_SelectSearchFor(elementId, searchFor) {
    var label = searchFor;
    var placeholder = searchFor;
    switch (searchFor) {
        case "MakeModel":
            label = "Make Model";
            placeholder = "Make Model (e.g. Honda Accord)";
            break;
        case "YearMakeModel":
            label = "Year Make Model";
            placeholder = "Year Make Model (e.g. 2009 Honda Accord)";
            break;
        case "StockNum":
            label = "Stock #";
            placeholder = "Stock # starting with...";
            break;
        case "VIN":
            placeholder = "VIN starting with...";
            break;
        case "Color":
            placeholder = "Color (e.g. Black, Red, Silver, etc.)";
            break;
    }
    $("#" + elementId + "_SearchForLabel").html(label);
    $("#" + elementId + "_SearchText").prop("placeholder", placeholder);
    $("#" + elementId + "_SearchFor").val(searchFor);
}

// Credit application //

var vehicles;

function SelectAppType() {
    var joint = ($("#CreditApp_AppType").val() === "Joint");
    $("#divCoApp_Personal").toggle(joint);
    $("#divCoApp_Employment").toggle(joint);
    $("#divCoApp_Residential").toggle(joint);
    $("#divCoApp_Financial").toggle(joint);
}

function SaveApplication() {
    $("#xAction").val("Save");
    $("#CreditApp_Save").html("<i class='fa fa-spinner fa-spin'></i>&nbsp; Submitting...").attr("disabled", "disabled");
    g("CreditApp_form").submit();

}

function Form_FilterDesiredVehicle() {
    var year = $("#CreditApp_YearFilter").val();
    var make = $("#CreditApp_MakeFilter").val();
    var model = $("#CreditApp_ModelFilter").val();

    var list = $("#CreditApp_Vehicle");
    var selectedVehicle = list.val();

    list.empty();
    list.prop("disabled", false);

    if (year === "" && make === "" && model === "") {
        vehicles.appendTo("#CreditApp_Vehicle");
        $("#CreditApp_Vehicle").val(selectedVehicle);
    }
    else {
        var index;
        for (index = 0; index < vehicles.length; ++index) {
            var option = vehicles[index];
            if (((year === "" || option.innerText.indexOf(year) > -1) && (make === "" || option.innerText.indexOf(make) > -1) && ((model === "" || option.innerText.indexOf(model) > -1)))) {
                list.append(option);
            }
        }

        if (list.children().length < 1) {
            list.append("<option value=''>-- No vehicles matching your filter --</option>");
            list.prop("disabled", true);
        }

        //$("#CreditApp_Vehicle").val('');//
        //$("#CreditApp_Vehicle_Details").hide();//
    }

    list[0].selectedIndex = 0;
    Form_SelectVehicle(list.val(), "CreditApp_Vehicle_Details");
}

function ResetFilter() {
    $("#CreditApp_YearFilter").val('');
    $("#CreditApp_MakeFilter").val('');
    $("#CreditApp_ModelFilter").val('');
    Form_FilterDesiredVehicle();
    $("#CreditApp_Vehicle").val('');
    $("#CreditApp_Vehicle_Details").hide();
    $("#FilterReset").blur();
}

$(function () {
    SelectAppType();
    if ($("#CreditApp_Vehicle").length) {
        vehicles = $("#CreditApp_Vehicle option");

        Form_SelectVehicle($("#CreditApp_Vehicle").val(), "CreditApp_Vehicle_Details");
    }
});

//Request Form Data//

var target;

$("#RequestText").on("hide.bs.modal",
    function () {
        $(".modal-body input").val("");

    });
$('#RequestText').on('show.bs.modal',
    function (e) {
        $("#btnText").show();
        // $("#btnText").html("Request asdasdd");
        $(".RequestForm").show();
        $(".successForm").hide();
        $(".errorForm").hide();
        $(document).off('focusin.modal');
        target = e.currentTarget;
        //get data-id attribute of the clicked element
        //var photoUrl = $(e.relatedTarget).data('photo');
        //var vin = $(e.relatedTarget).data('vin');
        //var stock = $(e.relatedTarget).data('stock');
        //var title = $(e.relatedTarget).data('title');
        //$(e.currentTarget).find('input[name="firstName"]').val(getCookie("firstName"));
        //$(e.currentTarget).find('input[name="lastName"]').val(getCookie("lastName"));
        //$(e.currentTarget).find('input[name="emailAddress"]').val(getCookie("emailAddress"));
        //target = e.currentTarget;

        //populate the textbox               


        id = $(e.relatedTarget).data('id');

    });
$("#btnText").on("click",
    function () {
        var fName = $(target).find('input[name="firstName"]').val();
        var lName = $(target).find('input[name="lastName"]').val();
        var phoneNumber = $(target).find('input[name="phoneNumber"]').val();
        var comment = $(target).find('textarea[name="txtComments"]').val();
        if (fName === "") {
            //   $("#shakeFirst").effect("shake");
            //   return false;
        }
        if (lName === "") {
            //  $("#shakeLast").effect("shake");
            //   return false;
        }
        if (phoneNumber === "") {
            //   $("#shakeEmail").effect("shake");
            //   return false;
        }


        //setCookie("firstName", fName, 30);
        //setCookie("lastName", lName, 30);
        //setCookie("emailAddress", phoneNumber, 30);
        $.ajax({
            url: clientUrl + 'Scripts/EmailForPrice.aspx/SendText',
            type: 'POST',
            data: '{"clientId":"' +
            _ClientId +
            '", "firstName":"' +
            fName +
            '", "lastName":"' +
            lName +
            '", "comment":"' +
            comment +
            '", "phoneNumber":"' +
            phoneNumber +
            '", "sellyNumber":"' +
            SellyPhoneNumber +
            '", "sellyDealerId":"' +
            SellyDealerId +
            '"}',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            global: true,
            success: function (response) {
                if (response.d.Success === false) {
                    $(".RequestForm").hide();
                    $(".errorForm").show();
                } else {
                    $("#btnText").hide();
                    $(".RequestForm").hide();
                    $(".successForm").show();
                }

            },
            failure: function (response) {
                alert(response.d);
            }
        });
    });