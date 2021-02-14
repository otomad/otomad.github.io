import BootstrapV4Modal from "../containers/BootstrapV4Modal.react.js";

class RechangeModal extends React.Component {
	render() {
		return React.createElement(
			BootstrapV4Modal,
			{ id: "rechargeModal", title: "\u5145\u503C", bodyStyle: { padding: 0 }, footerForm: "finish" },
			React.createElement("iframe", { id: "pay-iframe", src: this.props.page, width: "100%", style: { border: "none", height: "70vh" } })
		);
	}
}

export default RechangeModal;