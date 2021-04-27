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


    public function addUserSelect($kommentar, $user, $id, $appointment) {
        $sql = "DELETE FROM users WHERE username = ?;";
        $connection = $this->connect();
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("s", $user);
        $stmt->execute();
        $stmt->close();

        $sql = "INSERT INTO users (username, kommentar, appointment, Datum) VALUES (?, ?, ?, ?);";
        $connection = $this->connect();
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("ssss", $user, $kommentar, $id, $appointment);
        $stmt->execute();
        $stmt->close();
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

    public function saveAppointment($title, $ort, $ablauf) {
        $ts = time();
        $erstelldatum = date("Y-m-d H:i:s", $ts);
        $sql = "INSERT INTO appointments (title, Erstelldatum, Ablaufdatum, Ort) VALUE (?, ?, ?, ?);";
        $connection = $this->connect();
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("ssss", $title, $erstelldatum, $ablauf, $ort);
        $stmt->execute();
    }

    public function saveOneTime($date, $title) {
        $sql = "INSERT INTO oneappointment (appointment, Datum) VALUES (?, ?);";
        $connection = $this->connect();
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("ss", $title, $date);
        $stmt->execute();

        $stmt->close();
    }

    public function queryKommentare() {
        $sql = "SELECT kommentar FROM users;";
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

    public function deleteAppointment($title)
    {
        $sql = "DELETE FROM oneappointment WHERE appointment = ?";
        $connection = $this->connect();
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("s", $title);
        $stmt->execute();

        $stmt->close();


        $sql = "DELETE FROM appointments WHERE title = ?";
        $connection = $this->connect();
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("s", $title);
        $stmt->execute();

        $stmt->close();
    }  

    public function getUserComments() {
        $sql = "SELECT * FROM users;";
        $connection = $this->connect();
        $stmt = $connection->prepare($sql);
        $stmt->execute();
        $row = $stmt->get_result();
        while ($result = $row->fetch_assoc()) {
            $data[] = $result; //speichere die resultate in einem array
        }
        if (!empty($data)) {
            return $data;
        }
        else {
            return null;
        }
    }

    public function CountVotes($title, $datum) {
        $res = 0;
        $sql = "SELECT * FROM users WHERE appointment = ? AND Datum = ?;";
        $connection = $this->connect();
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("ss", $title, $datum);
        $stmt->execute();
        $row = $stmt->get_result();
        while ($result = $row->fetch_assoc()) {
            if($result == null) break;
            $data[] = $result;
        }
        if (!empty($data)) {
            $empty = 0;
        }
        else {
            $empty = 1;
        }
        $stmt->close();

        if($empty == 0) {
            $sql = "SELECT COUNT(appointment) FROM users WHERE appointment = ? AND Datum = ?;";
            $connection = $this->connect();
            $stmt = $connection->prepare($sql);
            $stmt->bind_param("ss", $title, $datum);
            $stmt->execute();
            $stmt->store_result();
            $stmt->bind_result($res);
            $stmt->fetch();

            $stmt->close();
        }
        $sql = "UPDATE oneappointment SET votes = ? WHERE appointment = ? and Datum = ?;";
        $connection = $this->connect();
        $stmt = $connection->prepare($sql);
        $stmt->bind_param("sss", $res, $title, $datum);
        $stmt->execute();

        $stmt->close();
    }
}

