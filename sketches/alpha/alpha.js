var arr = [];
var letters = [];
var rows;
var cols;
var con = 0;
var letta;
var timer = 400;

class Letter {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 15;
        this.let = 0;
        this.brightness = 0;
        this.size = 20;
    }

    update() {
        this.x = this.x + random(-5, 5);
        this.y = this.y + random(-5, 5);
        this.let = Math.floor(Math.random() * arr.length);
    }

    clicked(x, y) {
        var d = dist(x, y, this.x, this.y);
        if (d < this.r) {
            this.brightness = 255;
            this.size = random(10, 260);
        } else {
            //            this.brightness = 0;
            //            this.size = 20;
        }
    }

    show() {
        noStroke;
        fill(this.brightness, 0, 0, this.brightness);
        fill(0, 0, 0, this.brightness);
        textSize(this.size);
        //        ellipse(this.x, this.y, 30,30);
        text(arr[this.let], this.x, this.y);
    }
}

function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('sketch-holder');
    centerCanvas();

    //    определение количества колонок и рядов объектов в зависимости от размер экрана.
    rows = Math.floor(windowWidth / 30);
    cols = Math.floor(windowHeight / 30);

    //    массив буквенных символов из таблицы юникода
    for (i = 33; i < 80; i++) {
        letta = char(i);
        arr.push(letta);
    }

    //    массив объектов для отображения на экране
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var x = 10 + 30 * i;
            var y = 10 + 30 * j;
            con++;
            letters[con - 1] = new Letter(x, y);
        }
    }

    setInterval(interval, timer);
}


function draw() {
    background(125);
    for (var i = 0; i < letters.length; i++) {
        //        letters[i].update();
        letters[i].show();
    }
}


//поведение при нажатии мыши
function mouseDragged() {
    for (var i = 0; i < letters.length; i++) {
        letters[i].clicked(mouseX, mouseY);
    }
}


//частота обновления символа
function interval() {
    for (var i = 0; i < letters.length; i++) {
        letters[i].update();
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
