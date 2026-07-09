async function carregarPerfilGestor() {

    const gestor = await buscarGestorLogado();

    document.getElementById("nomeTopo").textContent = gestor.nome;

    document.getElementById("nomeGestor").textContent =
        gestor.nome + " " + gestor.sobrenome;
		}
		
		document.addEventListener("DOMContentLoaded", carregarPerfilGestor);