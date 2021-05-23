'use strict';

Object.createSameValue = (value, ..._keys) => {
	var obj = {}, keys;
	if (Array.isArray(_keys[0])) keys = _keys[0];
	else keys = _keys;
	for (const key of keys)
		obj[key] = value;
	return obj;
}
var defaultChannel = Object.createSameValue(true, 'RGBHSLA'.split(''));
class Chobi {
	constructor(elem) {
		this.debug = true;
		this.onload = null;
		this.canvas = null;
		if (elem.tagName == "CANVAS") {
			var img = new Image();
			img.width = elem.width;
			img.height = elem.height;
			this.image = img;
			this.imageData = this.getImageData(elem, elem.width, elem.height);
		} else if (elem instanceof (Image)) {
			this.image = elem;
			this.imageData = this.extractImageData();
			this.debugger('Type matched. instanceof(Image). Saved as [Chobi object]');
			try {
				this.onload();
			} catch (e) {
				this.debugger(e + '\nready callback not found');
			}
		} else if (typeof (elem) == 'string') {
			var context = this;
			this.debugger('Not instanceof(Image). Trying as URL');
			var img = new Image();
			img.crossOrigin = "Anonymous";
			img.src = elem;
			img.onload = function () {
				context.image = img;
				context.imageData = context.extractImageData();
				context.debugger('Type matched. URL. Saved as [Chobi object]');
				try {
					context.onload();
				} catch (e) {
					context.debugger(e + '\nready callback not found');
				}
				return;
			};
		} else {
			this.debugger('Not instanceof(Image). Trying as URL');
			this.debugger('Not URL. Trying as input[file]');
			var context = this;
			try {
				var file = elem.files[0];
				var fr = new FileReader();
				fr.onload = function () {
					var img = new Image();
					img.onload = function () {
						context.image = img;
						context.imageData = context.extractImageData();
						context.debugger('Type matched. input[file]. Saved as [Chobi object]');
						try {
							context.onload();
						} catch (e) {
							context.debugger(e + '\nready callback not found');
						}
						return;
					};
					img.src = fr.result;
				};
				fr.readAsDataURL(file);
			} catch (e) {
				context.debugger(e + "\nNot input[file]. Trying as <canvas>");
			}
			try {
				var img = new Image();
				var imgData = elem.toDataURL();
				img.src = imgData;
				this.debugger(imgData);
				img.onload = function () {
					context.image = img;
					context.imageData = context.extractImageData();
					context.debugger('Type matched. <canvas>. Saved as [Chobi object]');
					try {
						context.onload();
					} catch (e) {
						context.debugger(e + '\nready callback not found');
					}
					return;
				};
			} catch (e) {
				context.debugger(e + '\nNot <canvas>. Trying as <img>');
			}
			try {
				var img = new Image();
				img.src = elem.src;
				img.onload = function () {
					context.image = img;
					context.imageData = context.extractImageData();
					context.debugger('Type matched. <img>. Saved as [Chobi object]');
					try {
						context.onload();
					} catch (e) {
						context.debugger(e + '\nready callback not found');
					}
					return;
				};
			} catch (e) {
				context.debugger(e + '\nNot <img>. No other type is supported');
			}
		}
	}
	debugger(msg) {
		if (this.debug) {
			console.log(msg);
		}
	}
	ready(onLoadFunc) {
		this.onload = onLoadFunc;
	}
	extractImageData() {
		var img = this.image;
		var drawArea = document.createElement('canvas');
		var ctx = drawArea.getContext("2d");
		drawArea.width = img.width;
		drawArea.height = img.height;
		ctx.drawImage(img, 0, 0, img.width, img.height);
		this.imageData = ctx.getImageData(0, 0, img.width, img.height);
		return this.imageData;
	}
	getImageData(canvas, width, height) {
		return canvas.getContext("2d").getImageData(0, 0, width, height);
	}
	thumbImageData(canvas, width, height) {
		var img = this.image;
		var drawArea = canvas;
		var ctx = drawArea.getContext("2d");
		drawArea.width = width;
		drawArea.height = height;
		var swidth = img.width,
			sheight = height / width * img.width;
		if (sheight > img.height) {
			sheight = img.height;
			swidth = width / height * img.height;
		}
		var sx = (img.width - swidth) / 2,
			sy = (img.height - sheight) / 2;
		ctx.drawImage(img, sx, sy, swidth, sheight, 0, 0, width, height);
		return this;
	}
	copyImageData(a, b) {
		var context = a.getContext("2d"),
			context1 = b.getContext("2d"),
			imageData = context.getImageData(0, 0, a.width, a.height);
		context1.putImageData(imageData, 0, 0, 0, 0, b.width, b.height);
		return this;
	}
	changeImageData(a) {
		this.imageData = a.getContext("2d").getImageData(0, 0, a.width, a.height);
		return this;
	}
	rewriteImageData(source) {
		// var len = Math.max(this.imageData.data.length, source.length);
		var len = source.length;
		for (let i = 0; i < len; i++)
			this.imageData.data[i] = source[i];
		return this;
	}
	/**
	 * 取色
	 * @param {number} x - 给定图像像素的 X 坐标。
	 * @param {number} y - 给定图像像素的 Y 坐标。
	 * @returns {object} 返回包含所取像素颜色数据的对象。
	 */
	getColorAt(x, y) {
		var index = (y * 4) * this.imageData.width + (x * 4);
		var colorData = {
			red: this.imageData.data[index],
			green: this.imageData.data[index + 1],
			blue: this.imageData.data[index + 2],
			alpha: this.imageData.data[index + 3]
		};
		return colorData;
	}
	/**
	 * 设色
	 * @param {number} x - 给定图像像素的 X 坐标。
	 * @param {number} y - 给定图像像素的 Y 坐标。
	 * @param {object} obj - 给定包含像素颜色数据的对象。红、绿、蓝、不透明度的四个参数分别应为 {@code red}, {@code green}, {@code blue}, {@code alpha}。
	 * @returns {bool} 返回 true 或错误信息。
	 */
	setColorAt(x, y, obj) {
		var index = (y * 4) * this.imageData.width + (x * 4);
		try {
			this.imageData.data[index] = obj.red;
			this.imageData.data[index + 1] = obj.green;
			this.imageData.data[index + 2] = obj.blue;
			this.imageData.data[index + 3] = obj.alpha;
			return true;
		} catch (e) {
			this.debugger(e);
			return e;
		}
	}
	filter(filter, amount, channel = defaultChannel) {
		return this[filter](amount, channel);
	}
	blackAndWhite(amount = 255, channel = defaultChannel) {
		var amountAbs = Math.abs(amount);
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var red = imageData.data[index];
				var green = imageData.data[index + 1];
				var blue = imageData.data[index + 2];
				var avg = (red + green + blue) / 3;
				if (amount < 0)
					avg = 255 - avg;
				if (channel.R)
					imageData.data[index] = avg * amountAbs / 255 + red * (255 - amountAbs) / 255;
				if (channel.G)
					imageData.data[index + 1] = avg * amountAbs / 255 + green * (255 - amountAbs) / 255;
				if (channel.B)
					imageData.data[index + 2] = avg * amountAbs / 255 + blue * (255 - amountAbs) / 255;
			}
		}
		return this;
	}
	blackAndWhite2(amount = 255, channel = defaultChannel) {
		var amountAbs = Math.abs(amount);
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var red = imageData.data[index];
				var green = imageData.data[index + 1];
				var blue = imageData.data[index + 2];
				var avg = ((red * 0.3) + (green * 0.59) + (blue * 0.11));
				if (amount < 0)
					avg = 255 - avg;
				if (channel.R)
					imageData.data[index] = avg * amountAbs / 255 + red * (255 - amountAbs) / 255;
				if (channel.G)
					imageData.data[index + 1] = avg * amountAbs / 255 + green * (255 - amountAbs) / 255;
				if (channel.B)
					imageData.data[index + 2] = avg * amountAbs / 255 + blue * (255 - amountAbs) / 255;
			}
		}
		return this;
	}
	blackAndWhite3(amount = 255, channel = defaultChannel) {
		var amountAbs = Math.abs(amount);
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var red = imageData.data[index];
				var green = imageData.data[index + 1];
				var blue = imageData.data[index + 2];
				var avg = RGB2HSL(red, green, blue).L * 255;
				if (amount < 0)
					avg = 255 - avg;
				if (channel.R)
					imageData.data[index] = avg * amountAbs / 255 + red * (255 - amountAbs) / 255;
				if (channel.G)
					imageData.data[index + 1] = avg * amountAbs / 255 + green * (255 - amountAbs) / 255;
				if (channel.B)
					imageData.data[index + 2] = avg * amountAbs / 255 + blue * (255 - amountAbs) / 255;
			}
		}
		return this;
	}
	blackAndWhite4(amount = -85, channel = defaultChannel) {
		var channelTrueNum = 0, theOnlyTrueChannel;
		for (const ch in channel) {
			if (ch == 'A') continue;
			if (channel[ch]) {
				channelTrueNum++;
				theOnlyTrueChannel = ch;
			}
		}
		const ch = c => theOnlyTrueChannel == c;
		amount = this.map(amount, -255, 255, 0, 3);
		var value = amount % 1;
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				function setColor(color) {
					if (color === undefined) return false;
					imageData.data[index] = color;
					imageData.data[index + 1] = color;
					imageData.data[index + 2] = color;
					return true;
				}
				if (channelTrueNum === 1)
					if (setColor(imageData.data[index + (
						ch('R') ? 0 :
							ch('G') ? 1 :
								ch('B') ? 2 : NaN
					)]));
					else {
						let hsl = RGB2HSL.apply(null, imageData.data.slice(index, index + 3));
						setColor(
							ch('H') ? this.map(hsl.H, 0, 360, 0, 255) :
								ch('S') ? this.map(hsl.S, 0, 1, 0, 255) :
									ch('L') ? this.map(hsl.L, 0, 1, 0, 255) : void 0
						);
					}
				else {
					/* let c = 0;
					for (let i = 0; i < 3; i++)
						c += restrict(l2h(amount, i), 0, 255) / 255 * imageData.data[index + i];
					setColor(c); */
					const color = imageData.data.slice(index, index + 3);
					for (let i = 0; i < 3; i++)
						if (amount < i + 1 || amount == 3) {
							setColor(color[i] * (1 - value) + color[(i + 1) % 3] * value)
							break;
						}
				}
			}
		}
		return this;
	}
	sepia(amount = 255, channel = defaultChannel) {
		if (amount < 0)
			this.negative(-amount - 255, channel); //this.negative(amount+255); 有奇效
		amount = Math.abs(amount);
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4),
					red = imageData.data[index],
					green = imageData.data[index + 1],
					blue = imageData.data[index + 2],
					nred = (red * 0.393) + (green * 0.769) + (blue * 0.189),
					ngreen = (red * 0.349) + (green * 0.686) + (blue * 0.168),
					nblue = (red * 0.272) + (green * 0.534) + (blue * 0.131);
				if (channel.R)
					imageData.data[index] = nred * amount / 255 + red * (255 - amount) / 255;
				if (channel.G)
					imageData.data[index + 1] = ngreen * amount / 255 + green * (255 - amount) / 255;
				if (channel.B)
					imageData.data[index + 2] = nblue * amount / 255 + blue * (255 - amount) / 255;
			}
		}
		return this;
	}
	negative(amount = 0, channel = defaultChannel) {
		amount = Math.abs(amount);
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4),
					red = imageData.data[index],
					green = imageData.data[index + 1],
					blue = imageData.data[index + 2],
					alpha = imageData.data[index + 3],
					nred = 255 - red,
					ngreen = 255 - green,
					nblue = 255 - blue;
				if (channel.R)
					imageData.data[index] = red * amount / 255 + nred * (255 - amount) / 255;
				if (channel.G)
					imageData.data[index + 1] = green * amount / 255 + ngreen * (255 - amount) / 255;
				if (channel.B)
					imageData.data[index + 2] = blue * amount / 255 + nblue * (255 - amount) / 255;
			}
		}
		return this;
	}
	/**
	 * 生成给定两个数之间随机的数。
	 * @param {number} min - 最小值。
	 * @param {number} max - 最大值。
	 * @returns {number} 随机数。
	 */
	random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	noise(amount = 0, channel = defaultChannel) {
		amount = Math.abs(amount);
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var rindex = (i * 4) * imageData.width + (j * 4);
				var randRed = this.random(100, 200);
				var randGreen = this.random(100, 200);
				var randBlue = this.random(100, 200);
				var red = (imageData.data[index] + randRed) / 2;
				var green = (imageData.data[index + 1] + randGreen) / 2;
				var blue = (imageData.data[index + 2] + randBlue) / 2;
				if (channel.R)
					imageData.data[index] = randRed * amount / 255 + red * (255 - amount) / 255;
				if (channel.G)
					imageData.data[index + 1] = randGreen * amount / 255 + green * (255 - amount) / 255;
				if (channel.B)
					imageData.data[index + 2] = randBlue * amount / 255 + blue * (255 - amount) / 255;
			}
		}
		return this;
	}
	contrast_legacy(amount, channel) {
		return this.contrast(amount / 100 * 255, channel);
	}
	contrast(amount = 100, channel = defaultChannel) {
		var value = (255.0 + amount) / 255.0;
		value *= value;
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var r = imageData.data[index];
				var g = imageData.data[index + 1];
				var b = imageData.data[index + 2];
				var red = r / 255.0;
				var green = g / 255.0;
				var blue = b / 255.0;
				red = (((red - 0.5) * value) + 0.5) * 255.0;
				green = (((green - 0.5) * value) + 0.5) * 255.0;
				blue = (((blue - 0.5) * value) + 0.5) * 255.0;
				if (red > 255)
					red = 255;
				if (red < 0)
					red = 0;
				if (green > 255)
					green = 255;
				if (green < 0)
					green = 0;
				if (blue > 255)
					blue = 255;
				if (blue < 0)
					blue = 0;
				if (channel.R)
					imageData.data[index] = red;
				if (channel.G)
					imageData.data[index + 1] = green;
				if (channel.B)
					imageData.data[index + 2] = blue;
			}
		}
		return this;
	}
	crossProcess(amount = 0, channel = defaultChannel) {
		var percent = 1 + amount / 255;
		return this.vintage(amount, channel).brightness_legacy(10 * percent, channel).contrast(50 * percent, channel);
	}
	/**
	 * 即将一个数值从一个标度单位转移到另一个标度单位，新旧单位成线性关系，且不一定成正比关系，比如说摄氏度和华氏度的关系，返回对应的新值。
	 * 比如说，将一个取值范围为 0 ~ 255 的颜色值转到 0 ~ 100 的值。
	 * <h1>不准温度计</h1>
	 * @param {number} x - 待转换的原标度数值。
	 * @param {number} min - 原标度值（小）。
	 * @param {number} max - 原标度值（大）。
	 * @param {number} a - 新标度值（小）。
	 * @param {number} b - 新标度值（大）。
	 * @returns {number} 转换后的新标度数值。
	 */
	map(x, min, max, a, b) {
		return ((b - a) * (x - min) / (max - min)) + a;
	}
	brightness_legacy(amount, channel) {
		return this.brightness(amount / 100 * 255, channel);
	}
	brightness(amount = 100, channel = defaultChannel) {
		var imageData = this.imageData;
		// amount = this.map(amount, -255, 255, -255, 255);
		this.debugger(amount);
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var red = imageData.data[index];
				var green = imageData.data[index + 1];
				var blue = imageData.data[index + 2];
				red = red + amount;
				green = green + amount;
				blue = blue + amount;
				if (red > 255)
					red = 255;
				if (red < 0)
					red = 0;
				if (green > 255)
					green = 255;
				if (green < 0)
					green = 0;
				if (blue > 255)
					blue = 255;
				if (blue < 0)
					blue = 0;
				if (channel.R)
					imageData.data[index] = red;
				if (channel.G)
					imageData.data[index + 1] = green;
				if (channel.B)
					imageData.data[index + 2] = blue;
			}
		}
		return this;
	}
	vintage(amount = 0, channel = defaultChannel) {
		var neg = (amount < 0);
		amount = Math.abs(amount);
		amount = this.map(amount, 0, 255, 150, 255);
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var red = imageData.data[index];
				var green = imageData.data[index + 1];
				var blue = imageData.data[index + 2];
				if (!neg) {
					red = green;
					green = red;
					blue = amount;
				} else {
					red = amount;
					green = blue;
					blue = green;
				}
				if (channel.R)
					imageData.data[index] = red;
				if (channel.G)
					imageData.data[index + 1] = green;
				if (channel.B)
					imageData.data[index + 2] = blue;
			}
		}
		this.contrast(50, channel);
		return this;
	}
	crayon(amount = 0, channel = defaultChannel) {
		return this.noise(amount, channel).contrast(500, channel);
	}
	cartoon(amount, channel = defaultChannel) {
		return this.contrast(400, channel);
	}
	india(amount = 255, channel = defaultChannel) {
		amount = Math.abs(amount);
		var height = this.imageData.height;
		//orange
		for (var i = 0; i < this.imageData.width; i++) {
			for (var j = 0; j < (height / 3); j++) {
				var pixel = this.getColorAt(i, j);
				if (channel.R)
					pixel.red = (amount + pixel.red) / 2;
				if (channel.G)
					pixel.green = (amount / 255 * 165 + pixel.green) / 2;
				if (channel.B)
					pixel.blue /= 2;
				this.setColorAt(i, j, pixel);
			}
		}
		//white
		for (var i = 0; i < this.imageData.width; i++) {
			for (var j = Math.floor(height / 3); j < Math.floor(2 * (height / 3)); j++) {
				var pixel = this.getColorAt(i, j);
				if (channel.R)
					pixel.red = (amount + pixel.red) / 2;
				if (channel.G)
					pixel.green = (amount + pixel.green) / 2;
				if (channel.B)
					pixel.blue = (amount + pixel.blue) / 2;
				this.setColorAt(i, j, pixel);
			}
		}
		//green
		for (var i = 0; i < this.imageData.width; i++) {
			for (var j = Math.floor(2 * (height / 3)); j < Math.floor(height); j++) {
				var pixel = this.getColorAt(i, j);
				if (channel.R)
					pixel.red = (0 + pixel.red) / 2;
				if (channel.G)
					pixel.green = (amount + pixel.green) / 2;
				if (channel.B)
					pixel.blue = (0 + pixel.blue) / 2;
				this.setColorAt(i, j, pixel);
			}
		}
		return this;
	}
	aberration(amount = 0, channel = defaultChannel) {
		amount = Math.abs(amount);
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var rgb = [imageData.data[index], imageData.data[index + 1], imageData.data[index + 2]];
				// var hsl=RGB2HSL(red,green,blue);
				// var newrgb=HSL2RGB((hsl.H+180)%360,hsl.S,hsl.L)
				if (rgb[0] == rgb[1] && rgb[1] == rgb[2])
					continue;
				var max = Math.max(rgb[0], rgb[1], rgb[2]),
					min = Math.min(rgb[0], rgb[1], rgb[2]),
					maxI = rgb.indexOf(max),
					minI = rgb.indexOf(min),
					midI = 3 - maxI - minI,
					newrgb = [];
				newrgb[maxI] = min;
				newrgb[minI] = max;
				newrgb[midI] = max + min - rgb[midI];
				if (channel.R)
					imageData.data[index] = rgb[0] * amount / 255 + newrgb[0] * (255 - amount) / 255;
				if (channel.G)
					imageData.data[index + 1] = rgb[1] * amount / 255 + newrgb[1] * (255 - amount) / 255;
				if (channel.B)
					imageData.data[index + 2] = rgb[2] * amount / 255 + newrgb[2] * (255 - amount) / 255;
			}
		}
		return this;
	}
	relief(amount = 0, channel = defaultChannel) {
		if (amount < 0) {
			this.negative(0, channel);
			amount = -amount;
		}
		amount++;
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4),
					indexLeft = (j * 4) * imageData.width + ((i - 1) * 4),
					indexRight = (j * 4) * imageData.width + ((i + amount) * 4),
					indexAbove = ((j - 1) * 4) * imageData.width + (i * 4),
					indexBelow = ((j + amount) * 4) * imageData.width + (i * 4);
				if (j > imageData.height - amount - 1) {
					[imageData.data[index], imageData.data[index + 1], imageData.data[index + 2], imageData.data[index + 3]] = [imageData.data[indexAbove], imageData.data[indexAbove + 1], imageData.data[indexAbove + 2], imageData.data[indexAbove + 3]];
					continue;
				}
				if (i > imageData.width - amount - 1) {
					[imageData.data[index], imageData.data[index + 1], imageData.data[index + 2], imageData.data[index + 3]] = [imageData.data[indexLeft], imageData.data[indexLeft + 1], imageData.data[indexLeft + 2], imageData.data[indexLeft + 3]];
					continue;
				}
				const ch = "RGBA";
				for (let k = 0; k < 3; k++)
					if (channel[ch[k]])
						imageData.data[index + k] = 255 / 2
							+ 2 * imageData.data[index + k]
							- imageData.data[indexRight + k]
							- imageData.data[indexBelow + k];
			}
		}
		return this;
		/* var width = imageData.width;//设备像素
		var length = data.length;
	    
		for(var i=0;i<length;i++){//遍历每个像素
			//不让超过最后一行
			if(i<length-width*4*amount){ //不包含最后一行
				//不包含透明度的值
				if((i+1)%4 !==0){
					//在每行最后一个像素取左边的邻近像素
					if(width-Math.floor((i+4)/4)%width < amount){//代表每行最后一个像素
					// if((i+4)%(width*4) == 0){//代表每行最后一个像素
						//给最右边像素重新定rgba
						data[i] = data[i-4];
						data[i+1] = data[i-3];
						data[i+2] = data[i-2];
						data[i+3] = data[i-1];
						// i+=4; //直接跳到下一个像素
					}else{ //最终符合条件的，不是最后一行，也不在每行最后一个的像素，且除去了像素集合中为透明度的值
						data[i] = 255/2
								  + 2*data[i] //现有像素
								  - data[i+4*amount] //下一个像素
								  - data[i+width*4*amount]; //下一行同一位置像素
					}
				}
			}else{ //最后一行，取上一行的像素
				if((i+1)%4 !== 0){
					data[i] = data[i-width+4];
				}
			}
		}
		return this; */
	}
	midBright(amount = 0, channel = defaultChannel) {
		var light = this.map(amount, -255, 255, 0, 1);
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var red = imageData.data[index];
				var green = imageData.data[index + 1];
				var blue = imageData.data[index + 2];
				var alpha = imageData.data[index + 3];
				var hsl = RGB2HSL(red, green, blue);
				var newrgb = HSL2RGB(hsl.H, hsl.S, light);
				red = newrgb.R;
				green = newrgb.G;
				blue = newrgb.B;
				if (channel.R)
					imageData.data[index] = red;
				if (channel.G)
					imageData.data[index + 1] = green;
				if (channel.B)
					imageData.data[index + 2] = blue;
			}
		}
		return this;
	}
	maxSaturate(amount = 255, channel = defaultChannel) {
		var saturate = this.map(amount, -255, 255, 0, 1);
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var red = imageData.data[index];
				var green = imageData.data[index + 1];
				var blue = imageData.data[index + 2];
				var alpha = imageData.data[index + 3];
				var hsl = RGB2HSL(red, green, blue);
				var newrgb = HSL2RGB(hsl.H, saturate, hsl.L);
				red = newrgb.R;
				green = newrgb.G;
				blue = newrgb.B;
				if (channel.R)
					imageData.data[index] = red;
				if (channel.G)
					imageData.data[index + 1] = green;
				if (channel.B)
					imageData.data[index + 2] = blue;
			}
		}
		return this;
	}
	saturation(amount = 100, channel = defaultChannel) {
		var imageData = this.imageData;
		amount = this.map(amount, -255, 255, 0, 2);
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var red = imageData.data[index];
				var green = imageData.data[index + 1];
				var blue = imageData.data[index + 2];
				var alpha = imageData.data[index + 3];
				var hsl = RGB2HSL(red, green, blue);
				var s = hsl.S;
				if (amount <= 1)
					s *= amount;

				// else s=1-s*(2-amount);
				else
					s *= (amount - 1) * 5 + 1;
				var newrgb = HSL2RGB(hsl.H, s, hsl.L);
				red = newrgb.R;
				green = newrgb.G;
				blue = newrgb.B;
				if (channel.R)
					imageData.data[index] = red;
				if (channel.G)
					imageData.data[index + 1] = green;
				if (channel.B)
					imageData.data[index + 2] = blue;
			}
		}
		return this;
	}
	invertSaturate(amount, channel = defaultChannel) {
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var red = imageData.data[index];
				var green = imageData.data[index + 1];
				var blue = imageData.data[index + 2];
				var alpha = imageData.data[index + 3];
				var hsl = RGB2HSL(red, green, blue);
				var newrgb = HSL2RGB(hsl.H, 1 - hsl.S, hsl.L);
				red = newrgb.R;
				green = newrgb.G;
				blue = newrgb.B;
				if (channel.R)
					imageData.data[index] = red;
				if (channel.G)
					imageData.data[index + 1] = green;
				if (channel.B)
					imageData.data[index + 2] = blue;
			}
		}
		return this;
	}
	invertBright(amount = 0, channel = defaultChannel) {
		return this.negative(amount, channel).aberration(amount, channel);
	}
	Xray(amount = 0, channel = defaultChannel) {
		var light = amount * 5 / 51 - 5; //预设值为 -5
		return this.brightness_legacy(light, channel).sepia(undefined, channel).negative(undefined, channel);
	}
	opaque(amount = 255, channel = defaultChannel) {
		var neg = (amount < 0);
		amount = Math.abs(amount);
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var alpha = imageData.data[index + 3];
				if (alpha == 0)
					continue;
				if (neg)
					alpha = 255 - alpha;
				imageData.data[index + 3] = 255 * amount / 255 + alpha * (255 - amount) / 255;
			}
		}
		return this;
	}
	threshold(amount = 0, channel = defaultChannel) {
		var imageData = this.negative().imageData;
		amount = this.map(amount, -255, 255, 0, 1);
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var red = imageData.data[index];
				var green = imageData.data[index + 1];
				var blue = imageData.data[index + 2];
				var alpha = imageData.data[index + 3];
				var avg = (red + green + blue) / 3 / 255, abs;
				if (amount <= avg)
					abs = 0;
				else
					abs = 255;
				red = abs;
				green = abs;
				blue = abs;
				if (channel.R)
					imageData.data[index] = red;
				if (channel.G)
					imageData.data[index + 1] = green;
				if (channel.B)
					imageData.data[index + 2] = blue;
			}
		}
		return this;
	}
	whiteToAlpha(amount = 0, channel = defaultChannel) {
		var light = this.map(amount, -255, 255, 0, 1);
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var red = imageData.data[index];
				var green = imageData.data[index + 1];
				var blue = imageData.data[index + 2];
				var alpha = imageData.data[index + 3];
				if (alpha == 0)
					continue;
				var hsl = RGB2HSL(red, green, blue);
				if (hsl.L > light) {
					alpha = hsl.L * (-510) + 510;
					var newrgb = HSL2RGB(hsl.H, hsl.S, light);
					red = newrgb.R;
					green = newrgb.G;
					blue = newrgb.B;
				}
				if (channel.R)
					imageData.data[index] = red;
				if (channel.G)
					imageData.data[index + 1] = green;
				if (channel.B)
					imageData.data[index + 2] = blue;
				if (channel.A)
					imageData.data[index + 3] = alpha;
			}
		}
		return this;
	}
	hue(amount = 100, channel = defaultChannel) {
		var imageData = this.imageData;
		amount = this.map(amount, -255, 255, -180, 180);
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var red = imageData.data[index];
				var green = imageData.data[index + 1];
				var blue = imageData.data[index + 2];
				var alpha = imageData.data[index + 3];
				var hsl = RGB2HSL(red, green, blue);
				var newrgb = HSL2RGB((hsl.H + 360 + amount) % 360, hsl.S, hsl.L);
				red = newrgb.R;
				green = newrgb.G;
				blue = newrgb.B;
				if (channel.R)
					imageData.data[index] = red;
				if (channel.G)
					imageData.data[index + 1] = green;
				if (channel.B)
					imageData.data[index + 2] = blue;
			}
		}
		return this;
	}
	blur(amount, channel = defaultChannel) {
		var tempCanvasData = this.imageData;
		var sumred = 0.0, sumgreen = 0.0, sumblue = 0.0;
		for (var x = 0; x < tempCanvasData.width; x++) {
			for (var y = 0; y < tempCanvasData.height; y++) {
				var idx = (x + y * tempCanvasData.width) * 4;
				for (var subCol = -2; subCol <= 2; subCol++) {
					var colOff = subCol + x;
					if (colOff < 0 || colOff >= tempCanvasData.width) {
						colOff = 0;
					}
					for (var subRow = -2; subRow <= 2; subRow++) {
						var rowOff = subRow + y;
						if (rowOff < 0 || rowOff >= tempCanvasData.height) {
							rowOff = 0;
						}
						var idx2 = (colOff + rowOff * tempCanvasData.width) * 4;
						var r = tempCanvasData.data[idx2 + 0];
						var g = tempCanvasData.data[idx2 + 1];
						var b = tempCanvasData.data[idx2 + 2];
						sumred += r;
						sumgreen += g;
						sumblue += b;
					}
				}
				// calculate new RGB value  
				var nr = (sumred / 25.0);
				var ng = (sumgreen / 25.0);
				var nb = (sumblue / 25.0);
				// clear previous for next pixel point  
				sumred = 0.0;
				sumgreen = 0.0;
				sumblue = 0.0;
				// assign new pixel value      
				if (channel.R)
					tempCanvasData.data[idx + 0] = nr; // Red channel      
				if (channel.G)
					tempCanvasData.data[idx + 1] = ng; // Green channel      
				if (channel.B)
					tempCanvasData.data[idx + 2] = nb; // Blue channel      
				if (channel.A)
					tempCanvasData.data[idx + 3] = 255; // Alpha channel      
			}
		}
		return this;
	}
	carving(amount, channel = defaultChannel) {
		this.negative(undefined, channel);
		var tempCanvasData = this.imageData;
		for (var x = 1; x < tempCanvasData.width - 1; x++) {
			for (var y = 1; y < tempCanvasData.height - 1; y++) {
				// Index of the pixel in the array      
				var idx = (x + y * tempCanvasData.width) * 4;
				var bidx = ((x - 1) + y * tempCanvasData.width) * 4;
				var aidx = ((x + 1) + y * tempCanvasData.width) * 4;
				// calculate new RGB value  
				var nr = tempCanvasData.data[bidx + 0] - tempCanvasData.data[aidx + 0] + 128;
				var ng = tempCanvasData.data[bidx + 1] - tempCanvasData.data[aidx + 1] + 128;
				var nb = tempCanvasData.data[bidx + 2] - tempCanvasData.data[aidx + 2] + 128;
				nr = (nr < 0) ? 0 : ((nr > 255) ? 255 : nr);
				ng = (ng < 0) ? 0 : ((ng > 255) ? 255 : ng);
				nb = (nb < 0) ? 0 : ((nb > 255) ? 255 : nb);
				// assign new pixel value      
				if (channel.R)
					tempCanvasData.data[idx + 0] = nr; // Red channel      
				if (channel.G)
					tempCanvasData.data[idx + 1] = ng; // Green channel      
				if (channel.B)
					tempCanvasData.data[idx + 2] = nb; // Blue channel      
				if (channel.A)
					tempCanvasData.data[idx + 3] = 255; // Alpha channel      
			}
		}
		return this;
	}
	mirror(amount = 0, channel = defaultChannel) {
		var tempCanvasData = this.imageData;
		for (var x = (amount >= 0 ? 0 : tempCanvasData.width); (amount >= 0 ? x < tempCanvasData.width / 2 : x > tempCanvasData.width / 2); (amount >= 0 ? x++ : x--)) // column  
		{
			for (var y = 0; y < tempCanvasData.height; y++) // row  
			{
				// Index of the pixel in the array      
				var idx = (x + y * tempCanvasData.width) * 4;
				var midx = (((tempCanvasData.width - 1) - x) + y * tempCanvasData.width) * 4;
				// assign new pixel value      
				if (channel.R)
					tempCanvasData.data[midx + 0] = tempCanvasData.data[idx + 0]; // Red channel      
				if (channel.G)
					tempCanvasData.data[midx + 1] = tempCanvasData.data[idx + 1]; // Green channel      
				if (channel.B)
					tempCanvasData.data[midx + 2] = tempCanvasData.data[idx + 2]; // Blue channel     
				if (channel.A)
					tempCanvasData.data[midx + 3] = tempCanvasData.data[idx + 3]; // Alpha channel      
			}
		}
		return this;
	}
	reverse(amount = 0, channel = defaultChannel) {
		var imageData = this.imageData;
		if (amount >= 0) {
			for (var x = 0; x < imageData.width / 2; x++) // column
			{
				for (var y = 0; y < imageData.height; y++) // row  
				{
					var idx = (x + y * imageData.width) * 4;
					var midx = (((imageData.width - 1) - x) + y * imageData.width) * 4;
					if (channel.R)
						[imageData.data[midx + 0], imageData.data[idx + 0]] = [imageData.data[idx + 0], imageData.data[midx + 0]];
					if (channel.G)
						[imageData.data[midx + 1], imageData.data[idx + 1]] = [imageData.data[idx + 1], imageData.data[midx + 1]];
					if (channel.B)
						[imageData.data[midx + 2], imageData.data[idx + 2]] = [imageData.data[idx + 2], imageData.data[midx + 2]];
					if (channel.A)
						[imageData.data[midx + 3], imageData.data[idx + 3]] = [imageData.data[idx + 3], imageData.data[midx + 3]];
				}
			}
		} else {
			for (var x = 0; x < imageData.width; x++) // column
			{
				for (var y = 0; y < imageData.height / 2; y++) // row  
				{
					var idx = (x + y * imageData.width) * 4;
					var midx = (((imageData.height - 1) - y) * imageData.width + x) * 4;
					if (channel.R)
						[imageData.data[midx + 0], imageData.data[idx + 0]] = [imageData.data[idx + 0], imageData.data[midx + 0]];
					if (channel.G)
						[imageData.data[midx + 1], imageData.data[idx + 1]] = [imageData.data[idx + 1], imageData.data[midx + 1]];
					if (channel.B)
						[imageData.data[midx + 2], imageData.data[idx + 2]] = [imageData.data[idx + 2], imageData.data[midx + 2]];
					if (channel.A)
						[imageData.data[midx + 3], imageData.data[idx + 3]] = [imageData.data[idx + 3], imageData.data[midx + 3]];
				}
			}
		}
		return this;
	}
	backThermography(amount = 0, channel = defaultChannel) {
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var red = imageData.data[index];
				var green = imageData.data[index + 1];
				var blue = imageData.data[index + 2];
				var alpha = imageData.data[index + 3];
				var hsl = RGB2HSL(red, green, blue);
				var newl = this.map(hsl.L, 0, 1, 0, 360);
				var newh = this.map(hsl.H, 0, 360, 0, 1);
				var newrgb = amount >= 0 ? HSL2RGB(channel.H ? newl : hsl.H, hsl.S, channel.L ? newh : hsl.L) : HSL2RGB(channel.H ? 0 : hsl.H, channel.S ? 0 : hsl.S, channel.L ? newh : hsl.L);
				red = newrgb.R;
				green = newrgb.G;
				blue = newrgb.B;
				if (channel.R)
					imageData.data[index] = red;
				if (channel.G)
					imageData.data[index + 1] = green;
				if (channel.B)
					imageData.data[index + 2] = blue;
			}
		}
		return this;
	}
	thermography(amount = 0, channel = defaultChannel) {
		var imageData = this.imageData;
		// l2h 函数放到全局变量去了。
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var red = imageData.data[index];
				var green = imageData.data[index + 1];
				var blue = imageData.data[index + 2];
				var alpha = imageData.data[index + 3];
				var grey = (red + green + blue) / 3;
				// Math.sinDeg=x=>Math.sin(x*Math.PI/180);
				// Math.asinDeg=x=>Math.asin(x*Math.PI/180);
				if (channel.R)
					imageData.data[index] = restrict(l2h(grey, 0), 0, 255);
				if (channel.G)
					imageData.data[index + 1] = restrict(l2h(grey, amount >= 0 ? 1 : 2), 0, 255);
				if (channel.B)
					imageData.data[index + 2] = restrict(l2h(grey, amount >= 0 ? 2 : 1), 0, 255);
			}
		}
		return this;
	}
	posterize(amount = 4, channel = defaultChannel) {
		if (amount == 0)
			amount = 4;
		var imageData = this.imageData;
		function posterize(color, amount, range = 255) {
			return Math.round(Math.round(color / range * amount) / amount * range);
		}
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4);
				var red = imageData.data[index],
					green = imageData.data[index + 1],
					blue = imageData.data[index + 2],
					alpha = imageData.data[index + 3];
				// var hsl=RGB2HSL(red,green,blue);
				if (amount >= 0) {
					red = posterize(red, amount);
					green = posterize(green, amount);
					blue = posterize(blue, amount);
				} else {
					var hsl = RGB2HSL(red, green, blue),
						hue = this.map(hsl.H, 0, 360, 0, 255),
						saturation = this.map(hsl.S, 0, 1, 0, 255),
						luminance = this.map(hsl.L, 0, 1, 0, 255);
					hue = posterize(hue, amount);
					saturation = posterize(saturation, amount);
					luminance = posterize(luminance, amount);
					hue = this.map(hue, 0, 255, 0, 360);
					saturation = this.map(saturation, 0, 255, 0, 1);
					luminance = this.map(luminance, 0, 255, 0, 1);
					var newrgb = HSL2RGB(channel.H ? hue : hsl.H, channel.S ? saturation : hsl.S, channel.L ? luminance : hsl.L);
					red = newrgb.R;
					green = newrgb.G;
					blue = newrgb.B;
				}
				alpha = posterize(alpha, amount);
				if (channel.R)
					imageData.data[index] = red;
				if (channel.G)
					imageData.data[index + 1] = green;
				if (channel.B)
					imageData.data[index + 2] = blue;
				if (channel.A)
					imageData.data[index + 3] = alpha;
			}
		}
		return this;
	}
	primaryColor(amount, channel = defaultChannel) {
		var imageData = this.imageData;
		for (var i = 0; i < imageData.width; i++) {
			for (var j = 0; j < imageData.height; j++) {
				var index = (j * 4) * imageData.width + (i * 4),
					red = imageData.data[index],
					green = imageData.data[index + 1],
					blue = imageData.data[index + 2];
				if (red == green && green == blue)
					continue;
				// alpha = imageData.data[index + 3],
				var hue = RGB2HSL(red, green, blue).H;
				if (hue >= 270 || hue < 90)
					red = 255; else
					red = 0;
				if (hue >= 30 && hue < 210)
					green = 255; else
					green = 0;
				if (hue >= 150 && hue < 330)
					blue = 255; else
					blue = 0;
				if (channel.R)
					imageData.data[index] = red;
				if (channel.G)
					imageData.data[index + 1] = green;
				if (channel.B)
					imageData.data[index + 2] = blue;
			}
		}
		return this;
	}
	watermark(img, q, x, y, width, height, callback) {
		var context = this;
		if (callback == "" || callback == null) {
			callback = function () {
				this.debugger("Watermark method expects a callback");
			};
		}
		if (q == "") {
			q = 3;
		}
		if (x == '' || x == null) {
			x = 0;
		}
		if (y == '' || y == null) {
			y = 0;
		}
		if (width == '' || width == null) {
			width = this.imageData.width;
		}
		if (height == '' || height == null) {
			height = this.imageData.height;
		}
		var scnd = new Chobi(img);
		scnd.ready(function () {
			this.resize(width, height);
			for (var i = 0; i < this.imageData.width; i++) {
				for (var j = 0; j < this.imageData.height; j++) {
					var f = context.getColorAt(i + x, j + y);
					var s = this.getColorAt(i, j);
					var r = (q * f.red + s.red) / (q + 1);
					var g = (q * f.green + s.green) / (q + 1);
					var b = (q * f.blue + s.blue) / (q + 1);
					var p = {
						red: r,
						green: g,
						blue: b,
						alpha: f.alpha
					};
					context.setColorAt(i + x, j + y, p);
				}
			}
			callback();
		});
	}
	resize(width, height) {
		if ((width == "" && height == "") || (width == "auto" && height == "auto")) {
			width = this.imageData.width;
			height = this.imageData.height;
		}
		if (width == "auto") {
			width = (height / this.imageData.height) * this.imageData.width;
		} else if (height == "auto") {
			height = (width / this.imageData.width) * this.imageData.height;
		}
		var oc = document.createElement('canvas');
		var octx = oc.getContext('2d');
		oc.width = width;
		oc.height = height;
		octx.drawImage(this.getImage(), 0, 0, oc.width, oc.height);
		this.imageData = octx.getImageData(0, 0, width, height);
		return this;
	}
	loadImageToCanvas(drawArea) {
		if (drawArea == null && this.canvas != null) {
			drawArea = this.canvas;
		}
		try {
			var imageData = this.imageData;
			var ctx = drawArea.getContext("2d");
			drawArea.width = imageData.width;
			drawArea.height = imageData.height;
			ctx.putImageData(imageData, 0, 0);
			return true;
		} catch (e) {
			this.debugger(e);
			return false;
		}
		return this;
	}
	getImage() {
		var tmpCanvas = document.createElement('canvas');
		var tmpctx = tmpCanvas.getContext('2d');
		tmpCanvas.width = this.imageData.width;
		tmpCanvas.height = this.imageData.height;
		tmpctx.putImageData(this.imageData, 0, 0);
		var img = document.createElement("img");
		img.src = tmpCanvas.toDataURL("image/png");
		return img;
	}
	crop(x, y, width, height) {
		if (x == "" || y == "" || width == "" || height == "") {
			this.debugger("Invalid crop parameters");
			return this;
		}
		if (x < 0 || y < 0 || x > this.imageData.width || y > this.imageData.height || (x + width) > this.imageData.width ||
			(y + height) > this.imageData.height) {
			this.debugger("Invalid crop parameters");
			return this;
		}
		var canvas = document.createElement("canvas");
		this.loadImageToCanvas(canvas);
		var context = canvas.getContext("2d");
		var data = context.getImageData(x, y, width, height);
		this.imageData = data;
		return this;
	}
	vignette(scaleLevel, channel = defaultChannel) {
		if (scaleLevel == "" || scaleLevel == null) {
			scaleLevel = 1; // 预设是 scaleLevel = 0.1;
		}
		scaleLevel /= 10;
		var imgCntX = this.imageData.width / 2;
		var imgCntY = this.imageData.height / 2;
		var maxDis = Math.sqrt((imgCntY * imgCntY) + (imgCntX * imgCntX));
		var dis = Math.sqrt(((this.imageData.width / 2 - i) * (this.imageData.width / 2 - i)) - ((this.imageData.height / 2 -
			j) * (this.imageData.height / 2 - j)));

		for (var i = 0; i < this.imageData.width; i++) {
			for (var j = 0; j < this.imageData.height; j++) {
				var mix = this.getColorAt(i, j);
				var dis = Math.sqrt(Math.floor(Math.pow(i - imgCntY, 2)) + Math.floor(Math.pow(j - imgCntX, 2)));
				if (channel.R)
					mix.red = mix.red * (1 - (1 - scaleLevel) * (dis / maxDis));
				if (channel.G)
					mix.green = mix.green * (1 - (1 - scaleLevel) * (dis / maxDis));
				if (channel.B)
					mix.blue = mix.blue * (1 - (1 - scaleLevel) * (dis / maxDis));
				this.setColorAt(i, j, mix);
			}
		}
		return this;
	}
	download(filename, filetype) {
		if (filename == "") {
			filename = "untitled";
		}
		if (filetype == "") {
			filetype = "png";
		}
		var imageData = this.imageData;
		var drawArea = document.createElement('canvas');
		var ctx = drawArea.getContext("2d");
		drawArea.width = imageData.width;
		drawArea.height = imageData.height;
		ctx.putImageData(imageData, 0, 0);
		var image = drawArea.toDataURL("image/" + filetype).replace("image/" + filetype, "image/octet-stream");
		var link = document.createElement('a');
		if (typeof link.download === 'string') {
			document.body.appendChild(link); // Firefox requires the link to be in the body
			link.download = filename + "." + filetype;
			link.href = image;
			link.click();
			document.body.removeChild(link); // remove the link when done
		} else {
			location.replace(uri);
		}
		return true;
	}
}
Chobi.myFilterList = {
	data: {},
	add: function (name, model, amountDefault, cv1, cv2, cv3, cv4, cv5) { //cv: colorValue
		var myFilter = Object.createSameValue(undefined, "RGBHSLVAabCMYK".split(''));
		myFilter = { ...myFilter, model, amountDefault };
		model = model.toUpperCase();
		if (model == "RGB") myFilter = { ...myFilter, R: cv1, G: cv2, B: cv3, A: cv4 };
		else if (model == "HSL") myFilter = { ...myFilter, H: cv1, S: cv2, L: cv3, A: cv4 };
		else if (model == "HSV" || model == "HSB") myFilter = { ...myFilter, H: cv1, S: cv2, V: cv3, A: cv4 };
		else if (model == "LAB") myFilter = { ...myFilter, L: cv1, a: cv2, b: cv3, A: cv4 };
		else if (model == "CMYK") myFilter = { ...myFilter, C: cv1, M: cv2, Y: cv3, K: cv4, A: cv5 };
		var exist = this.has(name);
		this.data[name] = myFilter;
		if (exist === false) console.log("OK");
		else if (exist === true) console.warn("It's already exist, will overwrite it!");
		else console.error(new Error("It's built-in!"));
	},
	remove: function (name) {
		return delete this.data[name];
	},
	has: function (name) {
		if (this.data[name]) return true;
		else if (Chobi.prototype[name]) return "built";
		else return false;
	}
}

/**
 * HSL 颜色模型转 RGB 颜色模型。
 * @param {number} H - 色相，取值范围为 [0,360) 。
 * @param {number} S - 饱和度，取值范围为 [0,1] 。
 * @param {number} L - 亮度，取值范围为 [0,1] 。
 * @param {bool} stringMode - 是否输出为字符串？如是输出字符串，如否输出对象。默认为否。
 * @returns 返回 RGB 颜色值。
 */
function HSL2RGB(H = 0, S = 0, L = 0, stringMode = false) {
	H = H % 360;
	S = restrict(S, 0, 1);
	L = restrict(L, 0, 1);
	const C = (1 - Math.abs(2 * L - 1)) * S
	const X = C * (1 - Math.abs(((H / 60) % 2) - 1))
	const m = L - C / 2
	const vRGB = []
	if (H >= 0 && H < 60) {
		vRGB.push(C, X, 0)
	} else if (H >= 60 && H < 120) {
		vRGB.push(X, C, 0)
	} else if (H >= 120 && H < 180) {
		vRGB.push(0, C, X)
	} else if (H >= 180 && H < 240) {
		vRGB.push(0, X, C)
	} else if (H >= 240 && H < 300) {
		vRGB.push(X, 0, C)
	} else if (H >= 300 && H < 360) {
		vRGB.push(C, 0, X)
	}
	const [vR, vG, vB] = vRGB
	const R = 255 * (vR + m)
	const G = 255 * (vG + m)
	const B = 255 * (vB + m)

	if (stringMode) {
		return `rgb(${R},${G},${B})`
	}

	return {
		R,
		G,
		B
	}
}

/**
 * RGB 颜色模型转 HSL 颜色模型。
 * @param {number} R - 红色参量，取值范围为 [0,255] 。
 * @param {number} G - 绿色参量，取值范围为 [0,255] 。
 * @param {number} B - 蓝色参量，取值范围为 [0,255] 。
 * @param {bool} stringMode - 是否输出为字符串？如是输出字符串，如否输出对象。默认为否。
 * @returns 返回 HSL 颜色值。
 */
function RGB2HSL(R = 0, G = 0, B = 0, stringMode = false) {
	const _R = R / 255;
	const _G = G / 255;
	const _B = B / 255;
	const Cmax = Math.max(_R, _G, _B);
	const Cmin = Math.min(_R, _G, _B);
	const V = Cmax - Cmin;

	let H = 0;
	if (V === 0) {
		H = 0;
	} else if (Cmax === _R) {
		H = 60 * (((_G - _B) / V) % 6);
	} else if (Cmax === _G) {
		H = 60 * ((_B - _R) / V + 2);
	} else if (Cmax === _B) {
		H = 60 * ((_R - _G) / V + 4);
	}

	H = Math.floor(backCycle(H, 360));
	const L = numberFixed((Cmax + Cmin) / 2);
	const S = V === 0 ? 0 : numberFixed(V / (1 - Math.abs(2 * L - 1)));

	if (stringMode) {
		return `hsl(${H},${numberFixed(100 * S)}%,${numberFixed(100 * L)}%)`;
	}

	return {
		H,
		S,
		L
	};
}

// utils
function backCycle(num, cycle) {
	let index = num % cycle;
	if (index < 0) {
		index += cycle;
	}
	return index;
}

function numberFixed(num = 0, count = 3) {
	const power = Math.pow(10, count);
	return Math.floor(num * power) / power;
}

function restrict(x, min, max) {
	if (min > max) [min, max] = [max, min];
	if (x < min) return min;
	if (x > max) return max;
	return x;
}

function l2h(x, t) {
	// return -8.5*Math.asin(Math.abs(Math.sinDeg(36/51*x-60*t)))+510;
	//垃圾不支持角度运算
	return 2 * 765 / Math.PI * Math.asin(Math.abs(Math.sin((x - 255 / 3 * t) * Math.PI / 255 - Math.PI / 2))) - 255;
}