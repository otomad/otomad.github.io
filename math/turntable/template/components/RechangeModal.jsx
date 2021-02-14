import BootstrapV4Modal from "../containers/BootstrapV4Modal.react.js";

class RechangeModal extends React.Component {
	render() {
		return (
			<BootstrapV4Modal id="rechargeModal" title="充值" bodyStyle={{padding: 0}} footerForm="finish">
				<iframe id="pay-iframe" src={this.props.page} width="100%" style={{border: "none", height: "70vh"}}></iframe>
			</BootstrapV4Modal>
		);
	}
}

export default RechangeModal;