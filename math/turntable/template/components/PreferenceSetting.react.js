import BootstrapV4Modal from "../containers/BootstrapV4Modal.react.js";

class PreferenceSetting extends React.Component {
	render() {
		return React.createElement(
			BootstrapV4Modal,
			{ id: "preferenceSetting", title: "\u504F\u597D\u8BBE\u7F6E", footerForm: "OK&cancel" },
			React.createElement(
				"small",
				null,
				"\u8FD9\u4E9B\u8BBE\u7F6E\u4EC5\u4F9B\u6D4B\u8BD5\uFF0C\u8BF7\u8C28\u614E\u4F7F\u7528\uFF01\u5728\u624B\u673A\u5E73\u53F0\u4E0A\u4F7F\u7528\u53EF\u80FD\u4F1A\u9020\u6210\u753B\u9762\u906E\u6321\u65E0\u6CD5\u64CD\u4F5C\u3001\u9AD8\u6027\u80FD\u6D88\u8017\u7B49\u95EE\u9898\u3002\u672C\u8BBE\u7F6E\u4E0D\u4F1A\u4FDD\u5B58\u5230 cookie\uFF0C\u5982\u8BEF\u4F7F\u7528\u53EF\u4EE5\u901A\u8FC7\u5237\u65B0\u7F51\u9875\u81EA\u52A8\u91CD\u7F6E\u8BBE\u7F6E\u3002"
			),
			React.createElement("hr", { className: "simple" }),
			React.createElement(
				"div",
				{ className: "form-group mb-4" },
				React.createElement(
					"h5",
					{ htmlFor: "round-buttons-group-place" },
					React.createElement(
						"i",
						{ id: "place-arrow-icon" },
						iconlist.top
					),
					"\u6309\u94AE\u7EC4\u4F4D\u7F6E"
				),
				React.createElement(
					"div",
					{ className: "input-group" },
					React.createElement(
						"select",
						{ className: "custom-select form-control", id: "round-buttons-group-place", defaultValue: "right" },
						React.createElement(
							"option",
							{ value: "right" },
							"\u53F3\u4FA7\uFF08\u9ED8\u8BA4\u503C\uFF09"
						),
						React.createElement(
							"option",
							{ value: "left" },
							"\u5DE6\u4FA7"
						),
						React.createElement(
							"option",
							{ value: "top" },
							"\u9876\u90E8"
						),
						React.createElement(
							"option",
							{ value: "bottom" },
							"\u5E95\u90E8"
						)
					)
				)
			),
			React.createElement(
				"div",
				{ className: "form-group mb-4" },
				React.createElement(
					"h5",
					{ htmlFor: "theme-color" },
					React.createElement(
						"i",
						null,
						iconlist.color
					),
					"\u4E3B\u9898\u989C\u8272"
				),
				React.createElement(
					"p",
					{ className: "mb-2" },
					"\u9009\u62E9\u4E00\u4E2A\u989C\u8272\u4E3B\u9898\uFF0C\u6216\u8005\u5728\u4E0B\u9762\u7684\u8F93\u5165\u6846\u4E2D\u8F93\u5165\u4E00\u4E2A\u8272\u76F8\u503C\u4E5F\u53EF\u66F4\u6362\u989C\u8272\u3002"
				),
				React.createElement(
					"div",
					{ className: "form-row mb-1 palatte" },
					React.createElement(
						"div",
						{ className: "col-2" },
						React.createElement("button", { value: "0", className: "form-control mb-2 is-valid", style: { backgroundColor: "#e45619" } })
					),
					React.createElement(
						"div",
						{ className: "col-2" },
						React.createElement("button", { value: "105", className: "form-control mb-2", style: { backgroundColor: "#19e456" } })
					),
					React.createElement(
						"div",
						{ className: "col-2" },
						React.createElement("button", { value: "180", className: "form-control mb-2", style: { backgroundColor: "#19a6e4" } })
					),
					React.createElement(
						"div",
						{ className: "col-2" },
						React.createElement("button", { value: "225", className: "form-control mb-2", style: { backgroundColor: "#1941e4" } })
					),
					React.createElement(
						"div",
						{ className: "col-2" },
						React.createElement("button", { value: "285", className: "form-control mb-2", style: { backgroundColor: "#bc19e4" } })
					),
					React.createElement(
						"div",
						{ className: "col-2" },
						React.createElement("button", { value: "325", className: "form-control mb-2", style: { backgroundColor: "#e419a7" } })
					)
				),
				React.createElement(
					"div",
					{ className: "input-group mb-1" },
					React.createElement("input", { type: "number", className: "form-control", id: "theme-color", placeholder: "\u8BF7\u8F93\u5165\u8272\u76F8\u503C", defaultValue: "0" }),
					React.createElement(
						"div",
						{ className: "input-group-append" },
						React.createElement(
							"label",
							{ className: "input-group-text", htmlFor: "theme-color" },
							"\xB0"
						)
					)
				)
			),
			React.createElement(
				"div",
				{ className: "form-group mb-4" },
				React.createElement(
					"h5",
					{ htmlFor: "display-finger-guessing" },
					React.createElement(
						"i",
						null,
						iconlist.noHammer
					),
					"\u663E\u793A\u5DE5\u5177"
				),
				React.createElement(
					"div",
					{ className: "custom-control custom-checkbox" },
					React.createElement("input", { type: "checkbox", className: "custom-control-input", id: "display-finger-guessing", name: "display-tools", defaultChecked: true }),
					React.createElement(
						"label",
						{ className: "custom-control-label", htmlFor: "display-finger-guessing" },
						"\u663E\u793A\u731C\u62F3\u5668"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "form-group mb-4" },
				React.createElement(
					"h5",
					{ htmlFor: "verification-code-input" },
					React.createElement(
						"i",
						null,
						iconlist.mouseOrTouch
					),
					"\u5F00\u542F\u4F5C\u5F0A"
				),
				React.createElement(
					"p",
					{ className: "mb-2" },
					React.createElement(
						"b",
						null,
						"\u5FC5\u987B\u6B63\u786E\u8F93\u5165\u9A8C\u8BC1\u7801\u624D\u53EF\u4EE5\u5F00\u542F\u4F5C\u5F0A\u3002"
					)
				),
				React.createElement(
					"div",
					{ className: "form-row mb-3" },
					React.createElement(
						"div",
						{ className: "col-8" },
						React.createElement(
							"label",
							{ htmlFor: "verification-code-input" },
							"\u8BF7\u8F93\u5165\u9A8C\u8BC1\u7801"
						),
						React.createElement("input", { type: "text", className: "form-control", id: "verification-code-input", placeholder: "\u9A8C\u8BC1\u7801" })
					),
					React.createElement(
						"div",
						{ className: "col-4" },
						React.createElement(
							"label",
							{ style: { userSelect: "none" } },
							"\u3000"
						),
						React.createElement(
							"div",
							{ className: "form-control", style: { padding: 0, background: "unset", border: "none" } },
							React.createElement("img", { src: "img/cnValidateImage.png", alt: "\u9A8C\u8BC1\u7801", style: { cursor: "pointer", borderRadius: ".5rem", height: "100%" } })
						)
					)
				),
				React.createElement(
					"div",
					{ className: "form-row" },
					React.createElement(
						"div",
						{ className: "col-auto" },
						React.createElement(
							"button",
							{ id: "ensure-cross-cheat", className: "btn btn-outline-danger", disabled: true },
							"\u786E\u8BA4\u5F00\u542F\u4F5C\u5F0A\u6A21\u5F0F"
						)
					)
				)
			)
		);
	}
}

export default PreferenceSetting;