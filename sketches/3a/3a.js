var c = false; //	swicth color mode
var num = 3; 
var numl = 0; 

var x = 0; //	number of shapes
var y = 0; //	number of shapes
var xx = 0; //	number of shapes
var yy = 0; //	number of shapes
var xl = 0; //	number of shapes
var yl = 0; //	number of shapes
var a = 0; //	number of shapes
var aa = 0; //	number of shapes
var al = 0; //	number of shapes
var t1 = 0; //	number of shapes
var t2 = 0; //	number of shapes
var h = 0; //	number of shapes
var ih = 1; //	number of shapes
var mn = 4;

function setup() {

	cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent('sketch-holder');
	centerCanvas();
	background(0);
	fill(196, 1.5);
	strokeWeight(0.5);
	document.getElementById("sk_title").style.color = "white";
    
}

function draw() {
	if (millis() - t1 > random(7000, 15000)) {
		a = random(-TWO_PI, TWO_PI);
		xx = random(-600, 600);
		yy = random(-600, 600);
		t1 = millis();
	}
	if (millis() - t2 < 1000) {
		c = true;
	} else {
		c = false;
	}
	if (millis() - t2 > random(15000, 35000)) {
		num = int(random(0, mn));
		xx = random(-600, 600);
		yy = random(-600, 600);
		t2 = millis();
	}
	if (c) {
		colorMode(HSB, 255);
		stroke(h, 255, 255);
		h += ih;
		if (h > 255 || h < 0) ih = -ih;
	} else {
		stroke(0);
	}
	translate(width / 2, height / 2);
	rotate(al);
	for (var b = 0; b < TWO_PI; b += TWO_PI / numl) {
		push();
		rotate(b);
		for (var n = 0; n < 2; n++) {
//			curve( xl, -xl,n * 300, xl / yl, 0, yl, xl , -xl);
			curve(n * 300, xl / yl, n*xl, -xl, 0, yl, xl , -xl);
		}
		pop();
	}
	xl = lerp(xl, xx, 0.001);
	yl = lerp(yl, yy, 0.01);
	numl = lerp(numl, num, 0.001);
	al = lerp(al, a, 0.001);
}
function mousePressed() {
	num = int(random(1, 4));
	a = random(-TWO_PI, TWO_PI);
	xx = random(-600, 600);
	yy = random(-600, 600);
}
function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = ((windowHeight - height) / 2);
	cnv.position(x, y);
}
function windowResized() {
	centerCanvas();
}
function restart() {
	background(0);
	num = int(random(0, mn));
}
function saveF() {
	saveCanvas(cnv, 'supershape_' + frameCount, 'jpg');
}
