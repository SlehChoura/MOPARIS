<?php

include 'config.php';
$test=false;
   function add_heures($heure1,$heure2){
	$secondes1=heure_to_secondes($heure1);
	$secondes2=heure_to_secondes($heure2);
	$somme=$secondes1+$secondes2;
	if ($somme>86400)
	{$test=true;
	$somme= $somme - 86400;
	}
	//transfo en h:i:s
	$s=$somme % 60; //reste de la division en minutes => secondes
	$m1=($somme-$s) / 60; //minutes totales
	$m=$m1 % 60;//reste de la division en heures => minutes
	$h=($m1-$m) / 60; //heures
	if ($m>=30)
	{$m=0;
	$h=$h+1;
	}else {
	$m=30;
	}
	if ($m<10){$m="0".$m;}
	$resultat=$h.":".$m;
	return $resultat;
}
   function soustraire_heures($heure1,$heure2){
	$secondes1=heure_to_secondes($heure1);
	$secondes2=heure_to_secondes($heure2);
	$somme=$secondes1-$secondes2;

	$resultat=$somme / 3600;
	return $resultat;
}
function heure_to_secondes($heure){
	$array_heure=explode(":",$heure);
	$secondes=3600*$array_heure[0]+60*$array_heure[1];
	return $secondes;
}
 // $id_client= $_POST['id_client'];
 $today = date("Y-m-d");  
 $tomorrow=date("Y-m-d", strtotime("+1 days"));
 
 if ( $test ==true)
 {
 $today=$tomorrow;
 }
 
$heureActuelle = date("H:i") ; 
$heureActuelle=add_heures($heureActuelle,"02:00");
if ( heure_to_secondes($heureActuelle)<36000)
{
$heureActuelle="0".$heureActuelle;

}
$heurePossible=add_heures($heureActuelle,"01:00");
echo $heureActuelle."\n". $today;
$heureT= $today."T".$heureActuelle;
$sql=" select id , Hfin from agendas 
		where date = '$today' and Hdeb < '$heureActuelle' and Hfin >= '$heurePossible'";
//set nom='$nom' , prenom='$prenom', tel='$tel' , mail='$mail' where id=$id_client ";
try {
$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
	$sql1 = $mysqli->query($sql);

	
	
	//$employees = $stmt->fetch();
	$premier=true;
	$compteur=0;
	$results = array();
    while($row = mysqli_fetch_assoc($sql1))
    {
	$id=$row['id'];
	$fin =$row['Hfin'];
	$nouvelleDuree= soustraire_heures($fin,$heureActuelle);

	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$sql2=" update agendas set Hdeb='$heureActuelle' , duree=$nouvelleDuree, heureDebut='$heureT'  where id=$id ";
	$stmt = $dbh->query($sql2);   
	
	}
	}catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}
/*
try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql);   
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}*/

?>