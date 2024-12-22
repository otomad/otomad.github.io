// 改写自 https://www.zhihu.com/question/381784377/answer/1099438784，并加上一些适当的处理
// 我这人虽然是写 JS 的，但是看 Python 不是问题

// @ts-check
"use strict";

const table = [..."fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF"];
const slots = [11, 10, 3, 8, 4, 6];
const xor = 177451812;
const add = 8728348608;
const ERROR = "¿你在想桃子？";

export const av2bv = (/** @type {string | number | bigint} */ av) => {
	/** @type {number | undefined} */
	let num;
	try {
		if (typeof av === "number") {
			num = Math.trunc(av);
		} else if (typeof av === "string") {
			num = Number(av.replace(/[^0-9]/gu, ""));
		} else if (typeof av === "bigint") {
			num = Number(av);
		};
		if (num === undefined || !Number.isFinite(num) || num <= 0) {
			throw new Error();
		};
	} catch (cause) {
		console.error(new Error(ERROR, { cause }))
		return ERROR;
	}

	num = (num ^ xor) + add;
	let result = [..."BV1  4 1 7  "];
	let i = 0;
	while (i < 6) {
		// 这里改写差点犯了运算符优先级的坑
		// 果然 Python 也不是特别熟练
		// 说起来 ** 按照传统语法应该写成 Math.pow()，但是我个人更喜欢 ** 一些
		result[slots[i]] = table[Math.floor(num / 58 ** i) % 58];
		i++;
	};
	return result.join("");
};

export const bv2av = (/** @type {string} */ bv) => {
	let str = "";
	if (bv.length === 12) {
		str = bv;
	} else if (bv.length === 10) {
		str = `BV${bv}`;
		// 根据官方 API，BV 号开头的 BV1 其实可以省略
		// 不过单独省略个 B 又不行（
	} else if (bv.length === 9) {
		str = `BV1${bv}`;
	} else {
		return ERROR;
	};
	if (!str.match(/[Bb][Vv][fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF]{10}/gu)) {
		return ERROR;
	};

	let result = 0;
	let i = 0;
	while (i < 6) {
		result += table.indexOf(str[slots[i]]) * 58 ** i;
		i += 1;
	};
	return `av${result - add ^ xor}`;
};
