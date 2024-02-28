$(function() {
	$('#collapseTwo').on('hidden.bs.collapse', function() {
		customRecruitDisabled("hidden", $("#customCheckboxTwo")[0])
	})
	$('#collapseTwo').on('shown.bs.collapse', function() {
		customRecruitDisabled("shown", $("#customCheckboxTwo")[0])
	})

	$('#collapseThree').on('hidden.bs.collapse', function() {
		customSendDisabled("hidden", $("#customCheckboxThree")[0])
	})
	$('#collapseThree').on('shown.bs.collapse', function() {
		customSendDisabled("shown", $("#customCheckboxThree")[0])
	})

	$("#customCheckboxTwo").click(function() {
		if ($(this)[0].checked) {
			$("#customRecruit")[0].disabled = false;
		} else {
			$("#customRecruit")[0].disabled = true;
		}
	});
	$("#customCheckboxThree").click(function() {
		if ($(this)[0].checked) {
			$("#customSend")[0].disabled = false;
		} else {
			$("#customSend")[0].disabled = true;
		}
	});
	$('#datepicker').datepicker({
		format: 'yyyy/mm/dd',
		autoclose: true,
		todayBtn: 'linked',
		forceParse: true,
	}).on('changeDate', function(event) {
		$('#datepicker')[0].focus();
		$('#datepicker')[0].blur();
	});
});

function customRecruitDisabled(kbn, collapse) {
	if (kbn == "hidden") {
		collapse.checked = false;
		collapse.disabled = true;
		$("#customRecruit")[0].disabled = true;
	}
	if (kbn == "shown") {
		collapse.disabled = false;
	}
}

function customSendDisabled(kbn, collapse) {
	if (kbn == "hidden") {
		collapse.checked = false;
		collapse.disabled = true;
		$("#customSend")[0].disabled = true;
	}
	if (kbn == "shown") {
		collapse.disabled = false;
	}
}