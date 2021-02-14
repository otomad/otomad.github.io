import $ from 'jquery';

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
		return (
			<div>
				<a href="help.html"><i style={{marginRight: 0}}></i></a>
				<i></i>
				<span id="amount-num">元</span>
				<button id="rechange-btn"><i></i></button>
			</div>
		);
	}
}

export default SimpleMoneyTab;