//class of plane
function Plane(){
	var _this = this;
	_this.plane = null;
	_this.lifes = 3;
	_this.armor = 1;
	_this.position = {x:0,y:0};
	_this.class = null;
	_this.direction = "up";
	_this.bullet = null;
	_this.lv = 1;
}
//add plane to the container
Plane.prototype.show = function(){
	var _this = this;
	_this.plane = document.createElement("p");
	_this.plane.score = 0;
	_this.plane.className = _this.class;
	document.getElementById("container").appendChild(_this.plane);
};
//bang of planes
Plane.prototype.bang = function(){
	var _this = this;
	var x = _this.plane.offsetLeft,
		y = _this.plane.offsetTop,
		w = _this.plane.offsetWidth,
		h = _this.plane.offsetHeight,
		NO = _this.class.slice(3),
		timer = null,
		bangObj = null;	
				
	_this.die();
	//create bang image
	bangObj = document.createElement("span");
	bangObj.style.left = x+"px";
	bangObj.style.top = y+"px";
	bangObj.style.width = w+"px";
	bangObj.style.height = h+"px";
	bangObj.className = "bang"+NO;	
	document.getElementById("container").appendChild(bangObj);	
	//remove the bang image after 0.1 second
	// window.setTimeout(timer);
	timer = window.setTimeout(function(){
		document.getElementById("container").removeChild(bangObj);
	},100);
};
//delete plane
Plane.prototype.die = function(){
	var _this = this;
	if(_this.plane){
	document.getElementById("container").removeChild(_this.plane);
	}
	_this.outside = true;		
};
//My plane
function myPlane(){}
myPlane.prototype = new Plane();
//Fire
myPlane.prototype.fire = function(){
	var _this = this;
	if(_this.lv == 1){
		_this.position = {
			x:_this.plane.offsetLeft + _this.plane.offsetWidth/2 - 2,
			y:_this.plane.offsetTop + 44
		};
	}
	if(_this.lv == 2){
		_this.position = {
			x:_this.plane.offsetLeft + _this.plane.offsetWidth/2 - 7,
			y:_this.plane.offsetTop + 70
		};
	}	
	if(_this.lv == 3){
		_this.position = {
			x:_this.plane.offsetLeft + _this.plane.offsetWidth/2 - 15,
			y:_this.plane.offsetTop + 30
		};
	}	
	//create the Bullet object
	var b = new Bullet();
	_this.bullet = b;
	_this.bullet.power = _this.lv;
	_this.bullet.domClass = "lv" + _this.lv;
	//set the direction of the bullet to be the same as My Plane
	_this.bullet.direction = _this.direction;
	//set the start position of the bullet
	_this.bullet.startPos = _this.position;
	//move the bullet
	_this.bullet.fire();
};
//My plane should track the movement of the mouse
myPlane.prototype.move = function(state){
	var _this = this;
	_this.stage = document.getElementById("container");
	 //Track the mouse movement
	_this.stage.onmouseover = function(e){
		_this.stage.onmousemove = function(e){
			var E = e||event;
			_this.position.x = E.clientX- _this.stage.offsetLeft - _this.plane.offsetWidth/2;
			_this.position.y = E.clientY- _this.stage.offsetTop - _this.plane.offsetHeight/2;
			_this.plane.style.left = _this.position.x + "px";
			_this.plane.style.top = _this.position.y + "px";		
			if(_this.plane.offsetLeft>_this.stage.offsetWidth-_this.plane.offsetWidth){
				_this.plane.style.left = _this.stage.offsetWidth-_this.plane.offsetWidth + "px";
			}
			if(_this.plane.offsetLeft<0){
				_this.plane.style.left = 0;
			}
			if(_this.plane.offsetTop<0){
				_this.plane.style.top = 0;
			}
			if(_this.plane.offsetTop>_this.stage.offsetHeight-_this.plane.offsetHeight){
				_this.plane.style.top = _this.stage.offsetHeight-_this.plane.offsetHeight + "px";
			}
		};
		_this.stage.onmouseout = function(){
			_this.stage.onmousemove = null;
		};
	};

};
//stop tracking the mouse movement
myPlane.prototype.stop = function(){
	this.stage.onmouseover = null;
	this.stage.onmousemove = null;
};
//enemy aircraft
function npcPlane(){}
npcPlane.prototype = new Plane();
npcPlane.prototype.direction = "down";
npcPlane.prototype.outside = false;
npcPlane.prototype.appear = function(){
	var _this = this;
	//random spawn location
	_this.position.x = Math.random()*(document.getElementById("container").offsetWidth-_this.plane.offsetWidth);
	_this.plane.style.left = _this.position.x + "px";		
	_this.plane.style.top = -_this.plane.offsetHeight + "px";	
};


