/* var CSScolor = new Object;
CSScolor.blue=`<style>
	:root {
		--button-face-focus-text-color: #19a6e4;
		--button-face-focus-text-shadow-color: #85d5ff;
		--button-box-shadow-color: #a7caec;
		--button-face-box-shadow-inset-color: #9bbfe2;
		--button-top-background-color: #8be8ec;
	}
</style>`
CSScolor.orange=`<style>
	:root {
		--button-face-focus-text-color: #e45619;
		--button-face-focus-text-shadow-color: #ffae85;
		--button-box-shadow-color: #ecc9a8;
		--button-face-box-shadow-inset-color: #e2be9b;
		--button-top-background-color: #ec8e8b;
	}
</style>`
CSScolor.red=`<style>
	:root {
		--button-face-focus-text-color: #e41f19;
		--button-face-focus-text-shadow-color: #ff8d85;
		--button-box-shadow-color: #ecb7a9;
		--button-face-box-shadow-inset-color: #e2ab9b;
		--button-top-background-color: #ec8ba7;
	}
</style>`
CSScolor.magenta=`<style>
	:root {
		--button-face-focus-text-color: #e419a7;
		--button-face-focus-text-shadow-color: #ff85d7;
		--button-box-shadow-color: #eca9cc;
		--button-face-box-shadow-inset-color: #e29bc0;
		--button-top-background-color: #ec8beb;
	}
</style>`
CSScolor.purple=`<style>
	:root {
		--button-face-focus-text-color: #bc19e4;
		--button-face-focus-text-shadow-color: #eb85ff;
		--button-box-shadow-color: #eba9ec;
		--button-face-box-shadow-inset-color: #e19be2;
		--button-top-background-color: #bd8bec;
	}
</style>`
CSScolor.green=`<style>
	:root {
		--button-face-focus-text-color: #19e456;
		--button-face-focus-text-shadow-color: #85ffac;
		--button-box-shadow-color: #aaecc9;
		--button-face-box-shadow-inset-color: #9be2bc;
		--button-top-background-color: #8bec8b;
	}
</style>`
CSScolor.change=function(color){
	$("head").append(eval("CSScolor."+color));
	return color;
} */
var buttonPart = `
<div class="round-button-group">
	<button id="btn-rotating" class="round-button">
		<span class="round-button-face">
			<i></i>
		</span>
	</button>
	<button id="btn-inertia" class="round-button">
		<span class="round-button-face">
			<i></i>
		</span>
	</button>
	<button id="btn-direction" class="round-button">
		<span class="round-button-face">
			<i></i>
		</span>
	</button>
	<div class="round-button-pieces">
		<button id="btn-speed-up" class="round-button round-button-half-1">
			<span class="round-button-face round-button-half-1-face">
				<span class="rotate-text-fix">
					<b><i></i></b>
				</span>
			</span>
		</button>
		<button id="btn-speed-down" class="round-button round-button-half-2">
			<span class="round-button-face round-button-half-2-face">
				<span class="rotate-text-fix">
					<b><i></i></b>
				</span>
			</span>
		</button>
	</div>
	<button id="btn-pattern" class="round-button">
		<span class="round-button-face">
			<i></i>
		</span>
	</button>
	<div class="round-button-pieces">
		<button id="btn-check" class="round-button round-button-half-1 active">
			<span class="round-button-face round-button-half-1-face">
				<span class="rotate-text-fix">
					<b><i></i></b>
				</span>
			</span>
		</button>
		<button id="btn-cross" class="round-button round-button-half-2">
			<span class="round-button-face round-button-half-2-face">
				<span class="rotate-text-fix">
					<b><i></i></b>
				</span>
			</span>
		</button>
	</div>
	<div class="round-button-pieces">
		<button id="btn-giveup" class="round-button round-button-half-1">
			<span class="round-button-face round-button-half-1-face">
				<span class="rotate-text-fix">
					<b><i></i></b>
				</span>
			</span>
		</button>
		<button id="btn-not-giveup" class="round-button round-button-half-2">
			<span class="round-button-face round-button-half-2-face">
				<span class="rotate-text-fix">
					<b><i></i></b>
				</span>
			</span>
		</button>
	</div>
</div>`
var wrapperPart=`
<div class="wrapper">
	<div class="panel circularOut">
		<div class="circular"><ul></ul></div>
		<button class="pointer"><span></span></button>
	</div>
</div>`