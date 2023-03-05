$(function() {
	// var siteSticky = function() {
	// 	$(".js-sticky-header").sticky({
	// 		topSpacing: 0
	// 	});
	// };
	//siteSticky();
	var siteMenuClone = function() {
		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});
		setTimeout(function() {
			var counter = 0;
			$('.site-mobile-menu .has-children').each(function() {
				var $this = $(this);
				$this.prepend('<span class="arrow-collapse collapsed">');
				$this.find('.arrow-collapse').attr({
					'data-toggle': 'collapse',
					'data-target': '#collapseItem' + counter,
				});
				$this.find('> ul').attr({
					'class': 'collapse',
					'id': 'collapseItem' + counter,
				});
				counter++;
			});
		}, 1000);
		$('body').on('click', '.arrow-collapse', function(e) {
			var $this = $(this);
			if($this.closest('li').find('.collapse').hasClass('show')) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
			e.preventDefault();
		});
		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();
			if(w > 768) {
				if($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})
		$('body').on('click', '.js-menu-toggle', function(e) {
				var $this = $(this);
				e.preventDefault();
				if($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
					$this.removeClass('active');
				} else {
					$('body').addClass('offcanvas-menu');
					$this.addClass('active');
				}
			})
			// click outisde offcanvas
		$(document).mouseup(function(e) {
			var container = $(".site-mobile-menu");
			if(!container.is(e.target) && container.has(e.target).length === 0) {
				if($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		});
	};
	siteMenuClone();
});

$('.banner-slider').owlCarousel({
	loop: true,
	margin: 10,
	nav: true,
	dot: true,
    navText: ['<span class="fas fa-chevron-left"></span><span class="fas fa-chevron-left"></span>','<span class="fas fa-chevron-right"></span><span class="fas fa-chevron-right"></span>'],
	responsiveClass: true,
	responsive:{
		0:{
			items:1
		},
		600:{
			items:1
		},
		1000:{
			items:1
		}
	}
})

let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
        	next = items[0]
      	}
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})

/* Sign Up */

$(function(){
    $("#form-register").validate({
        // rules: {
        //     password : {
        //         required : true,
        //     },
        //     confirm_password: {
        //         equalTo: "#password"
        //     }
        // },
        messages: {
            first_name: {
                required: "Enter First Name"
            },
            last_name: {
                required: "Enter Last Name"
            },
            email: {
                required: "Enter Email"
            },
            mobile_number: {
                required: "Enter Mobile Number"
            },
            password: {
                required: "Please provide a password"
            },
            confirm_password: {
                required: "Please provide a password",
                equalTo: "Please enter the same password"
            },
            job: {
                required: "Select Job"
            }
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
            var username = $('#username').val();
            var email = $('#email').val();
            var cardtype = $('#card-type').val();
            var cardnumber = $('#card-number').val();
            var cvc = $('#cvc').val();
            var month = $('#month').val();
            var year = $('#year').val();

            $('#username-val').text(username);
            $('#email-val').text(email);
            $('#card-type-val').text(cardtype);
            $('#card-number-val').text(cardnumber);
            $('#cvc-val').text(cvc);
            $('#month-val').text(month);
            $('#year-val').text(year);

            $("#form-register").validate().settings.ignore = ":disabled,:hidden";
            return $("#form-register").valid();
        }
    });
});

$(document).ready(function() {
    $(".show_hide_password i").on('click', function(event) {
        event.preventDefault();
        if($('.show_hide_password input').attr("type") == "text"){
            $('.show_hide_password input').attr('type', 'password');
            $('.show_hide_password i').addClass( "fa-eye-slash" );
            $('.show_hide_password i').removeClass( "fa-eye" );
        }else if($('.show_hide_password input').attr("type") == "password"){
            $('.show_hide_password input').attr('type', 'text');
            $('.show_hide_password i').removeClass( "fa-eye-slash" );
            $('.show_hide_password i').addClass( "fa-eye" );
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

