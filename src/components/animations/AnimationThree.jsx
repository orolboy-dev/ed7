import styled, { keyframes } from 'styled-components';

const glowSweep = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-55%);
  }
  15%,
  65% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(55%);
  }
`;

/* Harf animatsiyasi tezligini 3.2s qiymatini o'zgartirib sozlang. */
const letterGlow = keyframes`
  0%,
  100% {
    opacity: 0.35;
    text-shadow: none;
    transform: translateY(0);
  }
  8% {
    opacity: 1;
    text-shadow: 0 0 0.75rem #60a5fa;
    transform: translateY(-0.15rem);
  }
  25% {
    opacity: 0.5;
  }
`;

const Wrapper = styled.div`
  display: grid;
  min-height: 10rem;
  place-items: center;
  overflow: hidden;
  border: 1px solid rgb(147 197 253 / 18%);
  border-radius: 1rem;
  background: linear-gradient(145deg, #1f2937, #111827);

  .loader-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 5rem;
    padding: 0 1.5rem;
    color: #f8fafc;
    font-family: inherit;
    font-size: clamp(1.3rem, 5vw, 1.8rem);
    font-weight: 700;
    user-select: none;
  }

  .loader-letter {
    z-index: 2;
    display: inline-block;
    animation: ${letterGlow} 3.2s linear infinite;
  }

  .loader {
    position: absolute;
    z-index: 1;
    inset: 0;
    overflow: hidden;
    mask: repeating-linear-gradient(
      90deg,
      transparent 0,
      transparent 0.35rem,
      #000 0.42rem,
      #000 0.5rem
    );
  }

  .loader::after {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 50% 50%, #fff 0%, transparent 48%),
      radial-gradient(circle at 45% 45%, #60a5fa 0%, transparent 52%),
      radial-gradient(circle at 55% 55%, #bfdbfe 0%, transparent 55%);
    content: '';
    mask: radial-gradient(
      circle at 50% 50%,
      transparent 0%,
      transparent 10%,
      #000 68%
    );
    animation: ${glowSweep} 3.2s infinite alternate
      cubic-bezier(0.6, 0.8, 0.5, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    .loader-letter,
    .loader::after {
      animation: none;
    }
  }
`;

/* O'zgartiriladigan yozuv: <AnimationThree text="Developer" /> */
function AnimationThree({ text = 'Developer' }) {
  const letters = Array.from(text);

  return (
    <Wrapper
      aria-label={`${text} yozuvi yorug'lik bilan animatsiyalanadi`}
      role="img"
    >
      <div className="loader-wrapper">
        {letters.map((letter, index) => (
          <span
            className="loader-letter"
            key={`${letter}-${index}`}
            style={{ animationDelay: `${(index + 1) * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
        <div aria-hidden="true" className="loader" />
      </div>
    </Wrapper>
  );
}

export default AnimationThree;
