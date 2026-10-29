
"use strict";

const saidas = [];

function mostrar(valor) {
    saidas.push(String(valor));
}

const disciplina = "web";
let aulas = 1;

aulas = aulas + 1;

mostrar(`${disciplina}: ${aulas} aulas`);

function situacao(nota) {
    if (nota >= 7) {
        return "Aprovado";
    } else if (nota >= 5) {
        return "Recuperação";
    } else {
        return "Reprovado";
    }
}

mostrar(situacao(8));
mostrar(situacao(6));
mostrar(situacao(4));

function rotulo(nivel) {
    switch (nivel) {
        case "basico":
            return "Básico";

        case "intermediario":
            return "Intermediário";

        default:
            return "Nível não informado";
    }
}

mostrar(rotulo("basico"));

const cursos = ["HTML", "CSS", "JavaScript"];

mostrar(cursos[0]);

cursos.push("PHP");

mostrar(cursos.length);

for (let i = 0; i < cursos.length; i++) {
    mostrar(`${i}: ${cursos[i]}`);
}

let j = 0;

while (j < 2) {
    mostrar(j);
    j++;
}

let k = 5;

do {
    mostrar(k);
    k++;
} while (k < 2);

const textoJSON = '{"titulo": "DOM", "ativo": true}';

const objeto = JSON.parse(textoJSON);

mostrar(objeto.titulo);
mostrar(JSON.stringify(objeto));

document.querySelector("#saida").textContent = saidas.join("\n");
