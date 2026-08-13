import CertificateList from '@/components/portfolio/certificate-list';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

const toolGroups = [
  [
    { label: 'Spring Boot', icon: 'springboot' },
    { label: 'FastAPI', icon: 'fastapi' },
    { label: 'Node.js', icon: 'nodedotjs' },
  ],
  [
    { label: 'PostgreSQL', icon: 'postgresql' },
    { label: 'Redis', icon: 'redis' },
    { label: 'RabbitMQ', icon: 'rabbitmq' },
  ],
  [
    { label: 'Docker', icon: 'docker' },
    { label: 'Kubernetes', icon: 'kubernetes' },
  ],
  [
    { label: 'Argo CD', icon: 'argocd' },
    { label: 'Git', icon: 'git' },
  ],
  [
    { label: 'OpenTelemetry', icon: 'opentelemetry' },
    { label: 'Prometheus', icon: 'prometheus' },
    { label: 'Grafana', icon: 'grafana' },
  ],
  [
    { label: 'Next.js', icon: 'nextdotjs' },
    { label: 'React', icon: 'react' },
  ],
] as const;

const copy = {
  ko: {
    education: 'EDUCATION',
    activities: 'LEADERSHIP & ACTIVITIES',
    certificates: 'CERTIFICATES',
    skills: 'TOOLS & TECHNOLOGIES',
    educationList: [
      { period: '2020.03 — 2027.02', title: '연세대학교', body: '중어중문학과 주전공 · 컴퓨터과학과 복수전공' },
    ],
    activityList: [
      { period: '2025.09 — PRESENT', title: 'PoolC / 웹앱부서 운영진', body: '연세대학교 컴퓨터과학과 동아리 PoolC 소속\n웹앱부서 운영진 · 2026.01 — 2026.08', href: 'https://poolc.org' },
      { period: '2026.03 — 2026.08', title: "IT's Time / 백엔드 부원", body: '개발연합동아리 IT\'s Time 09기 소속', href: 'https://www.instagram.com/its_stime_/' },
      { period: '2026.03 — 2026.12', title: "연세대학교 / 'SW프로그래밍' 조교", body: '파이썬 교양 SW프로그래밍 조교' },
      { period: '2025.09 — 2025.12', title: '제자들교회 웹서비스 / 외주 개발', body: '개발부터 배포·운영·고객 대응까지 전반을 담당', href: 'https://www.disciples-church.com' },
    ],
    certificateList: [
      { label: 'Certified Kubernetes Administrator (CKA)', credentialPath: '/certificates/cka-placeholder.svg' },
      { label: 'OPIc / AL', credentialPath: '/certificates/opic-al-placeholder.svg' },
      { label: 'Goethe-Zertifikat / B2', credentialPath: '/certificates/goethe-b2-placeholder.svg' },
      { label: '정보처리기사', credentialPath: '/certificates/engineer-information-processing-placeholder.svg' },
    ],
    skillList: toolGroups,
  },
  en: {
    education: 'EDUCATION',
    activities: 'LEADERSHIP & ACTIVITIES',
    certificates: 'CERTIFICATES',
    skills: 'TOOLS & TECHNOLOGIES',
    educationList: [
      { period: '2020.03 — 2027.02', title: 'YONSEI UNIVERSITY', body: 'Chinese Language & Literature / Computer Science, Double Major' },
    ],
    activityList: [
      { period: '20XX — 20XX', title: 'POOLC / WEB DIVISION LEAD', body: 'Led the web division’s development activities and operations.' },
    ],
    certificateList: [
      { label: 'Certified Kubernetes Administrator (CKA)', credentialPath: '/certificates/cka-placeholder.svg' },
      { label: 'OPIc / AL', credentialPath: '/certificates/opic-al-placeholder.svg' },
      { label: 'Goethe-Zertifikat / B2', credentialPath: '/certificates/goethe-b2-placeholder.svg' },
      { label: 'Engineer Information Processing', credentialPath: '/certificates/engineer-information-processing-placeholder.svg' },
    ],
    skillList: toolGroups,
  },
  de: {
    education: 'AUSBILDUNG',
    activities: 'LEITUNG & AKTIVITÄTEN',
    certificates: 'ZERTIFIKATE',
    skills: 'TOOLS & TECHNOLOGIEN',
    educationList: [
      { period: '2020.03 — 2027.02', title: 'YONSEI UNIVERSITY', body: 'Chinesische Sprache und Literatur / Informatik, Doppelstudium' },
    ],
    activityList: [
      { period: '20XX — 20XX', title: 'POOLC / WEB DIVISION LEAD', body: 'Leitete Entwicklungsaktivitäten und Betrieb der Web-Abteilung.' },
    ],
    certificateList: [
      { label: 'Certified Kubernetes Administrator (CKA)', credentialPath: '/certificates/cka-placeholder.svg' },
      { label: 'OPIc / AL', credentialPath: '/certificates/opic-al-placeholder.svg' },
      { label: 'Goethe-Zertifikat / B2', credentialPath: '/certificates/goethe-b2-placeholder.svg' },
      { label: 'Engineer Information Processing', credentialPath: '/certificates/engineer-information-processing-placeholder.svg' },
    ],
    skillList: toolGroups,
  },
} as const;

function ResumeEntries({ entries }: { entries: readonly { period: string; title: string; body: string; href?: string }[] }) {
  return (
    <div className="border-t editorial-rule">
      {entries.map((entry) => (
        <article key={`${entry.period}-${entry.title}`} className="grid gap-3 border-b editorial-rule py-5 smalltablet:grid-cols-[150px_1fr] smalltablet:gap-6">
          <p className="text-[12px] leading-5 tracking-[0.08em] text-[#6b6b65]">{entry.period}</p>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-[16px] font-medium leading-6">{entry.title}</h3>
              {entry.href && (
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${entry.title} 외부 링크 열기`}
                  className="inline-flex text-[#6b6b65] transition-colors hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.5]" aria-hidden="true" />
                </a>
              )}
            </div>
            <p className="mt-1 max-w-[500px] whitespace-pre-line text-[15px] leading-6 text-[#555550]">{entry.body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function TechnologyList({ groups }: { groups: readonly (readonly { label: string; icon: string }[])[] }) {
  return (
    <ul className="border-t editorial-rule text-[15px] leading-6">
      {groups.map((group) => (
        <li key={group.map((tool) => tool.label).join('-')} className="flex flex-wrap gap-x-4 gap-y-2 border-b editorial-rule py-2">
          {group.map((tool) => (
            <span key={tool.label} className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <Image src={`/icons/tech/${tool.icon}.png`} alt="" width={15} height={15} className="h-[15px] w-[15px] object-contain" />
              {tool.label}
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}

export default async function ResumePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();

  setRequestLocale(locale);
  const content = copy[locale as keyof typeof copy];

  return (
    <main className="portfolio-shell pb-20 pt-16">
      <section className="grid gap-12 smalltablet:grid-cols-[7fr_3fr] smalltablet:gap-12">
        <div>
          <h2 className="mb-5 text-[16px] font-medium leading-6">{content.education}</h2>
          <ResumeEntries entries={content.educationList} />

          <h2 className="mb-5 mt-16 text-[16px] font-medium leading-6">{content.activities}</h2>
          <ResumeEntries entries={content.activityList} />
        </div>

        <aside className="smalltablet:pt-[2px]">
          <h2 className="mb-5 text-[16px] font-medium leading-6">{content.certificates}</h2>
          <CertificateList certificates={content.certificateList} />

          <h2 className="mb-5 mt-16 text-[16px] font-medium leading-6">{content.skills}</h2>
          <TechnologyList groups={content.skillList} />
        </aside>
      </section>
    </main>
  );
}
