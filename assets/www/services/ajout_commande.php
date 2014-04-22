<?php

include 'config.php';

 
 // récupération des données du client
 $id_client=$_POST['id_client'];
 
 $id_practicien= $_POST['id_practicien'];
 $date= $_POST['date'];
 $duree= $_POST['duree'];
 $tarif= $_POST['tarif'];
 $evaluation= $_POST['evaluation'];
 $adresse_client= $_POST['adresseclient'];
 $num= $_POST['numtel'];
 $montant= $_POST['montantprestation'];
 $nom= $_POST['nom'];
 $heuredebut= $_POST['h_debut'];
 $mail_client= $_POST['mail_client'];
 $mail_praticien= $_POST['mail_praticien'];
 $id_agenda= $_POST['id_agenda'];
 $heureFin= $_POST['h_fin'];

 /*
 echo $id_client;
echo $id_practicien;
echo $date;
echo $duree;
echo $tarif;
echo $evaluation;

*/
   function add_heures($heure1,$heure2){
	$secondes1=heure_to_secondes($heure1);
	$secondes2=heure_to_secondes($heure2);
	$somme=$secondes1+$secondes2;
	
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
function soustraire_heures2($heure1,$heure2){
	$secondes1=heure_to_secondes($heure1);
	$secondes2=heure_to_secondes($heure2);
	$somme=$secondes1-$secondes2;
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
function heure_to_secondes($heure){
	$array_heure=explode(":",$heure);
	$secondes=3600*$array_heure[0]+60*$array_heure[1];
	return $secondes;
}
/*
$heureActuelle=add_heures($heureActuelle,"02:00");
if ( heure_to_secondes($heureActuelle)<36000)
{
$heureActuelle="0".$heureActuelle;

}
$heureT= $today."T".$heureActuelle;
 */
 

 $sql=" insert into commandes (id_client,id_practicien,date,heure,duree,tarif,evalue) values ($id_client, $id_practicien, '$date','$heuredebut', $duree, $tarif, $evaluation )";
 $sql2=" select * from agendas 
 where id=$id_agenda";
try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql);   
	//envoi de mail client et praticien
$ch1="Vous avez reserver un massage le ".$date."\nqui commence a ".$heuredebut." et qui dure ".$duree."\npour un montant de ".$montant.
" a l'adresse ".$adresse_client;
$ch2=" Vous avez un rendez-vous avec ".$nom."\nle ".$date."\nqui commence a ".$heuredebut." et qui dure ".$duree.
 "\na l'adresse ".$adresse_client."\nLe numero de telephone du client est ".$num;
mail($mail_client, "Recaputulatif de commande ", $ch1); 
mail($mail_praticien, "Vous avec un nouveau rendz-vous", $ch2); 

$stmt2=$dbh->prepare($sql2);
	$stmt2->execute();
	$disponibilite = $stmt2->fetch(PDO::FETCH_ASSOC);
	$Hdeb= $disponibilite['Hdeb'];
	$Hfin= $disponibilite['Hfin'];
	$date=$disponibilite['date'];
	$sexe=$disponibilite['sexeMed'];
	$code=$disponibilite['CodeMed'];
	$testfin= soustraire_heures($Hfin,$heureFin);
	$testdeb= soustraire_heures($heuredebut,$Hdeb);
	
	if($testfin < 2 && $testdeb < 2)
	{
	$sql3=" delete from agendas where id=$id_agenda ";
	$stmt = $dbh->query($sql3);  
	}
	else if ($testfin > 2 && $testdeb > 2)
	{
		$heure2=soustraire_heures2($heuredebut,"01:00");
if ( heure_to_secondes($heure2)<36000)
{
$heure2="0".$heure2;

}
$heureT= $date."T".$heure2;
$nouvelleDuree= soustraire_heures($heure2,$Hdeb);
$heureT2= $date."T".$Hdeb;
 $sql3=" insert into agendas (id_practicien,date,heureDebut,heureFin,sexeMed,CodeMed,Hdeb,Hfin,duree)
 values ($id_practicien, '$date', '$heureT2', '$heureT', '$sexe', '$code', '$Hdeb', '$heure2',$nouvelleDuree)";
 $stmt = $dbh->query($sql3);  
	

	$heure2=add_heures($heureFin,"01:00");
if ( heure_to_secondes($heure2)<36000)
{
$heure2="0".$heure2;

}
$heureT= $date."T".$heure2;
$nouvelleDuree= soustraire_heures($Hfin,$heure2);

	
	$sql3=" update agendas set Hdeb='$heure2' , duree=$nouvelleDuree, heureDebut='$heureT'  where id=$id_agenda ";
	$stmt = $dbh->query($sql3); 
	
	
	
	}
	else if ($testfin > 2)
	{
	
$heure2=add_heures($heureFin,"01:00");
if ( heure_to_secondes($heure2)<36000)
{
$heure2="0".$heure2;

}
$heureT= $date."T".$heure2;
$nouvelleDuree= soustraire_heures($Hfin,$heure2);

	
	$sql3=" update agendas set Hdeb='$heure2' , duree=$nouvelleDuree, heureDebut='$heureT'  where id=$id_agenda ";
	$stmt = $dbh->query($sql3);  

	}
	else if ($testdeb > 2)
	{
	$heure2=soustraire_heures2($heuredebut,"01:00");
if ( heure_to_secondes($heure2)<36000)
{
$heure2="0".$heure2;

}
$heureT= $date."T".$heure2;
$nouvelleDuree= soustraire_heures($heure2,$Hdeb);

	
	$sql3=" update agendas set Hfin='$heure2' , duree=$nouvelleDuree, heureFin='$heureT'  where id=$id_agenda ";
	$stmt = $dbh->query($sql3); 

	}
echo "true";
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}


?>