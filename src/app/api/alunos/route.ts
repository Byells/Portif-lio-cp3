import { promises as fs, existsSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export const GET = async () => {
  try {
    const caminho = path.join(process.cwd(), "database", "alunos.json");
    const exists = existsSync(caminho);
    if (exists) {
      const alunosFile = await fs.readFile(caminho, { encoding: "utf8" });
      return NextResponse.json(JSON.parse(alunosFile));
    }
    return NextResponse.json([]);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
    }
    return new Response(null);
  }
};
