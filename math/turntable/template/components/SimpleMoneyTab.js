class SimpleMoneyTab extends React.Component {
	render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"style",
				{ scoped: true },
				"@import url(\"css/simple-money-tab.min.css\")"
			),
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
