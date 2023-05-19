<?php
require 'php/header.php';
require 'php/vacancies.php';
?>

<!-- Header End -->
<div class="container-xxl py-5 bg-dark page-header mb-5">
    <div class="container my-5 pt-5 pb-4">
        <h1 class="display-3 text-white mb-3 animated slideInDown">Vacancies</h1>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb text-uppercase">
                <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                <li class="breadcrumb-item text-white active" aria-current="page">Vacancies</li>
            </ol>
        </nav>
    </div>
</div>
<!-- Header End -->


<!-- Jobs Start -->
<div class="container-xxl py-5">
    <div class="container">
        <h1 class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Vacancies</h1>
        <div class="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
            <?php if ($type == "Permanent") { ?>
                <ul class="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
                    <li class="nav-item">
                        <a class="d-flex align-items-center text-start mx-3 ms-0 pb-3 active" data-bs-toggle="pill" href="#tab-1">
                            <h6 class="mt-n1 mb-0">Public</h6>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="d-flex align-items-center text-start mx-3 pb-3" data-bs-toggle="pill" href="#tab-2">
                            <h6 class="mt-n1 mb-0">Unpublished</h6>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="d-flex align-items-center text-start mx-3 pb-3" href="vacancy.php?new=true">
                            <h6 class="mt-n1 mb-0">Add New</h6>
                        </a>
                    </li>
                </ul>
            <?php } ?>
            <div class="tab-content">
                <div id="tab-1" class="tab-pane fade show p-0 active">
                    <?php
                    foreach ($vacancies as $vacancy) {
                    ?>
                        <div class="job-item p-4 mb-4">
                            <div class="row g-4">
                                <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                    <div class="text-start ps-4">
                                        <h5 class="mb-3"><?php echo $vacancy['title']; ?></h5>
                                        <span class="text-truncate me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i><?php echo $vacancy['location']; ?></span>
                                        <span class="text-truncate me-3"><i class="far fa-clock text-primary me-2"></i><?php echo $vacancy['base']; ?></span>
                                        <span class="text-truncate me-0"><i class="far fa-money-bill-alt text-primary me-2"></i><?php echo $vacancy['salary']; ?></span>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                    <div class="d-flex mb-3">
                                        <a class="btn btn-light btn-square me-3" href="#"><i class="far fa-heart text-primary"></i></a>
                                        <a class="btn btn-primary" href="vacancy.php?id=<?php echo $vacancy['public_id']; ?>">View</a>
                                    </div>
                                    <small class="text-truncate"><i class="far fa-calendar-alt text-primary me-2"></i>Published on: <?php echo $vacancy['publish_date']; ?></small>
                                </div>
                            </div>
                        </div>
                    <?php
                    }
                    ?>
                </div>
                <?php if ($type == "Permanent") { ?>
                    <div id="tab-2" class="tab-pane fade show p-0">
                        <?php
                        foreach ($d_vacancies as $d_vacancy) {
                        ?>
                            <div class="job-item p-4 mb-4">
                                <div class="row g-4">
                                    <div class="col-sm-12 col-md-8 d-flex align-items-center">
                                        <div class="text-start ps-4">
                                            <h5 class="mb-3"><?php echo $d_vacancy['title']; ?></h5>
                                            <span class="text-truncate me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i><?php echo $d_vacancy['location']; ?></span>
                                            <span class="text-truncate me-3"><i class="far fa-clock text-primary me-2"></i><?php echo $d_vacancy['base']; ?></span>
                                            <span class="text-truncate me-0"><i class="far fa-money-bill-alt text-primary me-2"></i><?php echo $d_vacancy['salary']; ?></span>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                        <div class="d-flex mb-3">
                                            <a class="btn btn-light btn-square me-3" href="#"><i class="far fa-heart text-primary"></i></a>
                                            <a class="btn btn-primary" href="vacancy.php?id=<?php echo $d_vacancy['public_id']; ?>">View</a>
                                        </div>
                                        <small class="text-truncate"><i class="far fa-calendar-alt text-primary me-2"></i>Published on: <?php echo $d_vacancy['publish_date']; ?></small>
                                    </div>
                                </div>
                            </div>
                        <?php
                        }
                        ?>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
</div>
<!-- Jobs End -->

<?php
require 'php/footer.php';
?>