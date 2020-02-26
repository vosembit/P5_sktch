var cnv;
var poly;

var polys = [];

var angle = 60;
var delta = 10;

var angleSlider;
var deltaSlider;

function setup() {
    //    cnv = createCanvas(windowWidth, windowHeight);
    cnv = createCanvas(600, 600);
    cnv.parent('sketch-holder');
    centerCanvas();
    background(51);

    deltaSlider = document.getElementById("deltaSlider");
    angleSlider = document.getElementById("angleSlider");

    var inc = 100;

    for (var x = 0; x < width; x += inc) {
        for (var y = 0; y < height; y += inc) {
            var poly = new Polygon();
            poly.addVertex(x, y);
            poly.addVertex(x + inc, y);
            poly.addVertex(x + inc, y + inc);
            poly.addVertex(x, y + inc);
            poly.close();
            polys.push(poly);
        }
    }
}



function draw() {
    background(51);

    angle = angleSlider.value;
    delta = deltaSlider.value;

    for (var i = 0; i < polys.length; i++) {

        polys[i].hankin();
        polys[i].show();

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

function saveF() {
    saveCanvas(cnv, 'star_pattern' + frameCount, 'jpg');
}
