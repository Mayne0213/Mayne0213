'use client';

import Particles from '@/components/ui/Particles';
import { useTranslations } from 'next-intl';
import { TypeAnimation } from 'react-type-animation';
import { useState, useRef } from 'react';

type Phase = 'title-typing' | 'desc-typing' | 'title-erasing' | 'restarting';

export default function Hero() {
  const t = useTranslations('hero');
  const title = t('title');
  const description = t('description');

  const [phase, setPhase] = useState<Phase>('title-typing');
  const [cycle, setCycle] = useState(0);
  const isTransitioning = useRef(false);

  const handleTitleTyped = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setPhase('desc-typing');
    setTimeout(() => {
      isTransitioning.current = false;
    }, 100);
  };

  const handleDescriptionErased = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setPhase('title-erasing');
    setTimeout(() => {
      isTransitioning.current = false;
    }, 100);
  };

  const handleTitleErased = () => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setPhase('restarting');
    setTimeout(() => {
      setCycle(prev => prev + 1);
      setPhase('title-typing');
      isTransitioning.current = false;
    }, 500);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full h-full overflow-hidden">
      <Particles
        particleColors={['#000000']}
        particleCount={300}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={true}
        className="absolute inset-0 -z-10"
      />
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex flex-col items-center justify-center gap-2 smalltablet:gap-3 tablet:gap-4 px-4 smalltablet:px-5">
            <h2 className="font-bold text-5xl smalltablet:text-6xl tablet:text-7xl desktop:text-8xl text-center bg-linear-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent min-h-[1.2em]">
              {phase === 'restarting' ? null : phase === 'title-erasing' ? (
                <TypeAnimation
                  key={`title-erase-${cycle}`}
                  preRenderFirstString={true}
                  sequence={[title, 100, '', handleTitleErased]}
                  speed={10}
                  deletionSpeed={30}
                  cursor={false}
                />
              ) : phase === 'title-typing' ? (
                <TypeAnimation
                  key={`title-type-${cycle}`}
                  sequence={[title, handleTitleTyped]}
                  speed={15}
                  cursor={false}
                />
              ) : (
                <TypeAnimation
                  key={`title-stay-${cycle}`}
                  preRenderFirstString={true}
                  sequence={[title]}
                  speed={15}
                  cursor={false}
                />
              )}
            </h2>
            <div className="max-w-sm smalltablet:max-w-xl tablet:max-w-2xl desktop:max-w-3xl min-h-[1.5em]">
              <p className="text-xl smalltablet:text-2xl tablet:text-3xl desktop:text-4xl text-center leading-[150%] smalltablet:leading-[160%]">
                {phase === 'desc-typing' && (
                  <TypeAnimation
                    key={`desc-${cycle}`}
                    sequence={[description, 2000, '', handleDescriptionErased]}
                    speed={30}
                    deletionSpeed={50}
                    cursor={true}
                  />
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

