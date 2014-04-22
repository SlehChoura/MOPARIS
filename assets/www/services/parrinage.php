<?php
include 'config.php';


$id_client=$_POST['id_client'];

$sql = "select parrinage, code
		from clients
		where id=$id_client";
		//echo $md5test;

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->prepare($sql);  
	$stmt->execute();
	
	$parrinage = $stmt->fetch(PDO::FETCH_ASSOC);
	if ($parrinage['parrinage'] ==0)
	{
	 
	 $code=$parrinage['code'];
     $sql1 = "update clients set credit=credit+10, parrinage=1 where id=$id_client";	
	 $sql2 = "update clients set credit=credit+10 where mail='$code'";
	
	
	try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql1); 
	echo "true";	
} catch(PDOException $e) {
echo "exception";
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}
	
	
	try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql2); 
	echo "true";	
} catch(PDOException $e) {
echo "exception";
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}
	
}	
	}
	
	
	
	catch(PDOException $e) {
	echo "exception";
	echo '{"error":{"text":'. $e->getMessage() .'}}'; //erreurs
}
	
	?>