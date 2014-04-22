<?php

include 'config.php';

 //$cnx = mysql_connect( "localhost", "root", "" ) ;
 
 //sélection de la base de données:
 // $db  = mysql_select_db( "mo" ) ;
  
 // récupération des données du client
 $id_commande= $_POST['id_commande']; 
 $note= $_POST['note'];
 $rec= $_POST['reclamation'];
 
 $commentaire= ($_POST['commentaire']);
$evalue=1;
 if (empty($rec))
 {
$sql=" update commandes set note=$note , commentaire='$commentaire', evalue=$evalue  where id=$id_commande ";
}

else
{
$sql=" update commandes set note=$note , commentaire='$commentaire', evalue=$evalue , reclamation='$rec'  where id=$id_commande ";
}

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql);   
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}

?>