export interface Avaliacao {
    id: number;
    titulo: string;
    categoria: string; // CheckPoints, GlobalSolution, Challenger Sprints
    nota: number;
    data: string;
    feedback: string;
}

export interface Sprint {
  id: number;
  titulo: string;
  descricao: string;
  nota: number;
}

  