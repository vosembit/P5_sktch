function Drop() {
  this.x = random(width);
  this.y = random(-500, -50);
  this.z = random(0, 20);
  this.len = map(this.z, 0, 20, 10, 20);
  this.yspeed = map(this.z, 0, 20, 10, 20);

  this.fall = function() {
    this.y = this.y + this.yspeed;
    var grav = map(this.z, 0, 20, 0, 0.2);
    this.yspeed = this.yspeed + grav;

    if (this.y > height) {
      this.y = random(-200, -100);
      this.yspeed = map(this.z, 0, 20, 2, 6);
    }
  }

  this.show = function() {
    var thick = map(this.z, 0, 20, 0.5, 2);
    strokeWeight(thick);
    stroke(127);
    line(this.x, this.y, this.x, this.y+this.len);
  }
}