import peasy.*;
PeasyCam camera;

float x = 0.01;
float y = 0;
float z = 0;

float a = 10;
float b = 28;
float c = 8.0/3.0;

float hu = 0;
float rtx = 0;

ArrayList<PVector> points = new ArrayList<PVector>();

void setup() {
  size(1200, 900, P3D);
  //fullScreen(P3D, 1);
  background(0);
  colorMode(HSB);
  camera = new PeasyCam(this, 750);
}

void draw() {
  //background(0);

  rtx += 0.001;
  rotateY(rtx);
  lor();
  stroke(255);
  strokeWeight(0.2);
  noFill();
  scale(10);

  beginShape();
  for (PVector v : points) {
    stroke(hu, 255, 255);
    vertex(v.x, v.y, v.z);
    //hu += 0.005;
    hu = frameCount % 255;
    if (hu > 255) {
      hu = 0;
    }
  }
  endShape();
  camera.beginHUD();
  fill(0, 1);
  rect(0, 0, width, height);
  camera.endHUD();
}

void lor() {
  float dt = 0.01;
  float dx = (a * (y - x)) * dt;
  float dy = (x * (b - z) - y) * dt;
  float dz = (x * y - c * z) * dt;
  x = x + dx;
  y = y + dy;
  z = z + dz; 
  points.add(new PVector(x, y, z));

  if (points.size() > 50) {
    points.remove(0);
  }

  println(points.size());
}
