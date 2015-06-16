<?php

require_once('tcpdf/tcpdf.php');
require('DataModel.php');

$querystring = base64_decode($_SERVER['QUERY_STRING']);
parse_str($querystring, $querysrings);

 if(isset($querysrings["startdate"]) && isset($querysrings["enddate"])){ 
 
 $startdate = $querysrings["startdate"];
 $enddate = $querysrings["enddate"];
 
 $ReportItems = ProfitabilityReport($startdate,$enddate);

 
// create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
$pdf->SetPrintHeader(false);
$pdf->SetPrintFooter(false);
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
$pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP-25, PDF_MARGIN_RIGHT);
$pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);

// set font
$pdf->SetFont('dejavusans', '', 10);

// add a page
$pdf->AddPage();

// header
$html = '<div style="text-align:center;">
<h2>CGS Contractors LLC Jobs</h2>
<h1>Job Profitability Summary</h1>
<h3>'.$startdate.'&nbsp;-&nbsp;'.$enddate.'</h3>
<hr/>
</div>';

$pdf->writeHTML($html, true, false, true, false, '');

$html = "";

for($i = 0; $i<count($ReportItems);$i++){
	
	$revenue=0;
	$cost=0;
	
	$html= $html.'<h4>'.$ReportItems[$i]["Name"].'</h4>';

	$html = $html.'<table cellspacing="1.5" cellpadding="1.5">
		<tr>
		<thead>
		<th colspan="3"></th>
		<th style="text-align:right"><b>Revenue</b></th>
		<th style="text-align:right"><b>Cost</b></th>
		<th style="text-align:right"><b>($) Diff.</b></th>
		</thead>
		</tr>';
	

	for($j=1;$j<count($ReportItems[$i]["Job"]);$j++){
		
		$html = $html.'
		<tr>
		<td colspan="3">'.$ReportItems[$i]["Job"][$j]["InvoiceID"].' - '.$ReportItems[$i]["Job"][$j]["InvoiceTitle"].'</td>
		<td style="text-align:right">'.$ReportItems[$i]["Job"][$j]["TotalAmount"].'</td>
		<td style="text-align:right">'.$ReportItems[$i]["Job"][$j]["ExpenseTotal"].'</td>
		<td style="text-align:right">'.$ReportItems[$i]["Job"][$j]["Net"].'</td>
		</tr>';
		
		$revenue+=$ReportItems[$i]["Job"][$j]["TotalAmount"];
		$cost=$ReportItems[$i]["Job"][$j]["ExpenseTotal"];
		
	}
	
	$net = $revenue-$cost;
	
	$html = $html.'
	<tr><td colspan="3"></td><td style="border-top:thin"></td><td style="border-top:thin"></td><td style="border-top:thin"></td></tr>
	<tr>
	<td colspan="3">Total '.$ReportItems[$i]["Name"].'</td>
	<td style="text-align:right">'.number_format($revenue,2).'</td>
	<td style="text-align:right">'.number_format($cost,2).'</td>
	<td style="text-align:right">'.number_format($net,2).'</td>
	</tr></table><br/>';
	
	
}


$pdf->writeHTML($html, true, false, true, false, '');


//Close and output PDF document
$pdf->Output('profitreport'.$startdate.'-'.$enddate.'.pdf', 'I');
 
 }else{
	 
	 die('No data found');
	 
 }
 
?>