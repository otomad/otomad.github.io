function single(input, type = 0) {
	//规则化
	input = input.toLowerCase().trim();
	var l = input.length,
		v = 0;
	for (var i = 0; i < l; i++)
		if (input[i] == 'v')
			v++;
	if (v >= 2 && input[0] == 'v')
		input = input.replace("v", "#");
	input = input.replaces("v,lyu,nyu,eh", "ü,lü,nü,ê");
	input = input.replace("#", "v");
	//声调
	l = input.length;
	var tone = input[l - 1];
	if (tone < '0' || tone > '9') tone = "0";
	input = input.replace(tone, "");
	if (tone >= '6' && tone <= '9') tone = "1";
	var combineList=["","\u0304","\u0301","\u030C","\u0300","\u0307"],
		combine = combineList[tone];
	//标调字母
	var latinCanBeToned = "a,o,e,ê,i,u,ü,n,m".split(","),
		latin, serial = -1;
	for (var i = 0;serial == -1 && i < latinCanBeToned.length;i++) {
		latin = latinCanBeToned[i];
		serial = input.search(latin);
	}
	if (serial == -1) latin = "";
	if (input.search("iu") != -1) latin = "u";
	if (input.search("iü") != -1) latin = "ü";
	var result_small = (latin != "" ? input.replace(latin, latin + combine) : input);
	//大写字母和小型大写字母
	return output = prepareForOutputType(result_small,type);
}

var capitalList = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Ê,Ü,È";
var smallcapitalList = "ᴀ,ʙ,ᴄ,ᴅ,ᴇ,ꜰ,ɢ,ʜ,ɪ,ᴊ,ᴋ,ʟ,ᴍ,ɴ,ᴏ,ᴘ,ꞯ,ʀ,ꜱ,ᴛ,ᴜ,ᴠ,ᴡ,x,ʏ,ᴢ,ᴇ\u0302,ᴜ\u0308,ᴇ\u0300";
String.prototype.toLowerUpperCase = function() {
	var smallcapital = this.toUpperCase();
	smallcapital = smallcapital.replaces(capitalList, smallcapitalList);
	return smallcapital;
}
var modeList = ["single","bpmf","romatzyh","ghhszm"];

function sentence(raw, sep = '\'', mode = 0, type = 0) {
	raw = raw.toLowerCase().trim().replace(/e\^/g, "eh");
	var arr = split(raw), result = "", cur, first = type;
	for (var i = 0;i < arr.length;i++) {
		if (!(isLegal(arr[i][0]))) {
			result += (i==0?"":sep) + arr[i];
			continue;
		}
		if (i>0) if(arr[i-1].finds(".?!…。？！⋯".inTwo())) type=first;
		if (type == 4 || type == 6) type--;
		cur = eval(modeList[mode]+'(\"'+arr[i]+'\",'+type+')');
		var aoe = arr[i][0];
		if ((mode == 0 || mode == 2) && i > 0 && sep == "" && aoe.is("a,o,e,i,u"))
			cur = '\'' + cur;
		result += (i==0?"":sep) + cur;
		if ((first == 4 || first == 6) && type == first - 1) type -= 3;
	}
	return result;
}

function sentence_legacy(raw, sep = '\'', mode = 0, type = 0) { //旧的
	raw = raw.toLowerCase().trim();
	while (raw.search("\'\'") != -1)
		raw = raw.replace(/\'\'/g, "\'");
	var l = raw.length,
		first = 1,
		legacy = 0,
		n, origType = type;
	result = "";
	while (raw != "" && raw != "\'") {
		if (!(raw[0] >= '0' && raw[0] <= '9' || raw[0] == '^' || raw[0] >= 'a' && raw[0] <= 'z')) {
			if (raw[0] == '\'') {
				raw = raw.slice(1);
				result += sep;
				continue;
			}
			if (raw[0] == '.' || raw[0] == '?' || raw[0] == '!' || raw[0] == '…' || raw[0] == '。' || raw[0] == '？' || raw[0] ==
				'！' || raw[0] == '⋯')
				type = origType;
			first = 1;
			result += raw[0];
			raw = raw.slice(1);
			continue;
		}
		var flag = 0;
		n = 99999;
		n = raw.indexOf("\'");
		input = raw.slice(0, n);
		raw = raw.slice(n + 1);
		var aoe = input[0];
		if (sep == "" && (aoe == 'a' || aoe == 'o' || aoe == 'e' || aoe == 'ê' || aoe == 'i' || aoe == 'u' || aoe == 'ü') &&
			first != 1 && mode != 1)
			flag = 1;
		if (type == 4 || type == 6) {
			type--;
			legacy = 1;
		}
		input = input.replace(/e\^/g, "eh");
		eval(modeList[mode]+"()");
		if (flag == 1)
			output = "\'" + output;
		result += (raw == "" ? output : output + sep);
		if (legacy == 1) {
			type = type - 3;
			legacy = 0;
		}
		first = 0;
	}
	l = result.length;
	if (result[l - 1] == sep)
		result = result.slice(0, -1);
}

var comsep = "\',‘,’,`,|,-,_,/,\\, ";
function split(s) { //数字和分隔符都能分割
	var str = (s + "").trim(), arr = [], cur = "";
	for (var i = 0;i < str.length;i++) {
		if (i > 0) if (isLegal(str[i]) && !(isLegal(str[i - 1]+""))) {
			arr.push(str.slice(0,i));
			str = str.slice(i);
			i = 0;
		}
		if (i > 0) if (isLegal(str[i - 1]+"") && !(isLegal(str[i]))) {
			arr.push(str.slice(0,i));
			str = str.slice(i);
			i = -1;
			continue;
		}
		if (str[i].is("0123456789".inTwo()) && !((str[i + 1]+"").is(comsep))) {
			arr.push(str.slice(0,i + 1));
			str = str.slice(i + 1);
			i = -1;
			continue;
		}
		if (str[i].is(comsep)) {
			arr.push(str.slice(0,i));
			str = str.slice(i + 1);
			i = -1;
			continue;
		}
	}
	if (str) arr.push(str);
	arr.trim();
	return arr;
}
function printCharList(start,end) { //打印字符表一段区间的字符
	var l = "";
	for(var c = start.charCodeAt();c <= end.charCodeAt();c++)
		l += String.fromCharCode(c);
	return l;
}
function isLegal(c) {
	var legal = (printCharList('0','9') + printCharList('a','z') + printCharList('A','Z')).inTwo() + ',' + comsep;
	return c.is(legal)?true:false;
}

function bpmf(input, type = 0) {
	input = input.toLowerCase().trim().replace(/er/g, "ㄦ");
	var l = input.length;
	if (input[l - 1] < '0' || input[l - 1] > '9') {
		input = input + '0';
		l++;
	}
	if (input[l - 1] == '0')
		input = "•" + input;
	if (input[l - 1] >= '0' && input[l - 1] <= '9') {
		if (input[l - 2] == 'r')
			input = input.slice(0, l - 2) + '%' + input.slice(l - 1);
	} else
	if (input[l - 1] == 'r') {
		input = input.slice(0, l - 1) + '%';
	}
	var v = 0;
	for (var i = 0; i < l; i++)
		if (input[i] == 'v')
			v++;
	if (v >= 2 && input[0] == 'v')
		input = input.replace("v", "#");
	output = input;
	var pinyinList =
		"zhi,chi,shi,wu,yue,yuan,ying,yin,yun,jun,qun,xun,wei,you,weng,wen,ri,zi,ci,si,yi,ue,yu,ju,qu,xu,ye,ang,eng,ing,ong,an,en,in,un,ng,gn,ao,ou,iu,ai,ei,ui,ie,-i,eh,a,o,e,i,u,v,#,%,1,2,3,4,5,6,7,8,9,0,zh,ch,sh,b,p,m,f,d,t,n,l,g,k,h,j,q,x,r,z,c,s,y,w";
	var bopomofoList =
		"ㄓ,ㄔ,ㄕ,ㄨ,ㄩㄝ,ㄩㄢ,ㄧㄥ,ㄧㄣ,ㄩㄣ,ㄐㄩㄣ,ㄑㄩㄣ,ㄒㄩㄣ,ㄨㄟ,ㄧㄡ,ㄨㄥ,ㄨㄣ,ㄖ,ㄗ,ㄘ,ㄙ,ㄧ,ㄩㄝ,ㄩ,ㄐㄩ,ㄑㄩ,ㄒㄩ,ㄧㄝ,ㄤ,ㄥ,ㄧㄥ,ㄨㄥ,ㄢ,ㄣ,ㄧㄣ,ㄨㄣ,ㄫ,ㄬ,ㄠ,ㄡ,ㄧㄡ,ㄞ,ㄟ,ㄨㄟ,ㄧㄝ,ㄭ,ㄝ,ㄚ,ㄛ,ㄜ,ㄧ,ㄨ,ㄩ,ㄪ,ㄦ,,ˊ,ˇ,ˋ,˙,,,,,,ㄓ,ㄔ,ㄕ,ㄅ,ㄆ,ㄇ,ㄈ,ㄉ,ㄊ,ㄋ,ㄌ,ㄍ,ㄎ,ㄏ,ㄐ,ㄑ,ㄒ,ㄖ,ㄗ,ㄘ,ㄙ,ㄧ,ㄨ";
	return output = output.replaces(pinyinList, bopomofoList);
}

function romatzyh(input, type = 0) {
	input = input.toLowerCase().trim()
	var l = input.length,
		v = 0;
	for (var i = 0; i < l; i++)
		if (input[i] == 'v')
			v++;
	if (v >= 2 && input[0] == 'v')
		input = input.replace("v", "V");
	var tone = parseInt(input[l - 1]);
	if (input[l - 1] < '0' || input[l - 1] > '9') {
		tone = 0;
		l++;
	} else
		input = input.slice(0, -1);
	if (tone == 5) tone = 0;
	if (tone >= 6 && tone <= 9) tone = 1;
	var mnlr = 0,
		soft = 0;
	if ((input[0] == 'm' || input[0] == 'n' || input[0] == 'l' || input[0] == 'r') && (tone == 1 || tone == 2))
		mnlr = 1;
	if (tone == 0) {
		if (input[l - 2] == 'e' && input.search("ie") == -1 && input.search("ue") == -1 && input.search("ve") == -1)
			input = input.slice(0, -1);
		else
			soft = 1;
		tone = 1;
		if ((input[0] == 'm' || input[0] == 'n' || input[0] == 'l' || input[0] == 'r') && input.length > 1 && input != "ng")
			tone = 2;
	}
	var yuInU = "lyu,nyu,lve,nve,juan,quan,xuan,yuan,jun,qun,xun,yun,au,iou,ieng,ien,uei,ueng,uen,ung,iue,iuan,iun";
	var yuInV = "lv,nv,lue,nue,jvan,qvan,xvan,yvan,jvn,qvn,xvn,yvn,ao,iu,ing,in,ui,ong,un,ong,ue,van,vn";
	input = input.replaces(yuInU, yuInV);
	//声母
	if (!(input == "m" || input == "n" || input == "ng" || input == "v")) {
		if (input[0] != 'a' && input[0] != 'o' && input[0] != 'e' && input[0] != 'i' && input[0] != 'u')
			input = (input.slice(0, 1)).toUpperCase() + input.slice(1);
		if (mnlr == 1) {
			if (tone == 1)
				input = input.slice(0, 1) + "H" + input.slice(1);
			else
				tone = 1;
		}
	}
	var ZhiChiShi = "Z,C,zhi,chi,Shi,RHi,zi,ci,Si,Ri,zh,ch,Sh,z,c,Q,X,Y,W";
	var ZhihChihShih = "z,c,zh-i,ch-i,Sh-i,RH-i,z-i,c-i,S-i,R-i,J,CH,SH,TZ,TS,CH,SH,y,w";
	input = input.replaces(ZhiChiShi, ZhihChihShih);
	//韵母
	var vowelOrig =
		"iang,uang,iong,yang,ying,wang,weng,yong,yvan,ang,eng,ing,ong,iai,iao,ian,uai,uan,van,yai,yao,you,yan,yin,wai,wei,wan,wen,yue,yvn,ai,ei,ao,ou,an,en,ia,io,ie,iu,in,ua,uo,ui,un,ue,vn,ya,yo,ye,wa,wo,yi,wu,yu,a,o,eh,e,-i,i,u,v,ng,n,m";
	var vowelTone = new Array();
	vowelTone[0] =
		"IANG,UANG,IONG,IANG,ING,UANG,UENG,IONG,IUAN,ANG,ENG,ING,ONG,IAI,IAU,IAN,UAI,UAN,IUAN,IAI,IAU,IOU,IAN,IN,UAI,UEI,UAN,UEN,IUE,IUN,AI,EI,AU,OU,AN,EN,IA,IO,IE,IOU,IN,UA,UO,UEI,UEN,IUE,IUN,IA,IO,IE,UA,UO,I,U,IU,A,O,È,E,Y,I,U,IU,NG,N,M";
	vowelTone[1] =
		"YANG,WANG,YONG,YANG,YNG,WANG,WENG,YONG,YUAN,ARNG,ERNG,YNG,ORNG,YAI,YAU,YAN,WAI,WAN,YUAN,YAI,YAU,YOU,YAN,YN,WAI,WEI,WAN,WEN,YUE,YUN,AIR,EIR,AUR,OUR,ARN,ERN,YA,YO,YE,YOU,YN,WA,WO,WEI,WEN,YUE,YUN,YA,YO,YE,WA,WO,YI,WU,YU,AR,OR,ÈR,ER,YR,YI,WU,YU,NGR,NR,MR";
	vowelTone[2] =
		"EANG,OANG,EONG,YEANG,YIING,WOANG,WOENG,YEONG,YEUAN,AANG,EENG,IING,OONG,EAI,EAU,EAN,OAI,OAN,EUAN,YEAI,YEAU,YEOU,YEAN,YIIN,WOAI,WOEI,WOAN,WOEN,YEUE,YEUN,AE,EEI,AO,OOU,AAN,EEN,EA,EO,IEE,EOU,IIN,OA,UOO,OEI,OEN,EUE,EUN,YEA,YEO,YEE,WOA,WOO,YII,WUU,YEU,AA,OO,ÈÈ,EE,YY,II,UU,EU,NNG,NN,MM";
	vowelTone[3] =
		"IANQ,UANQ,IONQ,YANQ,YINQ,WANQ,WENQ,YONQ,YUANN,ANQ,ENQ,INQ,ONQ,IAY,IAW,IANN,UAY,UANN,IUANN,YAY,YAW,YOW,YANN,YINN,WAY,WEY,WANN,WENN,YUEH,YUNN,AY,EY,AW,OW,ANN,ENN,IAH,IOH,IEH,IOW,INN,UAH,UOH,UEY,UENN,IUEH,IUNN,YAH,YOH,YEH,WAH,WOH,YIH,WUH,YUH,AH,OH,ÈH,EH,YH,IH,UH,IUH,NQ,NH,MH";
	input = input.replaces(vowelOrig, vowelTone[tone - 1]);
	input = input.replaces("r,HL,-", "L,LL,");
	var result_small = input.toLowerCase();
	//大写字母和小型大写字母
	output = prepareForOutputType(result_small,type);
	if (soft == 1)
		output = '.' + output;
	return output;
}

var diacriticalLetter =
	"ā,á,ǎ,à,ȧ,ō,ó,ǒ,ò,ȯ,ē,é,ě,è,ė,ī,í,ǐ,ì,ï,ū,ú,ǔ,ù,ǖ,ǘ,ǚ,ǜ,ń,ň,ǹ,ṅ,ḿ,ṁ,ế,ề";
var combiningLetter =
	"ā,á,ǎ,à,ȧ,ō,ó,ǒ,ò,ȯ,ē,é,ě,è,ė,ī,í,ǐ,ì,ï,ū,ú,ǔ,ù,ǖ,ǘ,ǚ,ǜ,ń,ň,ǹ,ṅ,ḿ,ṁ,ế,ề";

function prepareForOutputType(input,type) {
	var result_small = input;
	var result_smallcapital = result_small.toLowerUpperCase();
	result_small = result_small.replace(/i\u0307/g, "i\u0308");
	result_small = result_small.replaces(combiningLetter, diacriticalLetter);
	var result_capital = result_small.toUpperCase();
	result_capital = result_capital.replace("Ï", "İ");
	var output = result_small;
	if (type == 1) output = result_capital;
	if (type == 2) output = result_smallcapital;
	if (type == 3) output = result_capital[0] + result_small.substr(1);
	if (result_smallcapital[1] >= "\u0300" && result_smallcapital[1] < "\u0370")
		result_smallcapital = result_smallcapital[0] + result_smallcapital.substr(2);
	if (type == 5) output = result_capital[0] + result_smallcapital.substr(1);
	return output;
}

//more mode add to here
function ghhszm(input, type = 0) {
	input = input.toUpperCase().trim();
	var l = input.length,
		tone = input[l - 1];
	if (tone < '0' || tone > '9') tone = "0";
	input = input.replace(tone, "");
	if (tone == '5') tone == '0';
	if (tone >= '6' && tone <= '9') tone = "1";
	input = input.replaces("CH,ZH,SH,IU,UI,UN,IN","c,z,s,IOU,UEI,UEN,iEN");
	input = input.replaces("ANG,ENG,ONG,ING,IE,AN,AO,AI,ER,EN,OU,EI,i,PU,BU,MU,FU,WU,PI,BI,MI,CU,ZU,SU,DU,TU,cU,zU,sU,RU,NU,LU,CI,ZI,SI,DE,TE,DI,TI,cI,zI,sI,RI,NE,LE,NV,LV,JU,QU,XU,YU,NI,LI,JI,QI,XI,YI,GU,KU,HU,GE,KE,HE,A,E,O,P,B,M,F,W,C,Z,S,D,T,c,z,s,R,N,L,J,Q,X,Y,G,K,H","亢,翁,翁,I翁,爺,安,豪,哀,儿,恩,慪,危,I,撲,卜,木,夫,五,皮,必,米,麤,租,蘇,都,土,初,朱,書,入,奴,盧,辭,姿,絲,徳,特,低,題,遲,之,詩,日,訥,勒,女,呂,居,趨,須,于,尼,離,基,其,希,衣,孤,夸,乎,戈,科,禾,阿,我,我,撲,卜,木,夫,五,辭,姿,絲,徳,特,遲,之,詩,入,訥,勒,居,趨,須,衣,戈,科,禾");
	output = input.replaces("撲,卜,木,夫,五,皮,必,米,麤,租,蘇,都,土,初,朱,書,入,奴,盧,辭,姿,絲,徳,特,低,題,遲,之,詩,日,訥,勒,女,呂,居,趨,須,于,尼,離,基,其,希,衣,孤,夸,乎,戈,科,禾,爺,亢,安,豪,哀,阿,儿,翁,恩,慪,危,我",",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,");
	var toneSign = "";
	if(tone == "1" || tone == "3") toneSign = "";
	else if(tone == "2" || tone == "4") toneSign = "";
	if(tone < "3") output = output.slice(0,-1) + toneSign + output.slice(-1);
	else output += toneSign;
	return output;
}