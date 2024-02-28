$(function() {

	$('#collapseThree').on('hidden.bs.collapse', function() {
		customSendDisabled("hidden", $("#customCheckboxThree")[0])
	})
	$('#collapseThree').on('shown.bs.collapse', function() {
		customSendDisabled("shown", $("#customCheckboxThree")[0])
	})
	$("#customCheckboxThree").click(function() {
		if ($(this)[0].checked) {
			$("#customSend")[0].disabled = false;
		} else {
			$("#customSend")[0].disabled = true;
		}
	});
});

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