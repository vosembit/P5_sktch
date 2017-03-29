var m = 5;
var r = 1;
var a = 1;
var b = 1;
var n1 = 0.3;
var n2 = 0.3;
var n3 = 0.3;
var radius = 200;
var total = 500;
var cnv, slider, pxm, xm;

function setup() {
	cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent('sketch-holder');
	centerCanvas();
	slider = document.getElementById("slider");
}

function supershape(theta) {
	var p1 = (1 / a) * cos(theta * m / 4)
	p1 = abs(p1);
	p1 = pow(p1, n2);
	var p2 = (1 / b) * sin(theta * m / 4)
	p2 = abs(p2);
	p2 = pow(p2, n3);
	var p3 = pow(p1 + p2, 1 / n1);
	if (p3 === 0) return 0;
	return (1 / p3);
}

function draw() {
	background(255);
	translate(width / 2, height / 2);
	fill(0);
	noFill();
	strokeWeight(4);
	stroke(0);
	xm = slider.value;
	if (xm != pxm) {
		m = xm;
		pxm = xm;
	}
	var inc = TWO_PI / total;
	beginShape();
	for (var angle = 0; angle < TWO_PI; angle += inc) {
		var r = supershape(angle);
		var x = radius * r * cos(angle);
		var y = radius * r * sin(angle);
		vertex(x, y);
	}
	endShape(CLOSE);
}

function symm() {
	var mm = floor(random(1, 7));
	switch (mm) {
		case 1:
			m = 7;
			n1 = 3;
			n2 = 6;
			n3 = 6;
			break;
		case 2:
			m = 7;
			n1 = 3;
			n2 = 4;
			n3 = 17;
			break;
		case 3:
			m = 4;
			n1 = 2;
			n2 = 4;
			n3 = 13;
			break;
		case 4:
			m = 6;
			n1 = 20;
			n2 = 7;
			n3 = 18;
			break;
		case 5:
			m = 3;
			n1 = 5;
			n2 = 18;
			n3 = 18;
			break;
		case 6:
			m = 5;
			n1 = 0.3;
			n2 = 0.3;
			n3 = 0.3;
			break;
	}
}

function shp() {
	m = floor(random(0.1, 10));
	n1 = floor(random(1, 100));
	n2 = floor(random(1, 100));
	n3 = floor(random(1, 100));
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
	saveCanvas(cnv, 'supershape_' + frameCount, 'jpg');
}
