<?php
include 'config.php';

//sélection de la base de données:
  
  //récupération de données d'adresses
  $id_client= $_POST['id_client'];
  
  
  
  $sql=" select credit from clients where id=23";

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->prepare($sql);  
	//$stmt->bindParam('id', $_GET["id"]);
	$stmt->execute();
	$employee = $stmt->fetchObject();  
	$dbh = null;
	echo '{"item":'. json_encode($employee) .'}'; 
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}



?>