import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { Avaliacao } from "@/types/types";

export async function GET() {
    const file = await fs.readFile(process.cwd() + '/src/data/evaluations.json', 'utf-8');

    const evaluations: Avaliacao[] = JSON.parse(file);
    
    return NextResponse.json(evaluations);
}

export async function POST(request: Request) {
    const file = await fs.readFile(process.cwd() + '/src/data/evaluations.json', 'utf-8');

    const evaluations: Avaliacao[] = JSON.parse(file);

    const newEvaluation = await request.json();

    newEvaluation.id = evaluations.length ? evaluations[evaluations.length - 1].id + 1 : 1;
    evaluations.push(newEvaluation);

    await fs.writeFile(process.cwd() + '/src/data/evaluations.json', JSON.stringify(evaluations));

    return NextResponse.json({ msg: "Avaliação criada com sucesso." });
}
