import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";

export const metadata: Metadata = {
  title: "Portifólio Inicial",
  description: "Criação de um portifólio do nosso grupo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className=" home flex-grow ">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
