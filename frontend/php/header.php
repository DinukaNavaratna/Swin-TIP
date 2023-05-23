<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>CorpU</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="" name="keywords">
    <meta content="" name="description">

    <!-- Favicon -->
    <link href="img/favicon.jpg" rel="icon">

    <!-- Google Web Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600&family=Inter:wght@700;800&display=swap" rel="stylesheet">

    <!-- Icon Font Stylesheet -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Libraries Stylesheet -->
    <link href="lib/animate/animate.min.css" rel="stylesheet">
    <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">

    <link href="css/bootstrap.min.css" rel="stylesheet">

    <link href="css/style.css" rel="stylesheet">
</head>

<body>
    <div class="container-xxl bg-white p-0">
        <!-- Spinner Start -->
        <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <!-- Spinner End -->


        <!-- Navbar Start -->
        <nav class="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
            <a href="index.php" class="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                <h1 class="m-0 text-primary">CorpU</h1>
            </a>
            <button type="button" class="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <?php
            $uri = $_SERVER['REQUEST_URI'];
            $home_active = "";
            $about_active = "";
            $job_active = "";
            $contact_active = "";
            $applications_active = "";
            if (strpos($uri, 'index') !== false) {
                $home_active = " active";
            } else if (strpos($uri, 'about') !== false) {
                $about_active = " active";
            } else if ((strpos($uri, 'vacancies') !== false) || (strpos($uri, 'vacancy') !== false)) {
                $job_active = " active";
            } else if (strpos($uri, 'contact') !== false) {
                $contact_active = " active";
            } else if (strpos($uri, 'applications') !== false) {
                $applications_active = " active";
            } else if (!((strpos($uri, 'register') !== false) || (strpos($uri, 'login') !== false) || (strpos($uri, 'profile') !== false))) {
                $home_active = " active";
            }
            ?>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <div class="navbar-nav ms-auto p-4 p-lg-0">
                    <a href="index.php" class="nav-item nav-link<?php echo $home_active; ?>">Home</a>
                    <a href="vacancies.php" class="nav-item nav-link<?php echo $job_active; ?>">Job List</a>
                    <?php if (isset($_SESSION['type']) && $_SESSION['type'] == "Permanent") {
                    ?>
                        <a href="applications.php" class="nav-item nav-link<?php echo $applications_active; ?>">Applications</a>
                    <?php } ?>
                    <a href="about.php" class="nav-item nav-link<?php echo $about_active; ?>">About</a>
                    <a href="contact.php" class="nav-item nav-link<?php echo $contact_active; ?>">Contact</a>
                </div>
                <?php
                if (isset($_SESSION['id'])) {
                    $own_profile = false;
                    if ((!isset($_GET['id'])) || (isset($_GET['id']) && $_GET['id'] == $_SESSION["id"])) {
                        $own_profile = true;
                    }
                    if ((strpos($uri, 'profile') !== false) && $own_profile) {
                        echo '<a href="login.php?logout=true" class="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">Logout<i class="fa fa-arrow-right ms-3"></i></a>';
                    } else {
                        echo '<a href="profile.php" class="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">Hello, ' . $_SESSION['fname'] . '<i class="fa fa-arrow-right ms-3"></i></a>';
                    }
                } else if (strpos($uri, 'login') !== false) {
                    echo '<a href="register.php" class="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">Register<i class="fa fa-arrow-right ms-3"></i></a>';
                } else if (strpos($uri, 'register') !== false) {
                    echo '<a href="login.php" class="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">Login<i class="fa fa-arrow-right ms-3"></i></a>';
                } else {
                    echo '<a href="login.php" class="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block">Register/ Login<i class="fa fa-arrow-right ms-3"></i></a>';
                }
                ?>
            </div>
        </nav>
        <!-- Navbar End -->