var shift_pressed = false;
var isPlaying = true;

window.onload = function() {
	var button = document.getElementById("avoid-btn")
	button.onmouseover = function() {
		if (isPlaying && !shift_pressed) {
			button.style.left = Math.random() * 350 + "px";
			button.style.top = Math.random() * 350 + "px";
		}
	}
	window.onkeydown = function(e) {
		if(e.keyCode == 16){
			shift_pressed = true;
		}
	}

	window.onkeyup = function() {
		shift_pressed = false;
	}

	button.onclick = function() {
		if(isPlaying) {
			document.getElementById("result").style.display = "block";
			this.innerHTML = "Play Again";
			isPlaying = false;
		} else {
			document.getElementById("result").style.display = "none";
			this.innerHTML = "Click Me";
			isPlaying = true;
		}
	}
}

