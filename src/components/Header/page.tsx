import React from 'react'

export default function Header() {
  return (
    <div>
      <header className="bg-gray-600 text-dark shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo ou Título */}
        <h1 className="text-2xl font-bold">Portifólio Estudante</h1>

        {/* Links de navegação */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:text-orange-400">Home</a>
            </li>
            <li>
              <a href="/about" className="hover:text-orange-400">Sobre</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
      
    </div>
  )
}
