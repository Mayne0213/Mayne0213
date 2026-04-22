'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send } from 'lucide-react';
import { useState } from 'react';
import SectionHeader from './section-header';
import Link from 'next/link';
import { SiGithub } from 'react-icons/si';
import { useTranslations } from 'next-intl';

const RECIPIENT_EMAIL = 'bluemayne0213@icloud.com';

const Contact = () => {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body = `From: ${formData.name}

${formData.message}`;

    const mailtoLink = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'bluemayne0213@icloud.com',
      link: 'mailto:bluemayne0213@icloud.com',
    },
    {
      icon: SiGithub,
      label: 'GitHub',
      value: '@Mayne0213',
      link: 'https://github.com/Mayne0213',
    },
  ];

  return (
    <main className="flex bg-muted flex-col items-center justify-center gap-12 smalltablet:gap-14 tablet:gap-16 p-4 smalltablet:p-6 tablet:p-8 py-16 smalltablet:py-18 tablet:py-20">
      <div className="flex flex-col items-center gap-5">
        <SectionHeader title={t('title')} />
        <div className="w-16 h-1 rounded-full bg-linear-to-r from-primary/80 to-primary/40" />
      </div>

      <div className="grid tablet:grid-cols-2 gap-4 smalltablet:gap-5 tablet:gap-6 desktop:gap-8 max-w-[1440px] w-full">
        {/* Contact Info */}
        <Card className="overflow-hidden w-full p-0">
          <div className="px-4 smalltablet:px-5 tablet:px-6 pt-4 smalltablet:pt-5 tablet:pt-6 pb-3 smalltablet:pb-4 flex flex-col gap-4 smalltablet:gap-5">
            <h3 className="font-semibold text-lg smalltablet:text-xl tablet:text-2xl leading-none">
              {t('getInTouch')}
            </h3>
            <p className="text-sm smalltablet:text-base text-muted-foreground font-extralight">
              {t('description')}
            </p>

            <div className="flex flex-col gap-3 mt-2">
              {contactLinks.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 p-3 smalltablet:p-4 rounded-lg border border-border bg-background"
                >
                  <div className="flex items-center justify-center w-10 h-10 smalltablet:w-12 smalltablet:h-12 rounded-full bg-primary/10">
                    <item.icon className="w-5 h-5 smalltablet:w-6 smalltablet:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs smalltablet:text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-sm smalltablet:text-base font-medium truncate">{item.value}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Card>

        {/* Contact Form */}
        <Card className="overflow-hidden w-full p-0">
          <div className="px-4 smalltablet:px-5 tablet:px-6 pt-4 smalltablet:pt-5 tablet:pt-6 pb-4 smalltablet:pb-5 tablet:pb-6 flex flex-col gap-4 smalltablet:gap-5">
            <h3 className="font-semibold text-lg smalltablet:text-xl tablet:text-2xl leading-none">
              {t('sendMessage')}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 smalltablet:gap-5">
              <div className="grid tablet:grid-cols-2 gap-4 smalltablet:gap-5">
                <div className="flex flex-col gap-1.5 smalltablet:gap-2">
                  <label htmlFor="name" className="text-xs smalltablet:text-sm font-medium">
                    {t('name')} <span className="text-primary">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={t('namePlaceholder')}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-10 smalltablet:h-11"
                  />
                </div>

                <div className="flex flex-col gap-1.5 smalltablet:gap-2">
                  <label htmlFor="subject" className="text-xs smalltablet:text-sm font-medium">
                    {t('subject')} <span className="text-primary">*</span>
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder={t('subjectPlaceholder')}
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="h-10 smalltablet:h-11"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 smalltablet:gap-2">
                <label htmlFor="message" className="text-xs smalltablet:text-sm font-medium">
                  {t('message')} <span className="text-primary">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('messagePlaceholder')}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="resize-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm smalltablet:text-base w-full tablet:w-auto tablet:self-end"
              >
                {t('send')}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </Card>
      </div>
    </main>
  );
};

export default Contact;
