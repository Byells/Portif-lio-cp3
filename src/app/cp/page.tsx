import { AlunosList } from "@/components/cp-page/alunos-list";

export default function Cp() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Notas Checkpoint</h1>

      <div className="mb-4">
        <input placeholder="Nome do aluno" className="border p-2" />
        <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-700">
          Adicionar Aluno
        </button>
      </div>

      <AlunosList />
    </div>
  );
}
