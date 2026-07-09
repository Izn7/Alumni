
const API_SALVAR_TAREFA = 'http://localhost:8000/Tarefas/Gravar';
const API_ATUALIZAR_TAREFA = 'http://localhost:8000/Tarefas/Atualizar';

let editandoId = null;


async function cadastrarTarefa() {

	const botao = document.getElementById("btnCadastrar");

	botao.disabled = false;
	botao.textContent = "CADASTRAR TAREFA";
	
    const tarefa = {

        nome: document.getElementById("nomeTarefa").value,
        categoria: document.getElementById("categoria").value,
        prioridade: document.getElementById("prioridade").value,
        status: document.getElementById("status").value,
        dataInicio: document.getElementById("dataInicio").value,
        dataEntrega: document.getElementById("dataEntrega").value,
        cargaHoraria: parseInt(document.getElementById("cargaHoraria").value),
        descricao: document.getElementById("objetivo").value,

        
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

	    alert(editandoId
	        ? "Tarefa atualizada com sucesso!"
	        : "Tarefa cadastrada com sucesso!");

	    editandoId = null;

	  
	    window.history.back();

	} else {

	    const erro = await response.text();
	    console.log(erro);
	    alert(erro);

	}
}