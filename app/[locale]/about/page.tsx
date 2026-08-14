import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

const copy = {
  ko: {
    title: '안녕하세요, 김민조입니다. 🧑‍💻',
    intro: '언어와 컴퓨터과학을 함께 공부하며, 현장의 불편을 신뢰할 수 있는 백엔드로 바꿉니다.',
    portraitAlt: '피아노를 연주하는 김민조',
    about: 'A LITTLE ABOUT ME',
    contact: '연락처',
    paragraphs: [
      '중어중문학을 전공하고 컴퓨터과학을 복수전공하고 있습니다. 언어와 문화를 공부하며 사람마다 같은 문제를 다르게 만난다는 점에 관심이 많았고, 반복되는 일을 시스템으로 정리해 누군가의 불편을 줄이는 과정에서 개발의 매력을 느꼈습니다.',
      '교육 현장에서 일하며 선생님이 반복해서 겪는 불편을 가까이서 보았고, 이를 해결하는 서비스를 직접 만들기 시작했습니다. 기능을 구현하는 데서 끝내지 않고, 사용자가 늘어난 뒤에도 안정적으로 운영할 수 있는 구조인지까지 생각하게 된 계기였습니다.',
      '저는 복잡한 문제를 더 많은 기술로 덮기보다, 먼저 문제의 경계와 실패 조건을 명확히 하는 편입니다. 요청 처리뿐 아니라 비동기 작업과 운영 환경까지 함께 살피고, 실수가 발생해도 안전하게 실패하는 구조를 설계하려 합니다.',
      '성능을 개선할 때도 속도만 보지 않습니다. 실제 병목과 결과의 정확성을 확인한 뒤, 불필요한 작업과 자원 경합을 줄이는 방식으로 접근합니다. 필요할 때는 더 단순한 구조로 되돌리는 선택도 중요하다고 생각합니다.',
    ],
  },
  en: {
    title: "Hello, I'm Minjo. 🧑‍💻",
    intro: 'With a background in language and computer science, I turn real-world friction into backend systems people can rely on.',
    portraitAlt: 'Minjo Kim playing the piano',
    about: 'A LITTLE ABOUT ME',
    contact: 'CONTACT',
    paragraphs: [
      'I major in Chinese Language and Literature and am pursuing a second major in Computer Science. Studying language and culture made me attentive to the ways people encounter the same problem differently. I was drawn to development by the work of organizing repeated tasks into systems and removing small frictions from someone’s day.',
      'While working in education, I saw the recurring friction teachers faced up close and began building services to address it. That experience taught me to look beyond implementation and ask whether a system can be operated reliably as its users grow.',
      'I tend not to cover complex problems with more technology. I begin by defining the boundary of the problem and its failure conditions. I consider asynchronous jobs and operating environments alongside request handling, aiming for systems that fail safely even when mistakes happen.',
      'When improving performance, I do not look at speed alone. I first verify the real bottleneck and the correctness of the result, then reduce unnecessary work and resource contention. I also believe that choosing a simpler structure, when appropriate, is important.',
    ],
  },
  de: {
    title: 'Hallo, ich bin Minjo. 🧑‍💻',
    intro: 'Ich verbinde Sprachwissenschaft und Informatik und verwandle Reibungen im Arbeitsalltag in verlässliche Backend-Systeme.',
    portraitAlt: 'Minjo Kim am Klavier',
    about: 'EIN WENIG ÜBER MICH',
    contact: 'KONTAKT',
    paragraphs: [
      'Ich studiere chinesische Sprache und Literatur im Hauptfach und Informatik im Zweitfach. Das Studium von Sprache und Kultur hat mich dafür sensibilisiert, dass Menschen demselben Problem auf unterschiedliche Weise begegnen. An der Entwicklung fasziniert mich, wiederkehrende Aufgaben in Systeme zu überführen und so konkrete Reibungen im Alltag zu verringern.',
      'Bei meiner Arbeit im Bildungsbereich habe ich die wiederkehrenden Schwierigkeiten von Lehrkräften aus nächster Nähe erlebt und begonnen, dafür eigene Services zu entwickeln. Dabei habe ich gelernt, nicht bei der Umsetzung einer Funktion stehen zu bleiben, sondern auch zu fragen, ob sich ein System mit wachsender Nutzung zuverlässig betreiben lässt.',
      'Komplexe Probleme versuche ich nicht mit noch mehr Technologie zu überdecken. Zuerst kläre ich die Grenzen des Problems und die Bedingungen, unter denen etwas fehlschlägt. Neben der Anfrageverarbeitung berücksichtige ich auch asynchrone Aufgaben und die Betriebsumgebung, um Systeme zu entwerfen, die auch bei Fehlern sicher scheitern.',
      'Bei Performance-Verbesserungen betrachte ich nicht nur Geschwindigkeit. Zuerst prüfe ich den tatsächlichen Engpass und die Korrektheit des Ergebnisses, danach reduziere ich unnötige Arbeit und Ressourcenkonkurrenz. Wenn es sinnvoll ist, halte ich auch den Schritt zurück zu einer einfacheren Struktur für wichtig.',
    ],
  },
} as const;

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();

  setRequestLocale(locale);
  const content = copy[locale as keyof typeof copy];

  return (
    <main className="portfolio-shell pb-0 pt-16">
      <section className="grid items-start tablet:grid-cols-[minmax(0,_66fr)_minmax(0,_34fr)] tablet:gap-x-[clamp(32px,4vw,72px)]">
        <div className="contents tablet:block">
          <div className="portfolio-reveal order-1 max-w-[720px] self-center py-10 tablet:flex tablet:h-[343px] tablet:flex-col tablet:justify-center tablet:py-0">
            <h1 className="editorial-display text-[clamp(26px,2.5vw,32px)] leading-[1.25] tracking-normal">{content.title}</h1>
            <p className="editorial-display mt-[clamp(18px,1.9vw,24px)] text-[clamp(26px,2.5vw,32px)] leading-[1.25] tracking-normal">{content.intro}</p>
          </div>
          <div className="portfolio-reveal order-3 mt-10 max-w-[720px] tablet:-mt-8">
            <p className="text-[clamp(13px,1.1vw,14px)] leading-[1.65]">{content.about}</p>
            <div className="mt-[clamp(12px,1.25vw,16px)] space-y-[clamp(14px,1.25vw,16px)] text-[clamp(14px,1.17vw,15px)] leading-[1.65] text-[#3d3d39]">
              {content.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>

        <div className="contents tablet:block">
          <div className="portfolio-reveal order-2 mt-8 tablet:mt-0 tablet:pt-10">
            <div className="relative aspect-square w-full max-w-[560px] overflow-hidden rounded-[8px] tablet:max-w-none tablet:w-[calc(100%-4px)] tablet:justify-self-end">
              <Image
                src="/images/about-portrait-retouched.png"
                alt={content.portraitAlt}
                fill
                sizes="(min-width: 900px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="portfolio-reveal order-4 mt-6 w-full text-[clamp(14px,1.17vw,15px)] leading-[1.6] tablet:mt-0 tablet:w-[calc(100%-4px)] tablet:justify-self-end tablet:pt-6">
            <p className="text-[clamp(15px,1.25vw,16px)] font-medium leading-[1.5]">{content.contact}</p>
            <ul className="mt-0 list-none p-0">
              <li>
                <a href="mailto:bluemayne0213@icloud.com" className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#6b6b65]">
                  bluemayne0213@icloud.com <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="https://github.com/Mayne0213" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#6b6b65]">
                  github.com/Mayne0213 <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
