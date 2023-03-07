$(function(){
    $("#form-register").validate({
        rules: {
            password : {
                required : true,
            },
            confirm_password: {
                required : true,
                equalTo: "#password"
            },
            job : {
                required : true,
            }
        },
        messages: {
            first_name_1: {
                required: "Enter First Name"
            },
            last_name_1: {
                required: "Enter Last Name"
            },
            email_1: {
                required: "Enter Email"
            },
            mobile_number_1: {
                required: "Enter Mobile Number"
            },
            password: {
                required: "Enter Password"
            },
            confirm_password: {
                required: "Enter Password",
                equalTo: "Please enter the same password"
            },
            job: {
                required: "Select Job"
            },
            job_title_1: {
                required: "Select Job Title"
            },
            company_1: {
                required: "Select Compny"
            },
            name_of_facility: {
                required: "Select Name of Facility"
            },
            speciality: {
                required: "Select Speciality"
            },
            location: {
                required: "Select Location"
            },
            start_month: {
                required: "Select Start Month"
            },
            start_year: {
                required: "Select Start Year"
            },
            end_month: {
                required: "Select End Month"
            },
            end_year: {
                required: "Select End Year"
            },
            job_title_1: {
                required: "Select Job"
            },
            first_name_2: {
                required: "Enter First Name"
            },
            last_name_2: {
                required: "Enter Last Name"
            },
            email_2: {
                required: "Enter Email"
            },
            mobile_number_2: {
                required: "Enter Mobile Number"
            },
            job_title_2: {
                required: "Select Job"
            },
            company_2: {
                required: "Select Company"
            },
        }
    });
    $("#form-total").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "fade",
        // enableAllSteps: true,
        autoFocus: true,
        transitionEffectSpeed: 500,
        titleTemplate : '<div class="title">#title#</div>',
        labels: {
            previous : '',
            next : '<button type="button" class="btn btn-primary continue-btn">Continue</button>',
            finish : '<button type="button" class="btn btn-primary continue-btn finish-btn">Continue</button',
            current : ''
        },
        onStepChanging: function (event, currentIndex, newIndex) { 
            // var username = $('#username').val();
            // var email = $('#email').val();
            // var cardtype = $('#card-type').val();
            // var cardnumber = $('#card-number').val();
            // var cvc = $('#cvc').val();
            // var month = $('#month').val();
            // var year = $('#year').val();

            // $('#username-val').text(username);
            // $('#email-val').text(email);
            // $('#card-type-val').text(cardtype);
            // $('#card-number-val').text(cardnumber);
            // $('#cvc-val').text(cvc);
            // $('#month-val').text(month);
            // $('#year-val').text(year);

            $("#form-register").validate().settings.ignore = ":disabled,:hidden";
            return $("#form-register").valid();
        }
    });
});

/* Date Picker */

$(document).ready(function(){

    $('#start_month').datepicker({
        format: 'mm',
        autoclose: true,
        startView: "months", 
        minViewMode: "months"
    });
      
      $('#start_year').datepicker({
        format: 'yyyy',
        autoclose: true,
        startView: "year", 
        minViewMode: "year"
    });

    $('#end_month').datepicker({
        format: 'mm',
        autoclose: true,
        startView: "months", 
        minViewMode: "months"
    });
      
      $('#end_year').datepicker({
        format: 'yyyy',
        autoclose: true,
        startView: "year", 
        minViewMode: "year"
    });
    
});

/* Add Remove Fields */

$('.extra-fields-customer').click(function() {
    $('.customer_records').clone().appendTo('.customer_records_dynamic');
    $('.customer_records_dynamic .customer_records').addClass('single remove');
    $('.single .extra-fields-customer').remove();
    $('.single').append('<a href="#" class="remove-field btn-remove-customer">Remove</a>');
    $('.customer_records_dynamic > .single').attr("class", "remove");
  
});
  
$(document).on('click', '.remove-field', function(e) {
    $(this).parent('.remove').remove();
    e.preventDefault();
});

/* Preview Image */

$(document).ready(function(){
    // Prepare the preview for profile picture
    $("#wizard-picture").change(function(){
        readURL(this);
    });
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
        }
        reader.readAsDataURL(input.files[0]);
    }
}

/* Add/Delete */

$(document).ready(function () {
    var max_div_1 = 5; //maximum input boxes allowed
    var wrapper_1 = $(".employment_record"); //Fields wrapper
    var add_button_1 = $(".add_employment_btn"); //Add button ID

    var x = 1; //initlal text box count
    $(add_button_1).click(function (e) { //on add input button click
        e.preventDefault();
        if (x < max_div_1) { //max input box allowed
            x++; //text box increment
            $(wrapper_1).append('<div class="employment-record"><div class="row mt-5"><div class="col-md-6"><label for="job_title_1" class="form-label">Job Title *</label><input type="text" placeholder="Enter your job title" class="form-control" id="job_title_1" name="job_title_1" required></div><div class="col-md-6 mt-4 mt-md-0"><label for="company_1" class="form-label">Company *</label><input type="text" placeholder="Enter your company" class="form-control" id="company_1" name="company_1" required></div><div class="col-md-6 mt-4"><label for="name_of_facility" class="form-label">Name of Facility *</label><input type="name_of_facility" placeholder="Enter Facility" class="form-control" id="name_of_facility" name="name_of_facility" required></div><div class="col-md-6 mt-4"><label for="speciality" class="form-label">Speciality *</label><input type="tel" placeholder="Enter speciality" class="form-control" id="speciality" name="speciality" required></div><div class="col-12 mt-4"><label for="location" class="form-label">Location *</label><select class="form-select location-select" id="location" name="location" required><option>Select</option><option>2</option><option>3</option><option>4</option></select></div><div class="col-md-6 mt-4"><label for="start-date" class="form-label">Start Date *</label><div class="row"><div class="col-md-6"><input type="text" placeholder="Month" class="form-control" id="start_month" name="start-date" required></div><div class="col-md-6"><input type="text" placeholder="Year" class="form-control" id="start_year" name="start-date" required></div></div></div><div class="col-md-6 mt-4"><label for="end-date" class="form-label">End Date *</label><div class="row"><div class="col-md-6"><input type="text" placeholder="Month" class="form-control" id="end_month" name="end-date" required></div><div class="col-md-6"><input type="text" placeholder="Year" class="form-control" id="end_year" name="end-date" required></div></div></div><div class="col-12 mt-4"><div class="form-check"><input class="form-check-input" type="checkbox" id="check1" name="option1" value="something"><label class="form-check-label">Currently Working Here</label></div></div><div class="col-12 mt-4"><label for="description" class="form-label">Description:</label><textarea class="form-control" rows="5" id="description" name="text"></textarea></div></div><a href="#" class="btn u-btn-3d u-btn-primary d-block ml-auto remove_div_1">Remove</a></div>'); //add input box
        }
    });

    $(wrapper).on("click", ".remove_div_1", function (e) { //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});

$(document).ready(function () {
    var max_div_2 = 5; //maximum input boxes allowed
    var wrapper_2 = $(".employment_record"); //Fields wrapper
    var add_button_2 = $(".add_employment_btn"); //Add button ID

    var x = 1; //initlal text box count
    $(add_button_2).click(function (e) { //on add input button click
        e.preventDefault();
        if (x < max_div_2) { //max input box allowed
            x++; //text box increment
            $(wrapper_2).append('<div class="employment-record"><div class="row mt-5"><div class="col-md-6"><label for="job_title_1" class="form-label">Job Title *</label><input type="text" placeholder="Enter your job title" class="form-control" id="job_title_1" name="job_title_1" required></div><div class="col-md-6 mt-4 mt-md-0"><label for="company_1" class="form-label">Company *</label><input type="text" placeholder="Enter your company" class="form-control" id="company_1" name="company_1" required></div><div class="col-md-6 mt-4"><label for="name_of_facility" class="form-label">Name of Facility *</label><input type="name_of_facility" placeholder="Enter Facility" class="form-control" id="name_of_facility" name="name_of_facility" required></div><div class="col-md-6 mt-4"><label for="speciality" class="form-label">Speciality *</label><input type="tel" placeholder="Enter speciality" class="form-control" id="speciality" name="speciality" required></div><div class="col-12 mt-4"><label for="location" class="form-label">Location *</label><select class="form-select location-select" id="location" name="location" required><option>Select</option><option>2</option><option>3</option><option>4</option></select></div><div class="col-md-6 mt-4"><label for="start-date" class="form-label">Start Date *</label><div class="row"><div class="col-md-6"><input type="text" placeholder="Month" class="form-control" id="start_month" name="start-date" required></div><div class="col-md-6"><input type="text" placeholder="Year" class="form-control" id="start_year" name="start-date" required></div></div></div><div class="col-md-6 mt-4"><label for="end-date" class="form-label">End Date *</label><div class="row"><div class="col-md-6"><input type="text" placeholder="Month" class="form-control" id="end_month" name="end-date" required></div><div class="col-md-6"><input type="text" placeholder="Year" class="form-control" id="end_year" name="end-date" required></div></div></div><div class="col-12 mt-4"><div class="form-check"><input class="form-check-input" type="checkbox" id="check1" name="option1" value="something"><label class="form-check-label">Currently Working Here</label></div></div><div class="col-12 mt-4"><label for="description" class="form-label">Description:</label><textarea class="form-control" rows="5" id="description" name="text"></textarea></div></div><a href="#" class="btn u-btn-3d u-btn-primary d-block ml-auto remove_div_2">Remove</a></div>'); //add input box
        }
    });

    $(wrapper).on("click", ".remove_div_2", function (e) { //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    })
});