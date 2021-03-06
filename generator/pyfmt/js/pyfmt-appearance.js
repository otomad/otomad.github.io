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
$('#helpModal').on('hide.bs.modal', function () {
	if(!($("#refList").is(':hidden')))
		$("#refBar").click();
	setTimeout(function(){
		$(".user-help-button").removeClass("help-keep-on");
	},500);
});

$(".dropdown-item").click(function(){
	$("#sep").val(this.text);
	tryChecked(1);
});

//引用参考资料
$("#refBar").click(function(){
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
		$(".primary-mark").addClass("list-group-item-primary").css("color","#1d2f42");
	}
	else{
		$("#refBar").addClass("radius-bottom");
		$("#expandRef").css("transform","rotate(0deg)");
		$(".primary-mark").removeClass("list-group-item-primary").css("color","inherit");
	}
	$("#refList").slideToggle("fast");
});
//类型参数转换
/* var type_small = document.getElementById('small');
var type_capital = document.getElementById('capital');
var type_smallcapital = document.getElementById('smallcapital');
var type_all = document.getElementById('initialAll');
var type_first = document.getElementById('initialFirst');
var mode_pinyin = document.getElementById('pinyin');
var mode_bopomofo = document.getElementById('bopomofo');
var mode_romatzyh = document.getElementById('romatzyh');
var mode_ghhszm = document.getElementById('ghhszm');
var mode_group = document.getElementById('modeGroup');
var lisuBtn = document.getElementById('lisuBtn'); */
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
	$("#initialFirst").prop("checked", false);
})
$("#initialFirst").click(function() {
	$("#initialAll").prop("checked", false);
})

function lisuShow(show) {
	if (show) $("#lisuBtn").fadeIn("fast");
	else $("#lisuBtn").fadeOut("fast");
}

$('[name="type"]').parent().click(function(){	//typeChange
	if ($(this).index() == 1)
		$("#initialAll, #initialFirst").prop({"disabled":true,"checked":false});
	else
		$("#initialAll, #initialFirst").removeAttr("disabled");
	setTimeout("tryChecked(1)", 100);
});

$('[name="mode"]').parent().click(function(){	//modeChange
	var num = $(this).index(),
		el = $("#modeGroup").css("overflow", "hidden"),
		curHeight = el.height(),
		autoHeight = el.css('height', 'auto').height(),
		opacity = 1,
		mb = "1rem";
	if(num == 1 || num == 3) {
		autoHeight = 0;
		opacity = 0;
		mb = ".5rem";
	}
	el.height(curHeight).animate({
		height: autoHeight,
	}, 250).css({
		"opacity": opacity,
		"margin-bottom": mb
	});
	if(autoHeight != 0) setTimeout(function(){
		$("#modeGroup").css({
			"overflow": "",
			"height": "auto"
		});
	}, 500);
	//“官话合声字母 说明”部分
	el = $("#ghhszm-msg");
	if(num == 3) el.slideDown(500);
	else el.slideUp(500);
	/* switch (num) {
		case 1:
			mode_group.style.maxHeight = "0px";
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
				mode_group.style.opacity = "1";
				mode_group.style.marginBottom = "1rem";
			}, 1)
			break;
	} */
	setTimeout("tryChecked(1)", 100);
});

//复制到剪贴板
$("#d_clip_button").click(function(){
	$("#resultText").select();
	document.execCommand("copy");
	showDialog();
	$("#d_clip_button").focus();
	clipboardReact("已复制");
});
function clipboardReact(title) {
	var clipbtn = $("#d_clip_button");
	clipbtn.focus().attr('title', title).tooltip('_fixTitle').tooltip('show');
	setTimeout(function() {
		clipbtn.attr('title', "复制结果").tooltip('_fixTitle').mouseout(function() {
			clipbtn.tooltip('hide');
		});
	}, 500);
}

function resetText() {
	$("#rawText").val("").select();
	textarea_resize();
}

function showDialog() {
	var dialog = $("#dialog").show();
	setTimeout(function() {
		dialog.css({
			"top": "8px",
			"opacity": 1
		})
	}, 1);
	setTimeout(function() {
		dialog.css({
			"top": "-8px",
			"opacity": 0
		})
		setTimeout(function() {
			dialog.hide();
		}, 250)
	}, 1500);
}

//弹出dropdown的toggle也可以同时显示tooltips
$("#dropdown-button").hover(dropdownTooltipShow); //暂时不知道为什么不能用on
$("#dropdown-button").focus(dropdownTooltipShow);
$("#dropdown-button").mouseout(dropdownTooltipHide);
$("#dropdown-button").blur(dropdownTooltipHide);
$("#dropdown-button").click(dropdownTooltipHide);
$(".fa-chevron-down").hover(dropdownTooltipShow);
function dropdownTooltipShow() {
	$('#tooltip-for-dropdown').tooltip('show');
}
function dropdownTooltipHide() {
	$('#tooltip-for-dropdown').tooltip('hide');
}

//老傈僳文
var lisuIsOpen = 0;

$("#lisuBtn").click(function(){
	var result = $("#resultText").val();
	if (!($("#lisuCheck").is(":checked")) || lisuIsOpen == 0) {
		result = lisuData(1);
		lisuIsOpen = 1;
		$("#lisuLabel").html("拉丁字母").attr('title',"　当前：老傈僳文　　<br>单击后：大写拉丁字母").tooltip('_fixTitle').tooltip('show');
	} else {
		result = lisuData(0);
		lisuIsOpen = 0;
		$("#lisuLabel").html("老傈僳文").attr('title',"　当前：大写拉丁字母<br>单击后：老傈僳文　　").tooltip('_fixTitle').tooltip('show');
	}
	$("#resultText").val(result);
});

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
var mode = 0, type = 0; //, input, output, raw, result, sep;

function tryChecked(sample) { //检查模式与类型勾选情况
	mode = $('[name="mode"]').parent().siblings(".active").index();
	type = $('[name="type"]').parent().siblings(".active").index();
	if ($("#initialAll").is(":checked")) type += 3;
	if ($("#initialFirst").is(":checked")) type += 4;
	//更改使用提示的示例文本
	if (sample == 1) {
		if (!(mode == 2 && type == 1 && lisuIsOpen == 1)) {
			lisuIsOpen = 0;
			$("#lisuBtn").attr("class","btn btn-outline-secondary btn-sm");
			$("#lisuLabel").attr('title',"　当前：大写拉丁字母<br>单击后：老傈僳文　　").tooltip('_fixTitle');
			setTimeout(function() {
				$("#lisuLabel").html("老傈僳文");
			}, 250); //waitForChangeLisuBtnName()
		}
		$('#include5').html($('[name="mode"]')[mode].dataset.include5.trim().bool()?"5-入声；":"");
		if (mode == 2 && type == 1) lisuShow(1);
		else lisuShow(0);
		$('#sampleResult').html(converse("xie4'zui4", $('#sep').val()));
		getResult();
	}
}

$('#rawText').bind('keyup', function(event) {
	if (event.keyCode == "13") getResult(); //回车执行查询
});

function getResult() {
	tryChecked(0);
	$("#resultText").val(converse($('#rawText').val(), $('#sep').val()));
	textarea_resize();
}

function converse(raw, sep = " ") {
	if (sep == "（空格）") sep = " ";
	if (sep == "（留空）") sep = "";
	raw = preRaw(raw);
	result = sentence(raw, sep, mode, type);
	if (lisuIsOpen == 1) result = lisuData(1);
	return result = result.replace(/undefined/g, "");
}
//开启斜体
function italic() {
	var italicCheck = document.getElementById("italicCheck");
	if ($("#italicCheck").is(":checked")) {
		$("body").css("font-style","normal");
		$("#italicLabel").html("开启斜体");
	} else {
		$("body").css("font-style","italic");
		$("#italicLabel").html("恢复常规");
	}
}
//raw处理
function preRaw(raw) {
	//var interferedPunctuation["!","~","`","@","#","$","%","&","-","_","=","|","\\","\"",":",";","<",">",",","\+","\?","\."];
	raw = pinyinUtil.getPinyin(raw, "\'");
	raw = backToAsciiPinyin(raw);
	for (var i = 0; i <= 9; i++)
		raw = raw.replace(new RegExp(i, "g"), i + "\'");
	if (raw != "") raw = raw + "\'";
	return raw;
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
String.prototype.replaces = function(stra, strb, sep = ",") { //字符串批量替换
	var s = this.valueOf(),
		a = stra,
		b = strb;
	if (!Array.isArray(stra)) a = stra.split(sep);
	if (strb) {
		if (!Array.isArray(strb)) b = strb.split(sep);
		for (var i = 0; i < a.length; i++)
			s = s.replace(new RegExp(a[i], "g"), b[i])
	} else
		for (var i = 0; i < a.length; i++)
			s = s.replace(new RegExp(a[i], "g"), "")
	return s;
}
String.prototype.finds = function() { //字符串查找指定字符的数目
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
String.prototype.reverse = function() { //字符串颠倒顺序
	var t = "";
	for (var i = this.length - 1; i >= 0; i--)
		t += this[i];
	return t;
}
String.prototype.bool = function() { //字符串转布尔型
	return (/^true$/i).test(this);
}
String.prototype.is = function() { //字符串是否为括号里面数组中某个字符串
	var n = 0,
		arg = arguments;
	if (arguments.length == 1)
		arg = arguments[0].split(",");
	for (var i = 0; i < arg.length; i++)
		if (this == arg[i])
			return true;
	return false;
}
String.prototype.inTwo = function(sep = ",") { //字符串两两字符间插一个字符
	var a = "", l = this.length - 1;
	for (var i = 0;i < l;i++)
		a += this[i] + sep;
	return a += this[l];
}
Array.prototype.indexOf = function(val) { //获取元素在数组的下标
	for (var i = 0; i < this.length; i++)
		if (this[i] == val)
			return i;
	return -1; 
}
Array.prototype.remove = function(val) { //根据数组的下标，删除该下标的元素
	var index = this.indexOf(val);
	if (index > -1)
		this.splice(index, 1);
}
Array.prototype.trim = function() { //清除数组里面的空串
	for (var i = 0;i < this.length;i++)
		if (this[i] === '')
			this.splice(i, 1);
	return this;
}