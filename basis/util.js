/** configuration description
 * @file util.js
 * @brief <h1>常用的 js 操作封装
 * <p>可以通过 {@code script} 标签引入，也可以通过 ES Module 的 import 引入。
 * 也可以把需要的操作单独复制出去，只是这样的话不便于维护。
 * 由于未来浏览器可能会内置这些功能，但是用法不一定相同，请不要过于依赖本功能或复制出去自己使用。
 * @attention 若对以下实例使用 {@code for...in...} 循环，会导致这些方法也被打印出来了。建议按照如下方法使用 {@code for...in...}：
 * <pre>{@code
	for (const key in object) {
		if (Object.hasOwnProperty.call(object, key)) {
			const element = object[key];
			if (typeof element === "function") continue;
			// Type your code here...
		}
	}
 * }</pre>
 */
/* 最基本操作 */
if (Window) {
	/** method description
	 * @brief 终极测定元素类型的方法。
	 * @param {*} obj - 需要测定的元素。
	 * @param {? boolean} lowerCase - 是否自动转为全部小写形式？若为否则保留原名称的大小写形式。默认为否。
	 * @returns {string}
	 */
	window.type = (obj, lowerCase = false) => {
		let type = (obj ? obj.constructor.name : Object.prototype.toString.call(obj).slice(8, -1));
		return (lowerCase ? type.toLowerCase : type);
	}
}
/* 字符串操作 */
if (String) {
	/** method description
	 * @brief 类似 {@see PHP} 的 {@code str_replace} 函数功能，允许在替换与被替换的参数内输入数组，然后依照数组顺序依次替换。方便使用。
	 * 另外也可以在前两个参数中直接输入字符串，并用第三个参数指定的分隔符隔开。省去使用 {@code split} 函数进行的多余操作。
	 * @param {string[] | string} a - 待替换的字词。
	 * @param {? (string[] | string)} b - 替换的字词。可留空，留空表示删去。
	 * @param {string=} sep - 分隔符。若参数 {@code a} 和 {@code b} 为数组型，本参数不起作用。默认为 {@code ','} 。
	 * @param {boolean=} caseInsensitive - 区分大小写？默认为否。
	 * @returns {string} 替换后的内容。
	 */
	String.prototype.replaces = function (a, b, sep = ',', caseInsensitive = false) {
		var s = this;
		if (!Array.isArray(a))
			a = a.split(sep);
		if (b && !Array.isArray(b))
			b = b.split(sep);
		for (let i = 0; i < a.length; i++)
			s = s.replace(new RegExp(a[i], (caseInsensitive ? "gi" : "g")), (b ? b[i] : ''));
		return s;
	}
	/** method description
	 * @brief 字符串查找指定字符的数目。
	 * @attention 本方法不能与上面的 {@code replaces} 方法一起使用，因为那个的方法需要使用到正则表达式功能，其中所有的 <b>反斜杠 {@code '\'}</b> 会依次被 “JavaScript 的字符串” 和 “正则表达式” 转换两次。因此这时的字符串再使用本方法会发生问题。
	 * @param {...character} 待查找的字符。
	 * @returns {number} 查找指定字符的数目。
	 */
	String.prototype.finds = function () {
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
	/** method description
	 * @brief 字符串颠倒顺序。
	 * 使用 {@code Array.from()} 可以避免 Unicode BMP 外的其它字符不能正常翻转的问题。
	 * @returns {string}
	 */
	String.prototype.reverse = function () {
		return Array.from(this).reverse().join('');
	}
	/** method description
	 * @brief 字符串转布尔型。
	 * 用以解决类似 {@code "false" == false} 为 false 这样奇怪的问题。
	 * @returns {boolean}
	 */
	String.prototype.bool = function () {
		return !(/^false$/i).test(this.trim());
	}
	/** method description
	 * @brief 字符串是否为括号里面数组中某个字符串。
	 * @param {...string}
	 * @returns {boolean}
	 */
	String.prototype.is = function () {
		var n = 0,
			arg = arguments;
		if (arguments.length == 1)
			arg = arguments[0].split(',');
		for (var i = 0; i < arg.length; i++)
			if (this == arg[i])
				return true;
		return false;
	}
	/** method description
	 * @brief 字符串转类似 C 的字符数组，即数组的每一项对应字符串的每一个字符。
	 * @returns {array}
	 */
	String.toArray = function () {
		return Array.from(this);
	}
	/** method description
	 * @brief 字符串两两字符间插一个字符。
	 * @param {string=} sep - 分隔符。默认为 {@code ','} 。
	 * @returns {string}
	 */
	String.prototype.inTwo = function (sep = ',') {
		return Array.from(this).join(sep);
	}
	/** method description
	 * @brief 类似 C 的对字符串的某个下标的字符进行替换。
	 * @attention 由于在 JavaScript 中字符串属于原始类型，不能像 C 一样对原字符串进行修改，必须赋值给自己。使用方法：
	 * <pre>{@code
		str = str.i(0,'a');
	 * }</pre>
	 * @param {number} index - 字符下标。
	 * @param {? string} character - 替换的字符（串）。留空表示删去。
	 * @returns {string}
	 */
	String.prototype.i = function (index, character = "") {
		return this.slice(0, index) + String(character) + this.slice(index + 1);
	}
	/** method description
	 * @brief 字符串连字符/下划线形式转驼峰形式。
	 * @returns {string}
	 */
	String.prototype.hyphenToCamelCase = function () {
		return this.replace(/[\-\_\+\.\,\:](\S)/g, (_, letter) => letter.toUpperCase());
	}
	/** method description
	 * @brief 字符串驼峰形式转连字符/下划线形式。
	 * @param {string=} hyphen - 选择什么形式的符号分隔，默认为连字符 {@code '-'} 。
	 * @returns {string}
	 */
	String.prototype.camelToHyphenCase = function (hyphen = '-') {
		return this.replace(/([A-Z])/g, hyphen + "$1").toLowerCase();
	}
}
/* 数组操作 */
if (Array) {
	/** method description
	 * @brief 根据数组的下标，删除该下标的元素。
	 * @param {number} val - 待删除的元素在数组中的下标。
	 * @returns {array} - 返回原数组，而不是被删除的元素、
	 */
	Array.prototype.remove = function (val) { //根据数组的下标，删除该下标的元素
		var index = this.indexOf(val);
		if (index > -1)
			this.splice(index, 1);
		return this;
	}
	/** method description
	 * @brief 清除数组里面的空串。
	 * @attention 我个人习惯若 if, for 等若只包含一条语句，则一律不加花括号的。然而像下面这种情况，如果不加花括号，下面的 else 实际上将跟随到错误的 if 语句上面去。
	 * @returns {array}
	 */
	Array.prototype.trim = function () {
		function isEmpty(str) {
			return (str.replace(/(^\s*)|(\s*$)/g, "").length == 0);
		}
		for (let i = 0; i < this.length; i++) {
			const el = this[i];
			if (typeof el == "string") {
				if (isEmpty(el))
					this.splice(i--, 1);
			}
			else if (el === undefined || el === null)
				this.splice(i--, 1);
		}
		return this;
	}
	/** method description
	 * @brief 清除数组中重复的数据。
	 * 此外还可以限制数组的长度。
	 * @param {? number} limit - 限制数组长度，删除较早的数据。默认为无穷大，表示不限制。
	 * @returns {array}
	 */
	Array.prototype.distinct = function (limit = Infinity) {
		var repeat = [];
		for (let i = this.length - 1; i >= 0; i--) {
			const item = this[i];
			if (repeat.includes(item)) this.splice(i, 1);
			else repeat.push(item);
		}
		if (this.length > limit)
			this.splice(0, this.length - limit);
		return this;
	}
}
/* 数学操作 */
if (Math) {
	/** method description
	 * @brief 生成给定两个数之间随机的整数。
	 * @param {number} min - 最小值。
	 * @param {number} max - 最大值。
	 * @returns {number}
	 */
	Math.randBetween = (min, max) => Math.floor(Math.random() * (max + 1 - min) + min);
	/** method description
	 * @brief 主要针对负数的一个拟定的取模，使其更适合实际使用，返回一个非负数。
	 * 比如说。当随机给出一个角度，但实际上只有取其除以 360° 所得的余数才是我们需要的真正角度，关于转了几圈我们并不在乎。然而当被除数为负数的时候，直接使用 {@code %} 会发生一些变化。我们希望这样求出来的结果也是更符号实际使用的一个正数。
	 * @param {number} a - 被除数。
	 * @param {number} b - 除数。
	 * @returns {number} 余数。
	 */
	Math.PNMod = (a, b) => {
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
	/** method description
	 * @brief 用函数的方式表达类似 1e8 这样的科学计数法数值。默认为 1 乘以 10 的多少次方。
	 * @param {? number} x - 指数。若此处留空转而输出自然常数 e。
	 * @param {? number} a - 系数。留空为 1 。
	 * @returns {number}
	 */
	Math.ee = (x, a = 1) => (x === undefined ? Math.E : a * Math.pow(10, x));
	/** method description
	 * @brief 将一个数值约束的一个指定范围内，超出则返回对应的最小值或最大值。
	 * @param {number} x - 待约束的数值。
	 * @param {? number} min - 最小值。留空表示不约束。
	 * @param {? number} max - 最大值。留空表示不约束。
	 * @returns {number}
	 */
	Math.restrict = (x, min = -Infinity, max = Infinity) => {
		if (min > max) [min, max] = [max, min];
		if (x < min) return min;
		if (x > max) return max;
		return x;
	}
	/** method description
	 * @brief <h1>不准温度计</h1>
	 * 即将一个数值从一个标度单位转移到另一个标度单位，新旧单位成线性关系，且不一定成正比关系，比如说摄氏度和华氏度的关系，返回对应的新值。
	 * 比如说，将一个取值范围为 0 ~ 255 的颜色值转到 0 ~ 100 的值。
	 * @param {number} x - 待转换的数值。
	 * @param {number} min - 原标度值（小）。
	 * @param {number} max - 原标度值（大）。
	 * @param {number} a - 新标度值（小）。
	 * @param {number} b - 新标度值（大）。
	 * @returns {number}
	 */
	Math.map = (x, min, max, a, b) => ((b - a) * (x - min) / (max - min)) + a;
}
/*
 * 对象操作
 * 注意：由于 Object 经常需要用到 for...in... 操作，若对 Object 进行 prototype，会把这些新方法也打印一遍，非常不便。因此只能将方法放到类上，并将原对象作为参数传入。
 */
if (Object) {
	/** method description
	 * @brief 根据指定下标返回对象对应的键或值。
	 * @param {object} obj - 对象。
	 * @param {number} index - 指定下标、
	 * @param {boolean} getKey - 返回“键”？如是则返回键，如否则返回值。默认为是。
	 * @returns {*} 结果取决于 {@code getKey} 的值。若找不到对应下标，返回 undefined。
	 */
	Object.index = function (obj, index, getKey = true) {
		if (typeof index != "number" || !isFinite(index)) return;
		let i = 0;
		for (const key in obj)
			if (Object.hasOwnProperty.call(obj, key)) {
				if (i == index) return getKey ? key : obj[key];
				i++;
			}
	}
	/** method description
	 * @brief 在对象中根据键名搜索对应的值。
	 * @param {object} obj - 对象。
	 * @param {string} key - 待查找的键名。
	 * @returns {*} 若有同名键，只返回第一个值。
	 */
	Object.search = function (obj, key) {
		for (const i in obj) {
			if (Object.hasOwnProperty.call(obj, i)) {
				const el = obj[i];
				if (i === key) return el;
				if (Object.prototype.toString.call(el) === '[object Object]') {
					ans = Object.search(el, key);
					if (ans !== undefined) return ans;
				}
			}
		}
	}
}
/* 音频操作 */
if (Audio) {
	/** method description
	 * @brief 重新播放音频。
	 * @param {? number} time - 若给定值，则从给定的位置开始播放音频。单位毫秒。默认为 0，即从头播放。
	 */
	Audio.prototype.replay = function (time = 0) {
		this.currentTime = time;
		this.play();
	}
}
/* 页面操作 */
if (document) {
	/** method description
	 * @brief 引入一个新的 JavaScript（或其它语言）的脚本（或模块）至页面。
	 * 由于 import 已被作为 ES Module 的模块引入的关键字了，这里将首字母 I 大写。
	 * 根据用法，参考 C 和 PHP，这并不是引入模块，相当于把指定文件的内容搬过来（还可能是异步的），因此叫 include 其实更合适。
	 * @param {string} src - 文件路径。
	 * @param {string=} type - 脚本类型，默认为 {@code text/javascript} 。可以给定其它如 {@code module} 等。
	 */
	document.Import = function (src, type = "text/javascript") {
		var script = document.createElement('script');
		script.src = src;
		script.type = type;
		document.body.appendChild(script);
	}
	/** method description
	 * @brief 查找 meta 标签指定 name 的 content。
	 * @param {string} name - 名称。
	 * @returns {string} content。
	 */
	document.meta = name => document.getElementsByName(name)[0].content;
	/** method description
	 * @brief 类似 {@code React.createElement} 的建立新 HTML 元素的方法。
	 * 原生的 {@code document.createElement} 只接受 tag 参数，其余都需要手动逐个添加属性，非常麻烦。
	 * @example 使用例：
	 * <pre>{@code
		document.createElements(
			"div",
			{ class: "box", id: "mydiv" },
			document.createElements("p", null)
		);
	 * }</pre>
	 * 将会生成
	 * <pre>{@code
		<div class="box" id="mydiv">
			<p></p>
		</div>
	 * }</pre>
	 * @param {string} tag - HTML 标签名称。
	 * @param {object | null} attr - 指定标签的属性（attribute），用对象表示。若为 null 则表示无属性。
	 * @param {...(HTMLElement | string)}} children - 子节点。
	 * @returns {HTMLElement} 返回构造的新 HTML 节点。
	 */
	document.createElements = function (tag, attr = null, ...children) {
		el = document.createElement(tag);
		if (attr)
			for (const name in attr)
				el.setAttribute(name, attr[name])
		for (let child of children) {
			if (typeof child != "object") child = document.createTextNode(child);
			el.appendChild(child);
		}
		return el;
	}
}
/*
 * emmet 操作（如果有）
 * 这里使用的是 emmet 官网中利用 textarea 实现的 js 脚本，因此需要引入这个脚本才能使用。
 */
if (window.emmet) {
	/** method description
	 * @brief 输入 emmet 语句，返回转换出来 HTML 结构的字符串。
	 * 我不想在 JavaScript 里面写 HTML，一丑，二占空间（字符串不能自己压缩，包括前面缩进用的制表符），三字符串没有语法高亮。
	 * 因此写 emmet 语句就简练多了。
	 * @param {string} text - 输入 emmet 语句。
	 * @returns {string} 返回转换出来 HTML 结构的字符串。
	 */
	emmet.get = (text = '') => {
		let textarea = document.createElement("textarea");
		textarea.value = text;
		emmet.require('textarea').setup({
			pretty_break: true,
			use_tab: true
		});
		var editor = emmet.require('editor');
		editor.setContext(textarea);
		emmet.require('actions').run('expand_abbreviation_with_tab', editor);
		return textarea.value;
	}
}
/* React 操作（如果有） */
if (window.React) {
	/** method description
	 * @brief React 需要一个根节点，然后把组件都放在里面。
	 * 有时我不想在 HTML 放一个新的节点来装组件，干脆直接在 js 里面构建一个。
	 * @param {string} id - 根节点的 id 名称。
	 * @returns {HTMLElement} 如果指定的 id 本来就存在，则直接返回这个元素，否则就会新建一个元素并返回。
	 */
	React.root = id => {
		var el = document.getElementById(id);
		if (el === null) {
			el = document.createElement("div");
			el.id = id;
			document.body.append(el);
		}
		return el;
	}
}
/* 控制台操作 */
if (console) {
	/** method description
	 * @brief 控制台输出信息操作会返回 undefined，非常不便于链式语法。
	 * 这样你就可以使用类似 {@code
		return console.plog("Some text...");
	 * } 这样的语法了。即除了控制台打印这都内容，也会返回这段内容。
	 * 在原有控制台方法的名称前加了一个 'p'，当初缘由是来自 C 中 printf 函数的首字母。
	 * @param {*} text - 需要在控制台显示的对象。
	 * @returns 你输入啥返回的还是啥。
	 * 以下三个均一致，只是消息的类型不同。
	 * @attention 值得注意的是，若为错误信息，会构造一个 Error 对象。
	 */
	console.pwarn = text => { //警告
		console.warn(text);
		return text;
	}
	console.plog = text => { //普通消息
		console.log(text);
		return text;
	}
	console.perror = text => { //错误
		console.error(new Error(text));
		return text;
	}
}
/* jQuery 操作（如果有） */
if (window.jQuery) {
	/** method description
	 * @brief jQuery 的 {@code $()} 方法只能接受一个参数，若想包含多个元素，只能频繁使用 {@code add()} 方法。
	 * 虽然可以在 {@code $()} 中用字符串添加逗号的方法实现，但是若我现在只有对象元素而不是 CSS 选择器，这种方法就不行。
	 * @example 使用例：
	 * <pre>{@code
		$.plenty(document, document.body);
	 * }</pre>
	 * @param {...any} arg - 元素。
	 * @returns {jQuery} 返回 jQuery 选择器元素。
	 */
	$.plenty = function (...arg) {
		/* if (Object.prototype.toString.call(query) !== "[object Array]")
			query = [query]; */
		var jq = $();
		for (let i of arg)
			jq.add(arg);
		return jq;
	}
	/* 注：以下部分方法除对 jQuery 生效外，也对 HTMLElement 生效。 */
	/** method description
	 * @brief 按钮呈活跃状态（不是按下）。即对元素添加 “active” 这个 class。注意是 “.active” 不是 “:active”，后者是鼠标按下的伪类。
	 * @param {boolean} active - 如是活跃，如否取消活跃。默认为是。
	 * @returns {jQuery}
	 */
	$.fn.active = HTMLElement.prototype.active = function (active = true) {
		return active ? $(this).addClass("active") : $(this).removeClass("active");
	}
	/** method description
	 * @brief 按钮呈禁用状态。即对元素添加 “disabled” attribute。
	 * @param {boolean} disabled - 如是禁用，如否启用。默认为是。
	 * @returns {jQuery}
	 */
	$.fn.disabled = HTMLElement.prototype.disabled = function (disabled = true) {
		return disabled ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled");
	}
	/** method description
	 * @brief 按钮闪烁一下。实际上就是对元素添加 “active” 这个 class，紧接着又马上移除它。
	 * @returns {jQuery}
	 */
	$.fn.shine = HTMLElement.prototype.shine = function () {
		setTimeout(() => this.active(0), 500);
		return $(this).active();
	}
	/** method description
	 * @brief 修改 Bootstrap (V4) 的工具提示条文本。
	 * @param {string} text - 新的工具提示文本。
	 * @returns {jQuery}
	 */
	$.fn.changeTooltip = HTMLElement.prototype.changeTooltip = function (text) {
		return $(this).attr('title', text).tooltip('_fixTitle');
	}
	/** method description
	 * @brief jQuery 新建 HTML 标签。因为我不想在字符串里面写 HTML。
	 * @param {string | object} tag - 新元素 tag 名称。若此处为 Object，则一律依照此 Object 的属性进行操作。
	 * @param {string} id - 新元素 id 名称。
	 * @param {string} className - 新元素 class 名称。
	 * @param {*} content - 新元素的子项，如文本内容。
	 * @returns {jQuery} 注意是返回父节点，不是子节点。
	 */
	$.fn.appTag = function (tag, id = "", className = "", content = "") {
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
	/** method description
	 * @brief 对元素大小重新调整。因为 width 和 height 设为 auto 是没有 CSS 动画效果的，因此借助 jQuery 的动画辅助实现。
	 * @returns {jQuery}
	 */
	$.fn.cardResize = function () {
		var curHeight = this.height(),
			autoHeight = this.css('height', 'auto').height(),
			curWidth = this.width(),
			autoWidth = this.css('width', 'auto').width();
		this.height(curHeight).width(curWidth).animate({
			height: autoHeight,
			width: autoWidth
		}, 250, "easeInOutCubic"); // 此处需要引入 jquery.easing
		return this;
	}
	/** method description
	 * @brief 是否包含某个 attr。
	 * 由于 jQuery 没有 hasAttr 方法，直接用这个 attr 判断是否为 undefined 会有少数情况不可靠。故新建此方法。
	 * @param {string} attr - 指定 attribute 属性。
	 * @returns {boolean}
	 */
	$.fn.hasAttr = function (attr) {
		return typeof this.attr(attr) !== "undefined";
	}
}
/* HTML 元素操作 */
if (HTMLElement) {
	/** method description
	 * @brief 改变元素的 tagName。
	 * @attention 注意正确的使用方法：
	 * <pre>{@code
		el = el.changeTagName("span");
	 * }</pre>
	 * 即必须赋值给自己。
	 * @param {? string} tag - 新标签名称。留空返回现在的 tagName。
	 * @returns {HTMLElement} 原参数是不能更改的，只会返回一个新的元素。
	 */
	HTMLElement.prototype.changeTagName = function (tag) {
		let curTag = this.tagName.toLowerCase();
		if (tag === undefined) return curTag;
		console.log("原参数不能更改，请手动将本函数返回值赋值给原参数。");
		if (this.parentNode === null) {
			console.log("节点不在页面中。");
			let el = document.createElement(tag);
			for (const child of this.children)
				el.appendChild(child.cloneNode(true));
			for (const attr of this.attributes)
				el.setAttributeNode(attr.cloneNode(true));
			return el;
		} else {
			const parent = this.parentNode,
				siblings = () => parent.children;
			var i;
			for (i = 0; i < siblings(); i++)
				if (siblings()[i] == this)
					break;
			this.outerHTML = this.outerHTML.replace(new RegExp(`(?<=^\\<)${curTag}|${curTag}(?=\\>$)`, "gi"), tag);
			return siblings()[i];
		}
	}
	/** method description
	 * @brief 返回元素是父节点的第几个子项。
	 * @returns {number}
	 */
	HTMLElement.prototype.index = function () {
		const parent = this.parentNode;
		if (parent === null) return null;
		const siblings = parent.children;
		for (let index = 0; index < siblings.length; index++) {
			if (this === siblings[index])
				return index;
		}
	}
}
/* HTML 集合 和 节点列表 操作 */
if (!!HTMLCollection && !!NodeList) {
	/** method description
	 * @brief 让 HTMLCollection 也有 forEach 操作。（然而 NodeList 本来就有。）
	 * @param {function} func - 依次进行的操作，同数组的方法。三个参数依次为：元素、序号、原数组。
	 * @returns {void} None
	 */
	HTMLCollection.prototype.forEach = function (func) {
		for (let index = 0; index < array.length; index++) {
			const element = array[index];
			func(element, index, array);
		}
	}
	/** method description
	 * @brief 根据 HTML 集合 或 节点列表 找到指定元素是第几个。
	 * @param {HTMLElement} element - 待查找的 HTML 元素。
	 * @returns {number}
	 */
	HTMLCollection.prototype.indexOf = NodeList.prototype.indexOf = function (element) {
		for (let index = 0; index < this.length; index++)
			if (element === this[index])
				return index;
	}
}
/* 类型化数组操作 */
window.TypedArray = {
	/** method description
	 * @brief 给 TypedArray 集体添加新方法。因为 TypedArray 实际上是私有的类。只能逐个添加。
	 * @param {string} name - 名称。
	 * @param {function} func - 方法。
	 * @returns {function} 只返回一段声明。
	 */
	prototype: (name, func) => {
		const arr = [
			Int8Array,
			Uint8Array,
			Uint8ClampedArray,
			Int16Array,
			Uint16Array,
			Int32Array,
			Uint32Array,
			Float32Array,
			Float64Array
		];
		for (const a of arr)
			a.prototype[name] = func;
		return Uint8Array.prototype[name];
	}
}