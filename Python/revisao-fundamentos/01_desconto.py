valor_compra = float(input("Digite o valor da compra: R$ "))

if valor_compra >= 500:
    percentual_desconto = 0.10
else:
    percentual_desconto = 0.05

desconto = valor_compra * percentual_desconto
valor_final = valor_compra - desconto

print(f"Valor original: R$ {valor_compra:.2f}")
print(f"Desconto: R$ {desconto:.2f}")
print(f"Valor final: R$ {valor_final:.2f}")