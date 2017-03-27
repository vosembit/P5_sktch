var c = 6;
var n = 0;
var ang = 137.5;
var cnv;

function setup() {
	cnv = createCanvas(700, 700);
	cnv.parent('sketch-holder');
	centerCanvas();
	angleMode(DEGREES);
	colorMode(HSB);
}

function draw() {
	translate(width / 2, height / 2);
	noStroke();
	var a = n * ang;
	var r = c * sqrt(n);
	var x = r * cos(a);
	var y = r * sin(a);
	fill(0);
	ellipse(x, y, 3, 3);
	n++;
}

function ang1() { ang = 137.5;}
function ang2() { ang = 137.3;}
function ang3() { ang = 137.6;}

function saveF()	{
	saveCanvas(cnv,'phyllotaxis_' + frameCount, 'jpg');
}

function reset() {
	n = 0;
	background(255);
}

function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = ((windowHeight - height) / 2) - 100;
	cnv.position(x, y);
}

function windowResized() {
	centerCanvas();
}


