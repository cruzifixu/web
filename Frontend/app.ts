
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

$.getJSON(restServer,
          {'method':'queryPersons'},
          function( data:object ) {
              $('#mainpart').text(JSON.stringify(data));
    });

    const form = document.createElement("form");
    form.setAttribute("id", "hiddenForm"); //thats how to get the form

    function showAppointments(){

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
      let res = text.split("}");
      for(let i = 0; i < res.length-1; i++){
         const id = i; //nur daweil


         //------------------LI OBJEKT ERSTELLEN------------------
         //für jedes Element aus i wird ein li objekt erstellt
         let item = document.createElement("li") as HTMLElement;
         item.setAttribute("id", ""+i+"");
         item.setAttribute("class", "appointmentListe"); //Klasse für weitere Css anpassungen
         let split = res[i].split(",");
         let title = [];
         if(i == 0){
            title = split[1].split(":");
         } else {
            title = split[2].split(":");
         }
         
         var itemText = document.createTextNode(title[1]);
         item.appendChild(itemText);


         //-----------------------HIDDEN DIV------------------------
         //create hidden element where the details are shown
         let inhalt = document.createElement("div") as HTMLElement;
         //drinnen stehen alle termine und es ist nicht 
         inhalt.setAttribute("class", "hiddenInhalt " + i); //hidden => not displayed

         //was brauchen wir in dem div ??
         //-------------------------FORMULAR------------------------
         //Input => für den Namen
         const formular = document.createElement("form") as HTMLElement;
         formular.setAttribute("class", "formTermine");
         formular.setAttribute("method", "get");
         //send this to some source
         //formular.setAttribute("action", ".php");

         let input = document.createElement("input") as HTMLElement;
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
         item.addEventListener("click", 
            function(){ //anonyme Funktion 
               viewDetails(id)
            });
         ul?.appendChild(item);
      }
   
      //after all that empty the mainpart
      //$('#mainpart').text(" ");
   }

      function viewDetails(id : number)
      {
         //does a toggle and adds every new detail
         //get the event target
         $("."+id).slideDown();
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
            input.classList.remove("createAttribute");
            input.classList.add("submit");
         }


         //always appendChild at the end
         form?.appendChild(input);
      }

