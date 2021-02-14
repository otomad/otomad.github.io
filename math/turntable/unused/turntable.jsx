/* function RoundButtonsGroup() {
	return (
	<div className="round-button-group hidden" id="rbtn-group">
		<button id="btn-rotating" className="round-button" aria-label="转动/停止" data-toggle="tooltip" data-placement="left" data-html="true" title="转动/<b>停止</b>">
			<span className="round-button-face">
				<i>{iconlist.rotating}</i>
			</span>
		</button>
		<button id="btn-inertia" className="round-button" aria-label="现实惯性" data-toggle="tooltip" data-placement="left" data-html="true" title="单击后：现实惯性<br>当前：　理想骤止">
			<span className="round-button-face">
				<i>{iconlist.inertiaOn}</i>
			</span>
		</button>
		<button id="btn-direction" className="round-button" aria-label="旋转方向" data-toggle="tooltip" data-placement="left" title="旋转方向：顺时针">
			<span className="round-button-face">
				<i>{iconlist.clockwise}</i>
			</span>
		</button>
		<div className="round-button-pieces">
			<button id="btn-speed-up" data-relative-speed="+0.2" className="round-button round-button-half-1" aria-label="加速" data-toggle="tooltip" data-placement="left" data-html="true" title="加速<br>当前速度：2 r/s">
				<span className="round-button-face round-button-half-1-face">
					<span className="rotate-text-fix">
						<b><i>{iconlist.speedUp}</i></b>
					</span>
				</span>
			</button>
			<button id="btn-speed-down" data-relative-speed="-0.2" className="round-button round-button-half-2" aria-label="减速" data-toggle="tooltip" data-placement="left" data-html="true" title="减速<br>当前速度：2 r/s">
				<span className="round-button-face round-button-half-2-face">
					<span className="rotate-text-fix">
						<b><i>{iconlist.speedDown}</i></b>
					</span>
				</span>
			</button>
		</div>
		<button id="btn-pattern" className="round-button" aria-label="旋转轴" data-toggle="tooltip" data-placement="left" data-html="true" title="旋转轴<br>当前：　指针旋转<br>单击后：转盘旋转">
			<span className="round-button-face">
				<i>{iconlist.pointerRotate}</i>
			</span>
		</button>
		<div className="round-button-pieces">
			<button id="btn-check" className="round-button round-button-half-1 active" aria-label="旋转模式" data-toggle="tooltip" data-placement="left" title="旋转模式">
				<span className="round-button-face round-button-half-1-face">
					<span className="rotate-text-fix">
						<b><i>{iconlist.check}</i></b>
					</span>
				</span>
			</button>
			<button id="btn-cross" className="round-button round-button-half-2" aria-label="点按模式" data-toggle="tooltip" data-placement="left" title="点按模式">
				<span className="round-button-face round-button-half-2-face">
					<span className="rotate-text-fix">
						<b><i>{iconlist.cross}</i></b>
					</span>
				</span>
			</button>
			<button id="btn-cross-cheat" hidden></button>
			<button id="btn-check-auto" hidden></button>
		</div>
		<div className="round-button-pieces">
			<button id="btn-giveup" className="round-button round-button-half-1" aria-label="服输" data-toggle="tooltip" data-placement="left" title="服输">
				<span className="round-button-face round-button-half-1-face">
					<span className="rotate-text-fix">
						<b><i>{iconlist.giveup}</i></b>
					</span>
				</span>
			</button>
			<button id="btn-not-giveup" className="round-button round-button-half-2" aria-label="不服输" data-toggle="tooltip" data-placement="left" title="不服输">
				<span className="round-button-face round-button-half-2-face">
					<span className="rotate-text-fix">
						<b><i>{iconlist.notGiveup}</i></b>
					</span>
				</span>
			</button>
		</div>
	</div>
	);
} */
function WrapperDial(props) {
	return (
	<div className="wrapper">
		<div className="panel circularOut start-animation">
			<div className="circular"><ul></ul></div>
			<button className="pointer" data-toggle="tooltip" data-placement="bottom" data-html="true" title={props.info+"<br>随机转动"}><span>{iconlist.random}</span></button>
		</div>
	</div>
	);
}
// rendered = true;
/* function FingerGuessing() {
	return (
	<div className="finger-guessing">
		<div className="screen">
			<span id="fist" className="fin-face active">{iconlist.fist}</span>
			<span className="sep"></span>
			<span id="scissors" className="fin-face">{iconlist.scissors}</span>
			<span className="sep"></span>
			<span id="cloth" className="fin-face">{iconlist.cloth}</span>
			<div className="fin-point-group">
				<span className="fin-pointer"></span>
				<span className="fin-pointer copy"></span>
			</div>
		</div>
		<button id="fin-start" className="round-button" data-toggle="tooltip" data-placement="right" title="开始猜拳"><i>{iconlist.rotating}</i></button>
	</div>
	);
}
function StandardMoneyTab() {
	return (
	<div className="round-button-group top-side money-tab hidden">
		<a className="top-icon top-button" href="help.html" data-toggle="tooltip" data-placement="bottom" title="帮助"><i></i></a>
		<span className="top-item"><span className="top-icon"></span><i></i> <span id="amount-num">-- 元</span></span>
		<span data-toggle="tooltip" data-placement="bottom" title="充值">
			<button className="top-icon top-button" id="rechange-btn" data-toggle="modal" data-target="#rechargeModal"><i></i></button>
		</span>
		<span data-toggle="tooltip" data-placement="bottom" title="偏好设置">
			<button className="top-icon top-button" data-toggle="modal" data-target="#preferenceSetting"><i></i></button>
		</span>
	</div>
	);
}
function OverlayLayer() {
	return (
	<div className="overlay-layer" style={{display: 'none'}}>
		<div className="overlay-text"></div>
	</div>
	);
} */
/* function PreferenceSetting() {
	return (
	<div className="modal fade" id="preferenceSetting" tabIndex="-1" role="dialog" aria-labelledby="preferenceSettingModalLabel"
	 aria-hidden="true">
		<div className="modal-dialog modal-dialog-scrollable" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title" id="preferenceSettingModalLabel">偏好设置</h5>
					<button type="button" className="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="modal-body">
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
				</div>
				<div className="modal-footer">
					<button type="button" id="pref-setting-cancel" className="btn btn-secondary" data-dismiss="modal">取消</button>
					<button type="button" id="pref-setting-ok" className="btn btn-primary">确定</button>
				</div>
			</div>
		</div>
	</div>
	);
} */
/* const wrapperDial = <WrapperDial />;
ReactDOM.render(
	(
	<div>
		<FingerGuessing />
		<RoundButtonsGroup />
		<StandardMoneyTab />
	</div>
	),
	document.getElementById("component")
);
ReactDOM.render(
	(
	<div>
		<OverlayLayer />
		<PreferenceSetting />
	</div>
	),
	document.getElementById("external")
);
console.log("Rendered!");
rendered = true; */