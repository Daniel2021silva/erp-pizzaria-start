const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (usuario === "admin" && senha === "1234") {
      localStorage.setItem("erpLogado", "true");
      localStorage.setItem("erpUsuario", usuario);
      window.location.href = "dashboard.html";
    } else {
      alert("Usuário ou senha incorretos.");
    }
  });
}