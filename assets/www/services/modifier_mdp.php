<?php
include 'config.php';


$id_client=$_POST['id_client'];
$ancien =($_POST['ancien']);
$nouveau =($_POST['nouveau']);

//echo $ancien;
//echo $nouveau;





//$md5test= md5($_POST['mdpa']);
$sql = "select mdp 
		from clients
		where id=$id_client";
		//echo $md5test;

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->prepare($sql);  
	$stmt->execute();
	
	$motdepasse = $stmt->fetch(PDO::FETCH_ASSOC);
	//echo $motdepasse['mdp'];
if ($motdepasse['mdp'] == ($ancien))
{

$sql1 = "update clients set mdp='$nouveau' where id=$id_client";


try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql1);  
echo "true";	
} catch(PDOException $e) {
echo "exception";
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}



//echo '{"item":'. json_encode(true) .'}'; 
}




else
{ 
echo "false";
}
	//$motdepasse = $stmt->fetchObject();
	$dbh = null;
	//echo '{"item":'. json_encode($motdepasse) .'}'; 
} catch(PDOException $e) {
	echo "exception";
	echo '{"error":{"text":'. $e->getMessage() .'}}'; //erreurs
}
?>