"use strict";

var society = 1;
//0表示普通加减计算，1表示舍去进位计算，2表示四舍五入进位计算……

let resetMoney = Symbol('resetMoney');
class money { //钱对象
	constructor(type) {
		this.type = type;
		this[resetMoney]();
	}
	[resetMoney]() { //本来打算用#开头的私有方法的，遗憾HBuilderX内置浏览器内核太垃圾，等啥时候内核普遍更新了再换
		// #resetMoney = () => {
		//非法或未定义数值
		if (getCookie(this.type) === null || !(isFinite(getCookie(this.type) - 0)))
			setCookie(this.type, 4000);
		//超出10个无穷的上限
		var amount = getCookie(this.type) - 0;
		if (amount > 1e14) setCookie(this.type, 1e14);
		if (amount < -1e14) setCookie(this.type, -1e14);
	}
	amount() {
		this[resetMoney]();
		return getCookie(this.type) - 0;
	}
	amountName() {
		return money.getAmountName(this.amount());
	}
	recharge(m) {
		m = m - 0;
		var n, o = this.amount();
		switch (society) {
			case 1:
			case 2:
				/* 特殊部分 */
				if (o.getValidValue(1) == 1e13 && m.getValidValue(1) == -9e12) {
					n = 9e12;
					break;
				}
				if (o.getPrefix() >= 13 && Math.abs(m.getValidValue(1)) == 9e12)
					m = (m > 0 ? 1e13 : -1e13);
				/* 特殊部分完 */
				var oPref = o.getPrefix(),
					mPref = m.getPrefix();
				if (oPref > mPref) n = o;
				else if (oPref < mPref) n = m;
				else n = o + m;
				n = n.getValidValue(1);
				break;
			default:
				n = o + m;
				break;
		}
		setCookie(this.type, n);
		$("#amount-num").text(this.amountName());
		return this.amount();
	}
	cost(m) {
		if (m > this.amount()) {
			console.warn("余额不足！");
			return null;
		}
		return this.recharge(-m);
	}
	static getAmountName(amount) {
		return `${amount.getValidValue()} ${amount.getPrefix(1)}元`;
	}
	static amount(type, name = false) {
		return eval(type + ".amount" + (name ? "Name" : "") + "()");
	}
	static recharge(money, type) {
		return eval(type + ".recharge(" + money + ")");
	}
	static cost(money, type) {
		return eval(type + ".cost(" + money + ")");
	}
	static refreshMoney(type = "bill", el = "#amount-num") {
		return $(el).text(money.amount(type, true));
	}
}

(function() {
	function ee(x, a = 1) {
		if (x === undefined) return Math.E;
		return a * Math.pow(10, x);
	}
	Math.social = function(n) {
		switch (society) {
			case 2:
				return Math.round(n);
			case 1:
				return Math.trunc(n);
			default:
				return n;
		}
	}
	Number.prototype.getPrefix = function(name = false) {
		const metricPrefixName = ['', , , , '万', , , , '亿', , , , '兆', '∞ '];

		function divE(n, x) {
			return Math.social(n / ee(x));
		}
		var l = [0, 4, 8, 12, 13],
			a;
		for (var i = 1; i < l.length; i++)
			if (divE(this, l[i]) == 0) {
				a = l[i - 1];
				break;
			}
		if (a === undefined) a = l[l.length - 1];
		return (name ? metricPrefixName[a] : a);
	}
	Number.prototype.getValidValue = function(full = false) {
		var pref = ee(this.getPrefix()),
			a = Math.social(this / pref);
		return (full ? a * pref : a);
	}

	// $("#rechange-btn")/* .attr("data-bs-toggle","modal").attr("data-bs-target","#rechargeModal") */.attr("data-toggle","modal").attr("data-target","#rechargeModal");
	/* -webkit-fill-available */
}());

//cookie

function setCookie(name, value, days = 36500) {
	var expires = new Date();
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + expires.toGMTString();
}

function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return (arr[2]);
	else
		return null;
}

function Import(src, type = "") {
	var script = document.createElement("script");
	script.src = src;
	script.type = type;
	document.body.appendChild(script);
}

////

var bill = new money("bill");
money.refreshMoney();
