# Controle de estoque em Python

Exercício acadêmico que implementa um controle de estoque usando
programação estruturada e programação orientada a objetos.

## Arquivos

- `estruturado.py`: cadastro e relatório usando dicionários.
- `orientado_a_objetos.py`: classes Produto e Estoque, com menu
  para cadastrar, consultar e gerar relatório.

## Funcionalidades

- Cadastro com código, nome, preço e quantidade.
- Verificação de código duplicado e campos obrigatórios.
- Validação de preço maior que zero e quantidade não negativa.
- Aceitação de preço com vírgula ou ponto.
- Cálculo do valor total de cada produto e do estoque.
- Consulta por código na versão orientada a objetos.

## Como executar

É necessário ter Python 3 instalado. No terminal, dentro desta pasta,
execute uma das versões:

```bash
python estruturado.py
```

```bash
python orientado_a_objetos.py
```

Os programas são independentes. Os dados ficam apenas na memória
e são perdidos ao encerrar a execução.

## Exemplo de uso

| Código | Produto | Preço unitário | Quantidade | Total |
|---|---|---|---|---|
| 001 | Caderno | R$ 15,50 | 3 | R$ 46,50 |

## Verificação manual

Com o produto do exemplo, foram conferidos:

- Cadastro e relatório na versão estruturada.
- Cadastro, consulta, relatório e saída na versão orientada a objetos.

O total apresentado foi R$ 46,50.

## Conceitos praticados

- Dicionários e estruturas de repetição.
- Condicionais e tratamento de exceções.
- Classes, objetos, atributos e métodos.
- Entrada de dados e formatação de valores.