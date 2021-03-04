/**
 * https://www.cnblogs.com/cntoolkit/p/5717192.html
 * 输入 emmet 缩减式，输出 HTML 字符串。
 */
var emmet;
(function () {
	{ //定义正则表达式
		var
			whitespace = "[\\x20\\t\\r\\n\\f]*",
			nvarcharEncoding = whitespace + "\\{([^}]+)\\}" + whitespace,
			characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
			relationEncoding = "[>\\+]",
			multiEncoding = whitespace + "(\\d+)" + whitespace + "\\*" + whitespace,
			attrEncoding = whitespace + "\\[" + whitespace + "(" + characterEncoding + ")(?:" + whitespace + "([*^$|!~]?=)" + whitespace +
				"(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + characterEncoding.replace("w", "w#") + "))|)" + whitespace + "\\]" + whitespace,
			mainEncoding = whitespace + "[#\\.]?" + characterEncoding + whitespace,
			htmlEncoding = whitespace + "(" + multiEncoding + ")*((" + mainEncoding + "|" + attrEncoding + "|" + nvarcharEncoding + ")+)" + whitespace,
			htmlsEncoding = htmlEncoding + "(" + relationEncoding + htmlEncoding + ")*";

		var
			rsingle = /[\(\)]/g,
			rdouble = /[(][^()]*[)]/g,
			rsinglel = /^[\x20\t\r\n\f]*\(/,
			rsingler = new RegExp("^(" + htmlsEncoding + ")?\\)+");

		var rmulti = new RegExp(multiEncoding);
		var rchild = new RegExp("^(" + whitespace + "\\))?" + whitespace + ">");
		var rnext = new RegExp("^" + whitespace + "\\+");
		var rid = new RegExp("^" + whitespace + "#(" + characterEncoding + ")");
		var rtag = new RegExp("^" + whitespace + "(\\w+)");
		var rclass = new RegExp("^" + whitespace + "\\.(" + characterEncoding + ")");
		var rcontent = new RegExp("^" + whitespace + nvarcharEncoding);
		var rattr = new RegExp("^" + attrEncoding);
		var rhtml = new RegExp("^" + htmlsEncoding + "$");
	}
	function dynamicMultiTag(selector) { //定义方法入口
		if (!selector || $.type(selector) !== "string" || !rhtml.test(selector.replace(rsingle, ""))) { return selector; }
		var match = selector.replace(rdouble, "");
		while (rdouble.test(match)) { match = match.replace(rdouble, ""); }
		if (rsingle.test(match)) { return selector; }
		return _dynamicMultiTag_(selector);
	}
	function _dynamicMultiTag_(selector) { //定义方法主体
		var match, multi = 1, result, results = [];
		if (match = rmulti.exec(selector)) {
			multi = match[1] >>> 0;
			selector = selector.replace(rmulti, '');
		}
		if (rsinglel.test(selector)) {
			selector = selector.replace(rsinglel, '');
			result = _dynamicMultiTag_(selector);
			while (multi--) {
				results.push(result);
			}
			selector = selector.replace(rsingler, '');
			if (rnext.test(selector)) { results.push(_dynamicMultiTag_(selector.replace(rnext, ''))); }
			return results.join('');
		}
		var tag = 'div', htmls = [];
		if (match = rtag.exec(selector)) { tag = match[1]; selector = selector.replace(rtag, ""); }
		htmls.push('<', tag);
		if (match = rid.exec(selector)) {
			htmls.push(' id="', match[1], '"');
			selector = selector.replace(rid, "");
		}
		if (match = rclass.exec(selector)) {
			htmls.push(' class="', match[1]);
			while (match = rclass.exec(selector = selector.replace(rclass, ''))) { htmls.push(' ', match[1]); }
			htmls.push('"');
		}
		if (match = rid.exec(selector)) {
			htmls.push(' id="', match[1], '"');
			selector = selector.replace(rid, "");
		}
		while (match = rattr.exec(selector)) {
			htmls.push(' ' + match[1], match[2], '"', match[3] || match[4] || match[5], '"');
			selector = selector.replace(rattr, "");
		}
		htmls.push('>');
		if (match = rcontent.exec(selector)) {
			htmls.push(match[1]);
			selector = selector.replace(rcontent, "");
		}
		if (rchild.test(selector)) {
			htmls.push(_dynamicMultiTag_(selector = selector.replace(rchild, "")));
		}
		htmls.push('</', tag, '>');
		if (rnext.test(selector)) {
			htmls.push(_dynamicMultiTag_(selector = selector.replace(rnext, "")));
		}
		result = htmls.join('');
		while (multi--) { results.push(result); }
		return results.join('');
	}
	emmet = dynamicMultiTag;
}());