
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
//----------------------------------DISPLAY THE APPOINTMENTS---------------------------------
$(function(){
   
   interface data {
      title: string;
      Datum: string;
      Ablaufdatum: string;
      Erstelldatum: string;
      Ort: string;
   }
   $.getJSON(restServer,
      {'method':'queryPersons'},
      function( data: Array<data> ) {

            $('#mainpart').text(JSON.stringify(data));
            //get the content from the mainpart and put it in there 
            let text = $('#mainpart').text();
            $('#mainpart').text(" ");
      
            let body = document.getElementById("mainpart")!;
            //make a button => expands smth on click
            let plusButton = document.createElement("button")!;
            let span = document.createElement("span")!;
            let buttonText = document.createTextNode("+")!;
            span.appendChild(buttonText);
            plusButton.addEventListener("click", showForm);
            plusButton.setAttribute("class", "plusButton");
            plusButton.appendChild(span);
            body?.appendChild(plusButton);
      
            //make appointment ist verbunden mit dem oben gebildeteten Button
            let div = document.createElement("div")!;
            div.setAttribute("class", "hiddenInhalt container divForm col-md-12 col-lg-12 col-sm-12");
            div.setAttribute("id", "divForm");
            
            let title = document.createElement("h1")!;
            let titleInhalt = document.createTextNode("Create Appointment")!;
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

           div?.appendChild(title);
           //add button to add single appointments
           let addApp = document.createElement("button")!;
           let sp = document.createElement("span")!;
           let Btext = document.createTextNode("+")!;
           sp.appendChild(Btext);
           addApp.addEventListener("click", addOneAppo);
           addApp.setAttribute("class", "addApp");
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
              const ul = document.getElementById("mainpart")!;
              let item = document.createElement("li")! as HTMLElement;
              item.setAttribute("id", id);
              item.setAttribute("class", "appointmentListe col-md-12 col-lg-12 col-sm-12 "+data[i].title); //Klasse für weitere Css anpassungen
                       
              //span zum title
              let spanTitle = document.createElement("span")!;
              let title = document.createElement("h1")!;
              let titleInhalt = document.createTextNode(data[i].title)!;
              title.setAttribute("class", "appointmentTitle");
              title.appendChild(titleInhalt);
              title.addEventListener("click", 
              function(){ //anonyme Funktion 
                 viewDetails(id)
              });

              //delete Button
              let deleteButton = document.createElement("button")!;
              deleteButton.setAttribute("class", "deleteButton");
              deleteButton.addEventListener("click", 
              function(){
                 deleteAppointment(data[i].title);
              });
              deleteButton.addEventListener("click", 
              function(){
                 deleteChild(id);
              });
              let icon = document.createElement("i")!;
              icon.setAttribute("class", "fa fa-trash");
              deleteButton.appendChild(icon);

              spanTitle.appendChild(deleteButton);
              spanTitle.appendChild(title);
              item.appendChild(spanTitle);

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
              if(parseFloat(month) <= curMonth && curDay >= parseFloat(day) && curYear >= parseFloat(year)){
                 title.removeEventListener("click", function(){viewDetails(id)});
                 title.classList.add("abgelaufen");
                 item.classList.add("abgelaufenerTermin");
              }

              //-----------------------HIDDEN DIV------------------------
              //create hidden element where the details are shown
              let inhalt = document.createElement("div") as HTMLElement;
              //drinnen stehen alle termine und es ist nicht 
              inhalt.setAttribute("class", "hiddenInhalt col-md-12 col-lg-12 col-sm-12 " + id); //hidden => not displayed
              inhalt.setAttribute("id", data[i].title); //später für die Termine

              let spanText = document.createElement("span")! as HTMLElement;
              spanText.setAttribute("class", "spanText");

              var Erstelldatum = document.createTextNode(" Erstelldatum: "+data[i].Erstelldatum);
              var Ablaufdatum = document.createTextNode(" Ablaufdatum: "+data[i].Ablaufdatum);
              var Ort = document.createTextNode("Ort: "+data[i].Ort);

              spanText.appendChild(Ort);
              spanText.appendChild(Erstelldatum);
              spanText.appendChild(Ablaufdatum);

              //was brauchen wir in dem div ??
              //-------------------------FORMULAR------------------------
              //Input => für den Namen
              const formular = document.createElement("form") as HTMLElement;
              formular.setAttribute("class", "formTermine");
           //für das submit der Daten

              //Options => get the Termine
              //Termine in einem Div zum scrollen eingelegt 
              const formDiv = document.createElement("div");
              formDiv.setAttribute("class", "container formDiv col-md-12 col-lg-12 col-sm-12");

              formular.appendChild(formDiv);
              inhalt.appendChild(spanText);
              inhalt.appendChild(formular);
              //-----------------------FUNCTIONALITY---------------------
              //onlick event für die Detailansicht
              item.appendChild(inhalt); //add the div
              ul?.appendChild(item);
            }
});
//--------------------------------DISPLAY THE HIDDEN DETAILS----------------------------------
interface data {
id: string;
appointment: string;
Datum: string;
votes: string;
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
     for(let i = 0; i < res?.length; i++){
        //get the div with the fitting appointment
        //check if there is a user set or not => if yes => make it unclickable
        //split datum 
        let date = data[i]?.Datum.split(" ");
        $('#'+data[i]?.appointment+" > .formTermine > .formDiv").append("<div class='terminDiv'><label for='"+data[i]?.Datum+"'>"+date[0]+"</label><br><p>"+date[1]+"</p><p>Votes: "+data[i]?.votes+"</p><input type='radio' id='"+data[i]?.Datum+"' class='checkbox' name='"+data[i]?.Datum+"' value='"+data[i]?.Datum+"'><br><button value='"+data[i]?.Datum+"' onclick='present()' class='open'><i class='fa fa-info-circle' aria-hidden='true'></i></button><br></div>");
        //alle user können sich anmelden
     }
});

interface oneApp {
  username: string;
  kommentar: string;
  appointment: string;
  Datum: string;
}

//-------------------------------------COMPLETED FORM-----------------------------------------
$.getJSON(restServer,
{'method':'getUserComments'},
function( data:Array<oneApp> ) {
     //create new div in body
     $('#body').append("<div id='termine'></div>"); //nur zwischen div für den text

     $('#termine').text(JSON.stringify(data));
     let text = $('#termine').text();
     $('#termine').text(" ");
     //Termine werden als select dargestellte
     //Jquery statt dom verwenden => weniger arbeit 
     const res = text.split("}");
     //appointments hinzufügen
     if(data != null) {
        for(let i = 0; i < res.length; i++){
           //jeder termin bekommt ein pop up
           var datum = data[i]?.Datum.split(" ");
           $("li."+data[i]?.appointment).append('<div class="popup-overlay '+datum[0]+' '+datum[1]+' col-md-12 col-lg-12 col-sm-12"><div class="col-md-12 col-lg-12 col-sm-12 popup-content"><h2>Termin Information</h2><div class="terminUser col-md-12 col-lg-12 col-sm-12"><img src="/img/catbus.png" class"usersym" style="width:80px"></img>'+data[i]?.username+' commented: </div><div class="terminKommis col-md-12 col-lg-12 col-sm-12">'+data[i]?.kommentar+'<img src="/img/jumptot.gif" class"usersym" style="width:80px"><p class="userK"></p><p class="kommentare"></p><button  value="'+data[i]?.Datum+'" class="close '+data[i]?.appointment+'">Close</button></div></div></div>');
           $(".open").on("click", function(e){
              e.preventDefault();
              var id = ""+$(this).val()+"";
              var idd = id.split(" ");
              //neu
              $("#"+data[i]?.appointment).hide();
              $(".popup-overlay."+idd[0]).show();
           });
           $(".close, .popup").on("click", function(event){
              event.preventDefault();
              var id = ""+$(this).val()+"";
              var idd = id.split(" ");
              $(".popup-overlay."+idd[0]).hide();
              //neu
              $("#"+data[i]?.appointment).show();
           });
        }
     }
});

//fill the pop up
$.getJSON(restServer,
{'method':'getUserComments'},
function( data:any ) 
{
  $('#body').append("<div id='termine'></div>"); //nur zwischen div für den text

  $('#termine').text(JSON.stringify(data));
  let text = $('#termine').text();
  $('#termine').text(" ");
  const res = text.split("}");
  for(let i = 0; i < res.length; i++)
  {
     //Füllen der Pop Ups
  }
}
);

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
     //let funcc = "UserSelect(" + data[i]?.title + ")";
     //einfügen von namensfeldern
     $('#'+data[i]?.title+" > .formTermine").append("<input type='text' class='namensFeld enetereduser' placeholder='Name...'><br>");
     //einfügen von Kommentar Feld
     $('#'+data[i]?.title+" > .formTermine").append("<input type='text'  class='namensFeld kommentar' placeholder='Kommentar...'>");
     //einfügen von Submit Button
     $('#'+data[i]?.title+" > .formTermine").append("<button type='submit' id='sendButton' onclick='UserSelect(this.value)' value='"+data[i]?.title+"' class='btn btn-dark submit'>send</button>");
  }
}
);

//----------KOMMENTARE SCHÖN DARSTELLEN-------------


//----------FORM GETS SUBMITTED-----------------

let appointment : string = "";
let username : string = "";
let kommi :string = "";


//------BUTTON FUNCTION--------
function UserSelect(id: any) {
//daten in die db speicherns
let button = document.getElementById("sendButton")!;
button?.addEventListener("click", function(event){event.preventDefault()});

$('.enetereduser').each(
  function()
  {
     if($(this).val() != null){
        username = ""+$(this).val()+"";
     }
  }
);

$('.kommentar').each(
  function()
  {
     if($(this).val() != null){
        kommi = ""+$(this).val()+"";
     }
  }
);
$('.terminDiv').children('input').each(function(){
  if($(this).is(':checked')){
     appointment = ""+$(this).val()+"";
     var data = {
        //Methode
        method : "addUserSelect",
  
        //Argumente
        kommentar: kommi,
        user : username,
        id: id, //Title des Appointments
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
     const br = document.createElement("br");

     let inputDatetime = document.createElement("input")!;
     inputDatetime.setAttribute("class", "addOne");
     inputDatetime.setAttribute("placeholder", "DD.MM.YY H:M");
     inputDatetime.type = "datetime-local";

     form?.appendChild(br);
     form?.appendChild(inputDatetime);
  }

  function deleteAppointment(id : string)
  {
     let daten = {
        method: "deleteAppointment",
        title: id
     }
     $.ajax({
        url: restServer,
        type: "POST",
        dataType: 'json',
        data: daten,
        success: function(){
           $("#mainpart").remove("."+id);
        }
     });

  }

  function deleteChild(id: string){
     $("#"+id).remove();
  }

  function createInputs(type: any, labelName: any, id: any)
  {
     //type => ... dame, date, checkbox etc. 
     const input = document.createElement("input");
     input.setAttribute("class", "createAttribute");
     input.setAttribute("placeholder", labelName);
     input.setAttribute("id", id);

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
     let oneTitle = $("#titel").val();
        let daten = {
           //Methode
           method : "saveAppointment",

           //Argumente
           title : oneTitle,
           ort : $("#ort").val(),

           //Ablaufdatum
           ablaufdatum: $("#ablaufdatum").val(),
        }

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
        let inputdata = {};
           $('#hiddenForm').children('.addOne').each(function(){
              inputdata = {
                 datetime: $(this).val(),
                 title: oneTitle,
                 method: "saveOneTime",
              }
              $.ajax({
                 url: restServer,
                 method: "POST",
                 data: inputdata, 
                 success: function() {
                    console.log(inputdata);
                 },
                 error: function(xhr, ajaxOptions, thrownError) {
                    console.warn(xhr.responseText);
                    console.log("not working");
                 }
              })
           });
           
     interface alldata {
        title: string;
        Datum: string;
        Ablaufdatum: string;
        Erstelldatum: string;
        Ort: string;
     }
     //schließen und clear  
     showForm();
     $("#titel").val("");
     $("#ort").val("");
     $("#ablaufdatum").val("");
     $('#hiddenForm').children('.addOne').each(function(){
        $(this).val("");
     });
     window.location.reload();
  }
});