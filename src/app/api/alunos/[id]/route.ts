import { EditarAlunoSchema } from "@/payloads/editar-aluno";
import type { Aluno } from "@/types/types";
import { isCuid } from "@paralleldrive/cuid2";
import { existsSync, promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { safeParse } from "valibot";

export const GET = async (_: NextRequest, ctx: { params: { id: string } }) => {
  const id = ctx.params.id;
  if (!id || !isCuid(id)) {
    return NextResponse.json(
      { message: "aluno não encontrado." },
      { status: 404 },
    );
  }
  const caminho: string = path.join(process.cwd(), "database", "alunos.json");
  try {
    if (!existsSync(caminho)) {
      await fs.writeFile(caminho, "[]");
    }
    const alunos: Aluno[] = JSON.parse(
      await fs.readFile(caminho, { encoding: "utf8" }),
    );
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
  if (!id || !isCuid(id)) {
    return NextResponse.json(
      { message: "aluno não encontrado." },
      { status: 404 },
    );
  }
  const caminho: string = path.join(process.cwd(), "database", "alunos.json");
  try {
    if (!existsSync(caminho)) {
      await fs.writeFile(caminho, "[]");
    }
    const alunos: Aluno[] = JSON.parse(
      await fs.readFile(caminho, { encoding: "utf8" }),
    );

    //CONTINUAR
  } catch (e) {
    if (e instanceof Error) {
      return new Response(String(e), { status: 500 });
    }
    return new Response("error", { status: 500 });
  }
};

export const PUT = async (req: Request, ctx: { params: { id: string } }) => {
  const form = await req.formData();
  console.log(form);
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
  const caminho: string = path.join(process.cwd(), "database", "alunos.json");
  try {
    if (!existsSync(caminho)) {
      await fs.writeFile(caminho, "[]");
    }
    const alunos: Aluno[] = JSON.parse(
      await fs.readFile(caminho, { encoding: "utf8" }),
    );
    const alunoIdx = alunos.findIndex((aluno) => aluno.id === id);
    console.log(alunoIdx);
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
    await fs.writeFile(caminho, JSON.stringify(alunos, null, 4));
    return NextResponse.json(null);
  } catch (e) {
    if (e instanceof Error) {
      return new Response(String(e), { status: 500 });
    }
    return new Response("error", { status: 500 });
  }
};
