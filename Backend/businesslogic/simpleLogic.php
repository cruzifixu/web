<?php
include("db/dataHandler.php");

class SimpleLogic
{

    private $dh;

    function __construct()
    {
        $this->dh = new DataHandler();
    }

    //------------------------FÜR POST REQUESTS-----------------------------
    function handleChanges($method, $user, $kommentar, $id, $title, $ort, $appointment, $ablaufdatum, $datetime){
        switch($method){
            case "saveAppointment": 
                $this->dh->saveAppointment($title, $ort, $ablaufdatum);
                break;
            case "addUserSelect":
                $this->dh->addUserSelect($kommentar, $user, $id, $appointment);
                break;
            case "saveOneTime":
                $this->dh->saveOneTime($datetime, $title);
                break;
            case "deleteAppointment":
                $this->dh->deleteAppointment($title);
                break;
        }
    }

    //------------------------FÜR GET REQUESTS------------------------------ 
    function handleRequest($method, $user, $param)
    {

        switch ($method) {

            case "queryPersons":
                $res = $this->dh->queryPersons();
                break;

            case "getAppointmentTitle":
                $res = $this->dh->queryTitles();
                break;

            case "queryTermine":
                $res = $this->dh->queryTermine();
                break;

            case "queryKommentare":
                $res = $this->dh->queryKommentare();
                break;
            case "getUserComments":
                $res = $this->dh->getUserComments();
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
