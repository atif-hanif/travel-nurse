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

$('.owl-carousel').owlCarousel({
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

$('.companies-carousel').owlCarousel({
	loop: true,
	margin: 10,
	nav: true,
	dots: false,
	responsiveClass:true,
	stagePadding: 0,
    items: 4,
	autoWidth:true,
	navText: [
        '<i class="fa-solid fa-chevron-left"></i>',
        '<i class="fa-solid fa-chevron-right"></i>'
    ],
    navContainer: '.main-content .custom-nav',
	responsive:{
		0:{
			items: 1
		},
		600:{
			items: 1
		},
		1000:{
			items: 4
		}
	}
})

filterSelection("all")

function filterSelection(c) {
	var x, i;
	x = document.getElementsByClassName("filterDiv");
	if(c == "all") c = "";
	for(i = 0; i < x.length; i++) {
		w3RemoveClass(x[i], "show");
		if(x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
	}
}

function w3AddClass(element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for(i = 0; i < arr2.length; i++) {
		if(arr1.indexOf(arr2[i]) == -1) {
			element.className += " " + arr2[i];
		}
	}
}

function w3RemoveClass(element, name) {
	var i, arr1, arr2;
	arr1 = element.className.split(" ");
	arr2 = name.split(" ");
	for(i = 0; i < arr2.length; i++) {
		while(arr1.indexOf(arr2[i]) > -1) {
			arr1.splice(arr1.indexOf(arr2[i]), 1);
		}
	}
	element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for(var i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function() {
		var current = document.getElementsByClassName("active");
		current[0].className = current[0].className.replace(" active", "");
		this.className += " active";
	});
}

document.addEventListener('DOMContentLoaded', function() {
	var calendarEl = document.getElementById('calendar');

	var calendar = new FullCalendar.Calendar(calendarEl, {
	  initialDate: '2023-01-12',
	  editable: true,
	  selectable: true,
	  businessHours: true,
	  dayMaxEvents: true, // allow "more" link when too many events
	  events: [
		  {
			  title: 'Design Review',
			  start: '2023-01-01T10:00'
		  },
		  {
			  title: 'Sales Meeting',
			  start: '2023-01-01T14:00'
		  },
		  {
			  title: 'Date Night',
			  start: '2023-01-07T18:00:00'
		  },
		  {
			  title: 'Sams birthday party',
			  start: '2023-01-12T14:00:00'
		  },
	  ]
  });

  calendar.render();
  });