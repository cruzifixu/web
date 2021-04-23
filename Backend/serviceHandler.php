<?php
include("businesslogic/simpleLogic.php");

$param = "";
$method = "";
$user = "";

isset($_GET["method"]) ? $method = $_GET["method"] : false;
isset($_GET["param"]) ? $param = $_GET["param"] : false;
isset($_GET["user"]) ? $user = $_GET["user"] : false;

$logic = new SimpleLogic();
$result = $logic->handleRequest($method, $user, $param);

if(isset($_POST["method"])){
    response("POST", 200, $result);
} else {
    if ($result == null) {
        response("GET", 400, null);
    } else {
        response("GET", 200, $result);
    }
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
