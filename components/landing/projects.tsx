'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Image, { StaticImageData } from 'next/image';
import { Separator } from '../ui/separator';
import { ExternalLink, Star, LayoutGrid, Play, KeyRound } from 'lucide-react';
import SectionHeader from './section-header';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { skillData } from '@/lib/skill-data';
import { SiGithub, SiDocusaurus, SiNotion } from 'react-icons/si';
import joossamHome from '@/public/joossam/home.webp';
import jotionHome from '@/public/jotion/home.webp';
import jaejadleHome from '@/public/jaejadle/home.webp';
import portfolioHome from '@/public/portfolio/home.webp';
import todoListHome from '@/public/todoList/home.webp';
import joviesHome from '@/public/jovies/home.webp';
import k3sHome from '@/public/k3s/home.webp';
import poolcHome from '@/public/poolc/home.webp';


interface Project {
  id: string;
  isCore: boolean;
  tags: string[];
  imageSrc: StaticImageData;
  prodUrl?: string;
  githubUrl?: string;
  docusaurusUrl?: string;
  notionUrl?: string;
  demoUrl?: string;
}

const projects: Project[] = [
  {
    id: 'joossam',
    isCore: true,
    tags: ['Spring', 'Next.js', 'PostgreSQL', 'MongoDB', 'K8S', 'Kafka'],
    imageSrc: joossamHome,
    prodUrl: 'https://joossameng.com',
    demoUrl: 'https://dev.joossameng.com',
    docusaurusUrl: '#',
  },
  {
    id: 'k3sHome',
    isCore: true,
    tags: ['K8S', 'ArgoCD', 'Grafana', 'Vault', 'Tekton', 'Authelia'],
    imageSrc: k3sHome,
    docusaurusUrl: '#',
  },
  {
    id: 'poolc',
    isCore: true,
    tags: ['Spring', 'React', 'CloudFlare', 'PostgreSQL', 'Docker', 'EC2'],
    imageSrc: poolcHome,
    prodUrl: 'https://poolc.org',
    demoUrl: 'https://dev.poolc.kro.kr',
    docusaurusUrl: '#',
  },
  {
    id: 'jaejadle',
    isCore: true,
    tags: ['NestJS', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'K8S'],
    imageSrc: jaejadleHome,
    prodUrl: 'https://disciples-church.com',
    demoUrl: 'https://dev.jaejadle.kro.kr/login',
    docusaurusUrl: '#',
  },
  {
    id: 'jotion',
    isCore: false,
    tags: ['Node.js', 'Prisma', 'Next.js', 'PostgreSQL', 'K8S'],
    imageSrc: jotionHome,
    demoUrl:'https://jotion0213.kro.kr',
    docusaurusUrl: '#',
  },
  {
    id: 'portfolio',
    isCore: false,
    tags: ['Next.js', 'TypeScript', 'K8S'],
    imageSrc: portfolioHome,
    prodUrl: 'https://minjo0213.kro.kr',
    docusaurusUrl: '#',
  },
  {
    id: 'todoList',
    isCore: false,
    tags: ['Prisma', 'Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    imageSrc: todoListHome,
    prodUrl: 'https://todo0213.kro.kr',
    docusaurusUrl: '#',
    notionUrl: '#',
  },
  {
    id: 'jovies',
    isCore: false,
    tags: ['Next.js', 'TypeScript', 'TMDB API', 'Tailwind CSS'],
    imageSrc: joviesHome,
    prodUrl: 'https://jovies.kro.kr',
  },
];

const Projects = () => {
  const t = useTranslations('projects');
  const [showCoreOnly, setShowCoreOnly] = useState(true);

  const filteredProjects = showCoreOnly ? projects.filter((p) => p.isCore) : projects;

  return (
    <main className="flex bg-muted flex-col items-center justify-center gap-12 smalltablet:gap-14 tablet:gap-16 p-4 smalltablet:p-6 tablet:p-8 py-16 smalltablet:py-18 tablet:py-20">
      <div className="flex flex-col items-center gap-5">
        <SectionHeader title={t('title')} />
        <div className="w-16 h-1 rounded-full bg-linear-to-r from-primary/80 to-primary/40" />
      </div>

      <div className="flex items-center justify-center">
        <div className="relative inline-flex items-center rounded-full border border-border bg-background p-1 shadow-sm">
          <div
            className={`absolute h-[calc(100%-8px)] w-[calc(50%-4px)] bg-primary rounded-full shadow-sm transition-all duration-300 ease-in-out ${
              showCoreOnly ? 'left-1' : 'left-[calc(50%+2px)]'
            }`}
          />
          <button
            onClick={() => setShowCoreOnly(true)}
            className={`relative flex items-center gap-2 px-4 mr-2 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              showCoreOnly
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Star className="w-4 h-4" />
            Core
          </button>
          <button
            onClick={() => setShowCoreOnly(false)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              !showCoreOnly
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            All
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 desktop:grid-cols-2 gap-4 smalltablet:gap-5 tablet:gap-6 desktop:gap-8 max-w-[1440px] w-full">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            title={t(`${project.id}.title`)}
            description={t(`${project.id}.description`)}
            tags={project.tags}
            imageSrc={project.imageSrc}
            prodUrl={project.prodUrl}
            githubUrl={project.githubUrl}
            docusaurusUrl={project.docusaurusUrl}
            notionUrl={project.notionUrl}
            demoUrl={project.demoUrl}
          />
        ))}
      </section>

      <div className="flex items-center justify-center">
        <div className="relative inline-flex items-center rounded-full border border-border bg-background p-1 shadow-sm">
          <div
            className={`absolute h-[calc(100%-8px)] w-[calc(50%-4px)] bg-primary rounded-full shadow-sm transition-all duration-300 ease-in-out ${
              showCoreOnly ? 'left-1' : 'left-[calc(50%+2px)]'
            }`}
          />
          <button
            onClick={() => setShowCoreOnly(true)}
            className={`relative flex items-center gap-2 px-4 mr-2 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              showCoreOnly
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Star className="w-4 h-4" />
            Core
          </button>
          <button
            onClick={() => setShowCoreOnly(false)}
            className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              !showCoreOnly
                ? 'text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            All
          </button>
        </div>
      </div>
    </main>
  );
};


interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageSrc: StaticImageData;
  prodUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  docusaurusUrl?: string;
  notionUrl?: string;
}

const ProjectCard = ({ title, description, tags, imageSrc, prodUrl, demoUrl, githubUrl, docusaurusUrl, notionUrl }: ProjectCardProps) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <Card className="overflow-hidden w-full p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
      <div className="aspect-video relative bg-muted">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
          placeholder="blur"
          sizes="(max-width: 600px) 100vw, (max-width: 990px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </div>
      <div className="px-4 smalltablet:px-5 tablet:px-6 pt-4 smalltablet:pt-5 tablet:pt-6 pb-3 smalltablet:pb-4 flex flex-col gap-2 smalltablet:gap-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg smalltablet:text-xl tablet:text-2xl leading-none">{title}</h3>
          {demoUrl && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary/10 border border-primary/20">
              <KeyRound className="w-3 h-3 text-primary" />
              <span className="text-[10px] smalltablet:text-xs font-mono text-primary leading-none">
                Demo: admin / admin
              </span>
            </div>
          )}
        </div>
        <p className="text-sm smalltablet:text-base text-muted-foreground font-extralight">{description}</p>
        <div className="flex gap-1 smalltablet:gap-2 flex-wrap">
          {tags.map((tag) => {
            const data = skillData[tag];
            const SkillIcon = data?.icon;
            const iconColor = isDark && data?.darkColor ? data.darkColor : data?.color;
            return (
              <div
                key={tag}
                className="flex items-center gap-1 p-1 smalltablet:px-3 smalltablet:py-1 smalltablet:border smalltablet:border-input smalltablet:rounded-md smalltablet:bg-background smalltablet:text-[10px] smalltablet:text-xs smalltablet:font-medium"
              >
                {SkillIcon && <SkillIcon className="w-4 h-4 smalltablet:w-3.5 smalltablet:h-3.5" style={{ color: iconColor }} />}
                <span className="hidden smalltablet:inline">{tag}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-4 smalltablet:px-5 tablet:px-6">
        <Separator />
      </div>
      <div className="px-4 smalltablet:px-5 tablet:px-6 py-3 smalltablet:py-4 flex gap-2 smalltablet:gap-3 flex-wrap">
        {prodUrl && (
          <Link href={prodUrl} target="_blank" rel="noopener noreferrer" aria-label="Production">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer text-muted-foreground">
              <ExternalLink className="w-3.5 h-3.5 smalltablet:w-4 smalltablet:h-4" />
              <span className="text-xs smalltablet:text-sm font-medium">Site</span>
            </div>
          </Link>
        )}
        {demoUrl && (
          <Link href={demoUrl} target="_blank" rel="noopener noreferrer" aria-label="Demo">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer text-muted-foreground">
              <Play className="w-3.5 h-3.5 smalltablet:w-4 smalltablet:h-4" />
              <span className="text-xs smalltablet:text-sm font-medium">Demo</span>
            </div>
          </Link>
        )}
        {githubUrl && (
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer text-muted-foreground">
              <SiGithub className="w-3.5 h-3.5 smalltablet:w-4 smalltablet:h-4" />
              <span className="text-xs smalltablet:text-sm font-medium">GitHub</span>
            </div>
          </Link>
        )}
        {docusaurusUrl && (
          <Link href={docusaurusUrl} target="_blank" rel="noopener noreferrer" aria-label="Docusaurus">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer text-muted-foreground">
              <SiDocusaurus className="w-3.5 h-3.5 smalltablet:w-4 smalltablet:h-4" />
              <span className="text-xs smalltablet:text-sm font-medium">Docs</span>
            </div>
          </Link>
        )}
        {notionUrl && (
          <Link href={notionUrl} target="_blank" rel="noopener noreferrer" aria-label="Notion">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer text-muted-foreground">
              <SiNotion className="w-3.5 h-3.5 smalltablet:w-4 smalltablet:h-4" />
              <span className="text-xs smalltablet:text-sm font-medium">Notion</span>
            </div>
          </Link>
        )}
      </div>
    </Card>
  );
};


export default Projects;
