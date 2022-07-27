(function () {
	const declareInnerHeight = () => {
		const innerHeight = window.innerHeight;
		document.documentElement.style.setProperty("--inner-height",
			`min(${innerHeight}px, 100vh)`);
		return innerHeight;
	};
	declareInnerHeight();
	window.addEventListener("load", declareInnerHeight);
	window.addEventListener("resize", async () => {
		let height = NaN, prevHeight = NaN;
		do {
			prevHeight = height;
			height = declareInnerHeight();
			await new Promise(resolve => setTimeout(resolve, 100));
		} while (height != prevHeight);
	});
})();
