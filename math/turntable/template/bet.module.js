import "./components/BetGuideCard.js"
import "./components/BetCircular.js"
import "./components/PokerCard.js"

let smt = document.createElement("div");
smt.dataset.toggle = "simple-money-tab";
document.body.append(smt);

window.NightTime = {
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

document.Import("/basis/NightTime.js");