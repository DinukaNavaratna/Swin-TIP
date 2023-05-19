<!-- Applicants Start -->
<div class="container-xxl py-5">
    <div class="container">
        <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Applicants</h1>
        <div class="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
            <div class="tab-content">
                <div id="tab-1" class="tab-pane fade show p-0 active">
                    <?php
                    foreach ($applicants as $applicant) {
                    ?>
                        <div class="job-item p-4 mb-4">
                            <div class="row g-4">
                                <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                    <div class="text-start ps-4">
                                        <h5 class="mb-3">Name: <?php echo $applicant['f_name']." ".$applicant['l_name']; ?></h5>
                                        <span class="text-truncate me-3"><i class="fa fa-envelope text-primary me-2"></i><?php echo $applicant['email']; ?></span>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                    <div class="d-flex mb-3">
                                        <a class="btn btn-primary" href="profile.php?id=<?php echo $applicant['public_id']; ?>" target="_blank">View Profile&nbsp;&nbsp;<i class="fa fa-external-link-alt fa-xs"></i></a>
                                    </div>
                                    <small class="text-truncate"><i class="far fa-calendar-alt text-primary me-2"></i>Applied on: <?php echo $applicant['applied_date']; ?></small>
                                </div>
                            </div>
                        </div>
                    <?php
                    }
                    ?>
                    <a class="btn btn-primary py-3 px-5" href="applications.php">Show all applicants</a>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Applicants End -->