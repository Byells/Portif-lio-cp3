export type NotaKey = "gs" | "cp" | "cs";

export type Disciplina = { nome: string } & (
  | { cp: number }
  | { gs: number }
  | { cs: number }
);

export type Aluno = {
  id: string;
  nome: string;
  disciplinas: Disciplina[];
};
