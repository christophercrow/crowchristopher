// src/pages/SysAdmin.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useAnimationFrame } from "framer-motion";
import styled from "styled-components";

// Components
import Animated3DPinCardFramer from "../../components/framer/3dpin-card";
import Cursor from "../../components/ui/Cursor";
import TerminalModal from "../../components/ui/TerminalModal";

// Data
import sysAdminData from "../../data/sysAdminData.json";

// Images & Icons
import imgLinux from "../../assets/images/sysadmin-linux.png";
import imgAnsible from "../../assets/images/sysadmin-ansible.png";
import imgDocker from "../../assets/images/sysadmin-docker.png";
import imgMonitoring from "../../assets/images/sysadmin-monitoring.png";
import imgBG from "../../assets/images/server-room.jpg";

import { DiLinux } from "react-icons/di";
import { SiAnsible, SiGrafana, SiYaml, SiGit, SiDocker, SiNginx, SiPostgresql, SiPowershell, SiPrometheus, SiPython } from "react-icons/si";
import { FaDocker, FaShieldAlt, FaUserSecret, FaLock, FaTools, FaTerminal, FaUbuntu } from "react-icons/fa";

const CARD_GAP = 60;
const CARDS_ON_SCREEN = 3.5;
const borderMap = {
  "Linux Server Hardening": "#fa5656",
  "Ansible Automation": "#ff9800",
  "Dockerized Infrastructure": "#41b6ff",
  "System Monitoring Stack": "#ffe158",
};
const pinColorMap = borderMap;

const techIconMap = {
  "Linux": DiLinux,
  "Ubuntu": FaUbuntu,
  "Ansible": SiAnsible,
  "YAML": SiYaml,
  "Git": SiGit,
  "Docker": SiDocker,
  "Nginx": SiNginx,
  "PostgreSQL": SiPostgresql,
  "Grafana": SiGrafana,
  "Prometheus": SiPrometheus,
  "PowerShell": SiPowershell,
  "Python": SiPython,
  "SSH": FaTerminal,
  "UFW": FaShieldAlt,
  "AIDE": FaTools,
  "Lynis": FaUserSecret,
  "Audit": FaLock,
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

export default function SysAdmin() {
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

  // ---- INFINITE CAROUSEL LOGIC ----
  const numUnique = sysAdminData.length;
  const cardAndGap = cardWidth + CARD_GAP;
  const totalSets = 2; // Use 2 sets for seamless looping
  const cardsToShow = [...sysAdminData, ...sysAdminData]; // Duplicate data
  const totalCards = cardsToShow.length;
  const totalWidth = totalCards * cardAndGap;

  const initialOffset = 0; // Start at beginning of first set

  const [x, setX] = useState(initialOffset);

  useEffect(() => {
    setX(initialOffset);
  }, [initialOffset]);

  const carouselSpeed = hoveredIndex !== -1 ? 22 : 60;

  useAnimationFrame((_, delta) => {
    setX(prev => {
      let next = prev - (delta / 1000) * carouselSpeed;
      // Reset when past first set or before start
      if (next <= -numUnique * cardAndGap) {
        return next + numUnique * cardAndGap;
      }
      if (next >= 0) {
        return next - numUnique * cardAndGap;
      }
      return next;
    });
  });
  // ---- TERMINAL LOGIC ----
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
          System <span style={{ color: "#7ecad7" }}>Administration</span>
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
