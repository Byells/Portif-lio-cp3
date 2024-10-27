import { AlunosList } from "@/components/cp-page/alunos-list";
import { NovoAluno } from "@/components/cp-page/novo-aluno";

export default function Cp() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Notas Challenge Sprints</h1>
      <NovoAluno />
      <AlunosList />
    </div>
  );
}