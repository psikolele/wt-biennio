import { curriculum } from "./curriculum-data.mjs";

export type Year = 1 | 2 | 3 | 4 | 5;
export type Lesson = {
  id: string;
  title: string;
  hours: number;
  book: string;
  objectives: string[];
  activity: string;
  kind: "concept" | "laboratory" | "practice" | "review" | "project";
  explanation?: string;
  example?: string;
  exercise: string;
  deepDive?: string;
  competence: string;
  evidence: string;
  materials: string[];
  phases: { label: string; minutes: number }[];
  quickCheck: string;
  flashCard: string;
  bookActivity: string;
  platforms: string[];
  facilitatedTask: string;
  game?: string;
  slideHref?: string;
  studentCta: { label: string; href: string }[];
};
export type Week = { number: number; theme: string; lessons: Lesson[] };

export const typedCurriculum = curriculum as Record<Year, Week[]>;
export { typedCurriculum as curriculum };

export function getYearWeeks(year: Year): Week[] {
  return typedCurriculum[year];
}

export function getWeek(year: Year, weekNumber: number): Week | undefined {
  return getYearWeeks(year).find((week) => week.number === weekNumber);
}
