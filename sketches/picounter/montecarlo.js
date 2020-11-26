var diam = 0;
var x = 30;
var y = 25;
var dst = 0;

var elrad = 5;
var span = 20;

var cir = 0;
var pee = 0;
var tot = 0;

var med = 0;
var sum = 0;
var val = 0;
var del = 0;
var chk = 0;
var result;


var bg;
var impact;
var roboto;

function preload() {
    bg = loadImage('p5/sketches/picounter/data/bg.jpg');
    impact = loadFont('p5/sketches/picounter/data/impact.ttf');
    roboto = loadFont('p5/sketches/picounter/data/roboto.ttf');
}


function setup() {
    background(255);
    ellipseMode(CENTER);
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.id("mycanvas");
    image(bg, 0, 0);
    if (windowHeight < windowWidth) {
        diam = windowHeight - 200;
    } else {
        diam = windowWidth - 200;

    }
}

function draw() {
    background(bg);
    monte();
    branding();
    counters();
    ui();
}

function ui() {
    noFill();
    stroke(127);
    ellipse(-width / 2 + span * 2, height / 2 - 60, 30, 30);
    ellipse(-width / 2 + span * 4, height / 2 - 60, 30, 30);
    ellipse(-width / 2 + span * 6, height / 2 - 60, 30, 30);
}

function branding() {
    fill(255);
    noStroke();
    textSize(24);
    text("||||||||", -width / 2 + span, -height / 2 + 60);
    textSize(14);
    fill(127);
    text("vosembit.github.io/p5/index.html", -width / 2 + 100, -height / 2 + 60);
    push();
    translate(-width / 2 + 130, -height / 3);
    rotate(PI / 2);
    fill(127);
    text("Generative data vizualisation.      St. Petersburg, 2019", 100, 100);
    pop();
}

function counters() {
    stroke(255);
    strokeWeight(2);
    line(diam / 2 + span, -diam / 2, diam / 2 + span, -diam / 2.6);
    fill(255);
    noStroke();
    textSize(diam / 7);
    textFont(impact);
    text("Pi: " + chk.toFixed(5), -diam * 0.7, diam / 14);
    textSize(24);
    textFont(roboto);
    text("TOTAL: " + tot, diam / 2 + span * 2, -diam / 2 + 20);
    text("OUT: " + (tot - cir), diam / 2 + span * 2, -diam / 2 + 50);
    text("IN: " + cir, diam / 2 + span * 2, -diam / 2 + 80);
    textSize(14);
    text("x = " + x.toFixed(9), -diam / 2, diam / 2 + span * 2);
    text("y = " + y.toFixed(9), -diam / 3.2, diam / 2 + span * 2);
    textSize(14);
    fill(127);
    text("raw Pi: " + pee, diam / 2 + span, diam / 3 + 20);
    text("median Pi: " + med, diam / 2 + span, diam / 3 + 50);
    text("efficiency: " + (100 - abs(PI / 100 * med)) + "%", diam / 2 + span, diam / 3 + 80);
}


function monte() {
    noFill();
    stroke(25);
    translate(width / 2, height / 2);
    for (var i = 0; i < 2000; i++) {
        x = random(-diam / 2, diam / 2);
        y = random(-diam / 2, diam / 2);
        dst = sqrt((x * x) + (y * y));
        if (dst < diam / 2) {
            fill(255, 255, 255);
            cir++;
        } else {
            fill(255, 0, 0);
        }
        tot++;
        pee = (cir / tot) * 4;
        chk = median();
        ellipse(x, y, elrad, elrad);
    }
}

function median() {
    sum = sum + pee;
    del = sum / tot / tot;
    if (pee < med) {
        med = med - del;
    } else {
        med = med + del;
    }
    return med;
}
