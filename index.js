$(document).ready(function() {
	var error=new Array();

	
	var emailtmpl = /^[a-zA-Z0-9_\-\.]+@(ya\.ru|yandex\.ru|yandex\.ua|yandex\.by|yandex\.kz|yandex\.com)$/;
	var phonetmpl = /^\+7\(\d\d\d\)\d\d\d-\d\d-\d\d$/;

	$('#fio').val("");
	$('#email').val("");
	$('#phone').val("");


	$('#fio').change(function() {
		if($(this).next().hasClass('error')) {
			$(this).next().remove();
		}
		error['fio']=0;
		var fio=$(this).val().replace(/\s*$/,"").replace(/^\s*/,"");
		var x=fio.split(" ");
		if(x.length!=3) {
			$(this).after("<div class='bg-warning error'>ФИО должно содержать три слова</div>");
			error['fio']=1;
		}
	});
	

	$('#email').change(function() {
		if($(this).next().hasClass('error')) {
			$(this).next().remove();
		}
		error['email']=0;
		var email=$(this).val().replace(/\s*$/,"").replace(/^\s*/,"");		
				
		if(!emailtmpl.test(email)) {
			$(this).after("<div class='bg-warning error'>Введите e-mail в верном формате и только в доменах ya.ru, yandex.ru, yandex.ua, yandex.by, yandex.kz, yandex.com</div>");
			error['email']=1;
		}
		
	});

	$('#phone').change(function() {
		if($(this).next().hasClass('error')) {
			$(this).next().remove();
		}
		error['phone']=0;
		var phone=$(this).val().replace(/\s*$/,"").replace(/^\s*/,"");		
		if(!phonetmpl.test(phone)) {
			$(this).after("<div class='bg-warning error'>Введите номер телефона в формате +7(999)999-99-99</div>");
			error['phone']=1;			
		}
		else {
			var ar = phone.split('');
			var sum=0;
			console.log('ar '+ar);

			ar.forEach(function(item,i,arr) {
				console.log('item '+Number(item));
				sum += Number(item);
			});
//			reduce( function(sum, current) {
//			  return sum + Number(current);
//			});
			console.log('sum '+sum);
			if(sum>30) {
				$(this).after("<div class='bg-warning error'>Cумма цифр номера телефона не должна превышать 30</div>");
				error['phone']=1;				
			}
		}
	});
});
