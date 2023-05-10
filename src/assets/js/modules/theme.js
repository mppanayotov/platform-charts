/*
 * Import variables
 */

import { $window, $document, $body } from '../utils/globals.js';

export function updateTheme() {
	$('.color-highlight-color').css('color', theme.colorHighlightColor);
	$('.color-box-head-color').css('color', theme.colorBoxHeadColor);
	$('.bg-box-head-color').css('background-color', theme.colorBoxHeadBackground);
	$('.color-accent-color-1').css('color', theme.colorAccentColor1);
	$('.color-accent-color-2').css('color', theme.colorAccentColor2);
	$('.ff-box-font').css('font-family', theme.ffBoxFont + ',' + theme.ffBoxFontType);
	$('.color-accent-color-2').css('color', theme.colorAccentColor2);

	$('.js-graph').attr({
		'data-accent-color-1': theme.colorAccentColor1,
		'data-accent-color-2': theme.colorAccentColor2
	});

	return "Theme updated";
}
