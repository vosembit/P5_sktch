var x = 0;
var y = 0;
var t2 = 0;
var c;

function setup() {

    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    colorMode(HSB, 255);
    centerCanvas();
    c = color(32, 255, 255);
    background(c);
}

function draw() {

    if (millis() - t2 > 500) {
        background(random(255),255,255);
        t2 = millis();
    }
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = ((windowHeight - height) / 2);
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}
