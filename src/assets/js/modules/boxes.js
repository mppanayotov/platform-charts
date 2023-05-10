/*
 * Boxes
 */
import { updateDonut, updateDonutAlt, updateGraph, updateBar } from './charts.js';

const $box = $('.js-box');

export function updateBoxes() {
	$box.each(function() {
		const $box = $(this);

		updateBox($box);
	});

	return "Boxes updated";
}

function updateBox($box) {
	getBoxData($box);
}

function getBoxData($box) {
	const $boxTarget = $box.attr('data-box');
	const boxData = boxes[$boxTarget];

	setBoxData($box, boxData);
}

function setBoxData($box, boxData) {
	const $title = $box.find('.js-box-title');
	const $subtitle = $box.find('.js-box-subtitle');
	const $stats = $box.find('.js-stat');
	const $barsContainer = $box.find('.js-bars-container');
	const $donut = $box.find('.js-donut');
	const $donutAlt = $box.find('.js-donut-alt');
	const $graph = $box.find('.js-graph');

	$title.html(boxData.title);
	$subtitle.html(boxData.subtitle);

	for (let stat in boxData.stats) {
		$($stats[stat]).find('.js-stat-value').html(boxData.stats[stat].statValue);
		$($stats[stat]).find('.js-stat-delta-value').html(boxData.stats[stat].statDeltaValue);
		
		if (boxData.stats[stat].statDeltaDown == true) {
			$($stats[stat]).find('.js-stat-delta').addClass('box__delta--down');
		} else {
			$($stats[stat]).find('.js-stat-delta').removeClass('box__delta--down');
		}
	}

	for (let donut in boxData.donuts) {
		$box.find('.js-legend-1').html(boxData.donuts[donut].data[0]);
		$box.find('.js-legend-2').html(boxData.donuts[donut].data[1]);
		$box.find('.js-legend-3').html(boxData.donuts[donut].data[2]);

		$box.find('.js-promoters-1').html(boxData.donuts[donut].promoters[0]);
		$box.find('.js-promoters-2').html(boxData.donuts[donut].promoters[1]);
		$box.find('.js-promoters-3').html(boxData.donuts[donut].promoters[2]);

		$box.find('.js-chart-value').html(boxData.donuts[donut].chartValue);
		$box.find('.js-chart-delta-value').html(boxData.donuts[donut].chartDeltaValue);

		if (boxData.donuts[donut].chartDeltaDown == true) {
			$box.find('.js-chart-delta').addClass('box__delta--down');
		} else {
			$box.find('.js-chart-delta').removeClass('box__delta--down');
		}

		updateDonut(
			$($donut[donut]),
			boxData.donuts[donut].data
		);
	}

	for (let donutAlt in boxData.donutsAlt) {
		const $chartContainer = $($donutAlt[donutAlt]).closest('.js-chart-container');
	
		$chartContainer.find('.js-chart-value').html(boxData.donutsAlt[donutAlt].data);
		$chartContainer.find('.js-chart-delta-value').html(boxData.donutsAlt[donutAlt].chartDeltaValue);

		if (boxData.donutsAlt[donutAlt].chartDeltaDown == true) {
			$chartContainer.find('.js-chart-delta').addClass('box__delta--down');
		} else {
			$chartContainer.find('.js-chart-delta').removeClass('box__delta--down');
		}

		updateDonutAlt(
			$($donutAlt[donutAlt]),
			boxData.donutsAlt[donutAlt].data
		);
	}

	for (let graph in boxData.graphs) {
		updateGraph(
			$($graph[graph]),
			boxData.graphs[graph].datasets
		);
	}

	for (let bar in boxData.bars) {
		const $bars = $($barsContainer[bar]);
		const $bar = $bars.find('.js-bar');
		const $barsTitle = $bars.find('.js-bars-title');
		const $label = $bars.find('.js-bars-label');
		const $dataAlt = $bars.find('.js-bar-data-alt');

		$barsTitle.html(boxData.bars[bar].title);

		for (let label in boxData.bars[bar].labels) {
			$($label[label]).html(boxData.bars[bar].labels[label]);
		}

		for (let data in boxData.bars[bar].datasets) {
			updateBar(
				$($bar[data]),
				boxData.bars[bar].datasets[data]
			);
		}

		for (let datasetAlt in boxData.bars[bar].datasetsAlt) {
			$($dataAlt[datasetAlt]).html(boxData.bars[bar].datasetsAlt[datasetAlt]);
		}
	}
}
