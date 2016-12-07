var canvas, ctx, w, h;
var meter = 0;
var level = 0;
var xp = 0;
var nextLevelXp = 100;
var fontsize = 14;
var colours = {
	bg  : "rgba("+0xAE+","+0xAE+","+0xAE+",1.0)",
	grey: "rgba("+0xEE+","+0xEE+","+0xEE+",0.25)",
	fg  : "rgba("+0xEE+","+0xEE+","+0xAE+",0.25)",
	blue: "rgba("+0x40+","+0x40+","+0xFF+",1.0)",
	meterBg:"rgba("+0xed+","+0xed+","+0xF0+",1.0)"
};

var drawXp = () => {
	//clear
	ctx.fillStyle = colours['bg'];
	ctx.fillRect( 700, 60, 100, fontsize+3 );
	//draw new
	ctx.strokeText("XP: "+xp,700,60+fontsize);

}

var changeXp = (amount) => {
	xp += amount;
	changeMeter(amount);
	drawXp();
}

var drawLevel = () => {
	//clear
	ctx.fillStyle = colours['bg'];
	ctx.fillRect( 700, 40, 100, fontsize+3 );
	//draw new
	ctx.strokeText("Level: "+level,700,40+fontsize);
}

var changeLevel = (change) => {
	nextLevelXp *= 1.1;
	level += change;
	drawLevel();
}

var changeMeter = (amount) => {
	meter += amount;
	if (meter > nextLevelXp-1){
		meter-=100;
		changeLevel(1);
	}
	drawMeter(meter);
}

var hitDetector = (x,y,shift,ctrl) => {
	//if on meter
	if (((x>700)&(x<790))&((y>10)&(y<40))) {
		if (shift){
			changeXp(10);
		} else {
			changeXp(1);
		}
	}
}

var clickInfo = (e) => {
	/* all to console
	for(let k in e) {
		console.log(k+" value "+e[k]);
	}//*/
	let x = e['offsetX'];
	let y = e['offsetY'];
	//meta
	let shift = e['shiftKey'];
	let ctrl = e['ctrlKey'];

	console.log("x = "+x+",y "+y);
	hitDetector(x,y,shift,ctrl);
}

var dragInfo = (e) => {
	//* all to console
	for(let k in e) {
		console.log(k+" value "+e[k]);
	}//*/
}


var drawMeter = (fill) => {
	if (fill > 100){fill = 100;}
	//workout percentage of bar to fill
	let percent = (fill/100)*80;
	//workout how much BG to draw;
	let bg = 785-(705+percent);
	if (bg > 0) {
		//draw meter background
		ctx.fillStyle = colours['meterBg'];
	    ctx.fillRect(705+percent,15,bg,20);
	}
	//draw meter fill
	ctx.fillStyle = colours["blue"];
	ctx.fillRect(705,15,percent,20);
}

var main = () => {
	ctx.fillStyle = colours['bg'];
	ctx.fillRect( 0, 0, w, h );
	//draw meter
	ctx.fillStyle = colours['fg'];
	ctx.fillRect(700,10,90,30);

	changeLevel(level)
	changeXp(xp);
}

var init = () => {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	w = canvas.width;
	h = canvas.height;
	ctx.font=fontsize+"px mono-space";
	//debug, get click
	canvas.onclick = clickInfo;
	canvas.ondrag = dragInfo;
	main();
}