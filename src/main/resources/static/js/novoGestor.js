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