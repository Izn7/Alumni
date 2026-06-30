// Chamando API
const API_SALVAR_TAREFA = 'http://localhost:8000/TarefasUsuario/gravar';
const API_ATUALIZAR_TAREFA = 'http://localhost:8000/TarefasUsuario/Atualizar';

let editandoId = null;

async function cadastrarTarefa() {

    const tarefa = {

        nome: document.getElementById("nome").value,
        categoria: document.getElementById("categoria").value,
        prioridade: document.getElementById("prioridade").value,
        status: document.getElementById("status").value,
        dataInicio: document.getElementById("dataInicio").value,
        dataEntrega: document.getElementById("dataEntrega").value,
        cargaHoraria: parseInt(document.getElementById("cargaHoraria").value),
        descricao: document.getElementById("descricao").value,

        estagiario: {
            id: parseInt(document.getElementById("estagiario").value)
        }
    };

    let response;

    if (editandoId) {

        response = await fetch(`${API_ATUALIZAR_TAREFA}/${editandoId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(tarefa)
        });

    } else {

        response = await fetch(API_SALVAR_TAREFA, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(tarefa)
        });
    }

    if (response.ok) {
        alert("Tarefa salva com sucesso!");
        buscarTarefas(); // função de listagem
        document.getElementById("formTarefa").reset();
        editandoId = null;
    } else {
        alert("Erro ao salvar tarefa.");
    }
}