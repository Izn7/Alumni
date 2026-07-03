// Chamando API

const API_SALVAR_GESTOR = "http://localhost:8000/Gestores/Gravar";
const API_ATUALIZAR_GESTOR = "http://localhost:8000/Gestores/Atualizar";

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
        departamento: document.getElementById("departamento").value
    };

    const cpfLimpo = gestor.cpf.replace(/\D/g, "");

    if (!validarCPF(cpfLimpo)) {
        alert("CPF inválido.");
        document.getElementById("cpf").focus();
        return;
    }

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

        document.getElementById("nome").value = "";
        document.getElementById("sobrenome").value = "";
        document.getElementById("email").value = "";
        document.getElementById("cpf").value = "";
        document.getElementById("telefone").value = "";
        document.getElementById("cargo").value = "";
        document.getElementById("senha").value = "";
        document.getElementById("departamento").value = "";

        editandoId = null;

    } else {

        alert("Erro ao salvar gestor.");

    }
}

function validarCPF(cpf) {

    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) return false;

    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;

    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = (soma * 10) % 11;

    if (resto === 10) resto = 0;

    if (resto !== parseInt(cpf.charAt(9))) {
        return false;
    }

    soma = 0;

    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10) resto = 0;

    return resto === parseInt(cpf.charAt(10));
}