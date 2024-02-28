$(function() {
	let path = window.location.pathname;
	fetch("./api/news", {
		method: "GET",
	}).then((response) => response.json()).then((res) => {
		results = JSON.stringify(res);
		data = JSON.parse(results);
		var html = "";
		for (i in data) {
			html += "<div class='col-12 mb-3'>" +
				"<a>" +
				"<p class='mb-0'>" + data[i].date + "</p>" +
				"<span>" + data[i].content + "</span>" +
				"</a>" +
				"</div>";
			if (i > 3 && path !== "/news.html") {
				html += "<br><br><br><br><div class='col-12 mb-3'>" +
					"<a href='news.html' class='butn small'>" +
					"<span>MORE NEWS</span>" +
					"</a>" +
					"</div>";
				break;
			}
		}

		document.getElementById("newslinks").innerHTML = html;
	}).catch((error) => console.error(error));
})