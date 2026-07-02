// Chamando API
const API_SALVAR_GESTOR = 'http://localhost:8080/Gestor/gravar';
const API_ATUALIZAR_GESTOR = 'http://localhost:8080/Gestor/Atualizar';

let editandoId = null;

async function cadastrarGestor() {

    const gestor = {

        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        email: document.getElementById("email").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        cargo: document.getElementById("cargo").value,
        senha: document.getElementById("senha").value,
        departamento: document.getElementById("departamento").value,
        fotoPerfil: document.getElementById("fotoPerfil").value
    };

    let response;

    if (editandoId) {

        response = await fetch(`${API_ATUALIZAR_GESTOR}/${editandoId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(gestor)
        });

    } else {

        response = await fetch(API_SALVAR_GESTOR, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(gestor)
        });
    }

    if (response.ok) {
        alert("Gestor salvo com sucesso!");
        buscarGestores(); // função de listagem
        document.getElementById("formGestor").reset();
        editandoId = null;
    } else {
        alert("Erro ao salvar gestor.");
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
