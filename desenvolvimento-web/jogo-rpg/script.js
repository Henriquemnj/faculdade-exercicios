// ELEMENTOS DA TELA

let resultado = document.querySelector(".resultado")

let nomeAtacanteTela = document.querySelector("#nomeAtacante")
let ataqueAtacanteTela = document.querySelector("#ataqueAtacante")
let vidaAtacanteTela = document.querySelector("#vidaAtacante")
let vidaBarraAtacante = document.querySelector("#vidaBarraAtacante")

let nomeDefensorTela = document.querySelector("#nomeDefensor")
let defesaDefensorTela = document.querySelector("#defesaDefensor")
let vidaDefensorTela = document.querySelector("#vidaDefensor")
let vidaBarra = document.querySelector("#vidaBarra")


// DADOS DO ATACANTE

let nomeAtk = ""
let poderAtk = 0
let defesaAtk = 0
let vidaAtk = 0
let vidaAtualAtk = 0


// DADOS DO DEFENSOR

let nomeDef = ""
let ataqueDef = 0
let poderDef = 0
let vidaDef = 0
let vidaAtual = 0

let escudo = ""

let dano = 0


// INICIAR BATALHA

function iniciarBatalha() {

    // DADOS DO ATACANTE

    nomeAtk = prompt("Digite o nome do atacante:")

    poderAtk = Number(
        prompt("Digite o poder de ataque do " + nomeAtk + ":")
    )

    defesaAtk = Number(
        prompt("Digite o poder de defesa do " + nomeAtk + ":")
    )

    vidaAtk = Number(
        prompt("Digite os pontos de vida do " + nomeAtk + ":")
    )

    vidaAtualAtk = vidaAtk


    // DADOS DO DEFENSOR

    nomeDef = prompt("Digite o nome do defensor:")

    ataqueDef = Number(
        prompt("Digite o poder de ataque do " + nomeDef + ":")
    )

    poderDef = Number(
        prompt("Digite o poder de defesa do " + nomeDef + ":")
    )

    vidaDef = Number(
        prompt("Digite os pontos de vida do " + nomeDef + ":")
    )

    escudo = prompt(
        "O " + nomeDef + " possui escudo? (s / n)"
    )

    vidaAtual = vidaDef


    // ATUALIZA O ATACANTE NA TELA

    nomeAtacanteTela.innerText = nomeAtk
    ataqueAtacanteTela.innerText = poderAtk
    vidaAtacanteTela.innerText = vidaAtualAtk

    vidaBarraAtacante.style.width = "100%"
    vidaBarraAtacante.style.backgroundColor = "green"


    // ATUALIZA O DEFENSOR NA TELA

    nomeDefensorTela.innerText = nomeDef
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


// ATACAR

function atacar() {

    // VERIFICA SE O ATACANTE JÁ FOI DERROTADO

    if (vidaAtualAtk <= 0) {

        resultado.innerHTML = `
            <h2>💀 ${nomeAtk} já foi derrotado!</h2>

            <p>Inicie uma nova batalha.</p>
        `

        return
    }


    // VERIFICA SE O DEFENSOR JÁ FOI DERROTADO

    if (vidaAtual <= 0) {

        resultado.innerHTML = `
            <h2>💀 ${nomeDef} já foi derrotado!</h2>

            <p>Inicie uma nova batalha.</p>
        `

        return
    }


    // =========================
    // ATAQUE DO ATACANTE
    // =========================

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


    // CALCULA PORCENTAGEM DE VIDA DO DEFENSOR

    let porcentagemVida = (vidaAtual / vidaDef) * 100


    // ATUALIZA VIDA DO DEFENSOR

    vidaDefensorTela.innerText = vidaAtual

    vidaBarra.style.width = porcentagemVida + "%"


    // COR DA BARRA DO DEFENSOR

    if (porcentagemVida > 50) {

        vidaBarra.style.backgroundColor = "green"

    } else if (porcentagemVida > 20) {

        vidaBarra.style.backgroundColor = "orange"

    } else {

        vidaBarra.style.backgroundColor = "red"
    }


    // MOSTRA O ATAQUE

    resultado.innerHTML = `
        <h2>⚔️ Ataque!</h2>

        <p>${nomeAtk} atacou ${nomeDef}!</p>

        <p>Dano causado: ${dano}</p>

        <p>Vida restante de ${nomeDef}: ${vidaAtual}</p>
    `


    // VERIFICA SE O DEFENSOR MORREU

    if (vidaAtual <= 0) {

        resultado.innerHTML += `
            <h2>💀 ${nomeDef} foi derrotado!</h2>
        `

        return
    }


    // =========================
    // CONTRA-ATAQUE DO DEFENSOR
    // =========================

    let danoDefensor = 0


    // CALCULA O DANO DO DEFENSOR

    if (ataqueDef > defesaAtk) {

        danoDefensor = ataqueDef - defesaAtk

    } else {

        danoDefensor = 0
    }


    // RETIRA VIDA DO ATACANTE

    vidaAtualAtk = vidaAtualAtk - danoDefensor


    // IMPEDE VIDA NEGATIVA

    if (vidaAtualAtk < 0) {
        vidaAtualAtk = 0
    }


    // CALCULA PORCENTAGEM DE VIDA DO ATACANTE

    let porcentagemVidaAtk =
        (vidaAtualAtk / vidaAtk) * 100


    // ATUALIZA VIDA DO ATACANTE

    vidaAtacanteTela.innerText = vidaAtualAtk

    vidaBarraAtacante.style.width =
        porcentagemVidaAtk + "%"


    // COR DA BARRA DO ATACANTE

    if (porcentagemVidaAtk > 50) {

        vidaBarraAtacante.style.backgroundColor = "green"

    } else if (porcentagemVidaAtk > 20) {

        vidaBarraAtacante.style.backgroundColor = "orange"

    } else {

        vidaBarraAtacante.style.backgroundColor = "red"
    }


    // MOSTRA O CONTRA-ATAQUE

    resultado.innerHTML += `
        <h2>🔥 Contra-ataque!</h2>

        <p>${nomeDef} atacou ${nomeAtk}!</p>

        <p>Dano causado: ${danoDefensor}</p>

        <p>Vida restante de ${nomeAtk}: ${vidaAtualAtk}</p>
    `


    // VERIFICA SE O ATACANTE MORREU

    if (vidaAtualAtk <= 0) {

        resultado.innerHTML += `
            <h2>💀 ${nomeAtk} foi derrotado!</h2>
        `
    }
}