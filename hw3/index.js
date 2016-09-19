function setTimestamp() {
	document.getElementById("timestamp").value = Date.now()
}

function clearBtn() {
	document.getElementById("registration-form").reset();
}

function checkPasswordMatch() {
	var password = document.getElementById("password").value;
	var confirmPassword = document.getElementById("password-confirmation").value;

	if (password != confirmPassword) {
		document.getElementById("passwordCheck").innerHTML = "* <br>Password do not mathch!";
		return false;
	}else {
		document.getElementById("passwordCheck").innerHTML = "*";
		return true;
	}
}

function checkDateOfBirth() {
	var birthdayString = document.getElementById("date-of-birth").value;
	var birthday = new Date(birthdayString);
	var today = new Date();
	var age = today.getFullYear() - birthday.getFullYear();
	var monthDiff = today.getMonth() - birthday.getMonth();
	if(monthDiff < 0 || (monthDiff ==0 && today.getDate() < birthday.getDate())){
		age --;
	}
	var miniumAge = 18;
	if(age >= miniumAge) {
		document.getElementById("birthdateCheck").innerHTML = "*"
		return true;
	}else {
		document.getElementById("birthdateCheck").innerHTML = "* <br>Only individuals 18 years of age or older on the day of registration are allowed to register!"
		return false;
	}
}

function formValidation() {
	return checkPasswordMatch() && checkDateOfBirth();
}

function login() {
	var email = document.getElementById("log-email").value;
	var password = document.getElementById("log-password").value;
	var jump = true;
	if(email == ""){
		document.getElementById("log-email-info").innerHTML = "Email can't be empty!"
		jump = false;
	} else {
		document.getElementById("log-email-info").innerHTML = ""
	}
	if(password == ""){
		document.getElementById("log-password-info").innerHTML = "Password can't be empty!"
		jump = false;
	} else {
		document.getElementById("log-password-info").innerHTML = ""
	}
	if(jump) {
		window.location = 'main.html'
	}
}