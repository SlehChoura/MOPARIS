<?php

include 'config.php';

 
 // récupération des données du client
 $id_client= $_POST['id_client']; 
 $nom= ($_POST['nom']);
 $prenom= ($_POST['prenom']);
 $tel= $_POST['tel'];
 $mail= $_POST['mail'];
 
$sql=" update clients set nom='$nom' , prenom='$prenom', tel='$tel' , mail='$mail' where id=$id_client ";

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql);   
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}

?>