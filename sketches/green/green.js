var x = 0;
var y = 0;
var t1 = 0;
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
    //    if (millis() - t1 > 500) {
    //        c = color(random(255), 255, random(255));
    //        background(c);
    //        t1 = millis();
    //    }
    //    if (millis() - t2 > 500) {
    //        c = color(random(255), 255, 255);
    //        background(c);
    //        t2 = millis();
    //    }
    if (millis() - t2 > 500) {
        c = random(255);
        for (var i = 0; i < 255; i++) {
            var x = color(c, 255, i);
            background(x);
        }
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
