// the paths of different images
var imageSrcs = [
	'images/1.jpg','images/2.jpg',
	'images/3.jpg','images/4.jpg',
	'images/5.jpg','images/6.jpg',
	'images/7.jpg','images/8.jpg',
	'images/9.jpg','images/10.jpg'
]

var images = [5]; // the array of different img element
var intervals =[5]; // the array of different timers
// the array of different functions that will handle timer events,
// basically their will change the src of different img elements
var functions =[5]; 
var btns = [5]; // the array of different button elements
// isChanged[i] marks whether img-i is using (i).jpg or (i + 4).jpg
var isChanged = [false, false, false, false, false]
// isPaused[i] marks the state of button-i
var isPaused = [false, false, false, false, false]

// set the interval of card i
function setIntevlOfNum(i){
	var randomIntevel = Math.floor(Math.random() * 5 + 1) * 1000;
	intervals[i] = setInterval(functions[i], randomIntevel)
}

window.onload = function() {
	images[0] =	document.getElementById("img-1");
	images[1] =	document.getElementById("img-2");
	images[2] =	document.getElementById("img-3");
	images[3] =	document.getElementById("img-4");
	images[4] =	document.getElementById("img-5");

	// store the image sources in local
	var imgSrcList = [];
	imageSrcs.forEach(function(src){
		var img = new Image();
		img.src = src;
		imgSrcList.push(img);
	})

    // add onclick methods to buttons
	for (var i=0; i < 5; i ++) {
		btns[i] = images[i].nextElementSibling;
		(function(i) {
			btns[i].onclick = function() {
				if (isPaused[i]) {
					setIntevlOfNum(i);
					btns[i].innerHTML = "Stop";
					isPaused[i] = false;
				} else {
					clearInterval(intervals[i]);
					btns[i].innerHTML = "Start";
					isPaused[i] = true;
				}
			}
		})(i)
	}

	// initialize interval handle methods
	for (var j = 0; j < 5; j++) {
		(function(j) {
			functions[j] = function() {
				if(isChanged[j]){
					images[j].src = imageSrcs[j];
					isChanged[j] = false;
				} else {
					images[j].src = imageSrcs[j + 5]
					isChanged[j] = true;
				}
			}
		})(j)	
	}

	// initialize intervals for every card.
	for (var i = 0 ; i < 5; i++) {
		setIntevlOfNum(i);
	}
}