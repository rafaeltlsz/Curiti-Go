const menuToggle = document.getElementById("menu-toggle");
const menuPrincipal = document.getElementById("menu-principal");

menuToggle.addEventListener("click", function () {
    menuPrincipal.classList.toggle("aberto");
});
