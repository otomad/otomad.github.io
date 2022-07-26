(function () {
	const declareInnerHeight = () =>
		document.documentElement.style.setProperty("--inner-height", window.innerHeight + "px");
	declareInnerHeight();
	["resize", "load"].forEach(type =>
		window.addEventListener(type, declareInnerHeight));
})();
