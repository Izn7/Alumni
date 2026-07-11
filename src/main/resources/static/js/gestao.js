const API_BUSCAR_TODOS_ESTAGIARIOS = "http://192.168.10.22:1433/Estagiarios/BuscarTodos";
const API_DELETAR = "http://192.168.10.22:1433/Estagiarios/Deletar";


async function listarEstagiarios() {

    try {

        const response = await fetch(API_BUSCAR_TODOS_ESTAGIARIOS);

        const estagiarios = await response.json();

        const tbody = document.querySelector("tbody");

        tbody.innerHTML = "";

        estagiarios.forEach(estagiario => {

            const tr = document.createElement("tr");

            tr.innerHTML = `

                <td>${estagiario.nome}</td>
                <td>${estagiario.instituicao}</td>
                <td>${estagiario.cargo}</td>

                <td class="acoes">

                    <button
                        class="btn-edit"
                        onclick="editar(${estagiario.id})"
                        title="Editar">
                        ✏️
                    </button>

                    <button
                        class="btn-delete"
                        onclick="deletar(${estagiario.id})"
                        title="Excluir">
                        🗑️
                    </button>

                </td>

            `;

            tbody.appendChild(tr);

        });

    } catch (erro) {

        console.error(erro);
        alert("Erro ao buscar os estagiários.");

    }

}


function editar(id) {

    window.location.href = `novoEstagiario.html?id=${id}&origem=gestor`;

}


async function deletar(id) {

    if (!confirm("Deseja realmente excluir este estagiário?")) {
        return;
    }

    try {

        const response = await fetch(`${API_DELETAR}/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {

            alert("Estagiário excluído com sucesso!");

            listarEstagiarios();

        } else {

            const erro = await response.text();

            alert(erro);

        }

    } catch (erro) {

        console.error(erro);
        alert("Erro ao excluir o estagiário.");

    }

}


document.addEventListener("DOMContentLoaded", () => {

    listarEstagiarios();

});

document.addEventListener("DOMContentLoaded", carregarGestor);

async function carregarGestor() {

    const gestor = await buscarGestorLogado();

    document.getElementById("nomeGestor").textContent =
        gestor.nome + " " + gestor.sobrenome;

    document.getElementById("cargoGestor").textContent =
        gestor.cargo;
}