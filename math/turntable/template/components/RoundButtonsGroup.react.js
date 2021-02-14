class RoundButton extends React.Component {
	render() {
		return React.createElement(
			"button",
			{ id: this.props.id, className: "round-button" + (this.props.active ? " active" : ""), "aria-label": this.props.aria, "data-toggle": "tooltip", "data-placement": "left", "data-html": "true", title: this.props.title },
			React.createElement(
				"span",
				{ className: "round-button-face" },
				React.createElement(
					"i",
					null,
					this.props.icon
				)
			)
		);
	}
}

class RoundButtonPieces extends React.Component {
	render() {
		return React.createElement(
			"div",
			{ className: "round-button-pieces" },
			this.props.children
		);
	}
}

class RoundButtonHalf extends React.Component {
	render() {
		return React.createElement(
			"button",
			{ id: this.props.id, "data-relative-speed": this.props.relativeSpeed, className: `round-button round-button-half-${this.props.half}` + (this.props.active ? " active" : ""), "aria-label": this.props.aria, "data-toggle": "tooltip", "data-placement": "left", "data-html": "true", title: this.props.title },
			React.createElement(
				"span",
				{ className: `round-button-face round-button-half-${this.props.half}-face` },
				React.createElement(
					"span",
					{ className: "rotate-text-fix" },
					React.createElement(
						"b",
						null,
						React.createElement(
							"i",
							null,
							this.props.icon
						)
					)
				)
			)
		);
	}
}

class RoundButtonsGroup extends React.Component {
	render() {
		return React.createElement(
			"div",
			{ className: "round-button-group hidden", id: "rbtn-group" },
			React.createElement(RoundButton, { id: "btn-rotating", aria: "\u8F6C\u52A8/\u505C\u6B62", title: "\u8F6C\u52A8/<b>\u505C\u6B62</b>", icon: iconlist.rotating }),
			React.createElement(RoundButton, { id: "btn-inertia", aria: "\u73B0\u5B9E\u60EF\u6027", title: "\u5355\u51FB\u540E\uFF1A\u73B0\u5B9E\u60EF\u6027<br>\u5F53\u524D\uFF1A\u3000\u7406\u60F3\u9AA4\u6B62", icon: iconlist.inertiaOn }),
			React.createElement(RoundButton, { id: "btn-direction", aria: "\u65CB\u8F6C\u65B9\u5411", title: "\u65CB\u8F6C\u65B9\u5411\uFF1A\u987A\u65F6\u9488", icon: iconlist.clockwise }),
			React.createElement(
				RoundButtonPieces,
				null,
				React.createElement(RoundButtonHalf, { id: "btn-speed-up", relativeSpeed: "+0.2", half: "1", aria: "\u52A0\u901F", title: "\u52A0\u901F<br>\u5F53\u524D\u901F\u5EA6\uFF1A2 r/s", icon: iconlist.speedUp }),
				React.createElement(RoundButtonHalf, { id: "btn-speed-down", relativeSpeed: "-0.2", half: "2", aria: "\u51CF\u901F", title: "\u51CF\u901F<br>\u5F53\u524D\u901F\u5EA6\uFF1A2 r/s", icon: iconlist.speedDown })
			),
			React.createElement(RoundButton, { id: "btn-pattern", aria: "\u65CB\u8F6C\u8F74", title: "\u65CB\u8F6C\u8F74<br>\u5F53\u524D\uFF1A\u3000\u6307\u9488\u65CB\u8F6C<br>\u5355\u51FB\u540E\uFF1A\u8F6C\u76D8\u65CB\u8F6C", icon: iconlist.pointerRotate }),
			React.createElement(
				RoundButtonPieces,
				null,
				React.createElement(RoundButtonHalf, { id: "btn-check", half: "1", aria: "\u65CB\u8F6C\u6A21\u5F0F", title: "\u65CB\u8F6C\u6A21\u5F0F", icon: iconlist.check, active: true }),
				React.createElement(RoundButtonHalf, { id: "btn-cross", half: "2", aria: "\u70B9\u6309\u6A21\u5F0F", title: "\u70B9\u6309\u6A21\u5F0F", icon: iconlist.cross }),
				React.createElement("button", { id: "btn-cross-cheat", hidden: true }),
				React.createElement("button", { id: "btn-check-auto", hidden: true })
			),
			React.createElement(
				RoundButtonPieces,
				null,
				React.createElement(RoundButtonHalf, { id: "btn-giveup", half: "1", aria: "\u670D\u8F93", title: "\u670D\u8F93", icon: iconlist.giveup }),
				React.createElement(RoundButtonHalf, { id: "btn-not-giveup", half: "2", aria: "\u4E0D\u670D\u8F93", title: "\u4E0D\u670D\u8F93", icon: iconlist.notGiveup })
			)
		);
	}
}

export default RoundButtonsGroup;