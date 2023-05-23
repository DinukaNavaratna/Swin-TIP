<?php

if (!isset($_SESSION['id'])) {
    header("Location:login.php");
}

require 'functions.php';


$type = $_SESSION['type'];
if ($type == "casual") {
    $id = $_SESSION["id"];
} else {
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
    } else {
        $id = $_SESSION["id"];
    }
}

$data = [];
$profile = CallAPI("GET", "userprofile/" . $id, $data, $_SESSION['token']);
$applications = $_SESSION['application_titles'];
$application_ids = $_SESSION['application_ids'];


if ($type == "Permanent") {
    if($own_profile) {
        $applications = $profile["jobs"];
    } else {
    $data = ['user_id' => $id, 'vac_id' => ""];
    $res = CallAPI("GET", "applicants", $data, $_SESSION['token']);
    $applications = $res["applicants"];
    }
}

$edit = false;
if (isset($_GET['edit']) && $_GET['edit'] == "true") {
    $edit = true;
}

$availabilities = explode(",", $profile['availability']);

if($profile['f_name'] == "" || $profile['l_name'] == "" || $profile['email'] == "" || $profile['bday'] == "" || $profile['availability'] == "" || $profile['edu_q'] == "" || $profile['prof_q'] == "" || $profile['cv'] == 0) {
    $_SESSION['profileCompleted'] = false;
} else {
    $_SESSION['profileCompleted'] = true;
}

?>

<script>
    function update() {
        var f_name = $('#f_name').val();
        var l_name = $('#l_name').val();
        var bday = $('#bday').val();
        var edu_q = $('#edu_q').val();
        var prof_q = $('#prof_q').val();
        var availability_list = document.getElementsByClassName('availability');
        var availability_arr = [];
        for (var i = 0; availability_list[i]; ++i) {
            if (availability_list[i].checked) {
                availability_arr.push(availability_list[i].value);
            }
        }
        var availability = availability_arr.toString();

        if ('<?php echo $profile['f_name']; ?>' == f_name) {
            f_name = "";
        }
        if ('<?php echo $profile['l_name']; ?>' == l_name) {
            l_name = "";
        }
        if ('<?php echo $profile['bday']; ?>' == bday) {
            bday = "";
        }
        if ('<?php echo $profile['edu_q']; ?>' == edu_q) {
            edu_q = "";
        }
        if ('<?php echo $profile['prof_q']; ?>' == prof_q) {
            prof_q = "";
        }
        if ('<?php echo $profile['availability']; ?>' == availability) {
            availability = "";
        }

        var hasResume = document.getElementById("resume").files.length != 0;
        var resume = "";

        if(f_name == "" && l_name == "" && bday == "" && edu_q == "" && prof_q == "" && !hasResume){
            alert("No changed detected!");
            window.location = window.location.href.split("?")[0];
        }

        if (hasResume) {
            var files = document.getElementById('resume').files;
            if (files.length > 0) {
                var reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onload = function() {
                    resume = reader.result;
                    $.ajax({
                        url: "php/functions.php",
                        type: "post",
                        data: {
                            "func": "update_profile",
                            "f_name": f_name,
                            "l_name": l_name,
                            "bday": bday,
                            "edu_q": edu_q,
                            "prof_q": prof_q,
                            "availability": availability,
                            "token": "<?php echo $_SESSION['token']; ?>",
                            "id": "<?php echo $_SESSION['id']; ?>",
                            "resume": resume
                        },
                        success: function(response) {
                            if (response == "success") {
                                alert("Profile updated successfully!");
                                window.location = window.location.href.split("?")[0];
                            }
                        },
                        error: function(jqXHR, exception) {
                            console.log(jqXHR.responseText)
                            alert("Error");
                        }
                    });
                };
                reader.onerror = function(error) {
                    console.log('Error: ', error);
                };
            }
        } else {
            $.ajax({
                url: "php/functions.php",
                type: "post",
                data: {
                    "func": "update_profile",
                    "f_name": f_name,
                    "l_name": l_name,
                    "bday": bday,
                    "edu_q": edu_q,
                    "prof_q": prof_q,
                    "availability": availability,
                    "token": "<?php echo $_SESSION['token']; ?>",
                    "id": "<?php echo $_SESSION['id']; ?>",
                    "resume": resume
                },
                success: function(response) {
                    if (response == "success") {
                        alert("Profile updated successfully!");
                        window.location = window.location.href.split("?")[0];
                    }
                },
                error: function(jqXHR, exception) {
                    console.log(exception)
                    alert("Error");
                }
            });
        }

    }
</script>
