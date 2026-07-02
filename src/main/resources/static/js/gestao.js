const API_BUSCAR_TODOS_ESTAGIARIOS = 'http://localhost:8000/Estagiarios/BuscarTodos';



async function listarEstagiarios() {

    const response = await fetch(API_BUSCAR_TODOS_ESTAGIARIOS);
    const estagiarios = await response.json();
    const tbody = document.querySelector("tbody");


    tbody.innerHTML = "";

    estagiarios.forEach((estagiario) => {


        const tr = document.createElement("tr");

        tr.innerHTML = `

            <td>${estagiario.nome}</td>
            <td>${estagiario.instituicao}</td>
            <td>${estagiario.cargo}</td>
            <td>${estagiario.gestor}</td>

        `;



        tbody.appendChild(tr);

    });

}


document.addEventListener("DOMContentLoaded",()=>{

	listarEstagiarios();

});