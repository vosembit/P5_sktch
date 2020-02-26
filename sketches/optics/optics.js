var cnv;

var A = 60;
var L = 10;

var ASlider;
var LSlider;

function setup() {
    cnv = createCanvas(600, 600);
    cnv.parent('sketch-holder');
    centerCanvas();
    background(51);

    LSlider = document.getElementById("deltaSlider");
    ASlider = document.getElementById("angleSlider");

}

function draw() {
    background(51);
    A = ASlider.value;
    L = LSlider.value;
    translate(width/2, height/2);
    ellipseMode(CENTER);
    
    stroke(0);
    fill(255);
    ellipse(0, 0, L, L);
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
