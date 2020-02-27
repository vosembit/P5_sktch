var cnv;

var A = 60;
var L = 10;
var D = 0;
var LV = 300;

var ASlider;
var LSlider;

var x1 = 0; // line controlled by mouse
var y1 = 0;
var x2 = 10; // fixed end
var y2 = 10;

var x3 = 100; // static line
var y3 = 300;
var x4 = 500;
var y4 = 100;

var intersectionX = 0;
var intersectionY = 0;
var intersectionX2 = 0;
var intersectionY2 = 0;

function setup() {
    cnv = createCanvas(800, 600);
    cnv.parent('sketch-holder');
    centerCanvas();
    background(51);
    angleMode()
    LSlider = document.getElementById("deltaSlider");
    ASlider = document.getElementById("angleSlider");

}

function draw() {

    background(51);

    ellipseMode(CENTER);
    angleMode(DEGREES)

    A = ASlider.value;
    L = map(LSlider.value, 1, 20, 1, dist(0, 0, intersectionX, intersectionY));

    D = (LSlider.value * tan(A / 2)) * 2;

    let v = p5.Vector.fromAngle(radians(A / 2), LV);
    let vx = v.x;
    let vy = v.y;


    lineLine(vx * LV, vy * LV, vx * LV, -vy * LV, 0, 0, LV, 0);
    lineLine2(L, height / 2, L, 0, 0, 0, vx * LV, vy * LV, );


    //  конус
    push();
    translate(100, height / 2);
    stroke(255);
    line(0, 0, vx * LV, vy * LV);
    line(0, 0, vx * LV, -vy * LV);
    noStroke();
    fill(255, 32);
    triangle(0, 0, vx * LV, vy * LV, vx * LV, -vy * LV);
    //    фокальная плоскость
    stroke(127);
    //    line(L, vy * LV, L, -vy * LV);
    line(0, 0, LV, 0);
    fill(255);
    noStroke();
    ellipse(intersectionX, intersectionY, 5, 5);
    ellipse(intersectionX2, intersectionY2, 5, 5);
    ellipse(intersectionX2, -intersectionY2, 5, 5);
    stroke(127);
    line(intersectionX2, intersectionY2,intersectionX2, -intersectionY2);


    console.log(intersectionX2);
    pop();


    noStroke();
    fill(255);
    textSize(14);
    text("угол: " + A + "\xB0", 100, 50);
    text("расстояние: " + LSlider.value + " м", 180, 50);


    //   проектор

    fill(255);
    ellipse(100, height / 2, 10, 10);
    stroke(127);
    fill(255, 0, 0);
    ellipse(100 + L, height / 2, 5, 5);


    //  результат SPOT
    noFill();
    stroke(255);
    ellipse(600, height / 2, LV, LV);
    noStroke();
    fill(255);
    text("Ø " + parseFloat(D.toFixed(2)) + " м", 600, height / 2);



}

// LINE/LINE
function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    // calculate the distance to intersection point
    var uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    var uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        // optionally, draw a circle where the lines meet
        intersectionX = x1 + (uA * (x2 - x1));
        intersectionY = y1 + (uA * (y2 - y1));
    }
}

// LINE/LINE
function lineLine2(x1, y1, x2, y2, x3, y3, x4, y4) {
    // calculate the distance to intersection point
    var uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    var uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        // optionally, draw a circle where the lines meet
        intersectionX2 = x1 + (uA * (x2 - x1));
        intersectionY2 = y1 + (uA * (y2 - y1));
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
    saveCanvas(cnv, 'optics_' + frameCount, 'jpg');
}
