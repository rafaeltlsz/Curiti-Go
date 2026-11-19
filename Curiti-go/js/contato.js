const formulario = document.getElementById("form-contato");
const campoNome = document.getElementById("nome");
const campoAssunto = document.getElementById("assunto");
const alertaContato = document.getElementById("alerta-contato");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const assunto = campoAssunto.value;

    if (nome.length < 3) {
        alertaContato.className = "alert alert-danger mb-3";
        alertaContato.textContent = "Por favor, digite um nome válido com pelo menos 3 caracteres.";
        return;
    }

    alertaContato.className = "alert alert-success mb-3";
    alertaContato.textContent = "Obrigado, " + nome + "! Recebemos sua mensagem sobre " + assunto + ".";

    formulario.reset();
});
