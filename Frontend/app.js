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
$.getJSON(restServer, { 'method': 'queryPersons' }, function (data) {
    $('#mainpart').text(JSON.stringify(data));
});
var form = document.createElement("form");
form.setAttribute("id", "hiddenForm"); //thats how to get the form
function showAppointments() {
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
    createInputs("text", "Titel: ");
    createInputs("text", "Ort: ");
    createInputs("date", "Ablaufdatum: ");
    createInputs("date", "Datum: ");
    createInputs("submit", "Submit");
    div.appendChild(title);
    div === null || div === void 0 ? void 0 : div.appendChild(form);
    body === null || body === void 0 ? void 0 : body.appendChild(div);
    //split the text
    var res = text.split("}");
    var _loop_1 = function (i) {
        var id = i; //nur daweil
        //------------------LI OBJEKT ERSTELLEN------------------
        //für jedes Element aus i wird ein li objekt erstellt
        var item = document.createElement("li");
        item.setAttribute("id", "" + i + "");
        item.setAttribute("class", "appointmentListe"); //Klasse für weitere Css anpassungen
        var split = res[i].split(",");
        var title_1 = [];
        if (i == 0) {
            title_1 = split[1].split(":");
        }
        else {
            title_1 = split[2].split(":");
        }
        itemText = document.createTextNode(title_1[1]);
        item.appendChild(itemText);
        //-----------------------HIDDEN DIV------------------------
        //create hidden element where the details are shown
        var inhalt = document.createElement("div");
        //drinnen stehen alle termine und es ist nicht 
        inhalt.setAttribute("class", "hiddenInhalt " + i); //hidden => not displayed
        //was brauchen wir in dem div ??
        //-------------------------FORMULAR------------------------
        //Input => für den Namen
        var formular = document.createElement("form");
        formular.setAttribute("class", "formTermine");
        formular.setAttribute("method", "get");
        //send this to some source
        //formular.setAttribute("action", ".php");
        var input = document.createElement("input");
        input.setAttribute("class", "namensFeld");
        input.setAttribute("placeholder", "Name...");
        //für jeden Termin wird jetzt eine option erstellt und an selectDate gehängt
        /*for( ){
           let option = document.createElement("option") as HTMLElement;
           //Eigenschaften
           selectDate.append(option);
        }*/
        formular.appendChild(input);
        inhalt.appendChild(formular);
        //-----------------------FUNCTIONALITY---------------------
        //onlick event für die Detailansicht
        item.appendChild(inhalt); //add the div
        item.addEventListener("click", function () {
            viewDetails(id);
        });
        ul === null || ul === void 0 ? void 0 : ul.appendChild(item);
    };
    var itemText;
    for (var i = 0; i < res.length - 1; i++) {
        _loop_1(i);
    }
    //after all that empty the mainpart
    //$('#mainpart').text(" ");
}
function viewDetails(id) {
    //does a toggle and adds every new detail
    //get the event target
    $("." + id).slideDown();
}
function showForm() {
    $(".divForm").slideToggle();
}
function createInputs(type, labelName) {
    //type => ... dame, date, checkbox etc. 
    var input = document.createElement("input");
    input.setAttribute("class", "createAttribute");
    input.setAttribute("placeholder", labelName);
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
        input.classList.remove("createAttribute");
        input.classList.add("submit");
    }
    //always appendChild at the end
    form === null || form === void 0 ? void 0 : form.appendChild(input);
}
