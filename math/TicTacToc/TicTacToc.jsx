let computer = null, player = null;
const CHESS = ['o', 'x'];

var modal = null;
class Modal extends React.Component {
	constructor() {
		super();
		this.id = "who-start-first";
		modal = this;
	}
	show = () => $('#' + this.id).modal("show");
	click = who => {
		if (who) [player, computer] = CHESS;
		else[computer, player] = CHESS;

		if (!who) computerPlay();
	}
	render() {
		var Btn = props => <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.click(props.onClick)}>{props.children}</button>;
		return (
			<div className="modal fade" id={this.id} tabIndex="-1" role="dialog" data-backdrop="static" data-keyboard="false">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">谁先下？</h5>
						</div>
						<div className="modal-footer">
							<Btn onClick={0}>计算机先手</Btn>
							<Btn onClick={1}>玩家先手</Btn>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class Step {
	static list = [];
	constructor(chess, position) {
		Object.assign(this, { chess, position });
	}
	static push(chess, position) {
		Step.list.push(new Step(chess, position));
		return Step.updateChess();
	}
	static undo(times = 1) {
		for (let i = 0; i < times; i++)
			Step.list.pop();
		return Step.updateChess();
	}
	static updateChess() {
		return chessBoard.getClass(Step.list);
	}
	static getChart() {
		var chart = repeat(9);
		for (const i of Step.list)
			chart[i.position - 1] = i.chess;
		return chart;
	}
	static reset() {
		Step.list = [];
		return Step.updateChess();
	}
}

function isWin(chart = Step.getChart()) {
	var scan = "012,345,678,036,147,258,048,246".split(',');
	scan.forEach((el, i, arr) => arr[i] = el.split(''));
	function test(sc) {
		for (const ch of CHESS)
			if (chart[sc[0]] === ch && chart[sc[1]] === ch && chart[sc[2]] === ch) return ch;
		return false;
	}
	for (const grid of scan) {
		grid.forEach((_, i, arr) => arr[i] -= 0);
		let who = test(grid);
		if (who !== false) {
			grid.forEach((_, i, arr) => arr[i] += 1);
			return { who, grid };
		}
	}
	return null;
}
function getEmptyGrid(chart = Step.getChart()) {
	var grid = [];
	for (let i = 0; i < chart.length; i++)
		if (!chart[i])
			grid.push(i + 1);
	return grid;
}
function willWin(chart = Step.getChart()) {
	var mayWin = {};
	for (const ch of CHESS)
		mayWin[ch] = [];
	const empty = getEmptyGrid(chart),
		nowWin = isWin(chart);
	if (nowWin !== null)
		mayWin[nowWin.who].push({
			match: null,
			who: nowWin.who,
			grid: nowWin.grid,
			current: true,
			win: nowWin
		});
	else
		for (const ch of CHESS)
			for (const i of empty) {
				let newChart = [...chart];
				newChart[i - 1] = ch;
				const newWin = isWin(newChart);
				if (newWin !== null) {
					let grid = [...newWin.grid];
					for (let j = 0; j < grid.length; j++)
						if (grid[j] === i) {
							grid.splice(j, 1);
							break;
						}
					mayWin[newWin.who].push({
						match: i,
						who: newWin.who,
						grid,
						current: false,
						win: newWin
					});
				}
			}
	return mayWin;
}
function isTie(chart = Step.getChart()) {
	for (const i of chart)
		if (!i)
			return false;
	return true;
}
function chessNum() {
	return Step.list.length;
}

var btnGroup = null;
class BtnGroup extends React.Component {
	constructor() {
		super();
		this.state = {
			firstStep: true
		}
		btnGroup = this;
	}
	reset = () => {
		Step.reset();
		modal.show();
	}
	render() {
		var Btn = props => <button type="button" className={"btn btn-" + props.type} disabled={props.disabled} onClick={props.onClick}><i className={"fa fa-" + props.icon}></i>{props.children}</button>;
		return (
			<div className="btn-group" role="group">
				<Btn type="warning" icon="reply" onClick={() => Step.undo(2)} disabled={this.state.firstStep}>悔棋</Btn>
				<Btn type="danger" icon="rotate-left" onClick={this.reset}>重置</Btn>
			</div>
		);
	}
}

function repeat(n) {
	return new Array(n).fill('');
}
Array.prototype.random = function () {
	var rand = Math.floor(Math.random() * this.length);
	return this[rand];
}
Array.prototype.derangedArray = function () {
	for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
	return this;
};
function computerPlay() {
	const I = computer,
		you = player,
		empty = getEmptyGrid();
	if (empty.length == 0) return false;
	function randomPut() {
		return empty.random();
	}
	function saveMyself() {
		const aboutTo = willWin(),
			blockage = (aboutTo[I].length != 0 ? aboutTo[I] : aboutTo[you]);
		if (blockage.length == 0) return false;
		return blockage.random().match;
	}
	function start(position = -1) {
		if (chessNum() !== 0) position = 0;
		function center() {
			const c = 5;
			if (empty.includes(c)) return c;
			return false;
		}
		function corner() {
			const corner = "1379".split('').derangedArray();
			for (const c of corner)
				if (empty.includes(c - 0)) return c;
			return false;
		}
		do {
			if (position === 0) return (center() ? center() : corner());
			else if (position === 1) return (corner() ? corner() : center());
			else position = (Math.random() > 0.5) - 0;
		} while (true);
	}
	function order() {
		for (const arg of arguments) {
			let result = arg();
			if (result !== false) return result;
		}
	}
	chessBoard.put(I, order(
		saveMyself,
		start,
		randomPut
	));
}

var chessBoard = null;
class ChessBoard extends React.Component {
	constructor() {
		super();
		this.state = {
			situation: "",
			grid: null
		}
		chessBoard = this;
	}
	getClass = list => {
		var className = [];
		for (const step of list)
			className.push(step.chess + '-' + step.position);
		this.setState({
			situation: className.join(' ')
		});
		btnGroup.setState({
			firstStep: list.length === 0
		});
		return list;
	}
	put = (who, position) => {
		if (who == player) if (!getEmptyGrid().includes(position)) return false;
		Step.push(who, position);
		if (who == player) setTimeout(computerPlay, 500);
		const nowWin = isWin();
		this.setState({
			grid: (nowWin ? nowWin.grid : null)
		});
		return position;
	}
	winChess = (value) => {
		const n = '';
		if (!this.state.grid) return n;
		if (this.state.grid.includes(value)) return "win";
		return n;
	}
	render() {
		var clickable = ((isWin() || isTie()) ? "avoid-click" : "");
		return (
			<table id="chessboard" className={this.state.situation}>
				<tbody className={clickable}>
					{repeat(3).map((_, i) => {
						return (<tr key={"tr-" + i}>{repeat(3).map((_, j) => {
							const value = i * 3 + (j + 1);
							return (<td key={"td-" + j} value={value} onClick={() => this.put(player, value)} className={this.winChess(value)}>
								<div className="chessgrid">
									<i className="fa fa-circle-o"></i>
									<i className="fa fa-times"></i>
								</div>
							</td>)
						})}</tr>)
					})}
				</tbody>
			</table>
		);
	}
}

ReactDOM.render(
	<>
		<ChessBoard />
		<BtnGroup />
		<Modal />
	</>,
	document.getElementById("root")
);

modal.show();