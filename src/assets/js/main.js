/*
 * Polyfills
 */
import './polyfills/object-fit';

/*
 * Modules
 */
import './modules/mobile-menu.js';
import { updateTheme } from './modules/theme.js'
import './modules/boxes.js';
import { updateBoxes } from './modules/boxes.js';
import './modules/charts.js';
import './modules/custom-select.js';
import './modules/datepicker.js';
import './modules/isotope.js';

window.updateTheme = updateTheme;
window.updateBoxes = updateBoxes;

window.updateTheme();
window.updateBoxes();
