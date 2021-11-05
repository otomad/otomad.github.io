const 名人名言列表 = new Map([
	["营销号生成器", "https://codepen.io/kasei-dis/full/JjYjwza"],
	["狗屁不通文章生成器", ["https://github.com/menzi11/BullshitGenerator", "https://suulnnka.github.io/BullshitGenerator/index.html"]],
	["明哥体生成器", "http://cht8687.github.io/mingify/example/"],
	["笑话生成器", ["https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/First_steps/Silly_story_generator", "https://github.com/roy-tian/learning-area/tree/master/javascript/introduction-to-js-1/assessment-finished"]],
	["乱数假文生成器", "http://www.atoolbox.net/Tool.php?Id=939"],
]);

/*
 * 这玩意ㄦ已经越看越不严谨了，干脆就用中文写代码算了。
 * 
 * 输入框书写格式：
 * xxx.输入框 = {
 * 	待填写的数据标题 1: 数据默认值 1,
 * 	待填写的数据标题 2: 数据默认值 2,
 * 	……
 * };
 */
class 名人名言 {
	constructor(名称, 链接, 简介 = "") {
		this.名称 = 名称;
		this.链接 = 链接;
		this.简介 = 简介;
		this.输入 = this.输入框 = {};
		this.结果 = null;
		this.最终结果 = "";
	}
	更新输入框() {
		$("#源码").html(urlToLink(this.链接));
		$("#这里将会冒出一堆输入框").html("");
		let 输入框 = this.输入框,
			i = 1;
		for (let 标题 in 输入框) {
			const 内容 = 输入框[标题];
			var 输入框组 = $("#这里将会冒出一堆输入框的模板")[0].content.children[0].cloneNode(true),
				这是选择题 = Array.isArray(内容),
				这是判断题 = typeof 内容 == "boolean";
			const
				标签 = 输入框组.querySelector("label"),
				文本框 = 输入框组.querySelector("input"),
				下拉菜单 = 输入框组.querySelector("select"),
				复选框 = 输入框组.querySelector("input[type=checkbox]"),
				复选框容器 = 复选框.parentNode,
				叉叉 = 输入框组.querySelector(".叉叉");
			标签.innerHTML = 标题;
			标签.htmlFor = "输入框-" + i;
			if (这是选择题) {
				下拉菜单.id = "下拉菜单-" + i;
				for (const 选项 of 内容)
					$(下拉菜单).append(`<option value="${选项}">${选项}</option>`);
				叉叉.onclick = () => 下拉菜单.value = 内容[0];
				下拉菜单.name = 标题;
				文本框.remove();
				复选框容器.remove();
			} else if (这是判断题) {
				复选框.id = "复选框-" + i;
				叉叉.onclick = () => 复选框.checked = 内容;
				复选框.name = 标题;
				复选框容器.onclick = () => 复选框.click();
				文本框.remove();
				下拉菜单.remove();
			} else {
				文本框.id = "输入框-" + i;
				文本框.placeholder = 内容;
				if (typeof 内容 == "number") 文本框.type = "number";
				叉叉.onclick = () => 文本框.value = "";
				文本框.name = 标题;
				下拉菜单.remove();
				复选框容器.remove();
			}
			叉叉.click();
			$("#这里将会冒出一堆输入框").append(输入框组);
			i++;
		}
		$("#简介").html(换行转段落(pangu.spacing(this.简介)));
	}
	用户输入() {
		this.输入 = $.extend({}, this.输入框);
		for (let 其中一项 of $("#这里将会冒出一堆输入框 input, #这里将会冒出一堆输入框 select")) {
			let 值 = 其中一项.value;
			if (其中一项.type === "checkbox") 值 = 值 !== "off";
			if (其中一项.value !== "") this.输入[其中一项.name] = 值;
		}
		return this.输入;
	}
	生成结果() {
		if ($("#选择名人名言").val() !== this.名称) return console.error("文不对题！");
		var 结果 = "";
		if (Object.prototype.toString.call(this.结果) !== "[object Function]")
			结果 = "<p class='text-danger'>无法生成结果，因为对象未定义。</p>";
		else {
			this.最终结果 = pangu.spacing(this.结果(this.用户输入())); // 盘古之白处理
			结果 = 换行转段落(this.最终结果);
		}
		$("#生成结果").html(结果);
	}
	static 新建(名称, 链接) {
		window[名称] = new 名人名言(名称, 链接);
	}
}

for (const [名人, 名场面] of 名人名言列表) {
	$("#选择名人名言").append(`<option value="${名人}">${名人}</option>`);
	名人名言.新建(名人, 名场面);
}
$("#选择名人名言 option:nth-of-type(1)").attr("selected", "selected");

$("#一键生成").click(() => {
	$("input[type=checkbox]").each(function () { this.value = this.checked ? "on" : "off" });
	var saying = $("#选择名人名言").val();
	window[saying].生成结果();
	urlState.burn({ saying, ...window[saying].输入 });
	if (parent != window) parent.history.pushState("", "", "?various&" + location.href.split('?')[1]);
});

$("#选择名人名言").change(function () {
	window[this.value].更新输入框();
	$("#一键生成").click();
});

function 初始化() {
	var saying = urlState.get("saying");
	if (!(名人名言列表.has(saying)))
		return $("#选择名人名言").change();
	$("#选择名人名言").val(saying);
	window[saying].更新输入框();
	for (let key in urlState.data) {
		if (key == "saying") continue;
		const content = urlState.data[key];
		const control = $(`#这里将会冒出一堆输入框 [name='${key}']`)[0];
		if (control.type == "checkbox") control.checked = content !== "off";
		else control.value = content;
	}
	$("#一键生成").click();
}

function 换行转段落(文本 = "") {
	return "<p>" + 文本.replace(/\n/g, "</p><p>") + "</p>";
}

String.prototype.掐头去尾 = function () {
	return this.slice(1, -1).replace(/\t/g, "");
}

Array.prototype.随机给个 = function () {
	return this[Math.floor(Math.random() * this.length)];
}

Array.prototype.getColumn = function (column = 0) {
	var a = [];
	this.forEach(element => a.push(element[column]));
	return a;
}

function urlToLink(str) {
	if (Object.prototype.toString.call(str) === "[object Array]") {
		for (let i = 0; i < str.length; i++) {
			str[i] = urlToLink(str[i]);
		}
		return str.join(" , ");
	}
	var re = /^(f|ht){1}(tp|tps):\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/g;
	str = str.replace(re, website => {
		return `<a href='${website}' target='_blank'>${website}</a>`;
	});
	return str;
};

$(document).ready(function () {
	$('[data-bs-toggle="tooltip"]').tooltip();
});

$("#复制按钮").click(function () {
	复制(window[$("#选择名人名言").val()].最终结果);
	document.execCommand("copy");
	$(this).focus().attr("title", '已复制').tooltip('_fixTitle').tooltip('show');
	setTimeout(() => $(this).attr("title", "复制到剪贴板").tooltip('_fixTitle'), 500);
});

function 复制(文本) {
	var input = document.createElement("textarea");
	input.value = 文本;
	input.style.opacity = 0;
	document.body.append(input);
	input.select();
	document.execCommand("copy");
	input.remove();
}

var urlState = {
	data: {},
	clear: function () {
		this.data = {};
		history.pushState("", "", location.href.split('?')[0]);
		return true;
	},
	reset: function () {
		var questionMark = location.href.indexOf('?');
		this.data = {};
		if (questionMark === -1)
			return false;
		var state = location.href.slice(questionMark + 1).split('&');
		state.forEach(set => {
			var divide = set.split('=');
			this.data[decodeURIComponent(divide[0])] = decodeURIComponent(divide[1]);
		});
		return true;
	},
	get: function (name) {
		if (!this.reset())
			return null;
		var result = this.data[name];
		return (result === undefined ? null : result);
	},
	set: function (name, value) {
		this.reset();
		if (typeof arguments[0] === "object") return this.burn({ ...this.data, ...arguments[0] });
		for (let i = 0; i < arguments.length; i += 2) {
			const name = arguments[i],
				value = arguments[i + 1];
			this.data[name] = value;
			if (value === undefined || value === null)
				delete this.data[name];
		}
		return this.burn();
	},
	burn: function (obj) {
		if (obj !== undefined)
			this.data = obj;
		if (JSON.stringify(this.data) === '{}') return this.clear();
		var encodeState = {};
		for (let key in this.data) {
			if (typeof this.data[key] == 'function') continue;
			encodeState[encodeURIComponent(key)] = encodeURIComponent(this.data[key]);
		}
		var encodeURL = JSON.stringify(encodeState).replace(/\:/g, '=').replace(/\,/g, '&').replace(/\"/g, '').slice(1, -1);
		history.pushState("", "", "?" + encodeURL);
		return true;
	},
	obj: function () {
		if (!this.reset())
			return null;
		return this.data;
	}
};

document.onkeydown = function (e) {
	if (window.event.keyCode == 13) {
		const curEl = $(":focus"),
			input = $("input,select");
		let i = input.index(curEl);
		if (i == -1) return;
		if (i + 1 == input.length) $("#一键生成").focus().click();
		else input[i + 1].focus();
	}
}

function reload() {
	urlState.clear();
	location.reload();
}