import { AlunosList } from "@/components/alunos-list";
import { NovoAluno } from "@/components/cp-page/novo-aluno";
import type { NextPage } from "next";

const CpPage: NextPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Notas Checkpoint</h1>
      <NovoAluno />
      <AlunosList notaKey="cp" />
    </div>
  );
};

export default CpPage;
