import tkinter as tk
from tkinter import messagebox


# Classe que representa cada aluno
class Aluno:
    def __init__(self, matricula, nome, nota):
        self.matricula = matricula
        self.nome = nome
        self.nota = nota

    def situacao(self):
        if self.nota >= 6:
            return "Aprovado"
        elif self.nota >= 4:
            return "Prova Final"
        else:
            return "Reprovado"


# Lista que armazena os alunos
alunos = []


def cadastrar():
    try:
        matricula = int(entrada_matricula.get().strip())
        nome = entrada_nome.get().strip()
        nota = float(entrada_nota.get().strip().replace(",", "."))
    except ValueError:
        messagebox.showerror(
            "Erro",
            "Matrícula e nota devem ser numéricas!"
        )
        return

    if nome == "":
        messagebox.showwarning("Aviso", "Informe o nome do aluno!")
        return

    if matricula <= 0:
        messagebox.showwarning(
            "Aviso",
            "A matrícula deve ser um número inteiro positivo!"
        )
        return

    if not 0 <= nota <= 10:
        messagebox.showwarning(
            "Aviso",
            "A nota deve estar entre 0 e 10!"
        )
        return

    for aluno in alunos:
        if aluno.matricula == matricula:
            messagebox.showwarning(
                "Aviso",
                "Já existe um aluno com essa matrícula!"
            )
            return

    aluno = Aluno(matricula, nome, nota)
    alunos.append(aluno)

    messagebox.showinfo("Sucesso", "Aluno cadastrado!")

    entrada_matricula.delete(0, tk.END)
    entrada_nome.delete(0, tk.END)
    entrada_nota.delete(0, tk.END)
    entrada_matricula.focus_set()


def listar():
    area_exibicao.delete("1.0", tk.END)

    if not alunos:
        area_exibicao.insert(tk.END, "Nenhum aluno cadastrado.\n")
        return

    for aluno in alunos:
        area_exibicao.insert(
            tk.END,
            f"Matrícula: {aluno.matricula}\n"
            f"Nome: {aluno.nome}\n"
            f"Nota: {aluno.nota:.1f}\n"
            f"Situação: {aluno.situacao()}\n"
            + "-" * 35
            + "\n"
        )


# Janela principal
janela = tk.Tk()
janela.title("Cadastro de Alunos")
janela.geometry("400x450")

tk.Label(janela, text="Matrícula").pack(pady=(10, 0))
entrada_matricula = tk.Entry(janela, width=30)
entrada_matricula.pack()

tk.Label(janela, text="Nome").pack(pady=(5, 0))
entrada_nome = tk.Entry(janela, width=30)
entrada_nome.pack()

tk.Label(janela, text="Nota").pack(pady=(5, 0))
entrada_nota = tk.Entry(janela, width=30)
entrada_nota.pack()

tk.Button(
    janela,
    text="CADASTRAR",
    command=cadastrar
).pack(pady=8)

tk.Button(
    janela,
    text="LISTAR",
    command=listar
).pack()

area_exibicao = tk.Text(janela, width=45, height=12)
area_exibicao.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)

entrada_matricula.focus_set()

janela.mainloop()
