// 原转换代码针对 2023 年 3 月 28 日 19:45:02 (av99999999) 之后的新视频出现了转换为负数 av 号的 bug，此处使用新的算法来实现：
// https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/bvid_desc.md

// @ts-check

const XOR_CODE = 23442827791579n;
const MASK_CODE = 2251799813685247n;
const MAX_AID = 1n << 51n;
const BASE = 58n;
const ERROR = "¿你在想桃子？";

const data = 'FcwAPNKTMug3GV5Lj7EJnHpWsx4tb8haYeviqBz6rkCy12mUSDQX9RdoZf';

export function av2bv(/** @type {bigint | number | string} */ aid) {
	try {
		if (typeof aid === "bigint") { }
		else if (typeof aid === "number") {
			aid = BigInt(Math.trunc(aid));
		} else if (typeof aid === "string") {
			aid = BigInt(aid.replace(/[^0-9]/gu, ""));
		} else throw new Error();
		if (aid === undefined || aid <= 0) throw new Error();
	} catch (cause) {
		console.error(new Error(ERROR, { cause }))
		return ERROR;
	}

	const bytes = [..."BV1000000000"];
	let bvIndex = bytes.length - 1;
	let tmp = (MAX_AID | BigInt(aid)) ^ XOR_CODE;
	while (tmp > 0) {
		bytes[bvIndex] = data[Number(tmp % BigInt(BASE))];
		tmp = tmp / BASE;
		bvIndex -= 1;
	}
	[bytes[3], bytes[9]] = [bytes[9], bytes[3]];
	[bytes[4], bytes[7]] = [bytes[7], bytes[4]];
	return bytes.join('');
}

export function bv2av(/** @type {`BV1${string}`} */ bvid) {
	if (bvid.length === 12) { }
	else if (bvid.length === 10) {
		bvid = /** @type {never} */ (`BV${bvid}`);
		// 根据官方 API，BV 号开头的 BV1 其实可以省略，不过单独省略个 B 又不行。
	} else if (bvid.length === 9) {
		bvid = `BV1${bvid}`;
	} else {
		return ERROR;
	};
	if (!bvid.match(/[Bb][Vv][fZodR9XQDSUm21yCkr6zBqiveYah8bt4xsWpHnJE7jL5VG3guMTKNPAwcF]{10}/gu)) {
		return ERROR;
	};

	const bvidArr = Array.from(bvid);
	[bvidArr[3], bvidArr[9]] = [bvidArr[9], bvidArr[3]];
	[bvidArr[4], bvidArr[7]] = [bvidArr[7], bvidArr[4]];
	bvidArr.splice(0, 3);
	const tmp = bvidArr.reduce((pre, bvidChar) => pre * BASE + BigInt(data.indexOf(bvidChar)), 0n);
	const aid = (tmp & MASK_CODE) ^ XOR_CODE;
	return `av${aid}`;
}

// console.log(av2bv(111298867365120));
// console.log(bv2av('BV1L9Uoa9EUx'));
