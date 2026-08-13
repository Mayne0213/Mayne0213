import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { routing } from '@/i18n/routing';
import { getPortfolioProject, PROJECT_IDS, ProjectId } from '@/lib/portfolio-projects';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

const detailArt: Record<ProjectId, { background: string; foreground: string; mark: string }> = {
  lumie: { background: '#ef236a', foreground: '#fffaf6', mark: 'L' },
  olma: { background: '#b7d9d1', foreground: '#173e3c', mark: 'O' },
  hyojason: { background: '#f0c362', foreground: '#222019', mark: 'H' },
  jaejadle: { background: '#c9b7ee', foreground: '#261b43', mark: 'J' },
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => PROJECT_IDS.map((projectId) => ({ locale, projectId })));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; projectId: string }>;
}) {
  const { locale, projectId } = await params;
  const project = getPortfolioProject(locale, projectId);

  if (!routing.locales.includes(locale as (typeof routing.locales)[number]) || !project) {
    notFound();
  }

  setRequestLocale(locale);
  const art = detailArt[project.id];
  const labels = locale === 'ko'
    ? { back: '프로젝트 목록', overview: 'Overview', notes: 'Notes', problem: '문제', decision: '선택', verification: '검증' }
    : locale === 'de'
      ? { back: 'Projektübersicht', overview: 'Overview', notes: 'Notizen', problem: 'Problem', decision: 'Entscheidung', verification: 'Verifikation' }
      : { back: 'All work', overview: 'Overview', notes: 'Notes', problem: 'Problem', decision: 'Decision', verification: 'Verification' };

  return (
    <main className="portfolio-shell pb-20 pt-16 smalltablet:pt-24">
      <Link href={`/${locale}/#work`} className="inline-flex items-center gap-2 text-[13px] text-[#5f5f59] transition-colors hover:text-black">
        <ArrowLeft className="h-4 w-4 stroke-[1.4]" />
        {labels.back}
      </Link>

      <header className="mt-14 smalltablet:mt-20">
        <p className="text-[11px] tracking-[0.12em] text-[#6b6b65]">{project.type === 'personal' ? 'PERSONAL PROJECT' : 'TEAM PROJECT'}</p>
        <h1 className="editorial-display mt-3 text-[clamp(3.6rem,8vw,7rem)] leading-[0.93]">{project.title}</h1>
        <p className="mt-7 max-w-xl text-[15px] leading-7 text-[#555550]">{project.summary}</p>
      </header>

      <div className="project-placeholder mt-14 flex aspect-[16/8] items-end rounded-[7px] p-7 smalltablet:p-10" style={{ background: art.background, color: art.foreground }}>
        <p className="absolute left-7 top-7 text-[10px] tracking-[0.12em] smalltablet:left-10 smalltablet:top-10">PROJECT PLACEHOLDER / REPLACE WITH CASE VISUAL</p>
        <span className="relative z-10 editorial-display text-[clamp(10rem,28vw,22rem)] leading-[0.55] tracking-[-0.12em]">{art.mark}</span>
      </div>

      <section className="mt-16 grid gap-8 border-t editorial-rule pt-7 smalltablet:grid-cols-[180px_1fr]">
        <p className="text-[11px] tracking-[0.12em] text-[#6b6b65]">{labels.overview.toUpperCase()}</p>
        <div>
          <p className="max-w-2xl text-[17px] leading-8">{project.scope}</p>
          <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-[#656560]">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>
      </section>

      <section className="mt-20 border-t editorial-rule pt-7">
        <p className="text-[11px] tracking-[0.12em] text-[#6b6b65]">{labels.notes.toUpperCase()}</p>
        <div className="mt-10">
          {project.caseStudies.map((study, index) => (
            <article key={study.title} className="grid gap-5 border-t editorial-rule py-8 smalltablet:grid-cols-[80px_1fr] smalltablet:gap-8">
              <p className="text-[12px] text-[#6b6b65]">0{index + 1}</p>
              <div>
                <h2 className="editorial-display text-3xl leading-10 smalltablet:text-4xl">{study.title}</h2>
                <div className="mt-7 grid gap-6 text-[14px] leading-6 smalltablet:grid-cols-3">
                  <div><p className="mb-2 text-[11px] tracking-[0.1em] text-[#6b6b65]">{labels.problem.toUpperCase()}</p><p>{study.problem}</p></div>
                  <div><p className="mb-2 text-[11px] tracking-[0.1em] text-[#6b6b65]">{labels.decision.toUpperCase()}</p><p>{study.decision}</p></div>
                  <div><p className="mb-2 text-[11px] tracking-[0.1em] text-[#6b6b65]">{labels.verification.toUpperCase()}</p><p>{study.verification}</p></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <a href="https://github.com/Mayne0213" target="_blank" rel="noreferrer" className="mt-12 inline-flex items-center gap-2 text-[13px] font-medium underline underline-offset-4">
        GitHub <ArrowUpRight className="h-4 w-4 stroke-[1.4]" />
      </a>
    </main>
  );
}
