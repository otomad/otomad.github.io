// import $ from 'jquery';
// import '../../css/simple-money-tab.min.css'; //压根就import不进去

class SimpleMoneyTab extends React.Component {
	getInitialState(){
		return {hover: false}
	}
	toggleHover() {
		this.setState({hover: !this.state.hover})
	}
	render() {
		const style = {
			entire: {
				position: "fixed",
				margin: "0.75em 0 0.5em",
				right: "1rem",
				top: 0,
				fontSize: "125%"
			},
			icon: {
				margin: "0 6px",
				transform: "translateY(-1px)"
			},
			button: {
				display: "inline-block",
				border: "none",
				background: "none",
				padding: 0,
				color: "var(--text-color)",
				transition: "all 250ms ease-out"
			},
			buttonHover: {
				outline: "none",
				color: "var(--primary)"
			},
			buttonActive: {
				transform: "scale(.9)"
			}
		};
		if (this.state.hover) {
			linkStyle = {backgroundColor: 'red'}
		} else {
			linkStyle = {backgroundColor: 'blue'}
		}
		return (
			<div style={style.entire}>
				<a href="help.html"><i style={style.helpIcon}></i></a>
				<i style={style.icon}></i>
				<span id="amount-num">元</span>
				<button style={linkStyle} onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover} id="rechange-btn"><i style={style.icon}></i></button>
			</div>
		);
	}
}

export default SimpleMoneyTab;