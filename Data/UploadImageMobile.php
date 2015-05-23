<?php

include('ResizeClass.php');
include('DataModel.php');

//if(!isset($_SESSION['user'])){
	
//header("Location: ../../Login");

//}

$output_dir  = "../Images/Invoices/";

if(isset($_FILES["myfile"])){

$ret = array();

$error = $_FILES["myfile"]["error"];

if(!is_array($_FILES["myfile"]["name"])){

$name = $_FILES["myfile"]["name"];
move_uploaded_file($_FILES["myfile"]["tmp_name"],$output_dir.$name);
$ret[]= $name;

$newfilename=str_replace(" ","",str_replace(".","",microtime()));

$resize = new ResizeImage($output_dir.$name);
				$resize->resizeTo(1400, 900, 'exact');
				$resize->saveImage($output_dir.$newfilename.$name);
				
				unlink($output_dir.$name);
				
				InsertImage($_POST["InvoiceID"],str_replace("../","",$output_dir).$newfilename.$name);

}else{

$fileCount = count($_FILES["myfile"]["name"]);
 
 for($i=0; $i < $fileCount; $i++)
	  {
	  	$name = $_FILES["myfile"]["name"][$i];
		move_uploaded_file($_FILES["myfile"]["tmp_name"][$i],$output_dir.'temp'.$name);
	  	$ret[]= $name;
		
		
		$newfilename=str_replace(" ","",str_replace(".","",microtime()));

		$resize = new ResizeImage($output_dir.$name);
				$resize->resizeTo(1400, 900, 'exact');
				$resize->saveImage($output_dir.$newfilename.$name);
				
				unlink($output_dir.$name);
				
				InsertImage($_POST["InvoiceID"],$output_dir.$newfilename.$name);
	  }

}




echo json_encode($_POST["InvoiceID"]);

}



?>