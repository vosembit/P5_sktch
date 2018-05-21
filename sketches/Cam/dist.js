var capture;
var x = 0;
var y = 0;

function setup() {

    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    background(0);
}


function draw(){
    video.loadPixels();
    var w = video.width;
    var h = video.height;
    copy(video,w/2,0,1,h,x,y,8,h);
    x = x + 10;
    if (x == width) {
        x = 0;
    }
}
