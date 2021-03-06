"use strict";
/*
   Achtung - wichtige Hinweise:
   -----------------------------------------------------------------------------
   1) Sollte VSC jQuery nicht kennen, dann müssen die Typen erst importiert werden
      Führen Sie dazu Folgendes im Terminal von VSC aus:
         npm install --save @types/jquery
   2) Fehlermeldung beim Ausführen von Ajax-Requests:
      "Quellübergreifende (Cross-Origin) Anfrage blockiert: Die Gleiche-Quelle-Regel verbietet das Lesen der externen Ressource ..."
      --> das passiert wenn Client und Server von unterschiedlichen Quellen kommen
          (z.B. Client: http://localhost:3000/...
                Server: http://localhost:80/... )
      --> dann muss für den Server angegeben werden, dass er das Ergebnis ausliefern darf
      --> Erstellen einer .htaccess - Datei im Verzeichnis der anzusprechenden PHP-Datei mit folgendem Inhalt:
             Header set Access-Control-Allow-Origin "*"
*/
// Settings:
//hier muss jeder seinen eigenen path angeben
var restServer = "http://localhost:80/SS2021/Abschlussprojekt/Pr2/web/Backend/serviceHandler.php";
$.getJSON(restServer, { 'method': 'queryApp' }, function (data) {
    $('#mainpart').text(JSON.stringify(data));
    //get the content from the mainpart and put it in there 
    var text = $('#mainpart').text();
    $('#mainpart').text(" ");
    var body = document.getElementById("mainpart");
    //make a button => expands smth on click
    var plusButton = document.createElement("button");
    var span = document.createElement("span");
    var buttonText = document.createTextNode("+");
    span.appendChild(buttonText);
    plusButton.addEventListener("click", showForm);
    plusButton.setAttribute("class", "plusButton");
    plusButton.appendChild(span);
    body === null || body === void 0 ? void 0 : body.appendChild(plusButton);
    //make appointment ist verbunden mit dem oben gebildeteten Button
    var div = document.createElement("div");
    div.setAttribute("class", "hiddenInhalt container divForm col-md-12 col-lg-12 col-sm-12");
    div.setAttribute("id", "divForm");
    var title = document.createElement("h1");
    var titleInhalt = document.createTextNode("Create Appointment");
    title.setAttribute("class", "formTitle");
    title.appendChild(titleInhalt);
    //function to make the fields
    createInputs("text", "Titel: ", "titel");
    createInputs("text", "Ort: ", "ort");
    //let p = document.createElement("p");
    //const pInhalt = document.createTextNode("Ablaufdatum: ");
    //p?.appendChild(pInhalt);
    //form?.appendChild(p);
    createInputs("date", "Ablaufdatum: ", "ablaufdatum");
    createInputs("submit", "Submit", "submit");
    div === null || div === void 0 ? void 0 : div.appendChild(title);
    //add button to add single appointments
    var addApp = document.createElement("button");
    var sp = document.createElement("span");
    var Btext = document.createTextNode("+");
    sp.appendChild(Btext);
    addApp.addEventListener("click", addOneAppo);
    addApp.setAttribute("class", "addApp");
    addApp.appendChild(sp);
    div === null || div === void 0 ? void 0 : div.appendChild(addApp);
    div === null || div === void 0 ? void 0 : div.appendChild(form);
    body === null || body === void 0 ? void 0 : body.appendChild(div);
    //split the text
    var res = text.split("}"); //nur um zu schauen wie viele objekte da sind
    var _loop_1 = function (i) {
        var id = i.toString(); //nur daweil
        //------------------LI OBJEKT ERSTELLEN------------------
        //für jedes Element aus i wird ein li objekt erstellt
        var ul = document.getElementById("mainpart");
        var item = document.createElement("li");
        item.setAttribute("id", id);
        item.setAttribute("class", "appointmentListe col-md-12 col-lg-12 col-sm-12 " + data[i].title); //Klasse für weitere Css anpassungen
        //span zum title
        var spanTitle = document.createElement("span");
        var title_1 = document.createElement("h1");
        var titleInhalt_1 = document.createTextNode(data[i].title);
        title_1.setAttribute("class", "appointmentTitle");
        title_1.appendChild(titleInhalt_1);
        title_1.addEventListener("click", function () {
            viewDetails(id);
        });
        //delete Button
        var deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "deleteButton");
        deleteButton.addEventListener("click", function () {
            deleteAppointment(data[i].title);
        });
        deleteButton.addEventListener("click", function () {
            deleteChild(id);
        });
        var icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-trash");
        deleteButton.appendChild(icon);
        spanTitle.appendChild(deleteButton);
        spanTitle.appendChild(title_1);
        item.appendChild(spanTitle);
        //Check if Appointment ist abgelaufen
        var d = new Date();
        //get the current date
        var curMonth = d.getMonth() + 1;
        var curDay = d.getDate();
        var curYear = d.getFullYear();
        var datum = data[i].Ablaufdatum.split("-");
        var month = datum[1];
        var day = datum[2];
        var year = datum[0];
        //is current date == data[i].Ablaufdatum?
        if (parseFloat(month) <= curMonth && curDay >= parseFloat(day) && curYear >= parseFloat(year)) {
            //title.removeEventListener("click", function(){viewDetails(id)});
            //title.classList.add("abgelaufen"); // check ob li diese klasse hat
            item.classList.add("abgelaufenerTermin");
        }
        //-----------------------HIDDEN DIV------------------------
        //create hidden element where the details are shown
        var inhalt = document.createElement("div");
        //drinnen stehen alle termine und es ist nicht 
        inhalt.setAttribute("class", "hiddenInhalt col-md-12 col-lg-12 col-sm-12 " + id); //hidden => not displayed
        inhalt.setAttribute("id", data[i].title); //später für die Termine
        var spanText = document.createElement("span");
        spanText.setAttribute("class", "spanText");
        Erstelldatum = document.createTextNode(" Erstelldatum: " + data[i].Erstelldatum);
        Ablaufdatum = document.createTextNode(" Ablaufdatum: " + data[i].Ablaufdatum);
        Ort = document.createTextNode("Ort: " + data[i].Ort);
        spanText.appendChild(Ort);
        spanText.appendChild(Erstelldatum);
        spanText.appendChild(Ablaufdatum);
        //was brauchen wir in dem div ??
        //-------------------------FORMULAR------------------------
        //Input => für den Namen
        var formular = document.createElement("form");
        formular.setAttribute("class", "formTermine");
        //für das submit der Daten
        //Options => get the Termine
        //Termine in einem Div zum scrollen eingelegt 
        var formDiv = document.createElement("div");
        formDiv.setAttribute("class", "container formDiv col-md-12 col-lg-12 col-sm-12");
        formular.appendChild(formDiv);
        inhalt.appendChild(spanText);
        inhalt.appendChild(formular);
        //-----------------------FUNCTIONALITY---------------------
        //onlick event für die Detailansicht
        item.appendChild(inhalt); //add the div
        ul === null || ul === void 0 ? void 0 : ul.appendChild(item);
    };
    var Erstelldatum, Ablaufdatum, Ort;
    for (var i = 0; i < res.length - 1; i++) {
        _loop_1(i);
    }
});
$.getJSON(restServer, { 'method': 'queryTermine' }, function (data) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    //create new div in body
    $('#body').append("<div id='termine'></div>"); //nur zwischen div für den text
    $('#termine').text(JSON.stringify(data));
    var text = $('#termine').text();
    $('#termine').text(" ");
    //Termine werden als select dargestellte
    //Jquery statt dom verwenden => weniger arbeit 
    var res = text.split("}");
    //appointments hinzufügen
    for (var i = 0; i < (res === null || res === void 0 ? void 0 : res.length); i++) {
        //get the div with the fitting appointment
        //check if there is a user set or not => if yes => make it unclickable
        //split datum 
        var date = (_a = data[i]) === null || _a === void 0 ? void 0 : _a.Datum.split(" ");
        if ($("li." + ((_b = data[i]) === null || _b === void 0 ? void 0 : _b.appointment)).hasClass("abgelaufenerTermin")) {
            $('#' + ((_c = data[i]) === null || _c === void 0 ? void 0 : _c.appointment) + " > .formTermine > .formDiv").append("<div class='abgelaufen terminDiv'><label for='" + ((_d = data[i]) === null || _d === void 0 ? void 0 : _d.Datum) + "'>" + date[0] + "</label><p>" + date[1] + "</p><p>Votes: " + ((_e = data[i]) === null || _e === void 0 ? void 0 : _e.votes) + "</p><button value='" + ((_f = data[i]) === null || _f === void 0 ? void 0 : _f.Datum) + "' onclick='present()' class='open'><i class='fa fa-info-circle' aria-hidden='true'></i></button><br></div>");
        }
        else {
            $('#' + ((_g = data[i]) === null || _g === void 0 ? void 0 : _g.appointment) + " > .formTermine > .formDiv").append("<div class='terminDiv'><label for='" + ((_h = data[i]) === null || _h === void 0 ? void 0 : _h.Datum) + "'>" + date[0] + "</label><br><p>" + date[1] + "</p><p>Votes: " + ((_j = data[i]) === null || _j === void 0 ? void 0 : _j.votes) + "</p><input type='radio' id='" + ((_k = data[i]) === null || _k === void 0 ? void 0 : _k.Datum) + "' class='checkbox' name='" + ((_l = data[i]) === null || _l === void 0 ? void 0 : _l.Datum) + "' value='" + ((_m = data[i]) === null || _m === void 0 ? void 0 : _m.Datum) + "'><br><button value='" + ((_o = data[i]) === null || _o === void 0 ? void 0 : _o.Datum) + "' onclick='present()' class='open'><i class='fa fa-info-circle' aria-hidden='true'></i></button><br></div>");
        }
    }
});
//-------------------------------------COMPLETED FORM-----------------------------------------
$.getJSON(restServer, { 'method': 'getUserComments' }, function (data) {
    var _a, _b, _c, _d, _e, _f;
    //create new div in body
    $('#body').append("<div id='termine'></div>"); //nur zwischen div für den text
    $('#termine').text(JSON.stringify(data));
    var text = $('#termine').text();
    $('#termine').text(" ");
    //Termine werden als select dargestellte
    //Jquery statt dom verwenden => weniger arbeit 
    var res = text.split("}");
    //appointments hinzufügen
    if (data != null) {
        var _loop_2 = function (i) {
            //jeder termin bekommt ein pop up
            datum = (_a = data[i]) === null || _a === void 0 ? void 0 : _a.Datum.split(" ");
            $("li." + ((_b = data[i]) === null || _b === void 0 ? void 0 : _b.appointment)).append('<div class="popup-overlay ' + datum[0] + ' ' + datum[1] + ' col-md-12 col-lg-12 col-sm-12"><div class="col-md-12 col-lg-12 col-sm-12 popup-content"><h2>Termin Information</h2><div class="terminUser col-md-12 col-lg-12 col-sm-12"><img src="/img/catbus.png" class"usersym" style="width:80px"></img>' + ((_c = data[i]) === null || _c === void 0 ? void 0 : _c.username) + ' commented: </div><div class="terminKommis col-md-12 col-lg-12 col-sm-12">' + ((_d = data[i]) === null || _d === void 0 ? void 0 : _d.kommentar) + '<img src="/img/jumptot.gif" class"usersym" style="width:80px"><p class="userK"></p><p class="kommentare"></p><button  value="' + ((_e = data[i]) === null || _e === void 0 ? void 0 : _e.Datum) + '" class="close ' + ((_f = data[i]) === null || _f === void 0 ? void 0 : _f.appointment) + '">Close</button></div></div></div>');
            $(".open").on("click", function (e) {
                var _a;
                e.preventDefault();
                var id = "" + $(this).val() + "";
                var idd = id.split(" ");
                //neu
                $("#" + ((_a = data[i]) === null || _a === void 0 ? void 0 : _a.appointment)).hide();
                $(".popup-overlay." + idd[0]).show();
            });
            $(".close, .popup").on("click", function (event) {
                var _a;
                event.preventDefault();
                var id = "" + $(this).val() + "";
                var idd = id.split(" ");
                $(".popup-overlay." + idd[0]).hide();
                //neu
                $("#" + ((_a = data[i]) === null || _a === void 0 ? void 0 : _a.appointment)).show();
            });
        };
        var datum;
        for (var i = 0; i < res.length; i++) {
            _loop_2(i);
        }
    }
});
//fill the pop up
$.getJSON(restServer, { 'method': 'getUserComments' }, function (data) {
    $('#body').append("<div id='termine'></div>"); //nur zwischen div für den text
    $('#termine').text(JSON.stringify(data));
    var text = $('#termine').text();
    $('#termine').text(" ");
    var res = text.split("}");
    for (var i = 0; i < res.length; i++) {
        //Füllen der Pop Ups
    }
});
$.getJSON(restServer, { 'method': 'getAppointmentTitle' }, function (data) {
    var _a, _b, _c, _d, _e;
    $('#body').append("<div id='titel'></div>"); //nur zwischen div für den text
    $('#titel').text(JSON.stringify(data));
    var text = $('#titel').text();
    $('#titel').text(" ");
    //Termine werden als select dargestellte
    //Jquery statt dom verwenden => weniger arbeit 
    var res = text.split("}");
    for (var i = 0; i < res.length; i++) {
        //let funcc = "UserSelect(" + data[i]?.title + ")";
        //einfügen von namensfeldern
        if (!($('li.' + ((_a = data[i]) === null || _a === void 0 ? void 0 : _a.title)).hasClass("abgelaufenerTermin"))) {
            $('#' + ((_b = data[i]) === null || _b === void 0 ? void 0 : _b.title) + " > .formTermine").append("<input type='text' class='namensFeld enetereduser' placeholder='Name...'><br>");
            //einfügen von Kommentar Feld
            $('#' + ((_c = data[i]) === null || _c === void 0 ? void 0 : _c.title) + " > .formTermine").append("<input type='text'  class='namensFeld kommentar' placeholder='Kommentar...'>");
            //einfügen von Submit Button
            $('#' + ((_d = data[i]) === null || _d === void 0 ? void 0 : _d.title) + " > .formTermine").append("<button type='submit' id='sendButton' onclick='UserSelect(this.value)' value='" + ((_e = data[i]) === null || _e === void 0 ? void 0 : _e.title) + "' class='btn btn-dark submit'>send</button>");
        }
    }
});
//----------KOMMENTARE SCHÖN DARSTELLEN-------------
//----------FORM GETS SUBMITTED-----------------
var appointment = "";
var username = "";
var kommi = "";
//------BUTTON FUNCTION--------
function UserSelect(id) {
    //daten in die db speicherns
    var button = document.getElementById("sendButton");
    button === null || button === void 0 ? void 0 : button.addEventListener("click", function (event) { event.preventDefault(); });
    $('.enetereduser').each(function () {
        if ($(this).val() != null) {
            username = "" + $(this).val() + "";
            return false;
        }
    });
    $('.kommentar').each(function () {
        if ($(this).val() != null) {
            kommi = "" + $(this).val() + "";
            return false;
        }
    });
    $('.terminDiv').children('input').each(function () {
        if ($(this).is(':checked')) {
            appointment = "" + $(this).val() + "";
            var data = {
                //Methode
                method: "addUserSelect",
                //Argumente
                kommentar: kommi,
                user: username,
                id: id,
                appointment: appointment
            };
            $.ajax({
                url: restServer,
                method: "POST",
                dataType: 'json',
                data: data,
                success: function () {
                    //alert("success"); //schöne success msg machen
                    $("#divform").html('<div class="alert alert-success" role="alert"> Appointment was created </div>');
                },
                error: function () {
                    //alert("error"); //schöne error message
                    $("#divform").html('<div class="alert alert-danger" role="alert"> There was a problem. Please try again </div>');
                }
            });
        }
    });
}
//---------------------------------------FUNKTIONEN--------------------------------------------
var form = document.createElement("form");
form.setAttribute("id", "hiddenForm"); //thats how to get the form
function viewDetails(id) {
    //does a toggle and adds every new detail
    //get the event target
    $("." + id).slideToggle();
}
function showForm() {
    $(".divForm").slideToggle();
}
function addOneAppo() {
    var br = document.createElement("br");
    var inputDatetime = document.createElement("input");
    inputDatetime.setAttribute("class", "addOne");
    inputDatetime.setAttribute("placeholder", "DD.MM.YY H:M");
    inputDatetime.type = "datetime-local";
    form === null || form === void 0 ? void 0 : form.appendChild(br);
    form === null || form === void 0 ? void 0 : form.appendChild(inputDatetime);
}
function deleteAppointment(id) {
    var daten = {
        method: "deleteAppointment",
        title: id
    };
    $.ajax({
        url: restServer,
        type: "POST",
        dataType: 'json',
        data: daten,
        success: function () {
            $("#mainpart").remove("." + id);
        }
    });
}
function deleteChild(id) {
    $("#" + id).remove();
}
function createInputs(type, labelName, id) {
    //type => ... dame, date, checkbox etc. 
    var input = document.createElement("input");
    input.setAttribute("class", "createAttribute");
    input.setAttribute("placeholder", labelName);
    input.setAttribute("id", id);
    if (type == "text")
        input.type = "text";
    if (type == "date")
        input.type = "date";
    if (type == "submit") {
        input.type = "submit";
        input.classList.remove("createAttribute"); //submit button hat andere eigenschaften
        input.classList.add("submit");
        input.classList.add("hiddenSubmit");
        input.addEventListener("click", send);
        input.addEventListener("click", function (event) { event.preventDefault(); });
    }
    //always appendChild at the end
    form === null || form === void 0 ? void 0 : form.appendChild(input);
}
function send() {
    var oneTitle = $("#titel").val();
    var daten = {
        //Methode
        method: "saveAppointment",
        //Argumente
        title: oneTitle,
        ort: $("#ort").val(),
        //Ablaufdatum
        ablaufdatum: $("#ablaufdatum").val(),
    };
    $.ajax({
        url: restServer,
        method: "POST",
        dataType: 'json',
        data: daten,
        success: function (data) {
            console.log(data);
            //$("#hiddenForm").html('<div class="alert alert-success" role="alert"> Appointment was created </div>');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.warn(xhr);
            console.log(daten);
            console.log(thrownError);
            //$("#hiddenForm").html('<div class="alert alert-danger" role="alert"> There was a Problem! Please try again </div>');
        }
    });
    var inputdata = {};
    $('#hiddenForm').children('.addOne').each(function () {
        inputdata = {
            datetime: $(this).val(),
            title: oneTitle,
            method: "saveOneTime",
        };
        $.ajax({
            url: restServer,
            method: "POST",
            data: inputdata,
            success: function () {
                console.log(inputdata);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.warn(xhr.responseText);
                console.log("not working");
            }
        });
    });
    //schließen und clear  
    showForm();
    $("#titel").val("");
    $("#ort").val("");
    $("#ablaufdatum").val("");
    $('#hiddenForm').children('.addOne').each(function () {
        $(this).val("");
    });
    window.location.reload();
}
