function Attractor() {
    this.x = random(width);
    this.y = random(-500, -50);
    this.z = random(0, 20);
    this.len = map(this.z, 0, 20, 10, 40);
    this.yspeed = map(this.z, 0, 20, 10, 20);
    this.bright = map(this.z, 0, 20, 64, 128);
    this.alpha = alph;

    this.fall = function () {
        this.y = this.y + this.yspeed;
        var grav = map(this.z, 0, 20, 0, 0.2);
        this.yspeed = this.yspeed + grav;

        if (this.y > height) {
            this.y = random(-200, -100);
            this.yspeed = map(this.z, 0, 20, 2, 6);
        }
    }

    this.show = function () {
        var thick = map(this.z, 0, 20, 0.5, 2);
        strokeWeight(thick);
        stroke(this.bright, alph);
        line(this.x, this.y, this.x, this.y + this.len);
    }
}


function lore() {
    var dt = 0.01;
    dx = (a * (y - x)) * dt;
    dy = (x * (b - z) - y) * dt;
    dz = (x * y - c * z) * dt;
    x = x + dx;
    y = y + dy;
    z = z + dz;
    hu = sin(rthu);
    var maphu = map(hu, -1, 1, 0, 255);
    nhu.push(maphu);
    nx.push(x);
    ny.push(y);
    nz.push(z);
    if (inf) {
        if (nx.length > 150) {
            nx.splice(0, 1);
            ny.splice(0, 1);
            nz.splice(0, 1);
        }
    }
}

for (var i = 0; i < nx.length; i++) {
    ambientMaterial(nhu[i], 250, 250);
    push();
    translate(nx[i], ny[i], nz[i]);
    sphere(0.1);
    pop();
}
