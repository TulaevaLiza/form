$(document).ready(function() {
	var emailtmpl = /^[a-zA-Z0-9_\-\.]+@(ya\.ru|yandex\.ru|yandex\.ua|yandex\.by|yandex\.kz|yandex\.com)$/;
	var phonetmpl = /^\+7\(\d\d\d\)\d\d\d-\d\d-\d\d$/;
	var error_fio =0, error_email = 0, error_phone =0, error = 0 ;
	var url="";

	$('#fio').val("");
	$('#email').val("");
	$('#phone').val("");
	$('#submitButton').removeAttr("disabled");
	



	$('#fio').change(function() {
		if($(this).next().hasClass('error')) {
			$(this).next().remove();
		}
		error_fio=0;
		var fio=$(this).val().replace(/\s*$/,"").replace(/^\s*/,"");
		var x=fio.split(" ");
		if(x.length!=3) {
			$(this).after("<div class='bg-warning error'>ФИО должно содержать три слова</div>");
			error_fio=1;
		}
	});
	

	$('#email').change(function() {
		if($(this).next().hasClass('error')) {
			$(this).next().remove();
		}
		var email=$(this).val().replace(/\s*$/,"").replace(/^\s*/,"");		
				
		error_email=0;
		if(!emailtmpl.test(email)) {
			$(this).after("<div class='bg-warning error'>Введите e-mail в верном формате и только в доменах ya.ru, yandex.ru, yandex.ua, yandex.by, yandex.kz, yandex.com</div>");
			error_email=1;
		}
		
	});

	$('#phone').change(function() {
		if($(this).next().hasClass('error')) {
			$(this).next().remove();
		}
		error_phone=0;
		var phone=$(this).val().replace(/\s*$/,"").replace(/^\s*/,"");		
		if(!phonetmpl.test(phone)) {
			$(this).after("<div class='bg-warning error'>Введите номер телефона в формате +7(999)999-99-99</div>");
			error_phone=1;			
		}
		else {
			var ar = phone.split('');
			var sum=0;

			ar.forEach(function(item,i,arr) {
				if(Number(item))
				{
					console.log('item '+Number(item));
					sum += Number(item);
				}
			});
			if(sum>30) {
				$(this).after("<div class='bg-warning error'>Cумма цифр номера телефона не должна превышать 30</div>");
				error_phone=1;				
			}
		}
	});

	$('#submitButton').click(function() {
		if(!$('#fio').val().replace(/\s*$/,"").replace(/^\s*/,"") || !$('#email').val().replace(/\s*$/,"").replace(/^\s*/,"") || !$('#phone').val().replace(/\s*$/,"").replace(/^\s*/,"")) {
			error=1;
		}
		else if(error_fio || error_email || error_phone) {
			error=1;
		}
		else {
			error=0;
		}
		console.log("error = "+error);

		if(!error) {
			console.log("success");
			$(this).attr("disabled","disabled");
			url = "success.json";
		}
		else {
			console.log("error");
			url = "error.json";
		}
		
		console.log(url);

		var xhttp=new XMLHttpRequest();
		xhttp.open("GET",url,true);
		xhttp.send();  
		console.log(xhttp);
		xhttp.onreadystatechange=function() {
			if (xhttp.readyState==4) {
				console.log(xhttp.responseText);
				var json=eval('('+xhttp.responseText+')');
				$('#resultContainer').css("dislay","block");
				if(json.status=="success") {
					$('#resultContainer').addClass('success').html("Success");
				}
				if(json.status=="error") {
					$('#resultContainer').addClass('error').html(json.reason);
				}
				if(json.status=="progress") {
					$('#resultContainer').addClass('progress');
					// через json.timeout секунд запрос должен повториться
				} 
			}     
		}  
   

	});
});
