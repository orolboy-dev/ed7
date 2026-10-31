import styled, { keyframes } from 'styled-components';

const loadingBounce = keyframes`
  0% {
    transform: scale(1, 0.7);
  }

  40% {
    transform: scale(0.8, 1.2);
  }

  60% {
    transform: scale(1, 1);
  }

  100% {
    bottom: 140px;
  }
`;

const loadingStep = keyframes`
  0% {
    box-shadow:
      0 10px 0 rgba(0, 0, 0, 0),
      0 10px 0 #f2f2f2,
      -35px 50px 0 #f2f2f2,
      -70px 90px 0 #f2f2f2;
  }

  100% {
    box-shadow:
      0 10px 0 #f2f2f2,
      -35px 50px 0 #f2f2f2,
      -70px 90px 0 #f2f2f2,
      -70px 90px 0 rgba(0, 0, 0, 0);
  }
`;

const StyledWrapper = styled.div`
  display: grid;
  min-height: 12rem;
  place-items: center;
  overflow: hidden;
  border: 1px solid rgb(147 197 253 / 18%);
  border-radius: 1rem;
  background: linear-gradient(145deg, #1f2937, #111827);

  .loader {
    position: relative;
    width: 120px;
    height: 90px;
    margin: 0 auto;
  }

  .loader::before {
    position: absolute;
    bottom: 30px;
    left: 50px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #60a5fa;
    box-shadow: 0 0 24px rgb(96 165 250 / 65%);
    content: '';
    animation: ${loadingBounce} 0.5s ease-in-out infinite alternate;
  }

  .loader::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 45px;
    height: 7px;
    border-radius: 4px;
    background: #f2f2f2;
    content: '';
    box-shadow:
      0 5px 0 #f2f2f2,
      -35px 50px 0 #f2f2f2,
      -70px 95px 0 #f2f2f2;
    animation: ${loadingStep} 1s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .loader::before,
    .loader::after {
      animation: none;
    }
  }
`;

function AnimationOne() {
  return (
    <StyledWrapper aria-label="Ko'k to'p sakraydigan loader" role="img">
      <div className="loader" />
    </StyledWrapper>
  );
}

export default AnimationOne;
