const idUsuario = localStorage.getItem("idUsuario");

const API_GESTOR = "http://localhost:8000/Gestores/BuscarPorId/";
const API_EMPRESA = "http://localhost:8000/Empresas/BuscarPorId/";
const API_ESTAGIARIO = "http://localhost:8000/Estagiarios/BuscarPorId/";

async function buscarGestorLogado() {

    const response = await fetch(API_GESTOR + idUsuario);

    return await response.json();

}

async function buscarEmpresaLogada() {

    const response = await fetch(API_EMPRESA + idUsuario);

    return await response.json();

}

async function buscarEstagiarioLogado() {

    const response = await fetch(API_ESTAGIARIO + idUsuario);

    return await response.json();

}

function logout() {

    localStorage.clear();

    window.location.href = "index.html";

}