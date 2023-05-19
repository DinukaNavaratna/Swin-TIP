<?php
require 'php/header.php';
require 'php/applications.php';
?>

<!-- Header End -->
<div class="container-xxl py-5 bg-dark page-header mb-5">
    <div class="container my-5 pt-5 pb-4">
        <h1 class="display-3 text-white mb-3 animated slideInDown">Applications</h1>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb text-uppercase">
                <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                <li class="breadcrumb-item text-white active" aria-current="page">Applications</li>
            </ol>
        </nav>
    </div>
</div>
<!-- Header End -->


<!-- Jobs Start -->
<div class="container-xxl py-5">
    <div class="container">
        <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Applications</h1>
        <div class="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
            <div class="tab-content">
                <div id="tab-1" class="tab-pane fade show p-0 active">
                    <?php
                    foreach ($applications as $application) {
                    ?>
                        <div class="job-item p-4 mb-4">
                            <div class="row g-4">
                                <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                    <div class="text-start ps-4">
                                        <h5 class="mb-3">Applicant: <?php echo $application['f_name']." ".$application['l_name']; ?></h5>
                                        <span class="text-truncate me-3"><i class="fa fa-envelope text-primary me-2"></i><?php echo $application['email']; ?></span>
                                        <br><br>
                                        <h5 class="mb-3">Vacancy: <?php echo $application['title']; ?></h5>
                                        <span class="text-truncate me-3"><i class="fa fa-book text-primary me-2"></i><?php echo $application['module']; ?></span>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                    <div class="d-flex mb-3">
                                        <a class="btn btn-primary" href="profile.php?id=<?php echo $application['public_id']; ?>" target="_blank">View Profile&nbsp;&nbsp;<i class="fa fa-external-link-alt fa-xs"></i></a>
                                    </div>
                                    <small class="text-truncate"><i class="far fa-calendar-alt text-primary me-2"></i>Applied on: <?php echo $application['applied_date']; ?></small>
                                    <br>
                                    <div class="d-flex mb-3">
                                        <a class="btn btn-primary" href="vacancy.php?id=<?php echo $application['vacancy_id']; ?>" target="_blank">View Vacancy&nbsp;&nbsp;<i class="fa fa-external-link-alt fa-xs"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Jobs End -->

<?php
require 'php/footer.php';
?>