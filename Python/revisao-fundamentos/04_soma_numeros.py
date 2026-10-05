soma = 0

numero = int(input("Digite um número inteiro (0 para encerrar): "))

while numero != 0:
    soma += numero
    numero = int(input("Digite um número inteiro (0 para encerrar): "))

print(f"Soma dos números digitados: {soma}")