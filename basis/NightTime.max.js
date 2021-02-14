"use strict";
//请将本js放在页面最末尾，否则可能不起作用。
var NightTime = new Object; 
{
	let _this = NightTime;
	let hour = new Date().getHours();
	if (hour < 7 || hour >= 19) _this.darkModeFact = true; //晚上7点到次日早上7点启动黑暗模式
	if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) _this.darkModeFact = true; //若浏览器开启了黑暗模式，也会启动黑暗模式
	_this.theme = "";
	_this.nightDo = _this.lightDo = () => {}
	_this.CurrentModeStyle = () => {
		_this.css = document.getElementById("css");
		if (_this.css) _this.theme = _this.css.getAttribute("data-theme").toLowerCase();
		_this.scrollbar();
		if (_this.darkModeFact == true) _this.DarkModeStyle();
		else _this.LightModeStyle();
	}
	_this.ToggleModeStyle = () => {
		_this.darkModeFact = !_this.darkModeFact;
		_this.CurrentModeStyle();
	}
	_this.LightBackgroundColor = "white";
	_this.DarkBackgroundColor = "#222";
	_this.defineCustomBackgroundColor = false;
	String.prototype.i = function(index, character = "") {
		return _this.slice(0, index) + character + _this.slice(index + 1);
	}
	String.prototype.camelToHyphenCase = function() {
		var hyphenCase = "";
		for (let i = 0; i < _this.length; i++) {
			if (_this[i].toLowerCase() !== _this[i]) hyphenCase += "-" + _this[i].toLowerCase();
			else hyphenCase += _this[i];
		}
		return hyphenCase;
	}
	_this.scrollbar = () => {
		let textColor = (_this.darkModeFact ? "#ffffff" : "#000000");
		let scrollbarStyle = {
			"::-webkit-scrollbar": {
				"width": "4px",
				"height": "4px",
				"scrollbar-arrow-color": "red"
			},
			"::-webkit-scrollbar-thumb": {
				"border-radius": "5px",
				"-webkit-box-shadow": "inset 0 0 5px #0003",
				"background": textColor + "33",
				"scrollbar-arrow-color": "red"
			},
			"::-webkit-scrollbar-track": {
				"-webkit-box-shadow": "inset 0 0 5px #0003",
				"border-radius": 0,
				"background": textColor + "1a"
			}
		}
		_this.appendStyle(scrollbarStyle, "scrollbar");
	}
	let notAvailableLog = "The ID you specified has been occupied by the other element, please try to use other ID!";
	_this.appendStyle = (style, id = "") => {
		var css = JSON.stringify(style, undefined, "\t");
		css = css.replace(/\:\s*\{/g, " {").replace(/\}\s*\,/g, "}").replace(/\,\n/g, ";\n").replace(/\"/g, "").slice(2, -2);
		var styleTag = document.getElementById(id);
		if (!styleTag) {
			styleTag = document.createElement("style");
			styleTag.id = id;
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
			linkTah.type = "text/css";
			document.head.appendChild(linkTag);
		}
		if (linkTag.tagName != "LINK") {
			console.error(notAvailableLog);
			return false;
		}
		linkTag.href = href;
		return true;
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
			_this.appendStyle({
				".btn-outline-secondary": {
					"color": "#adb5bd",
					"border-color": "#adb5bd"
				},
				".btn-outline-secondary:hover": {
					"color": "#222",
					"background-color": "#adb5bd",
					"border-color": "#adb5bd"
				},
				".btn-outline-secondary:focus, .btn-outline-secondary.focus": {
					"box-shadow": "0 0 0 0.2rem rgba(173, 181, 189, 0.5)"
				},
				".btn-outline-secondary.disabled, .btn-outline-secondary:disabled": {
					"color": "#adb5bd",
					"background-color": "transparent"
				},
				".btn-outline-secondary:not(:disabled):not(.disabled):active, .btn-outline-secondary:not(:disabled):not(.disabled).active, .show > .btn-outline-secondary.dropdown-toggle": {
					"color": "#222",
					"background-color": "#adb5bd",
					"border-color": "#adb5bd"
				},
				".btn-outline-secondary:not(:disabled):not(.disabled):active:focus, .btn-outline-secondary:not(:disabled):not(.disabled).active:focus, .show > .btn-outline-secondary.dropdown-toggle:focus": {
					"box-shadow": "0 0 0 0.2rem rgba(173, 181, 189, 0.5)"
				},
				".reset-on-right-float": {
					"margin": "19px 0"
				},
				".sm": {
					"height": "22px"
				},
				".form-control, .form-control:focus": {
					"background-color": "rgb(34,34,34)",
					"border-color": "rgb(173,181,189)",
					"color": "white",
					"fill": "white"
				},
				".input-group-text": {
					"border-color": "rgb(173,181,189)"
				},
				".form-control:focus": {
					"border-color": "#adb5bd",
					"-webkit-box-shadow": "0 0 0 0.2rem rgba(173,181,189,0.5)",
					"box-shadow": "0 0 0 0.2rem rgba(173,181,189,0.5)"
				},
				".custom-select": {
					"color": "white",
					"background": "rgb(34,34,34)"
				},
				".custom-control-label::before": {
					"background-color": "#222"
				},
				".form-control:disabled, .form-control[readonly]": {
					"background-color": "#454545"
				}
			}, "bootstrap-btn-outline-light-style-fix");
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
	}
	try {
		if (darkMode) _this.darkModeFact = Boolean(darkMode); //用户可以在自己的网站上面定义一个名为darkMode的变量，自由调试开关黑暗模式的效果。
	} catch (e) {}
	try {
		if (nightDo && typeof nightDo == "function") _this.nightDo = nightDo; //用户可以定义一个名为nightDo的函数，自由决定要在黑暗模式下想做的操作
	} catch (e) {}
	try {
		if (lightDo && typeof lightDo == "function") _this.lightDo = lightDo; //用户可以定义一个名为lightDo的函数，自由决定要在浅色模式下想做的操作
	} catch (e) {}
	try {
		if (backgroundColor && Object.prototype.toString.call(backgroundColor) === '[object Object]') {
			let b = backgroundColor;
			if (b.light) _this.LightBackgroundColor = b.light;
			if (b.dark) _this.DarkBackgroundColor = b.dark;
			_this.defineCustomBackgroundColor = true;
		}
	} catch (e) {}
	_this.CurrentModeStyle();
}
