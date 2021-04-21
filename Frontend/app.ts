
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
let restServer: string = "http://localhost:80/SS2021/Abschlussprojekt/Pr/Backend/serviceHandler.php";
$.getJSON(restServer,
          {'method':'queryPersons'},
          function( data:object ) {
              $('#mainpart').text(JSON.stringify(data));
    });

    function showAppointments(){
      //let node = document.getElementById('mainpart');
      const ul = document.getElementById("mainpart");
      //get the content from the mainpart and put it in there 
      let text = $('#mainpart').text();
      //split the text
      let res = text.split("]");
      for(let i = 0; i < res.length-2; i++){
         const id = i; //nur daweil
         //für jedes Element aus i wird ein li objekt erstellt
         let item = document.createElement("li") as HTMLElement;
         item.setAttribute("id", ""+i+"");
         item.setAttribute("class", "appointmentListe"); //Klasse für weitere Css anpassungen
         var itemText = document.createTextNode(res[i]);
         item.appendChild(itemText);

         //create hidden element where the details are shown
         let inhalt = document.createElement("div") as HTMLElement;
         //drinnen stehen alle termine und es ist nicht 

         //onlick event für die Detailansicht
         item.addEventListener("click", 
            function(){ //anonyme Funktion 
               viewDetails(id)
            });
         ul?.appendChild(item);
      }
   
      //after all that empty the mainpart
      //$('#mainpart').text(" ");
   }

      function viewDetails(id : number){
         //does a toggle and adds every new detail
         //get the event target
         $("#"+id).slideDown();
      }



   

