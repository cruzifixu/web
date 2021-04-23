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
//----------------------------------DISPLAY THE APPOINTMENTS---------------------------------
$.getJSON(restServer, { 'method': 'queryPersons' }, function (data) {
    $('#mainpart').text(JSON.stringify(data));
    //let node = document.getElementById('mainpart');
    //alert("Hallo");
    var ul = document.getElementById("mainpart");
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
    div.setAttribute("class", "hiddenInhalt container divForm");
    div.setAttribute("id", "divForm");
    var title = document.createElement("h1");
    var titleInhalt = document.createTextNode("Create Appointment");
    title.setAttribute("class", "formTitle");
    title.appendChild(titleInhalt);
    //function to make the fields
    createInputs("text", "Titel: ", "titel");
    createInputs("text", "Ort: ", "ort");
    createInputs("date", "Ablaufdatum: ", "ablaufdatum");
    createInputs("date", "Datum: ", "datum");
    createInputs("submit", "Submit", "submit");
    div === null || div === void 0 ? void 0 : div.appendChild(title);
    div === null || div === void 0 ? void 0 : div.appendChild(form);
    body === null || body === void 0 ? void 0 : body.appendChild(div);
    //split the text
    var res = text.split("}"); //nur um zu schauen wie viele objekte da sind
    var _loop_1 = function (i) {
        var id = i.toString(); //nur daweil
        //------------------LI OBJEKT ERSTELLEN------------------
        //für jedes Element aus i wird ein li objekt erstellt
        var item = document.createElement("li");
        item.setAttribute("id", id);
        item.setAttribute("class", "appointmentListe"); //Klasse für weitere Css anpassungen
        var title_1 = document.createElement("h1");
        var titleInhalt_1 = document.createTextNode(data[i].title);
        title_1.setAttribute("class", "appointmentTitle");
        title_1.appendChild(titleInhalt_1);
        item.appendChild(title_1);
        title_1.addEventListener("click", function () {
            viewDetails(id);
        });
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
        if (parseFloat(month) == curMonth && curDay == parseFloat(day) && curYear == parseFloat(year)) {
            title_1.removeEventListener("click", function () { viewDetails(id); });
            title_1.classList.add("abgelaufen");
            item.classList.add("abgelaufenerTermin");
        }
        //-----------------------HIDDEN DIV------------------------
        //create hidden element where the details are shown
        var inhalt = document.createElement("div");
        //drinnen stehen alle termine und es ist nicht 
        inhalt.setAttribute("class", "hiddenInhalt " + id); //hidden => not displayed
        inhalt.setAttribute("id", data[i].title); //später für die Termine
        Datum = document.createTextNode(" Datum: " + data[i].Datum);
        Ablaufdatum = document.createTextNode(" Ablaufdatum: " + data[i].Ablaufdatum);
        Ort = document.createTextNode("Ort: " + data[i].Ort);
        //was brauchen wir in dem div ??
        //-------------------------FORMULAR------------------------
        //Input => für den Namen
        var formular = document.createElement("form");
        formular.setAttribute("class", "formTermine");
        //für das submit der Daten
        //Options => get the Termine
        //Termine in einem Div zum scrollen eingelegt 
        var formDiv = document.createElement("div");
        formDiv.setAttribute("class", "container formDiv");
        formular.appendChild(formDiv);
        /*let input = document.createElement("input") as HTMLElement;
        input.setAttribute("class", "namensFeld");
        input.setAttribute("placeholder", "Name...");

        formular.appendChild(input);*/
        inhalt.appendChild(Ort);
        inhalt.appendChild(Ablaufdatum);
        inhalt.appendChild(Datum);
        inhalt.appendChild(formular);
        //-----------------------FUNCTIONALITY---------------------
        //onlick event für die Detailansicht
        item.appendChild(inhalt); //add the div
        ul === null || ul === void 0 ? void 0 : ul.appendChild(item);
    };
    var Datum, Ablaufdatum, Ort;
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
    for (var i = 0; i < res.length; i++) {
        //get the div with the fitting appointment
        //check if there is a user set or not => if yes => make it unclickable
        if (((_a = data[i]) === null || _a === void 0 ? void 0 : _a.user) != null) {
            //add class => unclickable => "chosen" added 
            $('#' + ((_b = data[i]) === null || _b === void 0 ? void 0 : _b.appointment) + " > .formTermine > .formDiv").append("<div id='divtermin' class='terminDiv'><label for='" + ((_c = data[i]) === null || _c === void 0 ? void 0 : _c.uhrzeit) + "'>" + ((_d = data[i]) === null || _d === void 0 ? void 0 : _d.uhrzeit) + "</label><br><input type='radio' id='" + ((_e = data[i]) === null || _e === void 0 ? void 0 : _e.uhrzeit) + "' class='checkbox chosen' name='" + ((_f = data[i]) === null || _f === void 0 ? void 0 : _f.uhrzeit) + "' value='" + ((_g = data[i]) === null || _g === void 0 ? void 0 : _g.uhrzeit) + "'><br></div>");
        }
        else {
            $('#' + ((_h = data[i]) === null || _h === void 0 ? void 0 : _h.appointment) + " > .formTermine > .formDiv").append("<div id='divtermin' class='terminDiv'><label for='" + ((_j = data[i]) === null || _j === void 0 ? void 0 : _j.uhrzeit) + "'>" + ((_k = data[i]) === null || _k === void 0 ? void 0 : _k.uhrzeit) + "</label><br><input type='radio' id='" + ((_l = data[i]) === null || _l === void 0 ? void 0 : _l.uhrzeit) + "' class='checkbox' name='" + ((_m = data[i]) === null || _m === void 0 ? void 0 : _m.uhrzeit) + "' value='" + ((_o = data[i]) === null || _o === void 0 ? void 0 : _o.uhrzeit) + "'><br></div>");
        }
    }
});
$.getJSON(restServer, { 'method': 'getAppointmentTitle' }, function (data) {
    var _a, _b, _c, _d;
    $('#body').append("<div id='titel'></div>"); //nur zwischen div für den text
    $('#titel').text(JSON.stringify(data));
    var text = $('#titel').text();
    $('#titel').text(" ");
    //Termine werden als select dargestellte
    //Jquery statt dom verwenden => weniger arbeit 
    var res = text.split("}");
    for (var i = 0; i < res.length; i++) {
        //einfügen von namensfeldern
        $('#' + ((_a = data[i]) === null || _a === void 0 ? void 0 : _a.title) + " > .formTermine").append("<input type='text' id='username' class='namensFeld' placeholder='Name...'><br>");
        //einfügen von Kommentar Feld
        $('#' + ((_b = data[i]) === null || _b === void 0 ? void 0 : _b.title) + " > .formTermine").append("<input type='text' id='kommentar' class='namensFeld' placeholder='Kommentar...'>");
        //einfügen von Submit Button
        $('#' + ((_c = data[i]) === null || _c === void 0 ? void 0 : _c.title) + " > .formTermine").append("<button type='submit' id='sendButton' onclick='UserSelect(this.val)' value='" + ((_d = data[i]) === null || _d === void 0 ? void 0 : _d.title) + "' class='btn btn-dark submit'>send</button>");
    }
});
//----------FORM GETS SUBMITTED-----------------
var appointment = "";
//------BUTTON FUNCTION--------
function UserSelect(id) {
    //daten in die db speicherns
    var button = document.getElementById("sendButton");
    button === null || button === void 0 ? void 0 : button.addEventListener("click", function (event) { event.preventDefault(); });
    $('.terminDiv').children('input').each(function () {
        if ($(this).is(':checked')) {
            appointment = "" + $(this).val() + "";
        }
    });
    var data = {
        //Methode
        method: "addUserSelect",
        //Argumente
        kommentar: $("#kommentar").val(),
        user: $("#username").val(),
        id: $("#sendButton").val(),
        appointment: appointment
    };
    $.ajax({
        url: restServer,
        method: "POST",
        dataType: 'json',
        data: data,
        success: function () {
            //alert("success"); //schöne success msg machen
        },
        error: function () {
            //alert("error"); //schöne error message
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
function createInputs(type, labelName, id) {
    //type => ... dame, date, checkbox etc. 
    var input = document.createElement("input");
    input.setAttribute("class", "createAttribute");
    input.setAttribute("placeholder", labelName);
    input.setAttribute("id", id);
    /*const label = document.createElement("label");
    label.textContent = labelName;
    label.setAttribute("class", "labelName");
    form?.appendChild(label);*/
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
    var data = {
        //Methode
        method: "saveAppointment",
        //Argumente
        title: $("#titel").val(),
        ort: $("#ort").val(),
        //Ablaufdatum
        ablaufdatum: $("#ablaufdatum").val(),
        //Datum
        datum: $("#datum").val(),
    };
    $.ajax({
        url: restServer,
        method: "POST",
        dataType: 'json',
        data: data,
        success: function (data) {
            $("#hiddenForm").html('<div class="alert alert-success" role="alert"> Appointment was created </div>');
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#hiddenForm").html('<div class="alert alert-danger" role="alert"> There was a Problem! Please try again </div>');
        }
    });
}
