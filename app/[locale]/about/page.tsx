import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

const copy = {
  ko: {
    title: '안녕하세요, 김민조입니다. 🧑‍💻',
    intro: '서비스가 성장해도 신뢰할 수 있는 백엔드 시스템을 설계하고 구현합니다.',
    portraitAlt: '피아노를 연주하는 김민조',
    about: 'A LITTLE ABOUT ME',
    paragraphs: [
      '저는 복잡한 시스템을 더 많은 기술로 해결하기보다, 먼저 문제의 경계와 실패 조건을 명확히 하는 편입니다. 서비스 수가 아니라 데이터 경계와 운영 비용을 기준으로 구조를 판단하고, 필요할 때는 더 단순한 구조로 되돌리는 선택도 중요하다고 생각합니다.',
      '요청 처리뿐 아니라 비동기 작업과 운영 환경까지 고려해 데이터가 안전하게 흐르는 경계를 설계하려 합니다. 애플리케이션의 조건문에만 의존하기보다, 실수가 발생해도 안전하게 실패하는 구조를 지향합니다.',
      '성능을 개선할 때도 속도만 보지 않습니다. 먼저 실제 병목과 결과의 정확성을 확인한 뒤, 불필요한 작업과 자원 경합을 줄이는 방식으로 접근합니다.',
    ],
    projects: 'PROJECT EXPERIENCE',
    projectList: ['Lumie', 'OLma', '효자손', '제자들교회'],
    services: 'FOCUS AREAS',
    serviceList: ['Tenant Isolation & RLS', 'Idempotent Async Workflows', 'Accuracy-Preserving Optimization', 'Queue Reliability & Observability'],
  },
  en: {
    title: "I'm Minjo. Nice to meet you.",
    intro: 'I design and build backend systems that remain dependable as a product grows.',
    portraitAlt: 'Minjo Kim playing the piano',
    about: 'ABOUT',
    paragraphs: [
      'I am a backend developer interested in turning complex requirements into clear domain boundaries and reliable data flows. I connect APIs, asynchronous processing, and deployment environments to build services people can trust.',
      'Across team and personal projects, I am learning to consider data consistency, failure handling, and observability alongside feature delivery. I care about structures that remain accountable when a service reaches real operation.',
      'My current work centers on Java and Spring Boot, with multi-tenant systems and asynchronous workflows. Through projects including Lumie, I document how I observe, design, and verify problems while building better systems.',
    ],
    projects: 'PROJECT EXPERIENCE',
    projectList: ['Lumie', 'OLma', 'Hyojason', 'Jaejadle Church'],
    services: 'FOCUS AREAS',
    serviceList: ['Tenant Isolation & RLS', 'Idempotent Async Workflows', 'Accuracy-Preserving Optimization', 'Queue Reliability & Observability'],
  },
  de: {
    title: 'Ich bin Minjo. Schön, dass du da bist.',
    intro: 'Ich entwickle Backend-Systeme, die mit einem Produkt zuverlässig wachsen.',
    portraitAlt: 'Minjo Kim am Klavier',
    about: 'ÜBER MICH',
    paragraphs: [
      'Ich übersetze komplexe Anforderungen in klare Domänengrenzen und zuverlässige Datenflüsse. Dabei verbinde ich APIs, asynchrone Verarbeitung und Deployment-Umgebungen zu vertrauenswürdigen Services.',
      'In Team- und persönlichen Projekten lerne ich, Datenkonsistenz, Fehlerbehandlung und Observability neben der Funktionsentwicklung mitzudenken. Mich interessieren Strukturen, die auch im Betrieb Verantwortung übernehmen.',
      'Mein Schwerpunkt liegt auf Java und Spring Boot, Multi-Tenant-Systemen und asynchronen Workflows. In Projekten wie Lumie dokumentiere ich, wie ich Probleme beobachte, entwerfe und überprüfe.',
    ],
    projects: 'PROJEKTERFAHRUNG',
    projectList: ['Lumie', 'OLma', 'Hyojason', 'Jaejadle Church'],
    services: 'SCHWERPUNKTE',
    serviceList: ['Mandantenisolation & RLS', 'Idempotente asynchrone Workflows', 'Optimierung mit Ergebnisgarantie', 'Queue-Zuverlässigkeit & Observability'],
  },
} as const;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();

  setRequestLocale(locale);
  const content = copy[locale as keyof typeof copy];

  return (
    <main className="portfolio-shell pb-0 pt-16">
      <section className="grid smalltablet:grid-cols-[calc(70%_-_1.6px)_calc(30%_+_1.6px)]">
        <div className="max-w-[620px] self-center py-10 smalltablet:flex smalltablet:h-[343px] smalltablet:flex-col smalltablet:justify-center smalltablet:py-0">
          <h1 className="editorial-display text-[32px] leading-10 tracking-normal">{content.title}</h1>
          <p className="editorial-display mt-6 text-[32px] leading-10 tracking-normal">{content.intro}</p>
        </div>
        <div className="mt-8 smalltablet:mt-0 smalltablet:h-[423px]">
          <div className="relative aspect-square w-full overflow-hidden rounded-[8px] smalltablet:mt-10 smalltablet:w-[calc(100%-4px)] smalltablet:justify-self-end">
            <Image
              src="/images/about-portrait-retouched.png"
              alt={content.portraitAlt}
              fill
              sizes="(min-width: 640px) 30vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mt-0 grid gap-10 smalltablet:grid-cols-[calc(70%_-_1.6px)_calc(30%_+_1.6px)] smalltablet:gap-0">
        <div className="max-w-[620px]">
          <p className="text-[14px] leading-6">{content.about}</p>
          <div className="mt-4 space-y-4 text-[15px] leading-6 text-[#3d3d39]">
            {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        <div className="w-full text-[15px] leading-6 smalltablet:w-[calc(100%-4px)] smalltablet:justify-self-end">
          <p className="text-[16px] font-medium leading-6">{content.projects}</p>
          <ul className="mt-0 list-none p-0">
            {content.projectList.map((project) => <li key={project}>{project}</li>)}
          </ul>
          <p className="mt-10 text-[16px] font-medium leading-6">{content.services}</p>
          <ul className="mt-0 list-none p-0">
            {content.serviceList.map((service) => <li key={service}>{service}</li>)}
          </ul>
        </div>
      </section>
    </main>
  );
}
