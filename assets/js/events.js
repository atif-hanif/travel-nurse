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

/* Filter */

var $grid = $('.isotop-grid').isotope({
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