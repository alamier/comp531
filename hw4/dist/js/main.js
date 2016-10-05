var game = {
	myPlane:null,
	allPlane:[],
	allBullet:[],
	planeSpeed:[4,3,2,1],
	planeDensity:[20,200,600,1000],
	interval:1000/30,
	scores:0,
	gameTime:0,
	num:0,
	stageBgY:0,
	gameSet:null,
	stage:null,
	killBossCount:0,
    killEnemyCount:{
	    npc1:0,
        npc2:0,
        npc3:0,
        npc4:0,
    }
};
//initialize my plane
game.initMyPlane = function(){
	var _this = this;
	_this.myPlane = new myPlane();
	_this.myPlane.class = "myPlane";
	_this.myPlane.position = {x:"45%",y:460};
	_this.myPlane.show();
	_this.myPlane.move();
};
//run the game
game.run = function(){
	var _this = this;
	_this.num++;
	_this.stage = document.getElementById("container");

	//Fire frequency
	if(_this.num%7==0){
		//Fire, add bullets
		_this.myPlane.fire();
		_this.allBullet.push(_this.myPlane.bullet);
	}
	//Traverse all bullets
	var allBulletLen = _this.allBullet.length;
	for(var i=0;i<allBulletLen;i++){
		//if the bullet died or out of stage
		if( _this.allBullet[i].bullet.offsetTop<0){
			_this.allBullet[i].die();
		}
		if(_this.allBullet[i].outside){
			_this.allBullet.splice(i,1);
			allBulletLen--;
		}
	}
	//create enemy aircraft
	if(_this.num%_this.planeDensity[0] == 0){
		var npc = new npcPlane();
		npc.class = "npc1";
		npc.armor = npc.score = 1;
		npc.speed = _this.planeSpeed[0];
		npc.show();
		npc.appear();
		_this.allPlane.push(npc);
	}
	if(_this.num%_this.planeDensity[1] == 0){
		var npc = new npcPlane();
		npc.class = "npc2";
		npc.armor = npc.score = 5;
		npc.speed = _this.planeSpeed[1];
		npc.show();
		npc.appear();
		_this.allPlane.push(npc);
	}
	if(_this.num%_this.planeDensity[2] == 0){
		var npc = new npcPlane();
		npc.class = "npc3";
		npc.armor = npc.score = 10;
		npc.speed = _this.planeSpeed[2];
		npc.show();
		npc.appear();
		_this.allPlane.push(npc);
	}
	if(_this.num%_this.planeDensity[3] == 0){
		var npc = new npcPlane();
		npc.class = "npc4";
		npc.armor = npc.score = 20;
		npc.speed = _this.planeSpeed[3];
		npc.show();
		npc.appear();
		_this.allPlane.push(npc);
	}

	//traverse all enemy planes
	var len = _this.allPlane.length;
	for(var i=0;i<len;i++){
		//if the enemy plane is out of stage
		if( _this.allPlane[i].plane.offsetTop>_this.stage.offsetHeight){
			_this.allPlane[i].die();
		}
		//if the enemy collided with my plane
		if(getCollision(_this.myPlane.plane,_this.allPlane[i].plane)){
		    _this.myPlane.lifes -= 1;
            _this.allPlane[i].bang();
            _this.myPlane.lv = 1;
            // update lives panel
            document.getElementById("lives").innerHTML = "Lives：" + _this.myPlane.lifes;
            if(_this.myPlane.lifes < 1) {
                _this.over();
            }
            return
		}
		//remove died enemy planes
		if(_this.allPlane[i].outside){
			_this.allPlane.splice(i,1);
			len--;
		}
	}
	//move enemy planes
	for(var i=0;i<_this.allPlane.length;i++){
		_this.allPlane[i].plane.style.top = _this.allPlane[i].plane.offsetTop + _this.allPlane[i].speed + "px";
	}
	//if bullet hit enemy planes
	for(var j=0;j<_this.allBullet.length;j++){
		_this.allBullet[j].bullet.style.top = _this.allBullet[j].bullet.offsetTop - _this.allBullet[j].speed + "px";
		for(var i=0;i<_this.allPlane.length;i++){
			//hit
			if(getCollision(_this.allBullet[j].bullet,_this.allPlane[i].plane)){
				//delete the bullet
				_this.allBullet[j].die();
				//reduce the armor of enemy plane
				_this.allPlane[i].armor-=_this.allBullet[j].power;
				if(_this.allPlane[i].armor<=0){
					//score
					_this.scores += _this.allPlane[i].score;
                    //count the number of different enemy planes
                    var npcName = _this.allPlane[i].class;
                    _this.killEnemyCount[npcName] += 1;
					//get upgrade
					if(_this.allPlane[i].class == "npc4" && this.myPlane.lv < 3){
						this.myPlane.lv ++;
					}
					//create bang image
					_this.allPlane[i].bang();
				}
				return;
			}
		}
	}
	// update score panel
	document.getElementById("score").innerHTML = "Score：" + _this.scores*100;
    // update time panel
    document.getElementById("time").innerHTML = "Time: " + _this.num * 30 / 1000 + "s";
    // update lives panel
    document.getElementById("lives").innerHTML = "Lives：" + _this.myPlane.lifes;
	//move the stage background
	_this.stageBgY++;
	_this.stage.style.backgroundPositionY = _this.stageBgY + "px";
	//game schedule
    //30 seconds - 60 seconds
	if(_this.num>1000 && _this.num < 2000){
		_this.planeSpeed = [5,4,3,2];
		_this.planeDensity = [15,200,600,1000];
	}
    // 60 - 90 seconds
	if(_this.num > 2000 && _this.num < 3000){
		_this.planeSpeed = [6,5,4,3];
		_this.planeDensity = [15,100,400,2000];
	}
	// 90 - 120 seconds
	if(_this.num > 3000 && _this.num < 4000){
		_this.planeSpeed = [7,6,5,4];
		_this.planeDensity = [10,200,500,1500];
	}
    // 120 - 150 seconds
	if(_this.num > 4000 && _this.num < 5000){
		_this.planeSpeed = [10,8,6,5];
		_this.planeDensity = [10,150,300,1000];
	}
	// after 150 seconds
	if(_this.num>5000){
		_this.planeSpeed = [12,10,8,4];
		_this.planeDensity = [8,100,200,800];
	}
};
//begin the game
game.begin = function(){
	var _this =this;
    // initialize my plane
	if(!_this.myPlane){
	_this.initMyPlane();
	}else{
		_this.myPlane.move();
	}
	// run the main thread
	_this.gameSet = window.setInterval(function(){
		_this.run();
	},_this.interval);
};
//pause the game
game.pause = function(){
	var _this = this;
	_this.myPlane.stop();
	window.clearInterval(_this.gameSet);
};
//game over
game.over = function(){
	var _this = this;
	_this.myPlane.stop();
	_this.myPlane.bang();
	//game statics
	window.setTimeout(function(){
		window.clearInterval(_this.gameSet);
		var info = document.getElementById("info"),
			endScore = document.getElementById("endScore"),
            kills = document.getElementById("kills");
		info.style.display = "block";
		endScore.innerHTML = _this.scores*100;
        kills.innerHTML =
            "Fighters:" + _this.killEnemyCount["npc1"]
            + " Helicopter:" + _this.killEnemyCount["npc2"]
            + "\nBombers:" + _this.killEnemyCount["npc3"]
            + " Upgrades:" + _this.killEnemyCount["npc4"];
	},100);
};
// game entry
onload = function(){
	var begin = document.getElementById("begin"),
		begin_btn = document.getElementById("begin_btn"),
		pause = document.getElementById("pause"),
		pause_btn = document.getElementById("pause_btn"),
		again_btn = document.getElementById("again_btn"),
		stage = document.getElementById("container");
	begin_btn.onclick = function(e){
		var E = e||event;
		begin.style.display = "none";
		game.begin();
		E.stopPropagation();
		E.cancelBubble = true;
	};
	begin.onclick = function(e){
		var E = e||event;
		E.stopPropagation();
		E.cancelBubble = true;	
	};
	stage.onclick = function(e){
		var E = e||event;
		pause.style.display = "block";
		game.pause();
		E.stopPropagation();
		E.cancelBubble = true;			
	};
	pause_btn.onclick = function(e){
		var E = e||event;	
		game.begin();
		pause.style.display = "none";
		E.stopPropagation();
		E.cancelBubble = true;		
	};
	again_btn.onclick = function(){
		window.location.reload();
	};
	
	
};

// detect collision
function getCollision(obj1,obj2){
    var l1 = obj1.offsetLeft;
    var r1 = obj1.offsetLeft + obj1.offsetWidth;
    var t1 = obj1.offsetTop;
    var b1 = obj1.offsetTop+ obj1.offsetHeight;
    var l2 = obj2.offsetLeft;
    var r2 = obj2.offsetLeft + obj2.offsetWidth;
    var t2 = obj2.offsetTop;
    var b2 = obj2.offsetTop+ obj2.offsetHeight;
    if(r1<l2 || l1>r2 || t1>b2 || b1<t2){
        return false;
    }else{
        return true;
    }
}
