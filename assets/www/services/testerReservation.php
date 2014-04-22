<?php

include 'config.php';

$jour =$_POST['dateRes'];
$Hfin= $_POST['heurefinalRes'];
$Hdeb= $_POST['heuredebutRes'];
$sql=" select *  from agendas 
 where and date='$jour' and Hdeb >= '$Hdeb' and  Hfin <='$Hfin'
  order by date, heureDebut
  ";


//sélection de la base de données:
  //récupération de données d'adresses
  
 // $id_client= $_POST['id_client'];
session_start();
if (isset($_SESSION['sexe'])&&isset($_SESSION['code'])){
$sexe =$_SESSION['sexe'];
$code=$_SESSION['code'];
$fidelite=$_SESSION['fidelite'];
}else if (isset($_SESSION['code'])){
$code=$_SESSION['code'];$sexe="";$fidelite="non";
}
else{$sexe="";$code="";$fidelite="non";

}
	
if (($sexe!="aleatoire")&&($code!="")){ 
$sql=" select distinct    *  from agendas 
 where sexeMed='$sexe' and CodeMed='$code' and date='$jour' and Hdeb >= '$Hdeb' and  Hfin <='$Hfin'
  ";
   $sqltaille=" select count(*) taille from agendas 
    where sexeMed='$sexe' and CodeMed='$code' and date='$jour' and Hdeb >= '$Hdeb' and  Hfin <='$Hfin'

  ";}else if($sexe!="aleatoire"){
  
  $sql=" select distinct   *  from agendas 
  where sexeMed='$sexe' and date='$jour' and Hdeb >= '$Hdeb' and  Hfin <='$Hfin'
  ";
   $sqltaille=" select count(*) taille from agendas 
     where sexeMed='$sexe' and date='$jour' and Hdeb >= '$Hdeb' and  Hfin <='$Hfin'
  ";
}else if($code!=""){

  $sql=" select distinct   *  from agendas 
   where  CodeMed='$code' and date='$jour' and Hdeb >= '$Hdeb' and  Hfin <='$Hfin'
  order by date, heureDebut
  ";
   $sqltaille=" select count(*) taille from agendas 
      where  CodeMed='$code' and date='$jour' and Hdeb >= '$Hdeb' and  Hfin <='$Hfin'

  ";
}else{

  $sql=" select distinct   *  from agendas 
  where  date='$jour' and Hdeb >= '$Hdeb' and  Hfin <='$Hfin'
  order by date, heureDebut
  ";
   $sqltaille=" select count(*) taille from agendas 
   where  date='$jour' and Hdeb >= '$Hdeb' and  Hfin <='$Hfin'
  ";
}
try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->prepare($sql);  
	$stmt->execute();
	$reservation = $stmt->fetch(PDO::FETCH_ASSOC);
	if($reservation)
	{
	echo $reservation['id'];
	}else{
	echo "vide";
	}

	
	$dbh = null;
	
	
	
	//echo '{"items":'. json_encode($employees) .'}'; 
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}

  
	
?>