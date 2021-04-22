
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
let restServer: string = "http://localhost:80/SS2021/Abschlussprojekt/Pr2/web/Backend/serviceHandler.php";

interface data {
   title: string;
   Datum: string;
   Ablaufdatum: string;
   Ort: string;
}
//----------------------------------DISPLAY THE APPOINTMENTS---------------------------------
$.getJSON(restServer,
          {'method':'queryPersons'},
          function( data: Array<data> ) {

                $('#mainpart').text(JSON.stringify(data));
          
                //let node = document.getElementById('mainpart');
                //alert("Hallo");
                const ul = document.getElementById("mainpart");
                //get the content from the mainpart and put it in there 
                let text = $('#mainpart').text();
                $('#mainpart').text(" ");
          
                let body = document.getElementById("mainpart");
                //make a button => expands smth on click
                let plusButton = document.createElement("button");
                let span = document.createElement("span");
                let buttonText = document.createTextNode("+");
                span.appendChild(buttonText);
                plusButton.addEventListener("click", showForm);
                plusButton.setAttribute("class", "plusButton");
                plusButton.appendChild(span);
                body?.appendChild(plusButton);
          
                //make appointment ist verbunden mit dem oben gebildeteten Button
                let div = document.createElement("div");
                div.setAttribute("class", "hiddenInhalt container divForm");
                div.setAttribute("id", "divForm");
                let title = document.createElement("h1");
                let titleInhalt = document.createTextNode("Create Appointment");
                title.setAttribute("class", "formTitle");
                title.appendChild(titleInhalt);
          
                //function to make the fields
                createInputs("text", "Titel: ");
                createInputs("text", "Ort: ");
                createInputs("date", "Ablaufdatum: ");
                createInputs("date", "Datum: ");
                createInputs("submit", "Submit");
          
                div.appendChild(title);
                div?.appendChild(form);
                body?.appendChild(div);
          
                //split the text
                let res = text.split("}"); //nur um zu schauen wie viele objekte da sind
                for(let i = 0; i < res.length-1; i++){
                   const id = i.toString(); //nur daweil
          
          
                   //------------------LI OBJEKT ERSTELLEN------------------
                   //für jedes Element aus i wird ein li objekt erstellt
                   let item = document.createElement("li") as HTMLElement;
                   item.setAttribute("id", id);
                   item.setAttribute("class", "appointmentListe"); //Klasse für weitere Css anpassungen
                   
                   let title = document.createElement("h1");
                   let titleInhalt = document.createTextNode(data[i].title);
                   title.setAttribute("class", "appointmentTitle");
                   title.appendChild(titleInhalt);
                   item.appendChild(title);
                   title.addEventListener("click", 
                      function(){ //anonyme Funktion 
                         viewDetails(id)
                      });
          
                   //-----------------------HIDDEN DIV------------------------
                   //create hidden element where the details are shown
                   let inhalt = document.createElement("div") as HTMLElement;
                   //drinnen stehen alle termine und es ist nicht 
                   inhalt.setAttribute("class", "hiddenInhalt " + id); //hidden => not displayed
                   inhalt.setAttribute("id", data[i].title); //später für die Termine

                   var Datum = document.createTextNode(" Datum: "+data[i].Datum);
                   var Ablaufdatum = document.createTextNode(" Ablaufdatum: "+data[i].Ablaufdatum);
                   var Ort = document.createTextNode("Ort: "+data[i].Ort);
          
                   //was brauchen wir in dem div ??
                   //-------------------------FORMULAR------------------------
                   //Input => für den Namen
                   const formular = document.createElement("form") as HTMLElement;
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
                   ul?.appendChild(item);
                }
    });

//--------------------------------DISPLAY THE HIDDEN DETAILS----------------------------------
interface daten {
   user: string;
   appointment: string;
   uhrzeit: string;
}
$.getJSON(restServer,
   {'method':'queryTermine'},
   function( daten:Array<daten> ) {
         //create new div in body
         $('#body').append("<div id='termine'></div>"); //nur zwischen div für den text

         $('#termine').text(JSON.stringify(daten));
         let text = $('#termine').text();
         $('#termine').text(" ");
         //Termine werden als select dargestellte
         //Jquery statt dom verwenden => weniger arbeit 
         const res = text.split("}");
         //appointments hinzufügen
         for(let i = 0; i < res.length; i++){
            //get the div with the fitting appointment
            //check if there is a user set or not => if yes => make it unclickable
            if(daten[i].user != null){
               //add class => unclickable => "chosen" added 
               $('#'+daten[i].appointment+" > .formTermine").append("<div id='divtermin' class='terminDiv'><label for='"+daten[i].uhrzeit+"'>"+daten[i].uhrzeit+"</label><br><input type='radio' id='"+daten[i].uhrzeit+"' class='checkbox chosen' name='"+daten[i].uhrzeit+"' value='"+daten[i].uhrzeit+"'><br></div>");
            } else {
               $('#'+daten[i].appointment+" > .formTermine").append("<div id='divtermin' class='terminDiv'><label for='"+daten[i].uhrzeit+"'>"+daten[i].uhrzeit+"</label><br><input type='radio' id='"+daten[i].uhrzeit+"' class='checkbox' name='"+daten[i].uhrzeit+"' value='"+daten[i].uhrzeit+"'><br></div>");
            }
         }

         //namensfeld hinzufügen
         //$("#termine").append('<input type="text" required placeholder="username" id="user" name="user"/>');
         //submit button hinzufügen => alles über ajax machen

   });
   //daten in die db speicherns
   $("sendButton").click();
   let userX = $("#username").val();
   $.ajax({
      type: "GET",
      url: restServer,
      cache: false,
      data: {method: "addUserSelect", param: 1},
      success: function(response) {
         console.log(response);
      }
   });

//-------------------------------------COMPLETED FORM-----------------------------------------
interface data {
   title: string;
   id: string;
}
$.getJSON(restServer, 
   {'method':'getAppointmentTitle'}, 
   function( data:Array<data> )
   {
      $('#body').append("<div id='titel'></div>"); //nur zwischen div für den text

      $('#titel').text(JSON.stringify(data));
      let text = $('#titel').text();
      $('#titel').text(" ");
      //Termine werden als select dargestellte
      //Jquery statt dom verwenden => weniger arbeit 
      const res = text.split("}");
      for(let i = 0; i < res.length; i++){
         //einfügen von namensfeldern
         $('#'+data[i].title+" > .formTermine").append("<input type='text' id='username' class='namensFeld' placeholder='Name...'><button id='sendButton'class='btn btn-dark'>send</button>");
         //einfügen von Kommentar Feld
         
         //einfügen von Submit Button
         
      }
   }
);


//---------------------------------------FUNKTIONEN--------------------------------------------

      const form = document.createElement("form");
      form.setAttribute("id", "hiddenForm"); //thats how to get the form

      function viewDetails(id : string)
      {
         //does a toggle and adds every new detail
         //get the event target
         $("."+id).slideToggle();
      }

      function showForm()
      {
         $(".divForm").slideToggle();
      }

      function createInputs(type: any, labelName: any)
      {
         //type => ... dame, date, checkbox etc. 
         const input = document.createElement("input");
         input.setAttribute("class", "createAttribute");
         input.setAttribute("placeholder", labelName);

         /*const label = document.createElement("label");
         label.textContent = labelName;
         label.setAttribute("class", "labelName");
         form?.appendChild(label);*/

         if(type == "text") input.type = "text";
         if(type == "date") input.type = "date";
         if(type == "submit") {
            input.type = "submit";
            input.classList.remove("createAttribute"); //submit button hat andere eigenschaften
            input.classList.add("submit");
         }


         //always appendChild at the end
         form?.appendChild(input);
      }