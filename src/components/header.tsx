import imglogo from "@/img/scroll.png";
import Image from "next/image";
import Link from "next/link";

export const Header: React.FC = () => (
  <div>
    <header className="bg-slate-600 text-dark shadow-md display: flex align-item: center">
      <Image src={imglogo} alt="Logo" width={60} height={60} />
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Portifólio Estudante</h1>

        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-orange-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-orange-400">
                Sobre
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
);
