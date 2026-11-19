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
        ofensiva: Object.freeze({
            nome: "Golpe Sombrio",
            descricao: "Soma 12 ao ataque neste golpe."
        }),
        defensiva: Object.freeze({
            nome: "Passo Sombrio",
            descricao: "Esquiva o próximo golpe da rodada."
        })
    }),
    iris: Object.freeze({
        id: "iris",
        nomeBase: "Íris",
        classe: "Mago",
        vida: 100,
        ataque: 30,
        defesa: 8,
        ofensiva: Object.freeze({
            nome: "Raio Arcano",
            descricao: "Ignora metade da defesa base do alvo."
        }),
        defensiva: Object.freeze({
            nome: "Barreira Arcana",
            descricao: "Absorve até 12 de dano do próximo golpe."
        })
    }),
    bronn: Object.freeze({
        id: "bronn",
        nomeBase: "Bronn",
        classe: "Tanque",
        vida: 135,
        ataque: 23,
        defesa: 14,
        ofensiva: Object.freeze({
            nome: "Investida de Escudo",
            descricao: "Soma 6 ao ataque e protege até 6 contra o próximo golpe após executar."
        }),
        defensiva: Object.freeze({
            nome: "Muralha",
            descricao: "Reduz pela metade o próximo golpe."
        })
    })
});

const RECARGA_HABILIDADE = 2;
const LIMITE_RODADAS_SEM_DANO = 3;

// =============================
// FÁBRICA DE INSTÂNCIAS INDEPENDENTES
// =============================

function criarLutador(classeId, apelidoDigitado, numeroJogador) {
    const modelo = CATALOGO_CLASSES[classeId];

    if (!modelo) {
        return null;
    }

    const apelidoLimpo = typeof apelidoDigitado === "string"
        ? apelidoDigitado.trim().slice(0, 24)
        : "";

    const tagJogador = `J${numeroJogador}`;
    const nomeExibicao = apelidoLimpo !== ""
        ? `${apelidoLimpo} (${modelo.nomeBase})`
        : `${modelo.nomeBase} (${tagJogador})`;

    return {
        numeroJogador: numeroJogador,
        classeId: modelo.id,
        nomeBase: modelo.nomeBase,
        classe: modelo.classe,
        apelido: apelidoLimpo,
        nomeExibicao: nomeExibicao,
        vidaMax: modelo.vida,
        vidaAtual: modelo.vida,
        ataque: modelo.ataque,
        defesa: modelo.defesa,
        ofensiva: modelo.ofensiva,
        defensiva: modelo.defensiva,
        recargaOfensiva: 0,
        recargaDefensiva: 0,
        efeitos: {
            esquiva: false,
            barreira: 0,
            muralha: false,
            escudoInvestida: 0
        }
    };
}

function limparEfeitosRodada(lutador) {
    lutador.efeitos.esquiva = false;
    lutador.efeitos.barreira = 0;
    lutador.efeitos.muralha = false;
    lutador.efeitos.escudoInvestida = 0;
}

// =============================
// ESTADO DA BATALHA
// =============================

let estadoBatalha = "aguardando"; // "aguardando" | "em_andamento" | "encerrada"
let lutador1 = null;
let lutador2 = null;
let rodadaAtual = 0;
let rodadasSemDano = 0;

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

    // Painel de status da rodada
    const numeroRodadaTela = document.querySelector("#numeroRodada");
    const textoIniciativaTela = document.querySelector("#textoIniciativa");
    const contadorSemDanoTela = document.querySelector("#contadorSemDano");

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

    // Controles de ação por jogador
    const controlesAcao = {
        1: {
            basico: document.querySelector("#radioBasicoJ1"),
            ofensiva: document.querySelector("#radioOfensivaJ1"),
            defensiva: document.querySelector("#radioDefensivaJ1"),
            nomeOfensiva: document.querySelector("#nomeOfensivaJ1"),
            descOfensiva: document.querySelector("#descOfensivaJ1"),
            statusOfensiva: document.querySelector("#statusOfensivaJ1"),
            nomeDefensiva: document.querySelector("#nomeDefensivaJ1"),
            descDefensiva: document.querySelector("#descDefensivaJ1"),
            statusDefensiva: document.querySelector("#statusDefensivaJ1")
        },
        2: {
            basico: document.querySelector("#radioBasicoJ2"),
            ofensiva: document.querySelector("#radioOfensivaJ2"),
            defensiva: document.querySelector("#radioDefensivaJ2"),
            nomeOfensiva: document.querySelector("#nomeOfensivaJ2"),
            descOfensiva: document.querySelector("#descOfensivaJ2"),
            statusOfensiva: document.querySelector("#statusOfensivaJ2"),
            nomeDefensiva: document.querySelector("#nomeDefensivaJ2"),
            descDefensiva: document.querySelector("#descDefensivaJ2"),
            statusDefensiva: document.querySelector("#statusDefensivaJ2")
        }
    };

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

        const pHabilidades = document.createElement("p");
        pHabilidades.textContent = `✨ ${modelo.ofensiva.nome} / 🛡️ ${modelo.defensiva.nome}`;

        containerPrevia.append(pTitulo, pAtributos, pHabilidades);
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

    function atualizarBadgeRecarga(badgeEl, valorRecarga, ativo) {
        badgeEl.classList.remove("pronta", "em-recarga");

        if (!ativo) {
            badgeEl.textContent = "Indisponível";
            return;
        }

        if (valorRecarga > 0) {
            badgeEl.textContent = `Recarga: ${valorRecarga} ${valorRecarga === 1 ? "rodada" : "rodadas"}`;
            badgeEl.classList.add("em-recarga");
        } else {
            badgeEl.textContent = "Pronta";
            badgeEl.classList.add("pronta");
        }
    }

    function atualizarControlesAcaoJogador(numeroJogador, lutador) {
        const ui = controlesAcao[numeroJogador];
        const emCombate = estadoBatalha === "em_andamento" && Boolean(lutador);

        ui.basico.checked = true;
        ui.basico.disabled = !emCombate;

        if (!lutador) {
            ui.nomeOfensiva.textContent = "Habilidade Ofensiva";
            ui.descOfensiva.textContent = "Selecione um personagem para liberar.";
            ui.ofensiva.disabled = true;
            atualizarBadgeRecarga(ui.statusOfensiva, 0, false);

            ui.nomeDefensiva.textContent = "Habilidade Defensiva";
            ui.descDefensiva.textContent = "Selecione um personagem para liberar.";
            ui.defensiva.disabled = true;
            atualizarBadgeRecarga(ui.statusDefensiva, 0, false);
            return;
        }

        ui.nomeOfensiva.textContent = lutador.ofensiva.nome;
        ui.descOfensiva.textContent = lutador.ofensiva.descricao;
        ui.ofensiva.disabled = !emCombate || lutador.recargaOfensiva > 0;
        atualizarBadgeRecarga(ui.statusOfensiva, lutador.recargaOfensiva, emCombate);

        ui.nomeDefensiva.textContent = lutador.defensiva.nome;
        ui.descDefensiva.textContent = lutador.defensiva.descricao;
        ui.defensiva.disabled = !emCombate || lutador.recargaDefensiva > 0;
        atualizarBadgeRecarga(ui.statusDefensiva, lutador.recargaDefensiva, emCombate);
    }

    function atualizarPainelRodada() {
        numeroRodadaTela.textContent = String(rodadaAtual);
        contadorSemDanoTela.textContent = `${rodadasSemDano} / ${LIMITE_RODADAS_SEM_DANO}`;

        if (estadoBatalha !== "em_andamento" || !lutador1 || !lutador2) {
            textoIniciativaTela.textContent = estadoBatalha === "encerrada"
                ? "Batalha encerrada"
                : "Aguardando início";
            return;
        }

        const primeiro = rodadaAtual % 2 === 1 ? lutador1 : lutador2;
        textoIniciativaTela.textContent = `Jogador ${primeiro.numeroJogador} (${primeiro.nomeExibicao})`;
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
        } else {
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

        atualizarControlesAcaoJogador(1, lutador1);
        atualizarControlesAcaoJogador(2, lutador2);
        atualizarPainelRodada();
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

    function obterAcaoSelecionada(numeroJogador, lutador) {
        const selecionado = document.querySelector(`input[name="acaoJ${numeroJogador}"]:checked`);
        const valor = selecionado ? selecionado.value : "basico";

        if (valor === "ofensiva" && lutador.recargaOfensiva === 0) {
            return "ofensiva";
        }

        if (valor === "defensiva" && lutador.recargaDefensiva === 0) {
            return "defensiva";
        }

        return "basico";
    }

    function aplicarPosturaDefensiva(lutador, linhasLog) {
        if (lutador.classeId === "nox") {
            lutador.efeitos.esquiva = true;
            linhasLog.push(
                `🛡️ ${lutador.nomeExibicao} ativou ${lutador.defensiva.nome} e vai esquivar o próximo golpe da rodada.`
            );
            return;
        }

        if (lutador.classeId === "iris") {
            lutador.efeitos.barreira = 12;
            linhasLog.push(
                `🛡️ ${lutador.nomeExibicao} ativou ${lutador.defensiva.nome} (absorve até 12 de dano do próximo golpe).`
            );
            return;
        }

        if (lutador.classeId === "bronn") {
            lutador.efeitos.muralha = true;
            linhasLog.push(
                `🛡️ ${lutador.nomeExibicao} ativou ${lutador.defensiva.nome} (reduz pela metade o próximo golpe).`
            );
        }
    }

    function executarGolpe(atacante, defensor, tipoAcao, linhasLog) {
        let nomeAcao = "Ataque Básico";
        let ataqueEfetivo = atacante.ataque;
        let defesaEfetiva = defensor.defesa;

        if (tipoAcao === "ofensiva") {
            nomeAcao = atacante.ofensiva.nome;

            if (atacante.classeId === "nox") {
                ataqueEfetivo += 12;
            } else if (atacante.classeId === "iris") {
                defesaEfetiva = Math.floor(defensor.defesa / 2);
            } else if (atacante.classeId === "bronn") {
                ataqueEfetivo += 6;
            }
        }

        const danoBruto = Math.max(0, ataqueEfetivo - defesaEfetiva);
        let danoFinal = danoBruto;
        const notasDefesa = [];

        if (defensor.efeitos.esquiva) {
            defensor.efeitos.esquiva = false;
            danoFinal = 0;
            notasDefesa.push(`${defensor.nomeExibicao} esquivou com ${defensor.defensiva.nome}`);
        } else {
            if (defensor.efeitos.muralha) {
                defensor.efeitos.muralha = false;
                danoFinal = Math.floor(danoFinal / 2);
                notasDefesa.push(`Muralha reduziu o golpe pela metade`);
            }

            if (defensor.efeitos.barreira > 0) {
                const absorvido = Math.min(danoFinal, defensor.efeitos.barreira);
                defensor.efeitos.barreira = 0;
                danoFinal = Math.max(0, danoFinal - absorvido);
                notasDefesa.push(`Barreira Arcana absorveu ${absorvido} de dano`);
            }

            if (defensor.efeitos.escudoInvestida > 0) {
                const absorvido = Math.min(danoFinal, defensor.efeitos.escudoInvestida);
                defensor.efeitos.escudoInvestida = 0;
                danoFinal = Math.max(0, danoFinal - absorvido);
                notasDefesa.push(`proteção da Investida absorveu ${absorvido} de dano`);
            }
        }

        // Bronn ativa proteção de até 6 após executar Investida de Escudo
        if (tipoAcao === "ofensiva" && atacante.classeId === "bronn") {
            atacante.efeitos.escudoInvestida = 6;
            notasDefesa.push(`${atacante.nomeExibicao} ganhou proteção de até 6 contra o próximo golpe`);
        }

        defensor.vidaAtual = Math.max(0, defensor.vidaAtual - danoFinal);

        const complemento = notasDefesa.length > 0 ? ` (${notasDefesa.join("; ")})` : "";
        linhasLog.push(
            `⚔️ ${atacante.nomeExibicao} usou ${nomeAcao} contra ${defensor.nomeExibicao}${complemento}: ${danoFinal} de dano. Vida de ${defensor.nomeExibicao}: ${defensor.vidaAtual}.`
        );

        return danoFinal;
    }

    function encerrarBatalha() {
        estadoBatalha = "encerrada";
        btnAtacar.disabled = true;
        atualizarCardsArena();
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

        lutador1 = criarLutador(classeId1, inputApelidoJ1.value, 1);
        lutador2 = criarLutador(classeId2, inputApelidoJ2.value, 2);

        rodadaAtual = 1;
        rodadasSemDano = 0;
        estadoBatalha = "em_andamento";

        definirBloqueioFormulario(true);
        btnAtacar.disabled = false;

        atualizarCardsArena();
        resultado.replaceChildren();
        adicionarBlocoResultado("⚔️ Batalha iniciada!", [
            `${lutador1.nomeExibicao} (${lutador1.classe}) VS ${lutador2.nomeExibicao} (${lutador2.classe})`,
            `Rodada 1: iniciativa do Jogador 1 (${lutador1.nomeExibicao}). Escolha as ações e clique em Executar Rodada.`
        ]);
    }

    function executarRodada() {
        if (estadoBatalha !== "em_andamento" || !lutador1 || !lutador2) {
            return;
        }

        if (lutador1.vidaAtual <= 0 || lutador2.vidaAtual <= 0) {
            encerrarBatalha();
            return;
        }

        const acaoJ1 = obterAcaoSelecionada(1, lutador1);
        const acaoJ2 = obterAcaoSelecionada(2, lutador2);

        // Ordem de iniciativa alternada: ímpares -> J1; pares -> J2
        const ordem = rodadaAtual % 2 === 1
            ? [
                { lutador: lutador1, oponente: lutador2, acao: acaoJ1 },
                { lutador: lutador2, oponente: lutador1, acao: acaoJ2 }
            ]
            : [
                { lutador: lutador2, oponente: lutador1, acao: acaoJ2 },
                { lutador: lutador1, oponente: lutador2, acao: acaoJ1 }
            ];

        const [primeiroTurno, segundoTurno] = ordem;
        const linhasLog = [
            `Iniciativa da rodada ${rodadaAtual}: ${primeiroTurno.lutador.nomeExibicao}.`
        ];

        // 1. Defesas aplicadas antes dos golpes
        for (const turno of ordem) {
            if (turno.acao === "defensiva") {
                aplicarPosturaDefensiva(turno.lutador, linhasLog);
            }
        }

        let danoTotalRodada = 0;
        let habilidadesUsadas = [];

        if (primeiroTurno.acao === "ofensiva" || primeiroTurno.acao === "defensiva") {
            habilidadesUsadas.push({ lutador: primeiroTurno.lutador, tipo: primeiroTurno.acao });
        }

        // 2. Primeiro a agir executa golpe (se não escolheu postura defensiva)
        if (primeiroTurno.acao !== "defensiva") {
            danoTotalRodada += executarGolpe(
                primeiroTurno.lutador,
                primeiroTurno.oponente,
                primeiroTurno.acao,
                linhasLog
            );
        }

        resultado.replaceChildren();

        // Verifica derrota imediata do segundo antes que ele possa agir
        if (segundoTurno.lutador.vidaAtual <= 0) {
            adicionarBlocoResultado(`📜 Resumo da Rodada ${rodadaAtual}`, linhasLog);
            adicionarBlocoResultado(`💀 ${segundoTurno.lutador.nomeExibicao} foi derrotado!`, [
                `Vitória de ${primeiroTurno.lutador.nomeExibicao}! Clique em Nova Batalha para jogar novamente.`
            ]);
            encerrarBatalha();
            return;
        }

        // 3. Segundo a agir executa sua ação
        if (segundoTurno.acao === "ofensiva" || segundoTurno.acao === "defensiva") {
            habilidadesUsadas.push({ lutador: segundoTurno.lutador, tipo: segundoTurno.acao });
        }

        if (segundoTurno.acao !== "defensiva") {
            danoTotalRodada += executarGolpe(
                segundoTurno.lutador,
                segundoTurno.oponente,
                segundoTurno.acao,
                linhasLog
            );
        }

        // Verifica derrota do primeiro após o golpe do segundo
        if (primeiroTurno.lutador.vidaAtual <= 0) {
            adicionarBlocoResultado(`📜 Resumo da Rodada ${rodadaAtual}`, linhasLog);
            adicionarBlocoResultado(`💀 ${primeiroTurno.lutador.nomeExibicao} foi derrotado!`, [
                `Vitória de ${segundoTurno.lutador.nomeExibicao}! Clique em Nova Batalha para jogar novamente.`
            ]);
            encerrarBatalha();
            return;
        }

        // 4. Atualiza recargas (reduz existentes e aplica 2 rodadas às usadas agora)
        for (const lutador of [lutador1, lutador2]) {
            if (lutador.recargaOfensiva > 0) {
                lutador.recargaOfensiva -= 1;
            }
            if (lutador.recargaDefensiva > 0) {
                lutador.recargaDefensiva -= 1;
            }
            limparEfeitosRodada(lutador);
        }

        for (const usada of habilidadesUsadas) {
            if (usada.tipo === "ofensiva") {
                usada.lutador.recargaOfensiva = RECARGA_HABILIDADE;
            } else if (usada.tipo === "defensiva") {
                usada.lutador.recargaDefensiva = RECARGA_HABILIDADE;
            }
        }

        // 5. Regra de empate após 3 rodadas consecutivas sem dano
        if (danoTotalRodada === 0) {
            rodadasSemDano += 1;
            linhasLog.push(
                `⚖️ Nenhum dano causado nesta rodada (${rodadasSemDano}/${LIMITE_RODADAS_SEM_DANO} rodadas seguidas sem dano).`
            );
        } else {
            rodadasSemDano = 0;
        }

        adicionarBlocoResultado(`📜 Resumo da Rodada ${rodadaAtual}`, linhasLog);

        if (rodadasSemDano >= LIMITE_RODADAS_SEM_DANO) {
            adicionarBlocoResultado("🤝 Empate!", [
                `A batalha terminou empatada após ${LIMITE_RODADAS_SEM_DANO} rodadas consecutivas sem dano.`
            ]);
            encerrarBatalha();
            return;
        }

        rodadaAtual += 1;
        atualizarCardsArena();
    }

    function reiniciarBatalha() {
        estadoBatalha = "aguardando";
        lutador1 = null;
        lutador2 = null;
        rodadaAtual = 0;
        rodadasSemDano = 0;

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
    btnAtacar.addEventListener("click", executarRodada);
    btnNovaBatalha.addEventListener("click", reiniciarBatalha);

    // Estado inicial seguro ao abrir a página
    reiniciarBatalha();
});