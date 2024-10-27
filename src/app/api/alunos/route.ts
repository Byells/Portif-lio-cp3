import { NovoAlunoSchema } from "@/payloads/novo-aluno";
import { createId } from "@paralleldrive/cuid2";
import type { Aluno } from "@/types/types";
import { promises as fs, existsSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";
import { safeParse } from "valibot";
import { store } from "@/db";

export const GET = async () => {
  try {
    // const caminho = path.join(process.cwd(), "database", "alunos.json");
    // const exists = existsSync(caminho);
    // if (exists) {
    //   const alunosFile = await fs.readFile(caminho, { encoding: "utf8" });
    //   return NextResponse.json(JSON.parse(alunosFile));
    // }
    const { alunos } = store.getState();
    return NextResponse.json(alunos);
  } catch (e) {
    if (e instanceof Error) {
      return new Response(String(e), { status: 500 });
    }
    return new Response("error", { status: 500 });
  }
};

export const POST = async (r: Request) => {
  const form = await r.formData();
  const body = safeParse(NovoAlunoSchema, Object.fromEntries(form.entries()));
  if (!body.success) {
    return NextResponse.json(body.issues, { status: 400 });
  }
  const data = body.output;
  try {
    const caminho = path.join(process.cwd(), "database", "alunos.json");
    if (!existsSync(caminho)) {
      await fs.writeFile(caminho, "[]");
    }
    // const alunos: Aluno[] = JSON.parse(
    //   await fs.readFile(caminho, { encoding: "utf8" }),
    // );

    const { addNovoAluno } = store.getState();
    addNovoAluno({
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
    } satisfies Aluno);

    // await fs.writeFile(
    //   caminho,
    //   JSON.stringify(
    //     alunos.concat({
    //       id: createId(),
    //       nome: data.nome,
    //       disciplinas: [
    //         {
    //           nome: "Artificial Intelligence & Chatbot",
    //           cs: 100,
    //           gs: 100,
    //           cp: 100,
    //         },
    //         { nome: "Building Relational Database", cs: 100, gs: 100, cp: 100 },
    //         {
    //           nome: "Computational Thinking Using Python",
    //           cs: 100,
    //           gs: 100,
    //           cp: 100,
    //         },
    //         {
    //           nome: "Domain Driven Design Using Java",
    //           cs: 100,
    //           gs: 100,
    //           cp: 100,
    //         },
    //         { nome: "Front-End Design Engineering", cs: 100, gs: 100, cp: 100 },
    //         {
    //           nome: "Software Engineering and Business Model",
    //           cs: 100,
    //           gs: 100,
    //           cp: 100,
    //         },
    //       ],
    //     } satisfies Aluno),
    //     null,
    //     4,
    //   ),
    // );

    return NextResponse.redirect(new URL(`/${data.key}`, r.url));
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
    }
    return new Response(null);
  }
};
