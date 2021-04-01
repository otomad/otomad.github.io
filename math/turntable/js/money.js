'use strict';
var society = 1;
//0表示普通加减计算，1表示舍去进位计算，2表示四舍五入进位计算……
var money;
(function () {
    let _resetMoney = Symbol('resetMoney');
    money = class money {
        constructor(type) {
            this.type = type;
            this[_resetMoney]();
        }
        [_resetMoney]() {
            //非法或未定义数值
            if (cookie.get(this.type) === null || !isFinite(Number(cookie.get(this.type))))
                cookie.set(this.type, 4000);
            //超出10个无穷的上限
            var amount = Number(cookie.get(this.type));
            if (amount > 1e14)
                cookie.set(this.type, 1e14);
            if (amount < -1e14)
                cookie.set(this.type, -1e14);
        }
        amount() {
            this[_resetMoney]();
            return cookie.get(this.type) - 0;
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
                    if (o.getValidValue(true) == 1e13 && m.getValidValue(true) == -9e12) {
                        n = 9e12;
                        break;
                    }
                    if (o.getPrefix(false) >= 13 && Math.abs(m.getValidValue(true)) == 9e12)
                        m = m > 0 ? 1e13 : -1e13;
                    /* 特殊部分完 */
                    var oPref = o.getPrefix(false), mPref = m.getPrefix(false);
                    if (oPref > mPref)
                        n = o;
                    else if (oPref < mPref)
                        n = m;
                    else
                        n = o + m;
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
        cost(m) {
            if (m > this.amount()) {
                console.warn('余额不足！');
                return false;
            }
            return this.recharge(-m);
        }
        refreshMoney(query = '#amount-num') {
            var el;
            if (typeof query === 'string')
                el = document.querySelector(query);
            else if (typeof query === 'object' && query instanceof HTMLElement)
                el = query;
            else if (typeof query === 'object' && query instanceof jQuery)
                el = query[0];
            else
                return false;
            if (el === null)
                return false;
            return (el.innerText = this.amountName());
        }
        static getAmountName(amount) {
            return `${amount.getValidValue(false)} ${amount.getPrefix(true)}元`;
        }
        static amount(type, name = false) {
            return window[type]['amount' + (name ? 'Name' : '')]();
        }
        static recharge(money, type) {
            return window[type].recharge(money);
        }
        static cost(money, type) {
            return window[type].cost(money);
        }
        static refreshMoney(type = 'bill', el = '#amount-num') {
            return window[type].refreshMoney(el);
        }
        static create(type) {
            /* if (window[type] !== undefined) {
                console.error("The money type which you created is exist or has already in other use, please try other type name!");
                return false;
            } */
            return (window[type] = new money(type));
        }
    };
    function ee(x, a = 1) {
        if (x === undefined)
            return Math.E;
        return a * Math.pow(10, x);
    }
    Math.social = function (n) {
        switch (society) {
            case 2:
                return Math.round(n);
            case 1:
                return Math.trunc(n);
            default:
                return n;
        }
    };
    Number.prototype.getPrefix = function (name = false) {
        const metricPrefixName = ['', , , , '万', , , , '亿', , , , '兆', '∞ '];
        function divE(n, x) {
            return Math.social(n / ee(x));
        }
        var l = [0, 4, 8, 12, 13], a = l[l.length - 1];
        for (let i = 1; i < l.length; i++)
            if (divE(this, l[i]) == 0) {
                a = l[i - 1];
                break;
            }
        return name ? metricPrefixName[a] : a;
    };
    Number.prototype.getValidValue = function (full = false) {
        var pref = ee(this.getPrefix(false)), a = Math.social(this / pref);
        return full ? a * pref : a;
    };
    /* -webkit-fill-available */
    String.prototype.i = function (index, character = "") {
        return this.slice(0, index) + String(character) + this.slice(index + 1);
    };
    String.prototype.hyphenToCamelCase = function () {
        var result = "", capital = false;
        for (let char of this.toLowerCase()) {
            if (`-_+.,:`.includes(char))
                capital = true;
            else {
                result += (capital ? char.toUpperCase() : char);
                capital = false;
            }
        }
        return result;
    };
    String.prototype.replaces = function (a, b, sep = ',', caseInsensitive = false) {
        var s = this;
        if (!Array.isArray(a))
            a = a.split(sep);
        if (b && !Array.isArray(b))
            b = b.split(sep);
        for (let i = 0; i < a.length; i++)
            s = s.replace(new RegExp(a[i], (caseInsensitive ? "gi" : "g")), (b ? b[i] : ''));
        return s;
    };
    document.Import = function (src, type = "text/javascript") {
        var script = document.createElement('script');
        script.src = src;
        script.type = type;
        document.body.appendChild(script);
    };
})();
var cookie = {
    set: function (name, value, days = 36500) {
        var expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + escape(value) + ';expires=' + expires.toUTCString();
    },
    get: function (name) {
        var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        if ((arr = document.cookie.match(reg)))
            return arr[2];
        else
            return null;
    },
    text: () => document.cookie
};
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
        if (typeof arguments[0] === "object")
            return this.burn({ ...this.data, ...arguments[0] });
        for (let i = 0; i < arguments.length; i += 2) {
            const name = arguments[i], value = arguments[i + 1];
            this.data[name] = value;
            if (value === undefined || value === null)
                delete this.data[name];
        }
        return this.burn();
    },
    burn: function (obj) {
        if (obj !== undefined)
            this.data = obj;
        if (JSON.stringify(this.data) === '{}')
            return this.clear();
        var encodeState = {};
        for (let key in this.data) {
            if (typeof this.data[key] == 'function')
                continue;
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
urlState.reset();
var rootCSS = {
    text: {},
    val: {},
    value: {},
    reset: function () {
        for (let i = 0; i < document.styleSheets.length; i++) {
            try {
                for (let j = 0; j < document.styleSheets[i].cssRules.length; j++) {
                    if (document.styleSheets[i].cssRules[j].selectorText == ":root") {
                        for (let k = 0; k < document.styleSheets[i].cssRules[j].style.length; k++) {
                            let name = document.styleSheets[i].cssRules[j].style[k], value = document.styleSheets[i].cssRules[j].style.getPropertyValue(name).trim(), CamelCase = name.hyphenToCamelCase(), camelCase = CamelCase[0].toLowerCase() + CamelCase.slice(1);
                            this.text[camelCase] = this.text[CamelCase] = this.text[name] = value;
                            // value = Number((<string>value).replaces("px,rem,em,vw,vh,vmin,vmax,%,in,cm,mm,pt,pc,ex,ch,ms,s", '', undefined, true));
                            value = parseFloat(value);
                            this.val[camelCase] = this.val[CamelCase] = this.val[name] = value;
                        }
                    }
                }
            }
            catch (e) {
                continue;
            }
        }
        this.value = this.val;
    }
};
rootCSS.reset();
////
money.create('bill');
money.refreshMoney();
//# sourceMappingURL=money.js.map