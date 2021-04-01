import RechangeModal from "./components/RechangeModal.react.js";
import SimpleMoneyTab from "./components/SimpleMoneyTab.js";

{
	let simpleMoneyTab = document.querySelectorAll("[data-toggle='simple-money-tab']");
	if (simpleMoneyTab.length !== 0)
		simpleMoneyTab.forEach(item => {
			item.className = "simple-money-tab";
			ReactDOM.render(
				React.createElement(SimpleMoneyTab, null),
				item
			);
		});
	money.refreshMoney();
}

{
	let rechangeBtn = document.getElementById("rechange-btn");
	if (rechangeBtn !== null) {
		rechangeBtn.dataset.toggle = "modal";
		rechangeBtn.dataset.target = "#rechargeModal";
	}
	let rechangeModal = document.createElement("div");
	rechangeModal.id = "rechangeModalDiv";
	document.body.appendChild(rechangeModal);
	ReactDOM.render(
		React.createElement(RechangeModal, { page: "pay.html" }),
		document.getElementById("rechangeModalDiv")
	);
	////
	$('#rechargeModal').on('hide.bs.modal', function (e) {
		money.refreshMoney();
	});
	$('#rechargeModal').on('show.bs.modal', function (e) {
		$("#pay-iframe")[0].contentWindow.location.reload();
	});
}