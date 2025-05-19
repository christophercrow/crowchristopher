import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import bgDesktop from "../../assets/images/server-room.jpg";

import Cursor from "../../components/ui/Cursor";
import Animated3DPinCardFramer from "../../components/framer/3dpin-card";
import sysAdminData from "../../data/sysAdminData.json";

// logos for each project
import { DiLinux } from "react-icons/di";
import { SiAnsible, SiGrafana } from "react-icons/si";
import { FaDocker } from "react-icons/fa";

const iconMap = {
  "Linux Server Hardening": <DiLinux size={48} color="#fff" />,
  "Ansible Automation":    <SiAnsible size={48} color="#fff" />,
  "Dockerized Infrastructure": <FaDocker size={48} color="#fff" />,
  "System Monitoring Stack":   <SiGrafana size={48} color="#fff" />,
};

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function SysAdmin() {
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <PageWrapper
      as={motion.div}
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1,   opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <Cursor />

      <Helmet>
        <title>System Administration | Christopher Crow</title>
        <meta
          name="description"
          content="System administration projects and skills of Christopher Crow."
        />
      </Helmet>

      <HeaderBar>
        <BackLink to="/">← Back to Home</BackLink>
      </HeaderBar>

      <HeroSection
        as={motion.div}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h1>System Administration</h1>
        <p>I manage and automate secure, scalable systems. Click below to explore each project.</p>
      </HeroSection>

      <CardGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sysAdminData.map((entry) => {
          const slug = entry.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
          return (
            <Animated3DPinCardFramer
              key={entry.title}
              // top‐of‐card logo
              icon={iconMap[entry.title]}
              // title & subtitle from JSON
              title={{
                text: entry.title,
                font: { fontSize: "1.1rem" },
                marginTop: "0",
                marginBottom: "0.5rem",
              }}
              subtitle={{
                text: entry.description,
                font: { fontSize: "0.9rem" },
                marginTop: "0",
                marginBottom: "1rem",
              }}
              // no custom image → fallback unsplash
              image={{
                image: {},
                borderRadius: "8px",
                marginTop: "0",
              }}
              // card background + border
              cardBody={{
                borderRadius: 16,
                borderColor: "rgba(255,255,255,0.2)",
                borderHoverColor: "rgba(255,255,255,0.6)",
                backgroundColor: "rgba(0,0,0,0.6)",
                borderWidth: 1,
              }}
              // bottom “pin” button
              pin={{
                title: "View Project",
                link: `/sysadmin/${slug}`,
                linkTarget: "self",
                backgroundColor: (() => {
                  switch (entry.title) {
                    case "Linux Server Hardening":       return "rgba(60,60,60,0.8)";
                    case "Ansible Automation":           return "rgba(229,66,52,0.8)";
                    case "Dockerized Infrastructure":    return "rgba(36,150,237,0.8)";
                    case "System Monitoring Stack":      return "rgba(234,184,57,0.8)";
                    default:                             return "rgba(30,136,229,0.8)";
                  }
                })(),
                textColor: "#fff",
                titleUnderlineColor: "#fff",
                lineColorPrimary:   "#fff",
                lineColorSecondary: "rgba(255,255,255,0.6)",
                font: { fontSize: "0.85rem" },
              }}
              onPinClick={() => navigate(`/sysadmin/${slug}`)}
            />
          );
        })}
      </CardGrid>
    </PageWrapper>
  );
}

// ─── Styled-components ─────────────────────────────────

const PageWrapper = styled.div`
  background: url(${bgDesktop}) no-repeat center center fixed;
  background-size: cover;
  padding: 2rem;
  color: #fff;
  min-height: 100vh;
`;

const HeaderBar = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 2rem;
`;

const BackLink = styled.a`
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  transition: opacity 0.3s ease;
  &:hover { opacity: 0.7; }
`;

const HeroSection = styled.div`
  text-align: center;
  margin: 5rem 0 3rem;
  h1 { font-size: 3rem; margin-bottom: 1rem; }
  p  { font-size: 1.25rem; }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  justify-items: center;
  max-width: 900px;
  margin: 0 auto;
`;
