$(document).ready(function() {
	var error_fio =0, error_email = 0, error_phone =0, error = 0 ;
	var url="";

	var MyForm = {
		getForm: function() {
			this.fio=$("#fio");
			this.email=$("#email");
			this.phone=$("#phone");
			this.submitButton=$("#submitButton");

			this.fio.removeClass('error');
			this.email.removeClass('error');
			this.phone.removeClass('error');
			console.log(this);
		},
		validate: function () {
			var emailtmpl = /^[a-zA-Z0-9_\-\.]+@(ya\.ru|yandex\.ru|yandex\.ua|yandex\.by|yandex\.kz|yandex\.com)$/;
			var phonetmpl = /^\+7\s*\(\d\d\d\)\s*\d\d\d-\d\d-\d\d$/;
			var obj = {'isValid': true, 'errorFields':[]};

			var x=this.fio.val().trim().split(" ");
			if(x.length!=3) {
				obj.isValid=false;	
				obj.errorFields.push('fio');
			}			

			if(!emailtmpl.test(this.email.val().trim())) {
				obj.isValid=false;	
				obj.errorFields.push('email');
			}

			if(!phonetmpl.test(this.phone.val().trim())) {
				obj.isValid=false;	
				obj.errorFields.push('phone');
				console.log('phone '+this.phone.val().trim());
			}
			else {
				let ar = this.phone.val().split(''), sum=0;
				for(let i in ar) {
					if(Number(ar[i]))
						sum+=Number(ar[i]);
				}
				console.log('sum = '+sum);
				if(sum>30) {
					obj.isValid=false;	
					obj.errorFields.push('phone');
				}
			}
			
			return obj;
		},
		setData: function(f) {
			this.fio.val(f.fio);
			this.phone.val(f.phone);
			this.email.val(f.email);
			this.submitButton.removeAttr("disabled");
		},
		submit: function() {
			let validRes=this.validate();			
			console.log(validRes);
			if(!validRes.isValid) {
				for(let i in validRes.errorFields) {
						this[validRes.errorFields[i]].addClass("error");	
				}
			}
			else {
				this.submitButton.attr("disabled","disabled");
				$.ajax({		
					url: "/success.json",
					cache: false,
					success: function(data) {
					//	$("#results").html(data);
						console.log("Успех!");
					},
					error:  function(xhr, str){
						console.log("Возникла ошибка!");
						console.log(xhr);	
					}
				});
			}
		}
	}
MyForm.getForm();
MyForm.setData({"fio":"","phone":"","email":""});

$('#submitButton').click(function() {
	MyForm.getForm();
	MyForm.submit();	
});


});
