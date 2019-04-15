var cnv;
var x = 0;
var y = 0;
var prvX = 0;
var prvY = 0;
var d = 0.00005;

var ax = 150;
var wx = 12;
var px = 7;

var ay = 150;
var wy = 6;
var py = 27;

var as = 150;
var ws = 8;
var ps = 3;

var prvax = 0;
var prvay = 0;
var prvas = 0;
var pt = 0;

var sliderax;
var sliderpx;
var sliderwx;
var slideray;
var sliderpy;
var sliderwy;
var slideras;
var sliderps;
var sliderws;


function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    centerCanvas();
    angleMode(DEGREES);

    sliderax = document.getElementById("sliderax");
    sliderpx = document.getElementById("sliderpx");
    sliderwx = document.getElementById("sliderwx");
    slideray = document.getElementById("slideray");
    sliderpy = document.getElementById("sliderpy");
    sliderwy = document.getElementById("sliderwy");
    slideras = document.getElementById("sliderps");
    sliderps = document.getElementById("sliderps");
    sliderws = document.getElementById("sliderws");

    prvX = x;
    prvY = y;
    prvax = ax;
    prvay = ay;
    prvas = as;

}

function draw() {

    //    background(255);
    fill(0);
    strokeWeight(1);
    //    noStroke():

    ax = sliderax.value;
    px = sliderpx.value;
    wx = sliderwx.value;

    ay = slideray.value;
    py = sliderpy.value;
    wy = sliderwy.value;

    as = slideras.value;
    ps = sliderps.value;
    ws = sliderws.value;

    translate(width/2, height/2);
    t  = pt + 0.1;

    ax = prvax * (1 - d);
    ay = prvay * (1 - d);
    as = prvas * (1 - d);

    x = ax * sin(wx * t + px) + as * sin(ws * t + ps);
    y = ay * sin(wy * t + py);

    line(prvX, prvY, x, y);
//    point( x, y);

    prvX = x;
    prvY = y;
    prvax = ax;
    prvay = ay;
    prvas = as;
    pt = t;
}

function saveF() {
    saveCanvas(cnv, 'phyllotaxis_' + frameCount, 'jpg');
}

function reset() {
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

