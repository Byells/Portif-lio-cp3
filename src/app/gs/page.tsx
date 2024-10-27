import { AlunosList } from "@/components/alunos-list";
import { NovoAluno } from "@/components/novo-aluno";

const GsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Notas Global Solution
      </h1>
      <NovoAluno notaKey="gs" />
      <AlunosList notaKey="gs" />
    </div>
  );
};
export default GsPage;
