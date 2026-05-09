verificarLogin();

let carrinhoPedido = [];

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function hojeBR() {
  return new Date().toLocaleDateString("pt-BR");
}

function calcularTotalCarrinho() {
  return carrinhoPedido.reduce((total, item) => {
    return total + Number(item.subtotal || 0);
  }, 0);
}

function adicionarItem() {
  const produtoInput = document.getElementById("produto");
  const quantidadeInput = document.getElementById("quantidade");
  const valorInput = document.getElementById("valor");

  const produto = produtoInput.value.trim();
  const quantidade = Number(quantidadeInput.value);
  const valor = Number(valorInput.value);

  if (!produto || quantidade <= 0 || valor <= 0) {
    alert("Preencha produto, quantidade e valor corretamente.");
    return;
  }

  const item = {
    id: gerarId(),
    produto,
    quantidade,
    valor,
    subtotal: quantidade * valor
  };

  carrinhoPedido.push(item);

  produtoInput.value = "";
  quantidadeInput.value = 1;
  valorInput.value = "";

  renderizarCarrinho();
}

function removerItem(id) {
  carrinhoPedido = carrinhoPedido.filter(item => item.id !== id);
  renderizarCarrinho();
}

function renderizarCarrinho() {
  const lista = document.getElementById("listaItensPedido");
  const totalPedido = document.getElementById("totalPedido");

  if (!lista || !totalPedido) return;

  if (carrinhoPedido.length === 0) {
    lista.innerHTML = `<p class="empty">Nenhum item adicionado.</p>`;
    totalPedido.textContent = formatarMoeda(0);
    return;
  }

  lista.innerHTML = carrinhoPedido.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.quantidade}x ${item.produto}</strong>
        <p>${formatarMoeda(item.valor)} cada</p>
      </div>

      <div>
        <strong>${formatarMoeda(item.subtotal)}</strong>
        <button type="button" onclick="removerItem('${item.id}')">Remover</button>
      </div>
    </div>
  `).join("");

  totalPedido.textContent = formatarMoeda(calcularTotalCarrinho());
}

const pedidoForm = document.getElementById("pedidoForm");

if (pedidoForm) {
  pedidoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (carrinhoPedido.length === 0) {
      alert("Adicione pelo menos um item ao pedido.");
      return;
    }

    const pedido = {
      id: gerarId(),
      data: hojeBR(),
      cliente: document.getElementById("cliente").value.trim(),
      telefone: document.getElementById("telefone").value.trim(),
      tipo: document.getElementById("tipo").value,
      pagamento: document.getElementById("pagamento").value,
      itens: carrinhoPedido,
      total: calcularTotalCarrinho(),
      observacao: document.getElementById("observacao").value.trim(),
      status: "novo"
    };

    const pedidos = getData("pedidos");
    pedidos.push(pedido);
    setData("pedidos", pedidos);

    carrinhoPedido = [];
    pedidoForm.reset();
    renderizarCarrinho();
    carregarPedidos();

    alert("Pedido enviado para a cozinha!");
  });
}

function carregarPedidos() {
  const lista = document.getElementById("listaPedidos");
  if (!lista) return;

  const pedidos = getData("pedidos").slice().reverse();

  if (pedidos.length === 0) {
    lista.innerHTML = `<p class="empty">Nenhum pedido lançado ainda.</p>`;
    return;
  }

  lista.innerHTML = pedidos.map(pedido => {
    const itensHtml = pedido.itens
      ? pedido.itens.map(item => `<p>${item.quantidade}x ${item.produto}</p>`).join("")
      : `<p>${pedido.quantidade || 1}x ${pedido.produto || "Produto antigo"}</p>`;

    return `
      <div class="order-item">
        <div>
          <strong>#${pedido.id}</strong>
          <p>${pedido.cliente} • ${pedido.tipo}</p>
          ${itensHtml}
          <p>${pedido.observacao || "Sem observação"}</p>
        </div>

        <div>
          <strong>${formatarMoeda(pedido.total)}</strong>
          <p>${pedido.pagamento}</p>
          <p>Status: ${pedido.status}</p>
        </div>
      </div>
    `;
  }).join("");
}

renderizarCarrinho();
carregarPedidos();