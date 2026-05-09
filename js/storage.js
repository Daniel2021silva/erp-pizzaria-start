function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function gerarId() {
  return Date.now().toString();
}

function verificarLogin() {
  const logado = localStorage.getItem("erpLogado");

  if (logado !== "true") {
    window.location.href = "index.html";
  }
}

function sairSistema() {
  localStorage.removeItem("erpLogado");
  localStorage.removeItem("erpUsuario");
  window.location.href = "index.html";
}