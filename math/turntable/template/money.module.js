import RechangeModal from "./components/RechangeModal.react.js";
import SimpleMoneyTab from "./components/SimpleMoneyTab.react.js";

{
	let simpleMoneyTab = document.querySelectorAll("[data-toggle='simple-money-tab']");
	if(simpleMoneyTab.length!==0)
		for (let i of simpleMoneyTab) {
			i.className = "simple-money-tab";
			ReactDOM.render(
				React.createElement(SimpleMoneyTab, null),
				i
			);
		}
	money.refreshMoney();
}

{
	let rechangeBtn = document.getElementById("rechange-btn");
	if(rechangeBtn !== null) {
		rechangeBtn.setAttribute("data-toggle", "modal");
		rechangeBtn.setAttribute("data-target", "#rechargeModal");
	}
	let rechangeModal = document.createElement("div");
	rechangeModal.id = "rechangeModalDiv";
	document.body.appendChild(rechangeModal);
	ReactDOM.render(
		React.createElement(RechangeModal, {page:"pay.html"}),
		document.getElementById("rechangeModalDiv")
	);
	////
	$('#rechargeModal').on('hide.bs.modal', function (e) {
		money.refreshMoney();
	})
	$('#rechargeModal').on('show.bs.modal', function (e) {
		$("#pay-iframe")[0].contentWindow.location.reload();
	})
}