<?php

require 'functions.php';

$data = ['user_id' => "", 'vac_id' => ""];
$res = CallAPI("GET", "applicants", $data, $_SESSION['token']);
$applications = $res["applicants"];
