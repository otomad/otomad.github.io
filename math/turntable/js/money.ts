'use strict';

/// <reference path="money.d.ts" />
declare var jQuery: (selector: string) => any;
interface Number {
	getPrefix(name?: boolean): number | string;
	getValidValue(full?: boolean): number;
}
interface Math {
	trunc(n: number): number;
	social(n: number): number;
}
interface CSSRule {
	style: any;
	selectorText: any;
}
interface String {
	hyphenToCamelCase(): string;
	i(index: number, character?: string | number): string;
	replaces(stra: string | string[], strb?: string | string[], sep?: string, caseInsensitive?: boolean): string;
}

var society: number = 1;
//0表示普通加减计算，1表示舍去进位计算，2表示四舍五入进位计算……

let resetMoney: symbol = Symbol('resetMoney');
class money { //钱对象
	type: string;
	constructor(type: string) {
		this.type = type;
		this[resetMoney]();
	}
	private [resetMoney](): void {
		//非法或未定义数值
		if (cookie.get(this.type) === null || !isFinite(Number(cookie.get(this.type))))
			cookie.set(this.type, 4000);
		//超出10个无穷的上限
		var amount: number = Number(cookie.get(this.type));
		if (amount > 1e14) cookie.set(this.type, 1e14);
		if (amount < -1e14) cookie.set(this.type, -1e14);
	}
	amount(): number {
		this[resetMoney]();
		return cookie.get(this.type) - 0;
	}
	amountName(): string {
		return money.getAmountName(this.amount());
	}
	recharge(m: number): number {
		m = m - 0;
		var n: number,
			o: number = this.amount();
		switch (society) {
			case 1:
			case 2:
				/* 特殊部分 */
				if (o.getValidValue(true) == 1e13 && m.getValidValue(true) == -9e12) {
					n = 9e12;
					break;
				}
				if (o.getPrefix(false) >= 13 && Math.abs(m.getValidValue(true)) == 9e12)
					m = m > 0 ? 1e13 : -1e13;
				/* 特殊部分完 */
				var oPref = o.getPrefix(false),
					mPref = m.getPrefix(false);
				if (oPref > mPref) n = o;
				else if (oPref < mPref) n = m;
				else n = o + m;
				n = n.getValidValue(true);
				break;
			default:
				n = o + m;
				break;
		}
		cookie.set(this.type, n);
		this.refreshMoney();
		return this.amount();
	}
	cost(m: number): number | false {
		if (m > this.amount()) {
			console.warn('余额不足！');
			return false;
		}
		return this.recharge(-m);
	}
	refreshMoney(query: string | object = '#amount-num'): string | false {
		var el: HTMLElement | null;
		if (typeof query === 'string')
			el = document.querySelector(query);
		else if (typeof query === 'object' && query instanceof HTMLElement)
			el = query;
		else if (typeof query === 'object' && query instanceof jQuery)
			el = query[0];
		else return false;
		if (el === null) return false;
		return (el.innerText = this.amountName());
	}
	static getAmountName(amount: number): string {
		return `${amount.getValidValue(false)} ${amount.getPrefix(true)}元`;
	}
	static amount(type: string, name: boolean = false): number | string {
		return window[type]['amount' + (name ? 'Name' : '')]();
	}
	static recharge(money: number, type: string): number {
		return window[type].recharge(money);
	}
	static cost(money: number, type: string): number {
		return window[type].cost(money);
	}
	static refreshMoney(type: string = 'bill', el = '#amount-num'): string | false {
		return window[type].refreshMoney(el);
	}
	static create(type: string): object | false {
		/* if (window[type] !== undefined) {
			console.error("The money type which you created is exist or has already in other use, please try other type name!");
			return false;
		} */
		return (window[type] = new money(type));
	}
}

(function () {
	function ee(x: number, a: number = 1): number {
		if (x === undefined) return Math.E;
		return a * Math.pow(10, x);
	}
	Math.social = function (n: number): number {
		switch (society) {
			case 2:
				return Math.round(n);
			case 1:
				return Math.trunc(n);
			default:
				return n;
		}
	};
	Number.prototype.getPrefix = function (name: boolean = false): number | string {
		const metricPrefixName: (string | undefined)[] = ['', , , , '万', , , , '亿', , , , '兆', '∞ '];

		function divE(n: number, x: number): number {
			return Math.social(n / ee(x));
		}
		var l: number[] = [0, 4, 8, 12, 13],
			a: number = l[l.length - 1];
		for (let i: number = 1; i < l.length; i++)
			if (divE(<number>this, l[i]) == 0) {
				a = l[i - 1];
				break;
			}
		return name ? <string>metricPrefixName[a] : a;
	};
	Number.prototype.getValidValue = function (full: boolean = false): number {
		var pref: number = ee(<number>this.getPrefix(false)),
			a: number = Math.social(<number>this / pref);
		return full ? a * pref : a;
	};
	/* -webkit-fill-available */
	String.prototype.i = function (index: number, character: string = ""): string {
		return this.slice(0, index) + String(character) + this.slice(index + 1);
	}
	String.prototype.hyphenToCamelCase = function (): string {
		var result: string = "",
			capital: boolean = false;
		for (let char of this.toLowerCase()) {
			if (`-_+.,:`.includes(char)) capital = true;
			else {
				result += (capital ? char.toUpperCase() : char);
				capital = false;
			}
		}
		return result;
	}
	String.prototype.replaces = function (a: string | string[], b: string | string[], sep: string = ',', caseInsensitive: boolean = false): string {
		var s: string = <string>this;
		if (!Array.isArray(a)) a = a.split(sep);
		if (b && !Array.isArray(b)) b = b.split(sep);
		for (let i = 0; i < a.length; i++)
			s = s.replace(new RegExp(a[i], (caseInsensitive ? "gi" : "g")), (b ? b[i] : ''));
		return s;
	}
})();

var cookie = {
	set: function (name: string, value: any, days: number = 36500): void {
		var expires = new Date();
		expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
		document.cookie = name + '=' + escape(value) + ';expires=' + expires.toUTCString();
	},
	get: function (name: string): any {
		var arr: string[] | null,
			reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
		if ((arr = document.cookie.match(reg))) return arr[2];
		else return null;
	},
	text: () => document.cookie
}

var urlState = {
	data: {},
	clear: function (): void {
		this.data = {};
		history.pushState('', '', document.URL.split('?')[0]);
	},
	reset: function (): boolean {
		var questionMark: number = location.href.indexOf('?');
		this.data = {};
		if (questionMark === -1) return false;
		var state: string[] = location.href.slice(questionMark + 1).split('&');
		state.forEach(set => {
			var divide: string[] = set.split('=');
			this.data[decodeURIComponent(divide[0])] = decodeURIComponent(divide[1]);
		});
		return true;
	},
	get: function (name: string): string | null {
		if (!this.reset()) return null;
		var result: string | undefined = this.data[name];
		return (result === undefined ? null : result);
	},
	set: function (name: string, value?: string | number): true {
		this.reset();
		if (value !== undefined) this.data[name] = value;
		else delete this.data[name];
		return this.burn();
	},
	burn: function (obj?: object): true {
		if (obj !== undefined) this.data = obj;
		var encodeState = {};
		for (let key in this.data)
			encodeState[encodeURIComponent(key)] = encodeURIComponent(this.data[key]);
		var encodeURL: string = JSON.stringify(encodeState).replace(/\:/g, '=').replace(/\,/g, '&').replace(/\"/g, '').slice(1, -1);
		history.pushState("", "", "?" + encodeURL);
		return true;
	},
	obj: function (): object | null {
		if (!this.reset()) return null;
		return this.data;
	}
};
urlState.reset()

var rootCSS = {
	text: {},
	val: {},
	value: {},
	reset: function (): void {
		for (let i = 0; i < document.styleSheets.length; i++) {
			try {
				for (let j = 0; j < document.styleSheets[i].cssRules.length; j++) {
					if (document.styleSheets[i].cssRules[j].selectorText == ":root") {
						for (let k = 0; k < document.styleSheets[i].cssRules[j].style.length; k++) {
							let name: string = document.styleSheets[i].cssRules[j].style[k],
								value: string | number = document.styleSheets[i].cssRules[j].style.getPropertyValue(name).trim(),
								CamelCase: string = name.hyphenToCamelCase(),
								camelCase: string = CamelCase[0].toLowerCase() + CamelCase.slice(1);
							this.text[camelCase] = this.text[CamelCase] = this.text[name] = value;
							value = Number((<string>value).replaces("px,rem,em,vw,vh,vmin,vmax,%,in,cm,mm,pt,pc,ex,ch,ms,s", '', undefined, true));
							this.val[camelCase] = this.val[CamelCase] = this.val[name] = value;
						}
					}
				}
			} catch (e) { continue; }
		}
		this.value = this.val;
	}
}
rootCSS.reset();

function Import(src: string, type: string = ''): void {
	var script = document.createElement('script');
	script.src = src;
	script.type = type;
	document.body.appendChild(script);
}

////

money.create('bill');
money.refreshMoney();
