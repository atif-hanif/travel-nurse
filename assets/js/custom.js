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

/* Calendar */

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

/* Events Filter */

// init Isotope
var $grid = $('.grid').isotope({
	itemSelector: '.element-item',
	layoutMode: 'fitRows'
});

// filter functions
var filterFns = {
	// show if number is greater than 50
	numberGreaterThan50: function() {
		var number = $(this).find('.number').text();
		return parseInt(number, 10) > 50;
	},
	// show if name ends with -ium
	ium: function() {
		var name = $(this).find('.name').text();
		return name.match(/ium$/);
	}
};

// bind filter button click
$('.filters-button-group').on('click', 'button', function() {
	var filterValue = $(this).attr('data-filter');
	// use filterFn if matches value
	filterValue = filterFns[filterValue] || filterValue;
	$grid.isotope({
		filter: filterValue
	});
});

// change is-checked class on buttons
$('.button-group').each(function(i, buttonGroup) {
	var $buttonGroup = $(buttonGroup);
	$buttonGroup.on('click', 'button', function() {
		$buttonGroup.find('.is-checked').removeClass('is-checked');
		$(this).addClass('is-checked');
	});
});
  
/* Healthcare Agencies Filter */

var itemSelector = ".item";
var $checkboxes = $('.filter-item');
var $container = $('.isotop-grid');

// var $container = $('.isotop-grid').isotope({
// 	itemSelector: itemSelector
// });

//Ascending order
var responsiveIsotope = [
	[480, 4],
	[720, 6]
];
var itemsPerPageDefault = 15;
var itemsPerPage = defineItemsPerPage();
var currentNumberPages = 1;
var currentPage = 1;
var startPage = 1;
var currentFilter = '*';
var filterAttribute = 'data-filter';
var filterValue = "";
var pageAttribute = 'data-page';
var pagerClass = 'isotope-pager';
var filters = {};
var $filterCount = $('.filter-count');
var $grid = $('.isotop-grid');
var $filterContainer = $('.filter-container');

$(function () {
  
    startFilterCount();
	$filterContainer.on('change', function (jQEvent) {
		updateFilterCount();
	});
});

function updateFilterCount() {
    var elems = $grid.isotope('getFilteredItemElements').length;
    if (elems === 1) {
        $filterCount.text(elems + ' Results');
        $('.no-results').removeClass('active');
    }
    else if (elems === 0) {
        $filterCount.text(elems + ' Results');
        $('.no-results').addClass('active');
    }
    else {
        $filterCount.text(elems + ' Results');
        $('.no-results').removeClass('active');
    }
}

function startFilterCount() {
    var elems = $('div.item-filter').length;
    if (elems <= 1) {
        $filterCount.text(elems + ' Results');
    }
    else {
        $filterCount.text(elems + ' Results');
    }
}

function changeFilter(selector) { 
	$container.isotope({ filter: selector }); 
}

//grab all checked filters and goto page on fresh isotope output
function goToPage(n) {
	currentPage = n;
	var selector = itemSelector;
	var exclusives = [];
	// for each box checked, add its value and push to array
	$checkboxes.each(function(i, elem) {
		if(elem.checked) {
			selector += (currentFilter != '*') ? '.' + elem.value : '';
			exclusives.push(selector);
		}
	});
	// smash all values back together for 'and' filtering
	filterValue = exclusives.length ? exclusives.join('') : '*';
	// add page number to the string of filters
	var wordPage = currentPage.toString();
	filterValue += ('.' + wordPage);
	changeFilter(filterValue);
}

// determine page breaks based on window width and preset values
function defineItemsPerPage() {
	var pages = itemsPerPageDefault;
	for(var i = 0; i < responsiveIsotope.length; i++) {
		if($(window).width() <= responsiveIsotope[i][0]) {
			pages = responsiveIsotope[i][1];
			break;
		}
	}
	return pages;
}

function setPagination() {
	var SettingsPagesOnItems = function() {
		var itemsLength = $container.children(itemSelector).length;
		var pages = Math.ceil(itemsLength / itemsPerPage);
		var item = 1;
		var page = 1;
		var selector = itemSelector;
		selector += ( currentFilter != '*' ) ? '['+filterAttribute+'="'+currentFilter+'"]' : '';
		var exclusives = [];
		// for each box checked, add its value and push to array
		$checkboxes.each(function(i, elem) {
			if(elem.checked) {
				selector += (currentFilter != '*') ? '.' + elem.value : '';
				exclusives.push(selector);
			}
		});

		// smash all values back together for 'and' filtering
		filterValue = exclusives.length ? exclusives.join('') : '*';
		// find each child element with current filter values
		$container.children(filterValue).each(function() {
			// increment page if a new one is needed
			if(item > itemsPerPage) {
				page++;
				item = 1;
			}
			// add page number to element as a class
			wordPage = page.toString();
			var classes = $(this).attr('class').split(' ');
			var lastClass = classes[classes.length - 1];
			// last class shorter than 4 will be a page number, if so, grab and replace
			if(lastClass.length < 4) {
				$(this).removeClass();
				classes.pop();
				classes.push(wordPage);
				classes = classes.join(' ');
				$(this).addClass(classes);
			} else {
				// if there was no page number, add it
				$(this).addClass(wordPage);
			}
			$(this).attr(pageAttribute, page);
			item++;
		});
		currentNumberPages = page;
	}();

	// create page number navigation
	var CreatePagers = function() {
		var $isotopePager = ($('.' + pagerClass).length == 0) ? $('<div class="' + pagerClass + ' text-center"></div>') : $('.' + pagerClass);
		$isotopePager.html('');
		var $page_prev_btn=$('<a type="button" class="btn previous_btn"><i class="fa-solid fa-chevron-left"></i></a>');
		var $page_next_btn=$('<a type="button" class="btn next_btn"><i class="fa-solid fa-chevron-right"></i></a>');
		$page_prev_btn.appendTo($isotopePager);
		if(currentNumberPages > 1) {
			for(var i = 0; i < currentNumberPages; i++) {
				var $pager = $('<a href="javascript:void(0);" class="pager" ' + pageAttribute + '="' + (i + 1) + '"></a>');
				$pager.html(i + 1);
				$pager.click(function() {
					var page = $(this).eq(0).attr(pageAttribute);
					$('.isotope-pager a').removeClass("active");
					$(this).addClass("active");
					goToPage(page);
				});
				$pager.appendTo($isotopePager);
				$isotopePager.find('a.pager:first').addClass('active');
			}
			$page_next_btn.appendTo($isotopePager)
			$container.after($isotopePager);
		}
		$container.after($isotopePager);
		$page_prev_btn.click(function(){
			if( currentPage > startPage)
			{
				$('.previous_btn').removeAttr('disabled');
				var page=  currentPage - 1;
				var page=currentPage - 1 < startPage
				? startPage: currentPage - 1;
				$('.isotope-pager a').removeClass("active");
				$('.pager[data-page="'+page+'"]').addClass('active');
				goToPage(page);
			}
			else {
				$('.previous_btn').attr('disabled','disabled');
			}
		});
		$page_next_btn.click(function(){
			if( currentPage < currentNumberPages)
			{
				$('.next_btn').removeAttr('disabled');
				var page=currentPage + 1 > currentNumberPages
				? currentNumberPages : currentPage + 1;
			   	$('.isotope-pager a').removeClass("active");
			   	$('.pager[data-page="'+page+'"]').addClass('active');
				goToPage(page);
			}
			 else {
				$('.next_btn').attr('disabled','disabled');
			}
		});
	}();
}

setPagination();
goToPage(1);

//event handlers
$checkboxes.change(function() {
	var filter = $(this).attr(filterAttribute);
	currentFilter = filter;
	// setPagination();
	goToPage(1);
});

// $(window).resize(function() {
// 	itemsPerPage = defineItemsPerPage();
// 	setPagination();
// 	goToPage(1);
// });

