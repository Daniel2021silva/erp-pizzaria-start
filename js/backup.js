function exportarBackup() {
  const backup = {};

  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    backup[chave] = localStorage.getItem(chave);
  }

  const arquivo = new Blob(
    [JSON.stringify(backup, null, 2)],
    { type: "application/json" }
  );

  const link = document.createElement("a");
  link.href = URL.createObjectURL(arquivo);
  link.download = "backup-erp-pizzaria-start.json";
  link.click();

  alert("Backup exportado com sucesso!");
}

function importarBackup(event) {
  const arquivo = event.target.files[0];

  if (!arquivo) return;

  const leitor = new FileReader();

  leitor.onload = function(e) {
    try {
      const backup = JSON.parse(e.target.result);

      if (!confirm("Isso vai substituir os dados atuais. Deseja continuar?")) {
        return;
      }

      localStorage.clear();

      Object.keys(backup).forEach(chave => {
        localStorage.setItem(chave, backup[chave]);
      });

      alert("Backup restaurado com sucesso!");
      location.reload();

    } catch (erro) {
      alert("Arquivo de backup inválido.");
    }
  };

  leitor.readAsText(arquivo);
}