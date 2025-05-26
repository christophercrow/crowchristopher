import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import {
  MainBg, SplitBg, LeftSplit, RightSplit, CenterDivider, LeftCard, RightCard,
  NameRow, NameLeft, NameRight, NameBadgeWrap, RoleBadge,
} from "./Home.styled.js";
import DesktopNav from "../../components/layout/DesktopNav/index.jsx";
import Footer from "../../components/layout/Footer/index.jsx";
import CanvasBackground from "../../components/CanvasBackground.jsx";
import Cursor from "../../components/ui/Cursor/index.jsx";
import { GlitchText } from "./GlitchText.jsx";
import nebulaImg from "../../assets/images/nebula.png";
import {
  aboutCardProps,
  projectCardProps,
} from "./homeCardProps.jsx";
import Animated3DPinCardFramer, {
  CardHeader,
  CardBody,
  CardFooter,
} from "../../components/framer/3dpin-card.jsx";

// --- Fonts ---
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
addFontLink();

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

export default function Home() {
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
        <div style={{ flex: 1, position: "relative" }}>
          <DesktopNav />
          <SplitBg>
            <CanvasBackground side="left" nebulaImg={nebulaImg} />
            <CanvasBackground side="right" />
            <LeftSplit />
            <RightSplit />
            <CenterDivider />
          </SplitBg>
          {/* Left Card */}
          <LeftCard ref={leftCardRef}>
            {leftCardInView && (
              <Animated3DPinCardFramer {...aboutCardProps}>
                <CardBody>{aboutCardProps.cardBodyContent}</CardBody>
                <CardFooter>{aboutCardProps.cardFooterContent}</CardFooter>
              </Animated3DPinCardFramer>
            )}
          </LeftCard>
          {/* Right Card */}
          <RightCard ref={rightCardRef}>
            {rightCardInView && (
              <Animated3DPinCardFramer {...projectCardProps}>
                <CardBody>{projectCardProps.cardBodyContent}</CardBody>
                <CardFooter>{projectCardProps.cardFooterContent}</CardFooter>
              </Animated3DPinCardFramer>
            )}
          </RightCard>
          {/* Center Name and Badges */}
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
        </div>
        <Footer />
      </MainBg>
    </>
  );
}
