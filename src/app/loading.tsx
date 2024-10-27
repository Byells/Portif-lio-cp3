import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <Loader className="animate-spin" />
      Carregando
    </div>
  );
}
