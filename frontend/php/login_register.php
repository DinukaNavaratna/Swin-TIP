<?php
if (isset($_GET['logout']) && $_GET['logout'] == "true") {
    session_unset();
    session_destroy();
    header("Location:index.php");
}
?>

<script>
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    function login() {
        var email = $('#email').val().toLowerCase();;
        var password = $('#password').val();

        if (!validateEmail(email)) {
            alert("Please enter a valid email address");
            return;
        }

        $.ajax({
            url: "php/functions.php",
            type: "post",
            data: {
                "func": "login",
                "email": email,
                "password": password
            },
            success: function(response) {
                if (response == "success") {
                    window.open('profile.php', '_self');
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

    function register() {
        var fname = $('#fname').val();
        var lname = $('#lname').val();
        var email = $('#email').val().toLowerCase();;
        var password = $('#password').val();
        var password2 = $('#password2').val();

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password != password2) {
            alert("Password confirmation failed! Please enter the same password to confirm.");
            return;
        }

        $.ajax({
            url: "php/functions.php",
            type: "post",
            data: {
                "func": "register",
                "fname": fname,
                "lname": lname,
                "email": email,
                "password": password
            },
            success: function(response) {
                if (response == "success") {
                    alert("Account created successfully!\nAccount activation email has been sent to the given email address.")
                    window.open('login.php', '_self');
                } else {
                    console.log("Response: " + response);
                    alert("Error occurred!\nPlease refresh the page and try again...");
                }
            },
            error: function(exception) {
                console.log("Response: " + exception);
                alert("Error occurred!\nPlease refresh the page and try again...");
            }
        });
    }
</script>