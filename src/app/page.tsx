import Menu from "@/components/Menu/Menu";

export default async function Home() {
  await new Promise((r) => setTimeout(r, 1000));
  return (
    <div>
      <Menu />
    </div>
  );
}
