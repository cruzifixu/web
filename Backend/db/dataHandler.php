<?php
include("./models/person.php");
class DataHandler
{

   public function queryPersons()
    {
        $res =  $this->getDemoData();
        return $res;
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
            if ($val[0]->name == $name) {
                array_push($result, $val);
            }
        }
        return $result;
    }



   private static function getDemoData()
   {
        
            $demodata=[
            [new Appointment(1,  "Class1", "14.04.", "15.05.", "22.2", "19.21")],
            [new Appointment(2,  "Class2", "14.05", "10.06", "12.2", "19.22")],
            [new Appointment(3,  "Class3", "14.09", "89.02", "11.3", "17.22")],
            [new Appointment(4,  "Class4", "14.10", "213.21", "13.5", "18.22")],
        ];
        
        

        return $demodata;
        
    }
}
