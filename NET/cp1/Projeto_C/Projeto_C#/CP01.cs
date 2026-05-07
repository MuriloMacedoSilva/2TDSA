// Nome: Murilo Macedo Silva
// CP01 - ABD
// Disciplina: Advanced Business Development with .NET

using System;
using System.Collections.Generic;

class Program
{
    static List<string> tarefas = new List<string>();
    static List<bool> concluidas = new List<bool>();

    static void Main()
    {
        int opcao = 0;

        while (opcao != 5)
        {
            Console.WriteLine("\n=== GERENCIADOR DE TAREFAS ===");
            Console.WriteLine("1 - Adicionar tarefa");
            Console.WriteLine("2 - Listar tarefas");
            Console.WriteLine("3 - Marcar tarefa como concluída");
            Console.WriteLine("4 - Remover tarefa");
            Console.WriteLine("5 - Sair");
            Console.Write("Escolha uma opção: ");

            opcao = Convert.ToInt32(Console.ReadLine());

            switch (opcao)
            {
                case 1:
                    AdicionarTarefa();
                    break;

                case 2:
                    ListarTarefas();
                    break;

                case 3:
                    ConcluirTarefa();
                    break;

                case 4:
                    RemoverTarefa();
                    break;

                case 5:
                    Console.WriteLine("Encerrando programa...");
                    break;

                default:
                    Console.WriteLine("Opção inválida.");
                    break;
            }
        }
    }

    static void AdicionarTarefa()
    {
        Console.Write("Digite a nova tarefa: ");
        string tarefa = Console.ReadLine();

        tarefas.Add(tarefa);
        concluidas.Add(false);

        Console.WriteLine("Tarefa adicionada!");
    }

    static void ListarTarefas()
    {
        Console.WriteLine("\n=== LISTA DE TAREFAS ===");

        if (tarefas.Count == 0)
        {
            Console.WriteLine("Nenhuma tarefa cadastrada.");
            return;
        }

        for (int i = 0; i < tarefas.Count; i++)
        {
            string status = concluidas[i] ? "[Concluída]" : "[Pendente]";
            Console.WriteLine($"{i + 1}. {tarefas[i]} {status}");
        }
    }

    static void ConcluirTarefa()
    {
        ListarTarefas();

        Console.Write("Digite o número da tarefa concluída: ");
        int numero = Convert.ToInt32(Console.ReadLine());

        if (numero > 0 && numero <= tarefas.Count)
        {
            concluidas[numero - 1] = true;
            Console.WriteLine("Tarefa marcada como concluída!");
        }
        else
        {
            Console.WriteLine("Número inválido.");
        }
    }

    static void RemoverTarefa()
    {
        ListarTarefas();

        Console.Write("Digite o número da tarefa que deseja remover: ");
        int numero = Convert.ToInt32(Console.ReadLine());

        if (numero > 0 && numero <= tarefas.Count)
        {
            tarefas.RemoveAt(numero - 1);
            concluidas.RemoveAt(numero - 1);

            Console.WriteLine("Tarefa removida!");
        }
        else
        {
            Console.WriteLine("Número inválido.");
        }
    }
}
