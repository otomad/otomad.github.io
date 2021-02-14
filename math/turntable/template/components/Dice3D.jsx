class Dice3D extends React.Component {
	render() {
		const slides = ["front", "bottom", "right", "left", "top", "back"];
		return (
			<div>
				<div className="dice-shadow">
					<div className="back slide"></div>
				</div>
				<div id={this.props.id} className="dice">
					{
						slides.map((item, index) => {
							return <div className={item + " reverse slide"} key={item + "-reverse-slide"}></div>;
						})
					}
					{
						slides.map((item, index) => {
							return <DiceFace dot={index + 1} slide={item} key={item + "-slide"} />;
						})
					}
				</div>
			</div>
		);
	}
}

class DiceFace extends React.Component {
	render() {
		return (
			<div className={this.props.slide + " slide"}>
				{
					new Array(this.props.dot - 0).fill('').map((item, index) => {
						return <div className="dot" key={this.props.slide + '-slide-dot-' + index}></div>;
					})
				}
			</div>
		);
	}
}