/*
狂欢一下
javascript:void(function(){var d = document,a = 'setAttribute',s = d.createElement('script');s[a]('type','text/javascript');s[a]('src','https://api.uixsj.cn/hi/happy.js');d.head.appendChild(s);})();
*/
setTimeout(le, 1000);
function le() {
	function loadCss() { //将自定义css文件引入页面
		var myCss = document.createElement("link");
		myCss.type = "text/css";
		myCss.rel = "stylesheet";
		myCss.href = cssHref; //自定义css文件地址
		myCss.className = l;
		document.body.appendChild(myCss);
	}
	function h() {
		document.getElementsByClassName(l).forEach(item => document.body.removeChild(item));
	}
	function p() {
		var e = document.createElement("div");
		e.className = a;
		document.body.appendChild(e);
		setTimeout(() => document.body.removeChild(e), 100);
	}
	function getSize(e) { //获取目标的宽高
		return {
			height: e.offsetHeight,
			width: e.offsetWidth
		}
	}
	function checkSize(i) { //判断目标大小是否符合要求
		var s = getSize(i); //获取目标的宽高
		return s.height > minHeight && s.height < maxHeight && s.width > minWidth && s.width < maxWidth //判断目标是否符合条件
	}
	function m(e) {
		var t = e,
			n = 0;
		while (t) {
			n += t.offsetTop;
			t = t.offsetParent;
		}
		return n;
	}
	function g() {
		var e = document.documentElement;
		if (innerWidth)
			return innerHeight;
		else if (e && !isNaN(e.clientHeight))
			return e.clientHeight;
		return 0;
	}
	function y() {
		if (pageYOffset)
			return pageYOffset;
		return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	}
	function E(e) {
		var t = m(e);
		return t >= w && t <= b + w;
	}
	function setBgm() { //设置音乐
		var e = document.createElement("audio");
		e.className = l;
		e.src = bgmSrc; //bgm地址
		e.loop = false;
		e.addEventListener("canplay", function () {
			setTimeout(() => x(k), 500);
			setTimeout(() => {
				N(); p();
				for (const e of O)
					T(e);
			}, 15500)
		}, true);
		e.addEventListener("ended", () => { N(); h(); }, true);
		e.innerHTML = " <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>";
		document.body.appendChild(e);
		e.play();
	}
	function x(e) {
		e.className += " " + s + " " + o;
	}
	function T(e) {
		e.className += " " + s + " " + u[Math.floor(Math.random() * u.length)];
	}
	function N() {
		var e = document.getElementsByClassName(s);
		var t = new RegExp("\\b" + s + "\\b");
		/* for (var n = 0; n < e.length;) {
			e[n].className = e[n].className.replace(t, "")
		} */
		for (const n of e)
			n.className = n.className.replace(t, "");
	}
	var minHeight = 3; //最小高度
	var minWidth = 3; //最小宽度
	var maxHeight = 800; //最大高度
	var maxWidth = 1400; //最大宽度
	var s = "mw-harlem_shake_me";
	var o = "im_first";
	var u = ["im_drunk", "im_baked", "im_trippin", "im_blown"];
	var a = "mw-strobe_light";
	var l = "mw_added_css"; //最终要移除的css
	var b = g();
	var w = y();
	var C = document.getElementsByTagName("*");
	var k = null;
	for (var targetDiv of C)
		if (checkSize(targetDiv))
			if (E(targetDiv)) {
				k = targetDiv;
				break;
			}
	if (targetDiv === null) //如果没找到合适大小的
		return console.warn("Could not find a node of the right size. Please try a different page.");

	loadCss(); //将自定义css文件引入页面
	setBgm(); //添加背景音乐

	var O = [];
	for (const targetDiv of C)
		if (checkSize(targetDiv))
			O.push(targetDiv);

	{ //网页整体倾斜效果
		const body = document.body.style;
		body.overflowX = "hidden";
		body.msTransform = body.oTransform = body.mozTransform = body.webkitTransform = body.transform = "rotate(1deg)";
	}
}
var bgmSrc = "http://other.web.rc01.sycdn.kuwo.cn/resource/n3/14/1/2095438319.mp3";
// var cssHref = "https://api.uixsj.cn/hi/kuanghai.css"; //设置页面动效css地址
var cssHref = (function () {
	const myName = "happy.js";
	let scripts = document.getElementsByTagName("script");
	return scripts[scripts.length - 1].src.replace(myName, "kuanghai.css");
}());