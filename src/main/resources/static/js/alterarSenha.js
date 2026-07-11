const API_ATUALIZAR_SENHA_ESTAGIARIO = "http://192.168.10.22:1433/Estagiarios/Atualizar";
const API_ATUALIZAR_SENHA_EMPRESA = "http://192.168.10.22:1433/Empresas/Atualizar";
const API_ATUALIZAR_SENHA_GESTOR = "http://192.168.10.22:1433/Gestores/Atualizar";

function VerSenha(idCampo) {

    const campo = document.getElementById(idCampo);

    if (campo.type === "password") {
        campo.type = "text";
    } else {
        campo.type = "password";
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const id = localStorage.getItem("idUsuario");
    const perfil = localStorage.getItem("perfilUsuario");

    if (!id || !perfil) {
        alert("Sessão inválida.");
        window.location.href = "entrar.html";
        return;
    }

    let api = "";

    switch (perfil) {
        case "estagiario":
            api = API_ATUALIZAR_SENHA_ESTAGIARIO;
            break;

        case "gestor":
            api = API_ATUALIZAR_SENHA_GESTOR;
            break;

        case "empresa":
            api = API_ATUALIZAR_SENHA_EMPRESA;
            break;

        default:
            alert("Perfil inválido.");
            window.location.href = "entrar.html";
            return;
    }

    document.getElementById("formAlterarSenha").addEventListener("submit", async function (e) {

        e.preventDefault();

        const novaSenha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmarSenha").value;

        if (novaSenha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        const response = await fetch(`${api}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                senha: novaSenha
            })
        });

        if (response.ok) {

            alert("Senha alterada com sucesso!");

            localStorage.removeItem("idUsuario");
            localStorage.removeItem("perfilUsuario");

            window.location.href = "entrar.html";

        } else {

            alert("Erro ao alterar a senha.");

        }

    });

});