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

const sectionHeadingClass = 'mb-4 text-[20px] font-medium leading-7';
const laterSectionHeadingClass = 'mb-4 mt-20 text-[20px] font-medium leading-7';

const copy = {
  ko: {
    education: '학력',
    activities: '활동 및 리더십',
    certificates: '자격증',
    skills: '기술 스택',
    externalLinkLabel: '외부 링크 열기',
    certificateModal: { open: '자격증 열기', label: '자격증', close: '닫기' },
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
      { label: 'Certified Kubernetes Administrator (CKA)', credentialPath: '/certificates/cka-cropped.png', width: 846, height: 654 },
      { label: 'OPIc / AL', credentialPath: '/certificates/opic.png', width: 572, height: 348 },
      { label: 'Goethe-Zertifikat / B1', credentialPath: '/certificates/goethe-b1.png', width: 800, height: 1131 },
      { label: '정보처리기사', credentialPath: '/certificates/engineer-information-processing.jpeg', width: 386, height: 518 },
    ],
    skillList: toolGroups,
  },
  en: {
    education: 'EDUCATION',
    activities: 'LEADERSHIP & ACTIVITIES',
    certificates: 'CERTIFICATES',
    skills: 'TOOLS & TECHNOLOGIES',
    externalLinkLabel: 'Open external link',
    certificateModal: { open: 'Open credential', label: 'credential', close: 'Close' },
    educationList: [
      { period: '2020.03 — 2027.02', title: 'YONSEI UNIVERSITY', body: 'Major in Chinese Language & Literature · Second Major in Computer Science' },
    ],
    activityList: [
      { period: '2025.09 — PRESENT', title: 'PoolC / Web App Division Executive Member', body: 'Member of PoolC, the Yonsei University Computer Science student club\nWeb App Division executive member · 2026.01 — 2026.08', href: 'https://poolc.org' },
      { period: '2026.03 — 2026.08', title: "IT's Time / Backend Member", body: "Member of the 9th cohort of IT's Time, an inter-university developer community", href: 'https://www.instagram.com/its_stime_/' },
      { period: '2026.03 — 2026.12', title: "Yonsei University / Teaching Assistant, 'SW Programming'", body: "Teaching assistant for the Python general-education course, 'SW Programming'" },
      { period: '2025.09 — 2025.12', title: 'Disciples Church Web Service / Contract Development', body: 'Led end-to-end development, deployment, operations, and customer support', href: 'https://www.disciples-church.com' },
    ],
    certificateList: [
      { label: 'Certified Kubernetes Administrator (CKA)', credentialPath: '/certificates/cka-cropped.png', width: 846, height: 654 },
      { label: 'OPIc / AL', credentialPath: '/certificates/opic.png', width: 572, height: 348 },
      { label: 'Goethe-Zertifikat / B1', credentialPath: '/certificates/goethe-b1.png', width: 800, height: 1131 },
      { label: 'Engineer Information Processing', credentialPath: '/certificates/engineer-information-processing.jpeg', width: 386, height: 518 },
    ],
    skillList: toolGroups,
  },
  de: {
    education: 'AUSBILDUNG',
    activities: 'ENGAGEMENT & LEITUNG',
    certificates: 'ZERTIFIKATE',
    skills: 'TOOLS & TECHNOLOGIEN',
    externalLinkLabel: 'Externen Link öffnen',
    certificateModal: { open: 'Zertifikat öffnen', label: 'Zertifikat', close: 'Schließen' },
    educationList: [
      { period: '2020.03 — 2027.02', title: 'YONSEI UNIVERSITY', body: 'Hauptfach Chinesische Sprache und Literatur · Zweitfach Informatik' },
    ],
    activityList: [
      { period: '2025.09 — HEUTE', title: 'PoolC / Leitungsteam der Web-App-Abteilung', body: 'Mitglied von PoolC, einer Studierendeninitiative der Informatik an der Yonsei University\nLeitungsteam der Web-App-Abteilung · 2026.01 — 2026.08', href: 'https://poolc.org' },
      { period: '2026.03 — 2026.08', title: "IT's Time / Backend-Mitglied", body: "Mitglied des 9. Jahrgangs von IT's Time, einer hochschulübergreifenden Entwicklergemeinschaft", href: 'https://www.instagram.com/its_stime_/' },
      { period: '2026.03 — 2026.12', title: "Yonsei University / Tutor für 'SW-Programmierung'", body: "Tutor für den Python-Grundlagenkurs 'SW-Programmierung'" },
      { period: '2025.09 — 2025.12', title: 'Disciples Church Web Service / Auftragsentwicklung', body: 'Verantwortlich für Entwicklung, Deployment, Betrieb und Kundensupport', href: 'https://www.disciples-church.com' },
    ],
    certificateList: [
      { label: 'Certified Kubernetes Administrator (CKA)', credentialPath: '/certificates/cka-cropped.png', width: 846, height: 654 },
      { label: 'OPIc / AL', credentialPath: '/certificates/opic.png', width: 572, height: 348 },
      { label: 'Goethe-Zertifikat / B1', credentialPath: '/certificates/goethe-b1.png', width: 800, height: 1131 },
      { label: 'Ingenieur für Informationsverarbeitung', credentialPath: '/certificates/engineer-information-processing.jpeg', width: 386, height: 518 },
    ],
    skillList: toolGroups,
  },
} as const;

function ResumeEntries({ entries, externalLinkLabel }: { entries: readonly { period: string; title: string; body: string; href?: string }[]; externalLinkLabel: string }) {
  return (
    <div className="border-t editorial-rule">
      {entries.map((entry) => (
        <article key={`${entry.period}-${entry.title}`} className="grid gap-3 border-b editorial-rule py-5 smalltablet:grid-cols-[150px_1fr] smalltablet:gap-6">
          <p className="text-[12px] leading-5 tracking-[0.08em] text-[#6b6b65]">{entry.period}</p>
          {entry.href ? (
            <a
              href={entry.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${entry.title} ${externalLinkLabel}`}
              className="group block max-w-[500px] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-black"
            >
              <div className="flex items-center gap-1.5">
                <h3 className="text-[16px] font-medium leading-6">{entry.title}</h3>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#6b6b65] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
              <p className="mt-1 whitespace-pre-line text-[15px] leading-6 text-[#555550] transition-colors group-hover:text-[#11110f]">{entry.body}</p>
            </a>
          ) : (
            <div>
              <h3 className="text-[16px] font-medium leading-6">{entry.title}</h3>
              <p className="mt-1 max-w-[500px] whitespace-pre-line text-[15px] leading-6 text-[#555550]">{entry.body}</p>
            </div>
          )}
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
        <div className="portfolio-reveal">
          <h2 className={sectionHeadingClass}>{content.education}</h2>
          <ResumeEntries entries={content.educationList} externalLinkLabel={content.externalLinkLabel} />

          <h2 className={laterSectionHeadingClass}>{content.activities}</h2>
          <ResumeEntries entries={content.activityList} externalLinkLabel={content.externalLinkLabel} />
        </div>

        <aside className="portfolio-reveal smalltablet:pt-[2px]">
          <h2 className={sectionHeadingClass}>{content.certificates}</h2>
          <CertificateList certificates={content.certificateList} labels={content.certificateModal} />

          <h2 className={laterSectionHeadingClass}>{content.skills}</h2>
          <TechnologyList groups={content.skillList} />
        </aside>
      </section>
    </main>
  );
}
