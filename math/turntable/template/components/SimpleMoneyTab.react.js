// import $ from 'jquery';
// import '../../css/simple-money-tab.min.css'; //压根就import不进去
// 以下还是注入CSS文件的方法

class SimpleMoneyTab extends React.Component {
	render() {
		if (document.getElementById("simple-money-tab") === null) {
			/* $.get("css/simple-money-tab.css",{},function(css){ 鉴于不推荐同时使用react和jQuery，还是别这么写好了 }); */
			/* var css = new XMLHttpRequest();
			css.onreadystatechange = () => {
				if (css.readyState == 4 && css.status == 200) {
					var styleTag = document.createElement("style");
					styleTag.innerHTML = css.responseText;
					styleTag.id = "simple-money-tab";
					document.head.appendChild(styleTag);
				}
			}
			css.open("GET", "css/simple-money-tab.css", true);
			css.send(); */
			var linkTag = document.createElement("link");
			linkTag.rel = "stylesheet";
			linkTag.type = "text/css";
			linkTag.href = "css/simple-money-tab.min.css";
			linkTag.id = "simple-money-tab";
			document.head.appendChild(linkTag);
		}
		return React.createElement(
			"div",
			null,
			React.createElement(
				"a",
				{ href: "help.html" },
				React.createElement(
					"i",
					{ style: { marginRight: 0 } },
					"\uE709"
				)
			),
			React.createElement(
				"i",
				null,
				"\uE7CB"
			),
			React.createElement(
				"span",
				{ id: "amount-num" },
				"\u5143"
			),
			React.createElement(
				"button",
				{ id: "rechange-btn" },
				React.createElement(
					"i",
					null,
					"\uE718"
				)
			)
		);
	}
}

export default SimpleMoneyTab;
