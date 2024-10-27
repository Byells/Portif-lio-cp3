"use client";
import { Aluno } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import { ArrowLeft } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import useSWR from "swr";

type Props = { params: { id: string } };
const CpNotaId: NextPage<Props> = ({ params }) => {
  const { data, isLoading, error } = useSWR<
    { message: string } | { aluno: Aluno }
  >(`/api/alunos/${params.id}`, fetcher);
  if (error) {
    throw new Error(error);
  }
  if (isLoading) {
    return "Carregando...";
  }
  if (!data || "message" in data) {
    return redirect("/not-found");
  }
  const aluno = data.aluno;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3">
        <Link href="/cp">
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold text-center mb-6">{aluno.nome}</h1>
      </div>
      <h2 className="mx-auto text-center">Notas</h2>
      {JSON.stringify(aluno.disciplinas)}
    </div>
  );
};

export default CpNotaId;
