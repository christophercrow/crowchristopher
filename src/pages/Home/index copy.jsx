import {
  MainBg, SplitBg, LeftSplit, RightSplit, CenterDivider,
  SideCard, LeftCard, RightCard,
  NameRow, NameLeft, NameRight, NameBadgeWrap, RoleBadge,
  ScatteredPhoto,
  GlitchWrap, MainLayer, SplitLayer, SliceLine
} from "./Home.styled";

// src/pages/Home/index.jsx

import { aboutCardProps, projectCardProps } from "./homeCardProps";


import React, { useEffect, useRef, useState, Suspense, memo } from "react";
import styled, { keyframes, css } from "styled-components";
import { Helmet } from "react-helmet";
import DesktopNav from "../../components/layout/DesktopNav";
import Footer from "../../components/layout/Footer";
import CanvasBackground from "../../components/CanvasBackground";
import Cursor from "../../components/ui/Cursor";
import { GlitchText } from "./GlitchText"; // Assume you export GlitchText separately!
import nebulaImg from "../../assets/images/nebula.png";

// --- Images ---
import closetPic from "../../assets/images/closet-pic.png";
import dormOveralls from "../../assets/images/dorm-overalls.png";
import groupSelf from "../../assets/images/group-self.png";
import jeenTree from "../../assets/images/jeen-tree.png";
import meAlbert from "../../assets/images/me-albert.png";
import physConf from "../../assets/images/phys-conf.png";
import planetarium from "../../assets/images/planetarium.png";
import wallShoe from "../../assets/images/wall-shoe.png";

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

// --- Static data/arrays outside component scope ---
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
  { img: closetPic, alt: "PC Build", width: 375, height: 500, rotate: -17 },
  { img: dormOveralls, alt: "Dorm selfie", width: 285, height: 420, rotate: 9 },
  { img: groupSelf, alt: "Conference crew", width: 440, height: 330, rotate: -6 },
  { img: jeenTree, alt: "Jeen tree", width: 320, height: 430, rotate: 15 },
  { img: meAlbert, alt: "With Albert", width: 375, height: 375, rotate: -25 },
  { img: planetarium, alt: "Planetarium", width: 220, height: 330, rotate: 7 },
  { img: physConf, alt: "Physics conference", width: 220, height: 350, rotate: -11 },
  { img: wallShoe, alt: "Shoe on wall", width: 290, height: 330, rotate: 13 },
];


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

// --- Memoized ScatteredPhoto for performance ---
const MemoScatteredPhoto = memo(function ScatteredPhotoMemo({ left, top, z, rotate, img, alt, width, height }) {
  return (
    <ScatteredPhoto
      left={left}
      top={top}
      z={z}
      rotate={rotate}
      tabIndex={0}
    >
      <img
        src={img}
        alt={alt}
        width={width}
        height={height}
        style={{
          display: "block",
          borderRadius: 18,
          boxShadow: "0 8px 32px #0002",
          background: "#161e2d",
          border: "2.5px solid #fff",
          maxWidth: "min(36vw, 650px)",
          maxHeight: "min(36vh, 760px)",
          objectFit: "cover",
          transform: `rotate(${rotate}deg)`
        }}
        draggable={false}
      />
    </ScatteredPhoto>
  );
});

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
        {/* Scattered Photos */}
        {gridTiles.map((tile, i) => (
          <MemoScatteredPhoto
            key={i}
            left={photoLayout[i].left}
            top={photoLayout[i].top}
            z={photoLayout[i].z}
            rotate={tile.rotate}
            img={tile.img}
            alt={tile.alt}
            width={tile.width}
            height={tile.height}
          />
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
