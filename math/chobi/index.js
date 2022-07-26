var realTimeSlide, way = 0,
	filterId = -1, customModule = "rgb",
	enableThumb = true, filterArray = [];

var imgObj = null, //global Chobi object
	imgThumb = null;

const btns = ".btn-group-04 button",
	smallScreen = 992;

testpic = "test.jpg";
// testMode();
// showButtons();

$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();
});

function showWatermark(imgElem) {
	//watermark parameters	(imageElement, amount, startX, startY, width, height, callback)
	imgObj.watermark(imgElem, 2, 0, 0, imgObj.imageData.width, imgObj.imageData.height, function () {
		imgObj.loadImageToCanvas();
	});
}

$(btns).attr("data-custom", false).each(function () {
	let text = this.innerHTML;
	this.innerHTML = `<canvas width="90" height="90"></canvas><span>${text}</span>`;
}).not(".btn").addClass("btn btn-outline-success mb-1");
for (let i = 0; i < 10; i++)
	$(".btn-group-04").append('<div class="item-temp"></div>');

$(".nav-item a").click(function () {
	customModule = this.getAttribute("href").replace("#", "").replace(/Tab/i, "");
	var okBtn = $("#new-filter");
	if (customModule == "help") okBtn.attr("disabled", "disabled");
	else okBtn.removeAttr("disabled");
});
//custom filter (india flag)
function cfne(exist) {
	const cfne = $("#custom-filter-name-exists");
	if (exist === false) cfne.html('').attr("class", "");
	else if (exist === true) cfne.html("将会更新已有自定义滤镜").attr("class", "text-warning");
	else cfne.html("该名称已被内置滤镜占用").attr("class", "text-danger");
}
$("#your-filter-name").on('input propertychange change', function () {
	const name = this.value,
		exist = Chobi.myFilterList.has(name),
		okBtn = $("#new-filter");
	$("#your-filter-name").attr("class", "form-control" + (!exist ? '' : " is-" + (exist === true ? "warning" : "invalid")));
	cfne(exist);
	if (exist === "built") okBtn.addClass("disabled");
	else okBtn.removeClass("disabled");
});
$("#new-filter").click(myFilter);
function v(id, val) {
	if (val !== undefined) return $("#val" + id).val(val);
	return $("#val" + id).val();
}
function myFilter() {
	$(".form-control").removeClass("is-invalid");
	let amountDefault = $("#your-filter-amount-default").val();
	if (customModule == "help") return true;
	{	//验证数据合法性。下面这个示例的颜色就是Windows经典主题的默认灰色。
		let r = 212, g = 208, b = 200, a = 255, h = 27.625, s = 30.855, l = 205.785, amount = 255;
		function legal(n) {
			return ((typeof n === "number") && (isFinite(n)));
		}
		function t(n) {
			return (!legal(eval(v(n))));
		}
		const st = "R,G,B,A,H,S,L,Al".split(',');
		for (let i of st) {
			if (v(i) === '') v(i, i[0]);
			v(i, v(i).toLowerCase().replace(/(?<![a-zA-Z0-9])c(?![a-zA-Z0-9])/gi, i[0].toLowerCase()).replace(/math/gi, "Math").replace(/pi/gi, "PI").replace(/Math\.e/gi, "Math.E"));
		}
		let d = (customModule == "hsl" ? "H,S,L,Al".split(',') : "RGBA");
		try {
			var j;
			for (j of d)
				if (t(j)) throw j;
		} catch (e) {
			console.error(e + "\n" + j + " 表达式错误！");
			$("#val" + j).addClass("is-invalid");
			return j;
		}
		var filterName = $("#your-filter-name").val();
		if (filterName === "") filterName = $("#your-filter-name").attr("placeholder");
		/* if (Boolean(Chobi.prototype[filterName]) || myFilterList.includes(filterName)) {
			$("#your-filter-name").addClass("is-invalid");
			// $("#custom-filter-name-exists").fadeIn();
			return true;
		} else myFilterList.push(filterName); */
		const exist = Chobi.myFilterList.has(filterName);
		Chobi.myFilterList.add.apply(Chobi.myFilterList, [filterName, customModule, (amountDefault === '' ? null : amountDefault - 0), ...(customModule == "rgb" ? [v('R'), v('G'), v('B'), v('A')] : [v('H'), v('S'), v('L'), v('Al')])]);

		////

		//由于eval函数太垃圾，试图通过插入函数的方法解决
		/* let d=(customModule=="hsl"?"HSLA":"RGBA"),
			scriptTag='<script id="tempCustomFunction">';
		for(let i of d)
			scriptTag += `
			function temp${i}(list) {
				var r,g,b,h,s,l,a;
				[r,g,b,h,s,l,a]=list;
				return (${v(i)});
			}
			`;
		scriptTag += "</script\>"; 
		//script 关标签最好加一个转义符号，否则可能会被 HTML 检测到，把现在目前的整个 script 标签给关了。
		$("body").append(scriptTag); */
		let tempVar = {};
		for (let k of d)
			tempVar[k[0].toLowerCase()] = v(k);
		Chobi.prototype[filterName] = new Function("amount = 0", "channel = defaultChannel", `
			var imageData = this.imageData;
			for (var i = 0; i < imageData.width; i++) {
				for (var j = 0; j < imageData.height; j++) {
					var index = (j * 4) * imageData.width + (i * 4),
						r = imageData.data[index],
						g = imageData.data[index + 1],
						b = imageData.data[index + 2],
						a = imageData.data[index + 3],
						hsl = RGB2HSL(r,g,b),
						h = this.map(hsl.H,0,360,0,255),
						s = this.map(hsl.S,0,1,0,255),
						l = this.map(hsl.L,0,1,0,255);
					${customModule == "rgb" ? `
					var nr = ${tempVar.r},
						ng = ${tempVar.g},
						nb = ${tempVar.b};
					`: `
					var nh = (channel.H ? imgObj.map(${tempVar.h},0,255,0,360) : imgObj.map(h,0,255,0,360)),
						ns = (channel.S ? imgObj.map(${tempVar.s},0,255,0,1) : imgObj.map(s,0,255,0,1)),
						nl = (channel.L ? imgObj.map(${tempVar.l},0,255,0,1) : imgObj.map(l,0,255,0,1)),
						nrgb = HSL2RGB(nh,ns,nl),
						nr = nrgb.R,
						ng = nrgb.G,
						nb = nrgb.B;
					`}
					var na = ${tempVar.a};
					if(channel.R) imageData.data[index] = nr;
					if(channel.G) imageData.data[index + 1] = ng;
					if(channel.B) imageData.data[index + 2] = nb;
					if(channel.A) imageData.data[index + 3] = na;
				}
			}
			return this;
		`);

		let orig = $("#fx-orig canvas")[0],
			newFilterThumb;
		if (!exist) {
			var newFilterButton = `
				<button data-amount="${amountDefault}" value="${filterName}" class="${$(btns)[1].className}" data-custom="true">
					<canvas width="90" height="90" id="new-filter-thumb"></canvas>
					<span>${filterName}</span>
				</button>
			`;
			$("[value='custom']").before(newFilterButton);
			newFilterThumb = $("#new-filter-thumb");
		} else {
			newFilterThumb = $(`[value='${filterName}']`).children("canvas");
		}
		if (enableThumb) {
			imgThumb.canvas = newFilterThumb[0];
			imgThumb[filterName]();
			imgThumb.loadImageToCanvas();
			imgThumb.changeImageData(orig);
		}
		newFilterThumb.removeAttr("id");
	}
	/* if(!($("#overlay").prop("checked")))
		reset();
	filterId = "custom"
	filter();
	imgObj.loadImageToCanvas();
	
	
	function filter() {
		var height = imgObj.imageData.height,
			width = imgObj.imageData.width;
		for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {
				var pixel = imgObj.getColorAt(i, j),
					pixelhsl=RGB2HSL(pixel.red,pixel.green,pixel.blue);
					var r=pixel.red,
						g=pixel.green,
						b=pixel.blue,
						a=pixel.alpha,
						h=imgObj.map(pixelhsl.H,0,360,0,255),
						s=imgObj.map(pixelhsl.S,0,1,0,255),
						l=imgObj.map(pixelhsl.L,0,1,0,255),
						c=[r,g,b,h,s,l,a];
				var newR,newG,newB,newA;
				if(customModule=="rgb"){
					newR=tempR(c);
					newG=tempG(c);
					newB=tempB(c);
				} else {
					var newH=imgObj.map(tempH(c),0,255,0,360),
						newS=imgObj.map(tempS(c),0,255,0,1),
						newL=imgObj.map(tempL(c),0,255,0,1),
						newC=HSL2RGB(newH,newS,newL);
					newR=newC.R;
					newG=newC.G;
					newB=newC.B;
				}
				newA=tempA(c);
				pixel.red = newR;
				pixel.green = newG;
				pixel.blue = newB;
				pixel.alpha = newA;
				imgObj.setColorAt(i, j, pixel);
			}
		}
		$("#tempCustomFunction").remove();
	} */
	$("#custom-filter-modal").modal('hide').find("input").val('').change();
	return false;
}

function loadImage(elem) {
	filterId = "reset";
	$("#slider,#slider-num").addClass("translucent");
	//you should probably check if file is image or not before passing it
	imgObj = new Chobi(elem);
	imgObj.ready(function () {
		this.canvas = $("#original")[0];
		this.loadImageToCanvas();
		this.canvas = $("#canvas")[0];
		this.loadImageToCanvas();
		gridChange();

		if (enableThumb) {	//缩略图部分
			let orig = $("#fx-orig canvas")[0];
			this.thumbImageData(orig, orig.width, orig.height);
			for (let i = 0; i < 2; i++)
				this.copyImageData(orig, $(".btn-group-04 .btn-outline-warning canvas")[i]);
			imgThumb = new Chobi(orig);
			imgThumb.ready(function (orig) {
				let fx = $(".btn-group-04 button:not(.notFx) canvas");
				for (let i = 0; i < fx.length; i++) {
					let filterName = fx[i].parentNode.value;
					this.canvas = fx[i];
					this[filterName]();
					this.loadImageToCanvas();
					this.changeImageData(orig);
				}
			});
			imgThumb.onload(orig);
			{	//主色调部分
				var colors = RGBaster.colors(orig, {
					paletteSize: 1,
					success: function (colors) {
						console.log("Dominant color:", colors.dominant);
						$("#canvas, #original").css({
							"border-color": colors.dominant,
							"background-color": colors.dominant
						});

						//补充进行的操作
						$("#filters").show();
						// delete imgThumb;
					}
				});
			}
		}
	});

	//show filters to users
	showButtons(!enableThumb);
}

function showButtons(special = true) {
	$(btns).removeClass("active")
	$("#fx-orig").addClass("active");
	$("#start-info").hide();
	if (special) $("#filters").show();
	gridChange();
}

function new_eval(str) {
	var fn = Function;
	return new fn('return ' + str)();
}

function getChannelValue() {
	const c = "rgbhsla";
	var v = {};
	for (let i of c)
		v[i.toUpperCase()] = ($("#channel-" + i).attr("checked") !== undefined);
	return v;
}

function getChannelName(channel) {
	const c = "rgbhsla".toUpperCase();
	var name = "";
	for (let i of c)
		if (channel[i]) name += i;
	return name;
}

function testMode() {
	if (testpic === undefined) return;
	way = 2;
	loadImage(testpic);
}

function downloadImage() {
	if (imgObj == null) {
		$("#error").fadeIn();
		setTimeout(() => $("#error").fadeOut(), 4000);
	} else imgObj.download(newDate(), "png");
}

function newDate() {
	return (new Date().format("yyyyMMddhhmmssSSS"));
}

//filter chaining is also possible, like imgObj.brightness(-5).sepia().negative();
$(document).on("click", ".btn-group-04 button:not(.notFx)", function () {
	var val = this.value,
		amount = this.dataset.amount;
	if (amount !== "" && isFinite(amount))
		$("#slider,#slider-num").removeClass("translucent").val(amount);
	else
		$("#slider,#slider-num").addClass("translucent");
	filter(undefined, val);
});

$(document).on("click", btns, function () {
	$(btns).removeClass("active")
	$(this).addClass("active");
});

$(document).on("click", ".layer-close", function () {
	//每次更新列表都需要重新声明该按钮的事件
	var index = (filterArray.length - 1) - $(this).parent().index();
	filterArray.splice(index, 1);
	$(this).parent().remove();
	if (filterArray.length === 0) $("#fx-orig").click();
	else {
		reactiveButton();
		$("#slider,#slider-num").val(filterArray[filterArray.length - 1].amount);
		if ($(`button[value="${filterArray[filterArray.length - 1].filter}"`).data("amount") !== "")
			$("#slider,#slider-num").removeClass("translucent");
		else
			$("#slider,#slider-num").addClass("translucent");
	}
	rearrangeFilter(index);
	$("#layer").dropdown('update');
});

$("#fx-layer-list").bind('DOMSubtreeModified', function (e) {
	$("#auto-hidden-divider")[this.innerHTML === "" ? "hide" : "show"]();
});

function reactiveButton() {
	$(btns).removeClass("active");
	$(filterArray.length ? `.btn-group-04 button[value='${filterArray[filterArray.length - 1].filter}']` : "#fx-orig").addClass("active");
}

function filter(_id, value) { // id 的方法不用了
	if (value === undefined) return null;
	if (imgObj == null) {
		alert("选择张照片先!");
		return null;
	}
	var slider = document.getElementById("slider").value - 0,
		overlay = document.getElementById("overlay").checked;
	channel = getChannelValue();
	if (!overlay) reset();
	{
		filterArray.push({
			filter: value,
			amount: slider,
			channel: channel
		});
		var layerItem = $("#layer-item")[0].content.children[0].cloneNode(true),
			filterName = $(`button[value="${value}"]`).text();
		$(layerItem).children(".layer-name").text(filterName);
		$(layerItem).children(".layer-attr").text(slider + ' | ' + getChannelName(channel));
		$("#fx-layer-list").prepend(layerItem);
	}
	filterId = value;
	imgObj[value](slider, channel);
	filterArray[filterArray.length - 1].data = imgObj.imageData.data.slice();
	imgObj.loadImageToCanvas();
}

function reset(clear = true, AC = false) {
	if (AC) $("#slider,#slider-num").addClass("translucent").val(0);
	if (clear) {
		filterId = "reset";
		filterArray = [];
		$("#fx-layer-list").html("");
	}
	imgObj.changeImageData($("#original")[0]).loadImageToCanvas();
}
/* $("#slider").on("mousedown touchstart", function () {
	realTimeSlide = setInterval(function () {
		$("#slider-num").val($("#slider").val());
	}, 10);
}); */
setInterval(function () {
	$("#slider-num").val($("#slider").val());
}, 10);
$("#slider").on("mouseup touchend change", function () {
	// clearInterval(realTimeSlide);
	if (filterId != "reset" && filterId != "custom") {
		filterArray[filterArray.length - 1].amount = this.value - 0;
		filterArray[filterArray.length - 1].channel = getChannelValue();
		var latestLayer = $("#fx-layer-list").children()[0];
		$(latestLayer).children(".layer-attr").text(this.value + ' | ' + getChannelName(getChannelValue()));
	}
	rearrangeFilter(filterArray.length - 1);
});
$("#slider").dblclick(function () {
	var defaultValue = $(".btn-group-04 button.active").data("amount") - 0;
	$(this).val(defaultValue).mousedown().mouseup();
	$("#slider-num").val(defaultValue);
});
$("#slider-num").on('input propertychange change', function () {
	if ($(this).val() == "") return;
	var v = parseInt($(this).val());
	if (v > 255) v = 255;
	if (v < -255) v = -255;
	$(this).val(v);
	$("#slider").val(v).mouseup();
});
$("#modal-ok-button").click(function () {
	way = 1;
	loadImage($("#path").val());
});
$("#path").on("input propertychange change", function () {
	$("#modal-ok-button")[0].disabled = !this.value.length;
});
$("#image-password").on("input propertychange change", function () {
	$("#image-password-ok-button")[0].disabled = !this.value.length;
});

Date.prototype.format = function (format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S+": this.getMilliseconds() //millisecond
	}
	if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] :
					("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

/* $("[name='color-module']").click(function(){
	if(this.id=="rgb-module") {
		$("#valR,#valG,#valB").removeAttr("disabled");
		$("#valH,#valS,#valL").attr("disabled","disabled");
		customHSLModule=false;
	} else {
		$("#valR,#valG,#valB").attr("disabled","disabled");
		$("#valH,#valS,#valL").removeAttr("disabled");
		customHSLModule=true;
	}
}); */
$("[for]").dblclick(function () { //$(".input-group-prepend label")
	$('#' + this.htmlFor).val("");
});

$.fn.rmcss = function () {
	return this.removeAttr("style");
}
window.addEventListener("load", () => gridChange());
window.addEventListener("resize", async () => {
	let scale = NaN, prevScale = NaN;
	do {
		gridChange();
		await new Promise(resolve => setTimeout(resolve, 100));
		prevScale = scale;
		scale = parseFloat(($("#canvas")[0].style.transform.match(/(?<=scale\().*(?=\))/) ?? [NaN])[0]);
	} while (scale != prevScale);
});
function gridChange() { // grid系统
	if ($("#canvas-part")[0].clientWidth < $("#canvas")[0].clientWidth)
		$("#canvas,#original").css("transform", `scale(${$("#canvas-part")[0].clientWidth / $("#canvas")[0].clientWidth})`)
	else
		$("#canvas,#original").css("transform", "scale(1)");
}
document.onkeydown = e => {
	if (e.key == "Enter") {
		if ($("#path").is(":focus")) $("#modal-ok-button").click();
		if ($("#custom-filter-modal").hasClass("show")) $("#new-filter").click();
		if ($("#image-password-modal").hasClass("show")) $("#image-password-ok-button").click();
	}
}
$("#channel-dropdown-menu .dropdown-item").click(function () {
	if ($(this).attr("checked") === undefined) $(this).attr("checked", "checked");
	else $(this).removeAttr("checked");
	$("#slider").mouseup();
});
function rearrangeFilter(start) {
	reset(false);
	var i = 0;
	if (start !== undefined && filterArray[start - 1] !== undefined && isFinite(start)) {
		// imgObj.imageData.data = filterArray[start - 1].data.slice();
		imgObj.rewriteImageData(filterArray[start - 1].data);
		i = start;
	}
	for (i; i < filterArray.length; i++) {
		imgObj[filterArray[i].filter](filterArray[i].amount, filterArray[i].channel);
		filterArray[i].data = imgObj.imageData.data.slice();
	}
	imgObj.loadImageToCanvas();
}
String.prototype.i = function (index, character = "") {
	return this.slice(0, index) + character + this.slice(index + 1);
}
$("#your-filter-amount-default").on('input propertychange change', function () {
	var value = this.value;
	for (let i = 0; i < value.length; i++)
		if (!(value[i] >= '0' && value[i] <= '9' || value[i] === '-' && i === 0))
			value = value.i(i);
	if (value > 255) value = 255;
	if (value < -255) value = -255;
	this.value = value;
});
$("#custom-filter-modal").on('hidden.bs.modal', function (e) {
	reactiveButton();
});
$("#custom-filter-modal").on('show.bs.modal', function (e) {
	$("#your-filter-name").attr("placeholder", "myFilter " + newDate());
});
// $("#custom-filter-modal").modal("show");

function clearCustomFilterInput() {
	$("#custom-filter-modal").find("input").val('').change();
}

$(btns).each(function () {
	this.oncontextmenu = e => e.preventDefault();
});
$.contextMenu({
	selector: btns + "[data-custom=true]",
	items: {
		edit: {
			name: "编辑",
			callback: (_key, opt) => {
				const el = opt.$trigger,
					name = el.val(),
					data = Chobi.myFilterList.data[name],
					model = data.model.toLowerCase();
				clearCustomFilterInput();
				$("#custom-filter-modal").modal("show");
				$(`[href="#${model}Tab"]`).click();
				$("#your-filter-name").val(name).change();
				$("#your-filter-amount-default").val(data.amountDefault);
				var st;
				if (model == "rgb") st = "R,G,B,A".split(',');
				else if (model == "hsl") st = "H,S,L,Al".split(',');
				for (const i of st)
					v(i, data[i[0]]);
			}
		},
		delete: {
			name: "删除",
			callback: (_key, opt) => {
				const el = opt.$trigger,
					name = el.val();
				console.log("delete " + delete Chobi.prototype[name]);
				Chobi.myFilterList.remove(name);
				el.remove();
			}
		},
	}
});

//横向滚动
document.addEventListener('DOMMouseScroll', handler, false);
document.addEventListener('mousewheel', handler, false);
function handler(event) {
	if (innerWidth < smallScreen) {
		const scrollStep = 400, // 57
			el = $(".btn-group-04");
		if (el.is(':hover')) {
			var detail = event.wheelDelta || event.detail;
			var step = scrollStep * (detail < 0 ? 1 : -1);
			el[0].scrollLeft += step;
		}
	}
}

$("#input-path").on("shown.bs.modal", function () {
	if (navigator.userAgentData.mobile === false) // 注意必须是 false，不能是 undefined。
		$("#path").select().focus();
});
$("#image-password-modal").on("shown.bs.modal", function () {
	if (navigator.userAgentData.mobile === false) // 注意必须是 false，不能是 undefined。
		$("#image-password").select().focus();
});

$("#image-password-ok-button").click(function () {
	const password = $("#image-password").val();
	if (password == null || password == "") return;
	if (imgObj == null) {
		alert("选择张照片先!");
		return null;
	}
	const overlay = document.getElementById("overlay").checked;
	if (!overlay) reset();
	filterId = "imagePassword";
	channel = getChannelValue();
	imgObj.imagePassword(password, $("#image-password-method").val(), channel);
	// filterArray[filterArray.length - 1].data = imgObj.imageData.data.slice();
	imgObj.loadImageToCanvas();
});
