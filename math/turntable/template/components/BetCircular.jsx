import classNames from "../../js/classnames.mjs";
import { guideCard } from "./BetGuideCard.js";

var { circSize, circMargin, guideCardHeight } = rootCSS.val;

window.direct = 0, //-1 表示左旋，1 表示右旋
window.finalScore = 0;

export var betCircular = null;
export default class BetCircular extends React.Component {
	constructor() {
		super();
		this.ul = [0, 1, 25, 3, 23, 5, 21, 7, 19, 9, 17, 11, 15, 13, 14, 12, 16, 10, 18, 8, 20, 6, 22, 4, 24, 2, 26];
		this.state = {
			init: false,
			scale: 1,
			active: true,
			clickable: false,
			highLight: null
		}
		betCircular = this;
	}
	initCircular = () => {
		if (this.state.init) return;
		var circ = $(".circ").circular({
			centerDeg: -90 - 360 / this.ul.length / 2,
			allDeg: 360,
			inner: 0,
			spacing: 0,
			hidden: true,
			animation: "clockwise"
		});
		setTimeout(circ => circ.toShow(), 250, circ);
		$(".circ a").css("background","");
		this.setState({
			init: true
		})
	}
	reScale = (_, active = this.state.active) => { //第一个参数留空是避免被window event listener塞对象进去
		var height = document.body.clientHeight,
			width = document.body.clientWidth;
		if (width < 992) height -= guideCardHeight;
		var min = Math.min(height, width),
			scale = min / (circSize + circMargin * 2 * (active ? 1 : 2));
		this.setState({ scale, active });
	}
	chooseDirect = dir => {
		if (dir === -1) {
			guideCard.step(2);
			direct = dir;
		} else if (dir === 1) {
			guideCard.step(3);
			direct = dir;
		}
	}
	highLight = (item) => {
		this.setState({
			highLight: this.ul.indexOf(item)
		})
	}
	count = (score, direct) => {
		for (let i = 0; i <= score; i++) {
			setTimeout(() => {
				if(i!=score) {
					var j = i + 1,
						item = this.ul.indexOf(score) + Math.sign(direct) * j;
					if(item<0) item += this.ul.length;
					if(item>=this.ul.length) item -= this.ul.length;
					item = this.ul[item];
					finalScore = item;
					circularCount = j;
					guideCard.step(9);
					this.highLight(item);
				} else
					guideCard.step(10);
			}, 500 * i);
		}
	}
	componentDidMount() {
		this.initCircular();
		this.reScale();
		window.addEventListener('resize', this.reScale.bind(this));
	}
	componentDidUpdate() {
		this.initCircular();
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.reScale.bind(this));
	}
	static defaultProps = {
		id: "circOut"
	}
	render() {
		var o = { opacity: (this.state.init ? "" : 0) },
			svgStyle = [{...o}, {...o}];
		if (direct) Object.assign(svgStyle[(direct + 1) / 2], { opacity: 1 });
		return (
			<div className={classNames({
				circOut: true,
				"avoid-click": !this.state.clickable
			})} id={this.props.id} style={{
				transform: `scale(${this.state.scale})`,
				opacity: (this.state.active ? 1 : 0.5)
			}}>
				<LeftRotateSVG id="left-rotate" onClick={() => this.chooseDirect(-1)} style={svgStyle[0]} />
				<RightRotateSVG id="right-rotate" onClick={() => this.chooseDirect(1)} style={svgStyle[1]} />
				{/* <embed id="left-rotate" src="svg/left-rotate.svg" type="image/svg+xml" />
				<embed id="right-rotate" src="svg/right-rotate.svg" type="image/svg+xml" /> */}
				<div className="circ">
					<ul>
						{
							this.ul.map((item, index) => {
								var a;
								if (item != 0) a = <a>{item}</a>;
								else a = <a><small>无奖</small><br />{item}</a>;
								return <li className={classNames({
									active: index == this.state.highLight
								})} key={"li-" + item}>{a}</li>;
							})
						}
					</ul>
				</div>
			</div>
		)
	}
}

function LeftRotateSVG(props) {
	return (
		<svg className={props.className} id={props.id} style={props.style} onClick={props.onClick} width="589" height="490" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" overflow="hidden">
			<g transform="translate(-300 1)">
				<path d="M279.33-12.6624 294.013-12.2793 308.853-11.168 323.423-9.27321 337.785-6.72718 351.905-3.45881 365.756 0.461302 379.317 5.04706 392.571 10.3357 405.503 16.1486 418.073 22.6302 430.276 29.6776 442.103 37.2575 453.521 45.4129 464.562 54.0371 475.161 63.2622 485.272 72.9159 494.954 83.0564 504.114 93.7206 512.712 104.729 520.867 116.147 528.469 128.008 535.451 140.275 541.919 152.82 547.742 165.84 552.962 179.084 557.539 192.619 559.842 200.758 535.466 207.657 533.25 199.824 533.438 200.433 529.063 187.495 529.278 188.082 524.278 175.394 524.5 175.921 518.937 163.484 519.242 164.117 513.054 152.117 513.304 152.578 506.616 140.828 506.961 141.397 499.71 130.085 500.068 130.612 492.255 119.675 492.58 120.109 484.33 109.547 484.704 110.003 475.954 99.8156 476.401 100.31 467.151 90.6224 467.565 91.0362 457.878 81.7862 458.309 82.1795 448.184 73.367 448.703 73.795 438.14 65.545 438.575 65.8698 427.638 58.0573 428.165 58.4145 416.853 51.1645 417.353 51.4688 405.665 44.7188 406.195 45.0082 394.195 38.8207 394.807 39.1157 382.432 33.5532 382.931 33.7647 370.243 28.7022 370.88 28.9366 357.942 24.5616 358.551 24.7504 345.301 21.0004 345.893 21.1529 332.393 18.0279 333.039 18.1597 319.289 15.7222 319.866 15.8109 305.929 13.9984 306.617 14.0688 292.429 13.0063 293.045 13.0374 278.67 12.6624ZM547.654 204.207 603.501 145.391 558 279.5 478.013 162.634Z" transform="matrix(-1 0 0 1 1167.5 81.5001)" />
				<text fontFamily="Microsoft YaHei,Microsoft YaHei_MSFontService,sans-serif" fontWeight="900" fontSize="117" transform="translate(371.446 149)">左
					<tspan fontSize="117" x="117.333" y="0">旋</tspan>
				</text>
			</g>
		</svg>
	)
}

function RightRotateSVG(props) {
	return (
		<svg className={props.className} id={props.id} style={props.style} onClick={props.onClick} width="589" height="490" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" overflow="hidden">
			<g transform="translate(-640 1)">
				<path d="M641.83 68.8377 656.514 69.2207 671.353 70.3321 685.923 72.2268 700.286 74.7729 714.405 78.0412 728.256 81.9614 741.817 86.5471 755.071 91.8358 768.003 97.6487 780.573 104.13 792.776 111.178 804.603 118.758 816.021 126.913 827.062 135.537 837.661 144.762 847.772 154.416 857.454 164.556 866.614 175.221 875.212 186.229 883.367 197.647 890.969 209.508 897.951 221.775 904.419 234.32 910.242 247.34 915.462 260.584 920.039 274.119 922.342 282.258 897.966 289.157 895.75 281.324 895.938 281.933 891.563 268.995 891.778 269.582 886.778 256.894 887 257.421 881.437 244.984 881.742 245.618 875.554 233.618 875.804 234.078 869.116 222.328 869.461 222.897 862.211 211.585 862.568 212.112 854.755 201.175 855.08 201.61 846.83 191.047 847.204 191.503 838.454 181.316 838.901 181.81 829.651 172.122 830.065 172.536 820.378 163.286 820.809 163.68 810.684 154.867 811.203 155.295 800.641 147.045 801.075 147.37 790.138 139.557 790.665 139.915 779.353 132.665 779.853 132.969 768.165 126.219 768.695 126.508 756.695 120.321 757.307 120.616 744.932 115.053 745.431 115.265 732.743 110.202 733.38 110.437 720.442 106.062 721.051 106.25 707.801 102.5 708.393 102.653 694.893 99.5279 695.539 99.6598 681.789 97.2223 682.367 97.311 668.429 95.4985 669.117 95.5688 654.929 94.5063 655.545 94.5374 641.17 94.1624ZM910.154 285.708 966.001 226.891 920.5 361 840.513 244.134Z" />
				<text fontFamily="Microsoft YaHei,Microsoft YaHei_MSFontService,sans-serif" fontWeight="900" fontSize="117" transform="translate(870.552 149)">右旋</text>
			</g>
		</svg>
	)
}

ReactDOM.render(
	<BetCircular />,
	React.root("bet-circ")
);