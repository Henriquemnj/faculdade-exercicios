# Cadastro de alunos com Tkinter

Exercício da aula de **05/10/2026**, transcrito das fotos da aula com as correções de cadastro e listagem.

## Funcionalidades

- Cadastrar nome e nota de um aluno.
- Validar nome preenchido e nota numérica entre 0 e 10.
- Listar todos os alunos na caixa de texto.
- Classificar como **Aprovado** quando a nota for maior ou igual a 6 e **Reprovado** quando for menor que 6.
- Limpar os campos e o texto exibido.

## Como executar

É necessário Python 3 com Tkinter e um ambiente gráfico. Na raiz do repositório:

```bash
python Python/cadastro-alunos/cadastro_alunos.py
```

1. Digite o nome e a nota (use ponto para notas decimais, como `7.5`).
2. Clique em **Cadastrar**.
3. Clique em **Listar Alunos** para exibir os cadastros na caixa inferior.
4. Use **Limpar** para apagar os campos e o texto da tela.

Os alunos ficam na lista `alunos`, apenas na memória. O botão **Limpar** não exclui os cadastros; basta listar novamente para vê-los. Ao fechar o programa, os dados são perdidos.

## Conceitos praticados

Listas, funções, condições, tratamento de erros com `try/except`, eventos de botões e componentes `Label`, `Entry`, `Button`, `Text` e `messagebox`.

## Correções realizadas

- Uso de `messagebox.showwarning()` na validação da nota.
- Inserção de cada aluno dentro do laço `for`, depois de definir a situação.
- Remoção de espaços nas extremidades do nome.
- Organização da criação da janela em `main()`.
