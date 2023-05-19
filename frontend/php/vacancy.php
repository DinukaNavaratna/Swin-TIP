<?php

require 'functions.php';

if (isset($_GET['new']) && $_GET['new'] == "true") {
    $new = true;
} else {
    $new = false;
}

if (isset($_SESSION['type'])){
    $type = $_SESSION['type'];
} else {
    $type = "guest";
}

if (!isset($_GET['id']) && !($new && $type == "Permanent")) {
    header("Location:vacancies.php");
}

if ($new) {
    $vacancy_title = "";
    $vacancy_description = "";
    $vacancy_qualifications = "";
    $vacancy_module = "";
    $vacancy_base = "";
    $vacancy_salary = "";
    $vacancy_location = "";
    $vacancy_due = "";
    $func = "new_vacancy";
    $vac_id = "";

    $edit = true;

    $res = CallAPI("GET", "modules", [], "");
    $modules = $res["modules"];
} else {
    $vac_id = $_GET['id'];
    $applied = false;
    if (in_array($vac_id, $_SESSION['application_ids'])) {
        $applied = true;
    }

    $res = CallAPI("GET", "vacancydetails/" . $vac_id, [], "");
    $vacancy = $res;

    $vacancy_title = $vacancy['title'];
    $vacancy_description = $vacancy['description'];
    $vacancy_qualifications = $vacancy['qualifications'];
    $vacancy_module = $vacancy['module'];
    $vacancy_base = $vacancy['base'];
    $vacancy_salary = $vacancy['salary'];
    $vacancy_location = $vacancy['location'];
    $vacancy_due = $vacancy['due'];
    $func = "update_vacancy";

    if ($type == "Permanent") {
        $data = ['vac_id' => $vac_id, 'user_id' => ""];
        $res = CallAPI("GET", "applicants", $data, $_SESSION['token']);
        $applicants = $res["applicants"];
    }

    $edit = false;
    if (isset($_GET['edit']) && $_GET['edit'] == "true" && $type == "Permanent") {
        $edit = true;
        $res = CallAPI("GET", "modules", [], "");
        $modules = $res["modules"];
    }
}


?>

<script>
    function apply() {
        $.ajax({
            url: "php/functions.php",
            type: "post",
            data: {
                "func": "apply",
                "vac": "<?php echo $vac_id; ?>",
                "vac_name": "<?php echo $vacancy_title; ?>",
                "token": "<?php echo $_SESSION['token']; ?>"
            },
            success: function(response) {
                if (response == "success") {
                    alert("Application submitted successfully!");
                    location.reload();
                } else {
                    console.log("Response: " + response);
                    alert(response);
                }
            },
            error: function(exception) {
                console.log("Response: " + exception);
                alert("Error occurred!\nPlease refresh the page and try again...");
            }
        });
    }

    function update(func) {
        var vacancy_title = "";
        var vacancy_description = "";
        var vacancy_qualifications = "";
        var vacancy_module = "";
        var vacancy_base = "";
        var vacancy_module1 = "";
        var vacancy_base1 = "";
        var vacancy_salary = "";
        var vacancy_location = "";
        var vacancy_due = "";
        var vacancy_status = "";

        if (func == "edit") {
            vacancy_title = $('#vacancy_title').val();
            vacancy_description = $('#vacancy_description').val();
            vacancy_qualifications = $('#vacancy_qualifications').val();
            vacancy_module = $('#vacancy_module').val();
            vacancy_base = $('#vacancy_base').val();
            vacancy_module1 = $('#vacancy_module option:selected').text();
            vacancy_base1 = $('#vacancy_base option:selected').text();
            vacancy_salary = $('#vacancy_salary').val();
            vacancy_location = $('#vacancy_location').val();
            vacancy_due = $('#vacancy_due').val();

            if ('<?php echo $vacancy_title; ?>' == vacancy_title) {
                vacancy_title = "";
            }
            if ('<?php echo $vacancy_description; ?>' == vacancy_description) {
                vacancy_description = "";
            }
            if ('<?php echo $vacancy_qualifications; ?>' == vacancy_qualifications) {
                vacancy_qualifications = "";
            }
            if ('<?php echo $vacancy_module; ?>' == vacancy_module1) {
                vacancy_module = "";
            }
            if ('<?php echo $vacancy_base; ?>' == vacancy_base1) {
                vacancy_base = "";
            }
            if ('<?php echo $vacancy_salary; ?>' == vacancy_salary) {
                vacancy_salary = "";
            }
            if ('<?php echo $vacancy_location; ?>' == vacancy_location) {
                vacancy_location = "";
            }
            if ('<?php echo $vacancy_due; ?>' == vacancy_due) {
                vacancy_due = "";
            }

            if ((vacancy_title == "") && (vacancy_description == "") && (vacancy_qualifications == "") && (vacancy_module == "") && (vacancy_base == "") && (vacancy_salary == "") && (vacancy_location == "") && (vacancy_due == "") && (vacancy_status == "")) {
                alert("No changes detected!");
                window.location = window.location.href.split("&edit")[0];
                return;
            }
            if ("<?php echo $func; ?>" == "new_vacancy") {
                if ((vacancy_title == "") || (vacancy_description == "") || (vacancy_module == "") || (vacancy_base == "") || (vacancy_location == "") || (vacancy_due == "")) {
                    alert("All the required fields should be filled properly!");
                    return;
                }
            }

        } else if (func == "unpublish") {
            vacancy_status = "2";
        } else if (func == "publish") {
            vacancy_status = "1";
        }

        $.ajax({
            url: "php/functions.php",
            type: "post",
            data: {
                "func": "<?php echo $func; ?>",
                "vacancy_title": vacancy_title,
                "vacancy_description": vacancy_description,
                "vacancy_qualifications": vacancy_qualifications,
                "vacancy_module": vacancy_module,
                "vacancy_base": vacancy_base,
                "vacancy_salary": vacancy_salary,
                "vacancy_location": vacancy_location,
                "vacancy_due": vacancy_due,
                "vacancy_status": vacancy_status,
                "public_id": "<?php echo $vac_id; ?>",
                "token": "<?php echo $_SESSION['token']; ?>"
            },
            success: function(response) {
                if (response == "success") {
                    if ("<?php echo $func; ?>" == "new_vacancy") {
                        alert("Vacancy created successfully!");
                        window.open('vacancies.php', '_self');
                    } else {
                        alert("Vacancy updated successfully!");
                        window.location = window.location.href.split("&edit")[0];
                    }
                }
            },
            error: function(jqXHR, exception) {
                alert("Error");
            }
        });
    }
</script>