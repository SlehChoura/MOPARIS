<?php
include 'config.php';

$m1 =$_POST['mail'];
$mdp=$_POST['mdp'];
	

$ch="votre mot de passe est: ".$mdp;
mail( $m1, "Recuperation de mot de passe ", $ch); 


?>