var x, y, target, br, n, np, pi;
var cnv, res, wiki, result, busys,otime,htime, speed;

function setup() {

	background(255);
	ellipseMode(CENTER);

	cnv = createCanvas(400, 400);
	cnv.id("mycanvas");
	
	result = createP("Pi = " + pi);
	result.id("Pi");
	
	res = createP("");
	res.style('margin-top','20px');
	res.id("res")

	wiki = createA('https://en.wikipedia.org/wiki/Monte_Carlo_method', 'wiki','_blank');
	wiki.class("walpha");

	otime = 0;
	busys = 0;
	htime = 0;
	speed = 0;
	
	np = 0;
	n = 0;
	pi = 0;

}

function draw() {

	otime = millis()
	quantum();

	web();
	busys = millis() - otime;
	htime = htime + busys;
	speed = millis() / n;

}

function quantum() {


	background(255);
	noStroke();
	fill(0);
	ellipse(200, 200, 400, 400);	
	
	x = random(0, 401);
	y = random(0, 401);
	target = get(x, y);

	fill(random(125, 255), 0, random(125, 255));
	ellipse(x, y, 5, 5);
	count();

}

function count() {
	
	br = red(target);
	if (br == 0) np++;
	n = n + 1;
	pi = 4 * np / n;
	LeibnizFormula();

}

function web() {
	
	result.html("уровень вашего Пи = " + pi);
	res.html("количество операций = " + n + "<br>" + "количество попаданий = " + np + "<br>" + "скорость вычеслений в секунду = " + round(1000/speed));
}

function LeibnizFormula() {
  
      var lpi = 0;
      var denominator = 1;
 
      for (var x = 0; x < n; x++) {
 
         if (x % 2 == 0) {
            lpi = lpi + (1 / denominator);
         } else {
            lpi = lpi - (1 / denominator);
         }
         denominator = denominator + 2;
      }
      lpi = lpi * 4;
      print(lpi);
}
function mousePressed()  {   noLoop();  }
function mouseReleased() {   loop(); 	}
