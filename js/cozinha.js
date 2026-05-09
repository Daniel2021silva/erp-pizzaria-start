verificarLogin();

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function carregarCozinha() {

  const grid = document.getElementById("cozinhaGrid");

  if (!grid) return;

  const pedidos = getData("pedidos")
    .filter(pedido => pedido.status !== "entregue")
    .reverse();

  if (pedidos.length === 0) {
    grid.innerHTML = `
      <div class="empty-kitchen">
        <h2>🍕 Nenhum pedido na cozinha</h2>
      </div>
    `;
    return;
  }

  grid.innerHTML = pedidos.map(pedido => `
  
    <div class="kitchen-card status-${pedido.status}">
    
      <div class="kitchen-top">
        <span>#${pedido.id}</span>
        <strong>${pedido.status}</strong>
      </div>

      <h2>${pedido.cliente}</h2>

      <div class="kitchen-info">
        <p><strong>Produto:</strong> ${pedido.quantidade}x ${pedido.produto}</p>
        <p><strong>Tipo:</strong> ${pedido.tipo}</p>
        <p><strong>Pagamento:</strong> ${pedido.pagamento}</p>
        <p><strong>Total:</strong> ${formatarMoeda(pedido.total)}</p>
      </div>

      <div class="kitchen-obs">
        ${pedido.observacao || "Sem observações"}
      </div>

      <div class="kitchen-actions">

        <button onclick="alterarStatus('${pedido.id}', 'preparando')" class="btn-yellow">
          Preparando
        </button>

        <button onclick="alterarStatus('${pedido.id}', 'pronto')" class="btn-green">
          Pronto
        </button>

        <button onclick="alterarStatus('${pedido.id}', 'entregue')" class="btn-red">
          Entregue
        </button>

      </div>

    </div>

  `).join("");
}

function alterarStatus(id, novoStatus) {

  const pedidos = getData("pedidos");

  const atualizados = pedidos.map(pedido => {

    if (pedido.id === id) {
      pedido.status = novoStatus;
    }

    return pedido;
  });

  setData("pedidos", atualizados);

  carregarCozinha();
}

carregarCozinha();