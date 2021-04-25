<?php
include("businesslogic/simpleLogic.php");

$param = "";
$method = "";
$user = "";
$kommentar = "";
$id = "";
$appointment = "";
$datetime = "";
$getmethod = "";

isset($_GET["method"]) ? $getmethod = $_GET["method"] : false;
isset($_GET["param"]) ? $param = $_GET["param"] : false;
isset($_GET["user"]) ? $user = $_GET["user"] : false;

//POST VARIABLEN
isset($_POST["method"]) ? $method = $_POST["method"] : false;
isset($_POST["title"]) ? $title = $_POST["title"] : false;
isset($_POST["ablaufdatum"]) ? $ablaufdatum = $_POST["ablaufdatum"] : false;
isset($_POST["datetime"]) ? $datetime = $_POST["datetime"] : false;
isset($_POST["ort"]) ? $ort = $_POST["ort"] : false;
isset($_POST["user"]) ? $user = $_POST["user"] : false;
isset($_POST["kommentar"]) ? $kommentar = $_POST["kommentar"] : false;
isset($_POST["id"]) ? $id = $_POST["id"] : false;
isset($_POST["appointment"]) ? $appointment = $_POST["appointment"] : false;

$logic = new SimpleLogic();
$result = $logic->handleRequest($getmethod, $user, $param);

if(isset($_GET["method"])){
    if ($result == null) {
        response("GET", 400, null);
    } else {
        response("GET", 200, $result);
    }
} else if (isset($_POST["method"])) {
    $logic->handleChanges($method, $user, $kommentar, $id, $title, $ort, $appointment, $ablaufdatum, $datetime);
}

function response($method, $httpStatus, $data)
{
    header('Content-Type: application/json');
    switch ($method) {
        case "GET":
            http_response_code($httpStatus);
            echo (json_encode($data));
            break;
        case "POST":
            http_response_code($httpStatus);
            echo (json_encode($data));
            break;
        case "PUT":
            http_response_code($httpStatus);
            echo $httpStatus;
            break;
        default:
            http_response_code(405);
            echo ("Method not supported yet!");
    }
}
