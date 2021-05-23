"use strict";
class DvdLogo {
	constructor(id) {
		this.embed = document.getElementById(id);
		this.svg = this.embed.getSVGDocument().firstElementChild;
		this.size = { width: 384, height: 180 };
		Object.assign(this.embed, this.size);
		this.count = 0;
		this.setColor(this.count);
		const zeroPx = "0px";
		this.embed.style.left = zeroPx;
		this.embed.style.top = zeroPx;
		this.position();
		this.direct = { x: 1, y: 1 };
		this.speed = 0.1;
		this.move();
		this.side = {
			none: -1,
			top: 0,
			right: 1,
			bottom: 2,
			left: 3
		};
		this.outOfScreen = false;
	}
	position(x, y) {
		const style = this.embed.style;
		if (x === undefined) x = parseInt(style.left, 10);
		if (y === undefined) y = parseInt(style.top, 10);
		style.left = x + "px";
		style.top = y + "px";
		this.pos = { x, y };
		return this.pos;
	}
	move() {
		setInterval(() => {
			if (document.visibilityState == "hidden") return;
			this.pos.x += this.direct.x;
			this.pos.y += this.direct.y;
			this.position(this.pos.x, this.pos.y);
			const side = this.isAttachSide();
			if (side !== this.side.none) {
				if (side === this.side.top) this.direct.y = 1;
				else if (side === this.side.right) this.direct.x = -1;
				else if (side === this.side.bottom) this.direct.y = -1;
				else if (side === this.side.left) this.direct.x = 1;
				if (!this.outOfScreen) this.setColor(++this.count);
				this.outOfScreen = true;
			} else this.outOfScreen = false;
		}, this.speed);
	}
	isAttachSide() {
		if (this.pos.x <= 0) return this.side.left;
		else if (this.pos.y <= 0) return this.side.top;
		else if (this.pos.x + this.size.width >= window.innerWidth) return this.side.right;
		else if (this.pos.y + this.size.height >= window.innerHeight) return this.side.bottom;
		else return this.side.none;
	}
	setColor(num) {
		const colorList = [
			"#be00ff",
			"#00feff",
			"#ff8300",
			"#0026ff",
			"#fffa01",
			"#ff2600",
			"#ff008b",
			"#25ff01"
		];
		num %= colorList.length;
		this.svg.setAttribute("fill", colorList[num]);
		this.count = num;
	}
}
onload = () => {
	window.dvdLogo = new DvdLogo("dvdlogo");
}