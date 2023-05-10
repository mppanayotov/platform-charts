/*
 * Charts
 */

import 'chart.js';
import { $window, $document, $body } from '../utils/globals.js';
 
Chart.defaults.roundedDoughnut = Chart.helpers.clone(Chart.defaults.doughnut);
Chart.controllers.roundedDoughnut = Chart.controllers.doughnut.extend({
	draw: function(ease) {
		const ctx = this.chart.ctx;
		const easingDecimal = ease || 1;
		const arcs = this.getMeta().data;

		Chart.helpers.each(arcs, function(arc, i) {
			arc.transition(easingDecimal).draw();

			const pArc = arcs[i === 0 ? arcs.length - 1 : i - 1];
			const pColor = pArc._view.backgroundColor;

			const vm = arc._view;
			const radius = (vm.outerRadius + vm.innerRadius) / 2;
			const thickness	= (vm.outerRadius - vm.innerRadius) / 2;
			const startAngle = Math.PI - vm.startAngle - Math.PI / 2;
			const angle	= Math.PI - vm.endAngle - Math.PI / 2;

			ctx.save();
			ctx.translate(vm.x, vm.y);

			ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
			ctx.beginPath();
			ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
			ctx.fill();

			ctx.fillStyle = vm.backgroundColor;
			ctx.beginPath();
			ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
			ctx.fill();

			ctx.restore();
		});
	}
});

export function updateDonut($donut, donutData) {
	const chart = new Chart($donut, {
		type: 'roundedDoughnut',
		data: {
			labels: [],
			datasets: [
				{
					data: [
						parseInt(donutData[0]),
						parseInt(donutData[1]),
						parseInt(donutData[2])
					],
					backgroundColor: [
						'#72B444',
						'#F99D1C',
						'#F06147'
					],
					borderWidth: 0
				}
			]
		},
		options: {
			scales: {
				animation: {
					animateScale: true,
					animateRotate: true
				}
			},
			cutoutPercentage: 80,
			circumference: 2 * Math.PI,
			layout: {
				padding: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 10
				}
			}
		}
	});
}

export function updateDonutAlt($donut, donutData) {
	const chartColor = getComputedStyle($donut[0]).color;

	const chart = new Chart($donut, {
		type: 'roundedDoughnut',
		data: {
			labels: [],
			datasets: [
				{
					data: [
						parseInt(donutData),
						parseInt(100 - parseInt(donutData))
					],
					backgroundColor: [
						chartColor,
						'#E2E2E2'
					],
					borderWidth: 0
				}
			]
		},
		options: {
			scales: {
				animation: {
					animateScale: true,
					animateRotate: true
				}
			},
			cutoutPercentage: 84,
			circumference: 2 * Math.PI,
			layout: {
				padding: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 10
				}
			}
		}
	});
}

export function updateGraph($graph, graphData) {
	const colorAccentColor1 = $graph.attr('data-accent-color-1');
	const colorAccentColor2 = $graph.attr('data-accent-color-2');

	let gradient;

	function createGradient() {
		const gradientTop = parseInt($graph.parent().parent().height() / 100 * (100 - Math.max.apply(Math, graphData[0])) + 10);
		const gradientBot = parseInt($graph.parent().parent().height() / 100 * (100 - Math.min.apply(Math, graphData[0])) - 10);
		gradient = $graph[0].getContext('2d').createLinearGradient(0, gradientTop, 0, gradientBot);

		gradient.addColorStop(0, 'rgba(0,0,255,0.2)');
		gradient.addColorStop(1, 'transparent');
	}

	createGradient();

	const chart = new Chart($graph, {
		type: 'line',
		data: {
			labels: ['','','','','','',''],
			datasets: [
				{
					fill: true,
					backgroundColor: gradient,
					lineTension: 0.3,
					pointBackgroundColor: colorAccentColor1,
					borderColor: [
						colorAccentColor1
					],
					borderWidth: 1,
					data: graphData[0]
				},
				{
					fill: false,
					borderDash: [8, 3],
					lineTension: 0.3,
					pointRadius: 0,
					borderColor: [
						colorAccentColor2
					],
					borderWidth: 1,
					data: graphData[1]
				}
			]
		},
		options: {
			scales: {
				yAxes: [{
					display: false,
					ticks: {
					suggestedMin: 0,
					suggestedMax: 100
				}
				}],
				animation: {
					animateScale: true,
					animateRotate: true
				}
			},
			legend: {
				display: false
			},
			layout: {
				padding: {
					left: 10,
					right: 10,
					top: 10,
					bottom: 0
				}
			}
		}
	});

	$window.on('load resize', function() {
		createGradient();
		chart.update();
	});
}

export function updateBar($bar, barData) {
	$bar.find('.js-bar-value')
		.html(barData)
		.css('opacity', '1');

	$bar.find('.js-bar-data-alt')
		.css('opacity', '1');

	$bar.find('.js-bar-fill').css({
		'transform' : 'translateX(calc(-100% + ' + barData + '))'
	});
}
