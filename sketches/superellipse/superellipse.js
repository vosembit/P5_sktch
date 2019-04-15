var total = 30;
var r = 300;
var globe;

var a = 1;
var b = 1;

var am = [8, 7, 2, 5.7, 0.2, 6];
var an1 = [60, 0.2, 1, 30, 0.1, 60];
var an2 = [100, 1.7, 1, 30, 1.7, 55];
var an3 = [3, 1.7, 1, 30, 1.7, 1000];

var bm = [2, 7, 4, 10, 2, 6, 6];
var bn1 = [10, 0.2, 1, 3, 0.5, 250, 250];
var bn2 = [10, 1.7, 1, 0.2, 0.2, 100, 100];
var bn3 = [10, 1.7, 1, 1, 0.2, 100, 100];

var aam = 0;
var aan1 = 0;
var aan2 = 0;
var aan3 = 0;

var bbm = 0;
var bbn1 = 0;
var bbn2 = 0;
var bbn3 = 0;

var x = 0;
var sinm = 0;

var mchange = 0;
var offset = 0;

var rtx = 0;
var mrtx = 0;
var mrty = 0;

xxx();

function setup() {
    cnv = createCanvas(windowWidth, windowHeight, WEBGL);
    cnv.parent('sketch-holder');
    colorMode(HSB);
    globe = new Array((total + 1) * (total + 1));
    background(0);

    x = 0;
    mchange = 0;

    aam = map(sin(mchange), -1, 1, 0, am[x]);
    aan1 = an1[x];
    aan2 = an2[x];
    aan3 = an3[x];

    bbm = map(sin(mchange), -1, 1, 0, bm[x]);
    bbn1 = bn1[x];
    bbn2 = bn2[x];
    bbn3 = bn3[x];

}

function xxx() {
    var sinm = Math.sin(mchange);
    if (sinm < -0.99995) {
        x++;
        console.log("yep" + x);
        if (x > am.length - 1) {
            x = 0;
        }
    }
    aam = am[x];
    aan1 = an1[x];
    aan2 = an2[x];
    aan3 = an3[x];

    bbm = bm[x];
    bbn1 = bn1[x];
    bbn2 = bn2[x];
    bbn3 = bn3[x];
}


function draw() {
    noStroke();
    noFill();

    offset += 2;
    mchange += 0.02;

    rtx += 0.004;
    rotateY(mrty + rtx);
    rotateX(mrtx);

    xxx();

    for (var i = 0; i < total + 1; i++) {
        var lat = map(i, 0, total, -HALF_PI, HALF_PI);
        var r2 = supershape(lat, map(sin(mchange), -1, 1, 0, bbm), bbn1, bbn2, bbn3);
        for (var j = 0; j < total + 1; j++) {
            var lon = map(j, 0, total, -PI, PI);
            var r1 = supershape(lon, map(sin(mchange), -1, 1, 0, aam), aan1, aan2, aan3);
            var x = r * r1 * cos(lon) * r2 * cos(lat);
            var y = r * r1 * sin(lon) * r2 * cos(lat);
            var z = r * r2 * sin(lat);
            var index = i + j * (total + 1);
            globe[index] = createVector(x, y, z);
        }
    }

    for (var i = 0; i < total; i++) {
        var hu = map(i, 0, total, 0, 255 * 2);
        fill((hu + offset) % 255, 255, (hu + offset) % 255);
        for (var j = 0; j < total + 1; j++) {
            var index = i + j * (total + 1);
            var v = globe[index];
            push();
            translate(v.x, v.y, v.z);
            sphere(1);
            pop();

        }
    }
}

function mouseDragged() {
    mrtx = mouseY * 0.01;
    mrty = mouseX * 0.01;
}

function supershape(theta, m, n1, n2, n3) {
    var t1 = abs((1 / a) * cos(m * theta / 4));
    t1 = pow(t1, n2);
    var t2 = abs((1 / b) * sin(m * theta / 4));
    t2 = pow(t2, n3);
    var t3 = t1 + t2;
    var r = pow(t3, -1 / n1);
    return r;
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = ((windowHeight - height) / 2) - 100;
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}
