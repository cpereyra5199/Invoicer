<?php

if(!isset($_SESSION)){
    session_start();
}

if(!isset($_SESSION['user'])){
	
header("Location: ../../Login");

}
include('ImageFlip.php');
include('DataModel.php');

$path = "../Images/Invoices/";

$imageid=$_GET["ImageID"];
$image = "../".$_GET["ImageName"];
$direction = strtolower($_GET["Direction"]);

$img = new ImageManipulation();
$img->load($image);

$ext = pathinfo($image, PATHINFO_EXTENSION);

$img->flip_image($direction);

$img->save_image($image,$ext);

?>