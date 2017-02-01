var vertexNum = 7;
var force = 50;
var bgColor = '#e1e1e1';
var crvColor = '#232323';

function setup() {

	createCanvas(windowWidth, windowHeight);
	background(bgColor);

	button = createButton('reset');
	button.position(19, height - 100);
	button.mousePressed(reset);

	button2 = createButton('save');
	button2.position(69, height - 100);
	button2.mousePressed(save);

	gui = createGui('||||||||');
	sliderRange(0, 1024, 1);
	gui.addGlobals('crvColor','bgColor','force');
	sliderRange(4, 64, 1);
	gui.addGlobals('vertexNum','tracking');

}

function draw() {
	
	strokeWeight(map(noise(frameCount * 0.02 + 10000), 0, 1, 0.1, 1));
	var c = color(crvColor);
	stroke(red(c),green(c),blue(c),10);
	noFill();	

	// drawing curves as ellipse with noise on radious
	translate(width / 2, height / 2);
	beginShape();
	var angleStep = TWO_PI / vertexNum;
	for(var i = 0; i < vertexNum; i++){
		var radious = height / 4 + map(noise(frameCount * 0.01 + i * 100), 0, 1, -force, force);
		curveVertex(radious * cos(angleStep * i), radious * sin(angleStep * i)); 
	}
	for(var i = 0; i < 3; i++){
		var radious = height / 4 + map(noise(frameCount * 0.01 + i * 100), 0, 1, -force, force);
		curveVertex(radious * cos(angleStep * i), radious * sin(angleStep * i)); 
	}
	endShape();

}

// clear screen, refresh background, keep settings
function reset() {
	background(bgColor);
}

// save screen
function save() {
	save('myCanvas.jpg');
}