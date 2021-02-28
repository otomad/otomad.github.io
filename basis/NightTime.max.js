"use strict";
/* 
 * 请将本 js 放在页面最末尾引用，否则可能不起作用。
 * 由于不带 min 的 js 路径已经被过多页面使用了，因此直接以“.js”结尾的便是压缩版了，而源文件就只好用 min 的反义词 max 来表示了。
 * 自定义参数方法，在页面中定义一个名为 NightTime 的对象，根据需要添加属性：
 * var NightTime = {
 * 	darkMode: Boolean - 若定义该属性，则页面始终保持颜色主题与设定的参数保持一致,
 * 	nightDo: Function - 自定义深色主题下额外执行的操作,
 * 	darkDo: Function - 同 nightDo，为了统一名称风格,
 * 	lightDo: Function - 自定义浅色主题下额外执行的操作，一般无需配置，只有在主动切换为浅色主题时才需要将 nightDo 执行的操作复原回去,
 * 	darkBackgroundColor: String - 设定深色主题的页面背景色,
 * 	lightBackgroundColor: String - 设定浅色主题的页面背景色,
 * 	darkCSS: String - 设定深色主题的层叠式样式表路径,
 * 	lightCSS: String - 设定浅色主题的层叠式样式表路径
 * }
 */

{
	let thisPath = "";
	for (let i of document.getElementsByTagName("script"))
		if (i.src.includes("NightTime"))
			thisPath = i.getAttribute("src");
	thisPath = thisPath.slice(0, thisPath.lastIndexOf("/") + 1);
	let path = (href = "") => thisPath + href;
	let type = obj => {
		return Object.prototype.toString.call(obj).slice(8, -1);
	}
	let profile = new Object;
	if (type(window["NightTime"]) === "Object")
		Object.assign(profile, NightTime);

	var NightTime = new Object;

	let _this = NightTime;
	let hour = new Date().getHours();
	if (hour < 7 || hour >= 19)
		_this.darkModeFact = true; //晚上7点到次日早上7点启动深色主题
	if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
		_this.darkModeFact = true; //若浏览器开启了深色主题，也会启动深色主题
	_this.theme = "";
	_this.nightDo = _this.lightDo = () => { }
	_this.CurrentModeStyle = () => {
		_this.css = document.getElementById("css");
		if (_this.css) _this.theme = _this.css.getAttribute("data-theme").toLowerCase();
		_this.scrollbar();
		if (_this.darkModeFact) return _this.DarkModeStyle();
		else return _this.LightModeStyle();
	}
	_this.ToggleModeStyle = () => {
		_this.darkModeFact = !_this.darkModeFact;
		return _this.CurrentModeStyle();
	}
	_this.LightBackgroundColor = "white";
	_this.DarkBackgroundColor = "#222";
	_this.LightCSS = _this.DarkCSS = undefined;
	_this.defineCustomBackgroundColor = false;
	String.prototype.i = function (index, character = "") {
		return this.slice(0, index) + character + this.slice(index + 1);
	}
	String.prototype.camelToHyphenCase = function () {
		var hyphenCase = "";
		for (let i = 0; i < this.length; i++) {
			if (this[i].toLowerCase() !== this[i]) hyphenCase += "-" + this[i].toLowerCase();
			else hyphenCase += this[i];
		}
		return hyphenCase;
	}
	_this.scrollbar = () => {
		_this.appendStyleByAjax(`css/scrollbar.css`, "scrollbar", {
			"$textColor": (_this.darkModeFact ? "255, 255, 255" : "0, 0, 0")
		});
	}
	const notAvailableLog = "The ID you specified has been occupied by the other element, please try to use other ID!";
	_this.appendStyle = (style, id = "") => {
		var css = JSON.stringify(style, undefined, "\t");
		css = css.replace(/\:\s*\{/g, " {").replace(/\}\s*\,/g, "}").replace(/\,\n/g, ";\n").replace(/\"/g, "").slice(1, -1);
		var styleTag = document.getElementById(id);
		if (!styleTag) {
			styleTag = document.createElement("style");
			styleTag.id = id;
			styleTag.type = "text/css";
			document.head.appendChild(styleTag);
		}
		if (styleTag.tagName != "STYLE") {
			console.error(notAvailableLog);
			return false;
		}
		styleTag.innerHTML = css;
		return true;
	}
	_this.appendCSSLink = (href, id = "") => {
		var linkTag = document.getElementById(id);
		if (!linkTag) {
			linkTag = document.createElement("link");
			linkTag.id = id;
			linkTag.rel = "stylesheet";
			linkTag.type = "text/css";
			document.head.appendChild(linkTag);
		}
		if (linkTag.tagName != "LINK") {
			console.error(notAvailableLog);
			return false;
		}
		linkTag.href = href;
		return true;
	}
	_this.appendStyleByAjax = (href, id = "", variable) => {
		var css = new XMLHttpRequest();
		css.onreadystatechange = () => {
			if (css.readyState == 4 && css.status == 200) {
				var cssText = css.responseText;
				if (type(variable) === "Object")
					for (let key in variable)
						// cssText = cssText.replace(new RegExp(`${key}(?![a-zA-Z0-9])`, 'g'), variable[key]);
						cssText = cssText.replaceAll(key, variable[key]);

				var styleTag = document.getElementById(id);
				if (!styleTag) {
					styleTag = document.createElement("style");
					styleTag.id = id;
					styleTag.type = "text/css";
					document.head.appendChild(styleTag);
				}
				if (styleTag.tagName != "STYLE") {
					console.error(notAvailableLog);
					return false;
				}
				styleTag.innerHTML = cssText;
				return true;
			}
		}
		css.open("GET", path(href), true);
		return css.send();
	}
	_this.removeStyle = _this.removeCSSLink = id => {
		let el = document.getElementById(id);
		if (!el) return false;
		if (el.tagName != "STYLE" && el.tagName != "LINK") return false;
		el.remove();
		return true;
	}
	_this.DarkModeStyle = () => {
		if (_this.theme.includes("bootstrap")) {
			_this.appendCSSLink("https://bootswatch.com/4/darkly/bootstrap.min.css", "css");
			for (let i of document.getElementsByClassName("navbar")) {
				i.classList.remove("navbar-light");
				i.classList.remove("bg-light");
				i.classList.add("navbar-dark");
				i.classList.add("bg-dark");
			}
			const bbolsf = "bootstrap-btn-outline-light-style-fix";
			_this.appendStyleByAjax(`css/${bbolsf}.css`, bbolsf);
		}
		_this.removeStyle("light-root");
		_this.appendStyle({
			":root": {
				"--text-color": "white",
				"--background-color": _this.DarkBackgroundColor
			}
		}, "dark-root");
		_this.nightDo();
		if (_this.defineCustomBackgroundColor) document.body.style.backgroundColor = _this.DarkBackgroundColor;
		if (_this.DarkCSS) _this.appendCSSLink(_this.DarkCSS, "css");
		return true;
	}
	_this.LightModeStyle = () => {
		if (_this.theme.includes("bootstrap")) {
			_this.appendCSSLink("https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.min.css", "css");
			for (let i of document.getElementsByClassName("navbar")) {
				i.classList.remove("navbar-dark");
				i.classList.remove("bg-dark");
				i.classList.add("navbar-light");
				i.classList.add("bg-light");
			}
		}
		_this.removeStyle("bootstrap-btn-outline-light-style-fix");
		_this.removeStyle("dark-root");
		_this.appendStyle({
			":root": {
				"--text-color": "black",
				"--background-color": _this.LightBackgroundColor
			}
		}, "light-root");
		_this.lightDo();
		if (_this.defineCustomBackgroundColor) document.body.style.backgroundColor = _this.LightBackgroundColor;
		if (_this.LightCSS) _this.appendCSSLink(_this.LightCSS, "css");
		return true;
	}
	if (type(profile.darkMode) === "Boolean") _this.darkModeFact = Boolean(profile.darkMode);
	if (profile.nightDo && type(profile.nightDo) === "Function") _this.nightDo = profile.nightDo;
	if (profile.darkDo && type(profile.darkDo) === "Function") _this.nightDo = profile.darkDo;
	if (profile.lightDo && type(profile.lightDo) === "Function") _this.lightDo = profile.lightDo;
	if (profile.lightBackgroundColor || profile.darkBackgroundColor) {
		if (profile.lightBackgroundColor) _this.LightBackgroundColor = profile.lightBackgroundColor;
		if (profile.darkBackgroundColor) _this.DarkBackgroundColor = profile.darkBackgroundColor;
		_this.defineCustomBackgroundColor = true;
	}
	if (profile.lightCSS) _this.LightCSS = profile.lightCSS;
	if (profile.darkCSS) _this.DarkCSS = profile.darkCSS;
	_this.CurrentModeStyle();
}
