const formulario = document.getElementById("form-favorito");
const lugar = document.getElementById("lugar");
const categoria = document.getElementById("categoria");
const mensagem = document.getElementById("mensagem");
const lista = document.getElementById("lista-favoritos");
const btnLimpar = document.getElementById("btn-limpar");

const categorias = {
    "Pontos Turísticos": { icone: "bi-camera-reels", cor: "bg-success-subtle text-success" },
    "Gastronomia": { icone: "bi-cup-hot", cor: "bg-warning-subtle text-warning-emphasis" },
    "Parque": { icone: "bi-tree", cor: "bg-success-subtle text-success" },
    "Cultura e Museus": { icone: "bi-bank", cor: "bg-info-subtle text-info-emphasis" },
    "Vida Noturna": { icone: "bi-moon-stars", cor: "bg-primary-subtle text-primary-emphasis" }
};

const categoriaPadrao = { icone: "bi-geo-alt", cor: "bg-light text-dark" };

let favoritos = [];

const salvo = localStorage.getItem("favoritos");

if (salvo !== null) {
    favoritos = JSON.parse(salvo);
}

function criar(tag, classes, texto) {
    const elemento = document.createElement(tag);
    elemento.className = classes;
    elemento.textContent = texto;
    return elemento;
}

function salvarFavoritos() {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function mostrarMensagem(texto, tipo) {
    mensagem.className = "alert alert-" + tipo + " mb-3";
    mensagem.textContent = texto;
}

function mostrarFavoritos() {
    lista.textContent = "";

    if (favoritos.length === 0) {
        btnLimpar.classList.add("d-none");

        const coluna = criar("div", "col-12", "");
        const vazio = criar("div", "text-center py-5 bg-white rounded-3 shadow-sm border", "");
        const icone = criar("i", "bi bi-bookmark-heart display-4 text-muted mb-2 d-block", "");
        const titulo = criar("p", "text-muted mb-0 fw-medium", "Nenhum lugar salvo ainda.");
        const dica = criar("small", "text-secondary", "Adicione seus locais favoritos de Curitiba acima!");

        vazio.appendChild(icone);
        vazio.appendChild(titulo);
        vazio.appendChild(dica);
        coluna.appendChild(vazio);
        lista.appendChild(coluna);
        return;
    }

    btnLimpar.classList.remove("d-none");

    for (let i = 0; i < favoritos.length; i++) {
        const favorito = favoritos[i];

        let config = categorias[favorito.categoria];

        if (config === undefined) {
            config = categoriaPadrao;
        }

        const coluna = criar("div", "col-12 col-md-6 col-lg-4", "");
        const cartao = criar("div", "card h-100 border-0 shadow-sm", "");
        const corpo = criar("div", "card-body d-flex flex-column justify-content-between p-3", "");
        const grupo = criar("div", "", "");
        const topo = criar("div", "d-flex justify-content-between align-items-start mb-2", "");

        const etiqueta = criar("span", "badge " + config.cor + " rounded-pill px-3 py-2 fw-medium d-flex align-items-center gap-1", "");
        const iconeCategoria = criar("i", "bi " + config.icone, "");
        const textoCategoria = criar("span", "", favorito.categoria);

        etiqueta.appendChild(iconeCategoria);
        etiqueta.appendChild(textoCategoria);

        const botaoRemover = criar("button", "btn btn-link text-danger p-0 border-0", "");
        const iconeLixeira = criar("i", "bi bi-trash fs-5", "");
        botaoRemover.title = "Remover item";
        botaoRemover.appendChild(iconeLixeira);

        botaoRemover.addEventListener("click", function () {
            favoritos.splice(i, 1);
            salvarFavoritos();
            mostrarFavoritos();
        });

        topo.appendChild(etiqueta);
        topo.appendChild(botaoRemover);

        const nome = criar("h5", "card-title fw-bold text-dark mt-2 mb-1", favorito.nome);

        grupo.appendChild(topo);
        grupo.appendChild(nome);

        const rodape = criar("div", "mt-3 pt-2 border-top d-flex justify-content-end", "");
        const link = criar("a", "btn btn-sm btn-outline-success rounded-pill d-flex align-items-center gap-1", "");
        const iconeMapa = criar("i", "bi bi-map", "");
        const textoLink = criar("span", "", "Ver no Mapa");

        link.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(favorito.nome + " Curitiba");
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.appendChild(iconeMapa);
        link.appendChild(textoLink);
        rodape.appendChild(link);

        corpo.appendChild(grupo);
        corpo.appendChild(rodape);
        cartao.appendChild(corpo);
        coluna.appendChild(cartao);
        lista.appendChild(coluna);
    }
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = lugar.value.trim();
    const tipo = categoria.value;

    if (nome === "") {
        mostrarMensagem("Por favor, digite o nome de um lugar.", "danger");
        return;
    }

    favoritos.push({ nome: nome, categoria: tipo });
    salvarFavoritos();
    mostrarFavoritos();

    lugar.value = "";
    lugar.focus();
    mostrarMensagem(nome + " adicionado aos favoritos.", "success");
});

btnLimpar.addEventListener("click", function () {
    if (confirm("Tem certeza que deseja remover todos os favoritos da lista?")) {
        favoritos = [];
        localStorage.removeItem("favoritos");
        mostrarFavoritos();
        mostrarMensagem("Sua lista de favoritos foi limpa.", "info");
    }
});

mostrarFavoritos();
