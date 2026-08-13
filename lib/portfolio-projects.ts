export const PROJECT_IDS = ['lumie', 'olma', 'hyojason', 'jaejadle'] as const;

export type ProjectId = (typeof PROJECT_IDS)[number];
export type PortfolioLocale = 'ko' | 'en' | 'de';

type CaseStudy = {
  title: string;
  problem: string;
  decision: string;
  verification: string;
};

export type PortfolioProject = {
  id: ProjectId;
  type: 'personal' | 'team';
  title: string;
  summary: string;
  tags: string[];
  role: string;
  scope: string;
  caseStudies: CaseStudy[];
};

type ProjectTranslations = Record<PortfolioLocale, Omit<PortfolioProject, 'id' | 'type'>>;

const PROJECT_TYPES: Record<ProjectId, PortfolioProject['type']> = {
  lumie: 'personal',
  olma: 'team',
  hyojason: 'team',
  jaejadle: 'personal',
};

const PROJECTS: Record<ProjectId, ProjectTranslations> = {
  lumie: {
    ko: {
      title: 'Lumie',
      summary: '교육 기관을 위한 멀티테넌트 SaaS. 서비스의 복잡한 경계와 운영 문제를 다룬 개인 프로젝트입니다.',
      tags: ['Spring Boot', 'PostgreSQL', 'RabbitMQ', 'Kubernetes'],
      role: '백엔드·워커·운영 경계를 설계하고 구현했습니다.',
      scope: 'Java/Spring Boot 모듈러 모놀리스가 핵심 도메인과 데이터 정합성을 소유하고, FastAPI 워커와 메시지 브로커가 장시간 OMR 처리를 분리합니다.',
      caseStudies: [
        {
          title: 'OMR 처리 경로의 병목 분리',
          problem: '이미지 묶음 처리에서 전체 시간이 길어졌지만, 애플리케이션·OpenCV 연산·컨테이너 스레드 중 어느 곳이 원인인지 먼저 분리해야 했습니다.',
          decision: '단계별 타이밍을 추가해 병목을 관측하고, 그레이스케일 중심 처리·연산 캐시·컨테이너 스레드 상한을 적용했습니다.',
          verification: '100장 처리 경로를 49.3초에서 21.5초로 줄였고, 706장 실스캔 golden corpus에서 결과 불일치 0건을 확인했습니다.',
        },
        {
          title: '비동기 콜백의 중복과 재처리',
          problem: '낙관적 락 충돌 이후 중복 방지 키가 남아 재처리 가능한 OMR 콜백까지 버려지는 상태가 있었습니다.',
          decision: 'DB 반영 성공 이전에는 완료·중복으로 확정하지 않도록 처리 순서와 dedup 키 해제 규칙을 조정했습니다.',
          verification: '재시도, dedup 키 해제, 성공 전이 뒤 최종화까지의 회귀 시나리오로 상태 전이를 검증했습니다.',
        },
        {
          title: '테넌트 격리의 데이터베이스 경계',
          problem: '애플리케이션의 조건문만으로는 멀티테넌트 데이터 접근 실수를 충분히 막기 어렵습니다.',
          decision: 'PostgreSQL Row-Level Security와 요청 컨텍스트 전파를 함께 설계해 데이터베이스에서 테넌트 범위를 강제했습니다.',
          verification: '테넌트 컨텍스트 누락과 교차 접근이 발생하는 경로를 테스트·운영 규칙으로 점검했습니다.',
        },
      ],
    },
    en: {
      title: 'Lumie',
      summary: 'A multi-tenant SaaS for education organizations and my most substantial personal backend project.',
      tags: ['Spring Boot', 'PostgreSQL', 'RabbitMQ', 'Kubernetes'],
      role: 'Designed and implemented backend, worker, and operational boundaries.',
      scope: 'A Java/Spring Boot modular monolith owns core domains and consistency; FastAPI workers and a message broker isolate long-running OMR work.',
      caseStudies: [
        {
          title: 'Separating OMR bottlenecks',
          problem: 'Batch image processing was slow, so the first task was separating application, OpenCV, and container-thread causes.',
          decision: 'Added stage timings, then applied grayscale-first processing, operation caching, and a container thread limit.',
          verification: 'Reduced the 100-image path from 49.3s to 21.5s and observed zero mismatches on a 706-scan golden corpus.',
        },
        {
          title: 'Async callback retries and deduplication',
          problem: 'After optimistic-lock conflicts, a remaining deduplication key could discard callbacks that should be retried.',
          decision: 'Changed finalization order so a callback is not considered complete or duplicate before its database update succeeds.',
          verification: 'Covered retries, dedup-key release, successful transition, and finalization with regression scenarios.',
        },
        {
          title: 'Tenant isolation at the database boundary',
          problem: 'Application-level filters alone are too easy to omit in a multi-tenant service.',
          decision: 'Combined PostgreSQL Row-Level Security with request-context propagation to enforce tenant scope in the database.',
          verification: 'Reviewed missing-context and cross-tenant access paths through tests and operational rules.',
        },
      ],
    },
    de: {
      title: 'Lumie',
      summary: 'Ein mandantenfähiges SaaS für Bildungsorganisationen und mein umfangreichstes persönliches Backend-Projekt.',
      tags: ['Spring Boot', 'PostgreSQL', 'RabbitMQ', 'Kubernetes'],
      role: 'Entwurf und Umsetzung der Grenzen zwischen Backend, Worker und Betrieb.',
      scope: 'Ein Java/Spring-Boot-Modular-Monolith besitzt Kern-Domänen und Konsistenz; FastAPI-Worker und ein Message Broker trennen langlaufende OMR-Aufgaben.',
      caseStudies: [
        {
          title: 'OMR-Engpässe getrennt messen',
          problem: 'Die Bildverarbeitung war langsam; zunächst mussten Anwendungs-, OpenCV- und Container-Thread-Ursachen getrennt werden.',
          decision: 'Ich ergänzte Zeitmessungen pro Schritt und nutzte Graustufenverarbeitung, Caching und eine Thread-Obergrenze.',
          verification: 'Der Pfad für 100 Bilder sank von 49,3s auf 21,5s; im Golden Corpus mit 706 Scans gab es keine Abweichung.',
        },
        {
          title: 'Wiederholungen asynchroner Callbacks',
          problem: 'Nach optimistischen Lock-Konflikten konnte ein verbliebener Dedup-Key erneut verarbeitbare Callbacks verwerfen.',
          decision: 'Die Finalisierungsreihenfolge wurde geändert, sodass ein Callback erst nach erfolgreichem Datenbank-Update fertig ist.',
          verification: 'Regressionstests decken Retry, Freigabe des Dedup-Keys, erfolgreichen Übergang und Finalisierung ab.',
        },
        {
          title: 'Mandantenisolation in der Datenbank',
          problem: 'Filter auf Anwendungsebene können in einem mandantenfähigen Service ausgelassen werden.',
          decision: 'PostgreSQL Row-Level Security wurde mit der Weitergabe des Request-Kontexts kombiniert.',
          verification: 'Fehlende Kontexte und mandantenübergreifende Zugriffe werden durch Tests und Betriebsregeln geprüft.',
        },
      ],
    },
  },
  olma: {
    ko: {
      title: 'OLma',
      summary: '견적과 거래 흐름을 다룬 팀 프로젝트. 데이터 변경과 운영 관점의 백엔드 경험을 쌓았습니다.',
      tags: ['Spring Boot', 'JPA', 'PostgreSQL', 'AWS'],
      role: 'Spring Boot 백엔드 기능과 배포·관측 환경 구축에 기여했습니다.',
      scope: '팀이 함께 개발한 서비스에서 도메인 모델, 인증·권한, 데이터 변경 이력과 배포 흐름을 담당 범위 안에서 다뤘습니다.',
      caseStudies: [
        {
          title: '데이터 변경을 추적 가능한 방식으로 관리',
          problem: '서비스가 발전하면서 스키마 변경이 팀원별 로컬 환경과 배포 환경에서 다르게 적용될 위험이 있었습니다.',
          decision: 'Flyway 마이그레이션을 적용해 데이터 변경을 전진 방식으로 관리하고, 변경 순서를 코드와 함께 남겼습니다.',
          verification: '새 환경에서도 같은 마이그레이션 순서로 스키마를 재현할 수 있도록 배포 흐름을 점검했습니다.',
        },
        {
          title: '인증·권한의 API 경계',
          problem: '거래 흐름에서는 사용자 역할에 따라 접근 가능한 작업이 달라져야 합니다.',
          decision: '토큰 버전 기반 인증 흐름과 역할별 API 접근 제어를 서비스 경계에 적용했습니다.',
          verification: '인증 상태와 권한별 요청을 중심으로 API 동작을 확인했습니다.',
        },
      ],
    },
    en: {
      title: 'OLma',
      summary: 'A team project for quotation and transaction flows, focused on backend data change and operations.',
      tags: ['Spring Boot', 'JPA', 'PostgreSQL', 'AWS'],
      role: 'Contributed Spring Boot features and deployment/observability setup.',
      scope: 'Within a team service, I worked on domain models, authentication and authorization, data-change history, and the deployment flow.',
      caseStudies: [
        {
          title: 'Traceable data changes',
          problem: 'As the service evolved, schema changes could diverge across teammates’ machines and deployed environments.',
          decision: 'Adopted Flyway migrations to manage forward-only data changes and preserve their ordering with code.',
          verification: 'Checked that a fresh environment reproduces the schema through the same migration sequence.',
        },
        {
          title: 'Authentication and authorization boundaries',
          problem: 'Transaction workflows need different API access for each user role.',
          decision: 'Applied token-version authentication and role-based API access control at the service boundary.',
          verification: 'Validated API behavior around authenticated states and role-specific requests.',
        },
      ],
    },
    de: {
      title: 'OLma',
      summary: 'Ein Teamprojekt für Angebots- und Transaktionsabläufe mit Fokus auf Datenänderungen und Betrieb.',
      tags: ['Spring Boot', 'JPA', 'PostgreSQL', 'AWS'],
      role: 'Beitrag zu Spring-Boot-Funktionen sowie Deployment- und Observability-Setup.',
      scope: 'Im Teamservice arbeitete ich an Domänenmodellen, Authentifizierung, Autorisierung, Datenänderungen und dem Deployment-Ablauf.',
      caseStudies: [
        {
          title: 'Nachvollziehbare Datenänderungen',
          problem: 'Schemaänderungen konnten zwischen lokalen und bereitgestellten Umgebungen auseinanderlaufen.',
          decision: 'Flyway-Migrationen verwalten vorwärtsgerichtete Änderungen und ihre Reihenfolge zusammen mit dem Code.',
          verification: 'Ein frisches Environment erzeugt das Schema mit derselben Migrationsreihenfolge.',
        },
        {
          title: 'Grenzen für Authentifizierung und Berechtigung',
          problem: 'Transaktionsabläufe benötigen je Rolle unterschiedliche API-Zugriffe.',
          decision: 'Token-Version-Authentifizierung und rollenbasierte Zugriffskontrolle wurden an der Servicegrenze umgesetzt.',
          verification: 'API-Verhalten wurde für Authentifizierungszustände und rollenspezifische Requests geprüft.',
        },
      ],
    },
  },
  hyojason: {
    ko: {
      title: '효자손',
      summary: '사용자 상태와 차트 정보를 다룬 팀 프로젝트. 작은 범위에서 무결성과 인가를 구현했습니다.',
      tags: ['Spring Boot', 'JPA', 'PostgreSQL', 'Spring Security'],
      role: '백엔드 기능 구현과 API 검증에 기여했습니다.',
      scope: '방문 기록과 차트 같은 관계형 데이터를 다루며, 도메인 규칙을 API와 데이터베이스 제약으로 표현했습니다.',
      caseStudies: [
        {
          title: '중복 생성을 데이터베이스에서 차단',
          problem: '동일한 조건의 차트가 중복 생성되면 사용자 상태와 이후 기록의 신뢰성이 낮아집니다.',
          decision: '애플리케이션 검증에만 의존하지 않고 유니크 제약으로 데이터베이스에서도 중복을 막았습니다.',
          verification: '중복 요청과 관계형 데이터 생성 경로를 테스트로 확인했습니다.',
        },
        {
          title: '인가 회귀 테스트',
          problem: '기능을 추가할수록 인증된 사용자와 관리자 권한의 경계가 흐려질 수 있습니다.',
          decision: '보안 설정과 API 권한을 분리해 두고 MockMvc 기반의 인가 회귀 테스트를 추가했습니다.',
          verification: '비인증·권한 부족 요청이 허용되지 않는지 자동화된 요청 테스트로 확인했습니다.',
        },
      ],
    },
    en: {
      title: 'Hyojason',
      summary: 'A team project for user state and chart data, with focused examples of integrity and authorization.',
      tags: ['Spring Boot', 'JPA', 'PostgreSQL', 'Spring Security'],
      role: 'Contributed backend features and API verification.',
      scope: 'Worked with relational visit and chart data, expressing domain rules through APIs and database constraints.',
      caseStudies: [
        {
          title: 'Blocking duplicate creation in the database',
          problem: 'Duplicate charts under the same condition reduce confidence in user state and later records.',
          decision: 'Added a unique constraint so duplicate prevention does not depend only on application validation.',
          verification: 'Tested duplicate requests and related-data creation paths.',
        },
        {
          title: 'Authorization regression tests',
          problem: 'As features grow, authenticated-user and administrator boundaries can blur.',
          decision: 'Separated security configuration from API permissions and added MockMvc authorization regressions.',
          verification: 'Automated request tests confirm that unauthenticated and under-authorized requests are rejected.',
        },
      ],
    },
    de: {
      title: 'Hyojason',
      summary: 'Ein Teamprojekt für Benutzerstatus und Diagrammdaten mit Beispielen für Integrität und Berechtigung.',
      tags: ['Spring Boot', 'JPA', 'PostgreSQL', 'Spring Security'],
      role: 'Beitrag zu Backend-Funktionen und API-Verifikation.',
      scope: 'Arbeit mit relationalen Besuchs- und Diagrammdaten; Domänenregeln wurden durch APIs und Datenbank-Constraints ausgedrückt.',
      caseStudies: [
        {
          title: 'Doppelte Anlage in der Datenbank blockieren',
          problem: 'Doppelte Diagramme schwächen die Verlässlichkeit von Benutzerstatus und späteren Einträgen.',
          decision: 'Ein Unique-Constraint verhindert Duplikate zusätzlich zur Anwendungsvalidierung.',
          verification: 'Doppelte Requests und Pfade zur Anlage verknüpfter Daten wurden getestet.',
        },
        {
          title: 'Regressionstests für Berechtigungen',
          problem: 'Mit neuen Funktionen können die Grenzen zwischen Nutzer- und Administratorrechten verschwimmen.',
          decision: 'Sicherheitskonfiguration und API-Berechtigungen wurden getrennt; MockMvc-Regressionstests kamen hinzu.',
          verification: 'Automatisierte Requests prüfen die Ablehnung nicht authentifizierter und unzureichend berechtigter Zugriffe.',
        },
      ],
    },
  },
  jaejadle: {
    ko: {
      title: '제자들교회',
      summary: '교회 운영용 콘텐츠·일정 관리 프로젝트. 명확한 운영 요구를 서비스로 전환한 개인 프로젝트입니다.',
      tags: ['TypeScript', 'Next.js', 'Cloudflare', 'D1', 'R2'],
      role: '요구사항 정리부터 구현과 배포까지 전 과정을 맡았습니다.',
      scope: '관리자가 직접 콘텐츠와 일정을 관리하고, 외부 사용자가 최신 정보를 볼 수 있는 웹 서비스의 기본 운영 흐름을 구현했습니다.',
      caseStudies: [
        {
          title: '작지만 실제 운영되는 CRUD',
          problem: '콘텐츠와 일정은 담당자가 개발자 도움 없이 빠르게 갱신할 수 있어야 했습니다.',
          decision: '관리자 인증과 관리 화면을 포함해 운영자가 사용하는 데이터 입력·수정·공개 흐름을 구성했습니다.',
          verification: '운영자가 갱신한 콘텐츠가 외부 화면에 반영되는 전체 흐름을 배포 환경에서 확인했습니다.',
        },
        {
          title: '요구사항을 끝까지 배포',
          problem: '기능 구현만으로는 실제 사용자의 접근성과 운영 가능성을 보장할 수 없습니다.',
          decision: '웹 애플리케이션과 데이터·파일 저장소를 연결하고 공개 서비스로 배포했습니다.',
          verification: '운영자 관리와 외부 조회라는 두 사용자 경로를 기준으로 서비스 동작을 확인했습니다.',
        },
      ],
    },
    en: {
      title: 'Jaejadle Church',
      summary: 'A content and schedule management service for church operations, built end to end as a personal project.',
      tags: ['TypeScript', 'Next.js', 'Cloudflare', 'D1', 'R2'],
      role: 'Owned the work from requirements through implementation and deployment.',
      scope: 'Implemented the basic operational flow for administrators to manage content and schedules while visitors see current information.',
      caseStudies: [
        {
          title: 'Small but genuinely operated CRUD',
          problem: 'Content and schedules need to be updated quickly by operators without developer assistance.',
          decision: 'Built administrator authentication and management views for creating, updating, and publishing operational content.',
          verification: 'Confirmed that operator updates appear on public pages in the deployed environment.',
        },
        {
          title: 'Taking requirements through deployment',
          problem: 'Implemented features alone do not guarantee access or operability for actual users.',
          decision: 'Connected the web app with data and file storage and deployed it as a public service.',
          verification: 'Checked the service from both administrator-management and visitor-read paths.',
        },
      ],
    },
    de: {
      title: 'Jaejadle Church',
      summary: 'Ein End-to-End-Projekt für Inhalte und Termine im Kirchenbetrieb.',
      tags: ['TypeScript', 'Next.js', 'Cloudflare', 'D1', 'R2'],
      role: 'Verantwortlich von Anforderungen über Umsetzung bis Deployment.',
      scope: 'Grundlegender Betriebsablauf: Administratoren pflegen Inhalte und Termine, Besucher sehen aktuelle Informationen.',
      caseStudies: [
        {
          title: 'Kleines, aber tatsächlich betriebenes CRUD',
          problem: 'Inhalte und Termine müssen ohne Entwicklerhilfe schnell aktualisiert werden.',
          decision: 'Administrator-Authentifizierung und Verwaltungsansichten für Erstellen, Ändern und Veröffentlichen wurden umgesetzt.',
          verification: 'Im Deployment wurde geprüft, dass Änderungen der Betreiber auf öffentlichen Seiten erscheinen.',
        },
        {
          title: 'Anforderungen bis zum Deployment',
          problem: 'Implementierte Funktionen garantieren noch keine Zugänglichkeit und Betriebsfähigkeit.',
          decision: 'Web-App, Daten- und Dateispeicher wurden verbunden und als öffentlicher Service bereitgestellt.',
          verification: 'Der Dienst wurde über Verwaltungs- und Besucherpfade geprüft.',
        },
      ],
    },
  },
};

export function getPortfolioProject(locale: string, id: string): PortfolioProject | undefined {
  if (!PROJECT_IDS.includes(id as ProjectId)) {
    return undefined;
  }

  const resolvedLocale: PortfolioLocale = locale === 'en' || locale === 'de' ? locale : 'ko';
  const projectId = id as ProjectId;

  return {
    id: projectId,
    type: PROJECT_TYPES[projectId],
    ...PROJECTS[projectId][resolvedLocale],
  };
}
