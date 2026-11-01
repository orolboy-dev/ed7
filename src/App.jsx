import { useEffect, useRef } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import About from './components/About';
import Animations from './components/Animations';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';

function Portfolio() {
  const portfolioRef = useRef(null);
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [hash, key]);

  useEffect(() => {
    const portfolio = portfolioRef.current;
    if (!portfolio) return undefined;

    const tiltElements = portfolio.querySelectorAll('[data-tilt]');
    const tiltCleanups = [];

    tiltElements.forEach((element) => {
      const handlePointerMove = (event) => {
        if (event.pointerType === 'touch') return;

        const bounds = element.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;

        element.style.setProperty('--tilt-x', `${(0.5 - y) * 8}deg`);
        element.style.setProperty('--tilt-y', `${(x - 0.5) * 8}deg`);
      };
      const resetTilt = () => {
        element.style.setProperty('--tilt-x', '0deg');
        element.style.setProperty('--tilt-y', '0deg');
      };

      element.addEventListener('pointermove', handlePointerMove);
      element.addEventListener('pointerleave', resetTilt);
      tiltCleanups.push(() => {
        element.removeEventListener('pointermove', handlePointerMove);
        element.removeEventListener('pointerleave', resetTilt);
        resetTilt();
      });
    });

    const revealElements = portfolio.querySelectorAll(
      '[data-reveal], [data-reveal-left], [data-reveal-right]',
    );
    const canReveal =
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      'IntersectionObserver' in window;
    let observer;

    if (canReveal) {
      portfolio.classList.add('has-scroll-reveal');
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.15 },
      );
      revealElements.forEach((element) => observer.observe(element));
    }

    return () => {
      tiltCleanups.forEach((cleanup) => cleanup());
      if (observer) observer.disconnect();
      portfolio.classList.remove('has-scroll-reveal');
      revealElements.forEach((element) => element.classList.remove('is-visible'));
    };
  }, []);

  return (
    <div ref={portfolioRef}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Animations />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Portfolio />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
