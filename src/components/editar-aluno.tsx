import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Aluno, Disciplina, NotaKey } from "@/types/types";
import type { FormEventHandler } from "react";
import { useSWRConfig } from "swr";

type Props = { aluno: Aluno; notaKey: NotaKey };

const mutationEditAluno = ([url, body]: [string, FormData]) =>
  fetch(url, {
    method: "PUT",
    body,
  });

export const EditarAluno: React.FC<Props> = ({ aluno, notaKey }) => {
  const { mutate } = useSWRConfig();
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const body = new FormData(e.currentTarget);
    mutate(`/api/alunos/${aluno.id}`, () =>
      mutationEditAluno([`/api/alunos/${aluno.id}`, body]),
    );
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button type="button">Editar Aluno</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Editar aluno</DialogTitle>
            <DialogDescription>
              Faça mundaças nos dados do aluno aqui. Clique em salvar quando
              você terminar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <input name="key" type="hidden" value={notaKey} />
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input
                id="nome"
                name="nome"
                defaultValue={aluno.nome}
                className="col-span-3"
              />
            </div>
            {aluno.disciplinas.map<React.ReactNode>((disciplina) =>
              notaKey in disciplina ? (
                <div
                  key={disciplina.nome}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Label htmlFor={disciplina.nome} className="text-right">
                    {disciplina.nome}
                  </Label>
                  <Input
                    name={disciplina.nome}
                    id={disciplina.nome}
                    defaultValue={
                      disciplina[notaKey as unknown as keyof Disciplina]
                    }
                    type="number"
                    step="0.01"
                    className="col-span-3"
                  />
                </div>
              ) : null,
            )}
          </div>
          <DialogFooter>
            <DialogClose>
              <Button type="submit">Salvar mudanças</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
