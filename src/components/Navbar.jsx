import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(
    () => window.localStorage.getItem('portfolio-theme') === 'light',
  );
  const languageMenuRef = useRef(null);
  const { currentLang, setCurrentLang, t } = useLanguage();
  const language = currentLang.toUpperCase();
  const text = t.navbar;
  const links = [
    { href: '#about', label: text.about },
    { href: '#skills', label: text.skills },
    { href: '#animations', label: text.animations },
    { href: '#projects', label: text.projects },
    { href: '#contact', label: text.contact },
  ];

  useEffect(() => {
    const theme = isLightTheme ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('portfolio-theme', theme);
  }, [isLightTheme]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    if (!languageMenuOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!languageMenuRef.current?.contains(event.target)) {
        setLanguageMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () =>
      document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, [languageMenuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const selectLanguage = (code) => {
    setCurrentLang(code);
    setLanguageMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-700/90 text-white shadow-lg shadow-black/10 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-1 px-3 py-3 sm:gap-2 sm:px-6 sm:py-4">
        <Link
          className="min-w-0 shrink text-[0.8rem] font-bold tracking-tight text-white transition hover:text-blue-200 sm:shrink-0 sm:text-lg"
          to="#home"
          onClick={closeMenu}
        >
          {/* O'rolboy jumanazrov*/}
          O'rolboy Jumanazrov<span className="text-blue-300">.</span>
        </Link>

        <nav
          aria-label={text.navigation}
          className="hidden items-center gap-8 text-sm text-gray-100 md:flex"
        >
          {links.map(({ href, label }) => (
            <Link
              className="transition hover:text-blue-200"
              to={href}
              key={href}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <button
            aria-label={isLightTheme ? text.darkMode : text.lightMode}
            aria-pressed={isLightTheme}
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-blue-300 hover:bg-blue-400/10 hover:text-blue-100 sm:size-10"
            type="button"
            onClick={() => setIsLightTheme((isLight) => !isLight)}
          >
            {isLightTheme ? (
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8 8.5 8.5 0 1 0 20.2 15.3Z"
                />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="4" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
                />
              </svg>
            )}
          </button>

          <a
            aria-label={text.github}
            className="hidden size-10 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-blue-300 hover:bg-blue-400/10 hover:text-blue-100 sm:inline-flex"
            href="https://github.com/orolboy-dev"
            rel="noreferrer"
            target="_blank"
            title={text.githubTitle}
          >
            <svg
              aria-hidden="true"
              className="size-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.3-1.24-1.65-1.24-1.65-1.01-.7.08-.69.08-.69 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.28 3.86 1.62.1-.73.39-1.22.7-1.5-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.24-5.1 5.52.4.35.75 1.02.75 2.06v3.05c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
            </svg>
            <span className="sr-only">GitHub</span>
          </a>

          <div className="relative" ref={languageMenuRef}>
            <button
              aria-controls="language-menu"
              aria-expanded={languageMenuOpen}
              aria-haspopup="listbox"
              aria-label={`${text.language}: ${language}`}
              className="inline-flex min-w-[3.5rem] items-center justify-between gap-1 rounded-full border border-blue-200/30 bg-gray-800/90 px-2 py-2 text-sm font-semibold text-white shadow-[0_0_16px_rgba(59,130,246,0.12)] outline-none transition duration-200 hover:border-blue-300/70 hover:bg-blue-950/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] focus-visible:ring-2 focus-visible:ring-blue-300 sm:min-w-[6.25rem] sm:gap-2 sm:px-3.5"
              type="button"
              onClick={() => setLanguageMenuOpen((isOpen) => !isOpen)}
            >
              <span>{language}</span>
              <svg
                aria-hidden="true"
                className={`size-4 text-blue-200 transition-transform duration-200 ${
                  languageMenuOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m6 9 6 6 6-6"
                />
              </svg>
            </button>
            {languageMenuOpen && (
              <ul
                aria-label={text.language}
                className="absolute right-0 top-full z-50 mt-2 min-w-40 overflow-hidden rounded-xl border border-blue-200/20 bg-gray-800/95 p-1.5 shadow-[0_12px_35px_rgba(0,0,0,0.4),0_0_20px_rgba(59,130,246,0.16)] backdrop-blur-xl"
                id="language-menu"
                role="listbox"
              >
                {Object.entries(text.languages).map(([code, label]) => (
                  <li key={code} role="presentation">
                    <button
                      aria-selected={currentLang === code}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                        currentLang === code
                          ? 'bg-blue-500/20 text-blue-100'
                          : 'text-gray-200 hover:bg-white/10 hover:text-white'
                      }`}
                      role="option"
                      type="button"
                      onClick={() => selectLanguage(code)}
                    >
                      <span className="w-7 font-bold">{code}</span>
                      <span>{label}</span>
                      {currentLang === code && (
                        <svg
                          aria-hidden="true"
                          className="ml-auto size-4 text-blue-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m5 12 4 4L19 6"
                          />
                        </svg>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            aria-label={menuOpen ? text.closeMenu : text.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="inline-flex size-9 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-blue-300 hover:text-blue-200 sm:size-10 md:hidden"
            type="button"
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            {menuOpen ? (
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m6 6 12 12M18 6 6 18"
                />
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <nav
        aria-label={text.mobileNavigation}
        aria-hidden={!menuOpen}
        className={`${menuOpen ? 'mobile-navigation-enter' : 'hidden'} border-t border-white/10 bg-gray-700/95 px-4 py-3 backdrop-blur-xl sm:px-6 md:hidden`}
        id="mobile-navigation"
      >
        <ul className="mx-auto flex max-w-6xl flex-col">
          {links.map(({ href, label }, index) => (
            <li key={href} style={{ '--menu-item-index': index }}>
              <Link
                className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-gray-100 transition hover:bg-white/10 hover:text-blue-200"
                to={href}
                onClick={closeMenu}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
