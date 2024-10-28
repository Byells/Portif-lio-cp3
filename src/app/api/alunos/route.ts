import { NovoAlunoSchema } from "@/payloads/novo-aluno";
import { createId } from "@paralleldrive/cuid2";
import type { Aluno } from "@/types/types";
import { NextResponse } from "next/server";
import { safeParse } from "valibot";
import { store } from "@/db";

export const GET = async () => {
  try {
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
    const { addNovoAluno } = store.getState();
    addNovoAluno({
      id: createId(),
      nome: data.nome,
      disciplinas: [
        {
          nome: "Artificial Intelligence & Chatbot",
          cs: 0,
          gs: 0,
          cp: 0,
        },
        { nome: "Building Relational Database", cs: 0, gs: 0, cp: 0 },
        {
          nome: "Computational Thinking Using Python",
          cs: 0,
          gs: 0,
          cp: 0,
        },
        {
          nome: "Domain Driven Design Using Java",
          cs: 0,
          gs: 0,
          cp: 0,
        },
        { nome: "Front-End Design Engineering", cs: 0, gs: 0, cp: 0 },
        {
          nome: "Software Engineering and Business Model",
          cs: 0,
          gs: 0,
          cp: 0,
        },
      ],
    } satisfies Aluno);

    return NextResponse.redirect(new URL(`/${data.key}`, r.url), {
      status: 302,
    });
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
    }
    return new Response(null);
  }
};
