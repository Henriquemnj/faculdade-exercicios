# Listas e funções em Python

Exercício desenvolvido na aula de **05/10/2026**, transcrito da foto do código e corrigido para execução.

## Objetivo

Preencher uma lista de números inteiros, mostrar os valores originais, ordenar a lista e contar quantas vezes um número aparece.

## Conceitos praticados

- Funções com parâmetros e retorno.
- Listas, índices, `len()` e `range()`.
- Entrada de dados com `input()` e conversão com `int()`.
- Ordenação com `sort()` e contagem com `count()`.
- Formatação de mensagens com f-strings.

## Como executar

Na raiz do repositório, com Python 3 instalado:

```bash
python Python/listas-e-funcoes/listas.py
```

Informe a quantidade de elementos, os números e o valor a pesquisar. As entradas devem ser números inteiros; o exercício não trata entradas de texto inválidas.

Exemplo: para a lista `[4, 2, 4, 1]`, o programa mostra a lista ordenada `[1, 2, 4, 4]` e informa que o número `4` aparece `2` vezes.

## Ajustes realizados

- Correção de `len(lista)` e da f-string usada no preenchimento.
- Organização da execução em `main()`.
- Verificação de quantidade negativa.
