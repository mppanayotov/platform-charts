/*
 * Mobile menu
 */

import { $window, $document, $body } from '../utils/globals.js';

const $mobileMenu = $('.js-mobile-menu');
const $mobileMenuTrigger = $('.js-mobile-menu-trigger');
const MOBILE_WIDTH = 1023;
let cachedScrollPos;

function hasOpenMobileMenu() {
	return $body.hasClass('has-mobile-menu-open');
}

function openMobileMenu() {
	$mobileMenuTrigger.addClass('is-active');
	$mobileMenu.addClass('is-active');
	$body.addClass('has-mobile-menu-open');
}

function closeMobileMenu() {
	$mobileMenuTrigger.removeClass('is-active');
	$mobileMenu.removeClass('is-active');
	$body.removeClass('has-mobile-menu-open');
}

$mobileMenuTrigger.on('click', function(e) {
	e.preventDefault();

	if (! hasOpenMobileMenu()) {
		openMobileMenu();
	} else {
		closeMobileMenu();
	}
});

$window.on('resize', function() {
	if ($window.width() > MOBILE_WIDTH && hasOpenMobileMenu()) {
		closeMobileMenu();
	}
});
