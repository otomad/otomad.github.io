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
		return React.createElement(
			"div",
			{ className: "modal fade", id: this.props.id, tabIndex: "-1", role: "dialog", "aria-labelledby": this.props.id + titleSuffix, "aria-hidden": "true" },
			React.createElement(
				"div",
				{ className: "modal-dialog modal-dialog-scrollable", role: "document" },
				React.createElement(
					"div",
					{ className: "modal-content" },
					React.createElement(
						"div",
						{ className: "modal-header" },
						React.createElement(
							"h5",
							{ className: "modal-title", id: this.props.id + titleSuffix },
							this.props.title
						),
						React.createElement(
							"button",
							{ type: "button", className: "close", "data-dismiss": "modal", "aria-label": "Close" },
							React.createElement(
								"span",
								{ "aria-hidden": "true" },
								"\xD7"
							)
						)
					),
					React.createElement(
						"div",
						{ className: "modal-body", style: this.props.bodyStyle },
						this.props.children
					),
					React.createElement(BootstrapV4ModalFooter, { form: this.props.footerForm })
				)
			)
		);
	}
}

class BootstrapV4ModalFooter extends React.Component {
	render() {
		const form = this.props.form.toLowerCase();
		if (form == "finish") {
			return React.createElement(
				"div",
				{ className: "modal-footer" },
				React.createElement(
					"button",
					{ type: "button", className: "btn btn-secondary", "data-dismiss": "modal" },
					"\u5B8C\u6210"
				)
			);
		} else if (form == "ok&cancel") {
			return React.createElement(
				"div",
				{ className: "modal-footer" },
				React.createElement(
					"button",
					{ type: "button", id: "pref-setting-cancel", className: "btn btn-secondary", "data-dismiss": "modal" },
					"\u53D6\u6D88"
				),
				React.createElement(
					"button",
					{ type: "button", id: "pref-setting-ok", className: "btn btn-primary" },
					"\u786E\u5B9A"
				)
			);
		}
	}
}

export default BootstrapV4Modal;
