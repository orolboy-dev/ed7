import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import {
  faCartShopping,
  faClock,
  faMobileScreenButton,
} from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../LanguageContext';

/* Loyiha ikonkalari, rasmlari va URL'lari shu ro'yxatda tahrir qilinadi. */
const projects = [
  {
    icon: faYoutube,
    image: '/assets/images/projects/project-1.jpg',
    demoUrl: 'https://orolboy-dev-youtube-clone.vercel.app/',
    githubUrl: 'https://github.com/orolboy-dev/orolboy-dev-youtube-clone',
  },
  {
    icon: faClock,
    image: '/assets/images/projects/project-2.jpg',
    demoUrl: 'https://soat-topaz.vercel.app/',
    githubUrl: 'https://github.com/orolboy-dev/soat',
  },
  {
    icon: faMobileScreenButton,
    image: '/assets/images/projects/project-3.jpg',
    demoUrl: 'https://telhub.vercel.app/',
    githubUrl: 'https://github.com/orolboy-dev/Demodey',
  },
  {
    icon: faCartShopping,
    image: '/assets/images/projects/project-4.jpg',
    demoUrl: '',
    githubUrl: 'https://github.com/orolboy-dev/orolboy-dev-sotibol.uz',
  },
];

function ProjectCard({ project, index, text }) {
  const revealSide = index % 2 === 0 ? 'data-reveal-left' : 'data-reveal-right';
  return (
    <article
      className="group overflow-hidden rounded-2xl border border-white/10 bg-gray-700 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-1 hover:border-blue-300/50 hover:shadow-blue-950/30"
      {...{ [revealSide]: '' }}
    >
      <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-blue-950 via-gray-800 to-gray-900">
        <img
          alt={text.imageAlt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          src={project.image}
          onError={(event) => {
            event.currentTarget.hidden = true;
          }}
        />
      </div>
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
              key={`${project.image}-${index}`}
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
