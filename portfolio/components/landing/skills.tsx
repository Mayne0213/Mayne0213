'use client';

import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Code, Server, Cloud, Database, Activity, GitBranch, Shield, TestTube, Container, LucideIcon } from 'lucide-react';
import SectionHeader from './section-header';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { skillData } from '@/lib/skill-data';

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  skills: string[];
}

function SkillCard({ icon: Icon, title, description, skills }: SkillCardProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <Card className="p-4 smalltablet:p-5 w-full h-full gap-3 smalltablet:gap-4 relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
      <div className="flex flex-col gap-3 smalltablet:gap-4">
        <div className="flex items-center justify-center min-w-10 min-h-10 smalltablet:min-w-12 smalltablet:min-h-12 rounded-full bg-muted w-fit">
          <Icon className="min-w-6 min-h-6 smalltablet:min-w-8 smalltablet:min-h-8" />
        </div>
        <CardTitle>
          <h3 className="text-base smalltablet:text-lg">{title}</h3>
        </CardTitle>
      </div>

      <div className="flex flex-col gap-4 smalltablet:gap-6 justify-between h-full">
        <p className="text-sm smalltablet:text-base font-extralight">{description}</p>
        <div className="flex flex-col gap-3 smalltablet:gap-4">
          <Separator />
          <div className="flex gap-2 smalltablet:gap-3 flex-wrap">
            {skills.map((skill) => {
              const data = skillData[skill];
              const SkillIcon = data?.icon;
              const iconColor = isDark && data?.darkColor ? data.darkColor : data?.color;
              return (
                <span key={skill} className="flex items-center gap-1 text-xs smalltablet:text-sm font-medium text-gray-800 dark:text-gray-100">
                  {SkillIcon && <SkillIcon className="w-3.5 h-3.5 smalltablet:w-4 smalltablet:h-4" style={{ color: iconColor }} />}
                  {skill}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Skills() {
  const t = useTranslations('skills');

  return (
    <main className="flex max-w-7xl mx-auto flex-col items-center justify-center gap-12 smalltablet:gap-14 tablet:gap-16 p-4 smalltablet:p-6 tablet:p-8 py-16 smalltablet:py-18 tablet:py-20">
      <div className="flex flex-col items-center gap-5">
        <SectionHeader title={t('title')} />
        <div className="w-16 h-1 rounded-full bg-linear-to-r from-primary/80 to-primary/40" />
      </div>

      <div className="grid grid-cols-1 smalltablet:grid-cols-2 desktop:grid-cols-3 gap-4 smalltablet:gap-5 tablet:gap-6">
        <SkillCard
          icon={Server}
          title={t('backendApis.title')}
          description={t('backendApis.description')}
          skills={['Spring', 'NestJS', 'Node.js', 'FastAPI', 'Prisma', 'LangGraph']}
        />
        <SkillCard
          icon={Container}
          title={t('infra.title')}
          description={t('infra.description')}
          skills={['Kubernetes', 'Docker', 'HAProxy', 'Nginx', 'Longhorn']}
        />
        <SkillCard
          icon={Database}
          title={t('dataMessaging.title')}
          description={t('dataMessaging.description')}
          skills={['Redis', 'Kafka', 'PostgreSQL', 'MongoDB', 'MinIO']}
        />
        <SkillCard
          icon={Cloud}
          title={t('cloud.title')}
          description={t('cloud.description')}
          skills={['AWS', 'EC2', 'RDS', 'S3', 'Lightsail', 'CloudFlare', 'Oracle Cloud', 'Vercel']}
        />
        <SkillCard
          icon={Activity}
          title={t('observability.title')}
          description={t('observability.description')}
          skills={['Grafana', 'OpenTelemetry', 'Thanos', 'Loki', 'Tempo']}
        />
        <SkillCard
          icon={GitBranch}
          title={t('cicd.title')}
          description={t('cicd.description')}
          skills={['ArgoCD', 'GitHub Actions', 'Tekton', 'Kaniko']}
        />
        <SkillCard
          icon={Code}
          title={t('frontend.title')}
          description={t('frontend.description')}
          skills={['React', 'Next.js', 'TypeScript', 'HTML', 'CSS', 'Tailwind', 'Zustand']}
        />
        <SkillCard
          icon={TestTube}
          title={t('test.title')}
          description={t('test.description')}
          skills={['Jest', 'Vitest', 'Cypress']}
        />
        <SkillCard
          icon={Shield}
          title={t('security.title')}
          description={t('security.description')}
          skills={['Vault', 'Authelia', 'Falco', 'Trivy', 'Kyverno']}
        />
      </div>
    </main>
  );
}
