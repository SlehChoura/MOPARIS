<?php
include 'config.php';
/*
$postfields = array('PSPID'=>'moparis', 'ORDERID'=>'ABREF123qwe','USERID'=>'APIMO',
'PSWD'=>'shtest14','AMOUNT'=>'100', 'CURRECNY'=>'EUR','CARDNO'=>'4111111111111111', 'ED'=>'12/15'
, 'CVC'=>'123','OPERATION'=>'', 'CN'=>'CHOURA','EMAIL'=>'chourasleh@gmail.com');
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://secure.ogone.com/ncol/test/orderdirect.asp');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_POST, 1);
// Edit: prior variable $postFields should be $postfields;
curl_setopt($ch, CURLOPT_POSTFIELDS, $postfields);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
$result = curl_exec($ch);
print $result;
*/
$data = http_build_query(
 array('PSPID'=>'moparis', 'ORDERID'=>'ABREF123qwe','USERID'=>'APIMO',
'PSWD'=>'shtest14','AMOUNT'=>'100', 'CURRENCY'=>'EUR','CARDNO'=>'4111111111111111', 'ED'=>'12/15'
, 'CVC'=>'123','OPERATION'=>'SAL', 'CN'=>'CHOURA','EMAIL'=>'chourasleh@gmail.com')
);
$opts = array(
    'http' => array(
        'Content-Type: text/html; charset=utf-8',
        'method' => "POST",
        'header' => "Accept-language: en\r\n" .
        "Cookie: foo=bar\r\n" .
        'Content-length: '. strlen($data) . "\r\n",
        'content' => $data
     )
);

$context = stream_context_create($opts);

$fp = fopen('https://secure.ogone.com/ncol/test/orderstandard.asp', 'r', false, $context);
fpassthru($fp);
fclose($fp);

?>