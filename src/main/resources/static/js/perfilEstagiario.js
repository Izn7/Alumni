async function carregarPerfilEstagiario() {

    const estagiario = await buscarEstagiarioLogado();


    document.getElementById("nomeTopo").textContent =
        estagiario.nome;


    document.getElementById("nomeEstagiario").textContent =
        estagiario.nome + " " + estagiario.sobrenome;


    document.getElementById("emailEstagiario").textContent =
        estagiario.email;


    document.getElementById("curso").textContent =
        estagiario.curso;


    document.getElementById("inicioEstagio").textContent =
        estagiario.inicioEstagio;

}


document.addEventListener("DOMContentLoaded", carregarPerfilEstagiario);