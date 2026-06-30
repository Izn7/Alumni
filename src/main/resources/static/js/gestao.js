const API_BUSCAR_TODOS_ESTAGIARIOS = 'http://localhost:8000/Estagiarios/BuscarTodos';

async function buscarEstagiarios() {

    const response = await fetch(API_BUSCAR_TODOS_ESTAGIARIOS, {
        method: 'GET'
    });

    const estagiarios = await response.json();

    const tbody = document.getElementById('tabelaEstagiarios');
    tbody.innerHTML = "";

    estagiarios.forEach(estagiario => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${estagiario.id}</td>
            <td>${estagiario.nome}</td>
            <td>${estagiario.sobrenome}</td>
            <td>${estagiario.email}</td>
            <td>${estagiario.cpf}</td>
            <td>${estagiario.dataNascimento ?? ""}</td>
            <td>${estagiario.instituicao ?? ""}</td>
            <td>${estagiario.curso ?? ""}</td>
            <td>${estagiario.semestre ?? ""}</td>
            <td>${estagiario.cargo ?? ""}</td>
            <td>${estagiario.inicioEstagio ?? ""}</td>
            <td>${estagiario.terminoEstagio ?? ""}</td>
            <td>${estagiario.cargaHoraria ?? ""}</td>
            <td>${estagiario.gestor ? estagiario.gestor.nome : "-"}</td>
            <td>${estagiario.firstLogin ? "Sim" : "Não"}</td>
            <td>
                <button class="btn btn-warning btn-sm"
                    onclick="editar(${estagiario.id})">
                    Editar
                </button>

                <button class="btn btn-danger btn-sm"
                    onclick="deletar(${estagiario.id})">
                    Deletar
                </button>
            </td>
        `;

        tbody.appendChild(tr);

    });

}