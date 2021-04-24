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
    function handleChanges($method, $user, $kommentar, $id, $title, $ort, $appointment, $datum, $ablaufdatum, $datetime){
        switch($method){
            case "saveAppointment": 
                $this->dh->saveAppointment($title, $ort, $ablaufdatum, $datum);
                break;
            case "addUserSelect":
                $this->dh->addUserSelect($kommentar, $user, $id, $appointment);
                break;
            case "saveOneTime":
                $this->dh->saveOneTime($datetime, $title);
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

            default:
                $res = null;
                break;
        }
        return $res;
    }
}
