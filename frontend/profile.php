<?php
require 'php/header.php';
require 'php/profile.php';
?>
<!-- Header End -->
<div class="container-xxl py-5 bg-dark page-header mb-5">
    <div class="container my-5 pt-5 pb-4">
        <h1 class="display-3 text-white mb-3 animated slideInDown"><?php if($own_profile) {echo "Your Profile";} else {echo "Applicant Profile";} ?></h1>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb text-uppercase">
                <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                <li class="breadcrumb-item text-white active" aria-current="page"><?php if($own_profile) {echo "Your Profile";} else {echo "Applicant Profile";} ?></li>
            </ol>
        </nav>
    </div>
</div>
<!-- Header End -->


<!-- Job Detail Start -->
<div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
    <div class="container">
        <div class="row gy-5 gx-4">
            <div class="col-lg-8">
                <div class="d-flex align-items-center mb-5">
                    <img class="flex-shrink-0 img-fluid border rounded" src="<?php echo $profile['dp']; ?>" alt="" style="width: 80px; height: 80px;">
                    <div class="text-start ps-4">
                        <h3 class="mb-3"><?php echo $profile['f_name'] . " " . $profile['l_name']; ?></h3>
                        <span class="text-truncate me-3"><b>User Type:</b> <?php echo $profile['user_type']; ?></span>
                    </div>
                </div>

                <div class="mb-5">
                    <ul class="list-unstyled">
                        <?php if ($edit) { ?>
                            <li><i class="fa fa-angle-right text-primary me-2"></i><b>First Name:</b> <input type="text" style="border: 0; background: transparent; border-bottom: black dotted 1px;" value="<?php echo $profile['f_name']; ?>" id="f_name"></input></li><br>
                            <li><i class="fa fa-angle-right text-primary me-2"></i><b>Last Name:</b> <input type="text" style="border: 0; background: transparent; border-bottom: black dotted 1px;" value="<?php echo $profile['l_name']; ?>" id="l_name"></input></li><br>
                            <li title="Email cannot be changed!"><i class="fa fa-angle-right text-primary me-2"></i><b>Email Address:</b> <?php echo $profile['email']; ?></li><br>
                            <li><i class="fa fa-angle-right text-primary me-2"></i><b>Birthday:</b> <input type="date" style="border: 0; background: transparent; border-bottom: black dotted 1px;" value="<?php echo $profile['bday']; ?>" id="bday"></input></li><br>
                            <li><i class="fa fa-angle-right text-primary me-2"></i><b>Education Qualifications:</b><br><textarea style="width:100%;" id="edu_q"><?php echo $profile['edu_q']; ?></textarea></li><br>
                            <li><i class="fa fa-angle-right text-primary me-2"></i><b>Professional Qualifications:</b><br><textarea style="width:100%;" id="prof_q"><?php echo $profile['prof_q']; ?></textarea></li><br>
                            <li><i class="fa fa-angle-right text-primary me-2"></i><b>Resume:</b> <input type="file" accept="application/pdf" id="resume"></li><br>
                            <li><i class="fa fa-angle-right text-primary me-2"></i><b>Last Edited On:</b> <?php echo $profile['last_edit_on']; ?></li><br>
                            <button class="btn btn-primary w-100 py-2" onclick="update();">Save Changes</button>
                        <?php } else { ?>
                            <li><i class="fa fa-angle-right text-primary me-2"></i><b>First Name:</b> <?php echo $profile['f_name']; ?></li><br>
                            <li><i class="fa fa-angle-right text-primary me-2"></i><b>Last Name:</b> <?php echo $profile['l_name']; ?></li><br>
                            <li><i class="fa fa-angle-right text-primary me-2"></i><b>Email Address:</b> <?php echo $profile['email']; ?></li><br>
                            <li><i class="fa fa-angle-right text-primary me-2"></i><b>Birthday:</b> <?php echo $profile['bday']; ?></li><br>
                            <li><i class="fa fa-angle-right text-primary me-2"></i><b>Education Qualifications:</b> <?php echo $profile['edu_q']; ?></li><br>
                            <li><i class="fa fa-angle-right text-primary me-2"></i><b>Professional Qualifications:</b> <?php echo $profile['prof_q']; ?></li><br>
                            <li><i class="fa fa-angle-right text-primary me-2"></i><b>Resume:</b> <?php if ($profile['cv'] == 1) {
                                                                                                        echo '<a href="https://api.corputip.me/cv/' . $id . '">Download</a>';
                                                                                                    } else {
                                                                                                        echo 'No resume uploaded';
                                                                                                    } ?></li><br>
                            <li><i class="fa fa-angle-right text-primary me-2"></i><b>Last Edited On:</b> <?php echo $profile['last_edit_on']; ?></li><br>
                            <button class="btn btn-primary w-30 py-2" onclick="window.location.search += '&edit=true';">Edit Profile</button>
                        <?php } ?>
                    </ul>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="bg-light rounded p-5 mb-4 wow slideInUp" data-wow-delay="0.1s">
                    <h4 class="mb-4">Recent Applications</h4>
                    <?php if ($type == "Permanent") {
                        foreach ($applications as $application) {
                            echo '<p><i class="fa fa-angle-right text-primary me-2"></i><a target="_blank" href="vacancy.php?id=' . $application['vacancy_id'] . '">' . $application['title'] . '</a></p>';
                        }
                    } else if ($own_profile) {
                        $count = 0;
                        foreach ($applications as $application) {
                            echo '<p><i class="fa fa-angle-right text-primary me-2"></i><a href="vacancy.php?id=' . $application_ids[$count] . '">' . $application . '</a></p>';
                            $count++;
                        }
                    } ?>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Job Detail End -->

<?php
require 'php/footer.php';
?>