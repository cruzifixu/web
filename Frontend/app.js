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
    createInputs("text", "Titel: ");
    createInputs("text", "Ort: ");
    createInputs("date", "Ablaufdatum: ");
    createInputs("date", "Datum: ");
    createInputs("submit", "Submit");
    div.appendChild(title);
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
        formular.setAttribute("method", "get");
        //Options => get the Termine
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
        if (data[i].user != null) {
            //add class => unclickable => "chosen" added 
            $('#' + data[i].appointment + " > .formTermine").append("<div id='divtermin' class='terminDiv'><label for='" + data[i].uhrzeit + "'>" + data[i].uhrzeit + "</label><br><input type='radio' id='" + data[i].uhrzeit + "' class='checkbox chosen' name='" + data[i].uhrzeit + "' value='" + data[i].uhrzeit + "'><br></div>");
        }
        else {
            $('#' + data[i].appointment + " > .formTermine").append("<div id='divtermin' class='terminDiv'><label for='" + data[i].uhrzeit + "'>" + data[i].uhrzeit + "</label><br><input type='radio' id='" + data[i].uhrzeit + "' class='checkbox' name='" + data[i].uhrzeit + "' value='" + data[i].uhrzeit + "'><br></div>");
        }
    }
    //namensfeld hinzufügen
    $("#termine").append('<input type="text" required placeholder="username" id="user" name="user"/>');
    //submit button hinzufügen => alles über ajax machen
});
//daten in die db speichern
//-------------------------------------COMPLETED FORM-----------------------------------------
$.getJSON(restServer, { 'method': 'getAppointmentTitle' }, function (data) {
    $('#body').append("<div id='titel'></div>"); //nur zwischen div für den text
    $('#titel').text(JSON.stringify(data));
    var text = $('#titel').text();
    $('#titel').text(" ");
    //Termine werden als select dargestellte
    //Jquery statt dom verwenden => weniger arbeit 
    var res = text.split("}");
    for (var i = 0; i < res.length; i++) {
        //einfügen von namensfeldern
        $('#' + data[i].title + " > .formTermine").append("<input type='text' class='namensFeld' placeholder='Name...'>");
        //einfügen von Kommentar Feld
        //einfügen von Submit Button
    }
});
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
        input.classList.remove("createAttribute"); //submit button hat andere eigenschaften
        input.classList.add("submit");
    }
    //always appendChild at the end
    form === null || form === void 0 ? void 0 : form.appendChild(input);
}
function formresp() {
}
