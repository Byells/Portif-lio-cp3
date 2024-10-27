export interface Avaliacao {
  id: number;
  categoria: string; // CheckPoints, GlobalSolution, Challenger Sprints
  nota: number;
  data: string;
  feedback: string;
}

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
