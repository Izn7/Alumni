async function carregarPerfilGestor() {

    try {

        const gestor = await buscarGestorLogado();


        document.getElementById("nomeTopo").textContent =
            gestor.nome;


        document.getElementById("nomeGestor").textContent =
            gestor.nome + " " + gestor.sobrenome;


    } catch (erro) {

        console.error("Erro ao carregar perfil do gestor:", erro);

    }

}


document.addEventListener("DOMContentLoaded", carregarPerfilGestor);