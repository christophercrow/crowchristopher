// src/pages/Home/index.jsx
import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import nebulaImg from "../../assets/images/nebula.png";
import CanvasBackground from "../../components/CanvasBackground";
import Footer from "../../components/layout/Footer";
import DesktopNav from "../../components/layout/DesktopNav";

import { useInViewSection } from "../../hooks/useInViewSection";
import FadeInImg from "../../components/ui/FadeInImg";

// --- Images (update paths as needed)
import closetPic from "../../assets/images/closet-pic.png";
import dormOveralls from "../../assets/images/dorm-overalls.png";
import groupSelf from "../../assets/images/group-self.png";
import jeenTree from "../../assets/images/jeen-tree.png";
import meAlbert from "../../assets/images/me-albert.png";
import physConf from "../../assets/images/phys-conf.png";
import planetarium from "../../assets/images/planetarium.png";
import wallShoe from "../../assets/images/wall-shoe.png";

import Cursor from "../../components/ui/Cursor";
// --- React.lazy for heavy 3D Pin Cards ---
const Animated3DPinCardFramer = React.lazy(() => import("../../components/framer/3dpin-card"));

// --- Font
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap";

// --- SPLIT BACKGROUND ---
const MainBg = styled.div`
  width: 100vw; min-height: 100vh;
  overflow: hidden;
  position: relative;
  padding-top: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SplitBg = styled.div`
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 1;
`;
const LeftSplit = styled.div`
  width: 50vw; height: 110vh;
  background: linear-gradient(120deg,
    #221533 70%,
    #413067 92%,
    #836fa9 100%
  );
  position: relative;
  overflow: clip;
`;

const RightSplit = styled.div`
  width: 50vw; height: 110vh;
  background: linear-gradient(120deg,
    #113122 60%,
    #1e5042 90%,
    #57a68b 120%
  );
  position: relative;
  overflow: clip;
`;

const CenterDivider = styled.div`
  position: absolute; left: 50%; top: 0;
  width: 5px; height: 100vh;
  background: linear-gradient(180deg, #47ffe9 18%, #00e0ff33 50%, #1a2a41 100%);
  z-index: 8;
  opacity: 0.63;
`;

// --- Side Cards, moved up & in ---
const sideCardAnim = keyframes`
  from { opacity: 0; transform: translateY(54px) scale(0.90);}
  to { opacity: 1; transform: translateY(0) scale(1);}
`;

const SideCard = styled.div`
  position: absolute;
  top: 27%;
  opacity: 0.10;
  min-width: 470px; max-width: 600px;
  min-height: 520px; max-height: 730px;
  display: flex; flex-direction: column;
  align-items: center;
  background: none; border: none; box-shadow: none; z-index: 40;
  animation: ${css`${sideCardAnim} 1.1s cubic-bezier(.44,1.7,.38,1) 0.7s both`};
  @media (max-width: 1300px) { display: none; }
`;

const LeftCard = styled(SideCard)` left: 2vw; align-items: flex-end; `;
const RightCard = styled(SideCard)` right: 2vw; align-items: flex-start; `;

const nameRowAnim = keyframes`
  from { opacity: 0; transform: scale(0.86) translateY(-90px);}
  75% { opacity: 1; transform: scale(1.08) translateY(14px);}
  to { opacity: 1; transform: scale(1) translateY(0);}
`;

const NameRow = styled.div`
  position: absolute;
  left: 28.4%; top: 35%;
  transform: translate(-50%, -50%);
  z-index: 15;
  display: flex;
  align-items: center;
  user-select: text;
  pointer-events: auto;
  animation: ${css`${nameRowAnim} 1.07s cubic-bezier(.44,1.6,.38,1) both`};
`;
const NameLeft = styled.span`
  font-family: 'Inter Tight', Arial, sans-serif;
  font-size: 8vw;
  font-weight: 900;
  letter-spacing: -2.2px;
  color: #1a173c;
  margin: 0 0.09em 0 0;
  line-height: 1.04;
  background: linear-gradient(275deg,#6a75b7 40%,#25325c 70%, #48b1eb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 5.5px #191a22;
  text-shadow:
    0 0 18px #649bec85,
    0 2px 15px #3a5178;
  filter: drop-shadow(0 12px 42px #00caff28);
  transition: text-shadow 0.18s;
  cursor: pointer;
  user-select: text;
  &:hover {
    text-shadow:
      0 0 32px #0e0a2f,
      0 10px 10px #00ffe163,
      0 2px 26px #1f6febbb;
  }
  mix-blend-mode: lighten;
`;

const NameRight = styled.span`
  font-family: 'Inter Tight', Arial, sans-serif;
  font-size: 8vw;
  font-weight: 900;
  letter-spacing: -2.2px;
  color: #1a173c;
  margin: 0 0.09em 0 0;
  line-height: 1.04;
  background: linear-gradient(275deg,#6a75b7 40%,#25325c 70%, #48b1eb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 5.5px #191a22;
  text-shadow:
    0 0 18px #649bec85,
    0 2px 15px #3a5178;
  filter: drop-shadow(0 12px 42px #00caff28);
  transition: text-shadow 0.18s;
  cursor: pointer;
  user-select: text;
  &:hover {
    text-shadow:
      0 0 32px #0e0a2f,
      0 10px 10px #00ffe163,
      0 2px 26px #1f6febbb;
  }
  mix-blend-mode: lighten;
`;

const NameBadgeWrap = styled.div`
  position: absolute;
  left: 28.6%;
  top: 36.5%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 21;
  pointer-events: none;
`;
const RoleBadge = styled.div`
  position: absolute;
  width: 11.2em;
  height: 2.2em;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: linear-gradient(135deg, rgba(36,41,59,0.99) 60%, rgba(44,56,95,0.92) 100%);
  color: #ffaa00;
  font-size: 2.5em;
  font-family: 'Fira Mono', 'Consolas', 'Liberation Mono', monospace;
  font-weight: 800;
  letter-spacing: 0.02em;
  border-radius: 0.6em;
  border: 2.5px solid transparent;
  box-shadow:
    0 3px 22px 4px #47ffe942,
    0 0.5px 10px 2px #151925d4,
    0 0 0 4px #1f6feb44;
  user-select: none;
  z-index: 50;
  white-space: nowrap;
  pointer-events: auto;
  opacity: 0.99;
  transition: background 0.25s, color 0.23s, box-shadow 0.23s, border 0.23s;
  text-shadow:
    0 2px 14px #47ffe9,
    0 1.5px 3px #1f6feb,
    0 0 2px #000;
  backdrop-filter: blur(3.5px) brightness(0.9);

  &::before {
    content: "";
    position: absolute;
    inset: 0.1em;
    border-radius: 0.55em;
    background: radial-gradient(ellipse at 60% 20%, #47ffe925 28%, transparent 80%);
    z-index: -1;
    pointer-events: none;
    filter: blur(1.5px);
    opacity: 0.85;
  }

  &:hover, &:focus {
    box-shadow:
      0 6px 38px 8px #47ffe9b7,
      0 1.5px 20px 5px #1f6febcc,
      0 0 0 8px #47ffe965;
    color: #fff;
    background: linear-gradient(100deg, rgba(44,66,101,0.99) 25%, #1f6feb 85%);
    outline: black 2px solid;
  }

  &.top-left {
    left: 0em;
    top: -1.5em;
  }
  &.bottom-left {
    left: 0em;
    bottom: -6.7em;
  }
  &.top-right {
    right: -24.7em;
    top: -1.5em;
  }
  &.bottom-right {
    right: -24.7em;
    bottom: -6.7em;
  }
  @media (max-width: 900px) {
    font-size: 1.1em;
    width: 8.8em;
    height: 2.2em;
    padding: 0 0.03em;
    border-radius: 0.28em;
    position: static;
    margin: 0.25em 0.4em;
    display: inline-flex;
    box-shadow: 0 4px 24px 0 #47ffe942, 0 1.5px 5px 0 #151925b8;
  }
`;
// --- Scattered photo logic and layout ---
const ScatteredPhoto = styled.div`
  position: absolute;
  ${({ left, top }) => css`left: ${left}; top: ${top};`}
  z-index: ${({ z }) => z || 3};
  transform: ${({ rotate }) => `rotate(${rotate || 0}deg)`};
  box-shadow:
    0 10px 32px 0 #182a4444,
    0 1px 6px 1.5px #131d3351;
  transition: filter 0.25s, box-shadow 0.25s, transform 0.24s;
  &:hover, &:focus {
    z-index: 99;
    filter: brightness(1.09) saturate(1.11);
    box-shadow:
      0 14px 48px 6px #47ffe988,
      0 2px 22px 6px #1f6feb44;
    transform: ${({ rotate }) => `scale(1.07) rotate(${rotate || 0}deg)`};
  }
`;

const photoLayout = [
  { left: "16%", top: "22%", rotate: -17, z: 6 },
  { left: "32%", top: "14%", rotate: 9, z: 7 },
  { left: "44%", top: "5%",  rotate: -6, z: 6 },
  { left: "65%", top: "27%", rotate: 15, z: 5 },
  { left: "25%", top: "65%", rotate:-25, z: 9 },
  { left: "42%", top: "58%", rotate: 7, z: 6 },
  { left: "26%", top: "53%", rotate: -11, z: 6 },
  { left: "10%", top: "36%", rotate: 13, z: 5 },
];

const gridTiles = [
  { img: closetPic, alt: "PC Build", width: 375, height: 500, info: "Built my first custom PC..." },
  { img: dormOveralls, alt: "Dorm selfie", width: 285, height: 420, info: "Survived and thrived at UNC..." },
  { img: groupSelf, alt: "Conference crew", width: 440, height: 330, info: "Led my physics group..." },
  { img: jeenTree, alt: "Jeen tree", width: 320, height: 430, info: "Favorite thinking spot..." },
  { img: meAlbert, alt: "With Albert", width: 375, height: 375, info: "Albert Einstein statue..." },
  { img: planetarium, alt: "Planetarium", width: 220, height: 330, info: "Organized astronomy nights..." },
  { img: physConf, alt: "Physics conference", width: 220, height: 350, info: "Presented neutron star research..." },
  { img: wallShoe, alt: "Shoe on wall", width: 290, height: 330, info: "My sneaker collection..." },
];

// --- Glitch Text Component ---
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

function useGridInView(num) {
  const [inView, setInView] = useState(Array(num).fill(false));
  const refs = useRef([]);
  useEffect(() => {
    refs.current = refs.current.slice(0, num);
    refs.current.forEach((node, i) => {
      if (!node) return;
      if (inView[i]) return;
      const obs = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(prev => {
              const arr = [...prev];
              arr[i] = true;
              return arr;
            });
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(node);
    });
  }, [inView, num]);
  return [refs, inView];
}

// --- Card Props ---
const aboutCardProps = {
  cardBody: {
    borderRadius: "26px",
    borderColor: "#28384c",
    borderHoverColor: "#47ffe9",
    backgroundColor: "rgba(36,41,59,0.99)",
    borderWidth: 4
  },
  pin: {
    backgroundColor: "#47ffe9",
    textColor: "#1f6feb",
    lineColorPrimary: "#47ffe9",
    lineColorSecondary: "#1f6feb",
    font: { fontSize: "1.12em", fontWeight: "bold" },
    title: "About Chris"
  },
  title: {
    text: "Science & Life",
    color: "#e7f7ff",
    font: { fontWeight: "bold" }
  },
  subtitle: {
    text: "Physics, coding, and curiosity power everything I do.",
    color: "#aec2e6",
    font: { fontWeight: 400 }
  },
  image: {
    borderRadius: "24px",
    image: { src: jeenTree }
  },
  techIcons: []
};

const projectCardProps = {
  cardBody: {
    borderRadius: "26px",
    borderColor: "#28384c",
    borderHoverColor: "#47ffe9",
    backgroundColor: "rgba(36,41,59,0.99)",
    borderWidth: 4
  },
  pin: {
    backgroundColor: "#1f6feb",
    textColor: "#47ffe9",
    lineColorPrimary: "#1f6feb",
    lineColorSecondary: "#47ffe9",
    font: { fontSize: "1.12em", fontWeight: "bold" },
    title: "Project Demos"
  },
  title: {
    text: "Code & Projects",
    color: "#e7f7ff",
    font: { fontWeight: "bold" }
  },
  subtitle: {
    text: "Production-ready, automated, and visually stunning solutions.",
    color: "#aec2e6",
    font: { fontWeight: 400 }
  },
  image: {
    borderRadius: "24px",
    image: { src: physConf }
  },
  techIcons: []
};

// --- Main Home Component ---
export default function Home() {
  useEffect(() => {
    if (!document.getElementById("inter-tight-font")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = FONT_LINK;
      link.id = "inter-tight-font";
      document.head.appendChild(link);
    }
  }, []);

  // Side cards lazy-load
  const [leftCardRef, leftCardInView] = useInViewSection();
  const [rightCardRef, rightCardInView] = useInViewSection();

  // Orbit photo grid inView/fade-in (not strictly needed for static photos, but future-proof)
  const [photoRefs, photoInViewState] = useGridInView(gridTiles.length);

  return (
    <>
      <Cursor />
      <Helmet>
        <title>Chris Crow | Portfolio</title>
      </Helmet>
      <MainBg>
        <DesktopNav/>
        <SplitBg>
          <CanvasBackground side="left" nebulaImg={nebulaImg} />
          <CanvasBackground side="right" />
          <LeftSplit />
          <RightSplit />
          <CenterDivider />
        </SplitBg>
        {/* Lazy-load Side Cards */}
        <LeftCard ref={leftCardRef}>
          {leftCardInView && (
            <React.Suspense fallback={null}>
              <Animated3DPinCardFramer {...aboutCardProps} />
            </React.Suspense>
          )}
        </LeftCard>
        <RightCard ref={rightCardRef}>
          {rightCardInView && (
            <React.Suspense fallback={null}>
              <Animated3DPinCardFramer {...projectCardProps} />
            </React.Suspense>
          )}
        </RightCard>
        {/* Scattered Photo Grid */}
        {gridTiles.map((tile, i) => (
          <ScatteredPhoto
            key={i}
            left={photoLayout[i].left}
            top={photoLayout[i].top}
            z={photoLayout[i].z}
            rotate={tile.rotate}
            tabIndex={0}
          >
            <img
              src={tile.img}
              alt={tile.alt}
              width={tile.width}
              height={tile.height}
              style={{
                display: "block",
                borderRadius: 18,
                boxShadow: "0 8px 32px #0002",
                background: "#161e2d",
                border: "2.5px solid #fff",
                maxWidth: "min(36vw, 650px)",
                maxHeight: "min(36vh, 760px)",
                objectFit: "cover",
                transform: `rotate(${tile.rotate}deg)`
              }}
              draggable={false}
            />
          </ScatteredPhoto>
        ))}
        {/* Name & Role badges */}
        <NameBadgeWrap>
          <NameRow>
            <NameLeft>
              <GlitchText>Chris</GlitchText>
            </NameLeft>
            <NameRight>
              <GlitchText>Crow</GlitchText>
            </NameRight>
          </NameRow>
          <RoleBadge className="top-left">Astrophysicist</RoleBadge>
          <RoleBadge className="bottom-left">Data Scientist</RoleBadge>
          <RoleBadge className="top-right">Software Engineer</RoleBadge>
          <RoleBadge className="bottom-right">DB/System Admin</RoleBadge>
        </NameBadgeWrap>
      </MainBg>
      <Footer />
    </>
  );
}
