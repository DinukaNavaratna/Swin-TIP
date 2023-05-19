<?php
require 'php/header.php';
require 'php/login_register.php';
?>

<!-- Header End -->
<div class="container-xxl py-5 bg-dark page-header mb-5">
    <div class="container my-5 pt-5 pb-4">
        <h1 class="display-3 text-white mb-3 animated slideInDown">Login</h1>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb text-uppercase">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item text-white active" aria-current="page">Login</li>
            </ol>
        </nav>
    </div>
</div>
<!-- Header End -->


<!-- Contact Start -->
<div class="container-xxl py-5">
    <div class="container">
        <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Sign in to your account with CorpU</h1>
        <div class="row g-4">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <div class="wow fadeInUp" data-wow-delay="0.5s">
                    <div>
                        <div class="row g-3">
                            <div class="col-md-12">
                                <div class="form-floating">
                                    <input type="email" class="form-control" id="email" placeholder="Email Address *">
                                    <label for="email">Email Address</label>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-floating">
                                    <input type="password" class="form-control" id="password" placeholder="Password *">
                                    <label for="password">Password</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-primary w-100 py-3" onclick="login();">Log in</button>
                            </div>
                        </div>
                    </div>
                    <br>
                    <p style="text-align:center;">New to CorpU?<br></p>
                    <button class="btn btn-secondary w-100 py-3" onclick="window.open('register.php', '_self');">Register</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Contact End -->

<?php
require 'php/footer.php';
?>