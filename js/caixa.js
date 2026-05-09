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

function carregarCaixa() {
  const pedidos = getData("pedidos");
  const hoje = hojeBR();

  const vendasHoje = pedidos.filter(pedido => pedido.data === hoje);

  const totalHoje = vendasHoje.reduce((soma, pedido) => soma + Number(pedido.total || 0), 0);

  const totalPix = vendasHoje
    .filter(pedido => pedido.pagamento === "Pix")
    .reduce((soma, pedido) => soma + Number(pedido.total || 0), 0);

  const totalDinheiro = vendasHoje
    .filter(pedido => pedido.pagamento === "Dinheiro")
    .reduce((soma, pedido) => soma + Number(pedido.total || 0), 0);

  const totalCartao = vendasHoje
    .filter(pedido => pedido.pagamento === "Cartão Débito" || pedido.pagamento === "Cartão Crédito")
    .reduce((soma, pedido) => soma + Number(pedido.total || 0), 0);

  document.getElementById("totalHoje").textContent = formatarMoeda(totalHoje);
  document.getElementById("totalPix").textContent = formatarMoeda(totalPix);
  document.getElementById("totalDinheiro").textContent = formatarMoeda(totalDinheiro);
  document.getElementById("totalCartao").textContent = formatarMoeda(totalCartao);

  renderizarVendas(vendasHoje);
}

function renderizarVendas(vendas) {
  const lista = document.getElementById("listaVendas");

  if (!lista) return;

  if (vendas.length === 0) {
    lista.innerHTML = `<p class="empty">Nenhuma venda registrada hoje.</p>`;
    return;
  }

  lista.innerHTML = vendas.slice().reverse().map(pedido => {
    const itensHtml = pedido.itens
      ? pedido.itens.map(item => `<p>${item.quantidade}x ${item.produto}</p>`).join("")
      : `<p>${pedido.quantidade || 1}x ${pedido.produto || "Produto antigo"}</p>`;

    return `
      <div class="order-item">
        <div>
          <strong>#${pedido.id}</strong>
          <p>${pedido.cliente || "Cliente não informado"} • ${pedido.tipo}</p>
          ${itensHtml}
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

function fecharCaixa() {
  const pedidos = getData("pedidos");
  const hoje = hojeBR();

  const vendasHoje = pedidos.filter(pedido => pedido.data === hoje);

  const total = vendasHoje.reduce((soma, pedido) => soma + Number(pedido.total || 0), 0);

  const fechamento = {
    id: gerarId(),
    data: hoje,
    total,
    quantidadePedidos: vendasHoje.length
  };

  const fechamentos = getData("fechamentos");
  fechamentos.push(fechamento);
  setData("fechamentos", fechamentos);

  alert(`Caixa fechado com sucesso!\nTotal: ${formatarMoeda(total)}\nPedidos: ${vendasHoje.length}`);
}

carregarCaixa();