import { useLanguage } from '../LanguageContext';
import AnimationOne from './animations/AnimationOne';
import AnimationThree from './animations/AnimationThree';
import AnimationTwo from './animations/AnimationTwo';
import ThreeDShapes from './ThreeDShapes';

const demoTypes = ['fly', 'scatter', 'roll', 'pulse', 'tilt', 'glow'];
const loaderComponents = [AnimationOne, AnimationTwo, AnimationThree];

function AnimationPreview({ animation }) {
  const handlePointerMove = (event) => {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty('--tilt-x', `${(0.5 - y) * 18}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${(x - 0.5) * 18}deg`);
  };

  const resetTilt = (event) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  if (animation === 'fly') {
    return <div aria-hidden="true" className="animation-stage"><span className="animation-shape animation-shape-fly" /></div>;
  }
  if (animation === 'scatter') {
    return (
      <div aria-hidden="true" className="animation-stage">
        {[1, 2, 3, 4, 5].map((number) => (
          <span key={number} className={`animation-shape animation-particle animation-particle-${['one', 'two', 'three', 'four', 'five'][number - 1]}`} />
        ))}
      </div>
    );
  }
  if (animation === 'pulse') {
    return <div aria-hidden="true" className="animation-stage"><span className="animation-shape animation-shape-pulse" /></div>;
  }
  if (animation === 'tilt') {
    return (
      <div aria-hidden="true" className="animation-stage animation-tilt-stage" onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
        <span className="animation-shape animation-shape-tilt" />
      </div>
    );
  }
  if (animation === 'glow') {
    return <div aria-hidden="true" className="animation-stage"><span className="animation-glow-demo"><span className="animation-glow-demo-inner">NEON</span></span></div>;
  }
  return <div aria-hidden="true" className="animation-stage"><span className="animation-shape animation-shape-roll" /></div>;
}

function Animations() {
  const { t } = useLanguage();
  const text = t.animations;

  return (
    <section aria-labelledby="animations-title" className="border-y border-white/10 bg-slate-950/45" data-reveal-left id="animations">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-300">{text.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl" id="animations-title">{text.title}</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">{text.intro}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {demoTypes.map((animation, index) => (
            <div className="animation-card-glow" key={animation}>
              <article className="animation-card">
                <AnimationPreview animation={animation} />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white">{text.demos[index].name}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{text.demos[index].description}</p>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-300">{text.threeDLabel}</p>
            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{text.threeDTitle}</h3>
            <p className="mt-4 text-base leading-7 text-slate-300">{text.threeDIntro}</p>
          </div>
          <ThreeDShapes translations={text} />
        </div>

        <div className="mt-16">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-blue-300">{text.styledComponents}</p>
            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{text.loadersTitle}</h3>
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {loaderComponents.map((Component, index) => (
              <article className="overflow-hidden rounded-2xl border border-blue-200/10 bg-slate-900/80 p-4 shadow-lg shadow-black/20" key={index}>
                <Component />
                <div className="px-1 pb-1 pt-4">
                  <h4 className="text-lg font-semibold text-white">{text.loaders[index].name}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{text.loaders[index].description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Animations;
