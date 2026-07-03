// Chamando API
const API_SALVAR = 'http://localhost:8000/Estagiarios/Gravar';
const API_ATUALIZAR = 'http://localhost:8000/Estagiarios/Atualizar';
const API_BUSCAR_ID = 'http://localhost:8000/Estagiarios/BuscarPorId';

let editandoId = null;


document.addEventListener("DOMContentLoaded", () => {

    const parametros = new URLSearchParams(window.location.search);

    editandoId = parametros.get("id");

    if (editandoId) {

		
		document.querySelector(".form-hd h2").textContent = "Editar Estagiário";

		document.querySelector(".btn-submit").textContent = "SALVAR ALTERAÇÕES";

		document.getElementById("secaoSenha").style.display = "none";

		       carregarEstagiario();

    }

});


async function carregarEstagiario() {

    const response = await fetch(`${API_BUSCAR_ID}/${editandoId}`);

    const estagiario = await response.json();

    document.getElementById("nome").value = estagiario.nome;
    document.getElementById("sobrenome").value = estagiario.sobrenome;
    document.getElementById("email").value = estagiario.email;
    document.getElementById("cpf").value = estagiario.cpf;
    document.getElementById("dataNascimento").value = estagiario.dataNascimento;
    document.getElementById("instituicao").value = estagiario.instituicao;
    document.getElementById("curso").value = estagiario.curso;
    document.getElementById("semestre").value = estagiario.semestre;
    document.getElementById("cargo").value = estagiario.cargo;
    document.getElementById("inicioEstagio").value = estagiario.inicioEstagio;
    document.getElementById("terminoEstagio").value = estagiario.terminoEstagio;
    document.getElementById("cargaHoraria").value = estagiario.cargaHoraria;

    
    document.getElementById("gestor").value = estagiario.gestor.id;

}

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
	    isFirstLogin: true,

	    gestor: {
	        id: parseInt(document.getElementById("gestor").value)
	    }

	};
	
	const cpfLimpo = estagiario.cpf.replace(/\D/g, "");

	if (!validaCPF(cpfLimpo)) {
	    alert("CPF inválido.");
	    document.getElementById("cpf").focus();
	    return;
	}

	// Só envia a senha quando for um cadastro novo
	if (!editandoId) {
	    estagiario.senha = document.getElementById("senha").value;
	}
	

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

	    alert(editandoId
	        ? "Estagiário atualizado com sucesso!"
	        : "Estagiário cadastrado com sucesso!");

	    window.location.href = "gestao.html";

	}else{

	    const erro = await response.text();

	    console.log(erro);

	    alert(erro);

		}
	};

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

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);

  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) 
    Resto = 0

  if (Resto != parseInt(strCPF.substring(9, 10)) )
    return false

  Soma = 0

  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i)

  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) 
    Resto = 0

  if (Resto != parseInt(strCPF.substring(10, 11) ) )
    return false

  return true
  
  
  
}

window.cadastrarEstagiario = cadastrarEstagiario;

window.validaCPF = validaCPF;



