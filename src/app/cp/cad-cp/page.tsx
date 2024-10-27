
"use client";

import { useState } from 'react';
import { Aluno } from '@/types/types';
import { useRouter } from 'next/router';

export default function CadCp() {
  const [nome, setNome] = useState('');
  const [disciplinas, setDisciplinas] = useState([
    { nome: "Artificial Intelligence & Chatbot", cp: 0 },
    { nome: "Building Relational Database", cp: 0 },
    { nome: "Computational Thinking Using Python", cp: 0 },
    { nome: "Domain Driven Design Using Java", cp: 0 },
    { nome: "Front-End Design Engineering", cp: 0 },
    { nome: "Software Engineering and Business Model", cp: 0 }
  ]);

  // Função para adicionar um novo aluno
  const adicionarAluno = async () => {
    if (!nome) return;

    const novoAluno: Aluno = {
      id: Date.now(),
      nome,
      disciplinas
    };

    try {
      const response = await fetch('/api/alunos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoAluno)
      });

      if (response.ok) {
        setNome(''); // Limpa o campo de entrada
        setDisciplinas(disciplinas.map(d => ({ ...d, cp: 0 }))); // Reseta as notas para 0
        alert('Aluno adicionado com sucesso!');
      } else {
        console.error('Erro ao adicionar aluno');
      }
    } catch (error) {
      console.error('Erro de conexão', error);
    }
  };

  // Função para atualizar a nota de uma disciplina
  const handleNotaChange = (index: number, nota: number) => {
    const novasDisciplinas = [...disciplinas];
    novasDisciplinas[index].cp = nota;
    setDisciplinas(novasDisciplinas);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Adicionar Aluno - Notas Checkpoint</h1>

      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do aluno"
          className="border p-2 flex-1 mr-2"
        />
        <button
          onClick={adicionarAluno}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar Aluno
        </button>
      </div>

      <div className="mb-4">
        {disciplinas.map((disciplina, index) => (
          <div key={index} className="mb-2 flex items-center">
            <label className="mr-2 flex-shrink-0 w-1/2">{disciplina.nome}:</label>
            <input
              type="number"
              value={disciplina.cp}
              onChange={(e) => handleNotaChange(index, Number(e.target.value))}
              placeholder="Nota CP"
              className="border p-2 flex-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

