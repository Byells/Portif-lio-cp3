import {
  minLength,
  minValue,
  number,
  picklist,
  pipe,
  strictObject,
  string,
  transform,
} from "valibot";

const nota = pipe(
  string(),
  transform((i) => Number(i)),
  number(),
  minValue(0),
);
export const EditarAlunoSchema = strictObject({
  nome: pipe(string("Nome inválido"), minLength(1, "Nome muito curto")),
  key: picklist(["cs", "cp", "gs"]),
  "Artificial Intelligence & Chatbot": nota,
  "Building Relational Database": nota,
  "Computational Thinking Using Python": nota,
  "Domain Driven Design Using Java": nota,
  "Front-End Design Engineering": nota,
  "Software Engineering and Business Model": nota,
});
