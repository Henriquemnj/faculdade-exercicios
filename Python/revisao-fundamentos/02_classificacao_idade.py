nome = input("Digite seu nome: ")
idade = int(input("Digite sua idade: "))

if idade < 12:
    classificacao = "Criança"
elif idade < 18:
    classificacao = "Adolescente"
elif idade < 60:
    classificacao = "Adulto"
else:
    classificacao = "Idoso"

print(f"Nome: {nome}")
print(f"Classificação: {classificacao}")