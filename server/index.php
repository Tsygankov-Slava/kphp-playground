<?php

require_once '../vendor/autoload.php';

$json = file_get_contents('php://input');
$obj = json_decode($json);

$code = $obj->code;
echo $code;