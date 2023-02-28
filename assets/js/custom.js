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
	loop:true,
	margin:10,
	nav:true,
	dot:true,
	responsiveClass:true,
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

$('.companies-slider').owlCarousel({
	loop: true,
	margin: 10,
	dots: false,
	nav: true,
	navText: ['<span class="fas fa-chevron-left"></span><span class="fas fa-chevron-left"></span>','<span class="fas fa-chevron-right"></span><span class="fas fa-chevron-right"></span>'],
	autoplay: true,
	autoplayHoverPause: true,
	responsive: {
		0: {
			items: 1
	  	},
	  	600: {
			items: 2
	  	},
	  	1000: {
			items: 4
	  	}
	}
})

var ShowPasswordToggle = document.querySelector("[type='password']");
ShowPasswordToggle.onclick = function() {
    document.querySelector("[type='password']").classList.add("input-password");
    document.getElementById("toggle-password").classList.remove("d-none");
    const passwordInput = document.querySelector("[type='password']");
    const togglePasswordButton = document.getElementById("toggle-password");
    togglePasswordButton.addEventListener("click", togglePassword);

    function togglePassword() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePasswordButton.setAttribute("aria-label", "Hide password.")
        } else {
            passwordInput.type = "password";
            togglePasswordButton.setAttribute("aria-label", "Show password as plain text. " + "Warning: this will display your password on the screen.")
        }
    }
};