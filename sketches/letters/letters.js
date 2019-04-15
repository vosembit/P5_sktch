var x = 0;
var y = 0;
var rad = 300;
var timer = 100;

class GSign {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.brightness = 255;
        this.size = 300;
        this.rnd = 0;
        this.rad = rad;
    }

    update() {
        //this.x = this.x + random(-50, 50);
        //this.y = this.y + random(-50, 50);
        this.rnd = Math.random();
        if (this.rnd < 0.5) {
            this.brightness = 196;
        } else {
            this.brightness = 64;
        }
    }

    show() {

        noStroke();
        fill(this.brightness);
        rect(this.x, this.y, this.rad, this.rad)

        noFill();
        stroke(255);

        beginShape();
        vertex(30, 20);
        vertex(85, 20);
        vertex(85, 75);
        vertex(30, 75);
        endShape(CLOSE);

    }
}


function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    centerCanvas();
    gsign = new GSign(x, y);
    setInterval(interval, timer);
}


function draw() {
    background(64);

    rectMode(CENTER);
    translate(width / 2, height / 2);

    gsign.show();

}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = ((windowHeight - height) / 2);
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}

//частота обновления символа
function interval() {
    gsign.update();

}
