let resultado = document.querySelector(".resultado")

let nomeAtacanteTela = document.querySelector("#nomeAtacante")
let ataqueAtacanteTela = document.querySelector("#ataqueAtacante")

let nomeDefensorTela = document.querySelector("#nomeDefensor")
let defesaDefensorTela = document.querySelector("#defesaDefensor")
let vidaDefensorTela = document.querySelector("#vidaDefensor")
let vidaBarra = document.querySelector("#vidaBarra")

let poderAtk = 0
let nomeAtk = ""
let nomeDef = ""
let poderDef = 0
let vidaDef = 0
let escudo = ""
let dano = 0
let vidaAtual = 0

function iniciarBatalha() {

    nomeAtk = prompt("Digite o nome do atacante:")

    poderAtk = Number(
        prompt("Digite o poder de ataque do " + nomeAtk + ":")
    )

    nomeDef = prompt("Digite o nome do defensor:")

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

    nomeAtacanteTela.innerText = nomeAtk
    ataqueAtacanteTela.innerText = poderAtk

    nomeDefensorTela.innerText = nomeDef
    defesaDefensorTela.innerText = poderDef
    vidaDefensorTela.innerText = vidaAtual

    vidaBarra.style.width = "100%"

    resultado.innerHTML = `
        <h2>Batalha iniciada!</h2>
        <p>${nomeAtk} VS ${nomeDef}</p>
    `
}



function atacar() {

    if (vidaAtual <= 0) {
        resultado.innerHTML = `
            <h2>💀 O defensor já foi derrotado!</h2>
            <p>Inicie uma nova batalha.</p>
        `
        return
    }

    if (poderAtk > poderDef && escudo == "n") {
        dano = poderAtk - poderDef

    } else if (poderAtk > poderDef && escudo == "s") {
        dano = (poderAtk - poderDef) / 2

    } else {
        dano = 0
    }

    vidaAtual = vidaAtual - dano

    if (vidaAtual < 0) {
        vidaAtual = 0
    }

    let porcentagemVida = (vidaAtual / vidaDef) * 100

    vidaBarra.style.width = porcentagemVida + "%"
    vidaDefensorTela.innerText = vidaAtual

    resultado.innerHTML = `
        <h2>⚔️ Resultado do ataque</h2>

        <p>${nomeAtk} atacou ${nomeDef}!</p>
        <p>Dano causado: ${dano}</p>
        <p>Vida restante: ${vidaAtual}</p>
    `

    if (vidaAtual == 0) {
        resultado.innerHTML += `
            <h2>💀 ${nomeDef} foi derrotado!</h2>
        `
    }
}
    vidaAtual = vidaDef - dano

    let porcentagemVida = (vidaAtual / vidaDef) * 100

vidaBarra.style.width = porcentagemVida + "%"

    nomeAtacanteTela.innerText = nomeAtk
ataqueAtacanteTela.innerText = poderAtk

nomeDefensorTela.innerText = nomeDef
defesaDefensorTela.innerText = poderDef
vidaDefensorTela.innerText = vidaAtual

    resultado.innerHTML = `
        <h2>Resultado do ataque</h2>

        <p>Nome do atacante: ${nomeAtk}</p>
        <p>Nome do defensor: ${nomeDef}</p>
        <p>Poder de ataque: ${poderAtk}</p>
        <p>Poder de defesa: ${poderDef}</p>
        <p>Vida inicial do defensor: ${vidaDef}</p>
        <p>Dano causado: ${dano}</p>
        <p>Vida atual: ${vidaAtual}</p>
    `
