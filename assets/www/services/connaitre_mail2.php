<?php
include 'config.php';

//s�lection de la base de donn�es:
  
  //r�cup�ration de donn�es d'adresses
  $mail= $_POST['mail'];
  
  
  
  $sql=" select * from clients 
  where mail='$mail'";

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->prepare($sql);  
	$stmt->execute();
	
	$motdepasse = $stmt->fetch(PDO::FETCH_ASSOC);
	if ($motdepasse)
	{
	echo "existe";
	}else {
	echo "true";
	}
	
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}

?>