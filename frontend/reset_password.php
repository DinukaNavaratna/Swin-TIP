<?php
if(!isset($_GET['id'])) {
    header("Location:login.php");
}
require 'php/header.php';
require 'php/login_register.php';
?>

<!-- Header End -->
<div class="container-xxl py-5 bg-dark page-header mb-5">
    <div class="container my-5 pt-5 pb-4">
        <h1 class="display-3 text-white mb-3 animated slideInDown">Reset Password</h1>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb text-uppercase">
                <li class="breadcrumb-item"><a href="login.php">Login</a></li>
                <li class="breadcrumb-item text-white active" aria-current="page">Reset Password</li>
            </ol>
        </nav>
    </div>
</div>
<!-- Header End -->


<!-- Contact Start -->
<div class="container-xxl py-5">
    <div class="container">
        <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Reset Password</h1>
        <div class="row g-4">
        <div class="col-md-3"></div>
            <div class="col-md-6">
                <div class="wow fadeInUp" data-wow-delay="0.5s">
                    <div>
                        <div class="row g-3">
                            <div class="col-md-12">
                                <div class="form-floating">
                                    <input type="password" class="form-control" id="password1" placeholder="New Password *">
                                    <label for="password1">New Password</label>
                                </div>
                                <br>
                                <div class="form-floating">
                                    <input type="password" class="form-control" id="password2" placeholder="Confirm Password *">
                                    <label for="password2">Confirm Password</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-primary w-100 py-3" onclick="reset_password();">Reset Password</button>
                            </div>
                        </div>
</div>
                    <br>
                            <p style="text-align:center;">Remember Password?<br></p>
                            <button class="btn btn-secondary w-100 py-3" onclick="window.open('login.php', '_self');">Login</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Contact End -->

<?php
require 'php/footer.php';
?>