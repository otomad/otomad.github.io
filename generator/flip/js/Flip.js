(function (Tools) {
	"use strict";
	Tools.Flip = go.Class(Tools.DualWin, {
		init: function () {
			this.menu = new Tools.Flip.Menu(this.node.find(".flip-backed"));
			this.menu.addEventListener("select", this.onMenu);
			this.sel = "flip";
			this.normSymb();
		},
		onMenu: function (e) {
			var value = e.data.value;
			if (value !== this.sel) {
				this.sel = value;
				this.changeLeft(this.leftNode.value);
			}
		},
		left2right: function (text) {
			if (this.sel === "back") {
				return this.reverse(text);
			}
			return this.flip(text, this.symbs);
		},
		right2left: function (text) {
			if (this.sel === "back") {
				return this.reverse(text);
			}
			return this.flip(text, this.symbsF);
		},
		reverse: function (text) {
			return text.split("").reverse().join("");
		},
		flip: function (text, S) {
			var len,
				i,
				result = [],
				c,
				t;
			t = text.toLowerCase();
			for (i = 0, len = t.length; i < len; i += 1) {
				c = t.charAt(i);
				result.push(S[c] ? S[c] : c);
			}
			return result.reverse().join("");
		},
		normSymb: function () {
			var symbs = this.symbs,
				symbsN = {},
				symbsF = {},
				c,
				k;
			for (k in symbs) {
				if (symbs.hasOwnProperty(k)) {
					c = symbs[k];
					symbsN[k] = c;
					symbsF[c] = k;
					if (!symbsN[c]) {
						symbsN[c] = k;
					}
					if (!symbsF[k]) {
						symbsF[k] = c;
					}
				}
			}
			this.symbs = symbsN;
			this.symbsF = symbsF;
		},
		symbs: {
			a: "\u0250",
			b: "q",
			c: "\u0254",
			d: "p",
			e: "\u01DD",
			f: "\u025F",
			g: "\u0183",
			h: "\u0265",
			i: "\u0131",
			j: "\u027E",
			k: "\u029E",
			m: "ɯ",
			n: "u",
			p: "d",
			q: "b", //"ᕹ",
			r: "\u0279",
			t: "\u0287",
			u: "n",
			v: "\u028C",
			w: "\u028D",
			y: "\u028E",
			".": "\u02D9",
			"[": "]",
			"]": "[",
			"(": ")",
			")": "(",
			"{": "}",
			"}": "{",
			"?": "\u00BF",
			"!": "\u00A1",
			"'": ",",
			",": "‘",
			"<": ">",
			">": "<",
			_: "\u203E",
			"\u203F": "\u2040",
			"\u2045": "\u2046",
			"\u2234": "\u2235",
			а: "ɐ",
			б: "ƍ",
			в: "ʚ",
			г: "ɹ",
			д: "ɓ",
			е: "ǝ",
			ё: "ǝ\u0324",
			ж: "ж",
			з: "ε",
			и: "и",
			й: "n\u032F",
			к: "ʞ",
			л: "v",
			м: "w",
			н: "н",
			о: "о",
			п: "u",
			р: "d",
			с: "ɔ",
			т: "ɯ",
			у: "ʎ",
			ф: "ȸ",
			х: "х",
			ц: "ǹ",
			ч: "Һ",
			ш: "m",
			щ: "m",
			ъ: "q",
			ы: "ıq",
			ь: "q",
			э: "є",
			ю: "oı",
			я: "ʁ"
		},
		eoc: null,
	});
	Tools.Flip.Menu = go.Class([go.Ext.Events], {
		Item: go.Class({
			__construct: function (Menu, node) {
				this.Menu = Menu;
				this.node = $(node);
				this.enabled = this.node.hasClass("cur");
				this.value = this.node.attr("data-value");
				this.node.click(this.onClick);
			},
			enable: function () {
				if (!this.enabled) {
					this.enabled = true;
					this.node.addClass("cur");
				}
			},
			disable: function () {
				if (this.enabled) {
					this.enabled = false;
					this.node.removeClass("cur");
				}
			},
			onClick: function (e) {
				this.Menu.onClick(e, this);
			},
			eoc: null,
		}),
		__construct: function (node) {
			this.node = node;
			this.loadItems();
			this.active = true;
			$(window).click(this.onClickWindow);
		},
		loadItems: function () {
			var Item = this.Item,
				items = [],
				nodes = this.node.find(".item"),
				len = nodes.length,
				i;
			for (i = 0; i < len; i += 1) {
				items.push(new Item(this, nodes.eq(i)));
			}
			this.items = items;
		},
		onClick: function (e, item) {
			this.select(item);
		},
		open: function () {},
		close: function () {
			this.node.find(".tool__title-wrapper").removeClass("tool__title-wrapper--active");
		},
		select: function (item) {
			var len = this.items.length,
				i,
				cur;
			this.node.find(".tool__title-wrapper").removeClass("tool__title-wrapper--active");
			var textTitle = item.node.text();
			var itemBtn = this.node.find(".js-btn-mobile-popup");
			itemBtn.text(textTitle);
			item.enable();
			for (i = 0; i < len; i += 1) {
				cur = this.items[i];
				if (cur !== item) {
					cur.disable();
				}
			}
			this.fireEvent("select", { value: item.value });
		},
		onClickWindow: function (e) {
			if (this.active && !e.originalEvent._flipMenu) {
				this.active = false;
			}
		},
		eoc: null,
	});
})(Tools);
(function () {
	const clearBtn = document.querySelector(".js-flip-clear");
	const copyBtn = document.querySelector(".js-flip-copy");
	const flipTextAreaLeft = document.querySelector(".tool__textarea--left");
	const flipTextAreaRight = document.querySelector(".tool__textarea--right");
	const containerRight = document.querySelector(".tool__item--right");
	const sussesMessage = document.querySelector(".js-succes-message");
	const btnFlipTitle = document.querySelector(".js-btn-mobile-popup");
	const btnFlipResult = document.querySelector(".js-btn-mobile-popup-result");
	const titleWrapper = document.querySelector(".js-title-wrapper");
	const openMenuTitle = () => {
		titleWrapper.classList.add("tool__title-wrapper--active");
	};
	const closeMenuTitle = () => {
		titleWrapper.classList.remove("tool__title-wrapper--active");
	};
	if (btnFlipTitle) {
		btnFlipTitle.addEventListener("click", openMenuTitle);
		btnFlipResult.addEventListener("click", closeMenuTitle);
	}
	const textareaList = document.querySelectorAll(".tool__textarea");
	const showList = document.querySelector(".js-list-show");
	if (textareaList) {
		textareaList.forEach(area => {
			area.addEventListener("input", () => {
				if (area.value == "") {
					showList.classList.remove("tool__list--active");
				} else {
					showList.classList.add("tool__list--active");
				}
			});
		});
	}
	const titleList = document.querySelectorAll(".js-title-tool");
	const titleLine = document.querySelector(".js-line-tool");
	if (titleList/*  && window.innerWidth > 768 */) {
		for (let i = 0; i < titleList.length; i++) {
			titleLine.style.width = titleList[0].offsetWidth + "px";
			titleList[i].addEventListener("click", () => {
				titleLine.style.width = titleList[i].offsetWidth + "px";
				if (i === 0) {
					titleLine.style.left = 0 + "px";
				}
				if (i === 1) {
					let left = titleList[i].offsetParent.offsetWidth - titleList[i].offsetWidth;
					titleLine.style.left = left + "px";
				}
			});
		}
		window.addEventListener("resize", () => {
			$(titleList).filter(".cur").click();
		});
	}
	if (clearBtn) {
		clearBtn.addEventListener("click", function () {
			flipTextAreaLeft.value = "";
			showList.classList.remove("tool__list--active");
		});
	}
	const removeMessage = () => {
		if (sussesMessage.classList.contains("tool__message-block--active")) {
			sussesMessage.classList.remove("tool__message-block--active");
		}
	};
	const activeMessage = () => {
		sussesMessage.classList.add("tool__message-block--active");
	};
	if (copyBtn) {
		copyBtn.addEventListener("click", function () {
			let input = document.createElement("input");
			input.type = "text";
			input.classList.add("visually-hidden");
			containerRight.appendChild(input);
			input.value = flipTextAreaRight.value;
			input.select();
			document.execCommand("copy");
			activeMessage();
			setTimeout(removeMessage, 800);
			input.remove();
		});
	}
})();
(function () {
	$("#btnFlip").click(flip);

	function flip() {
		var result = flipString($("#txtTitle").val().toLowerCase());
		$("#txtResult").val(result);
	}

	function flipString(aString) {
		var last = aString.length - 1;
		//Thanks to Brook Monroe for the
		//suggestion to use Array.join
		var result = new Array(aString.length)
		for (var i = last; i >= 0; --i) {
			var c = aString.charAt(i);
			var r = flipTable[c];
			result[last - i] = r != undefined ? r : c;
		}
		return result.join('')
	}

	var flipTable = {
		a: '\u0250',
		b: 'q',
		c: '\u0254', //open o -- from pne
		d: 'p',
		e: '\u01DD',
		f: '\u025F', //from pne
		g: '\u0183',
		h: '\u0265',
		i: '\u0131', //from pne
		j: '\u027E',
		k: '\u029E',
		//l : '\u0283',
		m: '\u026F',
		n: 'u',
		r: '\u0279',
		t: '\u0287',
		v: '\u028C',
		w: '\u028D',
		y: '\u028E',
		'.': '\u02D9',
		'[': ']',
		'(': ')',
		'{': '}',
		'?': '\u00BF', //from pne
		'!': '\u00A1',
		"\'": ',',
		'<': '>',
		'_': '\u203E',
		';': '\u061B',
		'\u203F': '\u2040',
		'\u2045': '\u2046',
		'\u2234': '\u2235',
		'\r': '\n' //thank you, Yeeliberto
	}

	for (let i in flipTable)
		flipTable[flipTable[i]] = i;
});