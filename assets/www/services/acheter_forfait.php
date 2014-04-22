<?php

include 'config.php';

 
 // récupération des données du client
 $id_client= $_POST['id_client']; 
 $forfait= $_POST['forfait'];
 
 
$sql=" update clients set credit=credit+$forfait where id=$id_client ";

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql);   
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}

?>