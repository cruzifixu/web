
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
                createInputs("text", "Titel: ", "titel");
                createInputs("text", "Ort: ", "ort");
                createInputs("date", "Ablaufdatum: ", "ablaufdatum");
                createInputs("submit", "Submit", "submit");

                div?.appendChild(title);
               //add button to add single appointments
               let addApp = document.createElement("button");
               let sp = document.createElement("span");
               let Btext = document.createTextNode("+");
               sp.appendChild(Btext);
               addApp.addEventListener("click", addOneAppo);
               addApp.setAttribute("class", "plusButton");
               addApp.appendChild(sp);
               div?.appendChild(addApp);
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

                  //Check if Appointment ist abgelaufen
                  let d = new Date();
                  //get the current date
                  let curMonth = d.getMonth()+1;
                  let curDay = d.getDate();
                  let curYear = d.getFullYear();

                  let datum = data[i].Ablaufdatum.split("-");
                  let month = datum[1];
                  let day = datum[2];
                  let year = datum[0];
                  //is current date == data[i].Ablaufdatum?
                  if(parseFloat(month) >= curMonth && curDay >= parseFloat(day) && curYear >= parseFloat(year)){
                     title.removeEventListener("click", function(){viewDetails(id)});
                     title.classList.add("abgelaufen");
                     item.classList.add("abgelaufenerTermin");
                  }

                   //-----------------------HIDDEN DIV------------------------
                   //create hidden element where the details are shown
                   let inhalt = document.createElement("div") as HTMLElement;
                   //drinnen stehen alle termine und es ist nicht 
                   inhalt.setAttribute("class", "hiddenInhalt " + id); //hidden => not displayed
                   inhalt.setAttribute("id", data[i].title); //später für die Termine

                   var Ablaufdatum = document.createTextNode(" Ablaufdatum: "+data[i].Ablaufdatum);
                   var Ort = document.createTextNode("Ort: "+data[i].Ort);
          
                   //was brauchen wir in dem div ??
                   //-------------------------FORMULAR------------------------
                   //Input => für den Namen
                   const formular = document.createElement("form") as HTMLElement;
                   formular.setAttribute("class", "formTermine");
                  //für das submit der Daten
          
                   //Options => get the Termine
                   //Termine in einem Div zum scrollen eingelegt 
                   const formDiv = document.createElement("div");
                   formDiv.setAttribute("class", "container formDiv");

                   formular.appendChild(formDiv);
          
                   /*let input = document.createElement("input") as HTMLElement;
                   input.setAttribute("class", "namensFeld");
                   input.setAttribute("placeholder", "Name...");
          
                   formular.appendChild(input);*/
                   inhalt.appendChild(Ort);
                   inhalt.appendChild(Ablaufdatum);
                   inhalt.appendChild(formular);
                   //-----------------------FUNCTIONALITY---------------------
                   //onlick event für die Detailansicht
                   item.appendChild(inhalt); //add the div
                   ul?.appendChild(item);
                }
    });

//--------------------------------DISPLAY THE HIDDEN DETAILS----------------------------------
interface data {
   user: string;
   appointment: string;
   uhrzeit: string;
   Datum: string;
}

$.getJSON(restServer,
   {'method':'queryTermine'},
   function( data:Array<data> ) {
         //create new div in body
         $('#body').append("<div id='termine'></div>"); //nur zwischen div für den text

         $('#termine').text(JSON.stringify(data));
         let text = $('#termine').text();
         $('#termine').text(" ");
         //Termine werden als select dargestellte
         //Jquery statt dom verwenden => weniger arbeit 
         const res = text.split("}");
         //appointments hinzufügen
         for(let i = 0; i < res.length; i++){
            //get the div with the fitting appointment
            //check if there is a user set or not => if yes => make it unclickable
            if(data[i]?.user != null){
               //add class => unclickable => "chosen" added 
               $('#'+data[i]?.appointment+" > .formTermine > .formDiv").append("<div id='divtermin' class='terminDiv'><label for='"+data[i]?.uhrzeit+"'>"+data[i]?.uhrzeit+"\r\n/"+data[i]?.Datum+"</label><br><input type='radio' id='"+data[i]?.uhrzeit+"' class='checkbox chosen' name='"+data[i]?.uhrzeit+"' value='"+data[i]?.uhrzeit+"'><br></div>");
            } else {
               $('#'+data[i]?.appointment+" > .formTermine > .formDiv").append("<div id='divtermin' class='terminDiv'><label for='"+data[i]?.uhrzeit+"'>"+data[i]?.uhrzeit+"\r\n/"+data[i]?.Datum+"</label><br><input type='radio' id='"+data[i]?.uhrzeit+"' class='checkbox' name='"+data[i]?.uhrzeit+"' value='"+data[i]?.uhrzeit+"'><br></div>");
            }
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
         $('#'+data[i]?.title+" > .formTermine").append("<input type='text' id='username' class='namensFeld' placeholder='Name...'><br>");
         //einfügen von Kommentar Feld
         $('#'+data[i]?.title+" > .formTermine").append("<input type='text' id='kommentar' class='namensFeld' placeholder='Kommentar...'>");
         //einfügen von Submit Button
         $('#'+data[i]?.title+" > .formTermine").append("<button type='submit' id='sendButton' onclick='UserSelect(this.val)' value='"+data[i]?.title+"' class='btn btn-dark submit'>send</button>");
      }
   }
);

//----------FORM GETS SUBMITTED-----------------

let appointment : string = "";



//------BUTTON FUNCTION--------
function UserSelect(id: any) {
   //daten in die db speicherns
   let button = document.getElementById("sendButton");
   button?.addEventListener("click", function(event){event.preventDefault()});

   $('.terminDiv').children('input').each(function(){
      if($(this).is(':checked')){
         appointment = ""+$(this).val()+"";
      }
   });

   var data = {
      //Methode
      method : "addUserSelect",

      //Argumente
      kommentar: $("#kommentar").val(),
      user : $("#username").val(),
      id: $("#sendButton").val(), //Title des Appointments
      appointment: appointment
   }

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

      function addOneAppo() 
      {
         let inputDatetime = document.createElement("input");
         inputDatetime.setAttribute("class", "addOne");
         inputDatetime.setAttribute("placeholder", "DD.MM.YY H:M");
         inputDatetime.type = "datetime-local";
         form?.appendChild(inputDatetime);
      }

      function createInputs(type: any, labelName: any, id: any)
      {
         //type => ... dame, date, checkbox etc. 
         const input = document.createElement("input");
         input.setAttribute("class", "createAttribute");
         input.setAttribute("placeholder", labelName);
         input.setAttribute("id", id);

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
            input.classList.add("hiddenSubmit");
            input.addEventListener("click", send);
            input.addEventListener("click", function(event){event.preventDefault()});
         }


         //always appendChild at the end
         form?.appendChild(input);
      }


      function send(){
            var data = {
               //Methode
               method : "saveAppointment",

               //Argumente
               title : $("#titel").val(),
               ort : $("#ort").val(),

               //Ablaufdatum
               ablaufdatum: $("#ablaufdatum").val(),
            }

            $.ajax({
               url: restServer,
               method: "POST",
               dataType: 'json',
               data: data,
               success: function (data) {
                  console.log(data);
                  $("#hiddenForm").html('<div class="alert alert-success" role="alert"> Appointment was created </div>');
               },
               error: function (xhr, ajaxOptions, thrownError) {
                  console.log(data);
                  console.log(thrownError);
                  $("#hiddenForm").html('<div class="alert alert-danger" role="alert"> There was a Problem! Please try again </div>');
               }
            });
            let inputs = document.getElementsByTagName('input .addOne');
            for (let i = 0; i < inputs.length; i += 1) {
               let inputdata = {
                  datetime: inputs[i].nodeValue,
                  title: $("#titel").val(),
                  method: "saveOneTime",
               }
               $.ajax({
                  url: restServer,
                  method: "POST",
                  data: inputdata, 
                  success: function() {
                     console.log(inputdata);
                  },
                  error: function() {
                     console.log("not working for "+ i);
                  }
               })
            }​​​​
      }