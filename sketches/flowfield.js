var gui;

var BG_color = '#292929';
var FG_color = '#FFFFFF';
var vectors = false;
var scl = 40;
var dots = 300;
var inc = 0.05;
var incz = 0.0003;
var opacity = 15;
var zoff = 0;
var visible = false;
var cols, rows;
var visualization = ['particles','vectors','tracking'];
var particles = [];
var flowfield = [];
var first = true;

function setup() {

		createCanvas(windowWidth, windowHeight);
    
    myL = createP('||||||||');
    myL.position(30,  40);
    
    myP = createP('FLOW FIELD v0.3');
    myP.position(30,  60);
    
        buttonM = createButton('menu');
	buttonM.position(29, height - 100);
	buttonM.mousePressed(menu);
    
	button = createButton('reset');
	button.position(89, height - 100);
	button.mousePressed(reset);
    
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

        if(first){
        textSize(12);
        noStroke();
        fill(96);
        text("||||||||      vosembit.gigthub.io", width-200, height - 80);
        first = false;
    }
    
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
				stroke(hue(c), saturation(c),brightness(c));
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

		case 'particles':
			vectors = false;
			background(BG_color);
            var c = color(FG_color);
            stroke(hue(c), saturation(c), brightness(c));
			particals();
			break;
            
        case 'vectors':
			vectors = true;
			break;

		case 'tracking':
			vectors = false;
			var c = color(FG_color);
			stroke(hue(c), saturation(c), brightness(c),noise(zoff)*20);
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


function menu() {
    visible = !visible;
    if(visible) gui.show(); else gui.hide();
}
 
function reset() {   
	background(BG_color);
    first = true;
    
}
