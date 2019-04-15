var song;
var amp;
var his = [];
var soundMode = false;

var spiral = 0;
var huRotate = 0;

function preload() {
    song = loadSound("beatshapes/Truffles.mp3");
}

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    centerCanvas();
    angleMode(DEGREES);
    colorMode(HSB);
    song.setVolume(0.5);
    amp = new p5.Amplitude();
//    song.play();
}


function draw() {

    background(0,0,0);
    stroke(255);
//    noFill();

    huRotate += 0.1;

    var vol = amp.getLevel();
    his.push(vol);

    if (soundMode) {
        soundLine();
    } else {
        soundCircle();
    }
}

//function mousePressed() {
//    soundMode = !soundMode;
//}

function soundLine() {
    if (his.length > width - 100) {
        his.splice(0, 1);
    }
    beginShape();
    for (var i = 0; i < his.length; i++) {
        var y = map(his[i], 0, 1, height / 2, 0);
        vertex(i, y);
    }
    endShape();
    stroke(255, 0, 0);
    line(his.length, 0, his.length, height)
}

function soundCircle() {
    translate(width / 2, height / 2);
    beginShape();
    for (var i = 0; i < 1360; i++) {
        var lay = sin(huRotate);
        fill(lay*);
        var rSpiral = i / TWO_PI * 0.2;
        var r = map(his[i], 0, 1, rSpiral, rSpiral+300) + rSpiral;
        var x = r * cos(i);
        var y = r * sin(i);
        vertex(x, y);
    }
    endShape();

}


function play() {
    song.play();
}

function stop() {
    song.stop();
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = ((windowHeight - height) / 2);
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}
