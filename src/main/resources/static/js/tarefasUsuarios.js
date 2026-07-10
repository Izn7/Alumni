const API_BUSCAR_TODOS_ESTAGIARIOS = 'http://localhost:8000/Estagiarios/BuscarTodos';
const API_TAREFAS = "http://localhost:8000/Tarefas/BuscarTodos";
const API_GRAVAR = "http://localhost:8000/TarefasUsuario/Gravar";
const API_DELETAR="http://localhost:8000/Tarefas/Deletar";


let tarefas = [];

let estagiarioSelecionado = null;

let tarefasSelecionadas = new Set();

let estagiarios = [];

function voltarPagina(){

    window.history.back();

}


async function listarEstagiarios() {

	const response = await fetch(API_BUSCAR_TODOS_ESTAGIARIOS);



	estagiarios = await response.json();



	const tbody = document.querySelector("tbody");



	tbody.innerHTML = "";
	console.log(tbody);


	estagiarios.forEach((estagiario) => {



		

		const tr = document.createElement("tr");

		tr.innerHTML = `
		    <td>${estagiario.nome}</td>

		    <td>${estagiario.cargo}</td>

		    <td>${estagiario.email}</td>

		    <td class="td-actions">

		        <button class="btn-assign"
		            onclick="abrirPainel(${estagiario.id})">

		            Atribuir

		        </button>

		        <button class="btn-delete"
		            onclick="limparTarefasEstagiario(${estagiario.id})">

		            🗑

		        </button>

		    </td>
		`;



		tbody.appendChild(tr);

		document.getElementById("stat-total").innerText =
		estagiarios.length;
		
	});

}
async function limparTarefas(idEstagiario){

    if(!confirm("Deseja remover as tarefas deste estagiário?")){
        return;
    }


    const response = await fetch(
        "http://localhost:8000/TarefasUsuario/AtualizarStatus/" + idEstagiario,
        {
            method:"PUT"
        }
    );


    if(response.ok){

        alert("Tarefas removidas!");

        listarEstagiarios();

    }else{

        alert("Erro ao remover tarefas.");

    }

}

async function carregarTarefas() {

	const res = await fetch(API_TAREFAS);

	tarefas = await res.json();

}



document.addEventListener("DOMContentLoaded", () => {

	listarEstagiarios();

});









function abrirPainel(id) {

    estagiarioSelecionado = id;

    tarefasSelecionadas.clear();

    const est = estagiarios.find(e => e.id === id);

    document.getElementById("nome-estagiario").innerText = est.nome;

    renderizarTarefas();

    document
        .getElementById("painel-tarefas")
        .classList.add("active");

}

function fecharPainel(){

    document
        .getElementById("painel-tarefas")
        .classList.remove("active");

}


function renderizarTarefas() {

	const q = document.getElementById("busca-tarefa").value?.toLowerCase() || "";



	const filtradas = tarefas.filter(t =>

		(t.descricao ?? "").toLowerCase().includes(q)

	);



	document.getElementById("lista-tarefas").innerHTML = filtradas.map(t => `

        <div onclick="toggleTarefa(${t.id})" style="cursor:pointer;margin:5px 0;">

            <input type="checkbox" ${tarefasSelecionadas.has(t.id) ? "checked" : ""}>

            ${(t.descricao ?? "")}

        </div>

    `).join("");

}



function toggleTarefa(id) {

	if (tarefasSelecionadas.has(id)) {

		tarefasSelecionadas.delete(id);

	} else {

		tarefasSelecionadas.add(id);

	}

	renderizarTarefas();

}





async function salvarTarefasSelecionadas() {



	for (const tarefaId of tarefasSelecionadas) {



		await fetch(API_GRAVAR, {

			method: "POST",

			headers: {

				"Content-Type": "application/json"

			},
			body: JSON.stringify({
			    status: "PENDENTE",
			    tarefasEntity: {
			        id: tarefaId
			    },
			    estagiarios: {
			        id: estagiarioSelecionado
			    }
			})
			

		});



	}



	fecharPainel();

	listarEstagiarios();

}

async function limparTarefasEstagiario(id){

    if(!confirm("Deseja remover as tarefas deste estagiário?")){
        return;
    }

    // sua lógica aqui

}



document.addEventListener("DOMContentLoaded", () => {

	listarEstagiarios();

	carregarTarefas();
	
	const nome =
	    localStorage.getItem("nomeGestor");

	    if(nome){

	        document.querySelector(".nu-name").innerText =
	        nome;

	    }

});