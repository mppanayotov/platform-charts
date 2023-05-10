/**
 * Isotope
 */

import { $window, $document, $body } from '../utils/globals.js';

const $isotope = $('.js-isotope');

$document.ready(function() {
	$isotope.isotope({
		itemSelector: '.js-isotope-item',
		layoutMode: 'packery',
		percentPosition: true,
		packery: {
		}
	});

	$('.js-isotope-filters').on('click', 'button', function() {
		const filterValue = $(this).attr('data-filter');

		$(this).parent().siblings().removeClass('is-active');
		$(this).parent().addClass('is-active');

		$isotope.isotope({ filter: filterValue });
		
		$isotope.isotope('layout');
	});

	$window.on('load scroll resize', function() {
		$isotope.isotope('layout');
	});
});
