

import styled, { keyframes, css } from "styled-components";

/* --- Main Background Container --- */
export const MainBg = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  background: #181f2a;
  overflow: hidden;
`;

export const Content = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: 0;
`;

/* --- Split Background --- */
export const SplitBg = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  z-index: 1;
`;

export const LeftSplit = styled.div`
  width: 50vw;
  height: 100vh;
  background: linear-gradient(120deg,
    #22233b 74%,     /* Soft cosmic indigo */
    #353865 94%,     /* Muted blue-violet */
    #b2bbd3 100%     /* Very pale misty blue */
  );
  position: relative;
  overflow: clip;
`;

export const RightSplit = styled.div`
  width: 50vw;
  height: 100vh;
  background: linear-gradient(-120deg,
    #21302d 62%,     /* Charcoal teal */
    #40625f 92%,     /* Subtle blue-green */
    #b2dad7 100%     /* Pale misty cyan */
  );
  position: relative;
  overflow: clip;
`;

export const CenterDivider = styled.div`
  position: absolute;
  left: 50%; top: 0;
  width: 4px; height: 100vh;
  background: linear-gradient(180deg, #3ee0d6 20%, #b2dad7 50%, #353865 100%);
  z-index: 8;
  opacity: 0.55;
`;

/* --- Side Cards --- */
const sideCardAnim = keyframes`
  from { opacity: 0; transform: translateY(54px) scale(0.92);}
  to { opacity: 1; transform: translateY(0) scale(1);}
`;

export const SideCard = styled.div`
  position: absolute;
  top: 27%;
  min-width: 440px; max-width: 580px;
  min-height: 480px; max-height: 710px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 22px;
  z-index: 40;
  animation: ${css`${sideCardAnim} 1.1s cubic-bezier(.44,1.7,.38,1) 0.7s both`};
  @media (max-width: 1300px) { display: none; }
`;

export const LeftCard = styled(SideCard)`
  left: 2vw;
  align-items: flex-end;
`;
export const RightCard = styled(SideCard)`
  right: 2vw;
  align-items: flex-start;
`;

/* --- Name Row and Badges --- */
const nameRowAnim = keyframes`
  from { opacity: 0; transform: scale(0.86) translateY(-90px);}
  75% { opacity: 1; transform: scale(1.08) translateY(14px);}
  to { opacity: 1; transform: scale(1) translateY(0);}
`;

export const NameRow = styled.div`
  position: absolute;
  left: 28.4%; top: 35%;
  transform: translate(-50%, -50%);
  z-index: 15;
  display: flex;
  align-items: center;
  user-select: text;
  pointer-events: none;
  animation: ${css`${nameRowAnim} 1.07s cubic-bezier(.44,1.6,.38,1) both`};
`;

export const NameLeft = styled.span`
  display: inline-block;
  font-family: 'Inter Tight', Arial, sans-serif;
  font-size: 8vw;
  font-weight: 900;
  letter-spacing: -2.2px;
  color: #22233b;
  pointer-events: auto;
  margin: 0 0.09em 0 0;
  line-height: 1.04;
  background: linear-gradient(275deg,#7d8ab7 45%,#25325c 72%, #98b6e3 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 4.5px #23243b;
  text-shadow:
    0 0 16px #b2bbd388,
    0 2px 8px #23243b45;
  filter: drop-shadow(0 6px 18px #8acfe428);
`;

export const NameRight = styled.span`
  display: inline-block;
  font-family: 'Inter Tight', Arial, sans-serif;
  font-size: 8vw;
  font-weight: 900;
  letter-spacing: -2.2px;
  color: #22233b;
  pointer-events: auto;
  margin: 0 0.09em 0 0;
  line-height: 1.04;
  background: linear-gradient(275deg,#7d8ab7 45%,#25325c 72%, #98b6e3 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 4.5px #23243b;
  text-shadow:
    0 0 16px #b2bbd388,
    0 2px 8px #23243b45;
  filter: drop-shadow(0 6px 18px #8acfe428);
`;

export const NameBadgeWrap = styled.div`
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

export const RoleBadge = styled.div`
  position: absolute;
  width: 11.2em;
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(43,47,72,0.98) 62%, rgba(59,74,99,0.90) 100%);
  color: #e0c269;
  font-size: 1.38em;
  font-family: 'Fira Mono', 'Consolas', 'Liberation Mono', monospace;
  font-weight: 800;
  letter-spacing: 0.02em;
  border-radius: 0.6em;
  border: 1.8px solid #b2bbd344;
  box-shadow: 0 2px 12px 0 #b2bbd326;
  user-select: none;
  z-index: 50;
  white-space: normal;
  pointer-events: auto;
  opacity: 0.97;
  transition: background 0.19s, color 0.18s, box-shadow 0.18s, border 0.18s;
  text-shadow:
    0 1.5px 8px #b2bbd368,
    0 1px 3px #2b2e4a44,
    0 0 2px #000;

  &::before {
    content: "";
    position: absolute;
    inset: 0.1em;
    border-radius: 0.1em;
    background: radial-gradient(ellipse at 60% 20%, #b2bbd335 24%, transparent 80%);
    z-index: -1;
    pointer-events: none;
    filter: blur(1.1px);
    opacity: 0.75;
  }

  &:hover, &:focus {
    box-shadow:
      0 2px 8px 4px #b2dad752,
      0 1.5px 8px 2px #98b6e348;
    color: #fff;
    background: linear-gradient(100deg, rgba(54,76,101,0.98) 28%, #b2dad7 95%);
    outline: none;
  }

  &.top-left    { left: 0em;    top: -1.25em; }
  &.bottom-left { left: 0em;    bottom: -10em; }
  &.top-right   { right: -45em; top: -1.25em; }
  &.bottom-right{ right: -45em; bottom: -10em; }

  @media (max-width: 900px) {
    font-size: 1.05em;
    width: 8.8em;
    height: 2.2em;
    border-radius: 0.28em;
    position: static;
    margin: 0.25em 0.4em;
    display: inline-flex;
    box-shadow: 0 2px 8px 0 #b2bbd332, 0 1px 4px 0 #23243b1b;
  }
`;

