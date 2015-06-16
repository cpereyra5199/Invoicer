<?php

require_once('tcpdf/tcpdf.php');
require('DataModel.php');

class InvoiceHTML extends TCPDF 
{
	
var $html = '';
var $imageurl = '';
var $documentname = '';
var $companyinfo = '';
var $clientinfo = '';
var $lineitemshtml = '';
var $invoicedate = '';
var $invoiceid = '';
var $expirationdate = '';
var $taxtotal = '';

function SetExpirationDate($p_expirationDate){
	
	global $expirationdate;
	
	$expirationdate = $p_expirationDate;
	
}

function SetInvoiceID($p_invoiceID){
	
	global $invoiceid;
	
	$invoiceid = $p_invoiceID;
	
}

function SetLogoUrl($logourl){
	
	global $imageurl;
	$imageurl = $logourl;
	
}

function SetDate($date){
	
	global $invoicedate;
	
	$invoicedate = $date;
	
}

function SetLineItems($items){
	
	global $lineitemshtml;
	global $taxtotal;
	global $subtotal;
	
	$tax = 0;
	$sum = 0;
	
	foreach($items as &$val){
		
		$rate =floatval($val["itemtotal"]);

		$total = ($rate * $val["itemquantity"]);

		$lineitemshtml = $lineitemshtml.
		'<tr>
		<td colspan="2">'.$val["itemname"].'</td>
		<td colspan="4">'.$val["itemdescription"].'</td>
		<td style="text-align:center">'.$val["itemquantity"].'</td>
		<td style="text-align:center">'.number_format($rate,2).'</td>
		<td style="text-align:right">'.number_format($total,2).'</td>
		</tr>';
		
		$sum += $total;
		
		if ($val["itemtaxable"]=="1"){
			
			$tax+= round(($total)*($val["itemrate"]/100),2,PHP_ROUND_HALF_UP);
		}
	}
	
	$taxtotal = $tax;
	$subtotal = $sum;	
}

function SetClientInfo($name,$address){
	
	global $clientinfo;
	
	$clientinfo = '<span style="font-size:10px;color:#646464"><span style="font-size:12px;font-weight:bolder">'.$name.
	'</span><br/>'.$address["street"].'
	<br/>'.$address["citystate"].'
	<br/>'.$address["zipcode"].'</span>';
	
}

function SetCompanyInfo($name,$address){
	
	global $companyinfo;
	
	$companyinfo = '<span style="font-size:10px;color:#646464"><span style="font-size:12px"><b>'.$name.'</b></span><br/>'.$address["street"].'
	<br/>'.$address["citystate"].'
	<br/>'.$address["zipcode"].'</span>';
	
	
}

function SetDocumentName($name){
	
	global $documentname;
	
	$documentname = $name;
	
}

function AddExpirationDate(){
	
	global $expirationdate;
	
	return $expirationdate;
	
}

function AddInvoiceID(){
	
	global $invoiceid;
	
	return $invoiceid;
	
}

function AddInvoiceDate(){
	
	global $invoicedate;
	return $invoicedate;
	
}

function AddLogo(){
	
	global $imageurl;
	return '<div><img style="width:100px" src="'.$imageurl.'"/></div>';

}

function AddCompanyInfo(){
	
	global $companyinfo;
	
	return $companyinfo;
	
	
}

function AddDocumentName(){
	
	global $documentname;
	
	return $documentname;
	
}

function AddClientInfo(){
	
	global $clientinfo;
	
	return $clientinfo;
}

function AddLineItems(){
	
	global $lineitemshtml;
	
	return $lineitemshtml;
	
}

function AddDocumentInfoTop(){

	global $html;
	$addlogohtml = $this->AddLogo();
	$adddocumentname = $this->AddDocumentName();
	$companyinfo = $this->AddCompanyInfo();
	$clientinfo = $this->AddClientInfo();
	$lines = $this->AddLineItems();
	$html = '<table>
	<tr>
	<td style="text-align:left">'.$addlogohtml.'</td>
	<td></td>
	<td></td>
	<td style="text-align:right"><span style="text-align:right;color:#646464; font-size:18px"><b>'.$adddocumentname.'</b></span><br/><table border="1"><tr style="background-color:#C0C0C0;text-align:center"><td>Date</td><td>Document #</td></tr><tr style="text-align:center"><td>'.$this->AddInvoiceDate().'</td><td>'.$this->AddInvoiceID().'</td></tr></table></td>
	</tr>
	<tr>
	<td style="text-align:left">'.$companyinfo.'</td>
	<td></td>
	<td></td>
	<td style="text-align:left"><span>'.$clientinfo.'</span></td>
	</tr>
	<tr><td>&nbsp;</td></tr>
	<tr><td>&nbsp;</td></tr>
	</table>
	<table width="70%">
	<tr>
	<td><table border="1" cellpadding="2"><tr style="background-color:#C0C0C0;text-align:left"><td colspan="2">Job</td><td colspan="2">Expiration Date</td></tr><tr style="text-align:left"><td colspan="2">8 Perimeter Ctr. E Atlanta, GA 30346</td><td colspan="2">'.$this->AddExpirationDate().'</td></tr></table></td>
	</tr>
	</table>
	<br/>
	<br/>
	<table cellpadding="2">
	<thead>
	<tr style="background-color:#C0C0C0;text-align:center">
	<th colspan="2">Service</th>
	<th colspan="4">Description</th>
	<th style="text-align:center">Quantity</th>
	<th>Rate</th>
	<th>Amount</th>
	</tr>
	</thead>'.$lines.'
	</table>
	';
	
}

function AddTitleAddress($titleaddress){
	
	
}

function AddItems($items){
	
	
	
}

function OutputInvoice(){
	
	global $html;

	$this->writeHTML($html, true, false, true, false, '');
	
	$this->Output('invoice.pdf', 'I');
}

	
	
	
}



?>