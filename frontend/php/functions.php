<?php

if (isset($_POST['func'])) {
    if ($_POST['func'] == "update_profile") {
        update_profile();
    } else if ($_POST['func'] == "login") {
        login();
    } else if ($_POST['func'] == "apply") {
        apply();
    } else if ($_POST['func'] == "register") {
        register();
    } else if ($_POST['func'] == "update_vacancy") {
        vacancy("update");
    } else if ($_POST['func'] == "new_vacancy") {
        vacancy("new");
    }
}


function CallAPI($method, $endpoint, $data, $access_token)
{
    $url = 'https://api.corputip.me/' . $endpoint;

    if ($endpoint == "userprofile" && $method == "PUT") {
        $content_type = "multipart/form-data";
    } else {
        $content_type = "application/json";
    }

    $curl = curl_init($url);

    switch ($method) {
        case "POST":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
            break;
        case "PUT":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PUT');
            break;
        case "GET":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
            break;
        case "DELETE":
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'DELETE');
            break;
    }

    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS,  json_encode($data));
    curl_setopt($curl, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $access_token
    ]);

    $response = curl_exec($curl);
    curl_close($curl);
    return json_decode($response, TRUE);
}

function update_profile()
{
    $f_name = $_POST['f_name'];
    $l_name = $_POST['l_name'];
    $bday = $_POST['bday'];
    $edu_q = $_POST['edu_q'];
    $prof_q = $_POST['prof_q'];
    $token = $_POST['token'];
    $id = $_POST['id'];
    $resume = $_POST['resume'];
    $availability = $_POST['availability'];

    $data = [];

    if ($f_name != "") {
        $data['f_name'] = $f_name;
    }
    if ($l_name != "") {
        $data['l_name'] = $l_name;
    }
    if ($bday != "") {
        $data['bday'] = $bday;
    }
    if ($edu_q != "") {
        $data['edu_q'] = $edu_q;
    }
    if ($prof_q != "") {
        $data['prof_q'] = $prof_q;
    }
    if ($resume != "") {
        $data['resume'] = $resume;
    }
    if ($availability != "") {
        $data['availability'] = $availability;
    }

    $response = CallAPI("PUT", "userprofile/" . $id, $data, $token);
    if ($response['response'] == "success") {
        if ($f_name != "") {
            session_start();
            $_SESSION['fname'] = $f_name;
        }
        echo "success";
    } else {
        print_r($response);
    }
}

function login()
{
    $email = $_POST['email'];
    $pass = $_POST['password'];

    $data = [
        'email' => $email,
        'password' => $pass
    ];
    $response = CallAPI("POST", "login", $data, "");
    if ($response['response'] == "success") {
        session_start();
        $_SESSION['fname'] = $response['f_name'];
        $_SESSION['id'] = $response['id'];
        $_SESSION['type'] = $response['user_type'];
        $_SESSION['token'] = $response['access_token'];
        $_SESSION['rtoken'] = $response['refresh_token'];
        $_SESSION['application_ids'] = $response['application_ids'];
        $_SESSION['application_titles'] = $response['application_titles'];
        echo "success";
    } else {
        print_r($response{
        "message"});
    }
}

function register()
{
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $pass = $_POST['password'];

    $data = [
        'fname' => $fname,
        'lname' => $lname,
        'email' => $email,
        'password' => $pass
    ];
    $response = CallAPI("POST", "register", $data, "");
    if ($response['response'] == "success") {
        echo "success";
    } else {
        print_r($response);
    }
}

function apply()
{
    $vac = $_POST['vac'];
    $vac_name = $_POST['vac_name'];
    $access_token = $_POST['token'];

    $data = [
        'vacancy_id' => $vac
    ];
    $response = CallAPI("POST", "applyvacancy", $data, $access_token);
    if (isset($response['response']) && $response['response'] == "success") {
        session_start();
        array_push($_SESSION['application_ids'], $vac);
        array_push($_SESSION['application_titles'], $vac_name);
        echo "success";
    } else {
        echo $response["description"];
    }
}

function vacancy($func)
{
    if ($func == "update") {
        $method = "PUT";
    } else if ($func == "new") {
        $method = "POST";
    }
    $vacancy_title = $_POST['vacancy_title'];
    $vacancy_description = $_POST['vacancy_description'];
    $vacancy_qualifications = $_POST['vacancy_qualifications'];
    $vacancy_module = $_POST['vacancy_module'];
    $vacancy_base = $_POST['vacancy_base'];
    $vacancy_salary = $_POST['vacancy_salary'];
    $vacancy_location = $_POST['vacancy_location'];
    $vacancy_due = $_POST['vacancy_due'];
    $token = $_POST['token'];
    $public_id = $_POST['public_id'];
    $vacancy_status = $_POST['vacancy_status'];

    $data = [];

    if ($vacancy_title != "") {
        $data['title'] = $vacancy_title;
    }
    if ($vacancy_description != "") {
        $data['description'] = $vacancy_description;
    }
    if ($vacancy_qualifications != "") {
        $data['qualifications'] = $vacancy_qualifications;
    }
    if ($vacancy_module != "") {
        $data['module'] = $vacancy_module;
    }
    if ($vacancy_base != "") {
        $data['base'] = $vacancy_base;
    }
    if ($vacancy_salary != "") {
        $data['salary'] = $vacancy_salary;
    }
    if ($vacancy_location != "") {
        $data['location'] = $vacancy_location;
    }
    if ($vacancy_due != "") {
        $data['due'] = $vacancy_due;
    }
    if ($public_id != "") {
        $data['public_id'] = $public_id;
    }
    if ($vacancy_status != "") {
        $data['status'] = $vacancy_status;
    }

    $response = CallAPI($method, "vacancies", $data, $token);
    if ($response['response'] == "success") {
        echo "success";
    } else {
        print_r($response);
    }
}
