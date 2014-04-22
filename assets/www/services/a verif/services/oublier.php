<?php
include 'config.php';

$m1 =$_POST['mail'];
$sql = "select mdp 
		from clients
		where mail='$m1'";
		//echo $md5test;

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->prepare($sql);  
	$stmt->execute();
	
	$motdepasse = $stmt->fetch(PDO::FETCH_ASSOC);
if ($motdepasse)
{
/*
$mail = new PHPMailer(true);

//Send mail using gmail
if($send_using_gmail){
    $mail->IsSMTP(); // telling the class to use SMTP
    $mail->SMTPAuth = true; // enable SMTP authentication
    $mail->SMTPSecure = "ssl"; // sets the prefix to the servier
    $mail->Host = "smtp.gmail.com"; // sets GMAIL as the SMTP server
    $mail->Port = 465; // set the SMTP port for the GMAIL server
    $mail->Username = "chourasleh@gmail.com"; // GMAIL username
    $mail->Password = "19901015"; // GMAIL password
}

//Typical mail data
$mail->AddAddress("chourasleh@gmail.com", "sleh");
$mail->SetFrom("chourasleh@gmail.com", "from");
$mail->Subject = "My Subject";
$mail->Body = "Mail contents";

try{
    $mail->Send();
    echo "Success!";
} catch(Exception $e){
    //Something went bad
    echo "Fail :(";
}*/
$ch="votre mot de passe est: ".$motdepasse['mdp'];
mail("chourasleh@gmail.com", "Recuperation de mot de passe ", $ch); 
echo $motdepasse['mdp'];
echo "true";
//echo '{"item":'. json_encode(true) .'}'; 
}
else
{ echo "false";
$motdepasse=false;
}
	//$motdepasse = $stmt->fetchObject();
	$dbh = null;
	//echo '{"item":'. json_encode($motdepasse) .'}'; 
} catch(PDOException $e) {
	//echo "exception";
	echo '{"error":{"text":'. $e->getMessage() .'}}'; //erreurs
}
?>