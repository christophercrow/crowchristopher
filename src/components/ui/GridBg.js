// src/components/ui/GridBg.js
import styled from "styled-components";

const GridBg = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: 
    linear-gradient(transparent 23px, #1c1c1c 24px), 
    linear-gradient(90deg, transparent 23px, #1c1c1c 24px),
    #111;
  background-size: 24px 24px;
  z-index: 0;
  pointer-events: none;
`;

export default GridBg;
