var gui;

var BG_color = '#292929';
var FG_color = '#00CCFF';
var vectors = false;
var scl = 20;
var dots = 300;
var inc = 0.05;
var incz = 0.0003;
var opacity = 15;
var zoff = 0;
var cols, rows;
var visualization = ['vectors','particles','tracking'];
var particles = [];
var flowfield = [];

function setup() {

		createCanvas(windowWidth, windowHeight);
//	createCanvas(800, 400);
	background(BG_color);
	colorMode(HSB,255);
	gui = createGui('flow field');
	gui.addGlobals('BG_color', 'FG_color','visualization');
	sliderRange(10, 2000, 10);
	gui.addGlobals('dots');
	sliderRange(0, 0.3, 0.001);
	gui.addGlobals('inc');
	sliderRange(0, 0.001, 0.00001);
	gui.addGlobals('incz','drawing');

	cols = floor(width / scl);
	rows = floor(height / scl);

	flowfield = new Array(cols * rows);
	for (var i = 0; i < 2001; i++) {
		particles[i] = new Particle();
	}
}

function draw() {

	if(vectors == true){
		background(BG_color);
	}

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

			if(vectors == true){		

				var c = color(FG_color);
				stroke(hue(c), saturation(c), noise(angle * zoff)*brightness(c));
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

	switch(visualization) {

		case 'vectors':
			vectors = true;
			break;

		case 'particles':
			vectors = false;
			background(BG_color);
			var c = color(FG_color);
			stroke(noise(angle*zoff)*hue(c), saturation(c), brightness(c));
			particals();
			break;

		case 'tracking':
			vectors = false;
			var c = color(FG_color);
			stroke(hue(c), noise(angle*zoff)*	saturation(c), brightness(c),noise(angle=zoff)*10);
			strokeWeight(1);
			particals();
			break;
	}
}

function particals(){
	for (var i = 0; i < dots; i++) {
		particles[i].follow(flowfield);
		particles[i].update();
		particles[i].edges();
		particles[i].show();
	}	
}

