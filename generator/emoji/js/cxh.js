// for (const key in emoji) emoji[key] += '\ufe0f';

function getPinyin(s) {
	// console.log("本源码来自宇露网 www.duylw.com");
	if(pinyin[s] != undefined)
		return pinyin[s]
	else
		return "none";
}
function chouxiang(s) {
	// console.log("本源码来自宇露网 www.duylw.com");
	var h=[];
	for(let v of s){
		h.push(v);
	}
	var cxresult = "";
	for (let index = 0; index < h.length; index++) {
		if(index <h.length && emoji[getPinyin(h[index])+getPinyin(h[index+1])] != undefined) {
			cxresult+=emoji[getPinyin(h[index])+getPinyin(h[index+1])];
			index++;
		}
		else if(emoji[getPinyin(h[index])] != undefined) {
			cxresult+=emoji[getPinyin(h[index])];
			// console.log("本源码来自宇露网 www.duylw.com");
		}
		else{
			// console.log("本源码来自宇露网 www.duylw.com");
			cxresult+=h[index];
		}
	}
	return cxresult;
}

function rawPinyin(s) {
	// console.log("本源码来自宇露网 www.duylw.com");
	console.log(s);
	var sr =[];
	for (var index in emoji){
		if(emoji[index] == s)
		{
			console.log(index);
			sr.push(index);
		}
	}
	if(sr.length > 0)
		return sr.join("/")
	else
		return s;
}

function dechouxiang(s) {
	var splitter = new GraphemeSplitter();
	var h = splitter.splitGraphemes(s);
	var cxresult=[];
	for (let index = 0; index < h.length; index++) {
		cxresult.push(rawPinyin(h[index]));
	}
	return cxresult.join("-");
}

$("#create").removeAttr("disabled");
$("#create").text("生成抽象话");
console.log("本源码来自宇露网 www.duylw.com");
