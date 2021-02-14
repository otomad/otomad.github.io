class FingerGuessing extends React.Component {
	render() {
		return React.createElement(
			"div",
			{ className: "finger-guessing" },
			React.createElement(
				"div",
				{ className: "screen" },
				React.createElement(
					"span",
					{ id: "fist", className: "fin-face active" },
					iconlist.fist
				),
				React.createElement("span", { className: "sep" }),
				React.createElement(
					"span",
					{ id: "scissors", className: "fin-face" },
					iconlist.scissors
				),
				React.createElement("span", { className: "sep" }),
				React.createElement(
					"span",
					{ id: "cloth", className: "fin-face" },
					iconlist.cloth
				),
				React.createElement(
					"div",
					{ className: "fin-point-group" },
					React.createElement("span", { className: "fin-pointer" }),
					React.createElement("span", { className: "fin-pointer copy" })
				)
			),
			React.createElement(
				"button",
				{ id: "fin-start", className: "round-button", "data-toggle": "tooltip", "data-placement": "right", title: "\u5F00\u59CB\u731C\u62F3" },
				React.createElement(
					"i",
					null,
					iconlist.rotating
				)
			)
		);
	}
}

class StandardMoneyTab extends React.Component {
	render() {
		return React.createElement(
			"div",
			{ className: "round-button-group top-side money-tab hidden" },
			React.createElement(
				"a",
				{ className: "top-icon top-button", href: "help.html", "data-toggle": "tooltip", "data-placement": "bottom", title: "\u5E2E\u52A9" },
				React.createElement(
					"i",
					null,
					"\uE709"
				)
			),
			React.createElement(
				"span",
				{ className: "top-item" },
				React.createElement("span", { className: "top-icon" }),
				React.createElement(
					"i",
					null,
					"\uE7CB"
				),
				" ",
				React.createElement(
					"span",
					{ id: "amount-num" },
					"-- \u5143"
				)
			),
			React.createElement(
				"span",
				{ "data-toggle": "tooltip", "data-placement": "bottom", title: "\u5145\u503C" },
				React.createElement(
					"button",
					{ className: "top-icon top-button", id: "rechange-btn", "data-toggle": "modal", "data-target": "#rechargeModal" },
					React.createElement(
						"i",
						null,
						"\uE718"
					)
				)
			),
			React.createElement(
				"span",
				{ "data-toggle": "tooltip", "data-placement": "bottom", title: "\u504F\u597D\u8BBE\u7F6E" },
				React.createElement(
					"button",
					{ className: "top-icon top-button", "data-toggle": "modal", "data-target": "#preferenceSetting" },
					React.createElement(
						"i",
						null,
						"\uE701"
					)
				)
			)
		);
	}
}

class OverlayLayer extends React.Component {
	render() {
		return React.createElement(
			"div",
			{ className: "overlay-layer", style: { display: 'none' } },
			React.createElement("div", { className: "overlay-text" })
		);
	}
}

export {FingerGuessing, StandardMoneyTab, OverlayLayer};