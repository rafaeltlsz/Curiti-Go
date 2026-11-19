
const fotos = [
  { arquivo: "img/jardim-botanico.jpg",       titulo: "Jardim Botânico",      categoria: "parques" },
  { arquivo: "img/parque-tangua.jpg",         titulo: "Parque Tanguá",        categoria: "parques" },
  { arquivo: "img/opera-de-arame.jpg",        titulo: "Ópera de Arame",       categoria: "arquitetura" },
  { arquivo: "img/museu.jpeg",  titulo: "Museu Oscar Niemeyer", categoria: "arquitetura" },
  { arquivo: "img/torre.jpeg",      titulo: "Torre Panorâmica",     categoria: "cidade" },
  { arquivo: "img/ruaxv.jpg",                titulo: "Rua XV de Novembro",   categoria: "cidade" }
];

const grade       = document.getElementById("grade");
const filtros     = document.querySelectorAll(".filtro");
const lightbox    = document.getElementById("lightbox");
const lbImagem    = document.getElementById("lbImagem");
const lbLegenda   = document.getElementById("lbLegenda");
const btnFechar   = document.getElementById("lbFechar");
const btnAnterior = document.getElementById("lbAnterior");
const btnProxima  = document.getElementById("lbProxima");
const botaoMenu   = document.getElementById("botaoMenu");
const menuTopo    = document.getElementById("menuTopo");

let visiveis = fotos;  // as fotos que estão aparecendo agora
let atual = 0;         // posição da foto aberta no lightbox

function mostrarFotos(categoria) {
  if (categoria === "todas") {
    visiveis = fotos;
  } else {
    visiveis = fotos.filter(function (foto) {
      return foto.categoria === categoria;
    });
  }

  grade.innerHTML = "";

  visiveis.forEach(function (foto, indice) {
    const botao = document.createElement("button");
    botao.className = "foto";
    botao.type = "button";

    const img = document.createElement("img");
    img.src = foto.arquivo;
    img.alt = foto.titulo;
    img.loading = "lazy";

    const legenda = document.createElement("span");
    legenda.textContent = foto.titulo;

    botao.append(img, legenda);
    botao.addEventListener("click", function () {
      abrirLightbox(indice);
    });

    grade.appendChild(botao);
  });
}

filtros.forEach(function (botao) {
  botao.addEventListener("click", function () {
    filtros.forEach(function (b) {
      b.classList.remove("ativo");
    });
    botao.classList.add("ativo");
    mostrarFotos(botao.dataset.categoria);
  });
});

function atualizarLightbox() {
  const foto = visiveis[atual];
  lbImagem.src = foto.arquivo;
  lbImagem.alt = foto.titulo;
  lbLegenda.textContent = foto.titulo + " (" + (atual + 1) + " de " + visiveis.length + ")";
}

function abrirLightbox(indice) {
  atual = indice;
  atualizarLightbox();
  lightbox.classList.add("aberto");
  document.body.classList.add("sem-rolagem");
  btnFechar.focus();
}

function fecharLightbox() {
  lightbox.classList.remove("aberto");
  document.body.classList.remove("sem-rolagem");
}

function proximaFoto() {
  atual = (atual + 1) % visiveis.length;
  atualizarLightbox();
}

function fotoAnterior() {
  atual = (atual - 1 + visiveis.length) % visiveis.length;
  atualizarLightbox();
}

btnFechar.addEventListener("click", fecharLightbox);
btnProxima.addEventListener("click", proximaFoto);
btnAnterior.addEventListener("click", fotoAnterior);

lightbox.addEventListener("click", function (evento) {
  if (evento.target === lightbox) {
    fecharLightbox();
  }
});

document.addEventListener("keydown", function (evento) {
  if (!lightbox.classList.contains("aberto")) {
    return;
  }
  if (evento.key === "Escape")     fecharLightbox();
  if (evento.key === "ArrowRight") proximaFoto();
  if (evento.key === "ArrowLeft")  fotoAnterior();
});

botaoMenu.addEventListener("click", function () {
  const aberto = menuTopo.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);
});

mostrarFotos("todas");