const charTo = {
	unicode: char => [char.codePointAt(0)],
	utf8: char => {
		var unicode = charTo.unicode(char)[0];
		if (unicode < 0x80) return [unicode];
		var gbk = encodeURI(char).split('%');
		gbk.splice(0, 1);
		for (let i = 0; i < gbk.length; i++)
			gbk[i] = parseInt(gbk[i], 16);
		return gbk;
	},
	gbk: char => {
		var unicode = charTo.unicode(char)[0];
		if (unicode < 0x80) return [unicode];
		var gbk = GBK.encode(char).split('%');
		gbk.splice(0, 1);
		for (let i = 0; i < gbk.length; i++)
			gbk[i] = parseInt(gbk[i], 16);
		return gbk;
	},
};
const toChar = {
	base64: str => {
		return utf8to16(base64decode(str));
	}
}