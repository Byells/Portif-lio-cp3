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
import type { Aluno, Disciplina, NotaKey } from "@/types/types";
import { useForm } from "react-hook-form";

type Props = { aluno: Aluno; key: NotaKey };

export const EditarAluno: React.FC<Props> = ({ aluno, key }) => {
	const form = useForm();
	return (
		<form>
			<Dialog>
				<DialogTrigger>
					<Button type="button">Editar Aluno</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Editar aluno</DialogTitle>
						<DialogDescription>
							Faça mundaças nos dados do aluno aqui. Clique em salvar quando
							você terminar.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="nome" className="text-right">
								Nome
							</Label>
							<Input
								id="nome"
								defaultValue={aluno.nome}
								className="col-span-3"
							/>
						</div>
						{aluno.disciplinas.map<React.ReactNode>((disciplina) =>
							key in disciplina ? (
								<div
									key={disciplina.nome}
									className="grid grid-cols-4 items-center gap-4"
								>
									<Label htmlFor="username" className="text-right">
										{disciplina.nome}
									</Label>
									<Input
										id="username"
										defaultValue={
											disciplina[key as unknown as keyof Disciplina]
										}
										className="col-span-3"
									/>
								</div>
							) : null,
						)}
					</div>
					<DialogFooter>
						<Button type="submit">Salvar mudanças</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</form>
	);
};
