$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});

const checkInput = function(input) {
	var regex = /^[a-zA-Z][a-zA-Z0-9.\-_$@!]{5,30}$/;
	if (regex.test(input)) {
		return true;
	}
}

const checkPass = function(input) {
	var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$-_])(?=.{8,})");
	if (regex.test(input)) {
		return true;
	}
}

const checkEmail = function(input) {
	var regex = /.+@.+\..+/;
	if (regex.test(input)) {
		return true;
	}
}

const addNewUser = function () {
	event.preventDefault();
	$("body").css("cursor", "progress");
	$('#warning-message').empty();
	$('#warning-message').hide();
	let continueProsses = true;
	if(!(checkInput($('#username').val()))||!(checkPass($('#password').val()))||!(checkEmail($('#email').val()))){
		continueProsses = false;
		$("body").css("cursor", "default");
		$('#warning-message').append('<strong>Error! </strong>input are not valid');
		$('#warning-message').show();
	}
	
	if(continueProsses === true){
		if($('#password').val() !== $('#confirm-password').val()){
			$("body").css("cursor", "default");
			$('#warning-message').append('<strong>Error! </strong>password and confirm password are not same!!!');
			$('#warning-message').show();
		}
		else{
			myUser = {
				username: $('#username').val(),
				password: $('#password').val(),
				email: $('#email').val()
			}
			$.ajax({ url: "/users/newUser", method: "POST", data: myUser}).then((result) => {
				$("body").css("cursor", "default");
				if(result.err){
					$('#warning-message').text(result.err);
					$('#warning-message').show();
				}
				else{
					
					console.log(result);
				}
			});
		}
	}
	
}

$("#register-submit").on("click", addNewUser);

/******************************login************************ */
const loginUser = function () {
	event.preventDefault();
	
	$("body").css("cursor", "progress");
	$('#warning-message').empty();
	$('#warning-message').hide();
	let continueProsses = true;
	if(!(checkPass($('#passwordlogin').val()))||!(checkEmail($('#emaillogin').val()))){
		continueProsses = false;
		$("body").css("cursor", "default");
		$('#warning-message').append('<strong>Error! </strong>input are not valid');
		$('#warning-message').show();
	}
	
	if(continueProsses === true){
		loginSelected = {
			emaillogin: $('#emaillogin').val(),
			passwordlogin: $('#passwordlogin').val(),
		}
		$.ajax({ url: "/users/loginUser", method: "POST", data: loginSelected}).then((result) => {
			$("body").css("cursor", "default");
			if(result.err){
				$('#warning-message').text(result.err);
				$('#warning-message').show();
			}
			else{		
				localStorage.setItem("userToken", result.token);
				alert('how go new page?');	
				// userOK = {
				// 	token: localStorage.getItem("userToken"),
				// 	email: result.user.email,
				// 	username: result.user.username,
				// }
				// $.ajax({ url: `/users/inventory/:${result.user.username}`, method: "Post", data: userOK});
			}
		});
	}
	
}






$("#login-submit").on("click", loginUser);

$(".close").click(function(){
	$(".alert").alert();
});

$(document).ready(function(){
	$('#warning-message').hide();
});
