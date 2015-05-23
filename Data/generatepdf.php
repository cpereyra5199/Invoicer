<?php

//add code here to check if invoice is expired

require('invoice.php');
require('DataModel.php');


$querystring = base64_decode($_SERVER['QUERY_STRING']);

parse_str($querystring, $querysrings);

 if(isset($querysrings["invoiceID"])){
	 
$invoiceID = $querysrings["invoiceID"]; 
$settings = GetSettingsArray();
$client = GetInvoice($invoiceID,"false");
$LineItems = GetLineItems($invoiceID,"false");
$PaymentSchedule = GetSteps($invoiceID,"false");
$images = GetImagesForInvoice($invoiceID);
	 
$itemcolumn = "ITEM";
$itemdescription="DESCRIPTION";
$itemquantity="QUANTITY";
$itemtotal = "LINE TOTAL";

$pdf = new PDF_Invoice( 'P', 'mm', 'A4' );
$pdf->SetTextColor(100,100,100);
$pdf->AddPage();
$pdf->AddCompany( "",
                  $settings["streetaddress"]."\n".
                  $settings["citystate"]."\n".
				  $settings["zipcode"]);
				  
				 
$pdf->AddLogo("../images/logo.png");

	  



if($client["paid"]=="1"){

$pdf->addClient($client["invoiceID"],"RECEIPT");
$pdf->AddDocumentName("RECEIPT");
$pdf->stamp("PAID");
$date = strtotime($client["paiddate"]);
	
}else{
	
	$pdf->addClient($client["invoiceID"],$client["EmailSent"]==1? "INVOICE":"ESTIMATE");
	$pdf->AddDocumentName($client["EmailSent"]==1? "INVOICE":"ESTIMATE");	  
    $date = strtotime($client["createddate"]);
}

$pdf->addDate(date("m-d-y",$date ));


$pdf->addClientInfo($client["clientname"],$client["clientstreetaddress"]."\n".$client["clientcitystate"]."\n".$client["clientzip"],$client["invoicetitle"]);

$date = strtotime($client["expirationdate"]);

$pdf->addExpirationDate(date("m-d-y",$date ));

$cols=array( $itemcolumn    => 40,
             $itemdescription  => 87,
             $itemquantity     => 22,
             $itemtotal => 41 );
$pdf->addCols( $cols);
$cols=array( $itemcolumn    => "L",
             $itemdescription  => "L",
             $itemquantity     => "C",
             $itemtotal => "R" );
$pdf->addLineFormat($cols);
$pdf->addLineFormat($cols);

$y = 85;

$itemsarray = array();

foreach($LineItems as &$val){
	
	$line = array( $itemcolumn    => $val["itemname"],
               $itemdescription  => $val["itemdescription"],
               $itemquantity     => $val["itemquantity"],
               $itemtotal => $val["itemtotal"]);

$size = $pdf->addLine( $y, $line );
$y   += $size + 2;
	
array_push($itemsarray,array ( "px_unit" => $val["itemtotal"], "qte" => $val["itemquantity"], "taxable"=>$val["itemtaxable"], "rate"=>$val["itemrate"] ));
	
	
}
  
$tot_prods = $itemsarray;
					
$pdf->addTotalsFormatting();
$pdf->addTVAs($tot_prods);
if($client["attachcontract"]){
	
	if($client["paid"]=="1"){

	$date = strtotime($client["paiddate"]);
	
}else{
	
    $date = strtotime($client["createddate"]);
}
	
	$pdf->AddContract($settings,$client,date("m-d-y",$date),$PaymentSchedule);
	
}

//if there are images add them to pdf
if(count($images)>0){
$pdf->AddImages($images);
 }

$pdf->Output();
 }else{
	 
   die('No Invoice Found.');
	 
 }
?>