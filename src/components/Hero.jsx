import profileImage from '../assets/images/profile.png';
import { Link } from 'react-router-dom';
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

function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 py-12 sm:py-16 lg:grid-cols-2 lg:gap-14"
    >
      <div className="text-center lg:text-left" data-reveal>
        <p className="hero-entrance hero-entrance-one mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-200">
          <span className="hero-role-dot size-2 rounded-full bg-blue-400" />
          {t.hero.role}
        </p>

        <h1 className="hero-entrance hero-entrance-two text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          {t.hero.greeting}
          <br />
          {/* O'rolboy jumanazrov */}
          <span className="bg-gradient-to-r from-blue-300 to-cyan-100 bg-clip-text text-transparent">
            O&apos;rolboy Jumanazrov
          </span>
        </h1>

        <p className="hero-entrance hero-entrance-three mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg lg:mx-0">
          {t.hero.bio}
        </p>

        <ul
          aria-label={t.hero.technologiesLabel}
          className="hero-entrance hero-entrance-four mt-7 flex flex-wrap justify-center gap-2 lg:justify-start"
        >
          {technologies.map((technology) => (
            <li
              className="hero-tech-chip rounded-full border border-blue-300/15 bg-white/5 px-3 py-1.5 text-sm text-blue-100"
              key={technology}
            >
              {technology}
            </li>
          ))}
        </ul>

        <div className="hero-entrance hero-entrance-five mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
          <Link
            className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 focus:ring-offset-zinc-950"
            to="#contact"
          >
            {t.hero.contact}
          </Link>
          <a
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:border-blue-300/60 hover:bg-blue-400/10 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 focus:ring-offset-zinc-950"
            href="/resume.pdf"
            rel="noreferrer"
            target="_blank"
          >
            {t.hero.resume}
          </a>
        </div>
      </div>

      <div className="mx-auto w-full max-w-md lg:max-w-lg" data-reveal-right>
        <div className="hero-photo-entrance rounded-[2rem] bg-gradient-to-br from-blue-200 via-blue-500 to-white p-[2px] shadow-[0_0_60px_rgba(37,99,235,0.3)]">
          <img
            alt={t.hero.profileAlt}
            className="aspect-square w-full rounded-[calc(2rem-2px)] border border-white/10 object-cover object-center"
            src={profileImage}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
