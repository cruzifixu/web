<?php
include("./models/person.php");

class DataHandler
{

    //unsere DB
    private $servername;
    private $serveruser;
    private $serverpwd;
    private $dbname;

    private function connect()
    {
        $this->servername = "localhost";
        $this->serveruser = "root";
        $this->serverpwd = "";
        //$this->serveruser = "bif2webscriptinguser";
        //$this->serverpwd = "bif2021";
        $this->dbname = "bif2webscriptinguser";

        //Verbdingungsaufbau
        $connection = new mysqli($this->servername, $this->serveruser, $this->serverpwd, $this->dbname);
        //connection failed?
        if (!$connection) {
            die("Connection failed: " . mysqli_connect_error());
        }
        return $connection;
    }

    //get all Appointment
    public function queryPersons()
    {
        $sql = "SELECT * FROM appointments";
        $stmt = $this->connect()->query($sql);
        $row = $stmt->num_rows;
        if ($row > 0) {
            while ($row = $stmt->fetch_assoc()) {
                $data[] = $row;
            }
            return $data;
        }
    }

    public function queryTermine()
    {
        $sql = "SELECT * FROM oneappointment;";
        $connection = $this->connect();
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $row = $stmt->get_result(); //es sind mehrere resultate also schau ich mir die row an
        while ($result = $row->fetch_assoc()) {
            $data[] = $result; //speichere die resultate in einem array
        }

        //nur wenn das array voll ist soll es zu einem return wert kommen
        if (!empty($data)) {
            return $data;
        }
        else {
            return "no appointments";
        }
    }

    public function queryTitles()
    {
        //get all the Appointment Titles
        $sql = "SELECT title FROM appointments";
        $stmt = $this->connect()->query($sql);
        $row = $stmt->num_rows;
        if ($row > 0) {
            while ($row = $stmt->fetch_assoc()) {
                $data[] = $row;
            }
            return $data;
        }
    }


    public function queryPersonById($id)
    {
        $result = array();
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->id == $id) {
                array_push($result, $val);
            }
        }
        return $result;
    }

    public function queryPersonByName($name)
    {
        $result = array();
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->title == $name) {
                array_push($result, $val);
            }
        }
        return $result;
    }


    public function addUserSelect($user, $id) {
        $sql = "UPDATE oneappointment SET user = ? WHERE id = ?;";
        $connection = $this->connect();
        $stmt = $connection->prepare($sql);
        $stmt->bind_param($user, $id);
        $stmt->execute();
    }

    public function getOneAppointment($id) {
        $sql = "SELECT * FROM oneappointment WHERE id = ?";
        $connection = $this->connect();
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("s", $id);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($termin);
        $stmt->fetch();
        return $termin;
    }

    public function saveAppointment($title, $ort) {
        console.log($title);
        var_dump("Hallo");

        $sql = "INSERT INTO appointments (title, Ort, Datum, Ablaufdatum) VALUES (?, ?, ?, ?)";
        $conn = $this->connect();
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssss", "hallo", null , null , "hallo");
        $stmt->execute();
        exit();

        $stmt->close();
    }
}