var vertexNum = 3;
var force = 70;
var crvColor = '#49acf5';
var first = true;
var bg;
var gui;
var visible = false;
var myP;
var inc = 1;
var img;
var myLink, myL;


function preload() {
  img = loadImage("img/bg3.png");
}


function setup() {

//    bg = loadImage("img/bg3.png");
    
    createCanvas(windowWidth, windowHeight);
    
    bg = loadImage("img/bg3.png");
    imageMode(CORNERS);
    image(img, 0, 0,width,height);
    imageMode(CENTER);
    background(bg);
    
    myL = createP('||||||||');
    myL.position(30,  40);
    
    myP = createP('VERTEX PAINTER v0.2');
    myP.position(30,  60);
    
//    myLink = createA('https://vosembit.github.io/p5/', '<< go back');
//    myLink.position(29,  100);
    
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
    

//    reset();
    gui.hide();
    first = true;

    
    }

function draw() {

    if(first){
        textSize(12);
        noStroke();
        fill(96);
        text("||||||||      vosembit.gigthub.io", width-200, height - 80);
        first = false;
    }
    
    strokeWeight(map(noise(frameCount * 0.02 + 10000), 0, 1, 0.1, 1));
	var c = color(crvColor);
    
    colorMode(HSB, 255);
    

	// drawing curves as ellipse with noise on radious
	translate(width / 2, height / 2);
	beginShape();
	var angleStep = TWO_PI / vertexNum;
	for(var i = 0; i < vertexNum; i++){
		var radious = height / 4 + map(noise(frameCount * 0.01 + i * 100), 0, 1, -force, force);
        stroke(inc,map(noise(frameCount * 0.02 + 100), 0, 1, 0,255),brightness(c),20);
	   noFill();
		curveVertex(radious * cos(angleStep * i), radious * sin(angleStep * i)); 
	}
	for(var i = 0; i < 3; i++){
		var radious = height / 4 + map(noise(frameCount * 0.01 + i * 100), 0, 1, -force, force);
		curveVertex(radious * cos(angleStep * i), radious * sin(angleStep * i)); 
	}
	endShape();
    inc = hue(c)+0.1;
}

function menu() {
    visible = !visible;
    if(visible) gui.show(); else gui.hide();
}
 
function reset() {   
	background(bg);
    first = true;
    
}
