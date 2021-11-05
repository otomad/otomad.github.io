"use strict";
const canvas = document.createElement("canvas"), preview = document.createElement("canvas");
let image, totalCounter = 0, havPic = false;
const getPixelAt = (x, y) => canvas.getContext('2d').getImageData(x, y, 1, 1).data;
function img2br() {
	let cols = parseInt($("#slider_col").val()),
		rows = parseInt($("#slider_row").val()),
		thr = parseInt($("#slider_thres").val()) / 100;
	const c_max = parseInt($("#slider_total").val()),
		thresv = Math.round(255 * 3 * thr);
	function int2br(arr) {
		let sumup = 0;
		const dmat = [1, 8, 2, 16, 4, 32, 64, 128]; // Braille Patterns
		for (let pix = 0; pix < 8; pix++)
			sumup += dmat[pix] * arr[pix];
		return String.fromCharCode(sumup + 10240);
	}
	function resizeImg(width, height) {
		canvas.width = width;
		canvas.height = height;
		canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
	}
	function checkPixel(x, y) {
		const pv = getPixelAt(x, y);
		const a = pv[3] / 255;
		if (thresv >= 0) {
			const r = pv[0] * a + 255 * (1 - a);
			const g = pv[1] * a + 255 * (1 - a);
			const b = pv[2] * a + 255 * (1 - a);
			preview.style.backgroundColor = "#ffffff";
			return +(r + g + b < thresv);
		} else {
			const r = pv[0] * a;
			const g = pv[1] * a;
			const b = pv[2] * a;
			preview.style.backgroundColor = "#000000";
			return +(r + g + b > Math.abs(thresv));
		}
	}
	function checkSec(i, j) {
		const res = [];
		for (let k = 0; k < 8; k++)
			res[k] = checkPixel(3 * i + (k % 2 + 1), 5 * j + ((k / 2 >> 0) + 1));
		return res;
	}
	function pic2brs() {
		while (cols * rows * 0.7 > c_max) {
			cols -= 3;
			rows -= 1;
		}
		while (true) {
			var headFlag = false;
			var strout = "";
			var space_holder = "";
			var new_width = cols * 3 + 1;
			var new_height = rows * 5 + 1;
			resizeImg(new_width, new_height);
			var counter = 0;
			var minLeftSpace = cols;
			var newlineFlag = true;
			for (var j = 0; j < rows; j++) {
				for (var i = 0; i < cols; i++) {
					var tempc = int2br(checkSec(i, j));
					if (tempc == String.fromCharCode(10240))
						space_holder += tempc;
					else {
						headFlag = true;
						strout += space_holder;
						counter += space_holder.length;
						if (minLeftSpace > space_holder.length && newlineFlag)
							minLeftSpace = space_holder.length;
						newlineFlag = false;
						space_holder = "";
						strout += tempc;
						counter += 1;
					}
				}
				if (headFlag) strout += "\n";
				space_holder = "";
				newlineFlag = true;
			}
			if (minLeftSpace > 0) {
				var regh = new RegExp(`^[\\u2800‬]{${minLeftSpace}}`, "ig");
				var reg = new RegExp(`\\n[\\u2800‬]{${minLeftSpace}}`, "ig");
				strout = strout.replace(regh, (kw) => {
					counter -= minLeftSpace;
					return "";
				});
				strout = strout.replace(reg, (kw) => {
					counter -= minLeftSpace;
					return "\n";
				});
				strout = strout.replace(/\n*$/, "");
			}
			if (counter < c_max) {
				totalCounter = counter;
				break;
			} else {
				cols -= 3;
				rows -= 1;
			}
		}
		$("#outputText").val(strout.trim()).each(resizeTextarea);
		if (strout == "")
			$("#outputInfo").text("输出为空，请调整二值化阈值或上传高对比度图片！").css("color", "red");
		else {
			let ocols = 0, orows = 1;
			for (let index = 0, tempcols = 0; index < strout.length; index++) {
				if (strout[index] == "\n") {
					orows++;
					tempcols = 0;
				} else tempcols++;
				if (tempcols > ocols) ocols = tempcols;
			}
			$("#outputInfo").html(`行数：${ocols}，列数：${orows}，字符数：${counter}`);
			if (counter >= 140)
				$("#outputInfo").css("color", "red")[0].innerHTML += " 【注意，字数可能超过限制】";
			else $("#outputInfo").css("color", "");
		}
	}
	pic2brs();
}
function getTextWidth(str) {
	const tempSpan = document.createElement("span");
	tempSpan.style.position = "absolute";
	tempSpan.style.opacity = 0;
	document.body.append(tempSpan);
	tempSpan.innerText = str;
	const width = tempSpan.offsetWidth;
	tempSpan.remove();
	return width;
}
function resizeTextarea() {
	const maxHeight = window.innerHeight * 0.7, maxWidth = window.innerWidth / 2;
	$("#tempCanvas").css({ maxHeight: maxHeight + "px", maxWidth: maxWidth + "px" });
	const textarea = $("#outputText")[0];
	textarea.style.height = "38px";
	let height = textarea.scrollHeight;
	preview.style.height = height + "px";
	if (height > maxHeight) height = maxHeight;
	textarea.style.height = height + "px";
	/* const maxLength = Math.max(...textarea.value.split('\n').map(line => line.length));
	const fontSize = parseInt($(textarea).css("font-size"));
	let width = maxLength * fontSize; */
	let width = getTextWidth(textarea.value);
	preview.style.width = width + "px";
	if (width > maxWidth) width = maxWidth;
	textarea.style.width = width + "px";
}
window.addEventListener("resize", resizeTextarea);
function uploadPhotos(imgfile) {
	imgfile = imgfile.files[0];
	const imageRegExp = /image.*/;
	let reader;
	if (!imageRegExp.test(imgfile.type)) return alert("别放进来奇怪的东西！");
	if (window.FileReader) reader = new FileReader();
	else return alert("抱歉，您的浏览器不支持图片预览功能！");
	reader.onload = readerEvent => {
		canvas.id = "canvas";
		preview.id = "preview";
		havPic = true;
		$("#row-input, #row-output, #outputDiv, #inputDiv, .compare-pictures").removeAttr("hidden")
		$("#introduction")[0].hidden = true;
		// elem("uploadDiv").style.height = "280px";
		image = new Image();
		image.onload = function (imageEvent) {
			const previewWidth = 200;
			const previewHeight = previewWidth * (this.height / this.width);
			preview.width = previewWidth;
			preview.height = previewHeight;
			preview.getContext("2d").drawImage(image, 0, 0, preview.width, preview.height);
			img2br();
		};
		image.src = readerEvent.target.result;
	};
	reader.readAsDataURL(imgfile);
	$("#tempCanvas").append(preview);
}

$(document).ready(() => {
	const slider_row = $("#slider_row");
	const slider_col = $("#slider_col");
	const slider_total = $("#slider_total");
	const slider_thres = $("#slider_thres");
	const showValue = (objName, value, maxValue) => $(objName).html(value + '/' + maxValue);
	function showAllValues() {
		showValue("#value_row", slider_row.val(), slider_row[0].max);
		showValue("#value_col", slider_col.val(), slider_col[0].max);
		showValue("#value_total", slider_total.val(), slider_total[0].max);
		showValue("#value_thres", slider_thres.val(), slider_thres[0].max);
	}
	showAllValues();
	const autoSetTotal = () => slider_total.val(slider_row.val() * slider_col.val());
	slider_row.on("input", () => {
		autoSetTotal();
		showAllValues();
		if (havPic) img2br();
	});
	slider_col.on("input", () => {
		autoSetTotal();
		showAllValues();
		if (havPic) img2br();
	});
	slider_total.on("input", () => showAllValues());
	slider_total.change(() => {
		showAllValues();
		if (havPic) img2br();
	});
	slider_thres.on("input", () => {
		showAllValues();
		if (havPic) img2br();
	});
	$("#copy_btn").click(() => {
		if ($("#outputText").html() != "") {
			$("#outputText").select();
			document.execCommand("copy");
			$("#outputInfo").text("复制成功！").css("color", "green");
		} else {
			$("#outputInfo").text("没有内容可以复制！").css("color", "red");
		}
	});
	$("#reset_btn").click(() => {
		slider_row.val(9);
		slider_col.val(17);
		slider_total.val(140);
		showAllValues();
		if (havPic) img2br();
	});
});