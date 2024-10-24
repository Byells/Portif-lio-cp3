import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { Avaliacao } from "@/types/types";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const file = await fs.readFile(process.cwd() + '/src/data/evaluations.json', 'utf-8');
    const evaluations: Avaliacao[] = JSON.parse(file);
    const evaluation = evaluations.find(e => e.id === parseInt(params.id));

    return NextResponse.json(evaluation || { msg: "Avaliação não encontrada." }, { status: evaluation ? 200 : 404 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const file = await fs.readFile(process.cwd() + '/src/data/evaluations.json', 'utf-8');
    const evaluations: Avaliacao[] = JSON.parse(file);
    const { titulo, nota, categoria, data, feedback } = await request.json(); // Alterado para 'titulo'
    const index = evaluations.findIndex(e => e.id === parseInt(params.id));

    if (index !== -1) {
        const updatedEvaluation: Avaliacao = { titulo, nota, categoria, data, feedback, id: parseInt(params.id) };
        evaluations.splice(index, 1, updatedEvaluation);
        await fs.writeFile(process.cwd() + '/src/data/evaluations.json', JSON.stringify(evaluations));
        return NextResponse.json({ msg: "Avaliação atualizada com sucesso." });
    }

    return NextResponse.json({ msg: "Avaliação não encontrada." }, { status: 404 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const file = await fs.readFile(process.cwd() + '/src/data/evaluations.json', 'utf-8');
    const evaluations: Avaliacao[] = JSON.parse(file);
    const index = evaluations.findIndex(e => e.id === parseInt(params.id));

    if (index !== -1) {
        evaluations.splice(index, 1);
        await fs.writeFile(process.cwd() + '/src/data/evaluations.json', JSON.stringify(evaluations));
        return NextResponse.json({ msg: "Avaliação excluída com sucesso." });
    }

    return NextResponse.json({ msg: "Avaliação não encontrada." }, { status: 404 });
}
