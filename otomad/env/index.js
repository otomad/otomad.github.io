function initLabelFor() {
	$("label:not([for])").each(function () {
		const content = getFirstText(this);
		this.htmlFor = content;
		const prev = this.previousElementSibling;
		if (prev instanceof HTMLInputElement && (prev.type === "radio" || prev.type === "checkbox"))
			prev.id = content;
	});
}
initLabelFor();

function getFirstText(node) {
	if (node instanceof Node) {
		if (node instanceof Text)
			return node.textContent.trim() ? node.textContent : undefined;
		for (const n of node.childNodes) {
			const result = getFirstText(n);
			if (result) return result;
		}
	}
}

const easing = "cubic-bezier(0, 0, 0, 1)";

$("#other-audio, #other-video, #other-fun").on("keydown", function (e) {
	if (e.key === "Enter") {
		e.preventDefault();
		if (this.textContent.trim() === "") return;
		$(this).parent().before(`<div><input type="checkbox" checked><label>${this.textContent}</label></div>`);
		initLabelFor();
		this.textContent = "";
		const checkGroup = this.parentElement.previousElementSibling;
		checkGroup.animate([
			{ marginLeft: `${getAnimationMarginLeft(this, checkGroup)}px` },
			{ },
		], {
			duration: 250,
			easing,
		});
	}
});

function getAnimationMarginLeft(input, checkGroup) {
	/** @type HTMLLabelElement */
	const label = input.previousElementSibling;
	/** @type HTMLInputElement */
	const checkbox = checkGroup.firstChild;
	const p = parseFloat;
	let value = (p($(label).width()) + p($(label).css("margin-right"))) - (p($(checkbox).width()) + p($(checkbox).css("margin-right")) + p($(checkbox).css("border-right-width")) + p($(checkbox).css("border-left-width")));
	return value;
}

const GRID_ITEM = ".grids > :not(.other)";
const PRESS_WHEEL = "press-wheel";
$(document).on("mousedown", GRID_ITEM, function (e) {
	if (e.button === 1)
		$(this).addClass(PRESS_WHEEL);
}).on("mouseup", GRID_ITEM, function (e) {
	if (e.button === 1 && $(this).hasClass(PRESS_WHEEL)) {
		this.animate([
			{ opacity: 1 },
			{ opacity: 0, transform: "scale(0.8)" },
		], {
			duration: 250,
			easing,
		}).onfinish = () => this.remove();
	}
}).on("mouseup", function () {
	$(`.${PRESS_WHEEL}`).removeClass(PRESS_WHEEL);
});

window.addEventListener("mousedown", e => {
	if (e.button === 1)
		e.preventDefault();
});

$("input[name=language]").change(function () {
	if (this.checked) {
		const lang = this.dataset.lang;
		document.documentElement.lang = lang;
		location.hash = lang;
	}
});

window.addEventListener("hashchange", onHashChange);
onHashChange();
function onHashChange() {
	const lang = location.hash.slice(1);
	const id = new Map([
		["ja", "japanese"],
		["zh-CN", "chinese"],
	]).get(lang);
	if (!id) return;
	$(`#${id}`).click();
}

$(".systems > *, .count-checkbox").click(function (e) {
	let count = parseInt(this.dataset.count);
	if (!isFinite(count)) count = 0;
	count++;
	this.dataset.count = count;
}).contextmenu(function (e) {
	e.preventDefault();
	let count = parseInt(this.dataset.count);
	if (!isFinite(count)) count = 0;
	if (count <= 0) return;
	count--;
	this.dataset.count = count;
	if (count === 0) delete this.dataset.count;
});

$("label[for]").click(function () {
	document.getElementById(this.htmlFor).focus();
});

$(".specifications").children().addClass("input other");
$(".input input[type=text], .input [contenteditable]").filter(function () {
	return this.nextElementSibling instanceof HTMLLabelElement;
}).css("text-align", "right");

function saveImage(yeshu) {
	//创建一个新的canvas
	const canvas = document.createElement("canvas");

	let w = Math.ceil(parseFloat(window.getComputedStyle(yeshu).width));
	let h = Math.ceil(parseFloat(window.getComputedStyle(yeshu).height));

	//将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
	canvas.width = w * 2;
	canvas.height = h * 2;
	canvas.style.width = w + "px";
	canvas.style.height = h + "px";

	console.log(canvas)
	html2canvas(yeshu, {
		canvas: canvas,
		scale: 2
	}).then(function (canvas) {
		const dataURL = canvas.toDataURL("image/png", 1);
		$("#banner").attr({ src: dataURL }).addClass("img-responsive");
		$("#save-image").addClass("is-saving");
		$("#otomading")[0].disabled = true;
	}).then(function () {
		/* var elink = document.createElement("a");
		elink.style.display = "none";
		elink.href = document.querySelector("#banner").src;
		elink.download = "Logo-Yeshu.png";
		document.body.appendChild(elink);
		elink.click();
		document.body.removeChild(elink); */
	});
};

function back() {
	$("#banner").removeClass("img-responsive");
	$("#save-image").removeClass("is-saving");
	$("#otomading")[0].disabled = false;
}

$("#save-image").click(function () {
	if (!this.classList.contains("is-saving"))
		saveImage($("main")[0]);
	else
		back();
});

$("#otomading").click(function () {
	if (!$(".stage").hasClass("animate")) {
		$(".stage").addClass("animate");
		$("#bgm")[0].play();
	} else {
		$(".stage").removeClass("animate");
		$("#bgm")[0].pause();
		$("#bgm")[0].currentTime = 0;
	}
});

$("#bgm").on("timeupdate", function () {
	const buffer = 0.2;
	if (this.currentTime > this.duration - buffer) {
		$(".stage").removeClass("animate");
		void $(".stage").offsetWidth;
		this.currentTime = 0;
		this.play();
		$(".stage").addClass("animate");
	}
});
