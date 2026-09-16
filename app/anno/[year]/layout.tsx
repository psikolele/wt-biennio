import { ClassGate } from "@/app/components/class-gate";

export default async function YearLayout({
  params,
  children,
}: {
  params: Promise<{ year: string }>;
  children: React.ReactNode;
}) {
  const { year } = await params;
  return <ClassGate year={Number(year)}>{children}</ClassGate>;
}
