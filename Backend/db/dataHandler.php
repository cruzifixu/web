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


    public function addUserSelect($user, $title) {
        $sql = "UPDATE oneappointment SET user = ? WHERE ?;";
        $stmt = $this->connect()->prepare($sql);
        $stmt->bind_param($user, $title);
        $stmt->execute();

        return true;
    }

   /*private static function getDemoData()
   {
        
            $demodata=[
            [new Appointment(1,  "Class1", "14.04.", "15.05.", "22.2", "19.21")],
            [new Appointment(2,  "Class2", "14.05", "10.06", "12.2", "19.22")],
            [new Appointment(3,  "Class3", "14.09", "89.02", "11.3", "17.22")],
            [new Appointment(4,  "Class4", "14.10", "213.21", "13.5", "18.22")],
        ];
        
        

        return $demodata;
        
    }*/
}