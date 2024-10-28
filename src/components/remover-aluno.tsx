"use client";
import type { NotaKey } from "@/types/types";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const RemoverAluno: React.FC<{ notaKey: NotaKey; alunoId: string }> = ({
  notaKey,
  alunoId,
}) => {
  const router = useRouter();
  const deleteAluno = async () => {
    const body = new FormData();
    body.append("key", notaKey);
    const res = await fetch(`/api/alunos/${alunoId}`, {
      body,
      method: "DELETE",
    });
    if (res.ok && res.status === 200) {
      return router.replace(`/${notaKey}`);
    }
    toast("Ops! Alguma coisa deu errado");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Remover aluno</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Apagar aluno</DialogTitle>
          <DialogDescription>
            Tem certeza que gostaria de realizar esta ação? Essa ação é
            irreversível.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="destructive" onClick={deleteAluno}>
              Apagar Aluno
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
