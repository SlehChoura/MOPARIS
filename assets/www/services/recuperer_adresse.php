<?php
include 'config.php';

//s�lection de la base de donn�es:
  
  //r�cup�ration de donn�es d'adresses
  $id_client= $_POST['id_client'];
   $adr= $_POST['adresse'];
  
  
  
  $sql=" select * from adresses where id_client=$id_client and adresse ='$adr'";

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->prepare($sql);  
	$stmt->execute();
	$employee = $stmt->fetchObject();  
	$dbh = null;
	echo '{"item":'. json_encode($employee) .'}'; 
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}


?>