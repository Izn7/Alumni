const idEstagiario = sessionStorage.getItem("idEstagiario");

const API_BUSCA_ESTAGIARIO =
`http://localhost:8000/TarefasUsuario/BuscarPorEstagiario/${idEstagiario}`;

const API_BUSCA_ID =
`http://localhost:8000/Estagiarios/BuscarPorId/${idEstagiario}`;

async function carregarMinhasTarefas(){

    const response = await fetch(API_BUSCA_ESTAGIARIO);

    const tarefas = await response.json();

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(t => {

        lista.innerHTML += `
            <div class="card">

                <h3>${t.tarefasEntity.nome}</h3>

                <p>${t.tarefasEntity.descricao}</p>

                <span>${t.tarefasEntity.prioridade}</span>

                <span>${t.status}</span>

            </div>
        `;

    });

}

async function carregarPerfil(){

    const response = await fetch(API_BUSCA_ID);

    const estagiario = await response.json();

    document.getElementById("nomeEstagiario").textContent =
        estagiario.nome + " " + estagiario.sobrenome;

    document.getElementById("nomeTopo").textContent =
        estagiario.nome;

    document.getElementById("emailEstagiario").textContent =
        estagiario.email;

    document.getElementById("curso").textContent =
        estagiario.curso;

    document.getElementById("inicioEstagio").textContent =
        estagiario.inicioEstagio;

}

document.addEventListener("DOMContentLoaded", () => {

    carregarPerfil();

    carregarMinhasTarefas();

});


