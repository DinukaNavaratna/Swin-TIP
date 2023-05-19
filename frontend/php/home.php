<?php

require 'functions.php';

$data = [
    'count' => 1
];
$res = CallAPI("GET", "publicvacancies", $data, "");
$vacancies = $res['vacancies'];