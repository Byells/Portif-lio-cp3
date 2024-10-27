"use client";
import { Aluno } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import { Loader } from "lucide-react";
import useSWR from "swr";

export const AlunosList: React.FC = () => {
  const {
    data: alunos,
    error,
    isLoading,
  } = useSWR<Aluno[]>("/api/alunos", fetcher, {
    suspense: true,
    fallbackData: [],
  });
  if (error || !alunos) throw new Error(error);
  if (isLoading) {
    return (
      <div className="inline-flex gap-4">
        <Loader className="animate-spin" />
        Carregando...
      </div>
    );
  }

  return (
    <div className="grid gap-2 justify-items-start">
      {alunos.map((aluno) => (
        <button
          key={aluno.id}
          className="border border-border p-4 rounded-md bg-background min-w-[320px]"
        >
          <h2>{aluno.nome}</h2>
        </button>
      ))}
    </div>
  );
};
