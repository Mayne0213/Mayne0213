'use client';

import SectionHeader from '@/components/landing/section-header';
import { User, Calendar, MapPin, Mail, GraduationCap, LucideIcon, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="group relative p-5 smalltablet:p-6 rounded-2xl bg-background/50 dark:bg-background/30 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 smalltablet:w-14 smalltablet:h-14 rounded-xl bg-linear-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-colors duration-300">
          <Icon className="w-5 h-5 smalltablet:w-6 smalltablet:h-6 text-primary" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs smalltablet:text-sm text-muted-foreground uppercase tracking-wider">{label}</span>
          <span className="text-sm smalltablet:text-base font-medium">{value}</span>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const t = useTranslations('about');

  const PERSONAL_INFO = [
    { icon: User, label: t('name'), value: 'MINJO KIM' },
    { icon: Calendar, label: t('birthday'), value: '2000.10.21' },
    { icon: MapPin, label: t('location'), value: 'Seoul, Korea' },
    { icon: Mail, label: t('email'), value: 'bluemayne0213@icloud.com' },
    { icon: Github, label: t('github'), value: 'Mayne0213' },
    { icon: GraduationCap, label: t('education'), value: 'Yonsei University (CS, CLL)' },
  ];

  return (
    <div className="bg-muted/50">
      <main className="flex flex-col items-center justify-center gap-12 smalltablet:gap-14 tablet:gap-16 p-4 smalltablet:p-6 tablet:p-8 py-16 smalltablet:py-20 tablet:py-24">
        <div className="flex flex-col items-center gap-5">
          <SectionHeader
            title={t('title')}
          />
          <div className="w-16 h-1 rounded-full bg-linear-to-r from-primary/80 to-primary/40" />
        </div>

        <section className="grid grid-cols-1 smalltablet:grid-cols-2 tablet:grid-cols-3 gap-4 smalltablet:gap-5 tablet:gap-6 max-w-5xl w-full">
          {PERSONAL_INFO.map((info, index) => (
            <InfoItem
              key={index}
              icon={info.icon}
              label={info.label}
              value={info.value}
            />
          ))}
        </section>
      </main>
    </div>
  );
}
