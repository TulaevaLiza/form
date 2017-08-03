$(document).ready(function() {
	var error=();
	$('#fio').val("");
	$('#fio').change(function() {
		if($(this).next().hasClass('error')) {
			$(this).next().remove();
		}
		$error['fio']=0;
		var fio=$(this).val().replace(/\s*$/,"").replace(/^\s*/,"");
		var x=fio.split(" ");
		if(x.length!=3) {
			$(this).after("<div class='bg-warning error'>ФИО должно содержать три слова</div>");
			$error['fio']=1;
		}
	});
});
