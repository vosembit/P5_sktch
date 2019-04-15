var drops = [];
var dropsCount = 200;
var cnv;
var alph = 127;

function preload() {
    img = loadImage('rain/street.jpg');
}

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    centerCanvas();
}

function draw() {
    image(img, 0, 0, windowWidth, windowHeight);
    for (var i = 0; i < drops.length; i++) {
        drops[i].fall();
        drops[i].show();

    }
}

function rainAdd() {
    for (var i = 0; i < dropsCount; i++) {
        drops.push(new Drop());
        alph = 127;
    }
}

function rainRem() {
    for (var i = 0; i < drops.length; i++) {
        drops.splice(0, 1);
    }
}

function pauseRain() {
    alph = 0;
}
function playRain() {
    alph = 127;
}


function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = ((windowHeight - height) / 2);
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}
