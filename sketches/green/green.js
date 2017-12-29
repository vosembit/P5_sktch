var x = 0;
var y = 0;
var t1 = 0;
var c;

function setup() {

    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    colorMode(HSB, 255);
    centerCanvas();
}

function draw() {

    if (millis() - t1 > 500) {
        c = color(random(255), 255, 255);
        background(c);
    }
    t1 = millis();

}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = ((windowHeight - height) / 2);
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}
