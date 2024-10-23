export default function Home() {
  return (
   <>
  <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">
      Home
      </h1>

      <div className=" md:grid-cols-2 gap-4 container flex justify-center">
        {/* Aqui você pode adicionar componentes, listas ou qualquer outra funcionalidade */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md: hover:bg-[#aeeaef] ">
          <h2 className="text-xl font-semibold mb-2">Checkpoints</h2>
          <p>Verificar Notas </p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Challenge Sprint</h2>
          <p>Vericar Notas</p>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Global Solutions</h2>
          <p>Verificar Notas</p>
        </div>
      </div>
    </div>
   </>
  );
}
 