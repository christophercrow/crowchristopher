import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomCursor from "../../components/ui/Cursor";
import Animated3DPinCardFramer from "../../components/framer/3dpin-card"; // Use the improved version!
import GridBg from "../../components/ui/GridBg";

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

const techIconsMap = {
  "Linux Server Hardening": [<DiLinux size={32} color="#fa5656" key="linux"/>],
  "Ansible Automation": [<SiAnsible size={32} color="#ff9800" key="ansible"/>],
  "Dockerized Infrastructure": [<FaDocker size={32} color="#41b6ff" key="docker"/>],
  "System Monitoring Stack": [<SiGrafana size={32} color="#ffe158" key="grafana"/>],
};

const projectData = [
  {
    title: "Linux Server Hardening",
    description:
      "Configured and secured Ubuntu/CentOS servers using firewall rules, SSH lockdown, automatic updates, and auditing tools.",
  },
  {
    title: "Ansible Automation",
    description:
      "Automated provisioning and updates across environments using Ansible playbooks and roles.",
  },
  {
    title: "Dockerized Infrastructure",
    description:
      "Containerized Nginx, PostgreSQL, and scripts to streamline deployment and scaling.",
  },
  {
    title: "System Monitoring Stack",
    description:
      "Deployed Prometheus, Grafana, and alerting for robust system monitoring.",
  },
];

export default function SysAdmin() {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <PageWrapper>
      <GridBg />
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
        <Subheader>Hover a card for tech stack &amp; 3D tilt.</Subheader>
        <Subheader2>Click the header for terminal.</Subheader2>
      </HeaderSection>

      <ContentSection>
        <CardsRow>
          {projectData.map((entry, idx) => {
            const slug = entry.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            const borderColor = borderMap[entry.title] || "#eee";
            const pinColor = pinColorMap[entry.title] || "#4af";
            return (
              <CardContainer
                key={entry.title}
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
                    title: slug,
                    backgroundColor: "#222",
                    textColor: "#fff",
                    lineColorPrimary: pinColor,
                    lineColorSecondary: "#fff9",
                    font: { fontSize: "1.08rem", fontWeight: 700 },
                  }}
                  onPinClick={() => navigate(`/sysadmin/${slug}`)}
                  hovered={hoveredIndex === idx}
                  techIcons={techIconsMap[entry.title]}
                  techIconsAbovePin={true}
                />
              </CardContainer>
            );
          })}
        </CardsRow>
      </ContentSection>
      <Spacer />
    </PageWrapper>
  );
}

// ---- STYLES ----

const PageWrapper = styled.div`
  background: url(${imgBG}) center center;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  position: relative;
`;

const NavBar = styled.nav`
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  gap: 2.5rem;
  padding: 1.6rem 3.2rem 0 0;
  background: transparent;
  z-index: 10;
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
  margin-bottom: 4.2rem;
  z-index: 5;
  position: relative;
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
  font-size: 1.38rem;
  font-weight: 700;
  margin-bottom: 0.1rem;
`;

const Subheader2 = styled.div`
  color: #fff;
  font-size: 1.11rem;
  font-weight: 400;
  margin-bottom: 0.6rem;
`;

const ContentSection = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 700px;
  opacity: 0.96;
  z-index: 2;
  position: relative;
`;

const CardsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 36px;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  max-width: 1400px;
  flex-wrap: wrap;
`;

const CardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  /* Give more top margin if you want more space for the pin */
  margin-top: 58px;
`;

const Spacer = styled.div`
  height: 120px;
`;
