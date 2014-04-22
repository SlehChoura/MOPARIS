<?php

include 'config.php';
/*
 $cnx = mysql_connect( "localhost", "root", "" ) ;
 //datep:  dateprac, Hdebut: heureDebut,Hfin: heureFin, idmed
 //sélection de la base de données:
  $db  = mysql_select_db( "mo" ) ;
  */
  
  //récupération de données d'adresses
 $dateprac= $_POST['datep'];
 $Hdebut= $_POST['Hdebut'];
 $Hfin= $_POST['Hfin'];
 $idP= $_POST['idmed'];
 $Hdebut2= $_POST['Hdeb2'];
 $Hfin2= $_POST['Hfin2'];//
 $dureeDispo= $_POST['dureedispMed'];
	$sqltmp = " select sexe,code 
		from practicien
		where id='10' ";
		
 
 
 

 try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$stmt1 = $dbh->prepare($sqltmp);  
	$stmt1->execute();	
	$med = $stmt1->fetch(PDO::FETCH_ASSOC);
	$smed=$med['sexe'];
	$cmed=$med['code'];
	 $sql3=" insert into agendas (id_practicien,date,heureDebut,heureFin,sexeMed, CodeMed,Hdeb, Hfin,duree) values ($idP, '$dateprac', '$Hdebut', '$Hfin', '$smed', '$cmed', '$Hdebut2', '$Hfin2','$dureeDispo')";
 
	
	$stmt3 = $dbh->query($sql3);  
	
	
	echo "true";
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}