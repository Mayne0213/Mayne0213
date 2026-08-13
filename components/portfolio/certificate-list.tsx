'use client';

import { ArrowUpRight, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Certificate = {
  label: string;
  credentialPath: string;
};

export default function CertificateList({ certificates }: { certificates: readonly Certificate[] }) {
  const [selected, setSelected] = useState<Certificate | null>(null);

  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selected]);

  return (
    <>
      <ul className="border-t editorial-rule text-[15px] leading-6">
        {certificates.map((certificate) => (
          <li key={certificate.label} className="flex items-center justify-between gap-4 border-b editorial-rule py-2">
            <span>{certificate.label}</span>
            <button
              type="button"
              onClick={() => setSelected(certificate)}
              aria-label={`${certificate.label} credential 열기`}
              className="shrink-0 text-[#6b6b65] transition-colors hover:text-[#11110f]"
            >
              <ArrowUpRight className="h-4 w-4 stroke-[1.5]" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.label} credential`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-5 smalltablet:p-10"
          onMouseDown={() => setSelected(null)}
        >
          <div className="relative w-fit" onMouseDown={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="닫기"
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-[#fbfbfa] text-[#11110f] shadow-sm transition-transform hover:scale-105"
            >
              <X className="h-4 w-4 stroke-[1.5]" aria-hidden="true" />
            </button>
            <Image src={selected.credentialPath} alt={`${selected.label} credential`} width={1240} height={1754} unoptimized className="block h-auto max-h-[78vh] w-auto max-w-[calc(100vw-2.5rem)] rounded-[3px] shadow-2xl" />
          </div>
        </div>
      )}
    </>
  );
}
