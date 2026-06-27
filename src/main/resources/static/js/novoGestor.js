// Chamando API
const API_SALVAR = "http://localhost:8080/Gestores/gravar";

async function cadastrarGestor() {

    const gestor = {

        nome: document.getElementById("nome").value,
        sobrenome: document.getElementById("sobrenome").value,
        email: document.getElementById("email").value,
        cpf: document.getElementById("cpf").value,
        dataNascimento: document.getElementById("dataNascimento").value,
        cargo: document.getElementById("cargo").value,
        senha: document.getElementById("senha").value,
        fotoPerfil: document.getElementById("fotoPerfil").value
		

    };

    const response = await fetch(API_SALVAR, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(gestor)

    });

    if (response.ok) {
        alert("Gestor cadastrado com sucesso!");
        document.getElementById("formGestor").reset();
    } else {
        alert("Erro ao cadastrar gestor.");
    }

}