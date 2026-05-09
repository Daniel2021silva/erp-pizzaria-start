verificarLogin();

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

const estoqueForm = document.getElementById("estoqueForm");

if (estoqueForm) {

  estoqueForm.addEventListener("submit", function(event){

    event.preventDefault();

    const produto = {
      id: gerarId(),
      nome: document.getElementById("produtoNome").value.trim(),
      quantidade: Number(document.getElementById("produtoQuantidade").value),
      custo: Number(document.getElementById("produtoCusto").value),
      venda: Number(document.getElementById("produtoVenda").value)
    };

    const estoque = getData("estoque");

    estoque.push(produto);

    setData("estoque", estoque);

    estoqueForm.reset();

    carregarEstoque();

  });

}

function excluirProduto(id){

  const estoque = getData("estoque");

  const atualizado = estoque.filter(produto => produto.id !== id);

  setData("estoque", atualizado);

  carregarEstoque();

}

function carregarEstoque(){

  const lista = document.getElementById("listaEstoque");

  if(!lista) return;

  const estoque = getData("estoque").reverse();

  if(estoque.length === 0){

    lista.innerHTML = `
      <p class="empty">
        Nenhum produto cadastrado.
      </p>
    `;

    return;
  }

  lista.innerHTML = estoque.map(produto => {

    const baixo = produto.quantidade <= 5;

    return `

      <div class="estoque-card ${baixo ? "baixo" : ""}">

        <div class="estoque-top">

          <h3>${produto.nome}</h3>

          ${
            baixo
            ?
            `<span class="estoque-alerta">ESTOQUE BAIXO</span>`
            :
            ``
          }

        </div>

        <div class="estoque-info">

          <p><strong>Quantidade:</strong> ${produto.quantidade}</p>

          <p><strong>Custo:</strong> ${formatarMoeda(produto.custo)}</p>

          <p><strong>Venda:</strong> ${formatarMoeda(produto.venda)}</p>

          <p><strong>Lucro:</strong> ${formatarMoeda(produto.venda - produto.custo)}</p>

        </div>

        <button
          onclick="excluirProduto('${produto.id}')"
          class="btn-delete"
        >
          Excluir
        </button>

      </div>

    `;

  }).join("");

}

carregarEstoque();