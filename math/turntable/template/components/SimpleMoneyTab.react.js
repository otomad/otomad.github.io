// import $ from 'jquery';

class SimpleMoneyTab extends React.Component {
	render() {
		if (document.getElementById("simple-money-tab")===null) {
			$.get("css/simple-money-tab.css",{},function(css){
				var styleTag = document.createElement("style");
				styleTag.innerHTML = css;
				styleTag.id = "simple-money-tab";
				document.head.appendChild(styleTag);
			});
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
