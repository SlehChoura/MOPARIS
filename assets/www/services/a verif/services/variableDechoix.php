<?php
	session_start();
	if (isset($_POST['sexe'])){
$sexe =$_POST['sexe'];
$_SESSION['sexe']=$_POST['sexe'];
}
if (isset($_POST['code'])){
$_SESSION['code']=$_POST['code'];
}
if (isset($_POST['fidelite'])){
$_SESSION['fidelite']=$_POST['fidelite'];
	}
?>