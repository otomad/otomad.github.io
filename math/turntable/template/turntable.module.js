import RoundButtonsGroup from "./components/RoundButtonsGroup.react.js";
import { FingerGuessing, StandardMoneyTab, OverlayLayer } from "./components/OrdinaryComponents.react.js";
import PreferenceSetting from "./components/PreferenceSetting.react.js";

{	//构建 react root 节点
	let container = document.getElementsByClassName("container")[0],
		body = document.body;
	let loading = document.createElement("i");
	loading.className = "loading";
	loading.innerHTML = iconlist.loading;
	body.appendChild(loading);
	let component = document.createElement("div");
	component.id = "component";
	container.appendChild(component);
	let external = document.createElement("div");
	external.id = "external";
	body.appendChild(external);
}

ReactDOM.render(React.createElement(
	"div",
	null,
	React.createElement(FingerGuessing, null),
	React.createElement(RoundButtonsGroup, null),
	React.createElement(StandardMoneyTab, null),
	React.createElement(OverlayLayer, null)
), document.getElementById("component"));
ReactDOM.render(React.createElement(
	"div",
	null,
	React.createElement(PreferenceSetting, null)
), document.getElementById("external"));
// console.log("Rendered!");
