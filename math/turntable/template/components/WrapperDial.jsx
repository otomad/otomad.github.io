class WrapperDial extends React.Component {
	render() {
		return (
			<div className="turntable">
				<div className="wrapper">
					{
						this.props.list.map((item, index, arr) => {
							return <Light key={"light-" + index} index={index} num={arr.length} />;
						})
					}
					<div className="panel circularOut start-animation">
						<div className="circular">
							<ul>
								{
									this.props.list.map((item, index) => {
										return <Sector key={"sector-" + index}>{item}</Sector>;
									})
								}
							</ul>
						</div>
						<button className="pointer" data-toggle="tooltip" data-placement="bottom" data-html="true" title={this.props.info+"<br>随机转动"}>
							<span>{iconlist.random}</span>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

class Light extends React.Component {
	getDeg() {
		return this.props.index * 360 / this.props.num;
	}
	render() {
		return (
			<div className="light" style={{transform: `rotate(${this.getDeg()}deg)`}}></div>
		);
	}
}

class Sector extends React.Component {
	render() {
		return (
			<li>
				<a className="circular-inner">
					<p dangerouslySetInnerHTML={{__html: this.props.children}}></p>
				</a>
			</li>
		);
	}
}

rendered = true;