var gui;
var BG_color = '#ffffff';
var FG_color = '#000000';
var vectors = false;
var scl = 40;
var dots = 1500;
var inc = 0.05;
var incz = 0.0003;
var opacity = 15;
var zoff = 0;
var visible = false;
var cols, rows;
var visualization = ['particles', 'vectors', 'tracking'];
var particles = [];
var flowfield = [];
var first = true;
var inverse = false;

function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = ((windowHeight - height) / 2);
	cnv.position(x, y);
}

function setup() {

	cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent('sketch-holder');
	centerCanvas();

	background(BG_color);
	colorMode(HSB, 255);
	gui = createGui('flow field');
	gui.addGlobals('visualization');
	sliderRange(10, 2000, 10);
	gui.addGlobals('dots');
	sliderRange(0, 0.3, 0.001);
	gui.addGlobals('inc');
	sliderRange(0, 0.001, 0.00001);
	gui.addGlobals('incz', 'drawing');
	gui.hide();
	first = true;
	cols = floor(width / scl);
	rows = floor(height / scl);

	flowfield = new Array(cols * rows);
	for (var i = 0; i < 2001; i++) {
		particles[i] = new Particle();
	}

}

function draw() {

	var yoff = 0;
	for (var y = 0; y < rows; y++) {
		var xoff = 0;
		for (var x = 0; x < cols; x++) {
			var index = x + y * cols;
			var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
			var v = p5.Vector.fromAngle(angle);
			v.setMag(0.1);
			flowfield[index] = v;
			xoff += inc;

			if (vectors == true) {
				var c = color(FG_color);
				stroke(hue(c), saturation(c), brightness(c));
				strokeWeight(1);
				push();
				translate(x * scl, y * scl);
				rotate(v.heading());
				line(0, 0, scl, 0);
				pop();
			}
		}
		yoff += inc;
		zoff += incz;
	}

	switch (visualization) {

		case 'particles':
			vectors = false;
			background(BG_color);
			var c = color(FG_color);
			stroke(hue(c), saturation(c), brightness(c));
			particals();
			break;

		case 'vectors':
			vectors = true;
			background(BG_color);
			break;

		case 'tracking':
			vectors = false;
			var c = color(FG_color);
			stroke(hue(c), saturation(c), brightness(c), noise(zoff) * 20);
			strokeWeight(1);
			particals();
			break;
	}
}

function particals() {
	for (var i = 0; i < dots; i++) {
		particles[i].follow(flowfield);
		particles[i].update();
		particles[i].edges();
		particles[i].show();
	}
}


function menu() {
	visible = !visible;
	if (visible) gui.show();
	else gui.hide();
}

function reset() {
	if (inverse == true) background(BG_color);
	else background(BG_color);
		flowfield = new Array(cols * rows);
	for (var i = 0; i < 2001; i++) {
		particles[i] = new Particle();
	}
}

function bg_inverse() {
	inverse = !inverse;
	if (inverse == true) {
		BG_color = '#333333';
		FG_color = '#FFFFFF';
		document.body.style.backgroundColor = BG_color;
		document.getElementById("sk_title").style.color = FG_color;
	} else {
		BG_color = '#FFFFFF';
		FG_color = '#333333';
		document.body.style.backgroundColor = BG_color;
		document.getElementById("sk_title").style.color = FG_color;
	}
	reset();
}

function windowResized() {
	centerCanvas();
}

function saveF() {
	saveCanvas(cnv, 'flow_' + frameCount, 'jpg');
}
