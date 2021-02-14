import BootstrapV4Modal from "../containers/BootstrapV4Modal.react.js";

class PreferenceSetting extends React.Component {
	render() {
		return (
			<BootstrapV4Modal id="preferenceSetting" title="偏好设置" footerForm="OK&cancel">
				<small>这些设置仅供测试，请谨慎使用！在手机平台上使用可能会造成画面遮挡无法操作、高性能消耗等问题。本设置不会保存到 cookie，如误使用可以通过刷新网页自动重置设置。</small>
				<hr className="simple" />
				<div className="form-group mb-4">
					<h5 htmlFor="round-buttons-group-place"><i id="place-arrow-icon">{iconlist.top}</i>按钮组位置</h5>
					<div className="input-group">
						<select className="custom-select form-control" id="round-buttons-group-place" defaultValue="right">
							<option value="right">右侧（默认值）</option>
							<option value="left">左侧</option>
							<option value="top">顶部</option>
							<option value="bottom">底部</option>
						</select>
					</div>
				</div>
				<div className="form-group mb-4">
					<h5 htmlFor="theme-color"><i>{iconlist.color}</i>主题颜色</h5>
					<p className="mb-2">
						选择一个颜色主题，或者在下面的输入框中输入一个色相值也可更换颜色。
					</p>
					<div className="form-row mb-1 palatte">
						<div className="col-2">
							<button value="0" className="form-control mb-2 is-valid" style={{backgroundColor: "#e45619"}}></button>
						</div>
						<div className="col-2">
							<button value="105" className="form-control mb-2" style={{backgroundColor: "#19e456"}}></button>
						</div>
						<div className="col-2">
							<button value="180" className="form-control mb-2" style={{backgroundColor: "#19a6e4"}}></button>
						</div>
						<div className="col-2">
							<button value="225" className="form-control mb-2" style={{backgroundColor: "#1941e4"}}></button>
						</div>
						<div className="col-2">
							<button value="285" className="form-control mb-2" style={{backgroundColor: "#bc19e4"}}></button>
						</div>
						<div className="col-2">
							<button value="325" className="form-control mb-2" style={{backgroundColor: "#e419a7"}}></button>
						</div>
					</div>
					<div className="input-group mb-1">
						<input type="number" className="form-control" id="theme-color" placeholder="请输入色相值" defaultValue="0" />
						<div className="input-group-append">
							<label className="input-group-text" htmlFor="theme-color">°</label>
						</div>
					</div>
				</div>
				<div className="form-group mb-4">
					<h5 htmlFor="display-finger-guessing"><i>{iconlist.noHammer}</i>显示工具</h5>
					<div className="custom-control custom-checkbox">
						<input type="checkbox" className="custom-control-input" id="display-finger-guessing" name="display-tools" defaultChecked />
						<label className="custom-control-label" htmlFor="display-finger-guessing">显示猜拳器</label>
					</div>
				</div>
				<div className="form-group mb-4">
					<h5 htmlFor="verification-code-input"><i>{iconlist.mouseOrTouch}</i>开启作弊</h5>
					<p className="mb-2">
						<b>必须正确输入验证码才可以开启作弊。</b>
					</p>
					<div className="form-row mb-3">
						<div className="col-8">
							<label htmlFor="verification-code-input">请输入验证码</label>
							<input type="text" className="form-control" id="verification-code-input" placeholder="验证码" />
						</div>
						<div className="col-4">
							<label style={{userSelect:"none"}}>　</label>
							<div className="form-control" style={{padding:0,background:"unset",border:"none"}}>
								<img src="img/cnValidateImage.png" alt="验证码" style={{cursor:"pointer",borderRadius:".5rem",height:"100%"}} />
							</div>
						</div>
					</div>
					<div className="form-row">
						<div className="col-auto">
							<button id="ensure-cross-cheat" className="btn btn-outline-danger" disabled>确认开启作弊模式</button>
						</div>
					</div>
				</div>
			</BootstrapV4Modal>
		);
	}
}

export default PreferenceSetting;