class FingerGuessing extends React.Component {
	render() {
		return (
			<div className="finger-guessing">
				<div className="screen">
					<span id="fist" className="fin-face active">{iconlist.fist}</span>
					<span className="sep"></span>
					<span id="scissors" className="fin-face">{iconlist.scissors}</span>
					<span className="sep"></span>
					<span id="cloth" className="fin-face">{iconlist.cloth}</span>
					<div className="fin-point-group">
						<span className="fin-pointer"></span>
						<span className="fin-pointer copy"></span>
					</div>
				</div>
				<button id="fin-start" className="round-button" data-toggle="tooltip" data-placement="right" title="开始猜拳"><i>{iconlist.rotating}</i></button>
			</div>
		);
	}
}

class StandardMoneyTab extends React.Component {
	render() {
		return (
			<div className="round-button-group top-side money-tab hidden">
				<a className="top-icon top-button" href="help.html" data-toggle="tooltip" data-placement="bottom" title="帮助"><i></i></a>
				<span className="top-item"><span className="top-icon"></span><i></i> <span id="amount-num">-- 元</span></span>
				<span data-toggle="tooltip" data-placement="bottom" title="充值">
					<button className="top-icon top-button" id="rechange-btn" data-toggle="modal" data-target="#rechargeModal"><i></i></button>
				</span>
				<span data-toggle="tooltip" data-placement="bottom" title="偏好设置">
					<button className="top-icon top-button" data-toggle="modal" data-target="#preferenceSetting"><i></i></button>
				</span>
			</div>
		);
	}
}

class OverlayLayer extends React.Component {
	render() {
		return (
			<div className="overlay-layer" style={{display: 'none'}}>
				<div className="overlay-text"></div>
			</div>
		);
	}
}

export {FingerGuessing, StandardMoneyTab, OverlayLayer};