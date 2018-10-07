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
	$('.loader').show();
	$('#warningContainer').hide(500);
	let continueProsses = false;
	if(checkInput($('#username').val())){
		if(checkPass($('#password').val())){
			if(checkEmail($('#email').val()))
				 continueProsses = true; 
			else{ 
				$("body").css("cursor", "default");
				$('#warning-message').html('<strong>Error! </strong>email is not valid');
				$('#warningContainer').show(1000);
			}
		}
		else {
			$("body").css("cursor", "default");
			$('#warning-message').html('<strong>Error! </strong>your password must contain at least (1 lowercase, 1 uppercase alphabetical character,1 numeric,and ! @ # $ - _) minimum 8 char or longer!!!');
			$('#warningContainer').show(1000);
		}
	}
	else {
		$("body").css("cursor", "default");
		$('#warning-message').html('<strong>Error! </strong>your username must start with letters, 5-30 char use: (uppercase, lowecase, numbers, !,@,#,$,-,_)');
		$('#warningContainer').show(1000);
	}
	if(continueProsses === true){
		if($('#password').val() !== $('#confirm-password').val()){
			$("body").css("cursor", "default");
			$('#warning-message').html('<strong>Error! </strong>password and confirm password are not same!!!');
			$('#warningContainer').show(1000);
		}
		else{
			myUser = {
				username: $('#username').val(),
				password: $('#password').val(),
				email: $('#email').val()
			}

			$.ajax({ url: "/api/newUser", method: "POST", data: myUser}).then((result) => {
				$("body").css("cursor", "default");
				alert(result);
				console.log(result);
				});
		}
	}
	
}

$("#register-submit").on("click", addNewUser);

$(".close").click(function(){
	$(".alert").alert();
});
