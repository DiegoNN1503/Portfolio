const botaoTema = document.querySelector(".botao-tema");
const botaoTopo = document.querySelector(".botao-topo");
const secoesAnimadas = document.querySelectorAll(".animar");
const botoesFiltro = document.querySelectorAll("[data-filtro]");
const projetos = document.querySelectorAll(".projeto-card");
const anoAtual = document.querySelector("[data-ano]");

const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "escuro") {
    document.body.classList.add("tema-escuro");

    if (botaoTema) {
        botaoTema.textContent = "Tema claro";
        botaoTema.setAttribute("aria-label", "Alternar para tema claro");
    }
} else if (botaoTema) {
    botaoTema.textContent = "Tema escuro";
    botaoTema.setAttribute("aria-label", "Alternar para tema escuro");
}

if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

function alternarTema() {
    document.body.classList.toggle("tema-escuro");

    const temaEscuroAtivo = document.body.classList.contains("tema-escuro");

    localStorage.setItem("tema", temaEscuroAtivo ? "escuro" : "claro");
    botaoTema.textContent = temaEscuroAtivo ? "Tema claro" : "Tema escuro";
    botaoTema.setAttribute(
        "aria-label",
        temaEscuroAtivo ? "Alternar para tema claro" : "Alternar para tema escuro"
    );
}

function filtrarProjetos(evento) {
    const filtroSelecionado = evento.target.dataset.filtro;

    botoesFiltro.forEach((botao) => {
        botao.classList.remove("ativo");
    });

    evento.target.classList.add("ativo");

    projetos.forEach((projeto) => {
        const categoriaProjeto = projeto.dataset.categoria;
        const deveMostrar = filtroSelecionado === "todos" || filtroSelecionado === categoriaProjeto;

        projeto.classList.toggle("escondido", !deveMostrar);
    });
}

function controlarBotaoTopo() {
    if (!botaoTopo) {
        return;
    }

    const usuarioRolouPagina = window.scrollY > 300;

    botaoTopo.classList.toggle("visivel", usuarioRolouPagina);
}

function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
        }
    });
}, {
    threshold: 0.2
});

secoesAnimadas.forEach((secao) => {
    observador.observe(secao);
});

if (botaoTema) {
    botaoTema.addEventListener("click", alternarTema);
}

botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", filtrarProjetos);
});

if (botaoTopo) {
    window.addEventListener("scroll", controlarBotaoTopo);
    botaoTopo.addEventListener("click", voltarAoTopo);
}
