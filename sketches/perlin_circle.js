var vertexNum = 3;
var force = 50;
var crvColor = '#FFFFFF';
var first = true;
var bg;
var gui;
var visible = true;

function setup() {

    bg = loadImage("bg3.png");
    imageMode(CENTER);

    createCanvas(windowWidth, windowHeight);
    background(bg);

    buttonM = createButton('menu');
	buttonM.position(29, height - 100);
	buttonM.mousePressed(menu);
    
	button = createButton('reset');
	button.position(89, height - 100);
	button.mousePressed(reset);

	gui = createGui('||||||||');
	sliderRange(0, 1024, 1);
	gui.addGlobals('crvColor','force');
	sliderRange(3, 21, 1);
	gui.addGlobals('vertexNum','tracking');
    background(bg);

    reset();
    gui.hide();
    first = true;
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
function menu() {
  
         visible = !visible;
      if(visible) gui.show(); else gui.hide();
  
}
 
// clear screen, refresh background, keep settings
function reset() {
	background(bg);
}
