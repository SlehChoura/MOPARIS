<?php
include 'config.php';

	
$sql = "select id,mdp 
		from practicien
		where email='med'";
	try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	 $stmt = $dbh->prepare($sql);  
	//$stmt->bindParam('id', $_GET["id"]);
	$stmt->execute();
	$employee = $stmt->fetch(PDO::FETCH_ASSOC);

	echo $employee['id'];
	$dbh = null;

} catch (PDOException $e) {
    print "Erreur !: " . $e->getMessage() . "<br/>";
    die();}
?>