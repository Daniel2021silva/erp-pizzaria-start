verificarLogin();

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function hojeBR() {
  return new Date().toLocaleDateString("pt-BR");
}

function carregarDashboard() {
  const pedidos = getData("pedidos");
  const estoque = getData("estoque");

  const hoje = hojeBR();

  const pedidosHoje = pedidos.filter(pedido => pedido.data === hoje);

  const faturamentoHoje = pedidosHoje.reduce((total, pedido) => {
    return total + Number(pedido.total || 0);
  }, 0);

  const pedidosCozinha = pedidos.filter(pedido => {
    return pedido.status !== "entregue" && pedido.status !== "cancelado";
  });

  const estoqueBaixo = estoque.filter(produto => {
    return Number(produto.quantidade || 0) <= 5;
  });

  document.getElementById("faturamentoHoje").textContent = formatarMoeda(faturamentoHoje);
  document.getElementById("pedidosHoje").textContent = pedidosHoje.length;
  document.getElementById("pedidosCozinha").textContent = pedidosCozinha.length;
  document.getElementById("estoqueBaixo").textContent = estoqueBaixo.length;

  const lista = document.getElementById("listaUltimosPedidos");

  if (!lista) return;

  const ultimos = pedidos.slice(-5).reverse();

  if (ultimos.length === 0) {
    lista.innerHTML = `<p class="empty">Nenhum pedido lançado ainda.</p>`;
    return;
  }

  lista.innerHTML = ultimos.map(pedido => `
    <div class="order-item">
      <div>
        <strong>#${pedido.id}</strong>
        <p>${pedido.cliente || "Cliente não informado"}</p>
      </div>
      <div>
        <strong>${formatarMoeda(pedido.total)}</strong>
        <p>${pedido.status}</p>
      </div>
    </div>
  `).join("");
}

carregarDashboard();