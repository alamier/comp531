'use strict'

var c;
// 'shapes' is a list of objects that need to be paint in every frame
var shapes = [];
var blgColors;
var floor;
// common size for windows
var windowSpacing = 2, floorSpacing = 3
var windowHeight = 5, windowWidth = 3
// 'car' stores attributes of the car
var car = {}
// 'sun' stores attributes of the sun
var sun = {}

var createApp = function(canvas) { 
	c = canvas.getContext("2d");

	// Create the ground
	floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// colors of buildings
	blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
		var colorStyle = blgColors[ Math.floor(Math.random()*blgColors.length)]

		var spe = {x0:x0, blgWidth:blgWidth, blgHeight:blgHeight, colorStyle:colorStyle}

		// add an object to the list
		shapes.push(spe)
	}

	//initialize car
	car['width'] = 40;
	car['height'] = 30;
	car['x'] = 0;
	car['y'] = floor - car.height
	car['speed'] = 3;
	car['color'] = 'red';

	// initialize sun;
	sun['radius'] = 40;
	sun['x'] = sun.radius;
	sun['y'] = sun.radius;
	sun['speed'] = 1;
	sun['color'] = 'yellow';

	// deteck the click and increase the height of the building being clicked
	canvas.onclick = function(e) {
		var x = e.clientX - c.canvas.offsetParent.offsetLeft;
		var y = e.clientY - c.canvas.offsetParent.offsetTop;

		// find the building in reverse order so the one in front will be selceted
		for(var i = shapes.length-1; i>=0; i--){
			if(isClicked(shapes[i],x,y)){
				shapes[i].blgHeight += windowHeight;
			}
		}
	}

	return {
		build: build
	}
}

// check whether the building is being clicked
function isClicked(spe, x, y){
	if((x > spe.x0) && (x - spe.x0 < spe.blgWidth)){
		if((y < floor) && (floor - y < spe.blgHeight)){
			return true;
		}
	}
	return false;
}

// update the attributes of the Car with every click
function moveCar(){
    c.fillStyle = car.color;
    c.fillRect(car.x, car.y, car.width, car.height);
	car.x += car.speed;
	if(car.x >= c.canvas.width){
		car.x = 0;
	}
}

// update the attributes of the Sun with every click
function moveSun(){
    c.fillStyle = sun.color;
    c.beginPath();
    c.arc(sun.x, sun.y, sun.radius, 0, 2*Math.PI);
    c.closePath();
    c.fill();
	sun.x += sun.speed;
	if(sun.x - sun.radius >= c.canvas.width){
		sun.x = sun.radius;
	}
}

// update the frame
function paint() {
	// clear the old frame first
	c.clearRect(0,0,c.canvas.width,c.canvas.height/2);

	// repaint Sun first
	moveSun();
	// repaint building secondly
	shapes.forEach(function(spe){
		var x0 = spe.x0;
		var blgWidth = spe.blgWidth;
		var blgHeight = spe.blgHeight;

		c.fillStyle= spe.colorStyle;
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)

		// yellow means light on, black means light off
		var lights = ['yellow','black']
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				c.fillStyle=lights[ Math.floor(Math.random()*lights.length)]
				c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	})
	// repaint Car last
	moveCar();
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build

	// set the timer to update the frame
	setInterval(paint, 33);
}


