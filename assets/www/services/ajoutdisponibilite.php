<?php
include 'config.php';

$datep =$_POST['datep'];
$dureep=$_POST['dureep'];
$idpracticien=$_POST['idmed'];
		$sqltmp = " select sexe,code 
		from practicien
		where id='$idpracticien' ";
		

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$stmt1 = $dbh->prepare($sql1);  
	$stmt1->execute();
	
	$med = $stmt1->fetch();
	$smed=$med['sexe'];
	$cmed=$med['code'];
	$sql=" insert into agendas (id_practicien,date,heure,sexeMed, CodeMed) values ('$idpracticien', '$datep', '$dureep', '$smed', '$cmed')";
	$stmt = $dbh->query($sql); 
	
echo "true"."#".$datep."#".$dureep."#".$idpracticien;
	$dbh = null;
	//echo '{"item":'. json_encode($motdepasse) .'}'; 
} catch(PDOException $e) {

	echo '{"error":{"text":'. $e->getMessage() .'}}'; //erreurs
}
?>