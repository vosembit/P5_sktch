let cnv;
let ASlider;
let LSlider;

let inX1, inY1, inX2, inY2;

let LV = 300;
let ANG = 60;
let LEN = 3;
let DIAM;
let AB, BC;
let mode = 0;
let a, b;
let inch;
let c1, c2;

let lightS;

let cc;

let i_rat, i_len, i_w, i_h, i_s, i_lux, i_ang, i_mul, i_diag, i_lm;


$(document).ready(function () {
    //  вывод значения слайдера на страницу
    $('.mdl-slider').on('input', function () {
        $('#' + $(this).attr("id") + '_text').text($(this).val());
        setVal();
    });

});

function setVal(ab, bc, st) {

    i_rat = st;
    i_len = LEN;
    i_ang = ANG;
    i_mul = (LEN / bc).toFixed(2);
    i_diag = DIAM.toFixed(2);
    i_lux = (lightS / (ab * bc)).toFixed(0);
    i_lm = lightS;
    i_s = (ab * bc).toFixed(2);
    i_w = (bc).toFixed(2);
    i_h = (ab).toFixed(2);

    $('#rat').text(i_rat);
    $('#mult').text(i_mul);
    $('#len').text(i_len + " m");
    $('#lux').text(i_lux + " lux");
    $('#lm').text(i_lm + " lm");
    $('#w').text(i_w + " m");
    $('#h').text(i_h + " m");
    $('#s').text(i_s + " m2");

    noStroke();
    fill(164);
    text("angle: " + i_ang + "\xB0" + "    distance: " + i_len + " m" + "    ratio: 16 : 9    area: " + i_s + "    projection coefficient: " + i_mul + "    diagonal = " + i_diag + " m", 50, 460);
    text("light flow: " + i_lm + " lm" + "    luminosity: " + i_lux + " lm/m2", 50, 480);

}


function setup() {

    cnv = createCanvas(800, 500);
    cnv.parent('sketch-holder');
    background(51);

    ellipseMode(CENTER);
    angleMode(DEGREES);
    rectMode(CENTER);

    LSlider = document.getElementById("deltaSlider");
    ASlider = document.getElementById("angleSlider");
    BSlider = document.getElementById("lightSlider");

}

function draw() {
    background(51);

    ANG = ASlider.value;
    LEN = LSlider.value;
    lightS = BSlider.value;
    DIAM = (LEN * tan(ANG / 2)) * 2;
    inch = DIAM * 39.3701;

    lightCone();
    SpotResult(mode);
    info();
}


// LINE/LINE
function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    // calculate the distance to intersection point
    let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        // optionally, draw a circle where the lines meet
        inX1 = x1 + (uA * (x2 - x1));
        inY1 = y1 + (uA * (y2 - y1));
    }
}

// LINE/LINE
function lineLine2(x1, y1, x2, y2, x3, y3, x4, y4) {
    // calculate the distance to intersection point
    let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    // if uA and uB are between 0-1, lines are colliding
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        // optionally, draw a circle where the lines meet
        inX2 = x1 + (uA * (x2 - x1));
        inY2 = y1 + (uA * (y2 - y1));
    }
}


function lightCone() {
    let v = p5.Vector.fromAngle(radians(ANG / 2), LV);
    let vx = v.x;
    let vy = v.y;

    if (mode == 4) {
        cc = map(lightS / (PI * pow(DIAM / 2, 2)), 0, 300, 0, 255);
    } else {
        cc = map(lightS / (AB * BC), 0, 300, 0, 255);

    }

    lineLine(vx * LV, vy * LV, vx * LV, -vy * LV, 0, 0, LV, 0);
    L = map(LEN, 1, 20, 1, dist(0, 0, inX1, inY1));
    lineLine2(L, height / 2, L, 0, 0, 0, vx * LV, vy * LV, );

    //  конус
    push();
    translate(100, height / 2);

    beginShape();
    noStroke();
    fill(255, cc, cc, 15);
    vertex(0, 0);
    vertex(vx * LV, vy * LV);
    vertex(vx * LV, -vy * LV);
    endShape();

    stroke(255);
    line(0, 0, vx * LV, vy * LV);
    line(0, 0, vx * LV, -vy * LV);
    stroke(127);
    line(0, 0, LV, 0);
    line(inX2, inY2, inX2, -inY2);
    noStroke();
    fill(255);
    ellipse(0, 0, 10, 10);
    ellipse(inX1, inY1, 5, 5);
    ellipse(inX2, inY2, 5, 5);
    ellipse(inX2, -inY2, 5, 5);
    fill(255, 0, 0);
    ellipse(L, 0, 5, 5);
    pop();
}

function getMode(i) {
    mode = i;
}

function SpotResult(x) {

    switch (x) {
        case 0:
            //  результат 16 : 9, a = 60.6422464561
            a = cos(60.6422464561) * LV;
            b = sin(60.6422464561) * LV;
            AB = cos(60.6422464561) * DIAM;
            BC = sin(60.6422464561) * DIAM;

            noFill();
            stroke(255);
            rect(600, height / 2, b, a);

            setVal(AB, BC, "16 : 9");
            break;

        case 1:
            //  результат 16 : 10, a = 57.9946167919
            a = cos(57.9946167919) * LV;
            b = sin(57.9946167919) * LV;
            AB = cos(57.9946167919) * DIAM;
            BC = sin(57.9946167919) * DIAM;

            noFill();
            stroke(255);
            rect(600, height / 2, b, a);

            setVal(AB, BC, "16 : 10");


            break;

        case 2:
            //  результат 4 : 3, a = 53.1301023535
            a = cos(53.1301023535) * LV;
            b = sin(53.1301023535) * LV;
            AB = cos(53.1301023535) * DIAM;
            BC = sin(53.1301023535) * DIAM;

            noFill();
            stroke(255);
            rect(600, height / 2, b, a);

            setVal(AB, BC, "4 : 3");


            break;

        case 3:
            //  результат 1 : 1, a = 45
            a = cos(45) * LV;
            b = sin(45) * LV;
            AB = cos(45) * DIAM;
            BC = sin(45) * DIAM;

            noFill();
            stroke(255);
            rect(600, height / 2, a, b);

            setVal(AB, BC, "1 : 1");

            break;

        case 4:
            //  результат SPOT
            strokeWeight(2);
            noFill();
            stroke(255);
            ellipse(600, height / 2, LV, LV);
            strokeWeight(1);
            noStroke();
            fill(164);

            text("angle: " + ANG + "\xB0" + "    distance: " + LEN + " m" + "    shape: circle    area: " + (PI * pow(DIAM / 2, 2)).toFixed(2) + "    projection coefficient: " + (LEN / DIAM).toFixed(2) + "    diagonal = " + DIAM.toFixed(2) + " m", 50, 460);
            text("light intensity: " + lightS + " lm" + "    luminosity: " + (lightS / (PI * (DIAM * DIAM) / 4)).toFixed(0) + " lm/m2", 50, 480);
            
            break;

        default:

            break;
    }

    noFill();
    stroke(96);
    ellipse(600, height / 2, LV, LV);
}

function info() {
    // вывод текстовой информации
    stroke(96);
    line(600 - b / 2, height / 2 + a / 2, 600 + b / 2, height / 2 - a / 2);
    noStroke();
    fill(196);
    textSize(12);
    text("||||||||", 50, 50);
    if (mode < 4) {
        noStroke();
        text(parseFloat(BC.toFixed(2)) + " m", 590, height / 2 - a / 2 + 30);
        text(parseFloat(AB.toFixed(2)) + " m", 620 - b / 2, height / 2);
        fill(96);
        text(parseFloat(inch.toFixed(1)) + " ''", 620, height / 2 + a / 3);

    } else {
        fill(196);
        text("Ø " + parseFloat(DIAM.toFixed(2)) + " m", 600, height / 2 + 20);
    }
}


function windowResized() {
    cnv.position(0, 0);
}

function saveF() {
    saveCanvas(cnv, 'optics_' + frameCount, 'jpg');
}
