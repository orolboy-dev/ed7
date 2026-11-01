import { useLanguage } from '../LanguageContext';

/* O'zingiz biladigan texnologiyalarni shu ro'yxatda yangilang. */
const skills = [
  'HTML',
  'CSS',
  'Tailwind CSS',
  'JavaScript',
  'React.js',
  'Node.js',
  'GitHub',
  'Git Bash',
  'TypeScript',
  'Next.js',
  'Express.js',
  'MongoDB',
  'REST API',
  'Vite',
  'Figma',
  'Responsive Design',
  'npm',
  'Git',
  'Firebase',
  'Redux',
];

function SkillRow({ direction, items, label }) {
  return (
    <div
      aria-label={label}
      className="skills-marquee overflow-hidden py-2"
      role="group"
    >
      <div
        className={`skills-marquee-track skills-marquee-${direction} flex w-max`}
      >
        {[false, true].map((isDuplicate) => (
          <ul
            aria-hidden={isDuplicate || undefined}
            className="skills-marquee-set flex shrink-0 gap-3 pr-3"
            key={String(isDuplicate)}
          >
            {items.map((skill, index) => (
              <li
                className="rounded-full border border-blue-300/15 bg-white/5 px-5 py-3 text-sm font-medium text-blue-100 shadow-sm shadow-blue-950/20 sm:text-base"
                key={`${skill}-${index}`}
              >
                {skill}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const { t } = useLanguage();

  return (
    <section
      id="skills"
      className="overflow-hidden border-y border-white/10 bg-zinc-900/40"
    >
      <div className="mx-auto max-w-6xl px-6 pb-10 pt-20 sm:pt-24">
        <div data-reveal-left>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-300">
            {t.skills.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            {t.skills.title}
          </h2>
        </div>
      </div>
      <div className="space-y-3 pb-20 sm:pb-24" data-reveal-right>
        <SkillRow direction="left" items={skills} label={t.skills.left} />
        <SkillRow
          direction="right"
          items={[...skills].reverse()}
          label={t.skills.right}
        />
      </div>
    </section>
  );
}

export default Skills;
