//class of bullets
function Bullet(){
	//bullet object
	this.bullet = null;
	//bullet speed
	this.speed = 30;
	this.outside = false;
	// bullet power
	this.power = 1;
	this.direction = null;
	this.startPos = {x:0,y:0};
	this.timer = null;
	// //bullet class name
	this.domClass = "";
}
//delete bullent
Bullet.prototype.die = function(){
	var _this = this;
	document.getElementById("container").removeChild(_this.bullet);
	_this.outside = true;	
};
// fire a bullet
Bullet.prototype.fire = function(){
	var _this = this;
	//create a bullet
	_this.bullet = document.createElement("i");
	_this.bullet.className = _this.domClass;
	document.getElementById("container").appendChild(_this.bullet);
	_this.bullet.style.left = _this.startPos.x + "px";
	_this.bullet.style.top = _this.startPos.y + "px";
	_this.bullet.style.top = _this.bullet.offsetTop - _this.speed + "px";		
};
