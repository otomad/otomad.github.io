class SimpleMoneyTab extends React.Component {
	render() {
		return (
			<div>
				<style scoped>@import url("css/simple-money-tab.min.css")</style>
				<a href="help.html"><i style={{marginRight: 0}}></i></a>
				<i></i>
				<span id="amount-num">元</span>
				<button id="rechange-btn"><i></i></button>
			</div>
		);
	}
}

export default SimpleMoneyTab;