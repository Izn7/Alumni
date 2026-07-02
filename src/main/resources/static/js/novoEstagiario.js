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

function validaCPF(cpf) {
  var Soma = 0
  var Resto

  var strCPF = String(cpf).replace(/[^\d]/g, '')
  
  if (strCPF.length !== 11)
     return false
  
  if ([
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    ].indexOf(strCPF) !== -1)
    return false

  for (i=1; i<=9; i++)
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);

  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) 
    Resto = 0

  if (Resto != parseInt(strCPF.substring(9, 10)) )
    return false

  Soma = 0

  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i)

  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) 
    Resto = 0

  if (Resto != parseInt(strCPF.substring(10, 11) ) )
    return false

  return true
}



