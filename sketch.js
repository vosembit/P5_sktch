// gui params
var myColor = 30;
var gui;

// physics params
var inc = 0.1;
var scl = 30;
var cols, rows;
var zoff = 0;

// arrays
var particles = [];
var flowfield = [];

function setup() {

  createCanvas(windowWidth, windowHeight);

  // Create the GUI
//   sliderRange(0, 90, 1);
//   gui = createGui('flow field');
//   gui.addGlobals('scl');

  background(255);

  cols = floor(width / scl);
  rows = floor(height / scl);

  flowfield = new Array(cols * rows);
  for (var i = 0; i < 2500; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  // background(255);

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.5);
      flowfield[index] = v;
      xoff += inc;
      // stroke(0);
      // strokeWeight(1);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;
    zoff += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();

  }

}
