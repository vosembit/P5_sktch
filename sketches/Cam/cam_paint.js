var video;
var vScale = 16;

var particles = [];
var slider;

function setup() {

    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
//    var cnv = createCanvas(640, 480);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(width / vScale, height / vScale);
    video.hide();
    for (var i = 0; i < 200; i++) {
        particles[i] = new Particle(random(width), random(height));
    }
    slider = 127;
    background(51);

}


function draw() {

    video.loadPixels();
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].show();
    }

}
