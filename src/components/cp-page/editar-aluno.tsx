import {
  Dialog,
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
import type { Aluno } from "@/types/types";

type Props = { aluno: Aluno };

export const EditarAluno: React.FC<Props> = ({ aluno }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Editar Aluno</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar aluno</DialogTitle>
          <DialogDescription>
            Faça mundaças nos dados do aluno aqui. Clique em salvar quando você
            terminar.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">
              Nome
            </Label>
            <Input id="nome" defaultValue={aluno.nome} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar mudanças</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
