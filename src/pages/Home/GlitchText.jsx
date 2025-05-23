import React, { useState, useEffect } from "react";
import styled from "styled-components";

// ---- Styled Components ----
const GlitchWrap = styled.span`
  display: inline-block;
  position: relative;
  font-family: 'Inter Tight', 'Montserrat', Arial, sans-serif;
  font-weight: 900;
  font-size: 7vw;
  letter-spacing: -2.1px;
  text-transform: uppercase;
  user-select: text;
  cursor: pointer;
  line-height: 1.05;
`;

const MainLayer = styled.span`
  position: relative;
  z-index: 5;
  background: linear-gradient(99deg, #fff 31%, #2bf4ff 64%, #e636ff 90%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: brightness(1.05) contrast(1.09);
`;

const SplitLayer = styled.span`
  position: absolute;
  left: 0; top: 0; width: 100%; height: 100%;
  pointer-events: none; user-select: none;
  z-index: ${({ z }) => z || 2};
  color: ${({ color }) => color};
  opacity: ${({ $glitch, opacity }) => ($glitch ? opacity : 0)};
  mix-blend-mode: lighten;
  text-shadow: ${({ color }) =>
    color === "#0ff"
      ? "0 0 2px #0ff, 0 0 7px #2bf4ff"
      : "0 0 2px #ff2e9b, 0 0 7px #e636ff"};
  transform: ${({ x, y, scale, skewX, skewY }) =>
    `translate(${x}px, ${y}px) scale(${scale}) skew(${skewX}deg,${skewY}deg)`};
  filter: blur(${({ blur }) => blur || 0}px);
  will-change: transform, opacity;
  transition: opacity 0.14s cubic-bezier(.4,1,.43,1);
`;

const SliceLine = styled.span`
  position: absolute;
  left: 0;
  width: 100%;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
  z-index: 9;
  color: #fff;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  text-transform: inherit;
  letter-spacing: inherit;
  text-shadow: 0 0 2px #0ff, 1px 1px 8px #e636ff;
  opacity: ${({ $glitch, opacity }) => ($glitch ? opacity : 0)};
  filter: blur(${({ blur }) => blur}px);
  transform: ${({ x, skewX }) => `translateX(${x}px) skewX(${skewX}deg)`};
  top: ${({ y }) => y}%;
  height: ${({ height }) => height}%;
  transition: opacity 0.11s;
`;

// ---- Glitch Logic ----
function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function useGlitchState(text, active) {
  const [split, setSplit] = useState([
    { x: 0, y: 0, scale: 1, opacity: 0, blur: 0, skewX: 0, skewY: 0 },
    { x: 0, y: 0, scale: 1, opacity: 0, blur: 0, skewX: 0, skewY: 0 },
  ]);
  const [slices, setSlices] = useState([]);

  useEffect(() => {
    if (!active) {
      setSplit([
        { x: 0, y: 0, scale: 1, opacity: 0, blur: 0, skewX: 0, skewY: 0 },
        { x: 0, y: 0, scale: 1, opacity: 0, blur: 0, skewX: 0, skewY: 0 },
      ]);
      setSlices([]);
      return;
    }
    let running = true;
    function updateGlitch() {
      if (!running) return;
      setSplit([
        {
          x: randomBetween(1.2, 4.4) * (Math.random() < 0.5 ? -1 : 1),
          y: randomBetween(-2.7, 2.4),
          scale: randomBetween(0.97, 1.06),
          opacity: randomBetween(0.42, 0.73),
          blur: randomBetween(0, 0.7),
          skewX: randomBetween(-3, 3),
          skewY: randomBetween(-2, 2),
        },
        {
          x: randomBetween(1.1, 4.6) * (Math.random() < 0.5 ? -1 : 1),
          y: randomBetween(-2.7, 2.4),
          scale: randomBetween(0.97, 1.07),
          opacity: randomBetween(0.37, 0.71),
          blur: randomBetween(0, 0.5),
          skewX: randomBetween(-2, 2),
          skewY: randomBetween(-1.4, 1.8),
        }
      ]);
      setSlices(
        Array.from({ length: Math.floor(1 + Math.random() * 4) }).map(() => ({
          key: Math.random().toString(36).slice(2, 11),
          x: randomBetween(-12, 14),
          y: randomBetween(0, 100),
          height: randomBetween(3, 17),
          opacity: randomBetween(0.23, 0.65),
          blur: Math.random() < 0.5 ? 0 : randomBetween(0.07, 1.8),
          skewX: randomBetween(-2, 2),
        }))
      );
      setTimeout(updateGlitch, 42 + Math.random() * 52);
    }
    updateGlitch();
    return () => { running = false; };
  }, [active, text]);
  return { split, slices };
}

// ---- Component ----
export function GlitchText({ children }) {
  const [active, setActive] = useState(false);
  const { split, slices } = useGlitchState(children, active);

  return (
    <GlitchWrap
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      tabIndex={0}
      style={{ outline: "none" }}
    >
      <MainLayer>{children}</MainLayer>
      <SplitLayer
        color="#ff2e9b"
        x={split[0].x}
        y={split[0].y}
        scale={split[0].scale}
        opacity={split[0].opacity}
        blur={split[0].blur}
        skewX={split[0].skewX}
        skewY={split[0].skewY}
        z={6}
        $glitch={active}
        aria-hidden
      >
        {children}
      </SplitLayer>
      <SplitLayer
        color="#0ff"
        x={split[1].x}
        y={split[1].y}
        scale={split[1].scale}
        opacity={split[1].opacity}
        blur={split[1].blur}
        skewX={split[1].skewX}
        skewY={split[1].skewY}
        z={5}
        $glitch={active}
        aria-hidden
      >
        {children}
      </SplitLayer>
      {slices.map((s) => (
        <SliceLine
          key={s.key}
          x={s.x}
          y={s.y}
          height={s.height}
          opacity={s.opacity}
          blur={s.blur}
          skewX={s.skewX}
          $glitch={active}
          aria-hidden
        >
          {children}
        </SliceLine>
      ))}
    </GlitchWrap>
  );
}
