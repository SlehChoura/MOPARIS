<?php
include 'config.php';
$fields_string = '';
$postfields = array('PSPID'=>'moparis', 'ORDERID'=>'ABREF128qwe','USERID'=>'APIMO',
'PSWD'=>'shtest14','AMOUNT'=>'100', 'CURRENCY'=>'EUR','CARDNO'=>'4111111111111111', 'ED'=>'12/15'
, 'CVC'=>'123','OPERATION'=>'SAL', 'CN'=>'CHOURA','EMAIL'=>'chourasleh@gmail.com','BRAND'=>'VISA');

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