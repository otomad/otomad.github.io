Math.randBetween = (min, max) => {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}
React.root = id => {
	var el = document.getElementById(id);
	if (el === null) {
		el = document.createElement("div");
		el.id = id;
		document.body.append(el);
	}
	return el;
}