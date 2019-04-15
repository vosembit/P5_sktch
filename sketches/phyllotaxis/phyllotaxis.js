var c = 6;
var n = 0;
var ang = 137.3;
var cnv;

function setup() {
    cnv = createCanvas(600, 600);
    cnv.parent('sketch-holder');
    centerCanvas();
    angleMode(DEGREES);
    background(255);
}

function draw() {
    translate(width / 2, height / 2);
    noFill();
    strokeWeight(3);

    beginShape(POINTS);
    for (var i = 0; i < 10; i++) {
        var a = n * ang;
        var r = c * sqrt(n);
        var x = r * cos(a);
        var y = r * sin(a);
        n++;
        vertex(x, y);
    }
    endShape(CLOSE);
}

function ang1() {
    n = 0;
    background(255);
    ang = 137.5;
}

function ang2() {
    n = 0;
    background(255);
    ang = 137.3;
}

function ang3() {
    n = 0;
    background(255);
    ang = 137.6;
}

function saveF() {
    saveCanvas(cnv, 'phyllotaxis_' + frameCount, 'jpg');
}

function reset() {
    n = 0;
    background(255);
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = ((windowHeight - height) / 2);
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}
