<?php
include 'config.php';

//s�lection de la base de donn�es:
  $db  = mysql_select_db( "mo" ) ;
  
  //r�cup�ration de donn�es d'adresses
  $id= $_POST['id_adresse'];
  
  
  
  $sql=" delete from adresses where id=$id";

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql);  
	
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}


?>