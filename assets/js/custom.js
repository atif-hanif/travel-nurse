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

/* Chart */

(async () => {
    const mapData = await fetch(
        'https://code.highcharts.com/mapdata/countries/us/us-all.topo.json'
    ).then(response => response.json());


    const data = [
            // state, licensInfo, housingInfo, travelingInfo, accommInfo, sumVotes, winner, offset config for pies
            ['Alabama', 729547, 1318255, 44467, 9391, 2101660],
            ['Alaska', 116454, 163387, 18725, 5735, 304301],
            ['Arizona', 1161167, 1252401, 106327, 34345, 2554240],
            ['Arkansas', 380494, 684782, 29829, 9473, 1104578],
            ['California', 8577206, 4390272, 467370, 271047, 13705895],
            ['Colorado', 1338870, 1202484, 144121, 38437, 2723912],
            ['Connecticut', 897572, 673215, 48676, 22841, 1642304],
            ['Delaware', 235603, 185127, 14757, 6103, 441590],
            ['District of Columbia', 282830, 12723, 4906, 4258, 304717],
            ['Florida', 4504975, 4617886, 207043, 64399, 9394303],
            ['Georgia', 1877963, 2089104, 125306, 0, 4092373],
            ['Hawaii', 266891, 128847, 15954, 12737, 424429],
            ['Idaho', 189765, 409055, 28331, 8496, 635647],
            ['Illinois', 2977498, 2118179, 208682, 74112, 5378471],
            ['Indiana', 1039126, 1557286, 133993, 7841, 2738246],
            ['Iowa', 653669, 800983, 59186, 11479, 1525317],
            ['Kansas', 427005, 671018, 55406, 23506, 1176935],
            ['Kentucky', 628854, 1202971, 53752, 13913, 1899490],
            ['Louisiana', 780154, 1178638, 37978, 14031, 2010801],
            ['Maine', 352156, 332418, 37578, 13995, 736147, 1],
            ['Maryland', 1502820, 878615, 78225, 33380, 2493040],
            ['Massachusetts', 1995196, 1090893, 138018, 47661, 3271768],
            ['Michigan', 2268839, 2279543, 172136, 51463, 4771981],
            ['Minnesota', 1367716, 1322951, 112972, 36985, 2840624],
            ['Mississippi', 462127, 678284, 14411, 3595, 1158417],
            ['Missouri', 1054889, 1585753, 96404, 25086, 2762132],
            ['Montana', 174281, 273879, 28036, 7868, 484064],
            ['Nebraska', 273185, 485372, 38746, 8337, 805640],
            ['Nevada', 539260, 512058, 37384, 0, 1088702, 1],
            ['New Hampshire', 348526, 345790, 30694, 6465, 731475, 1],
            ['New Jersey', 1967444, 1509688, 72143, 37131, 3586406],
            ['New Mexico', 380923, 316134, 74544, 9797, 781398, 1],
            ['New York', 4145376, 2638135, 162273, 100110, 7045894, 1],
            ['North Carolina', 2169496, 2345235, 130021, 1038, 4645790],
            ['North Dakota', 93758, 216794, 21434, 378, 332364],
            ['Ohio', 2320596, 2776683, 174266, 44310, 5315855],
            ['Oklahoma', 420375, 949136, 83481, 0, 1452992],
            ['Oregon', 991580, 774080, 93875, 49247, 1908782, 1],
            ['Pennsylvania', 2874136, 2945302, 144826, 49334, 6013598],
            ['Rhode Island', 227062, 166454, 14700, 6171, 414387],
            ['South Carolina', 855373, 1155389, 49204, 13034, 2073000],
            ['South Dakota', 117442, 227701, 20845, 0, 365988],
            ['Tennessee', 868853, 1519926, 70286, 15952, 2475017],
            ['Texas', 3877868, 4685047, 283492, 71558, 8917965],
            ['Utah', 222858, 375006, 39608, 7695, 645167],
            ['Vermont', 178573, 95369, 10078, 6758, 290778],
            ['Virginia', 1981473, 1769443, 118274, 27638, 3896828],
            ['Washington', 1727840, 1210370, 160356, 57571, 3156137],
            ['West Virginia', 187519, 486304, 22958, 8016, 704797],
            ['Wisconsin', 1382947, 1407028, 106470, 31016, 2927461],
            ['Wyoming', 55973, 174419, 13287, 2515, 246194]
        ],
        demColor = 'rgba(74,131,240,0.80)',
        repColor = 'rgba(220,71,71,0.80)',
        libColor = 'rgba(240,190,50,0.80)',
        grnColor = 'rgba(90,200,90,0.80)';


    // Compute max votes to find relative sizes of bubbles
    const maxVotes = data.reduce((max, row) => Math.max(max, row[5]), 0);

    // Build the chart
    const chart = Highcharts.mapChart('mapchart', {

        chart: {
            animation: true,
        },

        accessibility: {
            description: 'Complex map demo showing voting results for US states, where each state has a pie chart overlaid showing the vote distribution.'
        },

		credits: {
			enabled: false
		},

		exporting: {
			enabled: false
		},

        colorAxis: {
            dataClasses: [{
                from: -1,
                to: 0,
                color: 'rgba(244,91,91,0.5)',
                name: 'Licensing'
            }, {
                from: 0,
                to: 1,
                color: 'rgba(124,181,236,0.5)',
                name: 'Housing'
            }, {
                from: 2,
                to: 3,
                name: 'Traveling',
                color: libColor
            }, {
                from: 3,
                to: 4,
                name: 'Accommodation',
                color: grnColor
            }]
        },

        mapNavigation: {
            enabled: true
        },

        title: {
            text: '',
            align: 'left'
        },

        // Default options for the pies
        plotOptions: {
            pie: {
                borderColor: 'rgba(255,255,255,0.4)',
                borderWidth: 1,
                clip: true,
                dataLabels: {
                    enabled: false
                },
                states: {
                    hover: {
                        halo: {
                            size: 5
                        }
                    }
                },
                tooltip: {
                    headerFormat: ''
                }
            }
        },

        series: [{
            mapData,
            data: data,
            name: 'States',
            accessibility: {
                point: {
                    descriptionFormatter(point) {
                        const party = point.value > 0 ? 'democrat' : 'republican';
                        return point.name + ', ' + party + '. Total: ' + point.sumVotes +
                            '. Licensing: ' + point.licensInfo + '. Housing: ' + point.housingInfo +
                            '. Traveling: ' + point.travelingInfo + '. Accommodation: ' + point.accommInfo + '.';
                    }
                }
            },
            borderColor: '#FFF',
            joinBy: ['name', 'id'],
            keys: ['id', 'licensInfo', 'housingInfo', 'travelingInfo', 'accommInfo',
                'sumVotes', 'value', 'pieOffset'],
            tooltip: {
                headerFormat: '',
                pointFormatter() {
                    const hoverVotes = this.hoverVotes; // Used by pie only
                    return '<b>' + this.id + ' </b><br/>' +
                        [
                            ['Licensing', this.licensInfo, demColor],
                            ['Housing', this.housingInfo, repColor],
                            ['Traveling', this.travelingInfo, libColor],
                            ['Accommodation', this.accommInfo, grnColor]
                        ]
                            .sort((a, b) => b[1] - a[1]) // Sort tooltip by most votes
                            .map(line => '<span style="color:' + line[2] +
                                // Colorized bullet
                                '">\u25CF</span> ' +
                                // Party and votes
                                (line[0] === hoverVotes ? '<b>' : '') +
                                line[0] + ': ' +
                                Highcharts.numberFormat(line[1], 0) +
                                (line[0] === hoverVotes ? '</b>' : '') +
                                '<br/>')
                            .join('') +
                        '<hr/> '
                }
            }
        }, {
            name: 'Connectors',
            type: 'mapline',
            color: 'rgba(130, 130, 130, 0.5)',
            zIndex: 5,
            showInLegend: false,
            enableMouseTracking: false,
            accessibility: {
                enabled: false
            }
        }]
    });

    // When clicking legend items, also toggle connectors and pies
    chart.legend.allItems.forEach(item => {
        const setVisible = item.setVisible;

        item.setVisible = function () {
            const item = this;

            setVisible.call(item);

            chart.series[0].points.forEach(point => {
                if (
                    chart.colorAxis[0].dataClasses[point.dataClass].name ===
                    item.name
                ) {
                    // Find this state's pie and set visibility
                    Highcharts.find(chart.series, function (item) {
                        return item.name === point.id;
                    }).setVisible(item.visible, false);

                    // Do the same for the connector point if it exists
                    const connector = Highcharts.find(
                        chart.series[2].points,
                        item => item.name === point.id
                    );

                    if (connector) {
                        connector.setVisible(item.visible, false);
                    }
                }
            });
            chart.redraw();
        };
    });

    // Add the pies after chart load, optionally with offset and connectors
    chart.series[0].points.forEach(state => {
        // Add the pie for this state
        chart.addSeries({
            type: '',
            name: state.id,
            zIndex: 6, // Keep pies above connector lines
            minSize: 15,
            maxSize: 55,
            onPoint: {
                id: state.id,
                z: (() => {
                    const mapView = chart.mapView,
                        zoomFactor = mapView.zoom / mapView.minZoom;

                    return Math.max(
                        chart.chartWidth / 45 * zoomFactor, // Min size
                        chart.chartWidth /
                        11 * zoomFactor * state.sumVotes / maxVotes
                    );
                })()
            },
            states: {
                inactive: {
                    enabled: false
                }
            },
            accessibility: {
                enabled: false
            },
            tooltip: {
                // Use the state tooltip for the pies as well
                pointFormatter() {
                    return state.series.tooltipOptions.pointFormatter.call({
                        id: state.id,
                        hoverVotes: this.name,
                        licensInfo: state.licensInfo,
                        housingInfo: state.housingInfo,
                        travelingInfo: state.travelingInfo,
                        accommInfo: state.accommInfo,
                        sumVotes: state.sumVotes
                    });
                }
            },
            data: [{
                name: 'Licensing',
                y: state.licensInfo,
                color: demColor
            }, {
                name: 'Housing',
                y: state.housingInfo,
                color: repColor
            }, {
                name: 'Traveling',
                y: state.travelingInfo,
                color: libColor
            }, {
                name: 'Accommodation',
                y: state.accommInfo,
                color: grnColor
            }]
        }, false);
    });

    // Only redraw once all pies and connectors have been added
    chart.redraw();
})();
