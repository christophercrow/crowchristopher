import {
  MainBg, SplitBg, LeftSplit, RightSplit, CenterDivider,LeftCard, RightCard,
  NameRow, NameLeft, NameRight, NameBadgeWrap, RoleBadge,
} from "./Home.styled.js";

// src/pages/Home/index.jsx

import { aboutCardProps, projectCardProps } from "./homeCardProps";


import React, { useEffect, useRef, useState, Suspense } from "react";
import { Helmet } from "react-helmet";
import DesktopNav from "../../components/layout/DesktopNav";
import Footer from "../../components/layout/Footer";
import CanvasBackground from "../../components/CanvasBackground";
import Cursor from "../../components/ui/Cursor";
import { GlitchText } from "./GlitchText"; // Assume you export GlitchText separately!
import nebulaImg from "../../assets/images/nebula.png";

// // --- Images ---
// import closetPic from "../../assets/images/closet-pic.png";
// import dormOveralls from "../../assets/images/dorm-overalls.png";
// import groupSelf from "../../assets/images/group-self.png";
// import jeenTree from "../../assets/images/jeen-tree.png";
// import meAlbert from "../../assets/images/me-albert.png";
// import physConf from "../../assets/images/phys-conf.png";
// import planetarium from "../../assets/images/planetarium.png";
// import wallShoe from "../../assets/images/wall-shoe.png";

// --- Lazy-load heavy cards ---
const Animated3DPinCardFramer = React.lazy(() => import("../../components/framer/3dpin-card"));

// --- Fonts
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap";
const addFontLink = () => {
  if (!document.getElementById("inter-tight-font")) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_LINK;
    link.id = "inter-tight-font";
    document.head.appendChild(link);
  }
};
addFontLink(); // Called once per bundle



// --- Efficient IntersectionObserver hook for in-view animation ---
function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.18 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}


// --- Main Home Component ---
export default function Home() {
  // Side cards in-view
  const leftCardRef = useRef();
  const rightCardRef = useRef();
  const leftCardInView = useInView(leftCardRef);
  const rightCardInView = useInView(rightCardRef);

  return (
    <>
      <Cursor />
      <Helmet>
        <title>Chris Crow | Portfolio</title>
      </Helmet>
      <MainBg>
        <DesktopNav />
        <SplitBg>
          <CanvasBackground side="left" nebulaImg={nebulaImg} />
          <CanvasBackground side="right" />
          <LeftSplit />
          <RightSplit />
          <CenterDivider />
        </SplitBg>
        {/* Side Cards */}
        <Suspense fallback={null}>
          <LeftCard ref={leftCardRef}>
            {leftCardInView && <Animated3DPinCardFramer {...aboutCardProps} />}
          </LeftCard>
          <RightCard ref={rightCardRef}>
            {rightCardInView && <Animated3DPinCardFramer {...projectCardProps} />}
          </RightCard>
        </Suspense>
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
