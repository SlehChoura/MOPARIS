<?php
include 'config.php';
$fields_string = '';
/*
{montant :paiement,orderid :window.localStorage.getItem("orderid"),
					   mail : window.localStorage.getItem("mail_client"),nom : window.localStorage.getItem("nomClient"),
					   cvv :window.localStorage.getItem("CVV"),ed :window.localStorage.getItem("ED"),
*/
$cout=$_POST['montant'];
$orderid=$_POST['orderid'];
$mail=$_POST['mail'];
$nom=$_POST['nom'];
$cvv=$_POST['cvv'];
$ed=$_POST['ed'];
$carte=$_POST['carte'];


$postfields = array('PSPID'=>'moparis', 'ORDERID'=>$orderid,'USERID'=>'APIMO',
'PSWD'=>'shtest14','AMOUNT'=>$cout, 'CURRENCY'=>'EUR','CARDNO'=>$carte, 'ED'=>$ed
, 'CVC'=>$cvv,'OPERATION'=>'SAL', 'CN'=>$nom,'EMAIL'=>$mail,'BRAND'=>'VISA');

foreach($postfields as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
rtrim($fields_string,'&');


$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://secure.ogone.com/ncol/test/orderdirect.asp');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_POST, count($postfields));
// Edit: prior variable $postFields should be $postfields;
curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
$result = curl_exec($ch);
print $result;

?>