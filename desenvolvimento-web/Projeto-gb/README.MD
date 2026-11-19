# ⚔️ Batalha RPG

Projeto acadêmico de um jogo de batalha RPG desenvolvido com **HTML5, CSS3 e JavaScript**.

O projeto evoluiu de uma página única configurada por caixas `prompt()` para uma aplicação multipágina responsiva com navegação semântica, catálogo fixo de classes, seleção via formulário com prévia de atributos e combate em turnos.

---

## 🧭 Estrutura de páginas

- **Início (`index.html`):** apresentação do projeto, regras resumidas da batalha e atalhos para a Arena e o Guia de Classes.
- **Arena (`arena.html`):** formulário de seleção dos dois jogadores com apelidos opcionais, prévia de atributos antes do duelo, campo de batalha com barras de vida dinâmicas e registro dos golpes.
- **Guia de Classes (`classes.html`):** catálogo completo dos personagens disponíveis, com seus atributos iniciais e a descrição das habilidades características.

---

## 🧙 Catálogo de personagens

| Personagem | Classe | ❤️ Vida | ⚔️ Ataque | 🛡️ Defesa | Habilidades previstas |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **Nox** | Assassino | 85 | 34 | 6 | **Golpe Sombrio** (+12 ATQ) / **Passo Sombrio** (esquiva o próximo golpe da rodada) |
| **Íris** | Mago | 100 | 30 | 8 | **Raio Arcano** (ignora metade da defesa base) / **Barreira Arcana** (absorve até 12 de dano) |
| **Bronn** | Tanque | 135 | 23 | 14 | **Investida de Escudo** (+6 ATQ e protege até 6) / **Muralha** (reduz pela metade o próximo golpe) |

---

## ⚔️ Sistema de combate (Etapa 1)

1. Na **Arena**, cada jogador escolhe um personagem do catálogo e pode informar um apelido opcional.
2. Os dois lutadores são criados como **instâncias independentes**, permitindo duelos entre classes iguais sem compartilhamento de estado.
3. O botão **Atacar** permanece desabilitado antes do início da partida e após a derrota de um dos combatentes.
4. A cada clique em **Atacar**, o Jogador 1 golpeia o Jogador 2 (`dano = max(0, ataque - defesa)`). Se o Jogador 2 permanecer com vida maior que `0`, realiza o contra-ataque; caso contrário, a batalha encerra imediatamente sem contra-ataque.

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