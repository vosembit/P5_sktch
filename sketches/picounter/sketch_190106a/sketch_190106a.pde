float diam = 600;
float x = 30;
float y = 25;
float dst = 0;

float cir = 0;
float pee = 0;
float tot = 0;

float med = 0;
float sum = 0;
float val = 0;
float del = 0;
float chk = 0;

void setup() {
  size(800, 800);
  background(0);
}

void draw() {
  background(0);
  noFill();
  stroke(255);
  translate(width/2, height/2);

  for (int i = 0; i < 1000; i++) {
    x = random(-diam/2, diam/2);
    y = random(-diam/2, diam/2);
    dst = sqrt((x * x) + (y * y));
    if (dst < diam/2) {
      stroke(0, 255, 0);
      cir++;
    } else {
      stroke(255, 0, 0);
    }
    tot++;
    pee = (cir / tot) * 4 ;
    chk = median();
    //point(-width/2 + frameCount,map(chk,3.141,3.146,0,300));
    point(x, y);
  }
  println("pee = " + pee + " med = " + chk + " total = " + tot);
}

float median() {
  sum = sum + pee;
  del = sum / tot / tot;
  if (pee < med) {
    med = med - del;
  } else {
    med = med + del;
  }
  return med;
}
