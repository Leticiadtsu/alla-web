function clear() {
	$('#insert').addClass('hide');
	$('#search').addClass('hide');
	$('#update').addClass('hide');
	$('#delete').addClass('hide');
	$('#results').addClass('hide');
}

function acao(el) {
	clear();
	
	if (el.id == 'buttonInsert') {
		$('#insert').removeClass('hide');
		//$('#deficiency').material_select();
	} 
	if (el.id == 'buttonSearch') {
		$('#search').removeClass('hide');
	} 
	if (el.id == 'buttonUpdate') {
		$('#update').removeClass('hide');
	} 
	if (el.id == 'buttonDelete') {
		$('#delete').removeClass('hide');
	} 
}

function displayUsers(data) {
	$('#results').removeClass('hide').html('Resultado: ');
	data.forEach(element => {
		$('#results').append(
			"<p>" +
			"<b>ID:</b> " + element._id +
			"<br><b>Nome:</b> " + element.name +
			"<br><b>Email:</b> " + element.email +
			"<br><b>Telefone:</b> " + element.phone +
			"<br><b>CPF:</b> " + element.cpf +
			"<br><b>Deficiência:</b> " + element.deficiency +
			"<br><b>Criado em:</b> " + element.createdAt +
			"</p>"
		);
	});
}

function displayUser(data) {
		$('#results').append(
			"<p>" +
			"<b>ID:</b> " + data._id +
			"<br><b>Nome:</b> " + data.name +
			"<br><b>Email:</b> " + data.email +
			"<br><b>Telefone:</b> " + data.phone +
			"<br><b>CPF:</b> " + data.cpf +
			"<br><b>Deficiência:</b> " + data.deficiency +
			"<br><b>Criado em:</b> " + data.createdAt +
			"</p>"
		);
}

function openModal() {
	$('.modal').modal();
	$('#modal1').modal('open');
}

/* Requisições da API */
var users = {};
const url = "https://alla-api.herokuapp.com";

// Listar todos os usuários
function getUsers(){
	$.ajax({
		type: "GET",
		url: url + "/auth/users",
		xhrFields: {
			crossDomain: true,
			withCredentials: true
		},
		success: function(data){
			clear();
			displayUsers(data);
		}, 
		error: function(e){
			$('#headerModal').html("Erro");
			$('#pModal').html(e.responseJSON.error);
			openModal();
		} 
	});
}

// Buscar um usuário
function getUser(){
	$.ajax({
		type: "GET",
		url: url + "/auth/users/" + $("#searchId").val(),
		xhrFields: {
			crossDomain: true,
			withCredentials: true
		},
		success: function(data){
			$('#results').removeClass('hide').html('Resultado: ');
			displayUser(data);
		}, 
		error: function(e){
			console.log(e);
			$('#headerModal').html("Erro");
			$('#pModal').html(e.responseJSON.error);
			openModal();
		} 
	});
}

// Deletar usuário
function deleteUser(){
	let id = $("#deleteId").val();
	$.ajax({
		type: "DELETE",
		url: url + "/auth/users/" + id,
		xhrFields: {
			crossDomain: true,
			withCredentials: true
		},
		success: function(data){
			clear();
			$('#headerModal').html("Pronto");
			$('#pModal').html("Usuário deletado com sucesso!");
			openModal();
		}, 
		error: function(e){
			$('#headerModal').html("Erro");
			$('#pModal').html(e.responseJSON.error);
			openModal();
		} 
	});
}

// Inserir usuário
function insertUser(){
	const user = {
		name: $("#name").val(),
		email: $("#email").val(),
		password: $("#password").val(),
		phone: $("#phone").val(),
		cpf: $("#cpf").val(),
		deficiency: $("#deficiency").val(),
	}

	$.ajax({
		type: "POST",
		url: url + "/auth/register",
		data: user,
		xhrFields: {
			crossDomain: true,
			withCredentials: true
		},
		success: function(user){
			clear();
			$('#headerModal').html("Uhul");
			$('#pModal').html("Usuário inserido com sucesso!");
			openModal();
		}, 
		error: function(e){
			$('#headerModal').html("Erro");
			$('#pModal').html(e.responseJSON.error);
			openModal();
		} 
	});
}

// Atualizar usuário
function searchUser() {
	$.ajax({
		type: "GET",
		url: url + "/auth/users/" + $("#updateId").val(),
		xhrFields: {
			crossDomain: true,
			withCredentials: true
		},
		success: function(data){
			$('#name_user').val(data.name);
			$('#email_user').val(data.email);
			$('#password_user').val(data.password);
			$('#phone_user').val(data.phone);
			$('#cpf_user').val(data.cpf);
			$('#deficiency_user').val(data.deficiency);
			$('#dataUser').removeClass('hide');
		}, 
		error: function(e){
			$('#headerModal').html("Erro");
			$('#pModal').html(e.responseJSON.error);
			openModal();
		} 
	});
}

function updateUser() {
	const user = {
		name: $("#name_user").val(),
		password: $("#password_user").val(),
		phone: $("#phone_user").val(),
		deficiency: $("#deficiency_user").val(),
	}
	$('#results').removeClass('hide').html('teste'+ user.name);

	$.ajax({
		type: "POST",
		url: url + "/auth/users/" + $("#updateId").val(),
		data: user,
		xhrFields: {
			crossDomain: true,
			withCredentials: true
		},
		success: function(user){
			$('#headerModal').html("Aee");
			$('#pModal').html("Usuário atualizado com sucesso!");
			openModal();
		}, 
		error: function(e){
			$('#headerModal').html("Erro");
			$('#pModal').html(e.responseJSON.error);
			openModal();
		} 
	});
}