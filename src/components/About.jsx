import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';

const technologies = [
  'HTML',
  'CSS',
  'Tailwind CSS',
  'JavaScript',
  'React.js',
  'Node.js',
  'GitHub',
  'Git Bash',
];

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
      }, 28);
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

        <div className="rounded-3xl bg-gradient-to-br from-blue-300 via-white/70 to-blue-700 p-px shadow-[0_0_40px_rgba(37,99,235,0.16)]">
          <div className="rounded-[calc(1.5rem-1px)] bg-gray-700 px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-200/30 bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-100">
                {t.about.role}
              </span>
              <span className="size-2 rounded-full bg-blue-300 shadow-[0_0_12px_rgba(147,197,253,0.9)]" />
              <span className="text-sm text-gray-200">{t.about.portfolio}</span>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-100">
                {t.about.technologies}
              </h3>
              <ul
                aria-label={t.about.technologiesLabel}
                className="mt-4 flex flex-wrap gap-2"
              >
                {technologies.map((technology) => (
                  <li
                    className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white"
                    key={technology}
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-white/15 pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-100">
                {t.about.goalTitle}
              </h3>
              <p
                aria-label={goal}
                className="mt-3 min-h-20 max-w-4xl text-base leading-8 text-white sm:text-lg"
                ref={typingTarget}
              >
                <span aria-hidden="true">{typedText}</span>
                {typedText.length < goalCharacters.length && (
                  <span
                    aria-hidden="true"
                    className="typing-caret ml-1 inline-block h-5 w-0.5 translate-y-1 bg-blue-200"
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
