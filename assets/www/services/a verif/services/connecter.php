<?php
include 'config.php';



//echo 'data';

$m1 =$_POST['mail'];
$md5test= ($_POST['mdpa']);


$sql1 = "select id,mdp 
		from practicien
		where email='$m1'";
$sql = "select id,mdp ,fidele
		from clients
		where mail='$m1'";


		//echo $md5test;

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->prepare($sql1);  
	$stmt->execute();
	
	$motdepasse = $stmt->fetch(PDO::FETCH_ASSOC);

	//echo $md5test."#".$motdepasse['mdp'];
	
	
	
if (($motdepasse['mdp']) == $md5test && $motdepasse)
{
$idmed="true"."#"."med"."#".$motdepasse['id'];
echo $idmed;
//echo '{"item":'. json_encode(true) .'}'; 
}
else
{
$stmt = $dbh->prepare($sql);  
	$stmt->execute();
	$motdepasse = $stmt->fetch(PDO::FETCH_ASSOC);
	if ($motdepasse['mdp'] == $md5test && $motdepasse)
{

$date = date("Y-m-d");
$heure = date("H:i");
$id_client=$motdepasse['id'];
$sql2 = "select date ,evalue ,id, heure
		from commandes
		where id_client='$id_client' and evalue=0";
		$stmt = $dbh->prepare($sql2);  
	$stmt->execute();
	$commande = $stmt->fetch(PDO::FETCH_ASSOC);
	if (($commande)&&(( $commande['date']<$date )||( $commande['date']==$date && $commande['heure']<$heure)))
	{
	$idcl="true"."#"."client"."#".$motdepasse['id']."#".$motdepasse['fidele']."#"."Anoter"."#".$commande['id'];
	}else{
$idcl="true"."#"."client"."#".$motdepasse['id']."#".$motdepasse['fidele']."#"."AnePasNoter";
}
echo $idcl;
}else
echo "false";
$motdepasse=false;
}
	
	
	
	
	
	//$motdepasse = $stmt->fetchObject();
	$dbh = null;
	//echo '{"item":'. json_encode($motdepasse) .'}'; 
	
	
	
	
} catch(PDOException $e) {
	//echo "exception";
	//echo "true";
	echo '{"error":{"text":'. $e->getMessage() .'}}'; //erreurs
}


?>