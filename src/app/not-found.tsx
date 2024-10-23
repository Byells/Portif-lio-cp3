import Image from 'next/image';
import notFoundtriste from "@/img/emogi_triste.png";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <Image src= {notFoundtriste} alt='Emoji triste' width={300}/> 
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found...</h1>
      <p className="text-lg text-gray-600">Esse recurso não está disponível no momento.</p>
    </div>
  );
}