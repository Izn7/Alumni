async function carregarPerfilGestor() {

    try {

        const gestor = await buscarGestorLogado();

        document.getElementById("nomeTopo").textContent =
            gestor.nome + " " + gestor.sobrenome;

        document.getElementById("nomeGestor").textContent =
            gestor.cargo || "Gestor";

    } catch (erro) {

        console.error("Erro ao carregar perfil:", erro);

    }

}

document.addEventListener("DOMContentLoaded", carregarPerfilGestor);