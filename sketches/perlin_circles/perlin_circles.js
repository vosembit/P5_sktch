var vertexNum = 3;
var force = 70;
var inc = 1;
var crvColor = '#49acf5';
var visible = false;
var bgcol = true;
var gui, cnv;


function setup() {
	cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent('sketch-holder');
	centerCanvas();
	gui = createGui('||||||||');
	sliderRange(0, 1024, 1);
	gui.addGlobals('crvColor', 'force');
	sliderRange(3, 21, 1);
	gui.addGlobals('vertexNum', 'tracking');
	reset();
	gui.hide();
}

function draw() {
	strokeWeight(map(noise(frameCount * 0.02 + 10000), 0, 1, 0.1, 1));
	var c = color(crvColor);
	colorMode(HSB, 255);
	translate(width / 2, height / 2);
	beginShape();
	var angleStep = TWO_PI / vertexNum;
	for (var i = 0; i < vertexNum; i++) {
		var radious = height / 4 + map(noise(frameCount * 0.01 + i * 100), 0, 1, -force, force);
		stroke(inc, map(noise(frameCount * 0.02 + 100), 0, 1, 0, 255), brightness(c), 20);
		noFill();
		curveVertex(radious * cos(angleStep * i), radious * sin(angleStep * i));
	}
	for (var i = 0; i < 3; i++) {
		var radious = height / 4 + map(noise(frameCount * 0.01 + i * 100), 0, 1, -force, force);
		curveVertex(radious * cos(angleStep * i), radious * sin(angleStep * i));
	}
	endShape();
	inc = hue(c) + 0.1;
}

function menu() {
	visible = !visible;
	if (visible) gui.show();
	else gui.hide();
}

function reset() {
	if (bgcol == true) background("#fff");
	else background("#333");
}

function bg_inverse() {
	bgcol = !bgcol;
	reset();
	if (bgcol == true) {
		document.body.style.backgroundColor = "#fff";
		document.getElementById("sk_title").style.color = "black";
	} else {
		document.body.style.backgroundColor = "#333";
		document.getElementById("sk_title").style.color = "white";
	}
}

function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = ((windowHeight - height) / 2) - 100;
	cnv.position(x, y);
}

function windowResized() {
	centerCanvas();
}

function saveF() {
	saveCanvas(cnv, 'ellipsoide' + frameCount, 'jpg');
}
