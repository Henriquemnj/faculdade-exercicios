class Produto:
    def __init__(self, codigo, nome, preco, quantidade):
        self.codigo = codigo
        self.nome = nome
        self.preco = preco
        self.quantidade = quantidade

    def calcular_total(self):
        return self.preco * self.quantidade


class Estoque:
    def __init__(self):
        self.produtos = {}

    def cadastrar(self):
        print("\n--- CADASTRO DE PRODUTOS ---")

        codigo = input("Código: ").strip()

        if codigo == "":
            print("Erro: código vazio!")
            return

        if codigo in self.produtos:
            print("Erro: código já cadastrado!")
            return

        nome = input("Nome: ").strip()

        if nome == "":
            print("Erro: nome vazio!")
            return

        try:
            preco = float(input("Preço: ").replace(",", "."))

            if preco <= 0:
                print("Erro: preço inválido!")
                return

            quantidade = int(input("Quantidade: "))

            if quantidade < 0:
                print("Erro: quantidade inválida!")
                return

        except ValueError:
            print("Erro: digite valores numéricos válidos!")
            return

        produto = Produto(codigo, nome, preco, quantidade)
        self.produtos[codigo] = produto

        print("Produto cadastrado com sucesso!")

    def consultar(self):
        codigo = input("Digite o código: ").strip()

        if codigo in self.produtos:
            produto = self.produtos[codigo]

            print("Nome:", produto.nome)
            print("Preço: R$", f"{produto.preco:.2f}")
            print("Quantidade:", produto.quantidade)
            print("Total: R$", f"{produto.calcular_total():.2f}")
        else:
            print("Produto não encontrado!")

    def relatorio(self):
        print("\n--- RELATÓRIO DE ESTOQUE ---")

        valor_geral = 0

        for codigo, produto in self.produtos.items():
            total = produto.calcular_total()

            print("\nCódigo:", codigo)
            print("Nome:", produto.nome)
            print("Preço: R$", f"{produto.preco:.2f}")
            print("Quantidade:", produto.quantidade)
            print("Total: R$", f"{total:.2f}")

            valor_geral += total

        print("\nValor geral: R$", f"{valor_geral:.2f}")


estoque = Estoque()

while True:
    print("\n===== MENU =====")
    print("1 - Cadastrar produto")
    print("2 - Consultar produto")
    print("3 - Relatório de estoque")
    print("4 - Sair")

    opcao = input("Escolha uma opção: ")

    if opcao == "1":
        estoque.cadastrar()
    elif opcao == "2":
        estoque.consultar()
    elif opcao == "3":
        estoque.relatorio()
    elif opcao == "4":
        print("Programa encerrado!")
        break
    else:
        print("Opção inválida!")