import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";



export const metadata: Metadata = {
  title: "CP 3",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header/>
        <div className="home">
        {children}
        <Footer/>
        </div>
      </body>
    </html>
  );
}
