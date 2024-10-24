'use client'
import { useEffect, useState } from 'react';
import { Sprint } from '@/types/types';


  export default function ChallengerSprints() {
    const [sprints, setSprints] = useState<Sprint[]>([]);
  
    useEffect(() => {
      const fetchSprints = async () => {
        try {
          const response = await fetch('/api/sprints/challengersprints');
          const data = await response.json();
          setSprints(data);
        } catch (error) {
          console.error('Erro ao buscar sprints:', error);
        }
      };
      fetchSprints();
    }, []);
  
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-red-600">Challenger Sprints</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sprints.map((sprint) => (
            <div key={sprint.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-bold">{sprint.titulo}</h2>
              <p className="mt-2">{sprint.descricao}</p>
              <p className="mt-2 text-gray-700">Nota: {sprint.nota}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
