class RoundButton extends React.Component {
	render() {
		return (
			<button id={this.props.id} className={"round-button" + (this.props.active?" active":"")} aria-label={this.props.aria} data-toggle="tooltip" data-placement="left" data-html="true" title={this.props.title}>
				<span className="round-button-face">
					<i>{this.props.icon}</i>
				</span>
			</button>
		);
	}
}

class RoundButtonPieces extends React.Component {
	render() {
		return (<div className="round-button-pieces">{this.props.children}</div>);
	}
}

class RoundButtonHalf extends React.Component {
	render() {
		return (
			<button id={this.props.id} data-relative-speed={this.props.relativeSpeed} className={`round-button round-button-half-${this.props.half}` + (this.props.active?" active":"")} aria-label={this.props.aria} data-toggle="tooltip" data-placement="left" data-html="true" title={this.props.title}>
				<span className={`round-button-face round-button-half-${this.props.half}-face`}>
					<span className="rotate-text-fix">
						<b><i>{this.props.icon}</i></b>
					</span>
				</span>
			</button>
		);
	}
}

class RoundButtonsGroup extends React.Component {
	render() {
		return (
			<div className="round-button-group hidden" id="rbtn-group">
				<RoundButton id="btn-rotating" aria="转动/停止" title="转动/<b>停止</b>" icon={iconlist.rotating} />
				<RoundButton id="btn-inertia" aria="现实惯性" title="单击后：现实惯性<br>当前：　理想骤止" icon={iconlist.inertiaOn} />
				<RoundButton id="btn-direction" aria="旋转方向" title="旋转方向：顺时针" icon={iconlist.clockwise} />
				<RoundButtonPieces>
					<RoundButtonHalf id="btn-speed-up" relativeSpeed="+0.2" half="1" aria="加速" title="加速<br>当前速度：2 r/s" icon={iconlist.speedUp} />
					<RoundButtonHalf id="btn-speed-down" relativeSpeed="-0.2" half="2" aria="减速" title="减速<br>当前速度：2 r/s" icon={iconlist.speedDown} />
				</RoundButtonPieces>
				<RoundButton id="btn-pattern" aria="旋转轴" title="旋转轴<br>当前：　指针旋转<br>单击后：转盘旋转" icon={iconlist.pointerRotate} />
				<RoundButtonPieces>
					<RoundButtonHalf id="btn-check" half="1" aria="旋转模式" title="旋转模式" icon={iconlist.check} active={true} />
					<RoundButtonHalf id="btn-cross" half="2" aria="点按模式" title="点按模式" icon={iconlist.cross} />
					<button id="btn-cross-cheat" hidden></button>
					<button id="btn-check-auto" hidden></button>
				</RoundButtonPieces>
				<RoundButtonPieces>
					<RoundButtonHalf id="btn-giveup" half="1" aria="服输" title="服输" icon={iconlist.giveup} />
					<RoundButtonHalf id="btn-not-giveup" half="2" aria="不服输" title="不服输" icon={iconlist.notGiveup} />
				</RoundButtonPieces>
			</div>
		);
	}
}

export default RoundButtonsGroup;