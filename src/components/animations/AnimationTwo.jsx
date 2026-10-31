import styled, { keyframes } from 'styled-components';

/* Sakrash tezligi bounce va shadowBounce keyframes duration qiymatlarida. */
const bounce = keyframes`
  0% {
    top: 3.5rem;
    height: 0.35rem;
    border-radius: 50%;
    transform: scaleX(1.7);
  }
  40% {
    height: 1.25rem;
    border-radius: 50%;
    transform: scaleX(1);
  }
  100% {
    top: 0;
  }
`;

const shadowBounce = keyframes`
  0% {
    transform: scaleX(1.5);
    opacity: 0.8;
  }
  40% {
    transform: scaleX(1);
    opacity: 0.55;
  }
  100% {
    transform: scaleX(0.3);
    opacity: 0.25;
  }
`;

const Wrapper = styled.div`
  display: grid;
  min-height: 10rem;
  place-items: center;
  border: 1px solid rgb(147 197 253 / 18%);
  border-radius: 1rem;
  background: linear-gradient(145deg, #1f2937, #111827);

  .wrapper {
    position: relative;
    width: 12.5rem;
    height: 5rem;
  }

  .circle,
  .shadow {
    position: absolute;
    left: 15%;
    width: 1.25rem;
    border-radius: 50%;
    transform-origin: 50%;
    animation: ${bounce} 0.7s alternate infinite ease;
  }

  .circle {
    height: 1.25rem;
    background: #60a5fa;
    box-shadow: 0 0 1rem rgb(96 165 250 / 65%);
  }

  .circle:nth-child(2),
  .shadow:nth-child(5) {
    left: 45%;
    animation-delay: 0.18s;
  }

  .circle:nth-child(3),
  .shadow:nth-child(6) {
    right: 15%;
    left: auto;
    animation-delay: 0.32s;
  }

  .shadow {
    top: 3.8rem;
    height: 0.3rem;
    background: #bfdbfe;
    filter: blur(0.2rem);
    animation-name: ${shadowBounce};
  }

  @media (prefers-reduced-motion: reduce) {
    .circle,
    .shadow {
      animation: none;
    }
  }
`;

function AnimationTwo() {
  return (
    <Wrapper aria-label="Uch ko'k sharcha sakraydigan loader" role="img">
      <div className="wrapper">
        <div className="circle" />
        <div className="circle" />
        <div className="circle" />
        <div className="shadow" />
        <div className="shadow" />
        <div className="shadow" />
      </div>
    </Wrapper>
  );
}

export default AnimationTwo;
