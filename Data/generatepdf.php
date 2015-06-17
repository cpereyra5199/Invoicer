<?php

//add code here to check if invoice is expired

require('invoice.php');
require('DataModel.php');

$querystring = base64_decode($_SERVER['QUERY_STRING']);

parse_str($querystring, $querysrings);

 if(isset($querysrings["invoiceID"])){
	 
$invoiceID = $querysrings["invoiceID"]; 
	
// create new PDF document
$pdf = new InvoiceHTML(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->SetPrintHeader(false);
$pdf->SetPrintFooter(false);
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP-20, PDF_MARGIN_RIGHT);
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set font
$pdf->SetFont('helvetica', '', 10);

// add a page
$pdf->AddPage();
$pdf->SetLogoUrl('../images/logo.png');

$settings = GetSettingsArray();
$client = GetInvoice($invoiceID,"false");
$LineItems = GetLineItems($invoiceID,"false");

$pdf->SetInvoiceID($invoiceID);

$companyaddress = array(

"street" => $settings["streetaddress"],
"citystate" =>$settings["citystate"],
"zipcode" => $settings["zipcode"]

);

$pdf->SetCompanyInfo($settings["companyname"],$companyaddress);

$clientaddress = array(

"street" => $client["clientstreetaddress"],
"citystate" =>$client["clientcitystate"],
"zipcode" => $client["clientzip"]

);

$pdf->SetClientInfo($client["clientname"],$clientaddress);

if($client["paid"]=="1"){

$pdf->SetDocumentName("RECEIPT");
$date = strtotime($client["paiddate"]);
	
}else{
	
$pdf->SetDocumentName($client["EmailSent"]==1? "INVOICE":"ESTIMATE");
$date = strtotime($client["createddate"]);

}

$pdf->SetDate(date("m-d-y",$date));

$date = strtotime($client["expirationdate"]);

$pdf->SetExpirationDate(date("m-d-y",$date ));

$pdf->SetLineItems($LineItems);

$pdf->AddDocumentInfoTop();

$pdf->OutputInvoicePDF();

 }
 
 else{
	 
	 die('No Invoice Found.');
	 
 }



?>