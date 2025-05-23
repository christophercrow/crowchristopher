// src/pages/CyberSecurity.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimationFrame } from "framer-motion";
import styled from "styled-components";

// Components
import Animated3DPinCardFramer from "../../components/framer/3dpin-card";
import Cursor from "../../components/ui/Cursor";
import TerminalModal from "../../components/ui/TerminalModal";

// Data
import cyberSecurityData from "../../data/cyberSecurityData.json";

// Images & Icons (replace with your actual images)
import imgNetwork from "../../assets/images/cyber-network.png";
import imgSIEM from "../../assets/images/cyber-siem.png.png";
import imgMalware from "../../assets/images/cyber-malware.png";
import imgRedTeam from "../../assets/images/cyber-redteam.png";
import imgBG from "../../assets/images/cyber-bg.jpg";

// Popular cyber icons
import { FaNetworkWired, FaBug, FaShieldAlt, FaUserSecret, FaLock, FaCloud } from "react-icons/fa";
import { SiWireshark, SiSplunk, SiMongodb, SiPython } from "react-icons/si";

const CARD_GAP = 60;
const CARDS_ON_SCREEN = 3.5;

// Map card titles to border/pin colors
const borderMap = {
  "Network Security": "#0ea5e9",
  "SIEM & Log Analysis": "#34d399",
  "Malware Analysis": "#f43f5e",
  "Red Team Operations": "#eab308",
};
const pinColorMap = borderMap;

// Map tool names to icon components
const techIconMap = {
  "Wireshark": SiWireshark,
  "Metasploit": FaUserSecret,
  "Splunk": SiSplunk,
  "Python": SiPython,
  "MongoDB": SiMongodb,
  "Firewall": FaShieldAlt,
  "IDS": FaBug,
  "Encryption": FaLock,
  "Cloud Security": FaCloud,
  "Red Team": FaUserSecret,
};

const imgMap = {
  "Network Security": imgNetwork,
  "SIEM & Log Analysis": imgSIEM,
  "Malware Analysis": imgMalware,
  "Red Team Operations": imgRedTeam,
};

export default function CyberSecurity() {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  // Responsive card width
  const [cardWidth, setCardWidth] = useState(getCardWidth());
  useEffect(() => {
    function handleResize() {
      setCardWidth(getCardWidth());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  function getCardWidth() {
    return Math.floor(window.innerWidth / CARDS_ON_SCREEN) - CARD_GAP;
  }

  // Infinite carousel logic
  const numUnique = cyberSecurityData.length;
  const cardAndGap = cardWidth + CARD_GAP;
  const totalSets = 2;
  const cardsToShow = [...cyberSecurityData, ...cyberSecurityData];
  const totalCards = cardsToShow.length;
  const totalWidth = totalCards * cardAndGap;
  const initialOffset = 0;
  const [x, setX] = useState(initialOffset);

  useEffect(() => {
    setX(initialOffset);
  }, [initialOffset]);

  const carouselSpeed = hoveredIndex !== -1 ? 22 : 60;
  useAnimationFrame((_, delta) => {
    setX(prev => {
      let next = prev - (delta / 1000) * carouselSpeed;
      if (next <= -numUnique * cardAndGap) {
        return next + numUnique * cardAndGap;
      }
      if (next >= 0) {
        return next - numUnique * cardAndGap;
      }
      return next;
    });
  });

  // Terminal modal logic
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <PageWrapper>
      <Cursor zIndex={9999} />
      <NavBar>
        <NavButton onClick={() => navigate("/")}>Home</NavButton>
        <NavButton onClick={() => navigate("/works")}>Works</NavButton>
        <NavButton onClick={() => navigate("/blog")}>Blog</NavButton>
        <NavButton onClick={() => navigate("/me")}>Me</NavButton>
      </NavBar>

      <TerminalModal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        navigate={navigate}
      />

      <HeaderSection>
        <Title onClick={() => setTerminalOpen(true)}>
          Cyber <span style={{ color: "#0ea5e9" }}>Security</span>
        </Title>
      </HeaderSection>
      <ContentSection>
        <CarouselWrap>
          <CarouselScroller
            as={motion.div}
            style={{ x, width: totalWidth, minWidth: totalWidth }}
            totalWidth={totalWidth}
          >
            {cardsToShow.map((entry, idx) => {
              const slug = entry.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
              const borderColor = borderMap[entry.title] || "#eee";
              const pinColor = pinColorMap[entry.title] || "#4af";
              const techIcons = (entry.tools || [])
                .map(tool => {
                  const IconComp = techIconMap[tool];
                  return IconComp
                    ? <IconComp size={34} color={borderColor} key={tool} />
                    : null;
                })
                .filter(Boolean);

              return (
                <CardWrapper
                  key={`${entry.title}-${idx}`}
                  style={{
                    minWidth: cardWidth,
                    maxWidth: cardWidth,
                    width: cardWidth,
                    height: "500px",
                    marginRight: CARD_GAP,
                    flex: "0 0 auto"
                  }}
                  onMouseEnter={() => setHoveredIndex(idx % numUnique)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                >
                  <Animated3DPinCardFramer
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
                      link: `/cybersecurity/${slug}`,
                      linkTarget: "self",
                      backgroundColor: `${pinColor}22`,
                      textColor: pinColor,
                      lineColorPrimary: pinColor,
                      lineColorSecondary: "#fff9",
                      font: { fontSize: "1.08rem", fontWeight: 700 },
                    }}
                    onPinClick={() => navigate(`/cybersecurity/${slug}`)}
                    hovered={hoveredIndex === (idx % numUnique)}
                    techIcons={techIcons}
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

// ---- Styled Components ----

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

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #fff;
  cursor: pointer;
  font-weight: 700;
  transition: transform 0.19s cubic-bezier(.53,.1,.61,.97), color 0.23s;
  &:hover {
    color: #0ea5e9;
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
    color: #0ea5e9;
    transform: scale(1.09);
  }
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
  width: ${props => props.totalWidth}px;
  min-width: ${props => props.totalWidth}px;
  will-change: transform;
  flex-wrap: nowrap;
`;

const CardWrapper = styled(motion.div)`
  position: relative;
  background: none;
  box-shadow: none;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  max-width: 100vw;
  flex: 0 0 auto;
`;

const Spacer = styled.div`
  height: 100px;
`;

