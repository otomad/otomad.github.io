"use strict";

/* 
 * 前排说明：
 * 主文档中要包含三个函数，分别为：
 ** turntable.startToDo = function(active)
 ** turntable.result = function(active, reward)
 ** turntable.information = function(text)
 ** turntable.canBeStart = function()
 * 使用“createTurntable()”函数创建转盘，要求必须包含参数且参数不能为单数。
 */

var size = 280, //转盘初始尺寸
	margin = 80, //转盘与页面预留的边距
	defaultSpeed = 2, //初始默认速度，单位：转每秒
	activeCir = 0, //激活状态的转盘
	cir = [], //转盘数组
	finRunning = false, //猜拳器运动状态
	direct = 1, //旋转方向：1为顺时针，-1为逆时针
	useStay = false, //使用留下：现实惯性/理想骤止
	rendered = false, //react渲染虚拟DOM完成？
	pattern = 1, //旋转轴：1为指针旋转，0为转盘旋转
	regularity = true, //模式：钩(true)是指针或转盘旋转，叉(false)是用手点
	alternating = false, //钩叉交替闪烁状态
	// first = true, //刚开始进入？

	u; //u就是undefined。其实就是懒得每次添加一项就得把上面的逗号换成分号

var iconlist = {
	rotating: '',
	stop: '',
	inertiaOn: '',
	inertiaOff: '',
	clockwise: '',
	counterclockwise: '',
	speedUp: '',
	speedDown: '',
	pointerRotate: '',
	turntableRotate: '',
	check: '',
	cross: '',
	giveup: '',
	notGiveup: '',
	random: '',
	loading: '',
	fist: '✊\ufe0f',
	scissors: '✌\ufe0f',
	cloth: '🖐\ufe0f',
	top: '',
	color: '',
	noHammer: '',
	touch: '',
	mouseOrTouch: '',
	customCircle: ''
}

var pref = {
	rbtnPlace: "right",
	themeColor: 0,
	showFG: true
}

//sound
var fingerMusic = new Audio("music/jingle_bell.ogg");
var wrapperMusic = new Audio("music/ending_theme.ogg");
$plenty(fingerMusic, wrapperMusic).bind("ended", function() {
	this.play();
});

//常用操作。手动变量提升……
var NightTime = {
	darkBackgroundColor: "var(--darkbody)",
	lightBackgroundColor: "var(--lightbody)"
}
window.onresize = reScale; //改变窗口大小执行
function getDeg(obj) { //获得transform矩阵的角度
	function getmatrix(a, b, c, d, e, f) {
		var aa = Math.round(180 * Math.asin(a) / Math.PI);
		var bb = Math.round(180 * Math.acos(b) / Math.PI);
		var cc = Math.round(180 * Math.asin(c) / Math.PI);
		var dd = Math.round(180 * Math.acos(d) / Math.PI);
		var deg = 0;
		if (aa == bb || -aa == bb)
			deg = dd;
		else if (-aa + bb == 180)
			deg = 180 + cc;
		else if (aa + bb == 180)
			deg = 360 - cc || 360 - dd;
		return deg >= 360 ? 0 : deg;
	}
	var matrix;
	if ((typeof obj == 'string') && obj.constructor == String)
		matrix = obj;
	else if (obj instanceof jQuery)
		matrix = obj.css('transform');
	else if (obj instanceof HTMLElement)
		matrix = getComputedStyle(obj).transform;
	else return NaN;
	return ((matrix + "").slice(0, 7) != "matrix(") ? NaN : eval('get' + matrix);
}
//可以同时返回值的控制台操作
console.pwarn = text => { //警告
	console.warn(text);
	return text;
}
console.plog = text => { //普通消息
	console.log(text);
	return text;
}
console.perror = text => { //错误
	console.error(text);
	return text;
}

//jQuery 偷懒操作
$.fn.rbtntxt = HTMLElement.prototype.rbtntxt = function(text) { //对“.round-button”的文本进行修改
	$("#" + $(this).attr("id") + " i").text(text);
	return $(this);
}
$.fn.active = HTMLElement.prototype.active = function(active = true) { //按钮呈活跃状态（不是按下）
	return active ? $(this).addClass("active") : $(this).removeClass("active");
}
$.fn.disabled = HTMLElement.prototype.disabled = function(disabled = true) { //按钮呈禁用状态
	return disabled ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled");
}
$.fn.shine = HTMLElement.prototype.shine = function() { //按钮闪烁一下
	setTimeout(() => this.active(0), 500);
	return $(this).active();
}
$.fn.changeTooltip = HTMLElement.prototype.changeTooltip = function(text) { //修改bootstrap的工具提示条文本
	return $(this).attr('title', text).tooltip('_fixTitle');
}
$.fn.appTag = function(tag, id = "", className = "", content = "") { //jQuery新建HTML标签
	if (typeof tag == "object") {
		var obj = tag,
			u; //u 就是 undefined
		tag = obj.tag;
		if (obj.id != u) id = obj.id;
		if (obj.className != u) className = obj.className;
		if (obj.content != u) content = obj.content;
	} else if (typeof tag != "string") return this;
	return this.append(`<${tag} id="${id}" class="${className}">${content}</${tag}>`);
}
$.fn.cardResize = function() {
	var curHeight = this.height(),
		autoHeight = this.css('height', 'auto').height(),
		curWidth = this.width(),
		autoWidth = this.css('width', 'auto').width();
	this.height(curHeight).width(curWidth).animate({
		height: autoHeight,
		width: autoWidth
	}, 250, "easeInOutCubic");
}

function $plenty(...arg) {
	/* if (Object.prototype.toString.call(query) !== "[object Array]")
		query = [query]; */
	var jq = $();
	for (let i of arg)
		jq.add(arg);
	return jq;
}

function lightStopTwink(mode = 1) {
	if (mode) { //js处理法
		$(".light").attr("class", "light");
		for (var i = 0; i < 6; i++) {
			setTimeout(function(even) {
				$(".light").css("opacity", !even - 0);
			}, i * 70, i % 2 == 0)
		}
	} else { //css处理法
		$(".light").attr("class", "light");
		setTimeout(() => $(".light").attr("class", "light light-stop-twink"), 5);
	}
}
String.prototype.reserveNum = function() { //仅保留字符串中的数字部分
	var n = "";
	for (var i = 0; i < this.length; i++)
		if (this[i] >= '0' && this[i] <= '9' || this[i] == '-' || this[i] == '.' || this[i] == 'e')
			n += this[i];
	return n - 0;
}
Math.randBetween = (min, max) => { //生成给定两个数之间随机的整数 //好吧我错了，根据Math.random()的特性，max所在的整数是取不到的
	return Math.floor(Math.random() * (max - min) + min);
}
Audio.prototype.replay = function(time = 0) { //重新播放音频
	this.currentTime = time;
	this.play();
}
Math.PNMod = (a, b) => { //主要针对负数的一个拟定的取模，使其更适合实际使用，返回一个非负数
	if (b == 0) return NaN;
	b = Math.abs(b);
	/* while(a<0)
		a+=b;
	return a%b; */ //我怀疑这样写会影响性能和精度
	var i = 0;
	while (a + b * i < 0)
		i++;
	return (a + b * i) % b;
}
String.prototype.replaces = function(stra, strb, sep = ",") { //字符串批量替换
	var s = this.valueOf(),
		a = stra,
		b = strb;
	if (!Array.isArray(stra)) a = stra.split(sep);
	if (strb) {
		if (!Array.isArray(strb)) b = strb.split(sep);
		for (var i = 0; i < a.length; i++)
			s = s.replace(new RegExp(a[i], "g"), b[i])
	} else
		for (var i = 0; i < a.length; i++)
			s = s.replace(new RegExp(a[i], "g"), "")
	return s;
}
String.prototype.finds = function() { //字符串查找指定字符的数目
	var n = 0,
		arg = arguments;
	if (arguments.length == 1)
		arg = arguments[0].split(",");
	for (var i = 0; i < arg.length; i++)
		for (var j = 0; j < this.length; j++)
			if (this[j] == arg[i])
				n++;
	return n;
}
$.fn.hasAttr = function(attr) { //是否包含某个attr
	return typeof this.attr(attr) !== "undefined";
}

function findTurntable(el, obj = true) { //查找转盘，返回对象(obj==true)或序号(obj==false)
	if (typeof el !== "object" || el instanceof HTMLElement) el = $(el);
	var whole = el.parents(),
		idg = [];
	if (whole.length === 0) return null;
	for (let i of whole)
		if (i.id !== '')
			idg.push(i.id);
	for (let j of cir)
		for (let k of idg)
			if (j.id === k)
				return (obj ? j : j.serial())
	return null;
}

function rootCSS(source, name) { //查找样式表中root的某个样式属性的值
	var i, css = document.styleSheets;
	for (i = 0; i < css.length; i++)
		if (css[i].href.includes(source)) break;
	if (i >= css.length) return null;
	css = css[i].cssRules;
	for (i = 0; i < css.length; i++) {
		if (css[i].selectorText == ":root") {
			var txt = css[i].cssText,
				a = txt.indexOf(name);
			if (a == -1) continue;
			a += name.length;
			return txt.slice(a, txt.indexOf(";", a)).replace(":", "").trim();
		}
	}
	if (i >= css.length) return null;
}

var defaultRandomTime = rootCSS("turntable.css", "--default-random-time").reserveNum(), //随机旋转的预设旋转时间（这个在 CSS 中修改）
	onRotation = () => { //是否正在旋转
		for (let i of cir)
			if (i.rotating)
				return true;
		return false;
	}

////

class turntable { //转盘对象
	constructor(id, info = "") {
		this.id = id;
		this.sid = "#" + id; //井号开头的id，用于jQuery
		this.info = info; //转盘说明，比如投币一次几元
		this.speed = defaultSpeed; //转盘速度，单位：转每秒
		this.num = $(this.sid).children().length; //返回扇形数目
		this.rotating = false; //正在转动？
		this.list = []; //转盘奖项列表
		this.data = []; //转盘数据列表
		this.dom = {
			own: document.getElementById(this.id)
		}
		this.jq = { //以下是一堆返回转盘各种元素的jQuery对象的玩意
			child: () => $(this.sid).children(), //仅在 react render 前可用
			grid: () => $(this.sid /*+" .grid"*/ ),
			circular: () => $(this.sid + " .circular"),
			list: () => $(this.sid + " .list"),
			content: () => $(this.sid + " .list p"),
			wrapper: () => $(this.sid + " .wrapper"),
			sector: () => $(this.sid + " .circular ul"),
			panel: () => $(this.sid + " .panel"),
			pointer: () => $(this.sid + " .pointer"),
			circularOut: () => $(this.sid + " .circularOut"),
			spindle: () => (pattern ? this.jq.pointer() : this.jq.circularOut()),
			bothSpindle: () => $(this.sid + " .pointer, " + this.sid + " .circularOut")
		}
		//存进数组
		cir[this.serial()] = this; //将转盘注册进数组里，便于通过转盘序号反查
	}
	serial(startAtOne = false) { //返回序号，以0起始。若startAtOne为true，以1起始
		let i = $(this.sid).index(".grid");
		return startAtOne ? i + 1 : i;
	}
	listText() {	//没有换行符的list
		let l = [];
		for(let i of this.list)
			l.push(i.replace(/\n/g, ""));
		return l;
	}
	listHTML() {	//换行符变成br的list
		let l = [];
		for(let i of this.list)
			l.push(i.replace(/\n/g, "<br />"));
		return l;
	}
	//初始化转盘框架
	setup(animation = true, allDeg = 360, custom = false) {
		//添加灯和扇形
		/* for (var i = 0, lightPos = 360 - 360 / this.num; i < this.num; i++, lightPos -= 360 / this.num) {
			this.jq.wrapper().prepend('<div class="light" style="transform:rotate(' + lightPos + 'deg)"></div>')
			this.jq.sector().append('<li><a class="circular-inner"><p>' + this.jq.content()[i].innerHTML + '</p></a></li>');
			this.list.push(this.jq.content()[i].innerText.replace(/\n/g, ""));
		} */
		for (let i of this.jq.child()){
			this.list.push(i.innerText);
			this.data.push(i.dataset);
		}
		ReactDOM.render(
			React.createElement(WrapperDial, {
				info: this.info,
				list: this.listHTML()
			}),
			this.dom.own
		);
		if (!custom) {
			//初始化扇形
			var circ = this.jq.circular().circular({
				centerDeg: -90 - 360 / this.num / 2,
				allDeg: allDeg,
				inner: 0,
				hidden: animation,
				animation: "clockwise",
			});
			if (animation) {
				this.jq.circularOut().fadeIn("fast");
				this.jq.pointer().css("animation", "rotateZoomIn 500ms 300ms 1 both");
				setTimeout(circ => circ.toShow(), 250, circ);
			}
		}
	}
	//静态方法
	static indirectSetActiveCir(el, obj = false) {
		var cur = findTurntable(el);
		if (cur === null) console.warn("找不到对象！");
		else activeCir = cur.serial();
		return (obj ? cur : activeCir);
	}
	static alternate(start, expect) {
		var t = n => {
			$("#btn-check").active(n);
			$("#btn-cross").active(!n);
		}
		if (start === false || (alternating && start === undefined)) {
			clearInterval(intervalVar);
			var check = (Math.randBetween(0, 4) != 3);
			if (expect !== undefined) check = expect;
			for (let i = 0; i <= 12; i++)
				setTimeout(t, i * 50, check);
			alternating = false;
			regularity = check;
			console.log("结果为：\t" + (check ? '钩' : '叉'));
			return check;
		} else {
			alternating = true;
			console.log("开始交替闪烁……");
			intervalVar = setInterval(t => {
				t(1);
				setTimeout(t, 200, 0);
			}, 400, t);
		}
	}
	//各页面自定义的函数
	static startToDo(active) {}
	static result(active, reward) {}
	static information(text) {}
	static canBeStart() {}
	//功能
	start(speed) {
		this.rotating = true;
		if (speed !== undefined) this.speed = speed;
		console.log(
		`${this.id} 转盘转动
		速度：\t${this.speed} r/s
		旋转方向：\t${direct>0?"顺":"逆"}时针
		旋转轴：\t${pattern?"指针":"转盘"}旋转
		`.replace(/\t/g, ""));
		this.jq.spindle().css({
			"animation-duration": 1 / this.speed + "s",
			"animation-play-state": "running",
			"animation-direction": direct > 0 ? "normal" : "reverse"
		});
	}
	stop() {
		this.rotating = false;
		this.jq.spindle().css("animation-play-state", "paused");
		var reward = this.getReward();
		console.log(this.id + " 转盘停止\n奖品为：\t" + reward.text);
		return reward;
	}
	deg() {
		return getDeg(this.jq.spindle());
	}
	getReward(deg = this.deg()) {
		if (!pattern) deg = 360 - deg;
		var i = Math.floor((deg + 360 / this.num / 2) % 360 / 360 * this.num),
			text = this.listText()[i];
		return console.plog({
			index: i,
			text: text,
			data: this.data[i]
		});
	}
	changeSpeed(newSpeed, relative = true) {
		this.speed = (relative ? this.speed + newSpeed : newSpeed).toFixed(2) - 0; //精度就保留两位小数
		this.jq.spindle().animate({
			animationDuration: 1 / this.speed + "s"
		}, 100);
		console.log(this.id + " 转盘速度已改变\n新速度为：\t" + this.speed + " r/s");
		return this.speed;
	}
	changeDirect() {
		direct = -direct;
		var progress = this.deg() / 360;
		this.jq.spindle().css({
			"animation-direction": direct > 0 ? "normal" : "reverse",
			"animation-delay": (this.jq.spindle().css("animation-delay").reserveNum() +
				direct * (1 - 2 * progress) / this.speed) % (1 / this.speed) + "s"
		});
		console.log("旋转方向：\t" + (direct > 0 ? "顺" : "逆") + "时针");
	}
	stayStop() {
		console.log(this.id + " 转盘开始现实惯性（使用留下）式停止");
		this.rotating = false;
		var adjustSpeed = Math.pow(this.speed / 2, 1 / 5);
		this.jq.spindle().css({
			"animation-play-state": "paused"
		}).animate({
			animationDelay: this.jq.spindle().css("animation-delay").reserveNum() -
				Math.randBetween(90, 450) / 360 * adjustSpeed + "s"
		}, turntable.stayStopWaitingTime, "easeOutQuint");
		setTimeout(() => this.stop(), turntable.stayStopWaitingTime);
	}
	changePattern() {
		const zeroAnimation = {
			animationDuration: "0s",
			animationDelay: "0s"
		}
		if (!regularity) this.directly(0, 1, 0);
		else {
			this.jq.circularOut().animate(zeroAnimation, turntable.changePatternWaitingTime, "easeInQuint");
			this.jq.pointer().animate(zeroAnimation, turntable.changePatternWaitingTime, "easeInQuint");
		}
		pattern = !pattern - 0;
		setTimeout(zeroAnimation => {
			this.jq.bothSpindle().css(zeroAnimation);
			if (!pattern)
				this.jq.wrapper().append(this.jq.pointer().addClass("outside"));
			else
				this.jq.circularOut().append(this.jq.pointer().removeClass("outside"));
		}, turntable.changePatternWaitingTime, zeroAnimation);
		console.log("旋转轴：\t" + (pattern ? "指针" : "转盘") + "旋转");
	}
	directly(place, deg = false, log = true) {
		if (this.rotating && regularity)
			return console.pwarn("转动情况下不可使用！");
		if (this.jq.spindle().css("animation-duration") == "0s")
			this.jq.spindle().css("animation-duration", 1 / this.speed + "s");
		if (!deg) place *= 360 / this.num;
		place = Math.PNMod(place, 360);
		var reward = this.getReward(place);
		if (log) console.log("手动点按 " + this.id + " 转盘\n奖品为：\t" + reward.text);
		if (!pattern) place = (360 - place) % 360;
		var curDeg = this.deg();
		if (direct > 0 && place < curDeg) place += 360;
		if (direct <= 0 && place > curDeg) curDeg += 360;
		this.jq.spindle().animate({
			animationDelay: this.jq.spindle().css("animation-delay").reserveNum() -
				Math.abs(place - curDeg) / 360 / this.speed + "s"
		}, 500, "easeOutQuint");
		return reward;
	}
	normalState(deg = this.deg()) {
		console.warn("这是一个废弃工程。")
		if (direct <= 0) deg = (360 - deg) % 360;
		this.jq.wrapper().css("animation", "initial").css("animation", initAnimation);
		this.jq.pointer().css("animation", "initial").css("animation", initAnimation);
		this.jq.spindle().css({
			"animation-delay": -deg / 360 / defaultSpeed,
			"animation-direction": direct > 0 ? "normal" : "reverse"
		});
	}
}
turntable.stayStopWaitingTime = defaultRandomTime * 1000;
turntable.changePatternWaitingTime = 1000;
const initAnimation = "whirl 0.5s infinite linear 0s normal paused";

var intervalVar, intervalId, wrapperScale;

function createTurntable() {
	// if (intervalId === undefined) intervalId = arguments;
	intervalId = intervalId || arguments;
	intervalVar = setInterval(() => {
		if (!rendered)
			return console.pwarn("NET ERROR");
		else {
			clearInterval(intervalVar);
			money.refreshMoney();
			var arg = intervalId;
			if (arg.length == 0 || arg.length % 2 != 0)
				return console.perror("创建对象时引入的参数不合法！\n参数不能为空且不能为单数。");
			for (var i = 0; i < arg.length; i += 2) {
				$('#'+arg[i]).addClass("grid");
			}
			for (var i = 0; i < arg.length; i += 2) {
				new turntable(arg[i], arg[i + 1]);
				cir[i].setup();
			}
			$(".container").css("opacity", 1);
			console.log("OK");
			$(".loading").css({
				"font-size": "0px",
				"opacity": "0"
			});
			setTimeout(() => {
				$(".loading").remove();
				$(".pointer").css("animation", initAnimation);
				$(".panel").removeClass("start-animation");
				$(".circularOut").css("animation", initAnimation);
				$(".round-button-group").removeClass("hidden");
				$(".finger-guessing").css("left", "20px");
				$('[data-toggle="tooltip"]').tooltip().click(function() {
					$(this).tooltip('hide');
				});
				setTimeout(() => {
					let l = $("#later-change-css").attr("id", "css");
					if (l.length != 0) NightTime.CurrentModeStyle();
				}, 2000);
			}, 700);
			reScale();

			//按钮部分
			function changeSpeedTitle(speed) {
				if (speed === undefined)
					speed = cir[activeCir].speed;
				var title = "速<br>当前速度：" + speed + " r/s" + (speed >= 4 ? "<br>速度已最大" : "") + (speed <= 0.2 ? "<br>速度已最小" : "");
				$("#btn-speed-up").changeTooltip("加" + title);
				$("#btn-speed-down").changeTooltip("减" + title);
			}
			var cannotBeStartLog = () => console.warn("该页面阻止了您转动转盘！");
			$(".pointer").click(function() {
				if(!turntable.canBeStart()) return cannotBeStartLog();
				var cur = turntable.indirectSetActiveCir(this, true);
				if (cur.rotating) return;
				cur.speed = defaultSpeed;
				cur.start();
				changeSpeedTitle();
				$(".light").attr("class", "light light-run-twink");
				turntable.startToDo(cur.serial());
				$(allButtons).disabled();
				cur.stayStop();
				setTimeout(cur => {
					$(allButtons).disabled(0);
					lightStopTwink();
					turntable.result(cur.serial(), cur.getReward());
				}, turntable.stayStopWaitingTime, cur);
			});
			$("#btn-rotating, #btn-check-auto").click(function() {
				var cur = cir[activeCir],
					_btn = () => $("#btn-rotating");
				if (!cur.rotating) {
					if(!turntable.canBeStart()) return cannotBeStartLog();
					_btn().rbtntxt(iconlist.stop).active();
					cur.speed = defaultSpeed;
					cur.start();
					changeSpeedTitle();
					$("#btn-pattern").disabled();
					$(".light").attr("class", "light light-run-twink");
					turntable.startToDo(cur.serial());
					if (this.id == "btn-check-auto") turntable.information("钩 开始转动……");
					_btn().changeTooltip("<b>转动</b>/停止");
					wrapperMusic.replay();
				} else {
					if (!useStay) cur.stop();
					else {
						$(allButtons).disabled();
						cur.stayStop();
						$(".light").attr("class", "light light-stay-twink");
					}
					setTimeout(cur => {
						$(allButtons).disabled(0);
						_btn().rbtntxt(iconlist.rotating).active(0);
						// $(".light").attr("class","light light-stop-twink");
						lightStopTwink();
						wrapperMusic.pause();
						turntable.result(cur.serial(), cur.getReward());
						_btn().changeTooltip("转动/<b>停止</b>");
						changeSpeedTitle(2);
					}, useStay * (turntable.stayStopWaitingTime), cur);
				}
			});
			$("#btn-giveup").click(function() {
				var cur = cir[activeCir];
				cur.stop();
				this.active();
				$(allButtons).disabled();
				setTimeout(function() {
					lose();
					location.reload();
				}, 1000);
			});
			$("#btn-not-giveup").click(function() {
				this.shine();
			});
			$("#btn-speed-up,#btn-speed-down").click(function() {
				var cur = cir[activeCir],
					speed = $(this).data("relative-speed") - 0;
				if (!cur.rotating) {
					$("#btn-speed-up,#btn-speed-down").shine();
					return turntable.information(console.pwarn("转盘未转动，操作无效！"));
				}
				if (cur.speed + speed > 4 || cur.speed + speed < .1) {
					this.shine();
					return turntable.information(console.pwarn("速度已最" + (cur.speed + speed > 4 ? "大" : "小") + "！"));
				}
				cur.changeSpeed(speed);
				changeSpeedTitle();
			});
			$("#btn-direction").click(function() {
				for (var cur of cir)
					cur.changeDirect();
				this.rbtntxt(direct < 0 ? iconlist.counterclockwise : iconlist.clockwise);
				$(this).changeTooltip("旋转方向：" + (direct < 0 ? "逆时针" : "顺时针"));
			});
			$("#btn-inertia").click(function() {
				useStay = !useStay;
				this.rbtntxt(useStay ? iconlist.inertiaOff : iconlist.inertiaOn).active(useStay);
				$(this).changeTooltip("单击后：" + (useStay ? "理想骤止" : "现实惯性") + "<br>当前：　" + (!useStay ? "理想骤止" : "现实惯性"));
			})
			$("#btn-pattern").click(function() {
				for (var cur of cir)
					cur.changePattern();
				$(allButtons).disabled();
				this.rbtntxt(pattern ? iconlist.pointerRotate : iconlist.turntableRotate);
				$(this).changeTooltip("旋转轴<br>当前：　" + (pattern ? "指针旋转" : "转盘旋转") + "<br>单击后：" + (!pattern ? "指针旋转" : "转盘旋转"));
				setTimeout(() => $(allButtons).not(regularity ? '' : rotateModeButton).disabled(0), turntable.changePatternWaitingTime);
			});
			$("#btn-check, #btn-cross, #btn-cross-cheat").click(function() {
				for (var cur of cir)
					cur.stop();
				if (finRunning) $("#fin-start").click();
				$("#btn-rotating").rbtntxt(iconlist.rotating).active(0);
				$(".light").attr("class", "light");
				var check = (this.id == "btn-check"),
					auto = false;
				if (this.id == "btn-cross-cheat") {
					check = turntable.alternate(false, false);
				} else if (alternating) {
					check = turntable.alternate(false, (check ? true : undefined));
					if (check) auto = true;
				} else if (!check) {
					turntable.alternate(true);
					$(allButtons).not("#btn-check, #btn-cross").disabled();
					return;
				}
				regularity = check;
				turntable.information(regularity ? '钩' : '叉');
				$("#btn-check").active(regularity);
				$("#btn-cross").active(!regularity);
				$(allButtons).disabled(0);
				if (!regularity) $(rotateModeButton).disabled();
				if (auto) $("#btn-check-auto").click();
			});

			$(".circular li").mousedown(function(event) {
				var cur = turntable.indirectSetActiveCir(this, true); { //避免因扇形原因致使点出转盘区域仍能操作的问题
					let coord = cur.jq.panel()[0].getBoundingClientRect();
					if (event.clientX < coord.left || event.clientX > coord.right) return;

					function circY(x, a, b, r) { //圆方程：(x-a)²+(y-b)²=r²
						var d = Math.sqrt(r ** 2 - (x - a) ** 2);
						return [-d + b, d + b];
					}
					let y = circY(event.clientX, coord.left + coord.width / 2, coord.top + coord.height / 2, coord.width / 2);
					if (!isFinite(y[0]) || !isFinite(y[1])) return;
					if (event.clientY < y[0] || event.clientY > y[1]) return;
				}
				if (!regularity) {
					if(!turntable.canBeStart()) return cannotBeStartLog();
					turntable.startToDo();
					lightStopTwink();
					turntable.result(cur.serial(), cur.directly($(this).index()));
					return;
				}
				$(".overlay-layer").fadeIn(200);
				$(".overlay-text").css({
					"top": event.clientY,
					"left": event.clientX
				}).text(this.innerText.replace(/\n/g, ''));
			});
			$(".circular li, .overlay-layer").mouseup(event => {
				$(".overlay-layer").fadeOut(200);
			});

			//猜拳器
			$("#fin-start").click(function() {
				if (!finRunning) {
					var speed = 1;
					$(".fin-face").active(0);
					$(this).rbtntxt(iconlist.stop).active();
					$(".fin-point-group").css("animation", "fin-running " + 1 / speed + "s infinite")
					console.log("开始猜拳\n速度：" + speed + " 个来回每秒");
					turntable.information("开始猜拳");
					$(this).changeTooltip("停止猜拳");
					fingerMusic.replay();
				} else {
					$(this).rbtntxt(iconlist.rotating).active(0);
					var left = Math.floor(($(".fin-point-group").css("animation-play-state", "paused").css("left").reserveNum() +
						202.5) / 45) % 3;
					const finGuess = ["fist", "scissors", "cloth"],
						finGuessName = ["石头", "剪刀", "布"];
					$("#" + finGuess[left]).active();
					turntable.information(console.plog("猜拳结束\n结果为：" + finGuessName[left]));
					$(this).changeTooltip("开始猜拳");
					fingerMusic.pause();
				}
				finRunning = !finRunning;
			});

			//偏好设置部分
			$("#round-buttons-group-place").bind("change", function() {
				var orientation = {
					name: "orientation",
					top: 0,
					right: 90,
					bottom: 180,
					left: 270,
					side: a => orientation[a]
				}
				var val = orientation.side($(this).val());
				$("#place-arrow-icon").css("transform", `rotate(${val}deg)`);
			});
			$("#verification-code-input").on('input propertychange', function() {
				var correct = (this.value == "250");
				$(this).removeClass("is-valid is-invalid").addClass(correct ? "is-valid" : "is-invalid");
				$("#ensure-cross-cheat").disabled(!correct);
			});
			$("[for]").click(function() {
				$('#' + $(this).attr("for")).focus();
			});
			$(".palatte button").click(function() {
				$(".palatte button").removeClass("is-valid");
				$(this).addClass("is-valid");
				$("#theme-color").val(this.value);
			});
			$("#theme-color").on('input propertychange change', function() {
				var smp = $(".palatte button").removeClass("is-valid");
				if (this.value === "") {
					$(this).addClass("is-invalid");
					return;
				} else $(this).removeClass("is-invalid");
				const ilc = '\\.,e,E,\\+';
				this.value = this.value.replaces(ilc) - 0;
				if (this.value == '-0') this.value = 0;
				for (let i of smp)
					if (this.value == i.value)
						$(i).addClass("is-valid");
			});
			$("#pref-setting-ok").click(() => {
				//判断参数合法
				if ($("#theme-color").val() == "") {
					$("#theme-color").select();
					return;
				}
				//保存设置部分
				pref.rbtnPlace = $("#round-buttons-group-place").val();
				pref.themeColor = $("#theme-color").val() - 0;
				pref.showFG = $("#display-finger-guessing").is(":checked");
				//应用设置部分
				$("#rbtn-group").attr("class", `round-button-group ${pref.rbtnPlace}-side`);
				$(".container").css("filter", pref.themeColor ? `hue-rotate(${pref.themeColor}deg)` : "");
				if (pref.showFG) $(".finger-guessing").fadeIn();
				else $(".finger-guessing").fadeOut();
				//关闭模态框
				$('#preferenceSetting').modal('hide');
			});
			$("#preferenceSetting").on('hidden.bs.modal', function(e) {
				//恢复设置部分
				$("#round-buttons-group-place").val(pref.rbtnPlace).change();
				$("#theme-color").val(pref.themeColor).change();
				$("#display-finger-guessing").prop("checked", pref.showFG);
				$("#verification-code-input").val("").removeClass("is-valid is-invalid");
				$("#ensure-cross-cheat").text("确认开启作弊模式").attr("class", "btn btn-outline-danger").css("pointer-events", "").disabled();
			});
			$("#ensure-cross-cheat").click(function() {
				this.innerText = "已开启";
				this.className = "btn btn-danger";
				this.style.pointerEvents = "none";
				crossCheat();
			})
		}
	}, 1000);
}

function reScale() {
	// var clientMin=Math.min(document.documentElement.clientWidth,document.documentElement.clientHeight),
	for (let i of cir) {
		var grid = i.jq.grid(),
			gridMin = Math.min(grid.width(), grid.height());
		wrapperScale = gridMin / (size + margin); //在全局变量中去定义了
		i.jq.wrapper().css("transform", "scale(" + wrapperScale + ")");
	}
}

function lose() {
	alert("你输了！");
}

function crossCheat() {
	$("#btn-cross-cheat").click();
	return 250;
}

var allButtons =
	"#btn-rotating,#btn-inertia,#btn-direction,#btn-speed-up,#btn-speed-down,#btn-pattern,#btn-check,#btn-cross,#btn-giveup,#btn-not-giveup,.pointer,#fin-start";
var rotateModeButton =
	"#btn-rotating,#btn-speed-up,#btn-speed-down,.pointer";
