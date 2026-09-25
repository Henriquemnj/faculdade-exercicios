# ⚔️ Batalha RPG

Projeto de um jogo de batalha RPG desenvolvido com **HTML, CSS e JavaScript**.

O projeto começou como um exercício simples de JavaScript e foi evoluindo com novas funcionalidades, como sistema de vida, ataque, defesa, contra-ataque, escudo, barras de vida dinâmicas e validação dos dados inseridos pelo jogador.

O objetivo principal do projeto é praticar conceitos fundamentais de desenvolvimento web e lógica de programação.

---

## 🎮 Como funciona

O jogador configura dois personagens:

- 🧙 Atacante
- 😈 Defensor

Cada personagem possui atributos próprios de:

- ⚔️ Ataque
- 🛡️ Defesa
- ❤️ Vida

O defensor também pode possuir um **escudo**, que reduz o dano recebido.

Após iniciar a batalha, o atacante realiza um ataque e, caso o defensor sobreviva, ele realiza um contra-ataque.

A batalha continua até que a vida de um dos personagens chegue a **0**.

---

## ⚔️ Sistema de combate

O dano é calculado considerando o ataque e a defesa dos personagens.

Exemplo:

```text
Ataque: 800
Defesa: 300

Dano = 800 - 300
Dano = 500
```

Caso a defesa seja maior ou igual ao ataque, o golpe não causa dano.

```text
Ataque: 400
Defesa: 600

Dano = 0
🛡️ Ataque bloqueado!
```

O defensor também pode utilizar um escudo, reduzindo o dano recebido.

---

## ❤️ Sistema de vida

Cada personagem possui uma barra de vida dinâmica.

A barra muda de acordo com a porcentagem de vida restante:

- 🟢 Verde — acima de 50%
- 🟠 Laranja — entre 20% e 50%
- 🔴 Vermelho — abaixo de 20%

Quando a vida chega a **0**, o personagem é derrotado e a batalha termina.

---

## ✅ Validação de dados

O jogo possui validações para evitar valores inválidos.

São verificados:

- Nome vazio
- Valores que não sejam números
- Valores iguais ou menores que zero
- Respostas inválidas na escolha do escudo

O escudo aceita apenas:

```text
s = sim
n = não
```

---

## 🕹️ Funcionalidades

- Criação dos personagens
- Sistema de ataque
- Sistema de defesa
- Sistema de escudo
- Sistema de vida
- Contra-ataque
- Barras de vida dinâmicas
- Mudança de cor das barras de vida
- Detecção de personagem derrotado
- Ataques bloqueados
- Validação dos dados
- Reinício da batalha

---

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Git
- GitHub

---

## 📁 Estrutura do projeto

```text
jogo-rpg/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🚀 Como executar

1. Clone ou baixe este repositório.
2. Acesse a pasta `jogo-rpg`.
3. Abra o arquivo `index.html` no navegador.

Durante o desenvolvimento, o projeto também pode ser executado utilizando a extensão **Live Server** no Visual Studio Code.

---

## 🔮 Próximas melhorias

Algumas funcionalidades planejadas para versões futuras:

- Tela de seleção de personagens
- Personagens com atributos próprios
- Imagens para cada personagem
- Seleção de Player 1 e Player 2
- Diferentes classes de personagens
- Habilidades especiais
- Sistema de turnos mais avançado
- Animações de ataque
- Melhorias na interface
- Arena de batalha

Uma das principais ideias para uma futura versão é criar uma **tela visual de seleção de personagens inspirada em jogos de luta**, substituindo a configuração atual através de prompts.

---

## 📚 Objetivo acadêmico

Projeto desenvolvido para praticar conceitos estudados em desenvolvimento web, principalmente:

- Manipulação do DOM
- Variáveis
- Funções
- Condicionais
- Loops
- Eventos
- Validação de dados
- Template literals
- Manipulação de estilos com JavaScript
- Integração entre HTML, CSS e JavaScript

---

## 👨‍💻 Autor

Projeto desenvolvido por **Henrique** como parte dos estudos de desenvolvimento web.