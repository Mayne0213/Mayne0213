'use client';

import { ArrowUpRight, X } from 'lucide-react';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

type Certificate = {
  label: string;
  credentialPath: string;
  width: number;
  height: number;
};

type CertificateLabels = {
  open: string;
  label: string;
  close: string;
};

export default function CertificateList({ certificates, labels }: { certificates: readonly Certificate[]; labels: CertificateLabels }) {
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
          <li key={certificate.label} className="border-b editorial-rule">
            <button
              type="button"
              onClick={() => setSelected(certificate)}
              aria-label={`${certificate.label} ${labels.open}`}
              className="group flex w-full cursor-pointer items-center justify-between gap-4 py-2 text-left focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-[-2px] focus-visible:outline-black"
            >
              <span className="text-[#555550] transition-colors group-hover:text-[#11110f]">{certificate.label}</span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[#6b6b65] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      {selected && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.label} ${labels.label}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-5 smalltablet:p-10"
          onMouseDown={() => setSelected(null)}
        >
          <div className="relative w-fit" onMouseDown={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label={labels.close}
              className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-[#fbfbfa] text-[#11110f] shadow-sm transition-transform hover:scale-105"
            >
              <X className="h-4 w-4 stroke-[1.5]" aria-hidden="true" />
            </button>
            <Image
              src={selected.credentialPath}
              alt={`${selected.label} ${labels.label}`}
              width={selected.width}
              height={selected.height}
              unoptimized
              className="block h-auto max-h-[76vh] w-auto max-w-[min(82vw,820px)] rounded-[3px] shadow-2xl"
            />
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
