var itemSelector = ".item";
var $checkboxes = $('.filter-item');
var $container = $('.isotop-grid');

// var $container = $('.isotop-grid').isotope({
// 	itemSelector: itemSelector,
// 	layoutMode: 'fitRows'
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