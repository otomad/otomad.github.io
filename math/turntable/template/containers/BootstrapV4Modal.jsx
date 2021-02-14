class BootstrapV4Modal extends React.Component {
	constructor(props) {
		super(props);
		this.expectPropsList = BootstrapV4Modal.propsList();
	}
	static propsList() {
		return "id,title,bodyStyle,footerForm".split(',');
	}
	render() {
		const titleSuffix = "-ModalLabel";
		return (
			<div className="modal fade" id={this.props.id} tabIndex="-1" role="dialog" aria-labelledby={this.props.id+titleSuffix} aria-hidden="true">
				<div className="modal-dialog modal-dialog-scrollable" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id={this.props.id+titleSuffix}>{this.props.title}</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body" style={this.props.bodyStyle}>
							{this.props.children}
						</div>
						<BootstrapV4ModalFooter form={this.props.footerForm} />
					</div>
				</div>
			</div>
		);
	}
}

class BootstrapV4ModalFooter extends React.Component {
	render() {
		const form = this.props.form.toLowerCase();
		if (form == "finish") {
			return (
				<div className="modal-footer">
					<button type="button" className="btn btn-secondary" data-dismiss="modal">完成</button>
				</div>
			);
		} else if (form == "ok&cancel") {
			return (
				<div className="modal-footer">
					<button type="button" id="pref-setting-cancel" className="btn btn-secondary" data-dismiss="modal">取消</button>
					<button type="button" id="pref-setting-ok" className="btn btn-primary">确定</button>
				</div>
			);
		}
	}
}

export default BootstrapV4Modal;