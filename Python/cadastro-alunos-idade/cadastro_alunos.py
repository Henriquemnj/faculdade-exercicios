
import sqlite3
import tkinter as tk
from tkinter import messagebox

banco14 = sqlite3.connect("escola14.db")
cursor = banco14.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS alunos (
    nome TEXT,
    idade INTEGER
)
""")
banco14.commit()


def salvar():
    nome = txt_nome.get().strip()
    idade = txt_idade.get().strip()

    if nome == "" or idade == "":
        messagebox.showwarning("Aviso", "Preencha todos os campos!")
        return

    try:
        idade = int(idade)
        if idade < 0:
            messagebox.showwarning("Aviso", "Digite uma idade válida!")
            return
    except ValueError:
        messagebox.showwarning("Aviso", "A idade deve ser um número!")
        return

    cursor.execute(
        "INSERT INTO alunos VALUES (?, ?)",
        (nome, idade)
    )
    banco14.commit()

    messagebox.showinfo("Sucesso", "Aluno cadastrado!")
    txt_nome.delete(0, tk.END)
    txt_idade.delete(0, tk.END)


def listar():
    lista.delete(0, tk.END)
    cursor.execute("SELECT * FROM alunos")

    for aluno in cursor.fetchall():
        lista.insert(
            tk.END,
            f"{aluno[0]} - {aluno[1]} anos"
        )


janela = tk.Tk()
janela.title("Cadastro de alunos")
janela.geometry("300x320")

tk.Label(janela, text="Nome").pack()
txt_nome = tk.Entry(janela, width=30)
txt_nome.pack()

tk.Label(janela, text="Idade").pack()
txt_idade = tk.Entry(janela, width=30)
txt_idade.pack()

tk.Button(
    janela, text="Salvar", command=salvar
).pack(pady=5)

tk.Button(
    janela, text="Listar Alunos", command=listar
).pack()

lista = tk.Listbox(janela, width=35, height=10)
lista.pack(pady=10)

janela.mainloop()
