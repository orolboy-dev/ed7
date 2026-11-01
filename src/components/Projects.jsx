import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import {
  faCartShopping,
  faCalculator,
  faClock,
  faMobileScreenButton,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../LanguageContext';

function CalculatorPreview() {
  return (
    <div className="calculator-preview">
      <div className="calculator-preview-header">
        <span className="calculator-preview-brand">
          <FontAwesomeIcon aria-hidden="true" icon={faCalculator} />
          CALCULATOR
        </span>
        <span aria-hidden="true" className="calculator-preview-indicator" />
      </div>
      <div className="calculator-preview-display">
        <span>12 × 8</span>
        <strong>96</strong>
      </div>
      <div className="calculator-preview-keys">
        {['AC', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '0', '.', '='].map((key) => (
          <span
            className={[
              'calculator-preview-key',
              ['÷', '×', '−', '+'].includes(key) ? 'is-operator' : '',
              key === '=' ? 'is-equal' : '',
              key === '0' ? 'is-wide' : '',
            ].filter(Boolean).join(' ')}
            key={key}
          >
            {key}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Loyiha ikonkalari, preview'lari va URL'lari shu ro'yxatda tahrir qilinadi. */
const projects = [
  {
    icon: faYoutube,
    preview: 'youtube',
    image: '/assets/images/projects/youtube-clone.jpg',
    demoUrl: 'https://orolboy-dev-youtube-clone.vercel.app/',
    githubUrl: 'https://github.com/orolboy-dev/orolboy-dev-youtube-clone',
  },
  {
    icon: faClock,
    preview: 'clock',
    image: '/assets/images/projects/soat-app.jpg',
    demoUrl: 'https://soat-topaz.vercel.app/',
    githubUrl: 'https://github.com/orolboy-dev/soat',
  },
  {
    icon: faMobileScreenButton,
    preview: 'mobile',
    image: '/assets/images/projects/telhub.jpg',
    demoUrl: 'https://telhub.vercel.app/',
    githubUrl: 'https://github.com/orolboy-dev/Demodey',
  },
  {
    icon: faCartShopping,
    preview: 'store',
    image: '/assets/images/projects/sotibol-uz.png',
    demoUrl: 'https://sotiboluz.vercel.app/',
    githubUrl: 'https://github.com/orolboy-dev/sotibol.uz',
  },
  {
    icon: faCalculator,
    preview: 'calculator',
    image: '/assets/images/projects/kalkulyator.png',
    demoUrl: 'https://kalkulyator-blush.vercel.app/',
    githubUrl: 'https://github.com/orolboy-dev/kalkulyator',
  },
];

function ProjectPreview({ project, imageAlt }) {
  return (
    <div
      aria-hidden={!project.image || undefined}
      className={`project-preview project-preview-${project.preview}`}
    >
      {project.image && (
        <img
          alt={imageAlt}
          className={`block h-full w-full ${
            project.preview === 'calculator' ? 'object-contain' : 'object-cover'
          }`}
          loading="lazy"
          src={project.image}
        />
      )}
      {!project.image && project.preview === 'youtube' && (
        <div className="youtube-preview">
          <div className="youtube-preview-header">
            <span className="youtube-preview-brand">
              <FontAwesomeIcon icon={faYoutube} />
            </span>
            <span className="youtube-preview-search" />
            <span className="youtube-preview-avatar" />
          </div>
          <div className="youtube-preview-content">
            <div className="youtube-preview-sidebar">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="youtube-preview-videos">
              <div className="youtube-preview-feature">
                <FontAwesomeIcon icon={faPlay} />
              </div>
              <div className="youtube-preview-video">
                <span />
                <i />
                <i />
              </div>
              <div className="youtube-preview-video">
                <span />
                <i />
                <i />
              </div>
              <div className="youtube-preview-video">
                <span />
                <i />
                <i />
              </div>
            </div>
          </div>
        </div>
      )}
      {!project.image && project.preview === 'clock' && (
        <div className="clock-preview">
          <div className="clock-preview-face">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <span className="clock-preview-digital">10:09</span>
          <span className="clock-preview-caption" />
        </div>
      )}
      {!project.image && project.preview === 'mobile' && (
        <div className="mobile-preview">
          <div className="mobile-preview-phone">
            <span className="mobile-preview-notch" />
            <span className="mobile-preview-screen-title" />
            <span className="mobile-preview-device">
              <FontAwesomeIcon icon={faMobileScreenButton} />
            </span>
            <div className="mobile-preview-products">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="mobile-preview-orbit" />
        </div>
      )}
      {!project.image && project.preview === 'store' && (
        <div className="store-preview">
          <div className="store-preview-header">
            <span />
            <FontAwesomeIcon icon={faCartShopping} />
          </div>
          <div className="store-preview-banner">
            <span />
            <i />
          </div>
          <div className="store-preview-products">
            <span><i /></span>
            <span><i /></span>
            <span><i /></span>
          </div>
        </div>
      )}
      {!project.image && project.preview === 'calculator' && (
        <CalculatorPreview />
      )}
    </div>
  );
}

function ProjectCard({ project, index, text }) {
  const revealSide = index % 2 === 0 ? 'data-reveal-left' : 'data-reveal-right';
  return (
    <article
      className="group overflow-hidden rounded-2xl border border-white/10 bg-gray-700 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-blue-300/50 hover:shadow-blue-950/30"
      {...{ [revealSide]: '' }}
    >
      <ProjectPreview imageAlt={text.imageAlt} project={project} />
      <div className="p-6">
        <span className="text-sm font-medium text-blue-300">
          {text.project} 0{index + 1}
        </span>
        <div className="mt-2 flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-blue-300/25 bg-blue-400/10 text-blue-100">
            <FontAwesomeIcon
              aria-hidden="true"
              className="size-5"
              icon={project.icon}
            />
          </span>
          <h3 className="text-xl font-semibold text-white">{text.title}</h3>
        </div>
        <p className="mt-3 min-h-12 text-sm leading-6 text-gray-200">
          {text.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {project.demoUrl ? (
            <a
              className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400"
              href={project.demoUrl}
              rel="noreferrer"
              target="_blank"
            >
              {project.viewLabel}
            </a>
          ) : (
            <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300">
              {project.missingDemoLabel}
            </span>
          )}
          {project.githubUrl ? (
            <a
              className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:border-blue-300/50 hover:text-blue-200"
              href={project.githubUrl}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          ) : (
            <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300">
              {project.missingGithubLabel}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="max-w-2xl" data-reveal-left>
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-300">
            {t.projects.eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            {t.projects.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-200">
            {t.projects.intro}
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              index={index}
              key={`${project.preview}-${index}`}
              project={{
                ...project,
                viewLabel: t.projects.view,
                missingDemoLabel: t.projects.missingDemo,
                missingGithubLabel: t.projects.missingGithub,
              }}
              text={{
                ...t.projects.items[index],
                project: t.projects.project,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
