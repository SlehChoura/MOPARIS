<?php
include 'config.php';

//s�lection de la base de donn�es:
  
  //r�cup�ration de donn�es d'adresses
 // $mail= $_POST['mail'];
  $mail="sleh";
  
  
  $sql=" select id, credit from clients where mail='$mail'";

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->prepare($sql);  
	//$stmt->bindParam('id', $_GET["id"]);
	$stmt->execute();
	$employee = $stmt->fetch(PDO::FETCH_ASSOC);
	$dbh = null;
	
	if ($employee)
	{
	echo "existe";
	}else {
	echo "true";
	}
	
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}

?>