const API_BUSCAR_ENTREGAS =
    "http://localhost:8000/TarefasConcluidas/BuscarTodos";

const API_ARQUIVOS =
    "http://localhost:8000/img/";

let entregas = [];

async function carregarEntregas() {

    try {

        const response = await fetch(API_BUSCAR_ENTREGAS);

        if (!response.ok) {

            alert("Erro ao carregar entregas.");

            return;
        }

        entregas = await response.json();

        atualizarCards();

        renderizarEntregas(entregas);

    } catch (e) {

        console.error(e);

        alert("Erro ao conectar ao servidor.");

    }

}

function atualizarCards() {

    document.getElementById("qtdEntregas").innerText =
        entregas.length;

    let hoje = 0;

    const dataHoje = new Date().toLocaleDateString();

    entregas.forEach(e => {

        if (e.dataHora) {

            const dataEntrega =
                new Date(e.dataHora).toLocaleDateString();

            if (dataEntrega === dataHoje) {

                hoje++;

            }

        }

    });

    document.getElementById("qtdHoje").innerText =
        hoje;

    document.getElementById("qtdPendentes").innerText =
        entregas.length;

}

function renderizarEntregas(lista) {

    const container =
        document.getElementById("listaEntregas");

    container.innerHTML = "";

    if (lista.length === 0) {

        container.innerHTML = `
            <div class="entrega">

                <h3>Nenhuma entrega encontrada.</h3>

            </div>
        `;

        return;

    }

    lista.forEach(item => {

        container.innerHTML += `

            <div class="entrega">

                <h3>${item.tarefasEntity.nome}</h3>

                <p>

                    <strong>Estagiário:</strong>

                    ${item.estagiario.nome}
                    ${item.estagiario.sobrenome}

                </p>

                <p>

                    <strong>Observações:</strong>

                    ${item.observacoes ?? "-"}

                </p>

                <div class="info">

                    <span>

                        📅 ${formatarData(item.dataHora)}

                    </span>

                </div>

                <div class="acoes">

                    <button
                        class="btn-download"
                        onclick="visualizarArquivo('${item.uploadTarefas}')">

                        Visualizar

                    </button>

                    <button
                        class="btn-aprovar"
                        onclick="aprovarEntrega(${item.id})">

                        Aprovar

                    </button>

                    <button
                        class="btn-reprovar"
                        onclick="reprovarEntrega(${item.id})">

                        Reprovar

                    </button>

                </div>

            </div>

        `;

    });

}

function pesquisar() {

    const texto =
        document.getElementById("buscar")
        .value
        .toLowerCase();

    const resultado = entregas.filter(item =>

        item.estagiario.nome.toLowerCase().includes(texto) ||

        item.estagiario.sobrenome.toLowerCase().includes(texto) ||

        item.tarefasEntity.nome.toLowerCase().includes(texto)

    );

    renderizarEntregas(resultado);

}

function visualizarArquivo(nomeArquivo) {

    window.open(
        API_ARQUIVOS + nomeArquivo,
        "_blank"
    );

}

async function aprovarEntrega(id){

    const response = await fetch(

        "http://localhost:8000/TarefasConcluidas/Aprovar/" + id,

        {
            method:"PUT"
        }

    );

    if(response.ok){

        alert("Entrega aprovada!");

        carregarEntregas();

    }else{

        alert("Erro ao aprovar.");

    }

}

async function reprovarEntrega(id){

    const response = await fetch(

        "http://localhost:8000/TarefasConcluidas/Reprovar/" + id,

        {
            method:"PUT"
        }

    );

    if(response.ok){

        alert("Entrega reprovada!");

        carregarEntregas();

    }else{

        alert("Erro ao reprovar.");

    }

}

function formatarData(data) {

    if (!data)
        return "-";

    return new Date(data)
        .toLocaleString("pt-BR");

}

document
    .getElementById("buscar")
    .addEventListener("input", pesquisar);

document.addEventListener(
    "DOMContentLoaded",
    carregarEntregas
);