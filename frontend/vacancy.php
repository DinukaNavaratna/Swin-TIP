<?php
require 'php/header.php';
require 'php/vacancy.php';
?>
<!-- Header End -->
<div class="container-xxl py-5 bg-dark page-header mb-5">
    <div class="container my-5 pt-5 pb-4">
        <h1 class="display-3 text-white mb-3 animated slideInDown">Job Details</h1>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb text-uppercase">
                <li class="breadcrumb-item"><a href="index.php">Home</a></li>
                <li class="breadcrumb-item"><a href="vacancies.php">Vacancies</a></li>
                <li class="breadcrumb-item text-white active" aria-current="page">Job Details</li>
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
                    <img class="flex-shrink-0 img-fluid border rounded" src="img/com-logo-2.jpg" alt="" style="width: 80px; height: 80px;">
                    <div class="text-start ps-4">
                        <?php if ($edit) { ?>
                            <h3 class="mb-3"><input type="text" <?php if ($new) {
                                                                    echo 'placeholder="Vacancy Title *"';
                                                                } ?> style="border: 0; background: transparent; border-bottom: black dotted 1px;" value="<?php echo $vacancy_title; ?>" id="vacancy_title"></input></h3>
                        <?php } else { ?>
                            <h3 class="mb-3"><?php echo $vacancy_title; ?></h3>
                            <span class="text-truncate me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i><?php echo $vacancy['location']; ?></span>
                            <span class="text-truncate me-3"><i class="far fa-clock text-primary me-2"></i><?php echo $vacancy['base']; ?></span>
                            <span class="text-truncate me-0"><i class="far fa-money-bill-alt text-primary me-2"></i><?php echo $vacancy['salary']; ?></span>
                        <?php } ?>
                    </div>
                </div>

                <div class="mb-5">
                    <h4 class="mb-3">Job description</h4>
                    <?php if ($edit) { ?>
                        <textarea style="width:100%;" id="vacancy_description" <?php if ($new) {
                                                                                    echo 'placeholder="Vacancy Description *"';
                                                                                } ?>><?php echo $vacancy_description; ?></textarea><br>
                    <?php } else { ?>
                        <p style="text-align: justify;"><?php echo $vacancy_description; ?></p>
                    <?php } ?>
                    <br>
                    <h4 class="mb-3">Qualifications</h4>
                    <?php if ($edit) { ?>
                        <textarea style="width:100%;" id="vacancy_qualifications" <?php if ($new) {
                                                                                        echo 'placeholder="Preferred Qualifications"';
                                                                                    } ?>><?php echo $vacancy_qualifications; ?></textarea>
                    <?php } else { ?>
                        <p style="text-align: justify;"><?php echo $vacancy_qualifications; ?></p>
                        <ul class="list-unstyled">
                            <li><i class="fa fa-angle-right text-primary me-2"></i>CorpU - SwinTIP</li>
                            <li><i class="fa fa-angle-right text-primary me-2"></i>CorpU - SwinTIP</li>
                            <li><i class="fa fa-angle-right text-primary me-2"></i>CorpU - SwinTIP</li>
                            <li><i class="fa fa-angle-right text-primary me-2"></i>CorpU - SwinTIP</li>
                            <li><i class="fa fa-angle-right text-primary me-2"></i>CorpU - SwinTIP</li>
                        </ul>
                    <?php } ?>
                </div>

                <div class="col-12">
                    <?php
                    if ($type == "Casual") {
                        if ($applied) { ?>
                            <button class="btn btn-primary w-100" disabled>You have already applied to this vacancy</button>
                        <?php } else { ?>
                            <button class="btn btn-primary w-100" onclick="apply();">Apply Now</button>
                        <?php }
                    } else if ($type == "Permanent") {
                        if ($new) { ?>
                            <button class="btn btn-primary w-100" onclick='update("edit");'>Publish Vacancy</button>
                        <?php } else if ($edit) { ?>
                            <button class="btn btn-primary w-100" onclick='update("edit");'>Save Changes</button>
                        <?php } else {
                        ?>
                            <button class="btn btn-primary w-100" onclick="window.location.search += '&edit=true';">Edit Vacancy</button><br><br>
                            <?php if ($vacancy['status'] == "1") { ?>
                                <p style="text-align:center">This vacancy is publicly visible to anyone. Click below to unpublish the vacancy.</p>
                                <button class="btn btn w-50" style="background-color: #ff2929; border-color: #ff2929; color: #fff; margin-left:25%;" onclick="update('unpublish');">Unpublish Vacancy</button>
                            <?php } else { ?>
                                <p style="text-align:center">This vacancy is not publicly visible to anyone. Click below to publish the vacancy.</p>
                                <button class="btn btn-secondary w-50" style="margin-left:25%;" onclick="update('publish');">Publish Vacancy</button>
                            <?php } ?>
                        <?php }
                    } else if ($type == "Admin") { ?>
                        <button class="btn btn-primary w-100" disabled>Admins cannot apply or edit vacancies</button>
                    <?php } else { ?>
                        <button class="btn btn-primary w-100" onclick="window.open('login.php', '_self');">Log in to apply</button>
                    <?php } ?>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="bg-light rounded p-5 mb-4 wow slideInUp" data-wow-delay="0.1s">
                    <h4 class="mb-4">Job Summary</h4>
                    <?php if ($edit) { ?>
                        <p><i class="fa fa-angle-right text-primary me-2"></i><b>Module:</b>
                            <select name="module" id="vacancy_module" style="border: 0; background: transparent; border-bottom: black dotted 1px;">
                                <?php foreach ($modules as $module) {
                                    if ($vacancy_module == $module["name"]) {
                                        $selected = " selected";
                                    } else {
                                        $selected = "";
                                    }
                                    echo '<option value="' . $module["id"] . '"' . $selected . '>' . $module["name"] . '</option>';
                                } ?>
                            </select>
                        </p>
                        <p><i class="fa fa-angle-right text-primary me-2"></i><b>Job Nature:</b>
                            <select name="base" id="vacancy_base" style="border: 0; background: transparent; border-bottom: black dotted 1px;">
                                <option value="0" <?php if ($vacancy_base == "Full Time") {
                                                        echo "selected";
                                                    } ?>>Full Time</option>
                                <option value="1" <?php if ($vacancy_base == "Part Time") {
                                                        echo "selected";
                                                    } ?>>Part Time</option>
                                <option value="2" <?php if ($vacancy_base == "Casual") {
                                                        echo "selected";
                                                    } ?>>Casual</option>
                            </select>
                        </p>
                        <p><i class="fa fa-angle-right text-primary me-2"></i><b>Salary:</b> <input type="text" <?php if ($new) {
                                                                                                                    echo 'placeholder="$20/hr"';
                                                                                                                } ?> style="border: 0; background: transparent; border-bottom: black dotted 1px;" value="<?php echo $vacancy_salary; ?>" id="vacancy_salary"></input></p>
                        <p><i class="fa fa-angle-right text-primary me-2"></i><b>Location:</b> <input type="text" <?php if ($new) {
                                                                                                                        echo 'placeholder="Clayton, VIC"';
                                                                                                                    } ?> style="border: 0; background: transparent; border-bottom: black dotted 1px;" value="<?php echo $vacancy_location; ?>" id="vacancy_location"></input></p>
                        <p><i class="fa fa-angle-right text-primary me-2"></i><b>Date Line:</b> <input type="date" style="border: 0; background: transparent; border-bottom: black dotted 1px;" value="<?php echo $vacancy_due; ?>" id="vacancy_due"></input></p>
                    <?php } else { ?>
                        <p><i class="fa fa-angle-right text-primary me-2"></i><b>Module:</b> <?php echo $vacancy['module']; ?></p>
                        <p><i class="fa fa-angle-right text-primary me-2"></i><b>Published On:</b> <?php echo $vacancy['publish_date']; ?></p>
                        <p><i class="fa fa-angle-right text-primary me-2"></i><b>Job Nature:</b> <?php echo $vacancy['base']; ?></p>
                        <p><i class="fa fa-angle-right text-primary me-2"></i><b>Salary:</b> <?php echo $vacancy['salary']; ?></p>
                        <p><i class="fa fa-angle-right text-primary me-2"></i><b>Location:</b> <?php echo $vacancy['location']; ?></p>
                        <p><i class="fa fa-angle-right text-primary me-2"></i><b>Date Line:</b> <?php echo $vacancy['due']; ?></p>
                        <p><i class="fa fa-angle-right text-primary me-2"></i><b>Applicants:</b> <?php echo $vacancy['num_applicants']; ?></p>
                        <p class="m-0"><i class="fa fa-angle-right text-primary me-2"></i><b>Last edited on:</b> <?php echo $vacancy['edit_date']; ?></p>
                    <?php } ?>
                </div>
                <div class="bg-light rounded p-5 wow slideInUp" data-wow-delay="0.1s">
                    <h4 class="mb-4">CorpU</h4>
                    <p class="m-0">Small paragraph about CorpU.</p>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Job Detail End -->


<?php
if ($type == "Permanent") {
    echo "<hr>";
    require 'php/applicants_per_vacancy.php';
}
require 'php/footer.php';
?>