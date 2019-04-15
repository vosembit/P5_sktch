function Star() {

    this.x;
    this.y;
    this.z;

    this.sx;
    this.sy;

    this.pz;
    this.px;
    this.py;

    this.r = 0;

    this.x = random(-width / 2, width / 2);
    this.y = random(-height / 2, height / 2);
    this.z = random(width / 2);
    this.pz = this.z;
    this.br = 0;

    this.update = function () {
        this.z = this.z - speed;
        this.br = map(this.z, 0, width / 2, 255, 0);
        this.edges();
        this.sx = map(this.x / this.z, 0, 1, 0, width / 2);
        this.sy = map(this.y / this.z, 0, 1, 0, height / 2);
        this.px = map(this.x / this.pz, 0, 1, 0, width / 2);
        this.py = map(this.y / this.pz, 0, 1, 0, height / 2);
        this.r = map(this.z, 0, width / 2, 6, 0);
        this.pz = this.z;

    }

    this.edges = function () {
        if (this.z < 1) {
            this.z = width / 2;
            this.x = random(-width / 2, width / 2);
            this.y = random(-height / 2, height / 2);
            this.pz = z;
        }
    }

    this.show = function () {
        fill(255);
        noStroke();
        ellipse(this.sx, this.sy, this.r, this.r);
        stroke(32, map(speed, 0, 100, 0, 255), 255);
        line(px, py, sx, sy);
    }
}
