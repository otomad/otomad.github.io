import classNames from "../../js/classnames.es6module.js";
import { betCircular } from "./BetCircular.js";
import CardTable, { cardTable } from "./PokerCard.js";

var { singleTransitionDuration: std } = rootCSS.val;

export var guideCard = null;
export default class GuideCard extends React.Component {
	constructor() {
		super();
		this.step();
		guideCard = this;
	}
	step = (step = -1) => {
		switch (step) {
			case 10:
				var reward = Math.round(betAmount * 4 / 3);
				if (finalScore != 0) bill.recharge(reward);
				this.setState({
					step,
					title: `您的最终得分为 ${finalScore === 0 ? "0（无奖）" : finalScore}`,
					text: (finalScore === 0 ? `很遗憾转到无奖，您将没收您下注的 ${betAmount} 元`
						: `恭喜您没有转到无奖，您将得到三分之四倍您下注的 ${betAmount} 元，共计 ${reward} 元（取整）`),
					primary: "重新开始",
					enabled: true
				});
				break;
			case 8: case 9:
				if (step == 8) betCircular.count(score.data, direct);
				this.setState({
					step,
					text: String(circularCount),
					enabled: false
				});
				break;
			case 7:
				betCircular.highLight(score.data);
				this.setState({
					step,
					title: `您当前的选择是 ${direct > 0 ? "右" : "左"}旋、${score.data} 分`,
					text: `将在转盘上您的分数 ${score.data} 所在的位置以您预先指定的${direct > 0 ? "右旋（顺" : "左旋（逆"}时针）方向转动 ${score.data} 下`,
					primary: "开始旋转",
					enabled: true
				});
				break;
			case 6:
				this.setState({
					step,
					enabled: false
				});
				cardTable.hide();
				setTimeout(() => {
					betCircular.reScale(void 0, true);
					this.step(step + 1);
				}, std * 3);
				break;
			case 5:
				this.setState({
					step,
					title: `您的总和分数为 ${score.data} 分`,
					text: `两张扑克牌依次是 ${score[0]} + ${score[1]} = ${score.data} 分`,
					enabled: true
				});
				break;
			case 4:
				CardTable.show();
				this.setState({
					step,
					title: "请任意抽取两张牌",
					text: "两张扑克牌的数值之和作为下一环节的分数，其中大小王算 0 分",
					enabled: false
				});
				betCircular.setState({
					clickable: false
				});
				betCircular.reScale(void 0, false);
				break;
			case 1: case 2: case 3:
				this.setState({
					step,
					title: "请选择左旋或右旋",
					text: (step == 1 ? "点击转盘上方的图标文字进行操作" : `您已选择${step == 2 ? '左' : '右'}旋`),
					primary: "下一步",
					enabled: (step == 1 ? false : true)
				});
				betCircular.setState({
					clickable: true
				});
				break;
			case 0: default:
				const defaultState = {
					step: 0,
					title: "投注",
					text: "$input",
					primary: "开始",
					enabled: true
				}
				if (step == 0) this.setState({ ...defaultState });
				else this.state = { ...defaultState };
				break;
		}
	}
	render() {
		const props = {
			title: this.state.title,
			primary: this.state.primary,
			step: this.state.step,
			disabled: !this.state.enabled
		};
		return (
			<div className="card guide-card">
				<GuideCardBody {...props}>{this.state.text}</GuideCardBody>
			</div>
		)
	}
	static show() {
		let guide = React.root("bet-guide-card");
		ReactDOM.render(
			<GuideCard />,
			guide
		);
	}
}

class GuideCardBody extends React.Component {
	state = {
		balance: false,
		illegal: false
	}
	static defaultProps = {
		title: null,
		children: null,
		primary: null
	}
	nextStep = () => {
		var step = this.props.step,
			ok = true;
		if (step === 0) ok = this.cost();
		var ns = step + 1;
		if (step === 2) ns = 4;
		if (step === 10) return restart();
		if (ok) guideCard.step(ns);
	}
	cost = () => {
		var amount = document.getElementById("inputBet").value - 0;
		if(amount<3||!isFinite(amount)) {
			this.setState({
				illegal: true
			});
			setTimeout(() => this.setState({
				illegal: false
			}), 2000);
			return false;
		}
		if (bill.cost(amount) !== false) {
			betAmount = amount;
			return true;
		} else {
			this.setState({
				balance: true
			});
			setTimeout(() => this.setState({
				balance: false
			}), 2000);
			return false;
		}
	}
	render() {
		var element = [],
			invalid = (this.state.balance || this.state.illegal);
		if (this.props.title !== null)
			element.push(<h5 className="card-title" key="card-title">{this.props.title}</h5>);
		if (this.props.children !== null) {
			if (this.props.children === "$input") element.push(
				<div className="card-text input-group" key="card-input">
					<div className="input-group-prepend">
						<label className="input-group-text input-group-addon" htmlFor="inputBet"><i></i></label>
					</div>
					<input type="number" className={classNames({
						"form-control": true,
						"is-invalid": invalid
					})} id="inputBet" placeholder="0" />
				</div>
			);
			else element.push(<p className="card-text" key="card-text">{this.props.children}</p>);
		}
		if (this.props.primary !== null)
			element.push(<button className={classNames({
				btn: true,
				"btn-primary": !invalid,
				"btn-danger": invalid
			})} key="card-primary" onClick={this.nextStep} disabled={this.props.disabled}>
				{this.state.balance ? "余额不足" : (this.state.illegal ? "下注金额不能小于 3" : this.props.primary)}
			</button>);
		return (
			<div className="card-body">
				{element}
			</div>
		)
	}
}

function restart() {
	direct = 0;
	score = { data: 0 };
	betCircular.setState({
		highLight: null
	})
	guideCard.step(0);
}

GuideCard.show();