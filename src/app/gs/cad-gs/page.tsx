import { useEffect, useState } from 'react';

export default function GlobalSolution() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/projects/globalsolution');
      const data = await response.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6 text-green-600">GlobalSolution</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-bold">{project.title}</h2>
            <p className="mt-2">{project.description}</p>
            <p className="mt-2 text-gray-700">Nota: {project.grade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

