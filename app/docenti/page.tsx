import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { hasTeacherSession } from "@/app/lib/auth";
import { teacherNotes } from "@/app/data/teacher-notes";

export default async function TeacherPage() {
  const session = (await cookies()).get("teacher_session")?.value;
  if (!hasTeacherSession(session)) redirect("/docenti/login");
  return (
    <main className="portal-shell px-5 py-10 sm:px-10">
      <div className="portal-container max-w-5xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="portal-button-secondary">← Portale studenti</Link>
          <form action="/api/teacher-logout" method="POST">
            <button type="submit" className="portal-button-secondary text-sm">Esci</button>
          </form>
        </div>
        <header className="mt-10">
          <p className="portal-eyebrow">Area riservata</p>
          <h1 className="mt-3 text-4xl font-black">Console docenti</h1>
          <p className="portal-muted mt-3 max-w-2xl leading-7">Materiali riservati, programmazione didattica per competenze e criteri di valutazione.</p>
        </header>
        
        {teacherNotes.guides && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold">Guide per l&apos;insegnante e programmazione</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {teacherNotes.guides.map((guide) => (
                <article key={guide.title} className="portal-card flex flex-col justify-between p-6">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--blue)]">{guide.title}</h3>
                    <p className="portal-muted mt-2 text-sm leading-6">{guide.description}</p>
                  </div>
                  <div className="mt-5">
                    <a
                      href={guide.href}
                      target="_blank"
                      rel="noreferrer"
                      className="portal-button text-sm"
                    >
                      Scarica Guida Ufficiale (PDF)
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="portal-card p-6">
            <h2 className="text-xl font-bold">Valutazione</h2>
            <p className="portal-muted mt-3 leading-7">{teacherNotes.assessment}</p>
            <p className="mt-4 text-sm font-bold text-[var(--blue)]">{teacherNotes.rubric.join(" · ")}</p>
          </article>
          <article className="portal-card p-6">
            <h2 className="text-xl font-bold">Strategie DSA</h2>
            <dl className="portal-muted mt-4 space-y-4 text-sm leading-6">
              {Object.entries(teacherNotes.dsaStrategies).map(([key, value]) => (
                <div key={key}>
                  <dt className="font-bold capitalize text-[var(--blue)]">{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </section>
        <p className="teacher-note mt-6 p-4 text-sm leading-6">{teacherNotes.note}</p>
      </div>
    </main>
  );
}

