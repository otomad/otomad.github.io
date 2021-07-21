"use strict";
/** configuration description
 * <p>
 * 	<strong> 请将本 js 放在页面最末尾引用，否则可能不起作用。 </strong><br>
 * 	由于不带 min 的 js 路径已经被过多页面使用了，因此直接以“.js”结尾的便是压缩版了，而源文件就只好用 min 的反义词 max 来表示了。 <br>
 * 	自定义参数方法，在页面中定义一个名为 NightTime 的<b>对象</b>，根据需要添加属性。（注意是要在本 js 之前预先以对象形式配置参数，到本 js 运行的时候才会读取这些配置！）<br>
 * 	书写格式：{@code
 * 		var NightTime = {
 * 			// 在这里填写参数，如 “darkMode: true”。以逗号分隔。
 * 		}
 * 	}
 * </p>
 * @see NightTime
 * @param darkMode: boolean - 若定义该属性，则页面始终保持颜色主题与设定的参数保持一致,
 * @param nightDo: function - 自定义深色主题下额外执行的操作,
 * @param darkDo: function - 同 nightDo，为了统一名称风格,
 * @param lightDo: function - 自定义浅色主题下额外执行的操作，一般无需配置，只有在主动切换为浅色主题时才需要将 nightDo 执行的操作复原回去,
 * @param darkBackgroundColor: string - 设定深色主题的页面背景色,
 * @param lightBackgroundColor: string - 设定浅色主题的页面背景色,
 * @param darkCSS: string - 设定深色主题的层叠式样式表路径,
 * @param lightCSS: string - 设定浅色主题的层叠式样式表路径
 * @return void - 只声明不返回值
 */

(function () {
	let thisPath = document.getElementsByTagName("script");
	thisPath = thisPath[thisPath.length - 1].getAttribute("src");
	thisPath = thisPath.slice(0, thisPath.lastIndexOf("/") + 1);
	let path = (href = "") => thisPath + href;
	let type = obj => (obj ? obj.constructor.name : Object.prototype.toString.call(obj).slice(8, -1));
	let profile = {};
	if (type(window.NightTime) === "Object")
		Object.assign(profile, NightTime);
	let _ = {};
	let hour = new Date().getHours();
	if (hour < 7 || hour >= 19 || //晚上7点到次日早上7点启动深色主题
		matchMedia && matchMedia("(prefers-color-scheme: dark)").matches) //若浏览器开启了深色主题，也会启动深色主题
		_.darkModeFact = true;
	_.theme = "";
	_.nightDo = _.lightDo = () => { };
	/** method description
	 * 切换到当前主题
	 * @returns void - 切换到正常情况下配置而应该呈现的主题
	 */
	_.CurrentModeStyle = () => {
		_.css = document.getElementById("css");
		if (_.css) _.theme = _.css.getAttribute("data-theme").toLowerCase();
		if (_.darkModeFact) return _.DarkModeStyle();
		else return _.LightModeStyle();
	}
	/** method description
	 * 切换到对立主题
	 * @returns void - 切换到不是当前状态下的主题，即浅色深色模式互相切换
	 */
	_.ToggleModeStyle = () => {
		_.darkModeFact = !_.darkModeFact;
		return _.CurrentModeStyle();
	}
	_.LightBackgroundColor = "white";
	_.DarkBackgroundColor = "#222";
	_.LightCSS = _.DarkCSS = undefined;
	_.defineCustomBackgroundColor = false;
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
	_.scrollbar = () => {
		_.appendStyleByAjax(`css/scrollbar.css`, "scrollbar", {
			"var(--text-color-parts)": (_.darkModeFact ? "255, 255, 255" : "0, 0, 0")
		});
	}
	/** method description
	 * 输入 CSS 文本并添加到 style 标签
	 * @param style: string | object - 必选，可以是模板字符串或对象，将会添加到 style 标签中
	 * @param id?: string - 可选，添加到的 style 标签的 id 名称。如果留空，则直接添加而不配置 id 名称，这样做可能无法规定生命周期
	 * @returns true - 添加成功
	 * @exception false - 添加失败，输入的 id 名称被占用且不为 style 标签
	 */
	_.appendStyle = (style, id = "") => {
		var css;
		if (type(style) == "Object") {
			css = JSON.stringify(style, undefined, "\t");
			css = css.replace(/\:\s*\{/g, " {").replace(/\}\s*\,/g, "}").replace(/\,\n/g, ";\n").replace(/\"/g, "").slice(1, -1);
		} else css = style;
		var styleTag = document.getElementById(id);
		if (!styleTag) {
			styleTag = document.createElement("style");
			styleTag.id = id;
			styleTag.type = "text/css";
			document.head.appendChild(styleTag);
		}
		if (styleTag.tagName != "STYLE") {
			console.error(resource().notAvailableLog);
			return false;
		}
		styleTag.innerHTML = css;
		return true;
	}
	/** method description
	 * 输入 CSS 文件链接并添加到 link 标签
	 * @param href: string - 必选，CSS 文件的链接地址
	 * @param id?: string - 可选，添加到的 link 标签的 id 名称。如果留空，则直接添加而不配置 id 名称，这样做可能无法规定生命周期
	 * @returns true - 添加成功
	 * @exception false - 添加失败，输入的 id 名称被占用且不为 link 标签
	 */
	_.appendCSSLink = (href, id = "") => {
		var linkTag = document.getElementById(id);
		if (!linkTag) {
			linkTag = document.createElement("link");
			linkTag.id = id;
			linkTag.rel = "stylesheet";
			linkTag.type = "text/css";
			document.head.appendChild(linkTag);
		}
		if (linkTag.tagName != "LINK") {
			console.error(resource().notAvailableLog);
			return false;
		}
		linkTag.href = href;
		return true;
	}
	/** method description
	 * 输入 CSS 文件链接并添加到 style 标签，通过异步实现
	 * @param href: string - 必选，CSS 文件的链接地址
	 * @param id?: string - 可选，添加到的 link 标签的 id 名称。如果留空，则直接添加而不配置 id 名称，这样做可能无法规定生命周期
	 * @param variable?: object - 可选，变量名称，规定 CSS 文件的某些变量的替换值
	 * @returns true - 添加成功
	 * @exception false - 添加失败，输入的 id 名称被占用且不为 link 标签
	 */
	_.appendStyleByAjax = (href, id = "", variable) => {
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
					console.error(resource().notAvailableLog);
					return false;
				}
				styleTag.innerHTML = cssText;
				return true;
			}
		}
		css.open("GET", path(href), true);
		return css.send();
	}
	/** method description
	 * 移除样式或 CSS 链接标签
	 * removeStyle 和 removeCSSLink 效果是一样的
	 * @param id: string - 必选，要移除的 CSS 样式的 id 名称
	 * @returns true - 移除成功
	 * @exception false - 移除失败，移除的不是 style 或 link 标签
	 */
	_.removeStyle = _.removeCSSLink = id => {
		let el = document.getElementById(id);
		if (!el) return false;
		if (el.tagName != "STYLE" && el.tagName != "LINK") return false;
		el.remove();
		return true;
	}
	/** method description
	 * 强制切换到深色主题
	 * @returns void
	 */
	_.DarkModeStyle = () => {
		_.darkModeFact = true;
		if (_.theme.includes("bootstrap")) {
			_.appendCSSLink(resource().bootstrap4DarkLink, "css");
			for (let i of document.getElementsByClassName("navbar")) {
				i.classList.remove("navbar-light");
				i.classList.remove("bg-light");
				i.classList.add("navbar-dark");
				i.classList.add("bg-dark");
			}
			const bbolsf = "bootstrap-btn-outline-light-style-fix";
			_.appendStyleByAjax(`css/${bbolsf}.css`, bbolsf);
		}
		_.scrollbar();
		_.removeStyle("light-root");
		_.appendStyle({
			":root": {
				"--text-color": "white",
				"--background-color": _.DarkBackgroundColor
			}
		}, "dark-root");
		_.nightDo();
		if (_.defineCustomBackgroundColor) document.body.style.backgroundColor = _.DarkBackgroundColor;
		if (_.DarkCSS) _.appendCSSLink(_.DarkCSS, "css");
		return true;
	}
	/** method description
	 * 强制切换到浅色主题
	 * @returns void
	 */
	_.LightModeStyle = () => {
		_.darkModeFact = false;
		if (_.theme.includes("bootstrap")) {
			_.appendCSSLink(resource().bootstrap4LightLink, "css");
			for (let i of document.getElementsByClassName("navbar")) {
				i.classList.remove("navbar-dark");
				i.classList.remove("bg-dark");
				i.classList.add("navbar-light");
				i.classList.add("bg-light");
			}
		}
		_.scrollbar();
		_.removeStyle("bootstrap-btn-outline-light-style-fix");
		_.removeStyle("dark-root");
		_.appendStyle({
			":root": {
				"--text-color": "black",
				"--background-color": _.LightBackgroundColor
			}
		}, "light-root");
		_.lightDo();
		if (_.defineCustomBackgroundColor) document.body.style.backgroundColor = _.LightBackgroundColor;
		if (_.LightCSS) _.appendCSSLink(_.LightCSS, "css");
		return true;
	}
	if (type(profile.darkMode) === "Boolean") _.darkModeFact = Boolean(profile.darkMode);
	if (type(profile.nightDo) === "Function") _.nightDo = profile.nightDo;
	if (type(profile.darkDo) === "Function") _.nightDo = profile.darkDo;
	if (type(profile.lightDo) === "Function") _.lightDo = profile.lightDo;
	if (profile.lightBackgroundColor || profile.darkBackgroundColor) {
		if (profile.lightBackgroundColor) _.LightBackgroundColor = profile.lightBackgroundColor;
		if (profile.darkBackgroundColor) _.DarkBackgroundColor = profile.darkBackgroundColor;
		_.defineCustomBackgroundColor = true;
	}
	if (profile.lightCSS) _.LightCSS = profile.lightCSS;
	if (profile.darkCSS) _.DarkCSS = profile.darkCSS;
	_.CurrentModeStyle();
	window.NightTime = _;
	
	/**
	 * 底部的资源文件
	 */
	function resource() {
		return {
			notAvailableLog: new Error("The ID you specified has been occupied by the other element, please try to use other ID!"),
			bootstrap4LightLink: "https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.min.css",
			bootstrap4DarkLink: "https://bootswatch.com/5/darkly/bootstrap.min.css",
		};
	}
}());
