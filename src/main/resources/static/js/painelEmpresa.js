

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

const API_GESTORES =
	"http://192.168.10.22:1433/Gestores/BuscarTodos";


const API_ESTAGIARIOS =
	"http://192.168.10.22:1433/Estagiarios/BuscarTodos";


document.addEventListener("DOMContentLoaded", () => {

	carregarGestores();

	carregarEstagiarios();

});




async function carregarGestores() {

	try {

		const resposta = await fetch(API_GESTORES);

		const gestores = await resposta.json();

		

		document.getElementById("totalGestores")
		.textContent = gestores.length;

		const tabela =
			document.getElementById("tabelaGestores");


		tabela.innerHTML = "";


		gestores.forEach(g => {


			tabela.innerHTML += `

			<tr class="table-row">


			<td>
			    <div class="av-circle">
			        ${iniciais(g.nome,g.sobrenome)}
			    </div>
			</td>


			<td style="font-weight:600">
			    ${g.nome} ${g.sobrenome}

			    <span class="gc-badge badge-senior">
			        GESTOR
			    </span>
			</td>


			<td style="color:var(--t2)">
			    ${g.departamento ?? "-"}
			</td>


			<td style="font-weight:700">
			    -
			</td>


			<td style="font-weight:700;color:var(--o)">
			    -
			</td>


			<td style="font-weight:700;color:var(--success)">
			    -
			</td>


			<td style="text-align:right">

			<a 
			href="verPerfilGestor.html?id=${g.id}"
			class="btn-view">

			Perfil

			</a>

			</td>


			</tr>

            `;


		});



	} catch (error) {

		console.error(
			"Erro ao buscar gestores:",
			error
		);

	}

}


async function carregarEstagiarios() {


	try {

		const resposta =
			await fetch(API_ESTAGIARIOS);

		const estagiarios =
			await resposta.json();

			document.getElementById("totalEstagiarios")
			.textContent = estagiarios.length;

		const tabela =
			document.getElementById("tabelaEstagiarios");



		tabela.innerHTML = "";



		estagiarios.forEach(e => {


			tabela.innerHTML += `


			<tr class="table-row">


			<td>

			<div class="av-circle">

			${iniciais(e.nome,e.sobrenome)}

			</div>

			</td>



			<td style="font-weight:600">

			${e.nome} ${e.sobrenome}

			</td>



			<td style="color:var(--t2)">

			-

			</td>



			<td style="font-weight:700">

			${e.cpf}

			</td>



			<td style="font-weight:700;color:var(--success)">

			-

			</td>



			<td>

			<span class="status-chip ativo">

			Ativo

			</span>

			</td>



			<td style="text-align:right">

			<a 
			href="detalhes.html?id=${e.id}"
			class="btn-view">

			Perfil

			</a>

			</td>


			</tr>


            `;


		});



	} catch (error) {


		console.error(
			"Erro ao buscar estagiários:",
			error
		);


	}

}


function iniciais(nome, sobrenome) {


	if (!nome)
		return "";


	return (
		nome.charAt(0) +
		(sobrenome ?
			sobrenome.charAt(0) :
			"")
	).toUpperCase();


}