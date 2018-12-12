var arr = [];
var letters = [];
var rows;
var cols;
var con = 0;
var letta;

class Letter {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.let = 0;
    }

    update() {
        this.let = Math.floor(Math.random() * arr.length);
    }

    show() {
        noStroke;
        fill(50);
        textSize(30);
        text(arr[this.let], this.x, this.y);
    }

}

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    centerCanvas();
    background(255);

    rows = Math.floor(windowWidth / 30);
    cols = Math.floor(windowHeight / 30);

    for (i = 33; i < 80; i++){
        letta = char(i);
        arr.push(letta);
    }

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var x = 10 + 30 * i;
            var y = 10 + 30 * j;
            con++;
            letters[con - 1] = new Letter(x, y);
        }
    }
}

function draw() {
    background(255);
    for (var i = 0; i < letters.length; i++) {
        letters[i].update();
        letters[i].show();
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
