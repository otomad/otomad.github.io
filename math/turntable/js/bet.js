var NightTime = {
	darkBackgroundColor: "#222",
	lightBackgroundColor: "#eee",
	nightDo: () => {
		NightTime.appendStyle({
			":root": {
				"--guide-card-background-color": "#303030aa"
			}
		}, "bet-root");
	},
	lightDo: () => {
		NightTime.appendStyle({
			":root": {
				"--guide-card-background-color": "#fffa"
			}
		}, "bet-root");
	}
}
{
	let smt = document.createElement("div");
	smt.dataset.toggle = "simple-money-tab";
	document.body.append(smt);
}
Math.randBetween = (min, max) => {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}
React.root = (id) => {
	var el = document.getElementById(id);
	if (el === null) {
		el = document.createElement("div");
		el.id = id;
		document.body.append(el);
	}
	return el;
}
// BetCircular
var direct = 0, //-1 表示左旋，1 表示右旋
	finalScore = 0;
// BetGuideCard
var betAmount = 0,
	circularCount = "";
// PokerCard
var score = { data: 0 };