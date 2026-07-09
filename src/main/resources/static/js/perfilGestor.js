async function carregarPerfilGestor() {

    const gestor = await buscarGestorLogado();

    document.getElementById("nomeTopo").textContent = gestor.nome;

    document.getElementById("nomeGestor").textContent =
        gestor.nome + " " + gestor.sobrenome;

    document.getElementById("emailGestor").textContent =
        gestor.email;

    document.getElementById("cargoGestor").textContent =
        gestor.cargo;

}

document.addEventListener("DOMContentLoaded", carregarPerfilGestor);