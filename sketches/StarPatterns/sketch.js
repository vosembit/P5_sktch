var polys = [];

var angle = 75;
var delta = 10;

var deltaSlider;
var angleSlider;
var angleSliderIncrease;
var deltaSliderIncrease;
var cycleSlider;
var tilingTypeSelect;
var gridCheck;

function setup() {
    var canvas = createCanvas(400, 400);
    canvas.parent('canvasContainer');

    background(51);
    deltaSlider = select('#delta');
    angleSlider = select('#angle');
    levelSlider = select('#level');
    tilingTypeSelect = select('#tiling');
    tilingTypeSelect.changed(chooseTiling);
    gridCheck = select('#showGrid');
    angleSliderIncrease = select('#angleIncrease');
    deltaSliderIncrease = select('#deltaIncrease');
    cycleSlider = select('#cycleIncrease');
    chooseTiling();
}

function draw() {
    background(50);
    angle = angleSlider.value();
    delta = deltaSlider.value();
    level = levelSlider.value();
    var t = 0;
    var step = cycleSlider.value() / polys.length;
    for (var i = 0; i < polys.length; i++) {
        angle += (Math.sin(step * i)) * angleSliderIncrease.value();
        delta += (Math.sin(step * i)) * deltaSliderIncrease.value();
        polys[i].hankin();
        polys[i].show();
    }
}

function octSquareTiling() {
    var octSqTiles = new SquareOctagonTiling(50);
    octSqTiles.buildGrid();
    polys = octSqTiles.polys;
}

function hexTiling() {
    var hexTiles = new HexagonalTiling(50);
    hexTiles.buildGrid();
    polys = hexTiles.polys;
}

function hexTriangleSquareTiling() {
    var tiles = new HexaTriangleSquareTiling(50);
    tiles.buildGrid();
    polys = tiles.polys;
}

function squareTiling() {
    polys = [];
    var inc = 100;
    for (var x = 0; x < width; x += inc) {
        for (var y = 0; y < height; y += inc) {
            var poly = new Polygon(4);
            poly.addVertex(x, y);
            poly.addVertex(x + inc, y);
            poly.addVertex(x + inc, y + inc);
            poly.addVertex(x, y + inc);
            poly.close();
            polys.push(poly);
        }
    }
}

function dodecaHexSquareTiling() {
    var tiles = new DodecaHexaSquareTiling(50);
    tiles.buildGrid();
    polys = tiles.polys;

}

function chooseTiling() {
    switch (tilingTypeSelect.value()) {
        case "4.8.8":
            octSquareTiling();
            break;
        case "square":
            squareTiling();
            break;
        case "hexagonal":
            hexTiling();
            break;
        case "dodeca_hex_square":
            dodecaHexSquareTiling();
            break;
        case "hexa_triangle_square":
            // dodecaHexSquareTiling();
            hexTriangleSquareTiling();
            break;
        default:
            hexTriangleSquareTiling();
            // dodecaHexSquareTiling();
            // squareTiling();
            break;
    }
}


function saveF() {
    saveCanvas(canvas, 'ang_' + angle.toFixed(2) + '_del_' + delta.toFixed(2) + '_lev_' + level + '_til_' + tilingTypeSelect.value(), 'jpg');
}
