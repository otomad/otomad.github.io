import RoundButtonsGroup from "./components/RoundButtonsGroup.react.js";
import { FingerGuessing, StandardMoneyTab, OverlayLayer } from "./components/OrdinaryComponents.react.js";
import PreferenceSetting from "./components/PreferenceSetting.react.js";

//构建 react root 节点
let container = document.getElementsByClassName("container")[0],
	body = document.body,
	dce = tag => document.createElement(tag),
	rce = tag => React.createElement(tag, null);

let loading = dce("i");
loading.className = "loading";
loading.innerHTML = iconlist.loading;
body.appendChild(loading);

let component = dce("div");
component.id = "component";
container.appendChild(component);

let external = dce("div");
external.id = "external";
body.appendChild(external);

ReactDOM.render(React.createElement(
	"div",
	null,
	rce(FingerGuessing),
	rce(RoundButtonsGroup),
	rce(StandardMoneyTab),
	rce(OverlayLayer)
), component);

ReactDOM.render(React.createElement(
	"div",
	null,
	rce(PreferenceSetting)
), external);

// console.log("Rendered!");
