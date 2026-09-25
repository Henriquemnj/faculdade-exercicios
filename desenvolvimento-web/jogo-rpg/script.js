// =============================
// ELEMENTOS DA TELA
// =============================

let resultado = document.querySelector(".resultado")

// Atacante
let nomeAtacanteTela = document.querySelector("#nomeAtacante")
let ataqueAtacanteTela = document.querySelector("#ataqueAtacante")
let defesaAtacanteTela = document.querySelector("#defesaAtacante")
let vidaAtacanteTela = document.querySelector("#vidaAtacante")
let vidaBarraAtacante = document.querySelector("#vidaBarraAtacante")

// Defensor
let nomeDefensorTela = document.querySelector("#nomeDefensor")
let ataqueDefensorTela = document.querySelector("#ataqueDefensor")
let defesaDefensorTela = document.querySelector("#defesaDefensor")
let vidaDefensorTela = document.querySelector("#vidaDefensor")
let vidaBarra = document.querySelector("#vidaBarra")


// =============================
// DADOS DO ATACANTE
// =============================

let nomeAtk = ""
let poderAtk = 0
let defesaAtk = 0
let vidaAtk = 0
let vidaAtualAtk = 0


// =============================
// DADOS DO DEFENSOR
// =============================

let nomeDef = ""
let ataqueDef = 0
let poderDef = 0
let vidaDef = 0
let vidaAtual = 0

let escudo = ""
let dano = 0


// =============================
// VALIDAÇÃO DE NÚMEROS
// =============================

function pedirNumero(mensagem) {

    let numero = Number(prompt(mensagem))

    while (isNaN(numero) || numero <= 0) {

        alert("Digite um número válido maior que 0!")

        numero = Number(prompt(mensagem))
    }

    return numero
}


// =============================
// VALIDAÇÃO DE NOME
// =============================

function pedirNome(mensagem) {

    let nome = prompt(mensagem)

    while (nome == null || nome.trim() == "") {

        alert("Digite um nome válido!")

        nome = prompt(mensagem)
    }

    return nome.trim()
}


// =============================
// VALIDAÇÃO DO ESCUDO
// =============================

function pedirEscudo(mensagem) {

    let resposta = prompt(mensagem)

    while (
        resposta == null ||
        (
            resposta.toLowerCase() != "s" &&
            resposta.toLowerCase() != "n"
        )
    ) {

        alert("Digite apenas s ou n!")

        resposta = prompt(mensagem)
    }

    return resposta.toLowerCase()
}


// =============================
// INICIAR BATALHA
// =============================

function iniciarBatalha() {

    // =============================
    // DADOS DO ATACANTE
    // =============================

    nomeAtk = pedirNome(
        "Digite o nome do atacante:"
    )

    poderAtk = pedirNumero(
        "Digite o poder de ataque do " + nomeAtk + ":"
    )

    defesaAtk = pedirNumero(
        "Digite o poder de defesa do " + nomeAtk + ":"
    )

    vidaAtk = pedirNumero(
        "Digite os pontos de vida do " + nomeAtk + ":"
    )

    vidaAtualAtk = vidaAtk


    // =============================
    // DADOS DO DEFENSOR
    // =============================

    nomeDef = pedirNome(
        "Digite o nome do defensor:"
    )

    ataqueDef = pedirNumero(
        "Digite o poder de ataque do " + nomeDef + ":"
    )

    poderDef = pedirNumero(
        "Digite o poder de defesa do " + nomeDef + ":"
    )

    vidaDef = pedirNumero(
        "Digite os pontos de vida do " + nomeDef + ":"
    )

    escudo = pedirEscudo(
        "O " + nomeDef + " possui escudo? (s / n)"
    )

    vidaAtual = vidaDef


    // =============================
    // ATUALIZA O ATACANTE
    // =============================

    nomeAtacanteTela.innerText = nomeAtk
    ataqueAtacanteTela.innerText = poderAtk
    defesaAtacanteTela.innerText = defesaAtk
    vidaAtacanteTela.innerText = vidaAtualAtk

    vidaBarraAtacante.style.width = "100%"
    vidaBarraAtacante.style.backgroundColor = "green"


    // =============================
    // ATUALIZA O DEFENSOR
    // =============================

    nomeDefensorTela.innerText = nomeDef
    ataqueDefensorTela.innerText = ataqueDef
    defesaDefensorTela.innerText = poderDef
    vidaDefensorTela.innerText = vidaAtual

    vidaBarra.style.width = "100%"
    vidaBarra.style.backgroundColor = "green"


    // MENSAGEM INICIAL

    resultado.innerHTML = `
        <h2>⚔️ Batalha iniciada!</h2>
        <p>${nomeAtk} VS ${nomeDef}</p>
    `
}


// =============================
// ATACAR
// =============================

function atacar() {

    // VERIFICA SE O ATACANTE JÁ MORREU

    if (vidaAtualAtk <= 0) {

        resultado.innerHTML = `
            <h2>💀 ${nomeAtk} já foi derrotado!</h2>
            <p>Inicie uma nova batalha.</p>
        `

        return
    }


    // VERIFICA SE O DEFENSOR JÁ MORREU

    if (vidaAtual <= 0) {

        resultado.innerHTML = `
            <h2>💀 ${nomeDef} já foi derrotado!</h2>
            <p>Inicie uma nova batalha.</p>
        `

        return
    }


    // =============================
    // ATAQUE DO ATACANTE
    // =============================

    if (poderAtk > poderDef && escudo == "n") {

        dano = poderAtk - poderDef

    } else if (poderAtk > poderDef && escudo == "s") {

        dano = (poderAtk - poderDef) / 2

    } else {

        dano = 0
    }


    // RETIRA VIDA DO DEFENSOR

    vidaAtual = vidaAtual - dano


    // IMPEDE VIDA NEGATIVA

    if (vidaAtual < 0) {
        vidaAtual = 0
    }


    // CALCULA PORCENTAGEM DA VIDA

    let porcentagemVida =
        (vidaAtual / vidaDef) * 100


    // ATUALIZA VIDA DO DEFENSOR

    vidaDefensorTela.innerText = vidaAtual

    vidaBarra.style.width =
        porcentagemVida + "%"


    // =============================
    // COR DA BARRA DO DEFENSOR
    // =============================

    if (porcentagemVida > 50) {

        vidaBarra.style.backgroundColor = "green"

    } else if (porcentagemVida > 20) {

        vidaBarra.style.backgroundColor = "orange"

    } else {

        vidaBarra.style.backgroundColor = "red"
    }


    // =============================
    // RESULTADO DO ATAQUE
    // =============================

    if (dano == 0) {

        resultado.innerHTML = `
            <h2>🛡️ Ataque bloqueado!</h2>

            <p>
                ${nomeAtk} atacou ${nomeDef},
                mas não conseguiu causar dano!
            </p>

            <p>Vida de ${nomeDef}: ${vidaAtual}</p>
        `

    } else {

        resultado.innerHTML = `
            <h2>⚔️ Ataque!</h2>

            <p>${nomeAtk} atacou ${nomeDef}!</p>

            <p>Dano causado: ${dano}</p>

            <p>
                Vida restante de ${nomeDef}:
                ${vidaAtual}
            </p>
        `
    }


    // =============================
    // DEFENSOR FOI DERROTADO?
    // =============================

    if (vidaAtual <= 0) {

        resultado.innerHTML += `
            <h2>💀 ${nomeDef} foi derrotado!</h2>
        `

        return
    }


    // =============================
    // CONTRA-ATAQUE DO DEFENSOR
    // =============================

    let danoDefensor = 0

    if (ataqueDef > defesaAtk) {

        danoDefensor = ataqueDef - defesaAtk

    } else {

        danoDefensor = 0
    }


    // RETIRA VIDA DO ATACANTE

    vidaAtualAtk =
        vidaAtualAtk - danoDefensor


    // IMPEDE VIDA NEGATIVA

    if (vidaAtualAtk < 0) {
        vidaAtualAtk = 0
    }


    // CALCULA PORCENTAGEM DA VIDA

    let porcentagemVidaAtk =
        (vidaAtualAtk / vidaAtk) * 100


    // ATUALIZA VIDA DO ATACANTE

    vidaAtacanteTela.innerText =
        vidaAtualAtk

    vidaBarraAtacante.style.width =
        porcentagemVidaAtk + "%"


    // =============================
    // COR DA BARRA DO ATACANTE
    // =============================

    if (porcentagemVidaAtk > 50) {

        vidaBarraAtacante.style.backgroundColor = "green"

    } else if (porcentagemVidaAtk > 20) {

        vidaBarraAtacante.style.backgroundColor = "orange"

    } else {

        vidaBarraAtacante.style.backgroundColor = "red"
    }


    // =============================
    // RESULTADO DO CONTRA-ATAQUE
    // =============================

    if (danoDefensor == 0) {

        resultado.innerHTML += `
            <h2>🛡️ Contra-ataque bloqueado!</h2>

            <p>
                ${nomeDef} atacou ${nomeAtk},
                mas não conseguiu causar dano!
            </p>

            <p>Vida de ${nomeAtk}: ${vidaAtualAtk}</p>
        `

    } else {

        resultado.innerHTML += `
            <h2>🔥 Contra-ataque!</h2>

            <p>${nomeDef} atacou ${nomeAtk}!</p>

            <p>Dano causado: ${danoDefensor}</p>

            <p>
                Vida restante de ${nomeAtk}:
                ${vidaAtualAtk}
            </p>
        `
    }


    // =============================
    // ATACANTE FOI DERROTADO?
    // =============================

    if (vidaAtualAtk <= 0) {

        resultado.innerHTML += `
            <h2>💀 ${nomeAtk} foi derrotado!</h2>
        `
    }
}


// =============================
// NOVA BATALHA
// =============================

function novaBatalha() {

    // LIMPA O ATACANTE

    nomeAtk = ""
    poderAtk = 0
    defesaAtk = 0
    vidaAtk = 0
    vidaAtualAtk = 0


    // LIMPA O DEFENSOR

    nomeDef = ""
    ataqueDef = 0
    poderDef = 0
    vidaDef = 0
    vidaAtual = 0

    escudo = ""
    dano = 0


    // =============================
    // LIMPA O CARD DO ATACANTE
    // =============================

    nomeAtacanteTela.innerText = "---"
    ataqueAtacanteTela.innerText = 0
    defesaAtacanteTela.innerText = 0
    vidaAtacanteTela.innerText = 0


    // =============================
    // LIMPA O CARD DO DEFENSOR
    // =============================

    nomeDefensorTela.innerText = "---"
    ataqueDefensorTela.innerText = 0
    defesaDefensorTela.innerText = 0
    vidaDefensorTela.innerText = 0


    // =============================
    // RESETA AS BARRAS
    // =============================

    vidaBarraAtacante.style.width = "100%"
    vidaBarraAtacante.style.backgroundColor = "green"

    vidaBarra.style.width = "100%"
    vidaBarra.style.backgroundColor = "green"


    // LIMPA O RESULTADO

    resultado.innerHTML = ""


    // INICIA OUTRA BATALHA

    iniciarBatalha()
}