// types/tipo.ts

export interface Disciplina {
    nome: string;
    cp: number;
  }
  
  export interface Aluno {
    id: number;
    nome: string;
    disciplinas: Disciplina[];
  }
  
 