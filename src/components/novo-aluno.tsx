import type { NotaKey } from "@/types/types";
import { Button } from "./ui/button";

export const NovoAluno: React.FC<{ notaKey: NotaKey }> = ({ notaKey }) => (
  <form method="POST" action="/api/alunos" className="mb-4 space-x-2">
    <input name="key" type="hidden" value={notaKey} />
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
