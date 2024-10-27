import { minLength, object, pipe, string } from "valibot";

export const NovoAlunoSchema = object({
  nome: pipe(string("Nome inválido"), minLength(1, "Nome muito curto")),
});
