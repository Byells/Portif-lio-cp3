import { Button } from "../ui/button";

export const NovoAluno: React.FC = () => (
  <form method="POST" action="/api/alunos" className="mb-4 space-x-2">
    <input
      name="nome"
      required
      placeholder="Nome do aluno"
      className="border p-2"
      minLength={1}
    />
    <Button type="submit">Adicionar Aluno</Button>
  </form>
);
