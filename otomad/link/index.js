var hash = location.hash.replace(/^#/, "");
var searchParams = (function () {
	var search = location.search;
	var paramArray = search.slice(search.indexOf("?") + 1).split("&");
	var params = {};
	for (var i = 0; i < paramArray.length; i++) {
		var pair = paramArray[i].split("=");
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
})();

if (typeof links === "undefined" || !links[hash])
	location.href = "about:blank";
else {
	var link = links[hash];
	link = link.replace(/{{(.*?)}}/g, function (_, param) {
		var pair = param.split("="), key = pair[0], def = pair[1] || "";
		var searchParam = searchParams[key];
		return searchParam || def;
	});
	location.href = link;
}
