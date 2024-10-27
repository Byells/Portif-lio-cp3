import { AlunosList } from "@/components/alunos-list";
import { NovoAluno } from "@/components/cp-page/novo-aluno";
import type { NextPage } from "next";

const CsPage: NextPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Notas Challenge Sprints
      </h1>
      <NovoAluno />
      <AlunosList notaKey="cs" />
    </div>
  );
};

export default CsPage;
