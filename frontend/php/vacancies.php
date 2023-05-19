<?php

require 'functions.php';

if(isset($_SESSION['type'])){
    $type = $_SESSION['type'];
} else {
    $type = "Casual";
}


$data = [];

if ($type == "Permanent") {
    $res = CallAPI("GET", "vacancies", $data, $_SESSION['token']);
    $vacancies = $res['vacancies']['public_vacancies'];
    $d_vacancies = $res['vacancies']['deleted_vacancies'];
} else {
    $res = CallAPI("GET", "publicvacancies", $data, "");
    $vacancies = $res['vacancies'];
}
