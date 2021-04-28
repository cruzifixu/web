<?php


class Appointment{
  public $id;
  public $title;
  public $Erstelldatum;
  public $Ablaufdatum;
  public $Ort;

  function __construct($id, $title, $e, $a, $o){
    $this->id= $id;
    $this->title = $title;
    $this->Erstelldatum = $e;
    $this->Ablaufdatum = $a;
    $this->Ort = $o;
  }
}

