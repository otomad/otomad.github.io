class Dice3D extends React.Component {
	render() {
		const slides = ["front", "bottom", "right", "left", "top", "back"];
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "dice-shadow" },
				React.createElement("div", { className: "back slide" })
			),
			React.createElement(
				"div",
				{ id: this.props.id, className: "dice" },
				slides.map((item, index) => {
					return React.createElement("div", { className: item + " reverse slide", key: item + "-reverse-slide" });
				}),
				slides.map((item, index) => {
					return React.createElement(DiceFace, { dot: index + 1, slide: item, key: item + "-slide" });
				})
			)
		);
	}
}

class DiceFace extends React.Component {
	render() {
		return React.createElement(
			"div",
			{ className: this.props.slide + " slide" },
			new Array(this.props.dot - 0).fill('').map((item, index) => {
				return React.createElement("div", { className: "dot", key: this.props.slide + '-slide-dot-' + index });
			})
		);
	}
}
