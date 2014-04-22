

<?php
include 'config.php';


  //récupération de données d'adresses
  //$id_client= $_POST['id_client'];
  $hdebut= $_POST['h_debut'];
    $hfin= $_POST['h_fin'];
	 $sexe= $_POST['sexe'];
	 $code= $_POST['code'];
	 $jour= $_POST['jour'];
	 
	 
	/* echo  $hdebut;
	 echo  $hfin;
     echo  $sexe;
     echo  $code;	 
     echo $jour;*/
	 
  if (empty($code) )
  
//{  $sql=" select id_practicien from agendas  where Hdeb='$hdebut' and Hfin='$hfin' and date='$jour' "; }
{  

$sql=" select id_practicien, email, Ag.id  from agendas Ag, practicien Prac  
where Hdeb <='$hdebut' and Hfin >='$hfin' and date='$jour' and Ag.id_practicien= Prac.id "; 

}

  else  
{ 
 $sql=" select id_practicien, email, Ag.id from agendas Ag, practicien Prac
 where Hdeb <='$hdebut' and Hfin >='$hfin' and date='$jour' and CodeMed='$code' and Ag.id_practicien= Prac.id "; 
}

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->prepare($sql);  
	//$stmt->bindParam('id', $_GET["id"]);
	$stmt->execute();
	$prac = $stmt->fetchObject();  
	$dbh = null;
	echo '{"item":'. json_encode($prac) .'}'; 
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}


?>