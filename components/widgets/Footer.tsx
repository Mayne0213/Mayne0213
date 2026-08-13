import { Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="portfolio-shell py-20">
      <div className="flex h-[52px] items-center gap-5">
        <a href="https://github.com/Mayne0213" target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-opacity hover:opacity-55">
          <Github className="h-4 w-4 stroke-[1.5]" />
        </a>
        <a href="mailto:bluemayne0213@icloud.com" aria-label="Email" className="transition-opacity hover:opacity-55">
          <Mail className="h-4 w-4 stroke-[1.5]" />
        </a>
      </div>
      <p className="text-[13px] leading-5 text-[#6b6b65]">© {new Date().getFullYear()} MINJO KIM</p>
    </footer>
  );
}
