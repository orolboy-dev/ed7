import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCss3Alt,
  faFigma,
  faGithub,
  faGitAlt,
  faHtml5,
  faJs,
  faNpm,
  faNodeJs,
  faReact,
  faTypescript,
} from '@fortawesome/free-brands-svg-icons';
import {
  faBolt,
  faCode,
  faDatabase,
  faFire,
  faLayerGroup,
  faMobileScreenButton,
  faServer,
  faTerminal,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../LanguageContext';

/* O'zingiz biladigan texnologiyalarni shu ro'yxatda yangilang. */
const skills = [
  { name: 'HTML', icon: faHtml5, color: '#e34f26' },
  { name: 'CSS', icon: faCss3Alt, color: '#1572b6' },
  { name: 'Tailwind CSS', icon: faWind, color: '#38bdf8' },
  { name: 'JavaScript', icon: faJs, color: '#f7df1e' },
  { name: 'React.js', icon: faReact, color: '#61dafb' },
  { name: 'Node.js', icon: faNodeJs, color: '#5fa04e' },
  { name: 'GitHub', icon: faGithub, color: '#f8fafc' },
  { name: 'Git Bash', icon: faTerminal, color: '#f05032' },
  { name: 'TypeScript', icon: faTypescript, color: '#3178c6' },
  { name: 'Next.js', icon: faBolt, color: '#f8fafc' },
  { name: 'Express.js', icon: faServer, color: '#cbd5e1' },
  { name: 'MongoDB', icon: faDatabase, color: '#47a248' },
  { name: 'REST API', icon: faCode, color: '#a78bfa' },
  { name: 'Vite', icon: faBolt, color: '#bd34fe' },
  { name: 'Figma', icon: faFigma, color: '#f24e1e' },
  { name: 'Responsive Design', icon: faMobileScreenButton, color: '#60a5fa' },
  { name: 'npm', icon: faNpm, color: '#cb3837' },
  { name: 'Git', icon: faGitAlt, color: '#f05032' },
  { name: 'Firebase', icon: faFire, color: '#ffca28' },
  { name: 'Redux', icon: faLayerGroup, color: '#764abc' },
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
                aria-label={skill.name}
                className="skill-logo rounded-full border border-blue-300/15 bg-white/5 p-3 text-2xl shadow-sm shadow-blue-950/20 sm:p-3.5"
                key={`${skill.name}-${index}`}
                title={skill.name}
              >
                <FontAwesomeIcon
                  aria-hidden="true"
                  icon={skill.icon}
                  style={{ color: skill.color }}
                />
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
