const API_TAREFAS_ESTAGIARIO =
"http://localhost:8000/TarefasUsuario/BuscarPorEstagiario/";

let idEstagiario = null;


async function carregarTarefas(){

    if(!idEstagiario){
        console.error("Estagiário não encontrado");
        return;
    }


    const response = await fetch(
        API_TAREFAS_ESTAGIARIO + idEstagiario
    );


    const tarefas = await response.json();


    const listaPendentes =
        document.getElementById("listaPendentes");


    listaPendentes.innerHTML = "";


    let pendentes = 0;
    let concluidas = 0;


    tarefas.forEach(item => {

        if(item.status === "PENDENTE"){

            pendentes++;
			listaPendentes.innerHTML += `

			<div class="task-item-wrap">

			    <div class="task-item"
			         onclick="this.parentElement.classList.toggle('active')">

			        <span class="task-bullet"></span>

			        <span class="task-text">
			            ${item.tarefasEntity.nome}
			        </span>

			        <span class="task-arrow">
			            ➔
			        </span>

			    </div>


			    <div class="task-detail-content">

			        <header class="task-header">

			            <span class="category-tag">
			                ${item.tarefasEntity.categoria}
			            </span>

			            <div class="task-meta">

			                <span>
			                    <strong>Prazo:</strong>
			                    ${item.tarefasEntity.dataEntrega}
			                </span>

			                <span class="status-badge-pending">
			                    Pendente
			                </span>

			            </div>

			        </header>


			        <div class="detail-grid">

			            <div class="detail-card main-info">

			                <h2>Descrição</h2>

			                <p>
			                    ${item.tarefasEntity.descricao}
			                </p>


			                <p>
			                    <strong>Prioridade:</strong>
			                    ${item.tarefasEntity.prioridade}
			                </p>


			                <p>
			                    <strong>Carga Horária:</strong>
			                    ${item.tarefasEntity.cargaHoraria} horas
			                </p>

			            </div>


			            <div class="detail-card submission-area">

			                <h2>Sua Entrega</h2>

			                <input 
			                    type="file"
			                    id="arquivo-${item.id}">


			                <textarea
			                    id="obs-${item.id}"
			                    placeholder="Observações..."></textarea>


								<button
								    class="btn-submit"
								    onclick="event.stopPropagation(); enviarTarefa(${item.id}, ${item.tarefasEntity.id})">

								    Enviar Atividade

								</button>

			            </div>

			        </div>

			    </div>

			</div>

			`;
        }else{

            concluidas++;

        }

    });


    document.getElementById("qtdPendentes").innerText =
        pendentes;


    document.getElementById("qtdConcluidas").innerText =
        concluidas;


    const total = pendentes + concluidas;


    let percentual = 0;


    if(total > 0){

        percentual = Math.round(
            (concluidas / total) * 100
        );

    }


    document.getElementById("porcentagem").innerText =
        percentual + "% concluído";


    document.getElementById("barraProgresso").style.width =
        percentual + "%";

}



async function carregarUsuarioLogado(){

    const estagiario = await buscarEstagiarioLogado();


    document.getElementById("nomeUsuario").textContent =
        estagiario.nome;


    document.getElementById("perfilUsuario").textContent =
        "Estagiário";


    idEstagiario = estagiario.id;


    carregarTarefas();

}



async function enviarTarefa(idTarefaUsuario, idTarefa){

    const arquivo =
        document.getElementById("arquivo-" + idTarefaUsuario).files[0];


    const observacoes =
        document.getElementById("obs-" + idTarefaUsuario).value;


    if(!arquivo){

        alert("Selecione um arquivo.");
        return;

    }


   


	const form = new FormData();


	form.append("idTarefaUsuario", idTarefaUsuario);
	form.append("idEstagiario", idEstagiario);
	form.append("idTarefa", idTarefa);
	form.append("observacoes", observacoes);
	form.append("arquivo", arquivo);



    const response = await fetch(
        "http://localhost:8000/TarefasConcluidas/Gravar",
        {
            method:"POST",
            body:form
        }
    );


	if(response.ok){

	    alert("Atividade enviada com sucesso!");

	    await carregarTarefas();

	}else{

	    alert("Erro ao enviar atividade.");

	}

    }





document.addEventListener("DOMContentLoaded", () => {

    carregarUsuarioLogado();

});	