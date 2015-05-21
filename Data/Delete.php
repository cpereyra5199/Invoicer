<?php 

include('DataModel.php');

$imageid = $_GET["ImageID"];
$imagename = $_GET["ImageName"];

mysql_connect($GLOBALS['hostname'], $GLOBALS['username'], $GLOBALS['password']) OR DIE("Unable to connect to database! Please try again later.");
	mysql_select_db($GLOBALS['dbname']);

$query = "delete from invoiceimages where ID=".$imageid;
$result = mysql_query($query);


if ($result ==1 ) {
unlink('../'.$imagename);

exit();
}

?>