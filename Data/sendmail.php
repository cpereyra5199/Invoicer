<?php
include_once('phpmailer.php');
include_once("invoice.php");

function GeneratePDF($invoiceID){
				
$invoiceID = $invoiceID;

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

$pdf->OutputInvoiceAttachment();

return $_SERVER['DOCUMENT_ROOT'].'/Invoicer/sentinvoices/invoice'.$invoiceID.'.pdf';
	
}


function sendMail($sendto,$company,$invoiceid,$linkeddomain,$sendfrom,$invoiceorestimate,$invoice){
	
		$doctype ="";
		if($invoiceorestimate=="an invoice"){
			
			$color = "#00B2FF";
			$textcolor ="#FFFFFF";
			$doctype = "Invoice";
			
		}else if ($invoiceorestimate=="an estimate"){
			
			$textcolor="#000000";
			$color = "#FFBD20";
			$doctype="Estimate";
		}else{
			
			$textcolor="#FFFFFF";
			$color="#53BC44";
			$doctype="Receipt";
			
		}
    
	
		$to = $sendto;
		$subject = $doctype." #".$invoiceid;
		$headers = "MIME-Version: 1.0" . "\r\n";
		$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
		$headers .= 'From:  '.$company.' <'.$sendfrom.'>' . "\r\n";
		$headers .= 'Reply-To: '.$sendfrom. "\r\n";
		$headers .= 'X-Mailer: PHP/'.phpversion();
		$message = "
		<div>
		<div style='background-color:gray;border-radius:10px 10px 0px 0px;-moz-border-radius: 10px 10px 0px 0px;-webkit-border-radius: 10px 10px 0px 0px; color:white; padding:3px'><h2>".$company."</h2></div>
		<div style='color:".$textcolor.";padding:20px 3px 20px 3px; overflow:auto; background-color:".$color."'>
		<div style='float:left'><span style='font-size:18px;font-weight:bold'>".$doctype." ID</span> - <span style='font-size:16px;font-style:italic'>".$invoiceid."</span></div>
		<div style='float:right'>Amount: <span style='font-size:20px'>$".$invoice."</span></div>
		</div>
		<div style='clear:both'></div>
		<div>
		<p>Hey there!</p>
		<p>".$company." has prepared ".$invoiceorestimate." for you. Your document has been attached below.</p>
		<br/>
		<p>If you have any issues or questions please contact us directly.</p>
		<p>Thank you for your business!</p>
		</div>
		<br/>
		<span>".$company."</span>
		</div>";
		
		
$mail = new PHPMailer(); // defaults to using php "mail()"
$mail->IsSMTP(); // telling the class to use SMTP
//$mail->Host       = "p3plcpnl0880.prod.phx3.secureserver.net"; // SMTP server
$mail->SMTPDebug  = 2;                     // enables SMTP debug information (for testing)
                                           // 1 = errors and messages
                                           // 2 = messages only
$mail->SMTPSecure = 'ssl';
$mail->SMTPAuth   = true;                  // enable SMTP authentication
$mail->Host       = "p3plcpnl0880.prod.phx3.secureserver.net"; // sets the SMTP server
$mail->Port       = 465;                    // set the SMTP port for the GMAIL server
$mail->Username   = "info@efcontractorsllc.com"; // SMTP account username
$mail->Password   = "ef1968";        // SMTP account password

$mail->AddReplyTo($sendfrom,$company);

$mail->SetFrom($sendfrom, $company);

$mail->AddReplyTo($sendfrom,$company);


$mail->AddAddress($sendto);

$mail->Subject = $doctype." #".$invoiceid;

$mail->MsgHTML($message);

$attachment = GeneratePDF($invoiceid);

$mail->AddAttachment($attachment);

if(!$mail->Send()) {
echo "Mailer Error: " . $mail->ErrorInfo;
} else {
echo "Message sent!";
}
		
		//mail($to,$subject,$message,$headers);
}

?>