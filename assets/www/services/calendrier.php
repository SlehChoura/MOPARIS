<?php
include 'config.php';

//sélection de la base de données:
//récupération de données d'adresses
$test=false;
  function add_heures($heure1,$heure2){
	$secondes1=heure_to_secondes($heure1);
	$secondes2=heure_to_secondes($heure2);
	$somme=$secondes1+$secondes2;
	if ($somme>86400)
	{$test=true;
	$somme= $somme - 86400;
	}
	//transfo en h:i:s
	$s=$somme % 60; //reste de la division en minutes => secondes
	$m1=($somme-$s) / 60; //minutes totales
	$m=$m1 % 60;//reste de la division en heures => minutes
	$h=($m1-$m) / 60; //heures
	if ($m<10){$m="0".$m;}
	$resultat=$h.":".$m;
	return $resultat;
}
function heure_to_secondes($heure){
	$array_heure=explode(":",$heure);
	$secondes=3600*$array_heure[0]+60*$array_heure[1];
	return $secondes;
}
 // $id_client= $_POST['id_client'];
 $today = date("Y-m-d");  
 $tomorrow=date("Y-m-d", strtotime("+1 days"));
 
 if ( $test ==true)
 {
 $today=$tomorrow;
 }
 
$heureActuelle = date("H:i") ; 
$heureActuelle=add_heures($heureActuelle,"02:00");
if ( heure_to_secondes($heureActuelle)<36000)
{
$heureActuelle="0".$heureActuelle;

}
$heureActuelle= $today."T".$heureActuelle;
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
$sql=" select *  from agendas 
 where sexeMed='$sexe' and CodeMed='$code' and  date > '$today' OR heureDebut >= '$heureActuelle'
  order by date, Hdeb
  ";
   $sqltaille=" select count(*) taille from agendas 
    where sexeMed='$sexe' and CodeMed='$code' and date > '$today' OR heureDebut >= '$heureActuelle'

  order by date, Hdeb
  ";
  }else if($sexe!="aleatoire"){
  
  $sql=" select *  from agendas 
  where sexeMed='$sexe' and date > '$today' OR heureDebut >= '$heureActuelle'
  order by date, Hdeb
  ";
   $sqltaille=" select count(*) taille from agendas 
     where sexeMed='$sexe' and date > '$today' OR heureDebut >= '$heureActuelle'
  order by date, Hdeb
  ";
}else if($code!=""){

  $sql=" select *  from agendas 
   where  CodeMed='$code' and date > '$today' OR heureDebut >= '$heureActuelle'
  order by date, Hdeb
  ";
   $sqltaille=" select count(*) taille from agendas 
      where  CodeMed='$code' and date > '$today' OR heureDebut >= '$heureActuelle'

  order by date, Hdeb
  ";
}else{
//echo $today."\n".$heureActuelle;
  $sql=" select *  from agendas  
  where date > '$today' OR heureDebut >= '$heureActuelle'
  order by date, Hdeb
  ";
   $sqltaille=" select count(*) taille from agendas 
where date > '$today'   OR heureDebut >= '$heureActuelle'
  order by date, Hdeb
  ";
}
try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->query($sql);  
	$stmt2=$dbh->prepare($sqltaille);
	$stmt2->execute();
	$taille = $stmt2->fetch(PDO::FETCH_ASSOC);
	$nombre= $taille['taille'];
//	$employees = $stmt->fetchAll(PDO::FETCH_OBJ);
	$mysqli = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
	$sql1 = $mysqli->query($sql);

	$stmt = $dbh->prepare($sql);  
	$stmt->execute();
	
	//$employees = $stmt->fetch();
	$premier=true;
	$compteur=0;
	$results = array();
    while($row = mysqli_fetch_assoc($sql1))
    {
	//date
	$compteur++;
	$test=false;
	if($premier==true){
	//echo $row['taille'];
	//echo $compteur;
	//echo "premier test true \n";
	$ensembleId=$row['id']+"";
	$tmphd=$row['heureDebut'];
	$tmphf= $row['heureFin'];
	$tmpdate=$row['date'];
	 /*
	echo $tmphd."\n";
	echo $tmphf."\n";
	echo $tmpdate."\n";
	echo $row['date']."\n";
	*/
	$premier=false;
	}
	
	if( ( $premier!=true) && (($row['heureDebut']>$tmphf && $tmpdate==$row['date'])||($tmpdate!=$row['date'])))
	{	
	/*
	echo " test true \n";
	echo $row['heureDebut'];
	echo "\n";
	echo $tmphf;
  */
	$test=true;	
	}
	else if(( $premier!=true) &&($row['heureFin']>$tmphf&& $tmpdate==$row['date'])){
	$tmphf=$row['heureFin'];
	$ensembleId=$ensembleId + "#"+$row['id'];
	 /*
	echo " test false changement les var sonts \n";
	echo $tmphd."\n";
	echo $tmphf."\n";
	echo $tmpdate."\n";
	echo $row['date']."\n";
	 */

	}
	// ||($compteur==$nombre)
	if(($premier!=true) &&($test==true) ){
       $results[] = array(
          'id' => $row['id'],
          'start' => $tmphd,
		   'ensembleId' => $ensembleId,
          'end' => $tmphf,
          'title' => $tmpdate
       );
	   
	   $premier=true;
	  // echo " ajout true \n";
	   $tmphd=$row['heureDebut'];
	$tmphf= $row['heureFin'];
	$tmpdate=$row['date'];
	

    }
	if (($compteur==$nombre) &&($test==true) )
	{
	 $results[] = array(
          'id' => $row['id'],
          'start' => $row['heureDebut'],
		  		   'ensembleId' => $ensembleId,
          'end' => $row['heureFin'],  
          'title' => $tmpdate
       );
	}else if (($compteur==$nombre) &&($test!=true) ){
	 $results[] = array(
          'id' => $row['id'],
          'start' => $tmphd,
		  'ensembleId' => $ensembleId,
          'end' => $tmphf,
          'title' => $tmpdate
       );
	   
	}
	}
	$mysqli->kill($mysqli->thread_id);
$mysqli->close();
    echo json_encode($results);
	
	$dbh = null;
	
	
	
	//echo '{"items":'. json_encode($employees) .'}'; 
} catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}'; 
}


?>