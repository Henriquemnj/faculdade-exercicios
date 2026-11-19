# ⚔️ Batalha RPG

Projeto acadêmico de um jogo de batalha RPG desenvolvido com **HTML5, CSS3 e JavaScript**.

A aplicação conta com três páginas conectadas por menu semântico (**Início**, **Arena** e **Guia de Classes**), layout responsivo para dispositivos móveis, seleção de personagens com apelidos opcionais e combate tático em rodadas com habilidades especiais.

---

## 🧭 Estrutura de páginas

- **Início (`index.html`):** apresentação do projeto, regras resumidas da batalha e atalhos para a Arena e o Guia de Classes.
- **Arena (`arena.html`):** formulário de seleção dos dois jogadores, prévia de atributos, seletor individual de ações por rodada, painel de iniciativa/recarga e registro detalhado dos turnos.
- **Guia de Classes (`classes.html`):** catálogo completo dos personagens disponíveis, com seus atributos iniciais e o funcionamento de suas habilidades.

---

## 🧙 Catálogo de personagens

| Personagem | Classe | ❤️ Vida | ⚔️ Ataque | 🛡️ Defesa | Habilidade Ofensiva | Habilidade Defensiva |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **Nox** | Assassino | 85 | 34 | 6 | **Golpe Sombrio:** soma 12 ao ataque | **Passo Sombrio:** esquiva o próximo golpe da rodada |
| **Íris** | Mago | 100 | 30 | 8 | **Raio Arcano:** ignora metade da defesa base | **Barreira Arcana:** absorve até 12 de dano do próximo golpe |
| **Bronn** | Tanque | 135 | 23 | 14 | **Investida de Escudo:** soma 6 ao ataque e protege até 6 contra o próximo golpe após executar | **Muralha:** reduz pela metade o próximo golpe |

---

## ⚔️ Sistema de combate (Etapa 2)

1. **Ações por jogador:** em cada rodada, Jogador 1 e Jogador 2 escolhem individualmente entre **Ataque Básico**, **Habilidade Ofensiva** ou **Habilidade Defensiva**.
2. **Iniciativa alternada:** o **Jogador 1** age primeiro nas rodadas ímpares e o **Jogador 2** age primeiro nas rodadas pares.
3. **Defesas antes dos golpes:** qualquer postura defensiva escolhida na rodada é ativada antes da execução dos ataques.
4. **Derrota imediata:** se o primeiro lutador a agir reduzir a vida do oponente a `0`, a batalha termina imediatamente sem ação de resposta.
5. **Recarga de habilidades:** cada habilidade especial utilizada entra em recarga por **2 rodadas** (ficando indisponível nas duas rodadas seguintes).
6. **Empate por inatividade de dano:** se ocorrerem **3 rodadas consecutivas sem dano**, a partida é encerrada em empate.

---

## 📁 Estrutura de arquivos

```text
jogo-rpg/
│
├── index.html
├── arena.html
├── classes.html
├── style.css
├── script.js
└── README.md