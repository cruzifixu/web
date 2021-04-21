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
var restServer = "http://localhost:80/SS2021/Abschlussprojekt/Pr/Backend/serviceHandler.php";
$.getJSON(restServer, { 'method': 'queryPersons' }, function (data) {
    $('#mainpart').text(JSON.stringify(data));
});
function showAppointments() {
    //let node = document.getElementById('mainpart');
    var ul = document.getElementById("mainpart");
    //get the content from the mainpart and put it in there 
    var text = $('#mainpart').text();
    //split the text
    var res = text.split("]");
    var _loop_1 = function (i) {
        var id = i; //nur daweil
        //für jedes Element aus i wird ein li objekt erstellt
        var item = document.createElement("li");
        item.setAttribute("id", "" + i + "");
        item.setAttribute("class", "appointmentListe"); //Klasse für weitere Css anpassungen
        itemText = document.createTextNode(res[i]);
        item.appendChild(itemText);
        //onlick event für die Detailansicht
        item.addEventListener("click", function () { viewDetails(id); });
        ul === null || ul === void 0 ? void 0 : ul.appendChild(item);
    };
    var itemText;
    for (var i = 0; i < res.length - 2; i++) {
        _loop_1(i);
    }
    //after all that empty the mainpart
    //$('#mainpart').text(" ");
}
function viewDetails(id) {
    //does a toggle and adds every new detail
    //get the event target
    $("#" + id).slideDown();
}
