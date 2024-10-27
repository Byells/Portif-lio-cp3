"use client";
import { Aluno } from "@/types/types";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Cp() {
  const { data: alunos = [], error } = useSWR<Aluno[]>("/api/alunos", fetcher);
  if (error) throw new Error(error);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Notas Checkpoint</h1>

      <div className="mb-4">
        <input placeholder="Nome do aluno" className="border p-2" />
        <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-700">
          Adicionar Aluno
        </button>
      </div>

      {alunos.map((aluno) => (
        <div key={aluno.id} className="mb-6">
          <h2 className="text-xl font-semibold text-center">{aluno.nome}</h2>
        </div>
      ))}
    </div>
  );
}
