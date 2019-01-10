var x = 0.01;
var y = 0;
var z = 0;

var dx = 0;
var dy = 0;
var dz = 0;

var a = 10;
var b = 24.06;
var c = 8.0 / 3.0;

var nx = [];
var ny = [];
var nz = [];

var nhu = [];
var hu = 0;
var rthu = 0;

var rtx = 0;
var mrtx = 0;
var mrty = 0;
var msc = 10;

var inf = false;



function setup() {
    cnv = createCanvas(windowWidth, windowHeight, WEBGL);
    cnv.parent('sketch-holder');
    colorMode(HSB);
}

function draw() {
    background(0);
    lore();
    noFill();
    rtx += 0.004;
    rthu += 0.01;
    scale(msc);
    rotateY(mrty + rtx);
    rotateX(mrtx);
    ambientLight(255);

    for (var i = 0; i < nx.length; i++) {
        ambientMaterial(nhu[i], 250, 250);
        push();
        translate(nx[i], ny[i], nz[i]);
        sphere(0.1);
        pop();
        push();
        translate(-nx[i], -ny[i], -nz[i]);
        sphere(0.1);
        pop();
    }
}

function mouseDragged() {
    msc = map(mouseX, 0, width, 1, 50);
    mrtx = mouseY * 0.01;
    mrty = mouseX * 0.01;
}


function lore() {
    var dt = 0.01;
    dx = (a * (y - x)) * dt;
    dy = (x * (b - z) - y) * dt;
    dz = (x * y - c * z) * dt;
    x = x + dx;
    y = y + dy;
    z = z + dz;
    hu = sin(rthu);
    var maphu = map(hu, -1, 1, 0, 255);
    nhu.push(maphu);
    nx.push(x);
    ny.push(y);
    nz.push(z);
    if (inf) {
        if (nx.length > 150) {
            nx.splice(0, 1);
            ny.splice(0, 1);
            nz.splice(0, 1);
        }
    }
}

function infi() {
    inf = !inf;
    x = 0.01;
    y = 0;
    z = 0;
    nx = [];
    ny = [];
    nz = [];
}


function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = ((windowHeight - height) / 2) - 100;
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}
