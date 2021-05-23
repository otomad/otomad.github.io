const $ = item => document.querySelector(item);
const $$ = item => document.querySelectorAll(item);
const rootCSS = property => getComputedStyle(document.documentElement).getPropertyValue("--" + property).trim();
$$(".led,.dot").forEach(item => item.addEventListener("click", function (e) {
	item.classList.toggle("light");
	const b = get_light();
	$("#binary").innerText = "0b" + b;
	$("#hexadecimal").innerText = "0x" + parseInt(b, 2).toString(16).padStart(2, '0');
}));
function get_light() {
	var list = [];
	const led = $$(".led,.dot");
	for (let i = 0; i < led.length; i++)
		list[i] = led[i].classList.contains("light") ? 0 : 1;
	return list.reverse().join('');
}
onload = onresize = () => {
	const margin = 400, // 2 * parseInt(rootCSS("margin"), 10),
		transform = (value => $(".container").style.transform = `scale(${value})`),
		width = $("#led").clientWidth + $("#message").clientWidth,
		height = $("#led").clientHeight;
	if (height < innerHeight) transform(innerWidth / (width + margin));
	else transform(innerHeight / (height + margin));
};
$("#info").onclick = () => $("#led").classList.toggle("skew");