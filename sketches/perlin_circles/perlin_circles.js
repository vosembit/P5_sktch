var vertexNum = 3;
var force = 30;
var inc = 1;
var crvColor = '#49acf5';
var visible = false;
var bgcol = false;
var gui, cnv;
var rr = 0;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    centerCanvas();
    gui = createGui('||||||||');
    sliderRange(0, 1024, 1);
    gui.addGlobals('crvColor', 'force');
    sliderRange(3, 21, 1);
    gui.addGlobals('vertexNum', 'tracking');
    reset();
    gui.hide();
    colorMode(HSB, 255);

}

function draw() {
    var c = color(crvColor);
    strokeWeight(map(noise(frameCount * 0.02 + 10000), 0, 1, 0.1, 1));
    stroke(inc, map(noise(frameCount * 0.02 + 100), 0, 1, 0, 255), brightness(c), 20);
    noFill();
    translate(width / 2, height / 2);
//    rotate(rr * 0.01);

    beginShape();
    var angleStep = TWO_PI / vertexNum;
    for (var i = 0; i < vertexNum; i++) {
        var radious = map(noise(frameCount * 0.01 + i * 100), 0, 1, -force - rr * 0.1, force + rr * 0.1) + rr * 0.3;
        curveVertex(radious * cos(angleStep * i), radious * sin(angleStep * i));
    }
    for (var i = 0; i < 3; i++) {
        var radious = map(noise(frameCount * 0.01 + i * 100), 0, 1, -force - rr * 0.1, force + rr * 0.1) + rr * 0.3;
        curveVertex(radious * cos(angleStep * i), radious * sin(angleStep * i));
    }
    endShape();
    inc = hue(c) + 0.2;
    rr++;
}

function menu() {
    visible = !visible;
    if (visible) gui.show();
    else gui.hide();
}

function reset() {
    if (bgcol == true) {

    } else {
        background("#333");
    }
}

function bg_inverse() {
    bgcol = !bgcol;
    reset();
    if (bgcol == true) {
        document.body.style.backgroundColor = "#fff";
        document.getElementById("sk_title").style.color = "black";
    } else {
        document.body.style.backgroundColor = "#333";
        document.getElementById("sk_title").style.color = "white";
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

function saveF() {
    saveCanvas(cnv, 'ellipsoide' + frameCount, 'jpg');
}
