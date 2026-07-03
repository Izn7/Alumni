const API_LOGIN_ESTAGIARIO = 'http://localhost:8000/Estagiarios/login';
const API_LOGIN_EMPRESA = 'http://localhost:8000/Empresas/login';
const API_LOGIN_GESTOR = 'http://localhost:8000/Gestores/login';


let perfilAtivo = 'estagiario';


function VerSenha() {
	const input = document.getElementById("senha");

	if (input.type === "password") {
		input.type = "text";
	} else {
		input.type = "password";
	}
}

function setProfile(perfil, botaoClicado) {

	perfilAtivo = perfil;

	document.querySelectorAll('.ptab')
		.forEach(aba => aba.classList.remove('on'));

	botaoClicado.classList.add('on');

	const inputEmail = document.getElementById('email');

	if (perfil === 'estagiario') {
		inputEmail.placeholder = 'seu.email@empresa.com';
	}
	else if (perfil === 'gestor') {
		inputEmail.placeholder = 'seu.nome@empresa.com.br';
	}
	else if (perfil === 'empresa') {
		inputEmail.placeholder = 'cnpj@empresa.com';
	}
}

document.addEventListener("DOMContentLoaded", function() {

	document.getElementById('login-form').addEventListener('submit', async function(e) {
		e.preventDefault();

		const emailValue = document.getElementById('email').value;
		const senhaValue = document.getElementById('senha').value;

		let url = "";
		let body = {};

		if (perfilAtivo === "gestor") {
			url = API_LOGIN_GESTOR;
			body = { email: emailValue, senha: senhaValue };

		} else if (perfilAtivo === "estagiario") {
			url = API_LOGIN_ESTAGIARIO;
			body = { email: emailValue, senha: senhaValue };

		} else if (perfilAtivo === "empresa") {
			url = API_LOGIN_EMPRESA;
			body = { email: emailValue, senha: senhaValue };
		}




		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		});

		if (!response.ok) {

			if (response.status === 401) {
				alert("Usuário ou senha inválidos.\n\nVerifique se você selecionou o perfil correto (Estagiário, Gestor ou Empresa).");
			} else {
				alert("Erro ao conectar com o servidor.");
			}

			return;
		}

		const usuarioLogado = await response.json();

		if (response.ok) {

			localStorage.setItem("idUsuario", usuarioLogado.id);
			localStorage.setItem("perfilUsuario", perfilAtivo);

			if (usuarioLogado.firstLogin === true || usuarioLogado.isFirstLogin === true) {
				alert("Primeiro acesso! Altere sua senha.");
				window.location.href = "alterarSenha.html";
				return;
			}

			alert("Login realizado com sucesso!");

			if (perfilAtivo === "gestor") {
				window.location.href = "indexGestor.html";

			} else if (perfilAtivo === "estagiario") {
				window.location.href = "detalhesTarefa.html";

			} else if (perfilAtivo === "empresa") {
				window.location.href = "painelEmpresa.html";
			}

		} else {
			alert("Usuário ou senha inválidos!");
		}

	});

});



