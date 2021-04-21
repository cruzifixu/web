<?php


class Appointment{
  public $id;
  public $title;
  public $termin1;
  public $termin2;
  public $termin3;
  public $termin4;

  function __construct($id, $title, $t1, $t2, $t3, $t4){
    $this->id= $id;
    $this->title = $title;
    $this->termin1 = $t1;
    $this->termin2 = $t2;
    $this->termin3 = $t3;
    $this->termin4 = $t4;
  }
}

