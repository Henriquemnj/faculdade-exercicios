
"use strict";

const lista = document.querySelector("#lista");
const status = document.querySelector("#status");
const botaofetch = document.querySelector("#fetch");
const botaoXHR = document.querySelector("#xhr");

function inserir(titulo) {
    const item = document.createElement("li");
    item.textContent = titulo;
    lista.append(item);
}

function renderizar(dados) {
    if (!Array.isArray(dados)) {
        throw new Error("Esperando um array.");
    }

    for (const curso of dados) {
        if (!curso || typeof curso.titulo !== "string") {
            throw new Error("Curso sem título válido.");
        }
    }

    lista.replaceChildren();

    for (const curso of dados) {
        inserir(curso.titulo);
    }
}

function carregando(ativo) {
    botaofetch.disabled = ativo;
    botaoXHR.disabled = ativo;
}

document.querySelector("#alterar").addEventListener("click", function () {
    document.querySelector("#titulo").textContent = "Meus cursos";
});

document.querySelector("#adicionar").addEventListener("click", function () {
    inserir("Curso de DOM");
});

document.querySelector("#excluir").addEventListener("click", function () {
    const ultimo = lista.lastElementChild;

    if (ultimo) {
        ultimo.remove();
    }
});

async function carregarFetch(url = "./cursos.json") {
    carregando(true);
    status.textContent = "Carregando...";

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error(`HTTP ${resposta.status}`);
        }

        const dados = await resposta.json();

        renderizar(dados);
        status.textContent = `${dados.length} cursos carregados.`;
    } catch (erro) {
        status.textContent = `Falha: ${erro.message}`;
    } finally {
        carregando(false);
    }
}

function carregarXHR(url = "./cursos.json") {
    carregando(true);
    status.textContent = "Carregando...";

    const requisicao = new XMLHttpRequest();

    requisicao.open("GET", url, true);
    requisicao.timeout = 5000;

    requisicao.onload = function () {
        try {
            if (
                requisicao.status < 200 ||
                requisicao.status >= 300
            ) {
                throw new Error(`HTTP ${requisicao.status}`);
            }

            const dados = JSON.parse(requisicao.responseText);

            renderizar(dados);
            status.textContent = `${dados.length} cursos carregados.`;
        } catch (erro) {
            status.textContent = `Falha: ${erro.message}`;
        }
    };

    requisicao.onerror = function () {
        status.textContent = "Falha de rede.";
    };

    requisicao.ontimeout = function () {
        status.textContent = "Tempo de espera excedido.";
    };

    requisicao.onloadend = function () {
        carregando(false);
    };

    requisicao.send();
}

botaofetch.addEventListener("click", function () {
    carregarFetch();
});

botaoXHR.addEventListener("click", function () {
    carregarXHR();
});
