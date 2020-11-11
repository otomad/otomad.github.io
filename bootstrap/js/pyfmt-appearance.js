//所有预处理
window.onload = function() {

}
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});

$('textarea').each(function () {
  this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
}).on('input', textarea_resize);
function textarea_resize() {
	$('textarea').each(function () {
		this.style.height = '38px';
		this.style.height = (this.scrollHeight) + 'px';
	});
}
//显示使用提示
/* var help = document.getElementById("help");
var helpButton = document.getElementById('userHelp');
var helpButtonOn = document.getElementById('userHelpOn');

function show_user_help() {
	if (help.style.opacity == 0) {
		helpButton.style.display = "none";
		helpButtonOn.style.display = "";
		helpButtonOn.style.color = "var(--blue)";
		help.style.maxHeight = "300px";
		help.style.transition = "all 250ms ease-out";
		help.style.opacity = "1";
		help.style.marginBottom = "1rem";
		help.style.padding = ".75rem 1.25rem";
	} else {
		helpButton.style.display = "";
		helpButtonOn.style.display = "none";
		help.style.maxHeight = "0px";
		help.style.transition = "all 250ms ease-out";
		help.style.opacity = "0";
		help.style.marginBottom = "0";
		help.style.padding = "0 1.25rem";
	}
} */
$(".user-help-button").click(function(){
	$(".user-help-button").addClass("help-keep-on");
});
$("#modal-ok-button").click(function(){
	setTimeout(function(){
		$(".user-help-button").removeClass("help-keep-on");
	},500);
});

function dropSep(sep) {
	document.getElementById("sep").value = sep;
	/* $(".dropdown-menu").css("opacity", "0");
	setTimeout(function() {
		$(".dropdown-menu").css("display", "none");
	}, 250)
	setTimeout(function() {
		$(".dropdown-menu").css("display", "");
		$(".dropdown-menu").css("opacity", "1");
	}, 300) */
	tryChecked(1);
}

//引用参考资料
function expandReference() {
	/* var refList = document.getElementById("refList");
	var refButton = document.getElementById("expandRef");
	var expand_ref_bar = document.getElementById("expand_ref_bar");
	if (refList.style.display == "none") {
		refButton.style.transform = "rotate(-180deg)";
		refList.style.display = "";
		setTimeout(function() {
			refList.style.maxHeight = "150px";
		}, 100);
		expand_ref_bar.style.cursor = "zoom-out";
	} else {
		refButton.style.transform = "rotate(0deg)";
		setTimeout(function() {
			refList.style.display = "none";
		}, 250);
		refList.style.maxHeight = "0px";
		expand_ref_bar.style.cursor = "zoom-in";
	} */
	if($("#refList").is(':hidden')){
		$("#refBar").removeClass("radius-bottom");
		$("#expandRef").css("transform","rotate(-180deg)");
		$(".primary-mark").addClass("list-group-item-primary");
		$(".primary-mark").css("color","#1d2f42");
	}
	else{
		$("#refBar").addClass("radius-bottom");
		$("#expandRef").css("transform","rotate(0deg)");
		$(".primary-mark").removeClass("list-group-item-primary");
		$(".primary-mark").css("color","inherit");
	}
	$("#refList").slideToggle("fast");
}
//类型参数转换
var type_small = document.getElementById('small');
var type_capital = document.getElementById('capital');
var type_smallcapital = document.getElementById('smallcapital');
var type_all = document.getElementById('initialAll');
var type_first = document.getElementById('initialFirst');
var mode_pinyin = document.getElementById('pinyin');
var mode_bopomofo = document.getElementById('bopomofo');
var mode_romatzyh = document.getElementById('romatzyh');
var mode_group = document.getElementById('modeGroup');
var lisuBtn = document.getElementById('lisuBtn');
/* $("#initial").find(".checkbox").each(function() {
	$(this).click(function() {
		var cur = $(this).attr('id');
		if (this.checked) {
			$(this).parent().children(".checkbox").each(function() {
				if ($(this).attr('id') !== cur)
					this.checked = false;
			});
		}
	});
}); */
$("#initialAll").click(function() {
	var initialFirst = document.getElementById("initialFirst");
	initialFirst.checked = false;
})
$("#initialFirst").click(function() {
	var initialAll = document.getElementById("initialAll");
	initialAll.checked = false;
})

function lisuShow(show) {
	if (show == 1) {
		lisuBtn.style.display = "";
		setTimeout(function() {
			lisuBtn.style.opacity = "1";
			lisuBtn.style.transition = "all 250ms ease-out";
			lisuBtn.style.cursor = "wait";
		}, 100); //lisuShowWaiting(num)
	} else {
		lisuBtn.style.opacity = "0";
		lisuBtn.style.transition = "all 250ms ease-out";
		setTimeout(function() {
			lisuBtn.style.display = "none";
		}, 100);
	}
}

function typeChange(num) {
	switch (num) {
		case 1:
			$("#initialAll").attr("disabled", "disabled");
			$("#initialFirst").attr("disabled", "disabled");
			type_all.checked = false;
			type_first.checked = false;
			break;
		default:
			$("#initialAll").removeAttr("disabled");
			$("#initialFirst").removeAttr("disabled")
			break;
	}
	setTimeout("tryChecked(1)", 100);
}

function modeChange(num) {
	switch (num) {
		case 1:
			mode_group.style.maxHeight = "0px";
			mode_group.style.transition = "all 250ms ease-out";
			mode_group.style.opacity = "0";
			mode_group.style.marginBottom = "0.5rem";
			setTimeout(function() {
				mode_group.style.display = "none";
			}, 250)
			break;
		default:
			mode_group.style.display = "";
			setTimeout(function() {
				mode_group.style.maxHeight = "300px";
				mode_group.style.transition = "all 250ms ease-out";
				mode_group.style.opacity = "1";
				mode_group.style.marginBottom = "1rem";
			}, 1)
			break;
	}
	setTimeout("tryChecked(1)", 100);
}

//复制到剪贴板
function copyToClipboard() {
	$("#resultText").select();
	document.execCommand("copy");
	showDialog();
	$("#d_clip_button").focus();
	clipboardReact("已复制");
}
function clipboardReact(title) {
	var clipbtn = $("#d_clip_button");
	clipbtn.focus();
	clipbtn.attr('title', title).tooltip('_fixTitle').tooltip('show');
	setTimeout(function() {
		clipbtn.attr('title', "复制结果").tooltip('_fixTitle');
		clipbtn.mouseout(function() {
			clipbtn.tooltip('hide');
		});
	}, 500);
}

function resetText() {
	$("#rawText").val("");
	$("#rawText").select();
	textarea_resize();
}

function showDialog() {
	var dialog = document.getElementById("dialog");
	dialog.style.display = "";
	setTimeout(function() {
		dialog.style.top = "8px";
		dialog.style.opacity = "1";
		dialog.style.transition = "all 250ms ease-out";
	}, 1);
	setTimeout(function() {
		dialog.style.top = "-8px";
		dialog.style.opacity = "0";
		dialog.style.transition = "all 250ms ease-in";
		setTimeout(function() {
			dialog.style.display = "none";
		}, 250)
	}, 1500);
}

//弹出dropdown的toggle也可以同时显示tooltips
$("#dropdown-button").hover(function(){
	$('#tooltip-for-dropdown').tooltip('show');
});
$("#dropdown-button").focus(function(){
	$('#tooltip-for-dropdown').tooltip('show');
});
$("#dropdown-button").mouseout(function(){
	$('#tooltip-for-dropdown').tooltip('hide');
});
$("#dropdown-button").blur(function(){
	$('#tooltip-for-dropdown').tooltip('hide');
});
$("#dropdown-button").click(function(){
	$('#tooltip-for-dropdown').tooltip('hide');
});

//老傈僳文
var lisuIsOpen = 0;

function lisu() {
	var result = document.getElementById("resultText").value;
	var lisuCheck = document.getElementById("lisuCheck");
	if (lisuCheck.checked == false || lisuIsOpen == 0) {
		result = lisuData(1);
		lisuIsOpen = 1;
		// document.getElementById("lisuLabel").innerHTML = "拉丁字母";
		$("#lisuLabel")[0].innerHTML = "拉丁字母";
		// document.getElementById("lisuLabel").title = "当前：\t老傈僳文\n单击后：\t大写拉丁字母";
		$("#lisuLabel").attr('title',"　当前：老傈僳文　　<br>单击后：大写拉丁字母").tooltip('_fixTitle').tooltip('show');
	} else {
		result = lisuData(0);
		lisuIsOpen = 0;
		// document.getElementById("lisuLabel").innerHTML = "老傈僳文";
		$("#lisuLabel")[0].innerHTML = "老傈僳文";
		// document.getElementById("lisuLabel").title = "当前：\t大写拉丁字母\n单击后：\t老傈僳文";
		$("#lisuLabel").attr('title',"　当前：大写拉丁字母<br>单击后：老傈僳文　　").tooltip('_fixTitle').tooltip('show');
	}
	document.getElementById("resultText").value = result;
}

var upperLatin = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,R,S,T,U,V,W,X,Y,Z";
var lisuLetter = "ꓮ,ꓐ,ꓚ,ꓓ,ꓰ,ꓝ,ꓖ,ꓧ,ꓲ,ꓙ,ꓗ,ꓡ,ꓟ,ꓠ,ꓳ,ꓑ,ꓣ,ꓢ,ꓔ,ꓴ,ꓦ,ꓪ,ꓫ,ꓬ,ꓜ";

function lisuData(pos = 1) {
	if (pos != 0)
		result = result.replaces(upperLatin, lisuLetter);
	else
		result = result.replaces(lisuLetter, upperLatin);
	return result;
}
//生成
var mode = 0,
	type = 0,
	input, output, raw, result, sep;

function tryChecked(sample) { //检查模式与类型勾选情况
	if (mode_pinyin.checked == true) mode = 0;
	if (mode_bopomofo.checked == true) mode = 1;
	if (mode_romatzyh.checked == true) mode = 2;
	if (type_small.checked == true) type = 0;
	if (type_capital.checked == true) type = 1;
	if (type_smallcapital.checked == true) type = 2;
	if (type_all.checked == true) type = type + 3;
	if (type_first.checked == true) type = type + 4;
	//更改使用提示的示例文本
	if (sample == 1) {
		var lisuCheck = document.getElementById("lisuCheck");
		if (!(mode == 2 && type == 1 && lisuIsOpen == 1)) {
			lisuCheck.checked == true;
			lisuIsOpen = 0;
			document.getElementById("lisuBtn").className = "btn btn-outline-secondary btn-sm"
			// document.getElementById("lisuLabel").title = "当前：\t大写拉丁字母\n单击后：\t老傈僳文";
			$("#lisuLabel").attr('title',"　当前：大写拉丁字母<br>单击后：老傈僳文　　").tooltip('_fixTitle');
			setTimeout(function() {
				// document.getElementById("lisuLabel").innerHTML = "老傈僳文";
				$("#lisuLabel")[0].innerHTML = "老傈僳文";
			}, 250); //waitForChangeLisuBtnName()
		}
		if (mode == 2) document.getElementById('include5').innerHTML = "";
		else document.getElementById('include5').innerHTML = "5-入声；";
		if (mode == 2 && type == 1) lisuShow(1);
		else lisuShow(0);
		document.getElementById('sampleResult').innerHTML = converse("xie4'zui4", $('#sep').val());
		getResult();
	}
}

$('#rawText').bind('keyup', function(event) {
	if (event.keyCode == "13") {
		//回车执行查询
		getResult();
	}
});

function getResult() {
	tryChecked(0);
	document.getElementById("resultText").value = converse($('#rawText').val(), $('#sep').val());
	textarea_resize();
}

function converse(FPraw, FPsep = " ") {
	raw = FPraw, sep = FPsep;
	if (sep == "（空格）") sep = " ";
	if (sep == "（留空）") sep = "";
	preRaw();
	sentence();
	if (lisuIsOpen == 1) {
		result = lisuData(1)
	}
	result = result.replace(/undefined/g, "");
	return result;
}
//开启斜体
function italic() {
	var italicCheck = document.getElementById("italicCheck");
	if (italicCheck.checked == false) {
		document.body.style.fontStyle = "italic";
		document.getElementById("italicLabel").innerHTML = "恢复常规";
	} else {
		document.body.style.fontStyle = "normal";
		document.getElementById("italicLabel").innerHTML = "开启斜体";
	}
}
//raw处理
function preRaw() {
	//var interferedPunctuation["!","~","`","@","#","$","%","&","-","_","=","|","\\","\"",":",";","<",">",",","\+","\?","\."];
	raw = pinyinUtil.getPinyin(raw, "\'");
	raw = backToAsciiPinyin(raw);
	for (var i = 0; i <= 9; i++)
		raw = raw.replace(new RegExp(i, "g"), i + "\'");
	if (raw != "") raw = raw + "\'";
}

function backToAsciiPinyin(variant) {
	var s = variant;
	s = s.replaces(lisuLetter, upperLatin);
	s = s.replaces(smallcapitalList, capitalList);
	s = variant.toLowerCase();
	s = s.replaces(diacriticalLetter, combiningLetter);
	s = s.replaces("\u0304,\u0301,\u030C,\u0300,\u0307,ü,ê,ï", "1,2,3,4,5,v,eh,i5");
	var presuffix = "ng,n,m,o,i,u,r".split(",");
	for (var j = 0; j < presuffix.length; j++)
		for (var i = 1; i <= 5; i++)
			s = s.replace(new RegExp(i + presuffix[j], "g"), presuffix[j] + i);
	var aoe = "a,o,e,i,u".split(",");
	var gnm = "g,n,m".split(",");
	for (var k = 0; k < gnm.length; k++)
		for (var j = 0; j < aoe.length; j++)
			for (var i = 1; i <= 5; i++)
				s = s.replace(new RegExp(gnm[k] + i + aoe[j], "g"), i + gnm[k] + aoe[j]);
	return s;
}

//常用函数/对象
String.prototype.replaces = function(stra, strb) {
	var s = this.valueOf(),
		a = stra,
		b = strb;
	if (!Array.isArray(stra)) a = stra.split(",");
	if (strb) {
		if (!Array.isArray(strb)) b = strb.split(",");
		for (var i = 0; i < a.length; i++)
			s = s.replace(new RegExp(a[i], "g"), b[i])
	} else
		for (var i = 0; i < a.length; i++)
			s = s.replace(new RegExp(a[i], "g"), "")
	return s;
}
String.prototype.finds = function() {
	var n = 0,
		arg = arguments;
	if (arguments.length == 1)
		arg = arguments[0].split(",");
	for (var i = 0; i < arg.length; i++)
		for (var j = 0; j < this.length; j++)
			if (this[j] == arg[i])
				n++;
	return n;
}
String.prototype.reverse = function() {
	var t = "";
	for (var i = this.length - 1; i >= 0; i--)
		t += this[i];
	return t;
}