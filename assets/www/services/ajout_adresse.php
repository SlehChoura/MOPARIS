<?php

include 'config.php';

 
 //s�lection de la base de donn�es:
  
  //r�cup�ration de donn�es d'adresses
 $id_client= $_POST['id_client'];
 $adresse= ($_POST['adresse']);
 $etage= $_POST['etage'];
 //$ville= $_POST['ville'];
 $d_g= $_POST['d_g'];
 $info= ($_POST['info']); 
 
 
 //echo $ville;
 /*echo $adresse;
 echo $etage;
 echo $d_g;
 echo $info;
 */
 
 
 $sql3=" insert into adresses (id_client,adresse,etage,droite,info) values ($id_client, '$adresse', '$etage', '$d_g', '$info')";
 
 try {
	$dbh3 = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh3->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt3 = $dbh3->query($sql3);  
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}