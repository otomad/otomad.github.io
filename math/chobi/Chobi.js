'use strict';

var Chobi = function(elem) {
	if (elem.tagName == "CANVAS") {
		var img = new Image();
		img.width=elem.width;
		img.height=elem.height;
		this.image = img;
		this.imageData = this.getImageData(elem,elem.width,elem.height);
	} else if (elem instanceof(Image)) {
		this.image = elem;
		this.imageData = this.extractImageData();
		this.debugger('Type matched. instanceof(Image). Saved as [Chobi object]');
		try {
			this.onload();
		} catch (e) {
			this.debugger(e+'\nready callback not found');
		}
	} else if (typeof(elem) == 'string') {
		var context = this;
		this.debugger('Not instanceof(Image). Trying as URL');
		var img = new Image();
		img.crossOrigin = "Anonymous";
		img.src = elem;
		img.onload = function() {
			context.image = img;
			context.imageData = context.extractImageData();
			context.debugger('Type matched. URL. Saved as [Chobi object]');
			try {
				context.onload();
			} catch (e) {
				context.debugger(e+'\nready callback not found');
			}
			return;
		}
	} else {
		this.debugger('Not instanceof(Image). Trying as URL');
		this.debugger('Not URL. Trying as input[file]');
		var context = this;
		try {
			var file = elem.files[0];
			var fr = new FileReader();
			fr.onload = function() {
				var img = new Image();
				img.onload = function() {
					context.image = img;
					context.imageData = context.extractImageData();
					context.debugger('Type matched. input[file]. Saved as [Chobi object]');
					try {
						context.onload();
					} catch (e) {
						context.debugger(e+'\nready callback not found');
					}
					return;
				}
				img.src = fr.result;
			};
			fr.readAsDataURL(file);
		} catch (e) {
			context.debugger(e+"\nNot input[file]. Trying as <canvas>");
		}
		try {
			var img = new Image();
			var imgData = elem.toDataURL();
			img.src = imgData;
			this.debugger(imgData);
			img.onload = function() {
				context.image = img;
				context.imageData = context.extractImageData();
				context.debugger('Type matched. <canvas>. Saved as [Chobi object]');
				try {
					context.onload();
				} catch (e) {
					context.debugger(e+'\nready callback not found');
				}
				return;
			}
		} catch (e) {
			context.debugger(e+'\nNot <canvas>. Trying as <img>');
		}
		try {
			var img = new Image();
			img.src = elem.src;
			img.onload = function() {
				context.image = img;
				context.imageData = context.extractImageData();
				context.debugger('Type matched. <img>. Saved as [Chobi object]');
				try {
					context.onload();
				} catch (e) {
					context.debugger(e+'\nready callback not found');
				}
				return;
			}
		} catch (e) {
			context.debugger(e+'\nNot <img>. No other type is supported');
		}
	}
}
Chobi.prototype.debug = true;
Chobi.prototype.debugger = function(msg) {
	if (this.debug) {
		console.log(msg);
	}
}
Chobi.prototype.ready = function(onLoadFunc) {
	this.onload = onLoadFunc;
}
Chobi.prototype.onload = null;
Chobi.prototype.extractImageData = function() {
	var img = this.image;
	var drawArea = document.createElement('canvas');
	var ctx = drawArea.getContext("2d");
	drawArea.width = img.width;
	drawArea.height = img.height;
	ctx.drawImage(img, 0, 0, img.width, img.height);
	this.imageData = ctx.getImageData(0, 0, img.width, img.height);
	return this.imageData;
}
Chobi.prototype.getImageData = function(canvas,width,height){
	return canvas.getContext("2d").getImageData(0,0,width,height);
}
Chobi.prototype.thumbImageData = function(canvas,width,height) {
	var img = this.image;
	var drawArea = canvas;
	var ctx = drawArea.getContext("2d");
	drawArea.width = width;
	drawArea.height = height;
	var swidth=img.width,
		sheight=height/width*img.width;
	if(sheight>img.height) {
		sheight=img.height;
		swidth=width/height*img.height;
	}
	var sx=(img.width-swidth)/2,
		sy=(img.height-sheight)/2;
	ctx.drawImage(img, sx, sy, swidth, sheight,0,0,width,height);
}
Chobi.prototype.copyImageData = function(a,b) {
	var context = a.getContext("2d"),
		context1 = b.getContext("2d"),
		imageData = context.getImageData(0,0,a.width,a.height);
	context1.putImageData(imageData,0,0,0,0,b.width,b.height);
	return this;
}
Chobi.prototype.changeImageData = function(a) {
	this.imageData = a.getContext("2d").getImageData(0,0,a.width,a.height);
	return this;
}
Chobi.prototype.getColorAt = function(x, y) {
	var index = (y * 4) * this.imageData.width + (x * 4);
	var colorData = {
		red: this.imageData.data[index],
		green: this.imageData.data[index + 1],
		blue: this.imageData.data[index + 2],
		alpha: this.imageData.data[index + 3]
	}
	return colorData;
}
Chobi.prototype.setColorAt = function(x, y, obj) {
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
Chobi.prototype.blackAndWhite = function() {
	var imageData = this.imageData;
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var red = imageData.data[index];
			var green = imageData.data[index + 1];
			var blue = imageData.data[index + 2];
			var avg = (red + green + blue) / 3;
			imageData.data[index] = avg;
			imageData.data[index + 1] = avg;
			imageData.data[index + 2] = avg;
		}
	}
	return this;
}
Chobi.prototype.blackAndWhite2 = function() {
	var imageData = this.imageData;
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var red = imageData.data[index];
			var green = imageData.data[index + 1];
			var blue = imageData.data[index + 2];
			var avg = ((red * 0.3) + (green * 0.59) + (blue * 0.11));
			imageData.data[index] = avg;
			imageData.data[index + 1] = avg;
			imageData.data[index + 2] = avg;
		}
	}
	return this;
}
Chobi.prototype.blackAndWhite3 = function() {
	var imageData = this.imageData;
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var red = imageData.data[index];
			var green = imageData.data[index + 1];
			var blue = imageData.data[index + 2];
			var avg = RGB2HSL(red,green,blue).L * 255;
			imageData.data[index] = avg;
			imageData.data[index + 1] = avg;
			imageData.data[index + 2] = avg;
		}
	}
	return this;
}
Chobi.prototype.sepia = function() {
	var imageData = this.imageData;
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var red = imageData.data[index];
			var green = imageData.data[index + 1];
			var blue = imageData.data[index + 2];
			imageData.data[index] = (red * 0.393) + (green * 0.769) + (blue * 0.189);
			imageData.data[index + 1] = (red * 0.349) + (green * 0.686) + (blue * 0.168);
			imageData.data[index + 2] = (red * 0.272) + (green * 0.534) + (blue * 0.131);
		}
	}
	return this;
}
Chobi.prototype.negative = function() {
	var imageData = this.imageData;
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var red = imageData.data[index];
			var green = imageData.data[index + 1];
			var blue = imageData.data[index + 2];
			var alpha = imageData.data[index + 3];
			red = 255 - red;
			green = 255 - green;
			blue = 255 - blue;
			imageData.data[index] = red;
			imageData.data[index + 1] = green;
			imageData.data[index + 2] = blue;
		}
	}
	return this;
}
Chobi.prototype.random = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
Chobi.prototype.noise = function() {
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
			imageData.data[index] = red;
			imageData.data[index + 1] = green;
			imageData.data[index + 2] = blue;
		}
	}
	return this;
}
Chobi.prototype.contrast_legacy = function(amount) {
	return this.contrast(amount/100*255)
}
Chobi.prototype.contrast = function(amount=100) {
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
			if (red > 255) red = 255;
			if (red < 0) red = 0;
			if (green > 255) green = 255;
			if (green < 0) green = 0;
			if (blue > 255) blue = 255;
			if (blue < 0) blue = 0;
			imageData.data[index] = red;
			imageData.data[index + 1] = green;
			imageData.data[index + 2] = blue;
		}
	}
	return this;
}
Chobi.prototype.crossProcess = function() {
	return this.vintage().brightness_legacy(10).contrast(50);
}
Chobi.prototype.map = function(x, min, max, a, b) {
	return ((b - a) * (x - min) / (max - min)) + a;
}
Chobi.prototype.brightness_legacy = function(amount) {
	return this.brightness(amount/100*255);
}
Chobi.prototype.brightness = function(amount=100) {
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
			if (red > 255) red = 255;
			if (red < 0) red = 0;
			if (green > 255) green = 255;
			if (green < 0) green = 0;
			if (blue > 255) blue = 255;
			if (blue < 0) blue = 0;
			imageData.data[index] = red;
			imageData.data[index + 1] = green;
			imageData.data[index + 2] = blue;
		}
	}
	return this;
}

Chobi.prototype.vintage = function() {
	var imageData = this.imageData;
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var red = imageData.data[index];
			var green = imageData.data[index + 1];
			var blue = imageData.data[index + 2];
			red = green;
			green = red;
			blue = 150;
			imageData.data[index] = red;
			imageData.data[index + 1] = green;
			imageData.data[index + 2] = blue;
		}
	}
	this.contrast(50);
	return this;
}
Chobi.prototype.crayon = function() {
	this.noise().contrast(500);
	return this;
}
Chobi.prototype.cartoon = function() {
	this.contrast(400);
	return this;
}


Chobi.prototype.india = function() {
	var height = this.imageData.height;
	//orange
	for(var i=0;i<this.imageData.width;i++){
		for(var j=0;j<(height/3);j++){
			var pixel = this.getColorAt(i,j);
			pixel.red = (255+pixel.red)/2;
			pixel.green = (165+pixel.green)/2;
			pixel.blue /= 2;
			this.setColorAt(i,j,pixel);			
		}
	}
	//white
	for(var i=0;i<this.imageData.width;i++){
		for(var j=Math.floor(height/3);j<Math.floor(2*(height/3));j++){
			var pixel = this.getColorAt(i,j);
			pixel.red = (255+pixel.red)/2;
			pixel.green = (255+pixel.green)/2;
			pixel.blue = (255+pixel.blue)/2;
			this.setColorAt(i,j,pixel);			
		}
	}
	//green
	for(var i=0;i<this.imageData.width;i++){
		for(var j=Math.floor(2*(height/3));j<Math.floor(height);j++){
			var pixel = this.getColorAt(i,j);
			pixel.red = (0+pixel.red)/2;
			pixel.green = (255+pixel.green)/2;
			pixel.blue = (0+pixel.blue)/2;
			this.setColorAt(i,j,pixel);			
		}
	}
	return this;
}
Chobi.prototype.aberration = function() {
	var imageData = this.imageData;
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var rgb=[imageData.data[index],imageData.data[index+1],imageData.data[index+2]];
			// var hsl=RGB2HSL(red,green,blue);
			// var newrgb=HSL2RGB((hsl.H+180)%360,hsl.S,hsl.L)
			if(rgb[0]==rgb[1]&&rgb[1]==rgb[2]) continue;
			var max=Math.max(rgb[0],rgb[1],rgb[2]),
				min=Math.min(rgb[0],rgb[1],rgb[2]),
				maxI=rgb.indexOf(max),
				minI=rgb.indexOf(min),
				midI=3-maxI-minI,
				newrgb=[];
			newrgb[maxI]=min;
			newrgb[minI]=max;
			newrgb[midI]=max+min-rgb[midI];
			imageData.data[index] = newrgb[0];
			imageData.data[index + 1] = newrgb[1];
			imageData.data[index + 2] = newrgb[2];
		}
	}
	return this;
}
Chobi.prototype.relief = function() {
	var imageData = this.imageData;
	var data = imageData.data;
	var width = imageData.width;//设备像素
	var length = data.length;
	for(var i =0;i<length;i++){//遍历每个像素
	    //不让超过最后一行
	    if(i<length-width*4){ //不包含最后一行
	        //不包含透明度的值
	        if((i+1)%4 !==0){
	            //在每行最后一个像素取左边的邻近像素
	            if((i+4)%(width*4) == 0){//代表每行最后一个像素
	                //给最右边像素重新定rgba
	                data[i] = data[i-4];
	                data[i+1] = data[i-3];
	                data[i+2] = data[i-2];
	                data[i+3] = data[i-1];
	                i+=4; //直接跳到下一个像素
	            }else{ //最终符合条件的，不是最后一行，也不在每行最后一个的像素，且除去了像素集合中为透明度的值
	                data[i] = 255/2 
	                          + 2*data[i] //现有像素
	                          - data[i+4] //下一个像素
	                          - data[i+width*4]; //下一行同一位置像素
	            }
	        }
	    }else{ //最后一行，取上一行的像素
	        if((i+1)%4 !== 0){
	            data[i] = data[i -width+4];
	        }
	    }
	}
	return this;
}
Chobi.prototype.midBright = function() {
	var imageData = this.imageData;
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var red = imageData.data[index];
			var green = imageData.data[index + 1];
			var blue = imageData.data[index + 2];
			var alpha = imageData.data[index + 3];
			var hsl=RGB2HSL(red,green,blue);
			var newrgb=HSL2RGB(hsl.H,hsl.S,0.5)
			red = newrgb.R;
			green = newrgb.G;
			blue = newrgb.B;
			imageData.data[index] = red;
			imageData.data[index + 1] = green;
			imageData.data[index + 2] = blue;
		}
	}
	return this;
}
Chobi.prototype.maxSaturate = function() {
	var imageData = this.imageData;
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var red = imageData.data[index];
			var green = imageData.data[index + 1];
			var blue = imageData.data[index + 2];
			var alpha = imageData.data[index + 3];
			var hsl=RGB2HSL(red,green,blue);
			var newrgb=HSL2RGB(hsl.H,1,hsl.L)
			red = newrgb.R;
			green = newrgb.G;
			blue = newrgb.B;
			imageData.data[index] = red;
			imageData.data[index + 1] = green;
			imageData.data[index + 2] = blue;
		}
	}
	return this;
}
Chobi.prototype.saturation = function(amount=100) {
	var imageData = this.imageData;
	amount = this.map(amount, -255, 255, 0, 2);
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var red = imageData.data[index];
			var green = imageData.data[index + 1];
			var blue = imageData.data[index + 2];
			var alpha = imageData.data[index + 3];
			var hsl=RGB2HSL(red,green,blue);
			var s=hsl.S;
			if(amount<=1) s*=amount;
			// else s=1-s*(2-amount);
			else s*=(amount-1)*5+1;
			var newrgb=HSL2RGB(hsl.H,s,hsl.L)
			red = newrgb.R;
			green = newrgb.G;
			blue = newrgb.B;
			imageData.data[index] = red;
			imageData.data[index + 1] = green;
			imageData.data[index + 2] = blue;
		}
	}
	return this;
}
Chobi.prototype.invertSaturate = function() {
	var imageData = this.imageData;
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var red = imageData.data[index];
			var green = imageData.data[index + 1];
			var blue = imageData.data[index + 2];
			var alpha = imageData.data[index + 3];
			var hsl=RGB2HSL(red,green,blue);
			var newrgb=HSL2RGB(hsl.H,1-hsl.S,hsl.L)
			red = newrgb.R;
			green = newrgb.G;
			blue = newrgb.B;
			imageData.data[index] = red;
			imageData.data[index + 1] = green;
			imageData.data[index + 2] = blue;
		}
	}
	return this;
}
Chobi.prototype.invertBright = function() {
	return this.negative().aberration();
}
Chobi.prototype.Xray = function() {
	return this.brightness_legacy(-5).sepia().negative();
}
Chobi.prototype.opaque = function() {
	var imageData = this.imageData;
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			if(imageData.data[index + 3]==0) continue;
			imageData.data[index + 3] = 255;
		}
	}
	return this;
}
Chobi.prototype.threshold = function(amount=0) {
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
			if(amount<=avg) abs=0;
			else abs=255;
			red = abs;
			green = abs;
			blue = abs;
			imageData.data[index] = red;
			imageData.data[index + 1] = green;
			imageData.data[index + 2] = blue;
		}
	}
	return this;
}
Chobi.prototype.whiteToAlpha = function() {
	var imageData = this.imageData;
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var red = imageData.data[index];
			var green = imageData.data[index + 1];
			var blue = imageData.data[index + 2];
			var alpha = imageData.data[index + 3];
			if(alpha==0) continue;
			var hsl=RGB2HSL(red,green,blue);
			if(hsl.L>0.5){
				alpha = hsl.L*(-510)+510;
				var newrgb=HSL2RGB(hsl.H,hsl.S,0.5)
				red = newrgb.R;
				green = newrgb.G;
				blue = newrgb.B;
			}
			imageData.data[index] = red;
			imageData.data[index + 1] = green;
			imageData.data[index + 2] = blue;
			imageData.data[index + 3] = alpha;
		}
	}
	return this;
}
Chobi.prototype.hue = function(amount=100) {
	var imageData = this.imageData;
	amount = this.map(amount, -255, 255, -180, 180);
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var red = imageData.data[index];
			var green = imageData.data[index + 1];
			var blue = imageData.data[index + 2];
			var alpha = imageData.data[index + 3];
			var hsl=RGB2HSL(red,green,blue);
			var newrgb=HSL2RGB((hsl.H+360+amount)%360,hsl.S,hsl.L)
			red = newrgb.R;
			green = newrgb.G;
			blue = newrgb.B;
			imageData.data[index] = red;
			imageData.data[index + 1] = green;
			imageData.data[index + 2] = blue;
		}
	}
	return this;
}
Chobi.prototype.blur = function() {
    var tempCanvasData = this.imageData;
    var sumred = 0.0, sumgreen = 0.0, sumblue = 0.0;  
    for ( var x = 0; x < tempCanvasData.width; x++) {      
        for ( var y = 0; y < tempCanvasData.height; y++) {   
            var idx = (x + y * tempCanvasData.width) * 4;         
            for(var subCol=-2; subCol<=2; subCol++) {  
                var colOff = subCol + x;  
                if(colOff <0 || colOff >= tempCanvasData.width) {  
                    colOff = 0;  
                }  
                for(var subRow=-2; subRow<=2; subRow++) {  
                    var rowOff = subRow + y;  
                    if(rowOff < 0 || rowOff >= tempCanvasData.height) {  
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
            tempCanvasData.data[idx + 0] = nr; // Red channel      
            tempCanvasData.data[idx + 1] = ng; // Green channel      
            tempCanvasData.data[idx + 2] = nb; // Blue channel      
            tempCanvasData.data[idx + 3] = 255; // Alpha channel      
        }  
    }
	return this;
}
Chobi.prototype.carving = function() {
	this.negative();
    var tempCanvasData = this.imageData; 
    for ( var x = 1; x < tempCanvasData.width-1; x++)   
    {      
        for ( var y = 1; y < tempCanvasData.height-1; y++)  
        {      
            // Index of the pixel in the array      
            var idx = (x + y * tempCanvasData.width) * 4;         
            var bidx = ((x-1) + y * tempCanvasData.width) * 4;  
            var aidx = ((x+1) + y * tempCanvasData.width) * 4;  
            // calculate new RGB value  
            var nr = tempCanvasData.data[bidx + 0] - tempCanvasData.data[aidx + 0] + 128;  
            var ng = tempCanvasData.data[bidx + 1] - tempCanvasData.data[aidx + 1] + 128;  
            var nb = tempCanvasData.data[bidx + 2] - tempCanvasData.data[aidx + 2] + 128;  
            nr = (nr < 0) ? 0 : ((nr >255) ? 255 : nr);  
            ng = (ng < 0) ? 0 : ((ng >255) ? 255 : ng);  
            nb = (nb < 0) ? 0 : ((nb >255) ? 255 : nb);  
            // assign new pixel value      
            tempCanvasData.data[idx + 0] = nr; // Red channel      
            tempCanvasData.data[idx + 1] = ng; // Green channel      
            tempCanvasData.data[idx + 2] = nb; // Blue channel      
            tempCanvasData.data[idx + 3] = 255; // Alpha channel      
        }  
    }
	return this;
}
Chobi.prototype.mirror = function(amount=0) {
    var tempCanvasData = this.imageData;
    for ( var x = (amount>=0?0:tempCanvasData.width); (amount>=0?x < tempCanvasData.width/2:x > tempCanvasData.width/2); (amount>=0?x++:x--)) // column  
    {      
        for ( var y = 0; y < tempCanvasData.height; y++) // row  
        {
            // Index of the pixel in the array      
            var idx = (x + y * tempCanvasData.width) * 4;         
            var midx = (((tempCanvasData.width -1) - x) + y * tempCanvasData.width) * 4;
            // assign new pixel value      
            tempCanvasData.data[midx + 0] = tempCanvasData.data[idx + 0]; // Red channel      
            tempCanvasData.data[midx + 1] = tempCanvasData.data[idx + 1]; // Green channel      
            tempCanvasData.data[midx + 2] = tempCanvasData.data[idx + 2]; // Blue channel     
            // tempCanvasData.data[midx + 3] = 255; // Alpha channel      
        }  
    }  
	return this;
}
Chobi.prototype.reverse = function() {
    var imageData = this.imageData;
	var tempCanvasData = {data:imageData.data};
    for ( var x = 0; x < imageData.width/2; x++) // column  
    {      
        for ( var y = 0; y < imageData.height; y++) // row  
        {
            // Index of the pixel in the array      
            var idx = (x + y * imageData.width) * 4;         
            var midx = (((imageData.width -1) - x) + y * imageData.width) * 4;
            // assign new pixel value      
            [imageData.data[midx + 0], tempCanvasData.data[idx + 0]]=[tempCanvasData.data[idx + 0], imageData.data[midx + 0]];
            [imageData.data[midx + 1], tempCanvasData.data[idx + 1]]=[tempCanvasData.data[idx + 1], imageData.data[midx + 1]];
            [imageData.data[midx + 2], tempCanvasData.data[idx + 2]]=[tempCanvasData.data[idx + 2], imageData.data[midx + 2]];
            // tempCanvasData.data[midx + 3] = 255; // Alpha channel      
        }  
    }  
	return this;
}
Chobi.prototype.backThermography = function(amount=0) {
	var imageData = this.imageData;
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var red = imageData.data[index];
			var green = imageData.data[index + 1];
			var blue = imageData.data[index + 2];
			var alpha = imageData.data[index + 3];
			var hsl=RGB2HSL(red,green,blue);
			var newl=this.map(hsl.L,0,1,0,360);
			var newh=this.map(hsl.H,0,360,0,1);
			var newrgb=amount>=0?HSL2RGB(newl,hsl.S,newh):HSL2RGB(0,0,newh);
			red = newrgb.R;
			green = newrgb.G;
			blue = newrgb.B;
			imageData.data[index] = red;
			imageData.data[index + 1] = green;
			imageData.data[index + 2] = blue;
		}
	}
	return this;
}
Chobi.prototype.thermography = function(amount=0) {
	var imageData = this.imageData;
	function l2h(x,t){
		// return -8.5*Math.asin(Math.abs(Math.sinDeg(36/51*x-60*t)))+510;
		//垃圾不支持角度运算
		return 2*765/Math.PI*Math.asin(Math.abs(Math.sin((x-255/3*t)*Math.PI/255-Math.PI/2)))-255;
	}
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var red = imageData.data[index];
			var green = imageData.data[index + 1];
			var blue = imageData.data[index + 2];
			var alpha = imageData.data[index + 3];
			var grey = (red+green+blue)/3;
			// Math.sinDeg=x=>Math.sin(x*Math.PI/180);
			// Math.asinDeg=x=>Math.asin(x*Math.PI/180);
			imageData.data[index] = restrict(l2h(grey,0),0,255);
			imageData.data[index + 1] = restrict(l2h(grey,amount>=0?1:2),0,255);
			imageData.data[index + 2] = restrict(l2h(grey,amount>=0?2:1),0,255);
		}
	}
	return this;
}
Chobi.prototype.posterize = function(amount=4) {
	if(amount==0) amount=4;
	var imageData = this.imageData;
	function posterize(color, amount, range = 255) {
		return Math.round(Math.round(color/range*amount)/amount*range);
	}
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4);
			var red = imageData.data[index],
				green = imageData.data[index + 1],
				blue = imageData.data[index + 2],
				alpha = imageData.data[index + 3];
			// var hsl=RGB2HSL(red,green,blue);
			if(amount>=0) {
				red = posterize(red, amount);
				green = posterize(green, amount);
				blue = posterize(blue, amount);
			} else {
				var hsl=RGB2HSL(red,green,blue),
					hue=this.map(hsl.H,0,360,0,255),
					saturation=this.map(hsl.S,0,1,0,255),
					luminance=this.map(hsl.L,0,1,0,255);
				hue=posterize(hue, amount);
				saturation=posterize(saturation, amount);
				luminance=posterize(luminance, amount);
				hue=this.map(hue,0,255,0,360);
				saturation=this.map(saturation,0,255,0,1);
				luminance=this.map(luminance,0,255,0,1);
				var newrgb=HSL2RGB(hue,saturation,luminance);
				red=newrgb.R;
				green=newrgb.G;
				blue=newrgb.B;
			}
			alpha = posterize(alpha, amount);
			imageData.data[index] = red;
			imageData.data[index + 1] = green;
			imageData.data[index + 2] = blue;
			imageData.data[index + 3] = alpha;
		}
	}
	return this;
}
Chobi.prototype.primaryColor = function() {
	var imageData = this.imageData;
	for (var i = 0; i < imageData.width; i++) {
		for (var j = 0; j < imageData.height; j++) {
			var index = (j * 4) * imageData.width + (i * 4),
				red = imageData.data[index],
				green = imageData.data[index + 1],
				blue = imageData.data[index + 2];
			if(red==green&&green==blue) continue;
				// alpha = imageData.data[index + 3],
			var hue=RGB2HSL(red,green,blue).H;
			if(hue>=270||hue<90) red=255; else red=0;
			if(hue>=30&&hue<210) green=255; else green=0;
			if(hue>=150&&hue<330) blue=255; else blue=0;
			imageData.data[index] = red;
			imageData.data[index + 1] = green;
			imageData.data[index + 2] = blue;
		}
	}
	return this;
}

Chobi.prototype.watermark = function(img, q, x, y, width, height, callback) {
	var context = this;
	if (callback == "" || callback == null) {
		callback = function() {
			this.debugger("Watermark method expects a callback")
		}
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
	scnd.ready(function() {
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
Chobi.prototype.resize = function(width, height) {
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
Chobi.prototype.canvas = null;
Chobi.prototype.loadImageToCanvas = function(drawArea) {
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
Chobi.prototype.getImage = function() {
	var tmpCanvas = document.createElement('canvas');
	var tmpctx = tmpCanvas.getContext('2d');
	tmpCanvas.width = this.imageData.width;
	tmpCanvas.height = this.imageData.height;
	tmpctx.putImageData(this.imageData, 0, 0);
	var img = document.createElement("img");
	img.src = tmpCanvas.toDataURL("image/png");
	return img;
}
Chobi.prototype.crop = function(x, y, width, height) {
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
Chobi.prototype.vignette = function(scaleLevel) {
	if (scaleLevel == "" || scaleLevel == null) {
		scaleLevel = 0.1;
	}
	var imgCntX = this.imageData.width / 2;
	var imgCntY = this.imageData.height / 2;
	var maxDis = Math.sqrt((imgCntY * imgCntY) + (imgCntX * imgCntX));
	var dis = Math.sqrt(((this.imageData.width / 2 - i) * (this.imageData.width / 2 - i)) - ((this.imageData.height / 2 -
		j) * (this.imageData.height / 2 - j)));

	for (var i = 0; i < this.imageData.width; i++) {
		for (var j = 0; j < this.imageData.height; j++) {
			var mix = this.getColorAt(i, j);
			var dis = Math.sqrt(Math.floor(Math.pow(i - imgCntY, 2)) + Math.floor(Math.pow(j - imgCntX, 2)));
			mix.red = mix.red * (1 - (1 - scaleLevel) * (dis / maxDis));
			mix.green = mix.green * (1 - (1 - scaleLevel) * (dis / maxDis));
			mix.blue = mix.blue * (1 - (1 - scaleLevel) * (dis / maxDis));
			this.setColorAt(i, j, mix);
		}
	}
	return this;
}

Chobi.prototype.download = function(filename, filetype) {
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

function HSL2RGB(H = 0, S = 0, L = 0, stringMode = false) {
	H=H%360;
	S=restrict(S,0,1);
	L=restrict(L,0,1);
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

function restrict(x,min,max){
	if(min>max) [min,max]=[max,min];
	if(x<min) return min;
	if(x>max) return max;
	return x;
}