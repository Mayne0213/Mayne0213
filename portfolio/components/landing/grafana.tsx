"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import SectionHeader from "@/components/landing/section-header";
import { Button } from "@/components/ui/button";

type Section = "overview" | "resources" | "kubernetes" | "network";

const sections: { id: Section; label: string; panels: number }[] = [
  { id: "overview", label: "Overview", panels: 8 },
  { id: "resources", label: "Resources", panels: 8 },
];

export default function GrafanaPage() {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement>(null);


  // Grafana iframe URL 생성 함수
  const getGrafanaUrl = (panelId: number, themeType: "dark" | "light") => {
    const baseUrl = "https://grafana0213.kro.kr/d-solo/k8s_views_global/kubernetes-views-global";
    return `${baseUrl}?orgId=1&refresh=30s&theme=${themeType}&panelId=${panelId}&from=now-30m&to=now`;
  };

  // iframe 래퍼 컴포넌트
  const GrafanaPanel = ({ panelId }: { panelId: number }) => {
    const [loaded, setLoaded] = useState(false);

    return (
      <div className="relative w-full h-full">
        {/* {(!loaded || isLoading) && <LoadingSkeleton />} */}
        {theme === "dark" ? (
          <iframe
            key={`${panelId}-dark-${theme}`}
            src={getGrafanaUrl(panelId, "dark")}
            className="w-full h-full border"
            style={{ display: loaded ? 'block' : 'none' }}
            onLoad={() => setLoaded(true)}
          />
        ) : (
          <iframe
            key={`${panelId}-light-${theme}`}
            src={getGrafanaUrl(panelId, "light")}
            className="w-full h-full"
            style={{ display: loaded ? 'block' : 'none' }}
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
    );
  };

  return (
    <main className="flex flex-col items-center justify-center gap-12 smalltablet:gap-14 tablet:gap-16 p-4 smalltablet:p-6 tablet:p-8 py-16 smalltablet:py-18 tablet:py-20" ref={sectionRef}>
      <div className="flex flex-col items-center gap-5">
        <SectionHeader title="Monitoring" />
        <div className="w-16 h-1 rounded-full bg-linear-to-r from-primary/80 to-primary/40" />
      </div>

      {/* 섹션 선택 버튼 */}
      <div className="flex gap-1.5 smalltablet:gap-2 flex-wrap justify-center">
        {sections.map((section) => (
          <Button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            variant={activeSection === section.id ? "default" : "outline"}
            className="transition-all text-[10px] smalltablet:text-xs tablet:text-sm px-2 smalltablet:px-3 py-1 smalltablet:py-2 h-auto"
          >
            {section.label}
            <span className="ml-1 smalltablet:ml-1.5 tablet:ml-2 text-[9px] smalltablet:text-xs opacity-60">
              ({section.panels})
            </span>
          </Button>
        ))}
      </div>

      {/* Overview 섹션 */}
      {activeSection === "overview" && (
        <div className="flex flex-col desktop:flex-row gap-1.5 smalltablet:gap-2 justify-center w-full h-full">
          {/* 왼쪽 2개 열 (CPU, RAM) */}
          <div className="flex flex-col smalltablet:flex-row gap-1.5 smalltablet:gap-2 w-full desktop:flex-1">
            {/* Global CPU Usage 열 */}
            <div className="flex flex-col gap-1.5 smalltablet:gap-2 w-full smalltablet:flex-1">
              {/* Global CPU Usage (id:77) - w:6, h:8 */}
              <div className="w-full aspect-5/4 theme-background rounded-md smalltablet:rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <GrafanaPanel panelId={77} />
              </div>
              {/* CPU Usage (id:37) - w:6, h:4 */}
              <div className="w-full aspect-5/2 theme-background rounded-md smalltablet:rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <GrafanaPanel panelId={37} />
              </div>
            </div>

            {/* Global RAM Usage 열 */}
            <div className="flex flex-col gap-1.5 smalltablet:gap-2 w-full smalltablet:flex-1">
              {/* Global RAM Usage (id:78) - w:6, h:8 */}
              <div className="w-full aspect-5/4 theme-background rounded-md smalltablet:rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <GrafanaPanel panelId={78} />
              </div>
              {/* RAM Usage (id:39) - w:6, h:4 */}
              <div className="w-full aspect-5/2 theme-background rounded-md smalltablet:rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <GrafanaPanel panelId={39} />
              </div>
            </div>
          </div>

          {/* 오른쪽 넓은 열 (Kubernetes Resource Count) */}
          {/* Kubernetes Resource Count (id:52) - w:10, h:12 */}
          <div className="w-full desktop:flex-1 desktop:max-w-[40%] theme-background rounded-md smalltablet:rounded-lg overflow-hidden flex items-stretch transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
            <GrafanaPanel panelId={52} />
          </div>
        </div>
      )}

      {/* Resources 섹션 */}
      {activeSection === "resources" && (
        <div className="flex flex-col gap-1.5 smalltablet:gap-2 w-full">
          {/* Row 1 */}
          <div className="flex flex-col desktop:flex-row gap-1.5 smalltablet:gap-2 justify-center w-full">
            {/* Cluster CPU Utilization (id:72) - w:12, h:8 */}
            <div className="w-full desktop:flex-1 aspect-5/4 smalltablet:aspect-video theme-background rounded-md smalltablet:rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
              <GrafanaPanel panelId={72} />
            </div>
            {/* Cluster Memory Utilization (id:55) - w:12, h:8 */}
            <div className="w-full desktop:flex-1 aspect-5/4 smalltablet:aspect-video theme-background rounded-md smalltablet:rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
              <GrafanaPanel panelId={55} />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col desktop:flex-row gap-1.5 smalltablet:gap-2 justify-center w-full">
            {/* CPU Utilization by namespace (id:46) - w:12, h:8 */}
            <div className="w-full desktop:flex-1 aspect-5/4 smalltablet:aspect-video theme-background rounded-md smalltablet:rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
              <GrafanaPanel panelId={46} />
            </div>
            {/* Memory Utilization by namespace (id:50) - w:12, h:8 */}
            <div className="w-full desktop:flex-1 aspect-5/4 smalltablet:aspect-video theme-background rounded-md smalltablet:rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
              <GrafanaPanel panelId={50} />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col desktop:flex-row gap-1.5 smalltablet:gap-2 justify-center w-full">
            {/* CPU Utilization by instance (id:54) - w:12, h:8 */}
            <div className="w-full desktop:flex-1 aspect-5/4 smalltablet:aspect-video theme-background rounded-md smalltablet:rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
              <GrafanaPanel panelId={54} />
            </div>
            {/* Memory Utilization by instance (id:73) - w:12, h:8 */}
            <div className="w-full desktop:flex-1 aspect-5/4 smalltablet:aspect-video theme-background rounded-md smalltablet:rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
              <GrafanaPanel panelId={73} />
            </div>
          </div>

          {/* Row 4 */}
          <div className="flex flex-col desktop:flex-row gap-1.5 smalltablet:gap-2 justify-center w-full">
            {/* CPU Throttled seconds by namespace (id:82) - w:12, h:8 */}
            <div className="w-full desktop:flex-1 aspect-5/4 smalltablet:aspect-video theme-background rounded-md smalltablet:rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
              <GrafanaPanel panelId={82} />
            </div>
            {/* CPU Core Throttled by instance (id:83) - w:12, h:8 */}
            <div className="w-full desktop:flex-1 aspect-5/4 smalltablet:aspect-video theme-background rounded-md smalltablet:rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
              <GrafanaPanel panelId={83} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
