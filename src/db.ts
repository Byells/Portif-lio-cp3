import { createStore } from "zustand/vanilla";
import { readFileSync } from "fs";
import type { Aluno } from "./types/types";
import path from "path";

type Store = {
  alunos: Aluno[];
  setAlunos: (alunos: Aluno[]) => void;
  addNovoAluno: (aluno: Aluno) => void;
};

const alunos: Aluno[] = JSON.parse(
  readFileSync(path.join(process.cwd(), "database", "alunos.json"), "utf-8"),
);
export const store = createStore<Store>((set) => ({
  alunos,
  setAlunos: (alunos: Aluno[]) => set({ alunos }),
  addNovoAluno: (aluno: Aluno) =>
    set((state) => ({ alunos: state.alunos.concat(aluno) })),
}));
