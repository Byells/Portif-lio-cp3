"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link'; 
import { Aluno } from '@/types/types'; 
export default function Cp() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  // Função para buscar alunos da API
  const fetchAlunos = async () => {
    try {
      const response = await fetch('/api/base-route');
      if (response.ok) {
        const data = await response.json();
        setAlunos(data);
      } else {
        console.error('Erro ao buscar alunos');
      }
    } catch (error) {
      console.error('Erro de conexão', error);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Lista de Alunos - Notas Checkpoint</h1>
      
      {/* Link para a página de cadastro de aluno */}
      <div className="text-center mb-6">
        <Link href="/cad-cp">
          <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Adicionar Novo Aluno
          </a>
        </Link>
      </div>
      
      {/* Renderização das tabelas para cada aluno */}
      {alunos.map((aluno) => (
        <div key={aluno.id} className="mb-6">
          <h2 className="text-xl font-semibold text-center mb-4">{aluno.nome}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 border border-gray-300">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2 border">Disciplina</th>
                  <th className="px-4 py-2 border">CP</th>
                </tr>
              </thead>
              <tbody>
                {aluno.disciplinas.map((disciplina, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-4 py-2 border">{disciplina.nome}</td>
                    <td className="px-4 py-2 border text-center">{disciplina.cp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}


