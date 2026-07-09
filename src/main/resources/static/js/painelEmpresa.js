

async function carregarPerfilEmpresa() {

    const empresa = await buscarEmpresaLogada();

    document.getElementById("nomeEmpresa").textContent =
        empresa.nomeEmpresa;

    document.getElementById("emailEmpresa").textContent =
        empresa.email;

    document.getElementById("cnpjEmpresa").textContent =
        empresa.cnpj;
}

document.addEventListener("DOMContentLoaded", carregarPerfilEmpresa);