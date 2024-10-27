import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { Aluno } from "@/types/types";

export async function GET(request:Request,{params}: {params: {id: number}}){
    try{
        const file = await fs.readFile(process.cwd()+ '/src/data/alunos.json', 'utf-8');
        const data:Aluno[] = JSON.parse(file);     
        const aluno = data.find(aluno => aluno.id === params.id);
        
        if(aluno){
            return NextResponse.json(aluno);
    }
    
} catch (error){    
    console.error("Falha em obter dados",  error);
    return NextResponse.json({error: "Falha em obter dados"+ error}, {status: 500});
}
}
