import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimationFrame } from "framer-motion";
import styled from "styled-components";
import Animated3DPinCardFramer from "../../components/framer/3dpin-card";
import CustomCursor from "../../components/ui/Cursor";
import sysAdminData from "../../data/sysAdminData.json";

// IMAGES AND ICONS
import imgLinux from "../../assets/images/sysadmin-linux.png";
import imgAnsible from "../../assets/images/sysadmin-ansible.png";
import imgDocker from "../../assets/images/sysadmin-docker.png";
import imgMonitoring from "../../assets/images/sysadmin-monitoring.png";
import { DiLinux } from "react-icons/di";
import { SiAnsible, SiGrafana } from "react-icons/si";
import { FaDocker } from "react-icons/fa";
import imgBG from "../../assets/images/server-room.jpg";

// --- Mappings ---
const borderMap = {
  "Linux Server Hardening": "#fa5656",
  "Ansible Automation": "#ff9800",
  "Dockerized Infrastructure": "#41b6ff",
  "System Monitoring Stack": "#ffe158",
};
const pinColorMap = {
  "Linux Server Hardening": "#fa5656",
  "Ansible Automation": "#ff9800",
  "Dockerized Infrastructure": "#41b6ff",
  "System Monitoring Stack": "#ffe158",
};
const iconMap = {
  "Linux Server Hardening": <DiLinux size={46} color="#fa5656" />,
  "Ansible Automation": <SiAnsible size={46} color="#ff9800" />,
  "Dockerized Infrastructure": <FaDocker size={46} color="#41b6ff" />,
  "System Monitoring Stack": <SiGrafana size={46} color="#ffe158" />,
};
const imgMap = {
  "Linux Server Hardening": imgLinux,
  "Ansible Automation": imgAnsible,
  "Dockerized Infrastructure": imgDocker,
  "System Monitoring Stack": imgMonitoring,
};

const CARDS_ON_SCREEN = 3.5;
const CARD_GAP = 60; // px

export default function SysAdmin() {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  // Responsive card width
  const [cardWidth, setCardWidth] = useState(
    Math.floor(window.innerWidth / CARDS_ON_SCREEN) - CARD_GAP
  );
  useEffect(() => {
    function handleResize() {
      setCardWidth(Math.floor(window.innerWidth / CARDS_ON_SCREEN) - CARD_GAP);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Carousel logic
  const cardsToShow = [...sysAdminData, ...sysAdminData]; // double for seamless wrap
  const totalCards = cardsToShow.length;
  const totalWidth = totalCards * (cardWidth + CARD_GAP);

  const [x, setX] = useState(0);
  const carouselSpeed = hoveredIndex !== -1 ? 50 : 180; // px/sec

  // SEAMLESS LOOP LOGIC
  useAnimationFrame((_, delta) => {
    setX((prev) => {
      let next = prev - (delta / 1000) * carouselSpeed;
      // If scrolled past half, reset to 0 for seamless effect
      if (next <= -totalWidth / 2) {
        return 0;
      }
      return next;
    });
  });

  return (
    <PageWrapper>
      {/* Always on top cursor */}
      <CustomCursor zIndex={9999} />

      <NavBar>
        <NavButton>Home</NavButton>
        <NavButton>Works</NavButton>
        <NavButton>Blog</NavButton>
        <NavButton>Me</NavButton>
      </NavBar>

      <HeaderSection>
        <Title onClick={() => alert("Show terminal here!")}>
          System <span style={{ color: "#7ecad7" }}>Administration</span>
        </Title>
        <Subheader>Hover a card to slow down &amp; reveal its stack.</Subheader>
        <Subheader2>Click the header for terminal.</Subheader2>
      </HeaderSection>

      <ContentSection>
        <CarouselWrap>
          <CarouselScroller
            as={motion.div}
            style={{ x, width: totalWidth }}
          >
            {cardsToShow.map((entry, idx) => {
              const slug = entry.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              const borderColor = borderMap[entry.title] || "#eee";
              const pinColor = pinColorMap[entry.title] || "#4af";
              return (
                <CardWrapper
                  key={`${entry.title}-${idx}`}
                  style={{
                    minWidth: cardWidth,
                    maxWidth: cardWidth,
                    height: "500px",
                    marginRight: CARD_GAP,
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                >
                  <Animated3DPinCardFramer
                    icon={iconMap[entry.title]}
                    title={{
                      text: entry.title,
                      font: { fontSize: "1.55rem", fontWeight: 900 },
                      color: borderColor,
                    }}
                    subtitle={{
                      text: entry.description,
                      font: { fontSize: "1.15rem", fontWeight: 600 },
                      color: "#dadada",
                    }}
                    image={{
                      image: { src: imgMap[entry.title] },
                      marginRight: "10px",
                      borderRadius: "18px",
                      marginTop: "0",
                      marginRight: "50pt",
                      width: "100%",
                    }}
                    cardBody={{
                      borderRadius: 18,
                      borderColor,
                      borderHoverColor: borderColor,
                      backgroundColor: "#191f23",
                      borderWidth: 3.2,
                    }}
                    pin={{
                      title: "View Project",
                      link: `/sysadmin/${slug}`,
                      linkTarget: "self",
                      backgroundColor: `${pinColor}22`,
                      textColor: pinColor,
                      lineColorPrimary: pinColor,
                      lineColorSecondary: "#fff9",
                      font: { fontSize: "1.08rem", fontWeight: 700 },
                    }}
                    onPinClick={() => navigate(`/sysadmin/${slug}`)}
                    hovered={hoveredIndex === idx}
                    techIconsAbovePin={true}
                  />
                </CardWrapper>
              );
            })}
          </CarouselScroller>
        </CarouselWrap>
      </ContentSection>
      <Spacer />
    </PageWrapper>
  );
}

// ---- STYLES ----

const PageWrapper = styled.div`
  background: url(${imgBG}) center center;
  min-height: 100vh;
`;

const NavBar = styled.nav`
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  gap: 2.5rem;
  padding: 1.6rem 3.2rem 0 0;
  background: transparent;
`;

const NavButton = styled.div`
  font-size: 1.25rem;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  transition: transform 0.19s cubic-bezier(.53,.1,.61,.97), color 0.23s;
  &:hover {
    color: #7ecad7;
    transform: scale(1.19);
  }
`;

const HeaderSection = styled.div`
  width: 100vw;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 5rem;
`;

const Title = styled.h1`
  font-size: 4.1rem;
  font-weight: 900;
  letter-spacing: -1.5px;
  color: #ffba8b;
  margin-bottom: 0.6rem;
  transition: transform 0.23s cubic-bezier(.53,.1,.61,.97), color 0.24s;
  cursor: pointer;
  &:hover {
    color: #7ecad7;
    transform: scale(1.09);
  }
`;

const Subheader = styled.div`
  color: #fff;
  font-size: 1.45rem;
  font-weight: 700;
  margin-bottom: 0.1rem;
`;

const Subheader2 = styled.div`
  color: #fff;
  font-size: 1.18rem;
  font-weight: 400;
  margin-bottom: 0.6rem;
`;

const ContentSection = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 700px;
  opacity: 0.85;
`;

const CarouselWrap = styled.div`
  overflow-x: visible;
  width: 100vw;
  min-height: 550px;
  display: flex;
  justify-content: center;
`;

const CarouselScroller = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${CARD_GAP}px;
  will-change: transform;
`;

const CardWrapper = styled(motion.div)`
  position: relative;
  background: none;
  box-shadow: none;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spacer = styled.div`
  height: 700px;
`;

