// update the profle status on main page
function updateStatus() {
	var status = document.getElementById("status-input").value;
	document.getElementById("status-label").innerHTML = status;
}

// redirect to profile page
function redirectToProfile() {
	window.location = "profile.html"
}

// clear post editor ara
function cancelPost() {
	document.getElementById("post-editor").value = "";
}