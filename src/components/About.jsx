import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';

function About() {
  const { t } = useLanguage();
  const goal = t.about.goal;
  const goalCharacters = useMemo(() => Array.from(goal), [goal]);
  const typingTarget = useRef(null);
  const hasStarted = useRef(false);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const target = typingTarget.current;
    if (!target) return undefined;

    let intervalId;
    let observer;
    setTypedText('');
    hasStarted.current = false;

    const startTyping = () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      if (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        setTypedText(goal);
        return;
      }

      let characterIndex = 0;
      intervalId = window.setInterval(() => {
        characterIndex += 1;
        setTypedText(goalCharacters.slice(0, characterIndex).join(''));

        if (characterIndex >= goalCharacters.length) {
          window.clearInterval(intervalId);
        }
      }, 12);
    };

    if (!('IntersectionObserver' in window)) {
      startTyping();
      return undefined;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        startTyping();
        observer.disconnect();
      },
      { threshold: 0.35 },
    );
    observer.observe(target);

    return () => {
      if (observer) observer.disconnect();
      if (intervalId) window.clearInterval(intervalId);
      hasStarted.current = false;
    };
  }, [goal, goalCharacters]);

  return (
    <section
      aria-labelledby="about-title"
      className="border-y border-blue-200/10 bg-slate-950/30 px-6 py-20 sm:py-24"
      data-reveal-left
      id="about"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8" data-reveal-left>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-300">
            {t.about.eyebrow}
          </p>
          <h2
            className="mt-4 text-3xl font-bold text-white sm:text-4xl"
            id="about-title"
          >
            {t.about.title}
          </h2>
        </div>

        <div className="about-terminal">
          <div className="about-terminal-titlebar">
            <div aria-hidden="true" className="about-terminal-controls">
              <span />
              <span />
              <span />
            </div>
            <span className="about-terminal-title">
              {t.about.portfolio}
            </span>
            <span aria-hidden="true" className="about-terminal-spacer" />
          </div>

          <div className="about-terminal-body">
            <h3 className="about-terminal-heading">{t.about.heading}</h3>
            <div className="about-terminal-output about-terminal-bio">
              <p
                aria-label={goal}
                className="min-h-20 text-base leading-8 sm:text-lg"
                ref={typingTarget}
              >
                <span aria-hidden="true">{typedText}</span>
                {typedText.length < goalCharacters.length && (
                  <span
                    aria-hidden="true"
                    className="typing-caret ml-1 inline-block h-5 w-0.5 translate-y-1 bg-cyan-300"
                  />
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
