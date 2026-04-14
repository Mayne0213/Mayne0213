import { Separator } from '@/components/ui/separator';
import { Github, Mail } from 'lucide-react';
import Link from 'next/link';

const SOCIAL_MEDIA = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github0213.com/Mayne0213",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:bluemayne0213@icloud.com",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Separator />
      <footer className='m-8'>
        <div className="w-full flex justify-between items-center gap-3 smalltablet:gap-4">
          <p className="text-xs smalltablet:text-sm text-center text-muted-foreground">
            © {currentYear} All rights reserved
          </p>
          <div className="flex justify-center gap-6 smalltablet:gap-8">
            {SOCIAL_MEDIA.map(({ name, icon: Icon, href }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <Icon className="w-5 h-5 smalltablet:w-6 smalltablet:h-6" />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
