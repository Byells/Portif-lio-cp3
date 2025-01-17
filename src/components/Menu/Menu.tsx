import React from 'react'
import Link from "next/link";

export default function Menu() {
  return (
   <div className="container mx-auto p-8">
  <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">Portfólio de Avaliações</h1>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
    <Link href="/cp">
      <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
        <h2 className="text-3x2 font-bold">CheckPoints</h2>
       <div><p>Avaliações intermediárias para acompanhamento do progresso.</p></div>
      </div>
    </Link>
    <Link href="/gs">
      <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
        <h2 className="text-3x2 font-bold">Global Solution</h2>
        <div>
        <p>Projetos integradores aplicando conhecimentos adquiridos.</p>
        </div>
      </div>
    </Link>
    <Link href="/cs">
      <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
        <h2 className="text-3x2 font-bold">Challenger Sprints</h2>
        <div><p>
          Desafios com foco em resolução de problemas.</p>
          </div>
      </div>
    </Link>
  </div>
</div>
);
}
