"""Exercício de listas e funções — aula de 05/10/2026."""


def preencher_lista(lista):
    print("\nPreenchimento da lista")
    for i in range(len(lista)):
        lista[i] = int(input(f"Digite o {i + 1}º número: "))


def exibir_lista(lista):
    print(lista)


def ordenar_lista(lista):
    lista.sort()


def pesquisar_numero(lista, numero):
    return lista.count(numero)


def main():
    quantidade = int(input("Informe a quantidade de elementos na lista: "))
    if quantidade < 0:
        print("A quantidade não pode ser negativa.")
        return

    numeros = [0] * quantidade
    preencher_lista(numeros)
    print("\n===== Lista ORIGINAL =====")
    exibir_lista(numeros)
    ordenar_lista(numeros)
    print("\n===== Lista ORDENADA =====")
    exibir_lista(numeros)
    valor = int(input("\nDigite um número para pesquisar: "))
    quantidade = pesquisar_numero(numeros, valor)
    print(f"\nO número {valor} aparece {quantidade} vez(es) na lista.")


if __name__ == "__main__":
    main()
