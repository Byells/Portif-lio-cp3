import { store } from "@/db";
import { EditarAlunoSchema } from "@/payloads/editar-aluno";
import type { Aluno } from "@/types/types";
import { isCuid } from "@paralleldrive/cuid2";
import { NextRequest, NextResponse } from "next/server";
import { safeParse } from "valibot";

export const GET = async (_: NextRequest, ctx: { params: { id: string } }) => {
  const id = ctx.params.id;
  if (!id || !isCuid(id)) {
    return NextResponse.json(
      { message: "aluno não encontrado." },
      { status: 404 },
    );
  }
  try {
    const { alunos } = store.getState();
    const aluno: Aluno | undefined = alunos.find((item) => item.id === id);
    if (!aluno) {
      return NextResponse.json(
        { message: "aluno não encontrado." },
        { status: 404 },
      );
    }
    return NextResponse.json({ aluno });
  } catch (e) {
    if (e instanceof Error) {
      return new Response(String(e), { status: 500 });
    }
    return new Response("error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  ctx: { params: { id: string } },
) => {
  const id = ctx.params.id;
  const form = await req.formData();
  const key = form.get("key") as string;
  if (!["cp", "gs", "cs"].includes(key)) {
    return NextResponse.json({ message: "payload inválido." }, { status: 400 });
  }
  if (!id || !isCuid(id)) {
    return NextResponse.json(
      { message: "aluno não encontrado." },
      { status: 404 },
    );
  }
  try {
    const { alunos, setAlunos } = store.getState();
    const novosAlunos = alunos.filter((al) => al.id !== id);
    setAlunos(novosAlunos);
    return NextResponse.json(null);
  } catch (e) {
    if (e instanceof Error) {
      return new Response(String(e), { status: 500 });
    }
    return new Response("error", { status: 500 });
  }
};

export const PUT = async (req: Request, ctx: { params: { id: string } }) => {
  const form = await req.formData();
  if (!form) {
    return NextResponse.json({ message: "invalid payload." }, { status: 400 });
  }
  const parsed = safeParse(
    EditarAlunoSchema,
    Object.fromEntries(form.entries()),
  );
  if (parsed.issues) {
    return NextResponse.json({ issues: parsed.issues }, { status: 400 });
  }
  const id = ctx.params.id;
  if (!id || !isCuid(id)) {
    return NextResponse.json(
      { message: "aluno não encontrado." },
      { status: 404 },
    );
  }
  try {
    const { alunos, setAlunos } = store.getState();
    const alunoIdx = alunos.findIndex((aluno) => aluno.id === id);
    if (alunoIdx === -1) {
      return NextResponse.json(
        { message: "aluno não encontrado." },
        { status: 404 },
      );
    }
    const aluno: Aluno = alunos[alunoIdx];
    const data = parsed.output;
    aluno.nome = data.nome;
    aluno.disciplinas = aluno.disciplinas.map((disc) => {
      if (!(disc.nome in data)) {
        return disc;
      }
      return {
        ...disc,
        [data.key]: data[disc.nome as keyof typeof data],
      };
    });
    alunos[alunoIdx] = aluno;
    setAlunos(alunos);
    return NextResponse.json(null);
  } catch (e) {
    if (e instanceof Error) {
      return new Response(String(e), { status: 500 });
    }
    return new Response("error", { status: 500 });
  }
};
