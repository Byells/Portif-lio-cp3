import type { Aluno } from "@/types/types";
import { isCuid } from "@paralleldrive/cuid2";
import { existsSync, promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const GET = async (_: NextRequest, ctx: { params: { id: string } }) => {
	const id = ctx.params.id;
	if (!id || !isCuid(id)) {
		return NextResponse.json({ message: "aluno not found" }, { status: 404 });
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
			return NextResponse.json({ message: "aluno not found" }, { status: 404 });
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
		return NextResponse.json({ message: "aluno not found" }, { status: 404 });
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
	if (!form) {
		return NextResponse.json({ message: "invalid payload." }, { status: 400 });
	}
	const data = form;
	console.log(data);

	const id = ctx.params.id;
	return NextResponse.json({ message: "ok" });
	//	if (!id || !isCuid(id)) {
	//		return NextResponse.json({ message: "aluno not found" }, { status: 404 });
	//	}
	//	const caminho: string = path.join(process.cwd(), "database", "alunos.json");
	//	try {
	//		if (!existsSync(caminho)) {
	//			await fs.writeFile(caminho, "[]");
	//		}
	//		const alunos: Aluno[] = JSON.parse(
	//			await fs.readFile(caminho, { encoding: "utf8" }),
	//		);
	//
	//		//CONTINUAR
	//	} catch (e) {
	//		if (e instanceof Error) {
	//			return new Response(String(e), { status: 500 });
	//		}
	//		return new Response("error", { status: 500 });
	//	}
};
