// Chamando API
const API_SALVAR = 'http://localhost:8000/Estagiarios/gravar';
const API_ATUALIZAR = 'http://localhost:8000/Estagiarios/Atualizar';


let editandoId = null;


async function cadastrarEstagiario() {

	const estagiario = {

		nome: document.getElementById("nome").value,
		sobrenome: document.getElementById("sobrenome").value,
		email: document.getElementById("email").value,
		cpf: document.getElementById("cpf").value,
		dataNascimento: document.getElementById("dataNascimento").value,
		instituicao: document.getElementById("instituicao").value,
		curso: document.getElementById("curso").value,
		semestre: document.getElementById("semestre").value,
		cargo: document.getElementById("cargo").value,
		inicioEstagio: document.getElementById("inicioEstagio").value,
		terminoEstagio: document.getElementById("terminoEstagio").value,
		cargaHoraria: document.getElementById("cargaHoraria").value,
		senha: document.getElementById("cpf").value,
		isFirstLogin : true,
		fotoPerfil: document.getElementById("fotoPerfil").value,

		gestor: {
			id: parseInt(document.getElementById("gestor").value)
		}
	};

	let response;
	
	if (editandoId) {

		response = await fetch(`${API_ATUALIZAR}/${editandoId}`, {

			method: "PUT",

			headers: {
				"Content-Type": "application/json"
			},

			body: JSON.stringify(estagiario)

		});

	} else {

		response = await fetch(API_SALVAR, {

			method: "POST",

			headers: {
				"Content-Type": "application/json"
			},

			body: JSON.stringify(estagiario)

		});

	}

	if (response.ok) {
		alert("Registro salvo com sucesso!");
		buscarEstagiarios();
		document.getElementById("formEstagiario").reset();
		editandoId = null;
	} else {
		alert("Erro ao salvar.");
	}

}

