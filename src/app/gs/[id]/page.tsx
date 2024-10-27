"use client";
import { EditarAluno } from "@/components/cp-page/editar-aluno";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Aluno, NotaKey } from "@/types/types";
import { fetcher } from "@/utils/fetcher";
import { ArrowLeft } from "lucide-react";
import type { NextPage } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import useSWR from "swr";

type Props = { params: { id: string } };
const GsNotaId: NextPage<Props> = ({ params }) => {
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
  const aluno: Aluno = data.aluno;
  const key: NotaKey = "gs";
  const title: Record<NotaKey, string> = {
    cp: "Check Points",
    cs: "Challenger Sprints",
    gs: "Global Solution",
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center content-between justify-between">
        <Button asChild className="w-fit" variant="link">
          <Link href="/cp">
            <ArrowLeft />
            Voltar
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-center">{title[key]}</h1>
        <EditarAluno aluno={aluno} />
      </div>
      <div className="my-4">
        <span className="text-muted-foreground text-sm">Nome</span>
        <h2 className="text-xl font-bold leading-6 capitalize">{aluno.nome}</h2>
      </div>
      <Table className="overflow-x-scroll">
        <TableCaption>Lista de notas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Disciplina</TableHead>
            <TableHead>Nota</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {aluno.disciplinas.map<React.ReactNode>((disciplina) => (
            <TableRow key={disciplina.nome}>
              <TableCell className="font-medium">{disciplina.nome}</TableCell>
              {key in disciplina && <TableCell>{disciplina[key]}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GsNotaId;
