<?php

include 'config.php';

 $cnx = mysql_connect( "localhost", "root", "" ) ;
 
 //s�lection de la base de donn�es:
  $db  = mysql_select_db( "mo" ) ;
  
  //r�cup�ration de donn�es d'adresses
 $id_client= $_POST['id_client'];
 $carte= $_POST['carte'];
  $mois= $_POST['mois'];
  $annee= $_POST['annee'];
  $cvv= $_POST['cvv'];
 
 //echo $ville;
  echo $mois;
   echo $annee;
   echo $cvv;
 
 
 
 $sql3=" insert into cartes (id_client,num,mois,annee,cvv) values ($id_client, $carte, $mois, $annee, $cvv)";
 
 try {
	$dbh3 = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh3->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt3 = $dbh3->query($sql3);  
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}


?>