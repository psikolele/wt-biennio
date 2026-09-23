import { ClassGate } from "@/app/components/class-gate";
import { hasClassAccess } from "@/app/lib/class-access";

export default async function YearLayout({
  params,
  children,
}: {
  params: Promise<{ year: string }>;
  children: React.ReactNode;
}) {
  const { year } = await params;
  const yearNumber = Number(year);
  const unlocked = await hasClassAccess(yearNumber);

  return (
    <ClassGate year={yearNumber} serverUnlocked={unlocked}>
      {unlocked ? children : null}
    </ClassGate>
  );
}
