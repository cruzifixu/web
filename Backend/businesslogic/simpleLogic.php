<?php
include("db/dataHandler.php");

class SimpleLogic
{

    private $dh;

    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $param)
    {
        switch ($method) {

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
                $res = $this->dh->addUserSelect($param);
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
