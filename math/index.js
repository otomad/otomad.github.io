const title = $("title").text();
$("#pagename").html(title);
$(document).ready(function() {
	resizeIframe();
	do {
		var arg = location.href;
		var n = arg.indexOf("?");
		if (n == -1) {
			arg = "";
			break;
		}
		var title = arg.slice(n + 1);
		arg = title + ".html";
	} while (0);
	document.getElementById("iframe").src = (n != -1 ? arg : "");
	setTimeout(() => {
		if (n != -1) findActive(title);
	}, 2000);
});
window.onresize = resizeIframe;
$("#nav-toggler").click(function() {
	$('#v-pills-tab').slideToggle();
});

function resizeIframe() {
	if ($(window).width() < 992) {
		$("#v-pills-tab").slideUp();
		$("#nav-toggler").show();
	} else {
		$("#v-pills-tab").slideDown();
		$("#nav-toggler").hide();
	}
}
$(".nav-link").not("#nav-full-size").click(function() {
	if ($(window).width() < 992)
		$('#v-pills-tab').slideUp();
	// document.title = $("#iframe").contents().attr("title") + " - " + title;
	var state = this.id.slice(2);
	var path = state + ".html";
	document.getElementById("iframe").src = path;
	window.history.pushState("", "", "?" + state);
	document.body.style.cssText = "";
	document.documentElement.className = "";
	scrollIntoView(this);
}).dblclick(function () {
	location.href = this.id.slice(2) + ".html";
});

function findActive(name) {
	$(".active").removeClass("active");
	const activeTab = $("#v-" + name).addClass("active");
	scrollIntoView(activeTab);
	// document.title = $("#iframe").contents().attr("title") + " - " + title;
}

$("#nav-full-size").click(() => {
	var href = $("#iframe")[0].src;
	location.href = href;
});

setInterval(() => {
	document.title = $("#iframe").contents().attr("title") + " - " + title;
}, 1000);

function scrollIntoView(el) {
	if (el instanceof jQuery) el = el[0];
	if (!el) return;
	if ("scrollIntoViewIfNeeded" in el) el.scrollIntoViewIfNeeded();
	else el.scrollIntoView?.();
}
