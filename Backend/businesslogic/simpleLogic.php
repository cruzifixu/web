<?php
include("db/dataHandler.php");

class SimpleLogic
{

    private $dh;

    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $user, $param)
    {

        switch ($method) {
            case "saveAppointment":
                $this->dh->saveAppointment($title, $ort);
                break;

            case "queryPersons":
                $res = $this->dh->queryPersons();
                break;

            case "queryPersonById":
                $res = $this->dh->queryPersonById($param);
                break;

            case "queryPersonByName":
                $res = $this->dh->queryPersonByName($param);
                break;

            case "addUserSelect":
                $res = $this->dh->addUserSelect($user, $param);
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
