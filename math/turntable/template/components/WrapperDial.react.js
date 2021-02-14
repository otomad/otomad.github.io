class WrapperDial extends React.Component {
	render() {
		return React.createElement(
			"div",
			{ className: "turntable" },
			React.createElement(
				"div",
				{ className: "wrapper" },
				this.props.list.map((item, index, arr) => {
					return React.createElement(Light, { key: "light-" + index, index: index, num: arr.length });
				}),
				React.createElement(
					"div",
					{ className: "panel circularOut start-animation" },
					React.createElement(
						"div",
						{ className: "circular" },
						React.createElement(
							"ul",
							null,
							this.props.list.map((item, index) => {
								return React.createElement(
									Sector,
									{ key: "sector-" + index },
									item
								);
							})
						)
					),
					React.createElement(
						"button",
						{ className: "pointer", "data-toggle": "tooltip", "data-placement": "bottom", "data-html": "true", title: this.props.info + "<br>随机转动" },
						React.createElement(
							"span",
							null,
							iconlist.random
						)
					)
				)
			)
		);
	}
}

class Light extends React.Component {
	getDeg() {
		return this.props.index * 360 / this.props.num;
	}
	render() {
		return React.createElement("div", { className: "light", style: { transform: `rotate(${this.getDeg()}deg)` } });
	}
}

class Sector extends React.Component {
	render() {
		return React.createElement(
			"li",
			null,
			React.createElement(
				"a",
				{ className: "circular-inner" },
				React.createElement("p", { dangerouslySetInnerHTML: { __html: this.props.children } })
			)
		);
	}
}

rendered = true;
