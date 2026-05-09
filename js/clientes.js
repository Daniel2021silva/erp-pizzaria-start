verificarLogin();

const clienteForm = document.getElementById("clienteForm");

if(clienteForm){

  clienteForm.addEventListener("submit", function(event){

    event.preventDefault();

    const cliente = {
      id: gerarId(),
      nome: document.getElementById("clienteNome").value.trim(),
      telefone: document.getElementById("clienteTelefone").value.trim(),
      bairro: document.getElementById("clienteBairro").value.trim(),
      endereco: document.getElementById("clienteEndereco").value.trim(),
      observacoes: document.getElementById("clienteObs").value.trim()
    };

    const clientes = getData("clientes");

    clientes.push(cliente);

    setData("clientes", clientes);

    clienteForm.reset();

    carregarClientes();

  });

}

function excluirCliente(id){

  const clientes = getData("clientes");

  const atualizado = clientes.filter(cliente => cliente.id !== id);

  setData("clientes", atualizado);

  carregarClientes();

}

function carregarClientes(){

  const lista = document.getElementById("listaClientes");

  if(!lista) return;

  const clientes = getData("clientes").reverse();

  if(clientes.length === 0){

    lista.innerHTML = `
      <p class="empty">
        Nenhum cliente cadastrado.
      </p>
    `;

    return;
  }

  lista.innerHTML = clientes.map(cliente => `

    <div class="cliente-card">

      <div class="cliente-top">

        <h3>${cliente.nome}</h3>

        <button
          onclick="excluirCliente('${cliente.id}')"
          class="mini-delete"
        >
          ✕
        </button>

      </div>

      <div class="cliente-info">

        <p><strong>Telefone:</strong> ${cliente.telefone || "Não informado"}</p>

        <p><strong>Bairro:</strong> ${cliente.bairro || "Não informado"}</p>

        <p><strong>Endereço:</strong> ${cliente.endereco || "Não informado"}</p>

      </div>

      <div class="cliente-obs">

        ${cliente.observacoes || "Sem observações"}

      </div>

    </div>

  `).join("");

}

carregarClientes();