import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

const copy = {
  ko: {
    title: '새로운 서비스를\n함께 만들까요?',
    body: '프로젝트의 목표와 필요한 지원 범위,\n일정과 예산을 알려주세요.\n확인 후 답변드리겠습니다.',
    services: 'FOCUS AREAS',
    serviceList: ['Backend Architecture', 'API & Domain Modeling', 'Data Consistency', 'Asynchronous Processing', 'Observability', 'Deployment'],
    fields: { name: '이름', email: '이메일', scope: '프로젝트 개요', timeline: '예상 일정', budget: '예산 범위', submit: '보내기' },
  },
  en: {
    title: "Have a service you'd like to build?\nLet's talk.",
    body: 'Tell me about your goal, scope, timeline, and budget. I will get back to you after reviewing the details.',
    services: 'FOCUS AREAS',
    serviceList: ['Backend Architecture', 'API & Domain Modeling', 'Data Consistency', 'Asynchronous Processing', 'Observability', 'Deployment'],
    fields: { name: 'Name', email: 'Email', scope: 'Scope', timeline: 'Timeline', budget: 'Budget', submit: 'Submit' },
  },
  de: {
    title: 'Möchtest du einen Service entwickeln?\nLass uns sprechen.',
    body: 'Erzähl mir von Ziel, Umfang, Zeitplan und Budget. Ich melde mich nach der Durchsicht der Details.',
    services: 'SCHWERPUNKTE',
    serviceList: ['Backend-Architektur', 'API & Domänenmodellierung', 'Datenkonsistenz', 'Asynchrone Verarbeitung', 'Observability', 'Deployment'],
    fields: { name: 'Name', email: 'E-Mail', scope: 'Umfang', timeline: 'Zeitplan', budget: 'Budget', submit: 'Senden' },
  },
} as const;

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-[14px] leading-[14px]">{children} *</label>;
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();

  setRequestLocale(locale);
  const content = copy[locale as keyof typeof copy];
  const field = content.fields;

  return (
    <main className="portfolio-shell pb-0 pt-16">
      <section className="grid smalltablet:grid-cols-[7fr_13fr]">
        <div className="max-w-[300px] py-20">
          <h1 className="editorial-display whitespace-pre-line text-[32px] leading-10 tracking-normal">{content.title}</h1>
          <p className="mt-0 whitespace-pre-line text-[15px] leading-6">{content.body}</p>
          <p className="mt-14 text-[14px] leading-6">{content.services}</p>
          <ul className="mt-0 list-none p-0 text-[15px] leading-6">
            {content.serviceList.map((service) => <li key={service}>{service}</li>)}
          </ul>
        </div>

        <form action="mailto:bluemayne0213@icloud.com" method="post" encType="text/plain" className="w-full max-w-[560px] self-start smalltablet:justify-self-end smalltablet:pt-[90px]">
          <div className="mb-8">
            <FieldLabel>{field.name}</FieldLabel>
            <input className="contact-form-control mt-2" name="name" required />
          </div>
          <div className="mb-8">
            <FieldLabel>{field.email}</FieldLabel>
            <input className="contact-form-control mt-2" name="email" type="email" required />
          </div>
          <div className="mb-8">
            <FieldLabel>{field.scope}</FieldLabel>
            <textarea className="contact-form-control mt-2" name="scope" required />
          </div>
          <div className="mb-8">
            <FieldLabel>{field.timeline}</FieldLabel>
            <input className="contact-form-control mt-2" name="timeline" required />
          </div>
          <div>
            <FieldLabel>{field.budget}</FieldLabel>
            <input className="contact-form-control mt-2" name="budget" required />
          </div>
          <button type="submit" className="mt-8 inline-flex h-12 items-center rounded-md bg-[#11110f] px-4 text-[16px] font-medium text-white transition-transform hover:-translate-y-0.5">
            {field.submit}
          </button>
        </form>
      </section>
    </main>
  );
}
