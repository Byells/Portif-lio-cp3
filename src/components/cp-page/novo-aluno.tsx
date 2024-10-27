export const NovoAluno: React.FC = () => {
  return (
    <form method="POST" action="/api/alunos" className="mb-4">
      <input
        name="nome"
        required
        placeholder="Nome do aluno"
        className="border p-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-700"
      >
        Adicionar Aluno
      </button>
    </form>
  );
};
