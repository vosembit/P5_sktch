var x = 0;
var y = 0;
var sp = 20;

function setup() {
    cnv = createCanvas(400, 400);
    cnv.parent('sketch-holder');
    centerCanvas();
    background(0);
    slider = document.getElementById("slider");

}

function draw() {
    var chance = slider.value;
    console.log(chance);
    stroke(255);
    if (random(1) < chance) {
        line(x, y, x + sp, y + sp);
    } else {
        line(x, y + sp, x + sp, y);
    }
    x = x + sp;
    if (x > width) {
        x = 0;
        y = y + sp;
    }
    if (y > height) {
        background(0);
        y = 0;
        x = 0;

    }

}


function saveF() {
    saveCanvas(cnv, 'tenprints_' + frameCount, 'jpg');
}

function reset() {
    //    reDraw();
}

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = ((windowHeight - height) / 2);
    cnv.position(x, y);
}

function windowResized() {
    centerCanvas();
}
