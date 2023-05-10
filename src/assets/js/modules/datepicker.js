/**
 * Datepicker
 */

$('.js-datepicker').each(function() {
	$datepicker = $(this);
	$datepickerHolder = $datepicker.closest('.js-datepicker-holder')
	$datepickerFrom = $datepickerHolder.find('.js-datepicker-from');
	$datepickerTo = $datepickerHolder.find('.js-datepicker-to');
	$datepickerFromValue = $datepickerHolder.find('.js-datepicker-from-value');
	$datepickerToValue = $datepickerHolder.find('.js-datepicker-to-value');
	$datepickerFromField = $datepickerHolder.find('.js-datepicker-from-field');
	$datepickerToField = $datepickerHolder.find('.js-datepicker-to-field');
	$datepickerClose = $datepickerHolder.find('.js-datepicker-close');

	$datepickerFrom.datepicker({
		dateFormat: 'M yy' + ' - ',
		defaultDate: '',
		changeMonth: false,
		numberOfMonths: 1,
		onChangeMonthYear: function (activeYear, activeMonth, instance) {
			setTimeout(function() {
				forceUpdate(activeYear, activeMonth, instance, $datepickerFromValue, $datepickerFromField);
			}, 100);
		}
	});
	
	$datepickerTo.datepicker({
		dateFormat: 'M yy',
		defaultDate: '',
		changeMonth: false,
		numberOfMonths: 1,
		onChangeMonthYear: function (activeYear, activeMonth, instance) {
			setTimeout(function() {
				forceUpdate(activeYear, activeMonth, instance, $datepickerToValue, $datepickerToField);
			}, 100);
		}
	});

	function forceUpdate(activeYear, activeMonth, instance, valueContainer, valueField) {
		const input = instance.input;
		const month = instance.input.find('.ui-datepicker-month').html().substring(0, 3);
		const year = instance.input.find('.ui-datepicker-year').html();

		input.val(month + ' ' + year);
		valueField.val(instance.selectedMonth +  year);
		valueContainer.html(month + ' ' + year);
		updateLayout();
	}

	function getDate(element) {
		let date;

		try {
			date = $.datepicker.parseDate(rangeDate, element.value);
		} catch(error) {
			date = null;
		}

		return date;
	}

	function updateLayout() {
		if (
			$datepickerFromValue.html() !== '' ||
			$datepickerToValue.html() !== ''
		) {
			$datepickerHolder.addClass('has-values');
		} else {
			$datepickerHolder.removeClass('has-values');
		}
	}

	function openDropdown() {
		$datepickerHolder.addClass('is-active');
	}

	function closeDropdown() {
		$datepickerHolder.removeClass('is-active');
	}

	$datepicker.on('click', function() {
		if (! $datepickerHolder.hasClass('is-active')) {
			openDropdown();
		} else {
			closeDropdown();
		}
	});

	$datepickerClose.on('click', function() {
		closeDropdown();
	});
});
