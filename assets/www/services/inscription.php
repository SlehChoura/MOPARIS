<?php

include 'config.php';

 //sélection de la base de données:
   
 // récupération des données du client
 $nom= ($_POST['nom']);
 $prenom= ($_POST['prenom']);
 $civilite= $_POST['civilite'];
 $tel= $_POST['tel'];
 $mdp= ($_POST['mdp']);
 $mail= $_POST['mail'];
 $contact= $_POST['contact'];
 $code= $_POST['code'];
 
 
 /*echo $civilite;
echo $nom;
echo $prenom;
echo $tel;
echo $mdp;
echo $mail;
echo $code;
echo $contact;*/
 
 
 
//récupération de données d'adresses
 $adresse=( $_POST['adresse']);
 $etage= $_POST['etage'];
 $ville= $_POST['ville'];
 $d_g= $_POST['d_g'];
 $info= ($_POST['info']); 
 
 /*echo $adresse;
 echo $ville;
 echo $etage;
 echo $d_g;
 echo $info;
 */
 
 //récupération des données de carte
 
  $carte= $_POST['carte'];
  $mois= $_POST['mois'];
  $annee= $_POST['annee'];
  $cvv= $_POST['cvv'];
   
  
   
 
//insertion donnée client

 $sql=" insert into clients (civilite,nom,prenom,tel,mdp,mail,contactez_moi,code) values ('$civilite', '$nom', '$prenom', '$tel', '$mdp', '$mail', $contact, '$code' )";

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql);   
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}
 
 
 // récupération id_ client
 $sql2="select id from clients where mail='$mail'";
 
 
 try {
	$dbh2 = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh2->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt2 = $dbh->prepare($sql2);  
	$stmt2->execute();
	$resultat = $stmt2->fetch(PDO::FETCH_ASSOC);
	$id_client= $resultat['id'];
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}
 
 //insertion donnée adresse
 
 $sql3=" insert into adresses (id_client,adresse,ville,etage,droite,info) values ($id_client, '$adresse', '$ville', '$etage', '$d_g', '$info')";
 try {
	$dbh3 = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh3->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt3 = $dbh3->query($sql3);  
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}
 
 // insertion donnée carte
 $sql4=" insert into cartes (id_client,num,mois,annee,cvv) values ($id_client, '$carte', '$mois', $annee, '$cvv')";
 if ( !empty($carte) && !empty($cvv) )
 {
 try {
	$dbh4 = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh4->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt4 = $dbh4->query($sql4);  
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}
 }
 
 
 
 
?>