// gui params
var myColor = 30;
var gui;

//var fgcol = '#47584b';

var fsthue = 148;
var fstsat = 255;
var fstbr = 164;
var alfa = 5;
var strWght = 1;
var scl = 20;
var inc = 0.05;
var incz = 0.001;
var drawing = true;

// physics params

var cols, rows;
var zoff = 0;

// arrays
var particles = [];
var flowfield = [];

function setup() {

  createCanvas(windowWidth, windowHeight);
//      createCanvas(800, 400);

//   Create the GUI
//   sliderRange(0, 3, 0.1);
    sliderRange(0, 255, 1);

    gui = createGui('flow field');
    gui.addGlobals('fsthue', 'fstsat', 'fstbr', 'reset');
    sliderRange(20, 100, 1);
    gui.addGlobals('scl');
    sliderRange(0, 0.3, 0.001);
    gui.addGlobals('inc');
    sliderRange(0, 0.003, 0.00001);
    gui.addGlobals('incz');
     
  colorMode(HSB,255,255,255,255);
  background(0);

  cols = floor(width / scl);
  rows = floor(height / scl);

  flowfield = new Array(cols * rows);
  for (var i = 0; i < 1300; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
   background(255);
if(!reset){
    clear();
    reset=false;
//    background(0);
}
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.1);
      flowfield[index] = v;
      xoff += inc;
        
     if(drawing == false){
         drawlines();
     }else{
         
       stroke(fsthue, fstsat,fstbr);
       strokeWeight(1);
       push();
       translate(x * scl, y * scl);
       rotate(v.heading());
       line(0, 0, scl, 0);
       pop();
         }
    }
    yoff += inc;
    zoff += incz;
  }


}

    function drawlines(){
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();

  }

        }

function reset(){
    clear()
}
