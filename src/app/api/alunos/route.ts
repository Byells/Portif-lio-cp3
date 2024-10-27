import { NovoAlunoSchema } from "@/payloads/novo-aluno";
import { createId } from "@paralleldrive/cuid2";
import type { Aluno } from "@/types/types";
import { promises as fs, existsSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { safeParse } from "valibot";

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
      return new Response(String(e), { status: 500 });
    }
    return new Response("error", { status: 500 });
  }
};

export const POST = async (r: Request) => {
  const form = await r.formData();
  const body = safeParse(NovoAlunoSchema, { nome: form.get("nome") });
  if (!body.success) {
    return NextResponse.json(body.issues, { status: 400 });
  }
  const data = body.output;
  try {
    const caminho = path.join(process.cwd(), "database", "alunos.json");
    if (!existsSync(caminho)) {
      await fs.writeFile(caminho, "[]");
    }
    const alunos: Aluno[] = JSON.parse(
      await fs.readFile(caminho, { encoding: "utf8" }),
    );

    await fs.writeFile(
      caminho,
      JSON.stringify(
        alunos.concat({
          id: createId(),
          nome: data.nome,
          disciplinas: [
            {
              nome: "Artificial Intelligence & Chatbot",
              cs: 100,
              gs: 100,
              cp: 100,
            },
            { nome: "Building Relational Database", cs: 100, gs: 100, cp: 100 },
            {
              nome: "Computational Thinking Using Python",
              cs: 100,
              gs: 100,
              cp: 100,
            },
            {
              nome: "Domain Driven Design Using Java",
              cs: 100,
              gs: 100,
              cp: 100,
            },
            { nome: "Front-End Design Engineering", cs: 100, gs: 100, cp: 100 },
            {
              nome: "Software Engineering and Business Model",
              cs: 100,
              gs: 100,
              cp: 100,
            },
          ],
        } satisfies Aluno),
      ),
    );

    return NextResponse.redirect(new URL("/cp", r.url));
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
    }
    return new Response(null);
  }
};
