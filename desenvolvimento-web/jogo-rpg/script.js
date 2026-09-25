let resultado = document.querySelector(".resultado")

let poderAtk = 0
let nomeAtk = ""
let nomeDef = ""
let poderDef = 0
let vidaDef = 0
let escudo = ""
let dano = 0
let vidaAtual = 0

function atacar() {

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

    if (poderAtk > poderDef && escudo == "n") {

        dano = poderAtk - poderDef

    } else if (poderAtk > poderDef && escudo == "s") {

        dano = (poderAtk - poderDef) / 2

    } else if (poderAtk <= poderDef) {

        dano = 0
    }

    vidaAtual = vidaDef - dano

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
}