import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { Avaliacao } from "@/types/types";

export async function GET(request: Request, { params }: { params: { id: number } }) {
    const file = await fs.readFile(process.cwd() + '/src/data/evaluations.json', 'utf-8');
    const evaluations: Avaliacao[] = JSON.parse(file);
    const evaluation = evaluations.find(e => e.id === params.id);

    return NextResponse.json(evaluation);
}

export async function PUT(request: Request, { params }: { params: { id: number } }) {
    const file = await fs.readFile(process.cwd() + '/src/data/evaluations.json', 'utf-8');
    const evaluations: Avaliacao[] = JSON.parse(file);
    const { nome, nota, descricao } = await request.json();
    const index = evaluations.findIndex(e => e.id === params.id);

    if (index !== -1) {
        const updatedEvaluation = { nome, nota, descricao, id: params.id } as Avaliacao;
        evaluations.splice(index, 1, updatedEvaluation);
        await fs.writeFile(process.cwd() + '/src/data/evaluations.json', JSON.stringify(evaluations));
        return NextResponse.json({ msg: "Avaliação atualizada com sucesso." });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: number } }) {
    const file = await fs.readFile(process.cwd() + '/src/data/evaluations.json', 'utf-8');
    const evaluations: Avaliacao[] = JSON.parse(file);
    const index = evaluations.findIndex(e => e.id === params.id);

    if (index !== -1) {
        evaluations.splice(index, 1);
        await fs.writeFile(process.cwd() + '/src/data/evaluations.json', JSON.stringify(evaluations));
        return NextResponse.json({ msg: "Avaliação excluída com sucesso." });
    }
}
