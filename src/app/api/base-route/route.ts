
import { NextApiRequest, NextApiResponse } from 'next';
import {promises as fs} from 'fs';
import path from 'path';
import { Aluno } from '../../../types/types';
import { NextResponse } from 'next/server';

export async function GET(){
    try{
    const file = await fs.readFile(process.cwd()+ '/src/data/alunos.json', 'utf-8');
    const data = JSON.parse(file);
    return NextResponse.json(data);
} catch (error){    
    console.error("Falha em obter dados",  error);
    return NextResponse.json({error: "Falha em obter dados"+ error}, {status: 500});
}

}


