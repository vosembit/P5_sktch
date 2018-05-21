// determine orbit distance from sun
var baseOrbit = 120;
var merOrbit = (0.9 * baseOrbit) / 2;
var venOrbit = (1.2 * baseOrbit) / 2;
var earOrbit = (1.55 * baseOrbit) / 2;
var marOrbit = (1.9 * baseOrbit) / 2;
var jupOrbit = (2.7 * baseOrbit) / 2;
var satOrbit = (3.7 * baseOrbit) / 2;
var uraOrbit = (4.6 * baseOrbit) / 2;
var nepOrbit = (5.3 * baseOrbit) / 2;

var baseSize = 8;

// determine orbit distance from sun
var baseOrbit = 120 * 4;
var merOrbit = (0.9 * baseOrbit) / 2;
var venOrbit = (1.2 * baseOrbit) / 2;
var earOrbit = (1.55 * baseOrbit) / 2;
var marOrbit = (1.9 * baseOrbit) / 2;
var jupOrbit = (2.7 * baseOrbit) / 2;
var satOrbit = (3.7 * baseOrbit) / 2;
var uraOrbit = (4.6 * baseOrbit) / 2;
var nepOrbit = (5.3 * baseOrbit) / 2;

// determine orbit speed and planet location
var orbitSpeed;
var orbitDuration = 50;
var ang;
var x;
var y;

var x1;
var y1;
var x2;
var y2;

var step = 0;
var prevStep;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    background(0);
}

function draw() {
    //    background(0, 15);
//    background(0);

    step = step + 1;
    print(step);

    push();
    translate(width / 2, height / 2);

    //  sun

    fill(255, 255, 0);
    ellipse(0, 0, baseSize, baseSize);

    //  planets
    calcSpeed();

   drawPlanet(merOrbit, 88);
   drawPlanet(venOrbit, 225);
   drawPlanet(earOrbit, 365);

    if (step == 1) {
//         drawLine(venOrbit, earOrbit, 225, 365);
        step = 0;
    }
    pop();
}


function calcSpeed() {
    orbitSpeed = millis();
}

function drawPlanet(orbit, days) {

    //orbital ring
    stroke(255, 50);
    noFill();
    ellipse(0, 0, orbit * 2, orbit * 2);

    ang = TWO_PI * orbitSpeed / (days * orbitDuration);
    //    print(ang);
    x = cos(ang) * orbit;
    y = sin(ang) * orbit;

    noStroke();
    fill(255);

    ellipse(x, y, baseSize, baseSize);
}

function drawLine(orbit1, orbit2, days1, days2) {


    ang = TWO_PI * orbitSpeed / (days1 * orbitDuration);
    x1 = cos(ang) * orbit1;
    y1 = sin(ang) * orbit1;

    ang = TWO_PI * orbitSpeed / (days2 * orbitDuration);
    x2 = cos(ang) * orbit2;
    y2 = sin(ang) * orbit2;


    var distance = dist(x1, y1, x2, y2);
    var str = map(distance, 0, 777, 0, 255);

//    colorMode(HSB);
    stroke(str,255-str, 255,5);
    line(x1, y1, x2, y2);
}

function saveF() {
    saveCanvas(cnv, 'phyllotaxis_' + frameCount, 'jpg');
}

function reset() {
    //	reDraw();
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = ((windowHeight - height) / 2) - 100;
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}
