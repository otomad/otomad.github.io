import classNames from "../../js/classnames.mjs";
import { guideCard } from "./BetGuideCard.js";

const cardSize = 200; //px
var { cardWidth, cardHeight, cardTableWidth, cardTableHeight, singleTransitionDuration: std } = rootCSS.val;

window.score = { data: 0 };

const suitList = ['hearts', 'diamonds', 'spades', 'clubs'],
      pointList = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'JOKER'];
var pokerList = new Array(54).fill(0);

function randomCard() {
	var random;
	do {
		random = Math.randBetween(0, 53);
	} while (pokerList[random]);
	pokerList[random] = 1;
	console.log(pokerList.join(''));
	if (pokerList.toString() == new Array(54).fill(1).toString()) pokerList.fill(0);
	var curSuit = Math.floor(random / 13),
	    curPoint = random % 13;
	if (random >= 52) {
		curPoint = 13;
		curSuit = random - 52;
	}
	var Suit = suitList[curSuit],
	    Point = pointList[curPoint];
	return [Suit, Point];
}

export var cardTable = null;
export default class CardTable extends React.Component {
	constructor() {
		super();

		this.reScale = () => {
			var height = document.body.clientHeight,
			    width = document.body.clientWidth,
			    scale,
			    top;
			if (cardTableHeight * width / height >= cardTableWidth) scale = height / cardTableHeight;else scale = width / cardTableWidth;
			top = (height / scale - cardHeight) / 2;
			this.setState({ scale, top });
		};

		this.recover = (point = 0) => {
			score.data += point;
			score[this.state.uncoveredCard] = point;
			var uncoveredCard = this.state.uncoveredCard + 1;
			if (uncoveredCard == 2) {
				guideCard.step(5);
				this.setState({
					seat: 3
				});
			}
			this.setState({ uncoveredCard });
		};

		this.hide = () => {
			this.setState({
				seat: 4
			});
			setTimeout(() => this.setState({
				seat: 5
			}), std * 1);
			setTimeout(() => ReactDOM.unmountComponentAtNode(document.getElementById(CardTable.id())), std * 3);
		};

		this.cardNum = 4;
		this.randCardArr = [];
		for (let i = 0; i < this.cardNum; i++) this.randCardArr.push(randomCard());
		this.state = {
			scale: 1,
			seat: -1,
			uncoveredCard: 0,
			top: 190
		};
		cardTable = this;
	}

	componentDidMount() {
		this.reScale();
		window.addEventListener('resize', this.reScale.bind(this));

		setTimeout(() => this.setState({
			seat: 0
		}), std * 2);
		setTimeout(() => this.setState({
			seat: 1
		}), std * 3);
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.reScale.bind(this));
	}
	render() {
		const cardDeck = React.createElement(
			"div",
			{ id: "card-deck", className: classNames({
					"poker-card": true,
					"card-deck": this.state.seat !== -1,
					setup: this.state.seat === -1 || this.state.seat === 5
				}) },
			React.createElement(CardBack, { id: "card-deck-back" })
		);
		return React.createElement(
			"div",
			null,
			React.createElement(
				"style",
				null,
				`
						:root {
							--card-top: ${this.state.top}px;
						}
					`
			),
			React.createElement("div", { className: classNames({
					"mask-layer": true,
					hidden: this.state.seat === -1 || this.state.seat === 5
				}) }),
			React.createElement(
				"div",
				{ className: "card-table", style: {
						transform: `scale(${this.state.scale})`
					} },
				cardDeck,
				this.randCardArr.map((item, index) => {
					return React.createElement(PokerCard, { key: "poker-card-" + index, id: "poker-card-" + index, suit: item[0], point: item[1], seat: this.state.seat, recover: this.recover });
				})
			)
		);
	}
	static id() {
		return "poker-card-table";
	} //怕浏览器只支持静态方法不支持静态属性
	static show() {
		ReactDOM.render(React.createElement(CardTable, null), React.root(CardTable.id()));
	}
}

class PokerCard extends React.Component {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.state = {
			uncover: false
		}, this.initCanvas = () => {
			var canvas = document.getElementById(this.props.id).getContext('2d');
			canvas.drawPokerCard(0, 0, cardSize, this.props.suit, this.props.point);
		}, this.flip = () => {
			this.setState(state => ({
				uncover: !state.uncover
			}));
			let point = (pointList.indexOf(this.props.point) + 1) % 14;
			this.props.recover(point);
		}, _temp;
	}

	componentDidMount() {
		this.initCanvas();
	}
	componentDidUpdate() {
		this.initCanvas();
	}

	render() {
		return React.createElement(
			"div",
			{ className: classNames({
					"poker-card": true,
					uncover: this.state.uncover && this.props.seat < 4,
					"card-deck": this.props.seat === 0 || this.props.seat === 4,
					setup: this.props.seat === -1 || this.props.seat === 5,
					"avoid-click": this.props.seat >= 3
				}), onClick: this.flip, "data-suit": this.props.suit, "data-point": this.props.point },
			React.createElement(CardBack, { id: this.props.id + "-back" }),
			React.createElement(
				"div",
				{ className: "card-face" },
				React.createElement("canvas", { id: this.props.id, width: this.props.width, height: this.props.height })
			)
		);
	}
}

PokerCard.defaultProps = {
	width: cardWidth,
	height: cardHeight,
	seat: -1
};
class CardBack extends React.Component {
	constructor(...args) {
		var _temp2;

		return _temp2 = super(...args), this.initCanvas = () => {
			var canvas = document.getElementById(this.props.id).getContext('2d');
			canvas.drawPokerBack(0, 0, cardSize);
		}, _temp2;
	}

	componentDidMount() {
		this.initCanvas();
	}
	componentDidUpdate() {
		this.initCanvas();
	}

	render() {
		return React.createElement(
			"div",
			{ className: "card-back" },
			React.createElement("canvas", { id: this.props.id, width: this.props.width, height: this.props.height })
		);
	}
}
CardBack.defaultProps = {
	width: cardWidth,
	height: cardHeight
};
