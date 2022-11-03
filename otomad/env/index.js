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
const animateOption = { duration: 250, easing };
let marginLeft = "2rem";

$("#other-audio, #other-video, #other-fun").on("keydown", function (e) {
	if (e.key === "Enter") {
		e.preventDefault();
		if (this.textContent.trim() === "") return;
		$(this).parent().before(`<div><input type="checkbox" checked><label>${this.textContent}</label></div>`);
		initLabelFor();
		this.textContent = "";
		const checkGroup = this.parentElement.previousElementSibling;
		marginLeft = `${getAnimationMarginLeft(this, checkGroup)}px`;
		checkGroup.animate([
			{ marginLeft },
			{ },
		], animateOption);
		this.parentElement.animate([
			{ transform: `translateX(-${marginLeft})` },
			{ },
		], animateOption);
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
		removeItem.apply(this);
	}
}).on("mouseup", function () {
	$(`.${PRESS_WHEEL}`).removeClass(PRESS_WHEEL);
}).contextmenu(function (e) {
	if (isMobile()) {
		e.preventDefault();
		removeItem.apply(this);
	}
});

function removeItem() {
	this.animate([
		{ opacity: 1 },
		{ opacity: 0, transform: "scale(0.8)" },
	], animateOption).onfinish = () => {
		const index = $(this).index();
		const parent = this.parentElement;
		this.remove();
		const afters = [...parent.children].slice(index);
		for (const element of afters) {
			element.animate([
				{ transform: `translateX(${marginLeft})` },
				{ },
			], animateOption);
		}
	};
}

function isMobile() {
	return typeof window.orientation !== "undefined";
}

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

function replayAnimation(element, ...className) {
	element.classList.remove(...className);
	window.requestAnimationFrame(() => {
		window.requestAnimationFrame(() => {
			element.classList.add(...className);
		});
	});
}

const removeCrease = element => element.classList.remove("increase", "decrease");

$(".systems > *, .count-checkbox").click(function (e) {
	let count = parseInt(this.dataset.count);
	if (!isFinite(count)) count = 0;
	count++;
	this.dataset.count = count;
	removeCrease(this);
	replayAnimation(this, "increase");
}).contextmenu(function (e) {
	e.preventDefault();
	let count = parseInt(this.dataset.count);
	if (!isFinite(count)) count = 0;
	if (count <= 0) return;
	count--;
	this.dataset.count = count;
	removeCrease(this);
	if (count === 0) delete this.dataset.count;
	replayAnimation(this, "decrease");
});

$("label[for]").click(function () {
	document.getElementById(this.htmlFor).focus();
});

$(".specifications").children().addClass("input other");
$(".input input[type=text], .input [contenteditable]").filter(function () {
	return this.nextElementSibling instanceof HTMLLabelElement;
}).css("text-align", "right");

function saveImage_legacy(yeshu) {
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

/** @param {HTMLElement} yeshu */
function saveImage(yeshu) {
	const hidden = document.createElement("div");
	hidden.classList.add("out-screen")
	document.body.append(hidden);
	const result = document.createElement("html");
	result.lang = document.documentElement.lang;
	result.style.backgroundColor = "white";
	hidden.append(result);
	result.append(yeshu.cloneNode(true));
	document.querySelectorAll(".style").forEach(style => result.prepend(style.cloneNode(true)));
	result.querySelectorAll("input").forEach(input => {
		if (input.checked)
			input.setAttribute("checked", "checked");
	});
	const scaleFactor = backingScale();
	const canvas = document.createElement("canvas");
	canvas.width = $(".stage")[0].scrollWidth * scaleFactor;
	canvas.height = $(".stage")[0].scrollHeight * scaleFactor;
	hidden.append(canvas);
	rasterizeHTML.drawDocument(result, canvas, { zoom: scaleFactor }).then(() => {
		const dataURL = canvas.toDataURL("image/png", 1);
		$("#banner").attr({ src: dataURL }).addClass("img-responsive");
		$("#save-image").addClass("is-saving");
		$(".buttons > :not(#save-image)").each(function () { this.disabled = true; });
		hidden.remove();
	}).then(() => {
		const elink = document.createElement("a");
		elink.style.display = "none";
		elink.href = document.querySelector("#banner").src;
		const lang = document.documentElement.lang;
		const of = lang.startsWith("ja") ? "の" : "的";
		let fileName = $("h1").children(`:lang(${lang})`).text().replaceAll("#", "") + "_" + new Date().toJSON().replace(/\..*|[^\d]/g, "");
		const name = $("#name").text().trim();
		if (name) fileName = name + of + fileName;
		elink.download = fileName;
		document.body.appendChild(elink);
		elink.click();
		document.body.removeChild(elink);
	});
}

function backingScale () {
	if (window.devicePixelRatio && window.devicePixelRatio > 1) {
		return window.devicePixelRatio;
	}
	return 1;
};

function back() {
	$("#banner").removeClass("img-responsive");
	$("#save-image").removeClass("is-saving");
	$(".buttons > :not(#save-image)").each(function () { this.disabled = false; });
}

$("#save-image").click(function () {
	if (!this.classList.contains("is-saving"))
		saveImage($("main")[0]);
	else
		back();
});

$("#otomading").click(function () {
	if (!$(".stage").hasClass("animate")) {
		const isDisableScroll = $(".stage")[0].scrollWidth > $(".stage")[0].offsetWidth ? "" : " disable-scroll-x";
		$(".stage").addClass("animate" + isDisableScroll);
		$("#bgm")[0].play();
	} else {
		$(".stage").removeClass("animate disable-scroll-x");
		$("#bgm")[0].pause();
		$("#bgm")[0].currentTime = 0;
	}
});

$("#bgm").on("timeupdate", function () {
	const buffer = 0.2;
	if (this.currentTime > this.duration - buffer) {
		this.currentTime = 0;
		this.play();
		replayAnimation($(".stage")[0], "animate")
	}
});

$("#add-avatar").click(async function () {
	const image = await openFile();
	$("#avatar").attr("src", image);
});

async function openFile() {
	return await new Promise(resolve => {
		const input = document.createElement("input");
		input.type = "file";
		input.accept = "image/*";
		input.onchange = async () => {
			const file = input.files[0];
			console.log(file);
			const fileReader = new FileReader();
			fileReader.onload = function () { resolve(this.result); };
			fileReader.readAsDataURL(file);
		};
		input.click();
	})
}
