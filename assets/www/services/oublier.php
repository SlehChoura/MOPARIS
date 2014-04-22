<?php
include 'config.php';

$m1 =$_POST['mail'];
$sql = "select mdp 
		from clients
		where mail='$m1'";
		//echo $md5test;

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->prepare($sql);  
	$stmt->execute();
	
	$motdepasse = $stmt->fetch(PDO::FETCH_ASSOC);
if ($motdepasse)
{

$ch="votre mot de passe est: ".$motdepasse['mdp'];
//mail($m1, "Recuperation de mot de passe ", $ch); 
echo $motdepasse['mdp'];
//echo '{"item":'. json_encode(true) .'}'; 
}
else
{ echo "false";
$motdepasse=false;
}
	//$motdepasse = $stmt->fetchObject();
	$dbh = null;
	//echo '{"item":'. json_encode($motdepasse) .'}'; 
} catch(PDOException $e) {
	//echo "exception";
	echo '{"error":{"text":'. $e->getMessage() .'}}'; //erreurs
}
?>