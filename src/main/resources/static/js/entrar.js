const API_LOGIN_ESTAGIARIO = 'http://localhost:8000/Estagiarios/login';
const API_LOGIN_EMPRESA = 'http://localhost:8000/Empresas/login';
const API_LOGIN_GESTOR = 'http://localhost:8000/Gestor/login';

let perfilAtivo = 'estagiario';

function setProfile(perfil, botaoClicado) {

    perfilAtivo = perfil;

    document.querySelectorAll('.ptab')
        .forEach(aba => aba.classList.remove('on'));

    botaoClicado.classList.add('on');

    const inputEmail = document.getElementById('email');

    if (perfil === 'estagiario') {
        inputEmail.placeholder = 'seu.email@empresa.com';
    } 
    else if (perfil === 'gestor') {
        inputEmail.placeholder = 'seu.nome@empresa.com.br';
    } 
    else if (perfil === 'empresa') {
        inputEmail.placeholder = 'cnpj@empresa.com';
    }
}

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('login-form').addEventListener('submit', async function(e) {
        e.preventDefault();

        const emailValue = document.getElementById('email').value;
        const senhaValue = document.getElementById('senha').value;

        let url = "";
        let body = {};

        if (perfilAtivo === "gestor") {
            url = API_LOGIN_GESTOR;
            body = { email: emailValue, senha: senhaValue };

        } else if (perfilAtivo === "estagiario") {
            url = API_LOGIN_ESTAGIARIO;
            body = { email: emailValue, senha: senhaValue };

        } else if (perfilAtivo === "empresa") {
            url = API_LOGIN_EMPRESA;
            body = { cnpj: emailValue, senha: senhaValue };
        }

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            alert("Login realizado com sucesso!");
            const data = await response.json();
            console.log(data);

            if (perfilAtivo === "gestor") {
                window.location.href = "indexGestor.html";
            } 
            else if (perfilAtivo === "estagiario") {
                window.location.href = "detalhesTarefa.html";
            } 
            else if (perfilAtivo === "empresa") {
                window.location.href = "painelEmpresa.html";
            }

        } else {
            alert("Usuário ou senha inválidos!");
        }
    });

});