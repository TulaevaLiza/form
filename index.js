var MyForm={
validate: function() {
}
getData: function() {
	this.fio=document.getElementById("fio");
	this.email=document.getElementById("email");
	this.phone=document.getElementById("phone");
}
setData: function(fio,email,phone) {
}
submit: function() {
}
display: function() {
	console.log(this.fio);
	console.log(this.email);
	console.log(this.phone);
}
};

MyForm.getData();
MyForm.display();

