var stars = [];
var speed;
var str;


function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    colorMode(HSB);

    str = 300;
    var stars = new Star();
    for (var i = 0; i < stars.length; i++) {
        stars[i] = new Star();
    }

}

function draw() {
    background(0);
    translate(width/2, height/2);
    speed = map(mouseX, 0, width, 0, 10);
    for (var i =0; i < 1800; i++) {
        stars[i].update();
        stars[i].show();
    }

}




function centerCanvas() {
    var x = windowWidth/ 2;
    var y = windowHeight/ 2 - 100;
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}



