'use client';

import Link from 'next/link';
import { ArrowDownRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { getPortfolioProject, PROJECT_IDS, ProjectId } from '@/lib/portfolio-projects';

type ProjectArt = {
  background: string;
  foreground: string;
  mark: string;
  label: string;
};

const projectArt: Record<ProjectId, ProjectArt> = {
  lumie: {
    background: '#ef236a',
    foreground: '#fffaf6',
    mark: 'L',
    label: 'EDUCATION SYSTEM',
  },
  olma: {
    background: '#b7d9d1',
    foreground: '#173e3c',
    mark: 'O',
    label: 'WORKFLOW PLATFORM',
  },
  hyojason: {
    background: '#f0c362',
    foreground: '#222019',
    mark: 'H',
    label: 'HEALTH RECORDS',
  },
  jaejadle: {
    background: '#c9b7ee',
    foreground: '#261b43',
    mark: 'J',
    label: 'COMMUNITY SERVICE',
  },
};

function ProjectPlaceholder({ projectId }: { projectId: ProjectId }) {
  const art = projectArt[projectId];

  return (
    <div
      className="project-placeholder flex aspect-[7/5] w-full items-end p-5 smalltablet:p-7"
      style={{ background: art.background, color: art.foreground }}
    >
      <span className="project-hover-overlay" aria-hidden="true" />
      <p className="absolute left-5 top-5 z-10 text-[10px] font-medium tracking-[0.12em] smalltablet:left-7 smalltablet:top-7">{art.label}</p>
      <span className="relative z-10 editorial-display text-[clamp(7rem,20vw,13rem)] leading-[0.62] tracking-[-0.12em]">{art.mark}</span>
      <span className="relative z-10 mb-0 ml-auto text-[10px] tracking-[0.12em]">PLACEHOLDER</span>
    </div>
  );
}

function ProjectLink({ projectId }: { projectId: ProjectId }) {
  const locale = useLocale();
  const project = getPortfolioProject(locale, projectId);

  if (!project) return null;

  return (
    <Link href={`/${locale}/projects/${project.id}/`} className="group block" aria-label={`${project.title} case study`}>
      <div className="overflow-hidden rounded-[7px]">
        <ProjectPlaceholder projectId={projectId} />
      </div>
    </Link>
  );
}

export default function PortfolioHome() {
  const locale = useLocale();
  const intro = locale === 'ko'
    ? '백엔드 시스템을 설계하고,\n복잡한 문제를 끝까지 해결합니다.'
    : locale === 'de'
      ? 'Ich entwerfe Backend-Systeme\nund löse komplexe Probleme.'
      : 'I design backend systems\nand solve complex problems.';

  return (
    <main>
      <section className="portfolio-shell pb-20 pt-24 smalltablet:pb-24 smalltablet:pt-28">
        <h1 className="editorial-display editorial-display-strong max-w-[800px] whitespace-pre-line text-[52px] leading-[70px] tracking-normal">
          {intro}
        </h1>
        <p className="mt-7 text-[16px] leading-8 tracking-normal">✦ Spring Boot backend developer</p>
        <a href="#work" className="mt-6 inline-flex h-12 items-center gap-2 rounded-md bg-[#11110f] px-4 text-[16px] font-medium text-white transition-transform hover:-translate-y-0.5">
          {locale === 'ko' ? '프로젝트 보기' : locale === 'de' ? 'Projekte ansehen' : 'View work'}
          <ArrowDownRight className="h-4 w-4 stroke-[1.5]" />
        </a>
      </section>

      <section id="work" className="portfolio-shell scroll-mt-8">
        <div className="grid grid-cols-1 gap-x-3 gap-y-8 smalltablet:grid-cols-2 smalltablet:gap-y-10">
          {PROJECT_IDS.map((projectId) => <ProjectLink key={projectId} projectId={projectId} />)}
        </div>
      </section>

      <section id="archive" className="portfolio-shell mt-24 border-t editorial-rule pt-8 smalltablet:mt-32">
        <p className="text-[11px] tracking-[0.12em] text-[#6b6b65]">SELECTED WORK / 2024—2026</p>
        <div id="about" className="mt-5 grid gap-5 smalltablet:grid-cols-[1.1fr_1fr]">
          <h2 className="editorial-display text-3xl leading-10 smalltablet:text-4xl">
            Building reliable paths<br />from request to result.
          </h2>
          <p className="max-w-md text-[14px] leading-6 text-[#52524e]">
            Java and Spring Boot are the center of my work. I care about data consistency, asynchronous workflows, and the operational details that make a service dependable.
          </p>
        </div>
      </section>
    </main>
  );
}
