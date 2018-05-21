var capture;
var snapshot = [];
var counter = 0;
var total = 34;
var gon = false;

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    background(255);
    capture = createCapture(VIDEO, ready);
    imageMode(CENTER);
    capture.size(windowWidth, windowHeight);
    //    capture.size(80, 60);
    capture.hide();

//        var seriously = new Seriously();
//        seriously.go();
}

function ready() {
    gon = true;
}

function draw() {

//    background(255);
//    tint(255, mouseX, mouseY);
//    image(capture, width / 2, height / 2, width, height);
    //  filter('INVERT');
    //  photoIndex();
}


function photoIndex() {

    var x = 0;
    var y = 0;
    var w = 320;
    var h = 240;

    if (gon) {
        snapshot[counter] = capture.get();
        counter++;
    }

    if (counter == total) {
        counter = 0;
    }

    for (var i = 0; i < snapshot.length; i++) {
        index = (i + frameCount) % snapshot.length;
        image(snapshot[index], x, y, w, h);
        x = x + w;
        if (x > width) {
            x = 0;
            y = y + h;
        }
    }

}
