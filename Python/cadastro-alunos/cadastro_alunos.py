"""Cadastro de alunos com Tkinter — aula de 05/10/2026."""

import tkinter as tk
from tkinter import messagebox

alunos = []


def cadastrar():
    nome = entrada_nome.get().strip()
    if nome == "":
        messagebox.showwarning("Atenção", "Digite o nome do aluno!")
        return

    try:
        nota = float(entrada_nota.get())
    except ValueError:
        messagebox.showerror("Erro", "Digite uma nota válida!")
        return

    if not 0 <= nota <= 10:
        messagebox.showwarning("Atenção", "A nota deve estar entre 0 e 10!")
        return

    alunos.append([nome, nota])
    messagebox.showinfo("Sucesso", "Aluno cadastrado com sucesso!")
    entrada_nome.delete(0, tk.END)
    entrada_nota.delete(0, tk.END)


def listar():
    caixa_texto.delete("1.0", tk.END)
    if len(alunos) == 0:
        caixa_texto.insert(tk.END, "Nenhum aluno cadastrado.")
    else:
        for aluno in alunos:
            nome = aluno[0]
            nota = aluno[1]
            if nota >= 6:
                situacao = "Aprovado"
            else:
                situacao = "Reprovado"
            caixa_texto.insert(
                tk.END,
                f"Nome: {nome} | Nota: {nota:.1f} | {situacao}\n",
            )


def limpar():
    entrada_nome.delete(0, tk.END)
    entrada_nota.delete(0, tk.END)
    caixa_texto.delete("1.0", tk.END)


def main():
    global entrada_nome, entrada_nota, caixa_texto

    janela = tk.Tk()
    janela.title("Cadastro de Alunos")
    janela.geometry("500x400")

    tk.Label(janela, text="Nome do aluno:").pack(pady=(15, 5))
    entrada_nome = tk.Entry(janela, width=40)
    entrada_nome.pack()

    tk.Label(janela, text="Nota:").pack(pady=(10, 5))
    entrada_nota = tk.Entry(janela, width=40)
    entrada_nota.pack()

    tk.Button(janela, text="Cadastrar", width=15, command=cadastrar).pack(pady=10)
    tk.Button(janela, text="Listar Alunos", width=15, command=listar).pack()
    tk.Button(janela, text="Limpar", width=15, command=limpar).pack(pady=10)

    caixa_texto = tk.Text(janela, width=55, height=8)
    caixa_texto.pack(pady=10)
    janela.mainloop()


if __name__ == "__main__":
    main()
