// =============================
// CATÁLOGO DE PERSONAGENS
// =============================

const CATALOGO_CLASSES = Object.freeze({
    nox: Object.freeze({
        id: "nox",
        nomeBase: "Nox",
        classe: "Assassino",
        vida: 85,
        ataque: 34,
        defesa: 6,
        habilidadeOfensiva: "Golpe Sombrio (+12 de ataque)",
        habilidadeDefensiva: "Passo Sombrio (esquiva o próximo golpe da rodada)"
    }),
    iris: Object.freeze({
        id: "iris",
        nomeBase: "Íris",
        classe: "Mago",
        vida: 100,
        ataque: 30,
        defesa: 8,
        habilidadeOfensiva: "Raio Arcano (ignora metade da defesa base)",
        habilidadeDefensiva: "Barreira Arcana (absorve até 12 de dano do próximo golpe)"
    }),
    bronn: Object.freeze({
        id: "bronn",
        nomeBase: "Bronn",
        classe: "Tanque",
        vida: 135,
        ataque: 23,
        defesa: 14,
        habilidadeOfensiva: "Investida de Escudo (+6 de ataque e protege até 6 no próximo golpe)",
        habilidadeDefensiva: "Muralha (reduz pela metade o próximo golpe)"
    })
});

// =============================
// FÁBRICA DE INSTÂNCIAS INDEPENDENTES
// =============================

function criarLutador(classeId, apelidoDigitado, tagJogador) {
    const modelo = CATALOGO_CLASSES[classeId];

    if (!modelo) {
        return null;
    }

    const apelidoLimpo = typeof apelidoDigitado === "string"
        ? apelidoDigitado.trim().slice(0, 24)
        : "";

    const nomeExibicao = apelidoLimpo !== ""
        ? `${apelidoLimpo} (${modelo.nomeBase})`
        : `${modelo.nomeBase} (${tagJogador})`;

    return {
        classeId: modelo.id,
        nomeBase: modelo.nomeBase,
        classe: modelo.classe,
        apelido: apelidoLimpo,
        nomeExibicao: nomeExibicao,
        vidaMax: modelo.vida,
        vidaAtual: modelo.vida,
        ataque: modelo.ataque,
        defesa: modelo.defesa
    };
}

// =============================
// ESTADO DA BATALHA
// =============================

let estadoBatalha = "aguardando"; // "aguardando" | "em_andamento" | "encerrada"
let lutador1 = null;
let lutador2 = null;

// =============================
// INICIALIZAÇÃO DA ARENA
// =============================

document.addEventListener("DOMContentLoaded", () => {
    const formSelecao = document.querySelector("#formSelecao");

    if (!formSelecao) {
        return;
    }

    const selectJ1 = document.querySelector("#classeJ1");
    const inputApelidoJ1 = document.querySelector("#apelidoJ1");
    const previaJ1 = document.querySelector("#previaJ1");

    const selectJ2 = document.querySelector("#classeJ2");
    const inputApelidoJ2 = document.querySelector("#apelidoJ2");
    const previaJ2 = document.querySelector("#previaJ2");

    const mensagemValidacao = document.querySelector("#mensagemValidacao");
    const btnIniciar = document.querySelector("#btnIniciar");
    const btnAtacar = document.querySelector("#btnAtacar");
    const btnNovaBatalha = document.querySelector("#btnNovaBatalha");
    const resultado = document.querySelector("#resultado");

    // Elementos Jogador 1
    const nomeAtacanteTela = document.querySelector("#nomeAtacante");
    const classeAtacanteTela = document.querySelector("#classeAtacanteTela");
    const ataqueAtacanteTela = document.querySelector("#ataqueAtacante");
    const defesaAtacanteTela = document.querySelector("#defesaAtacante");
    const vidaAtacanteTela = document.querySelector("#vidaAtacante");
    const vidaMaxAtacanteTela = document.querySelector("#vidaMaxAtacante");
    const vidaBarraAtacante = document.querySelector("#vidaBarraAtacante");
    const barraContainerAtacante = document.querySelector("#barraContainerAtacante");

    // Elementos Jogador 2
    const nomeDefensorTela = document.querySelector("#nomeDefensor");
    const classeDefensorTela = document.querySelector("#classeDefensorTela");
    const ataqueDefensorTela = document.querySelector("#ataqueDefensor");
    const defesaDefensorTela = document.querySelector("#defesaDefensor");
    const vidaDefensorTela = document.querySelector("#vidaDefensor");
    const vidaMaxDefensorTela = document.querySelector("#vidaMaxDefensor");
    const vidaBarraDefensor = document.querySelector("#vidaBarraDefensor");
    const barraContainerDefensor = document.querySelector("#barraContainerDefensor");

    function renderizarPrevia(classeId, apelido, containerPrevia) {
        containerPrevia.replaceChildren();

        const modelo = CATALOGO_CLASSES[classeId];
        if (!modelo) {
            const pVazio = document.createElement("p");
            pVazio.className = "previa-vazia";
            pVazio.textContent = "Escolha um personagem para visualizar classe e atributos.";
            containerPrevia.appendChild(pVazio);
            return;
        }

        const apelidoLimpo = apelido.trim();

        const pTitulo = document.createElement("p");
        const strongTitulo = document.createElement("strong");
        strongTitulo.textContent = apelidoLimpo !== ""
            ? `${apelidoLimpo} — ${modelo.nomeBase} (${modelo.classe})`
            : `${modelo.nomeBase} — ${modelo.classe}`;
        pTitulo.appendChild(strongTitulo);

        const pAtributos = document.createElement("p");
        pAtributos.textContent = `❤️ Vida: ${modelo.vida} | ⚔️ Ataque: ${modelo.ataque} | 🛡️ Defesa: ${modelo.defesa}`;

        containerPrevia.append(pTitulo, pAtributos);
    }

    function atualizarBarraVida(vidaAtual, vidaMax, barraEl, containerEl) {
        const porcentagem = vidaMax > 0
            ? Math.max(0, Math.min(100, (vidaAtual / vidaMax) * 100))
            : 0;

        barraEl.style.width = `${porcentagem}%`;
        containerEl.setAttribute("aria-valuenow", String(Math.round(porcentagem)));

        if (porcentagem > 50) {
            barraEl.style.backgroundColor = "green";
        } else if (porcentagem > 20) {
            barraEl.style.backgroundColor = "orange";
        } else {
            barraEl.style.backgroundColor = "red";
        }
    }

    function atualizarCardsArena() {
        if (!lutador1 || !lutador2) {
            nomeAtacanteTela.textContent = "---";
            classeAtacanteTela.textContent = "---";
            ataqueAtacanteTela.textContent = "0";
            defesaAtacanteTela.textContent = "0";
            vidaAtacanteTela.textContent = "0";
            vidaMaxAtacanteTela.textContent = "0";
            atualizarBarraVida(100, 100, vidaBarraAtacante, barraContainerAtacante);

            nomeDefensorTela.textContent = "---";
            classeDefensorTela.textContent = "---";
            ataqueDefensorTela.textContent = "0";
            defesaDefensorTela.textContent = "0";
            vidaDefensorTela.textContent = "0";
            vidaMaxDefensorTela.textContent = "0";
            atualizarBarraVida(100, 100, vidaBarraDefensor, barraContainerDefensor);
            return;
        }

        nomeAtacanteTela.textContent = lutador1.nomeExibicao;
        classeAtacanteTela.textContent = lutador1.classe;
        ataqueAtacanteTela.textContent = String(lutador1.ataque);
        defesaAtacanteTela.textContent = String(lutador1.defesa);
        vidaAtacanteTela.textContent = String(lutador1.vidaAtual);
        vidaMaxAtacanteTela.textContent = String(lutador1.vidaMax);
        atualizarBarraVida(lutador1.vidaAtual, lutador1.vidaMax, vidaBarraAtacante, barraContainerAtacante);

        nomeDefensorTela.textContent = lutador2.nomeExibicao;
        classeDefensorTela.textContent = lutador2.classe;
        ataqueDefensorTela.textContent = String(lutador2.ataque);
        defesaDefensorTela.textContent = String(lutador2.defesa);
        vidaDefensorTela.textContent = String(lutador2.vidaAtual);
        vidaMaxDefensorTela.textContent = String(lutador2.vidaMax);
        atualizarBarraVida(lutador2.vidaAtual, lutador2.vidaMax, vidaBarraDefensor, barraContainerDefensor);
    }

    function definirBloqueioFormulario(bloqueado) {
        selectJ1.disabled = bloqueado;
        inputApelidoJ1.disabled = bloqueado;
        selectJ2.disabled = bloqueado;
        inputApelidoJ2.disabled = bloqueado;
        btnIniciar.disabled = bloqueado;
    }

    function adicionarBlocoResultado(tituloTexto, linhasTexto) {
        const bloco = document.createElement("div");

        const titulo = document.createElement("h3");
        titulo.textContent = tituloTexto;
        bloco.appendChild(titulo);

        for (const linha of linhasTexto) {
            const p = document.createElement("p");
            p.textContent = linha;
            bloco.appendChild(p);
        }

        resultado.appendChild(bloco);
    }

    function calcularDanoBasico(atacante, defensor) {
        return Math.max(0, atacante.ataque - defensor.defesa);
    }

    function iniciarBatalha(evento) {
        evento.preventDefault();
        mensagemValidacao.textContent = "";

        const classeId1 = selectJ1.value;
        const classeId2 = selectJ2.value;

        if (!CATALOGO_CLASSES[classeId1] && !CATALOGO_CLASSES[classeId2]) {
            mensagemValidacao.textContent = "Selecione os personagens do Jogador 1 e do Jogador 2 antes de iniciar.";
            return;
        }

        if (!CATALOGO_CLASSES[classeId1]) {
            mensagemValidacao.textContent = "Selecione um personagem válido para o Jogador 1.";
            selectJ1.focus();
            return;
        }

        if (!CATALOGO_CLASSES[classeId2]) {
            mensagemValidacao.textContent = "Selecione um personagem válido para o Jogador 2.";
            selectJ2.focus();
            return;
        }

        lutador1 = criarLutador(classeId1, inputApelidoJ1.value, "J1");
        lutador2 = criarLutador(classeId2, inputApelidoJ2.value, "J2");

        estadoBatalha = "em_andamento";
        definirBloqueioFormulario(true);
        btnAtacar.disabled = false;

        atualizarCardsArena();
        resultado.replaceChildren();
        adicionarBlocoResultado("⚔️ Batalha iniciada!", [
            `${lutador1.nomeExibicao} (${lutador1.classe}) VS ${lutador2.nomeExibicao} (${lutador2.classe})`,
            "Clique em Atacar para iniciar a troca de golpes."
        ]);
    }

    function executarAtaque() {
        if (estadoBatalha !== "em_andamento" || !lutador1 || !lutador2) {
            return;
        }

        if (lutador1.vidaAtual <= 0 || lutador2.vidaAtual <= 0) {
            estadoBatalha = "encerrada";
            btnAtacar.disabled = true;
            return;
        }

        resultado.replaceChildren();

        // 1. Ataque do Jogador 1
        const danoJ1 = calcularDanoBasico(lutador1, lutador2);
        lutador2.vidaAtual = Math.max(0, lutador2.vidaAtual - danoJ1);

        if (danoJ1 === 0) {
            adicionarBlocoResultado("🛡️ Ataque bloqueado!", [
                `${lutador1.nomeExibicao} atacou ${lutador2.nomeExibicao}, mas não causou dano.`,
                `Vida restante de ${lutador2.nomeExibicao}: ${lutador2.vidaAtual}`
            ]);
        } else {
            adicionarBlocoResultado("⚔️ Ataque!", [
                `${lutador1.nomeExibicao} atacou ${lutador2.nomeExibicao} e causou ${danoJ1} de dano.`,
                `Vida restante de ${lutador2.nomeExibicao}: ${lutador2.vidaAtual}`
            ]);
        }

        atualizarCardsArena();

        // Encerra imediatamente se o Jogador 2 foi derrotado (sem contra-ataque)
        if (lutador2.vidaAtual <= 0) {
            estadoBatalha = "encerrada";
            btnAtacar.disabled = true;
            adicionarBlocoResultado(`💀 ${lutador2.nomeExibicao} foi derrotado!`, [
                `Vitória de ${lutador1.nomeExibicao}! Clique em Nova Batalha para jogar novamente.`
            ]);
            return;
        }

        // 2. Contra-ataque do Jogador 2
        const danoJ2 = calcularDanoBasico(lutador2, lutador1);
        lutador1.vidaAtual = Math.max(0, lutador1.vidaAtual - danoJ2);

        if (danoJ2 === 0) {
            adicionarBlocoResultado("🛡️ Contra-ataque bloqueado!", [
                `${lutador2.nomeExibicao} contra-atacou ${lutador1.nomeExibicao}, mas não causou dano.`,
                `Vida restante de ${lutador1.nomeExibicao}: ${lutador1.vidaAtual}`
            ]);
        } else {
            adicionarBlocoResultado("🔥 Contra-ataque!", [
                `${lutador2.nomeExibicao} contra-atacou ${lutador1.nomeExibicao} e causou ${danoJ2} de dano.`,
                `Vida restante de ${lutador1.nomeExibicao}: ${lutador1.vidaAtual}`
            ]);
        }

        atualizarCardsArena();

        if (lutador1.vidaAtual <= 0) {
            estadoBatalha = "encerrada";
            btnAtacar.disabled = true;
            adicionarBlocoResultado(`💀 ${lutador1.nomeExibicao} foi derrotado!`, [
                `Vitória de ${lutador2.nomeExibicao}! Clique em Nova Batalha para jogar novamente.`
            ]);
        }
    }

    function reiniciarBatalha() {
        estadoBatalha = "aguardando";
        lutador1 = null;
        lutador2 = null;

        mensagemValidacao.textContent = "";
        resultado.replaceChildren();

        definirBloqueioFormulario(false);
        btnAtacar.disabled = true;

        atualizarCardsArena();
        renderizarPrevia(selectJ1.value, inputApelidoJ1.value, previaJ1);
        renderizarPrevia(selectJ2.value, inputApelidoJ2.value, previaJ2);
    }

    // Eventos da prévia em tempo real
    selectJ1.addEventListener("change", () => {
        mensagemValidacao.textContent = "";
        renderizarPrevia(selectJ1.value, inputApelidoJ1.value, previaJ1);
    });

    inputApelidoJ1.addEventListener("input", () => {
        renderizarPrevia(selectJ1.value, inputApelidoJ1.value, previaJ1);
    });

    selectJ2.addEventListener("change", () => {
        mensagemValidacao.textContent = "";
        renderizarPrevia(selectJ2.value, inputApelidoJ2.value, previaJ2);
    });

    inputApelidoJ2.addEventListener("input", () => {
        renderizarPrevia(selectJ2.value, inputApelidoJ2.value, previaJ2);
    });

    // Eventos de controle da batalha
    formSelecao.addEventListener("submit", iniciarBatalha);
    btnAtacar.addEventListener("click", executarAtaque);
    btnNovaBatalha.addEventListener("click", reiniciarBatalha);

    // Estado inicial seguro ao abrir a página
    reiniciarBatalha();
});