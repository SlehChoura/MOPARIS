<?php
include 'config.php';

//sélection de la base de données:
  
  //récupération de données d'adresses
  $id= $_POST['id_adresse'];
  
  
  
  $sql=" delete from cartes where id=$id";

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql);  
	
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}


?>