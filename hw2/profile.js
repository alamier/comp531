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

window.onload = function() {
	displayName = document.getElementById("display-name");
	email = document.getElementById("email-address");
	phone = document.getElementById("phone-number");
	zipcode = document.getElementById("zip-code");
	password = document.getElementById("password");
	passwordConfirmation = document.getElementById("password-confirmation");

	displayName_current = displayName.parentElement.nextElementSibling.innerText;
	email_current = email.parentElement.nextElementSibling.innerText;
	phone_current = phone.parentElement.nextElementSibling.innerText;
	zipcode_current = zipcode.parentElement.nextElementSibling.innerText;
	password_current = password.parentElement.nextElementSibling.innerText;

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
	displayName.parentElement.nextElementSibling.innerText = displayName_current;
	email.parentElement.nextElementSibling.innerText = email_current;
	phone.parentElement.nextElementSibling.innerText = phone_current;
	zipcode.parentElement.nextElementSibling.innerText = zipcode_current;
	password.parentElement.nextElementSibling.innerText = password_current;
}

// do the validation 
function validate() {
	var msg = "";
	if(displayName.value != "") {
		displayName_current = displayName.value;
		changeInfo += "Display name has been changed to " + displayName.value + "\n"
	}

	if(email.value != "") {
		var patt = /\S+@\S+\.\S+/
		if(!patt.test(email.value)) {
			msg += "* The email-address should be in the form of name@example.com! <br>";
		} else {
			email_current = email.value;
			changeInfo += "Email address has been changed to " + email.value + "\n"
		}
	}

	if(phone.value != ""){
		var patt = /\d{10}/;
		if (!patt.test(phone.value)) {
			msg += "* Phone Number must be 10 digits! <br>";
		} else {
			phone_current = phone.value;
			changeInfo += "Phone number has been changed to " + phone.value + "\n"
		}
	}

	if(zipcode.value != ""){
		var patt = /\d{5}/;
		if (!patt.test(zipcode.value)) {
			msg += "* Zip code must be 5 digits! <br>";
		} else {
			zipcode_current = zipcode.value
			changeInfo += "Zip code has been changed to " + zipcode.value + "\n"
		}
	}

	if((password.value != "") || (passwordConfirmation.value != "")){
		if(password.value != passwordConfirmation.value){
			msg += "* Password and password confirmation must match! <br>"
		} else {
			password_current = password.value;
			changeInfo += "Password has been changed to " + password.value + "\n"
		}
	}

	document.getElementById("show-result").innerHTML = msg;
	if(msg == ""){
		return true;
	}else {
		return false;
	}
}