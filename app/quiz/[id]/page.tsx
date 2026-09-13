import { notFound } from "next/navigation";
import Link from "next/link";
import { checkpointQuizzes } from "@/app/data/quizzes-data";
import { QuizPlayer } from "@/app/components/quiz-player";

export function generateStaticParams() {
  return checkpointQuizzes.map((quiz) => ({
    id: quiz.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quiz = checkpointQuizzes.find((q) => q.id === id);
  if (!quiz) return { title: "Quiz non trovato" };

  return {
    title: `${quiz.title} | Serenity School`,
    description: quiz.description,
  };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const quiz = checkpointQuizzes.find((q) => q.id === id);

  if (!quiz) {
    notFound();
  }

  return (
    <main className="portal-shell px-4 py-8 sm:px-8 sm:py-12">
      <div className="portal-container max-w-5xl">
        {/* Top Breadcrumb Nav */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href={`/anno/${quiz.year}/settimana/${quiz.week}`}
            className="portal-button-secondary text-xs sm:text-sm py-1.5 px-3 rounded-lg"
          >
            ← Lezione {quiz.week} (Anno {quiz.year})
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/docenti"
              className="portal-button-secondary text-xs sm:text-sm py-1.5 px-3 rounded-lg"
            >
              Console Docenti
            </Link>
          </div>
        </div>

        {/* Quiz Interactive Container */}
        <QuizPlayer quiz={quiz} />
      </div>
    </main>
  );
}
