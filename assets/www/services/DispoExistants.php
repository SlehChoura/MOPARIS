<?php 
	

include 'config.php';

$jour =$_POST['dateRes'];
$duree= $_POST['dureeDisp'];
$Hdeb= $_POST['heuredebutRes'];
$Hfin= $_POST['heurefinalRes'];


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
else{
$sexe="";$code="";$fidelite="non";
}
	
if (($sexe!="aleatoire")&&($code!="")){ 
$sql=" select *  from agendas 
 where sexeMed='$sexe' and CodeMed='$code' and date='$jour' and  Hdeb >= '$Hdeb' and Hfin <= '$Hfin' and duree >= '$duree'
 order by Hdeb
  ";
   $sqltaille=" select count(*) taille from agendas 
    where sexeMed='$sexe' and CodeMed='$code' and date='$jour' and  Hdeb >= '$Hdeb' and Hfin <= '$Hfin' and duree >= '$duree'

 
  ";}else if($sexe!="aleatoire"){
  
  $sql=" select *  from agendas 
  where sexeMed='$sexe' and date='$jour' and  Hdeb >= '$Hdeb' and Hfin <= '$Hfin' and duree >= '$duree'
  order by Hdeb
  ";
   $sqltaille=" select count(*) taille from agendas 
     where sexeMed='$sexe' and date='$jour' and  Hdeb >= '$Hdeb' and Hfin <= '$Hfin' and duree >= '$duree'
	 
  ";
}else if($code!=""){

  $sql=" select *  from agendas 
   where  CodeMed='$code' and date='$jour' and  Hdeb >= '$Hdeb' and Hfin <= '$Hfin' and duree >= '$duree'
   order by Hdeb
  ";
   $sqltaille=" select count(*) taille from agendas 
      where  CodeMed='$code' and date='$jour' and  Hdeb >= '$Hdeb' and Hfin <= '$Hfin' and duree >= '$duree'

  ";
}else{

  $sql=" select *  from agendas 
  where  date='$jour' and  Hdeb >= '$Hdeb' and Hfin <= '$Hfin' and duree >= '$duree'
  order by Hdeb
  ";
   $sqltaille=" select count(*) taille from agendas 
   where  date='$jour' 
  ";
}
try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql);  
	$employees = $stmt->fetchAll(PDO::FETCH_OBJ);
	$dbh = null;
	echo '{"items":'. json_encode($employees) .'}'; 
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}


?>