var displayName //hold the input element of display name 
var email//hold the input element of email
var phone//hold the input element of phone
var zipcode//hold the input element of zipcode
var password//hold the input element of password
var passwordConfirmation//hold the input element of password confirmation
var changeInfo;// record changes to the profile

var displayName_current // current value of display name
var email_current// current value of email
var phone_current// current value of phone number 
var zipcode_current// current value of zipcode
var password_current// current value of password

var displayName_new // new value of display name
var email_new// new value of email
var phone_new// new value of phone number 
var zipcode_new// new value of zipcode
var password_new// new value of password

window.onload = function() {
	displayName = document.getElementById("display-name");
	email = document.getElementById("email-address");
	phone = document.getElementById("phone-number");
	zipcode = document.getElementById("zip-code");
	password = document.getElementById("password");
	passwordConfirmation = document.getElementById("password-confirmation");

	// update current values
	updateCurrentValues();

	displayName_new = "";
	email_new = "";
	phone_new = "";
	zipcode_new = "";
	password_new = "";

	var updateBtn = document.getElementById("update-btn");
	updateBtn.onclick = function() {
		changeInfo = "";
		if(validate() && changeInfo != "") {
			alert(changeInfo);
			updateProfile();
			clearInputs();
		}
	}
}

// update current values
function updateCurrentValues() {
	displayName_current = displayName.parentElement.nextElementSibling.innerText;
	email_current = email.parentElement.nextElementSibling.innerText;
	phone_current = phone.parentElement.nextElementSibling.innerText;
	zipcode_current = zipcode.parentElement.nextElementSibling.innerText;
	password_current = password.parentElement.nextElementSibling.innerText;
}

// reset all the inputs
function clearInputs() {
	displayName.value = "";
	email.value = "";
	phone.value = "";
	zipcode.value = "";
	password.value = "";
	passwordConfirmation.value = "";
}

// update the profile values with new values
function updateProfile() {
	if(displayName_new != ""){
		displayName.parentElement.nextElementSibling.innerText = displayName_new;
		displayName_new = "";
	}
	if(email_new != ""){
		email.parentElement.nextElementSibling.innerText = email_new;
		email_new = "";
	}
	if(phone_new != ""){
		phone.parentElement.nextElementSibling.innerText = phone_new;
		phone_new = "";
	}
	if(zipcode_new != ""){
		zipcode.parentElement.nextElementSibling.innerText = zipcode_new;
		zipcode_new = "";
	}
	if(password_new != ""){
		password.parentElement.nextElementSibling.innerText = password_new;
		password_new = "";
	}
	updateCurrentValues();
}

// do the validation 
function validate() {
	var msg = "";
	if(displayName.value != "") {
		displayName_new = displayName.value;
		changeInfo += "Display name has been changed to " + displayName.value+ ", old value is " + displayName_current + "\n"
	}

	if(email.value != "") {
		var patt = /\S+@\S+\.\S+/
		if(!patt.test(email.value)) {
			msg += "* The email-address should be in the form of name@example.com! <br>";
		} else {
			email_new = email.value;
			changeInfo += "Email address has been changed to " + email.value+ ", old value is " + email_current + "\n"
		}
	}

	if(phone.value != ""){
		var patt = /\d{10}/;
		if (!patt.test(phone.value)) {
			msg += "* Phone Number must be 10 digits! <br>";
		} else {
			phone_new = phone.value;
			changeInfo += "Phone number has been changed to " + phone.value+ ", old value is " + phone_current + "\n"
		}
	}

	if(zipcode.value != ""){
		var patt = /\d{5}/;
		if (!patt.test(zipcode.value)) {
			msg += "* Zip code must be 5 digits! <br>";
		} else {
			zipcode_new = zipcode.value
			changeInfo += "Zip code has been changed to " + zipcode.value+ ", old value is " + zipcode_current + "\n"
		}
	}

	if((password.value != "") || (passwordConfirmation.value != "")){
		if(password.value != passwordConfirmation.value){
			msg += "* Password and password confirmation must match! <br>"
		} else {
			password_new = password.value;
			changeInfo += "Password has been changed to " + password.value + ", old value is " + password_current + "\n"
		}
	}

	document.getElementById("show-result").innerHTML = msg;
	if(msg == ""){
		return true;
	}else {
		return false;
	}
}