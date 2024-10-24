import { useEffect, useState } from 'react';

export default function ChallengerSprints() {
  const [sprints, setSprints] = useState([]);

  useEffect(() => {
    const fetchSprints = async () => {
      const response = await fetch('/api/sprints/challengersprints');
      const data = await response.json();
      setSprints(data);
    };
    fetchSprints();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-red-600">Challenger Sprints</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sprints.map(sprint => (
          <div key={sprint.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold">{sprint.title}</h2>
            <p className="mt-2">{sprint.description}</p>
            <p className="mt-2 text-gray-700">Nota: {sprint.grade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
