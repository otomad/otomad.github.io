// import $ from 'jquery';
// import '../../css/simple-money-tab.min.css'; //压根就import不进去
// 以下还是注入CSS文件的方法

class SimpleMoneyTab extends React.Component {
	render() {
		if (document.getElementById("simple-money-tab") === null) {
			/* $.get("css/simple-money-tab.css",{},function(css){ 鉴于不推荐同时使用react和jQuery，还是别这么写好了 }); */
			/* var css = new XMLHttpRequest();
			css.onreadystatechange = () => {
				if (css.readyState == 4 && css.status == 200) {
					var styleTag = document.createElement("style");
					styleTag.innerHTML = css.responseText;
					styleTag.id = "simple-money-tab";
					document.head.appendChild(styleTag);
				}
			}
			css.open("GET", "css/simple-money-tab.css", true);
			css.send(); */
			var linkTag = document.createElement("link");
			linkTag.rel = "stylesheet";
			linkTag.type = "text/css";
			linkTag.href = "css/simple-money-tab.min.css";
			linkTag.id = "simple-money-tab";
			document.head.appendChild(linkTag);
		}
		return (
			<div>
				<a href="help.html"><i style={{marginRight: 0}}></i></a>
				<i></i>
				<span id="amount-num">元</span>
				<button id="rechange-btn"><i></i></button>
			</div>
		);
	}
}

export default SimpleMoneyTab;