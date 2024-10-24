"use client";

import { useState } from 'react';

type Aluno = {
  id: number;
  nome: string;
  disciplinas: { nome: string; cp: number }[];
};

export default function cs() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [nome, setNome] = useState('');
  
  const adicionarAluno = () => {
    if (!nome) return; 

    const novoAluno: Aluno = {
      id: alunos.length + 1,
      nome,
      disciplinas: [
        { nome: "Artificial Intelligence & Chatbot", cp: Math.floor(Math.random() * 100) },
        { nome: "Building Relational Database", cp: Math.floor(Math.random() * 100) },
        { nome: "Computational Thinking Using Python", cp: Math.floor(Math.random() * 100) },
        { nome: "Domain Driven Design Using Java", cp: Math.floor(Math.random() * 100) },
        { nome: "Front-End Design Engineering", cp: Math.floor(Math.random() * 100) },
        { nome: "Software Engineering and Business Model", cp: Math.floor(Math.random() * 100) }
      ]
    };

    setAlunos([...alunos, novoAluno]);
    setNome(''); // Limpa o campo de entrada
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Notas Checkpoint</h1>

      <div className="mb-4">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do aluno"
          className="border p-2"
        />
        <button
          onClick={adicionarAluno}
          className="bg-blue-500 text-white px-4 py-2 ml-2 rounded hover:bg-blue-700"
        >
          Adicionar Aluno
        </button>
      </div>

      {alunos.map((aluno) => (
        <div key={aluno.id} className="mb-6">
          <h2 className="text-xl font-semibold text-center">{aluno.nome}</h2>
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
