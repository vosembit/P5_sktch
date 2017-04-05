var drops = [];
function setup() {
	cnv = createCanvas(960, 600);
	cnv.parent('sketch-holder');
	centerCanvas();
}
function draw() {
    background(255);
      for (var i = 0; i < drops.length; i++) {
        drops[i].fall();
        drops[i].show();
      }
}
function rainOn(){
    for(var i = 0; i < 500; i++)    {
        drops.push(new Drop());
    }
}
function rainOff(){
    for(var i = 0; i < 500; i++)    {
        drops.splice(0,1);
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
