import { IconType } from 'react-icons';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiNodedotjs,
  SiNestjs,
  SiFastapi,
  SiSpring,
  SiPrisma,
  SiAmazonwebservices,
  SiOracle,
  SiKubernetes,
  SiDocker,
  SiNginx,
  SiPostgresql,
  SiMongodb,
  SiMinio,
  SiRedis,
  SiApachekafka,
  SiGrafana,
  SiOpentelemetry,
  SiArgo,
  SiGithubactions,
  SiTekton,
  SiKaniko,
  SiVault,
  SiLangchain,
  SiAuthelia,
  SiFalco,
  SiTrivy,
  SiJest,
  SiVitest,
  SiCypress,
  SiAmazonec2,
  SiAmazonrds,
  SiAmazons3,
  SiVercel,
  SiCloudflare,
  SiMysql,
  SiClerk,
  SiShadcnui,
  SiVite,
  SiThemoviedatabase,
} from 'react-icons/si';
import { GiBearFace } from 'react-icons/gi';

export const skillData: Record<string, { icon: IconType; color: string; darkColor?: string }> = {
  // Frontend
  'React': { icon: SiReact, color: '#61DAFB' },
  'Next.js': { icon: SiNextdotjs, color: '#000000', darkColor: '#FFFFFF' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'HTML': { icon: SiHtml5, color: '#E34F26' },
  'CSS': { icon: SiCss3, color: '#1572B6' },
  'Tailwind': { icon: SiTailwindcss, color: '#06B6D4' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'Zustand': { icon: GiBearFace, color: '#614a28' },
  'Vite': { icon: SiVite, color: '#646CFF' },
  'Shadcn/ui': { icon: SiShadcnui, color: '#000000', darkColor: '#FFFFFF' },

  // Backend
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'NestJS': { icon: SiNestjs, color: '#E0234E' },
  'FastAPI': { icon: SiFastapi, color: '#009688' },
  'Spring': { icon: SiSpring, color: '#6DB33F' },
  'Prisma': { icon: SiPrisma, color: '#2D3748', darkColor: '#FFFFFF' },
  'LangGraph': { icon: SiLangchain, color: '#1C3C3C' },
  'Clerk': { icon: SiClerk, color: '#6C47FF' },

  // Cloud
  'AWS': { icon: SiAmazonwebservices, color: '#FF9900' },
  'EC2': { icon: SiAmazonec2, color: '#FF9900' },
  'RDS': { icon: SiAmazonrds, color: '#527FFF' },
  'S3': { icon: SiAmazons3, color: '#569A31' },
  'Lightsail': { icon: SiAmazonwebservices, color: '#FF9900' },
  'CloudFlare': { icon: SiCloudflare, color: '#F38020' },
  'Oracle Cloud': { icon: SiOracle, color: '#F80000' },
  'Vercel': { icon: SiVercel, color: '#000000', darkColor: '#FFFFFF' },

  // Infra
  'Kubernetes': { icon: SiKubernetes, color: '#326CE5' },
  'K8S': { icon: SiKubernetes, color: '#326CE5' },
  'Docker': { icon: SiDocker, color: '#2496ED' },
  'HAProxy': { icon: SiNginx, color: '#009639' },
  'Nginx': { icon: SiNginx, color: '#009639' },
  'Longhorn': { icon: SiKubernetes, color: '#5F224A' },

  // Data & Messaging
  'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },
  'MongoDB': { icon: SiMongodb, color: '#47A248' },
  'MySQL': { icon: SiMysql, color: '#4479A1' },
  'MinIO': { icon: SiMinio, color: '#C72E49' },
  'Redis': { icon: SiRedis, color: '#DC382D' },
  'Kafka': { icon: SiApachekafka, color: '#231F20', darkColor: '#FFFFFF' },

  // Observability
  'Grafana': { icon: SiGrafana, color: '#F46800' },
  'OpenTelemetry': { icon: SiOpentelemetry, color: '#425CC7' },
  'Thanos': { icon: SiGrafana, color: '#6C4EBB' },
  'Loki': { icon: SiGrafana, color: '#F46800' },
  'Tempo': { icon: SiGrafana, color: '#F46800' },

  // CI/CD
  'ArgoCD': { icon: SiArgo, color: '#EF7B4D' },
  'GitHub Actions': { icon: SiGithubactions, color: '#2088FF' },
  'Tekton': { icon: SiTekton, color: '#FD495C' },
  'Kaniko': { icon: SiKaniko, color: '#FFA600' },

  // Test
  'Jest': { icon: SiJest, color: '#C21325' },
  'Vitest': { icon: SiVitest, color: '#6E9F18' },
  'Cypress': { icon: SiCypress, color: '#69D3A7' },

  // Security
  'Vault': { icon: SiVault, color: '#FFEC6E' },
  'Authelia': { icon: SiAuthelia, color: '#1A8CFF' },
  'Falco': { icon: SiFalco, color: '#00AEC7' },
  'Trivy': { icon: SiTrivy, color: '#1904DA' },
  'Kyverno': { icon: SiKubernetes, color: '#326CE5' },

  // API
  'TMDB API': { icon: SiThemoviedatabase, color: '#01D277' },
};
