//It just for Bootstrap theme.
//请将本js放在页面最末尾，否则可能不起作用。
//$('head').append("<script src='https://cdn.staticfile.org/jquery/3.5.1/jquery.min.js'></script>");
//$(document).ready(function() {
var hour = new Date().getHours();
var css = document.getElementById("css");
if (css) var theme = css.getAttribute("data-theme");
var darkModeFact;
if (hour < 7 || hour >= 19) darkModeFact = 1; //晚上7点到次日早上7点启动黑暗模式
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) darkModeFact = 1; //若浏览器开启了黑暗模式，也会启动黑暗模式
try {
	if (darkMode == 1) darkModeFact = 1;
	if (darkMode == 0) darkModeFact = 0;
	//用户可以在自己的网站上面定义一个名为darkMode的变量，自由调试开关黑暗模式的效果。
} catch (e) {}
if (darkModeFact == 1) DarkModeStyle();
else LightModeStyle();
//});
var textColor=(darkModeFact == 1?"255,255,255":"0,0,0")

//滚动条样式修改
// try{
$('head').append(
`<style>
	::-webkit-scrollbar {
		width: 4px;
		height: 4px;
		scrollbar-arrow-color:red;
	}
	::-webkit-scrollbar-thumb {
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
		background: rgba(${textColor},0.2);
		scrollbar-arrow-color:red;
	}
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
		border-radius: 0;
		background: rgba(${textColor},0.1);
	}
</style>`
);
// } catch (e) {}

//深色模式样式操作
function DarkModeStyle() {
	if (theme && theme.search(/bootstrap/i) != -1) {
		document.getElementById('css').href = 'https://bootswatch.com/4/darkly/bootstrap.min.css';
		$(".navbar").removeClass("navbar-light bg-light").addClass("navbar-dark bg-dark");
		// $(".btn-outline-secondary").removeClass("btn-outline-secondary").addClass("btn-outline-light");
		// $(".iframe-container").css("top", "73.38px");
		// $(".reset-on-right-float").css("margin", "19 0");
		// $(".sm").css("height", "22px");
		$('head').append(
`<style id="bootstrap-style">
	/* 更改到btn-outline-light样式 */
	.btn-outline-secondary {
	  color: #adb5bd;
	  border-color: #adb5bd;
	}
	.btn-outline-secondary:hover {
	  color: #222;
	  background-color: #adb5bd;
	  border-color: #adb5bd;
	}
	.btn-outline-secondary:focus, .btn-outline-secondary.focus {
	  box-shadow: 0 0 0 0.2rem rgba(173, 181, 189, 0.5);
	}
	.btn-outline-secondary.disabled, .btn-outline-secondary:disabled {
	  color: #adb5bd;
	  background-color: transparent;
	}
	.btn-outline-secondary:not(:disabled):not(.disabled):active, .btn-outline-secondary:not(:disabled):not(.disabled).active,
	.show > .btn-outline-secondary.dropdown-toggle {
	  color: #222;
	  background-color: #adb5bd;
	  border-color: #adb5bd;
	}
	.btn-outline-secondary:not(:disabled):not(.disabled):active:focus, .btn-outline-secondary:not(:disabled):not(.disabled).active:focus,
	.show > .btn-outline-secondary.dropdown-toggle:focus {
	  box-shadow: 0 0 0 0.2rem rgba(173, 181, 189, 0.5);
	}
	.reset-on-right-float {
		margin: 19px 0;
	}
	.sm {
		height: 22px;
	}
	.form-control, .form-control:focus {
		background-color:rgb(34,34,34);
		border-color:rgb(173,181,189);
		color:white;
		fill:white;
	}
	.input-group-text {
		border-color:rgb(173,181,189);
	}
	.form-control:focus {
		border-color: #adb5bd;
		-webkit-box-shadow: 0 0 0 0.2rem rgba(173,181,189,0.5);
		box-shadow: 0 0 0 0.2rem rgba(173,181,189,0.5);
	}
	.custom-select {
		background: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23d0d0d0' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e\") no-repeat right 0.75rem center/8px 10px ; \
	}
	.custom-control-label::before {
		background-color: #222;
	}
</style>`
		);
	}
	try {
		if (nightDo && typeof(nightDo) == "function") nightDo();
		//用户可以定义一个名为nightDo的函数，自由决定要在黑暗模式下想做的操作
	} catch (e) {}
	$('style').remove("#light-root");
	$('head').append(
`<style id="dark-root">
	:root {
		--text-color:white;
		--background-color:rgb(34,34,34);
	}
</style>`
	);
}

//浅色模式样式操作
function LightModeStyle() {
	if (theme && theme.search(/bootstrap/i) != -1) {
		document.getElementById('css').href = 'https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.min.css';
		$(".navbar").removeClass("navbar-dark bg-dark").addClass("navbar-light bg-light");
	}
	// try {
		$('style').remove("#bootstrap-style").remove("#dark-root");
		$('head').append(
`<style id="light-root">
	:root {
		--text-color:black;
		--background-color:white;
	}
</style>`
		);
	// } catch (e) {}
}

// $('head').append('<style>:root {--font-family-sans-serif: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";}</style>');