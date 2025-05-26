// src/pages/Projects/ProjectsPage.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cursor from "../../components/ui/Cursor/index.jsx"; // Path may need adjustment

// Demo images, replace with your real imports!
import posterImg from "../../assets/images/phys-conf.png";
import closetImg from "../../assets/images/dorm-overalls.png";
import portfolioImg from "../../assets/images/group-self.png";
import ansibleImg from "../../assets/images/sysadmin-ansible.png";
import NavBar from "../../components/layout/DesktopNav/index.jsx";
import Footer from "../../components/layout/Footer/index.jsx";
// Example project data
const projects = [
  {
    id: 1,
    title: "Gaia DR3 Dashboard",
    description: "Interactive dashboard for billions of Gaia stars. HR diagrams, sky maps, and advanced filtering built with Streamlit and PostgreSQL.",
    img: posterImg,
    domain: "Astrophysics",
    domainSlug: "astrophysics",
    github: "https://github.com/yourusername/gaia-dr3-dashboard",
    liveDemo: "https://yourlivedemo.link",
    updated: "2025-05-10",
  },
  {
    id: 2,
    title: "Stellar Classification ML",
    description: "Machine learning pipeline for classifying stars using Gaia & WDS data. Includes uncertainty quantification and model interpretability.",
    img: closetImg,
    domain: "Data Science",
    domainSlug: "data-science",
    github: "https://github.com/yourusername/stellar-ml",
    liveDemo: "",
    updated: "2025-04-21",
  },
  {
    id: 3,
    title: "Portfolio Platform v2",
    description: "A dynamic portfolio site with interactive physics UI and draggable elements, powered by React, Node.js, and PostgreSQL.",
    img: portfolioImg,
    domain: "Full-Stack",
    domainSlug: "full-stack",
    github: "https://github.com/yourusername/portfolio-v2",
    liveDemo: "https://yourportfolio.link",
    updated: "2025-04-02",
  },
  {
    id: 4,
    title: "Ansible Security Automation",
    description: "Automated playbooks for secure Linux provisioning and network hardening, with live monitoring and reporting.",
    img: ansibleImg,
    domain: "Cybersecurity",
    domainSlug: "cybersecurity",
    github: "https://github.com/yourusername/ansible-secure",
    liveDemo: "",
    updated: "2025-03-12",
  },
];

// Domain color map
const domainColors = {
  astrophysics: "#69e7ff",
  "data-science": "#97ffcd",
  "full-stack": "#ffc786",
  cybersecurity: "#ff7b8c",
};

// Fade-in keyframes CSS
const fadeInKeyframes = `
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(60px);}
  to { opacity: 1; transform: translateY(0);}
}
`;

function ProjectCard({ project }) {
  const navigate = useNavigate();
  const domainColor = domainColors[project.domainSlug] || "#b7f2f7";

  return (
    <div
      className="project-card"
      style={{
        background: "rgba(28,34,54,0.99)",
        borderRadius: 22,
        border: "1.5px solid #2b2e4a33",
        boxShadow: "0 4px 36px 2px #49ffe914, 0 1.5px 8px #20224513",
        transition: "box-shadow 0.22s, transform 0.19s",
        padding: 28,
        margin: 18,
        minWidth: 320,
        maxWidth: 410,
        flex: "1 1 330px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        animation: "fadeInUp 1.1s cubic-bezier(.45,1.7,.38,1) both",
        cursor: "default",
      }}
      onClick={() => navigate(`/projects/${project.domainSlug}`)}
      tabIndex={0}
    >
      {/* Inline style block for animation */}
      <style>{fadeInKeyframes}</style>

      {/* --- DOMAIN CHIP --- */}
      <Link
        to={`/projects/${project.domainSlug}`}
        style={{
          position: "absolute",
          top: 18, left: 24,
          padding: "6px 18px",
          background: `linear-gradient(98deg, ${domainColor} 40%, #23243b 120%)`,
          color: "#23243b",
          borderRadius: 12,
          fontWeight: 800,
          fontFamily: "Fira Mono, Consolas, monospace",
          fontSize: "1.03em",
          boxShadow: `0 1.5px 7px ${domainColor}50`,
          opacity: 0.92,
          border: "none",
          outline: "none",
          transition: "filter 0.14s, background 0.18s",
          textDecoration: "none",
          zIndex: 9,
        }}
        onClick={e => e.stopPropagation()} // Prevents parent card click
      >
        {project.domain}
      </Link>

      {/* --- TITLE --- */}
      <h2
        style={{
          color: domainColor,
          fontSize: "1.28rem",
          fontWeight: 800,
          margin: "38px 0 8px 0",
          letterSpacing: "0.02em",
          textShadow: `0 1.5px 8px ${domainColor}2c`,
        }}
      >
        {project.title}
      </h2>

      {/* --- DESCRIPTION --- */}
      <div style={{
        fontSize: "1.09rem",
        color: "#d5f5fd",
        marginBottom: 17,
        minHeight: 44,
        opacity: 0.92,
        lineHeight: 1.56,
      }}>
        {project.description}
      </div>

      {/* --- IMAGE --- */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 17 }}>
        <img
          src={project.img}
          alt={project.title}
          style={{
            borderRadius: 14,
            boxShadow: `0 2px 16px ${domainColor}19`,
            width: 145,
            height: 155,
            objectFit: "cover",
            transition: "transform 0.18s, box-shadow 0.16s",
            cursor: "pointer",
            filter: "brightness(0.95)",
          }}
          onClick={e => {
            e.stopPropagation();
            if (project.liveDemo) window.open(project.liveDemo, "_blank");
          }}
        />
      </div>

      {/* --- BUTTONS --- */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        marginBottom: 8,
        marginTop: "auto"
      }}>
        <a
          href={project.github}
          style={{
            background: "linear-gradient(90deg,#69fff7 70%,#49ffe9 100%)",
            color: "#181f2a",
            fontWeight: 700,
            padding: "7px 18px",
            borderRadius: 14,
            textDecoration: "none",
            fontSize: "1.03em",
            boxShadow: "0 1.5px 8px #49ffe928",
            transition: "background 0.17s, color 0.14s",
          }}
          target="_blank" rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
        >GitHub</a>
        {project.liveDemo &&
          <a
            href={project.liveDemo}
            style={{
              background: "linear-gradient(90deg,#b3ffe2 65%,#49ffe9 120%)",
              color: "#181f2a",
              fontWeight: 700,
              padding: "7px 18px",
              borderRadius: 14,
              textDecoration: "none",
              fontSize: "1.03em",
              boxShadow: "0 1.5px 8px #49ffe928",
              transition: "background 0.17s, color 0.14s",
            }}
            target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
          >Live Demo</a>
        }
      </div>

      {/* --- DATE --- */}
      <div style={{
        color: "#a6e4f7",
        fontSize: "0.97em",
        textAlign: "right",
        width: "100%",
        opacity: 0.77,
        marginTop: 5,
      }}>
        Updated: {project.updated}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <Cursor />
      <NavBar/>
      <div style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#181f2a",
        paddingBottom: "60px",
      }}>
        <h1 style={{
          textAlign: "center",
          color: "#fff",
          margin: "0 0 32px 0",
          fontSize: "2.6rem",
          fontWeight: 900,
          letterSpacing: "0.01em",
          paddingTop: "44px",
          textShadow: "0 2.5px 14px #49ffe91c, 0 1.5px 8px #222",
        }}>
          Projects by Domain
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "34px",
            justifyContent: "center",
            maxWidth: "1560px",
            margin: "0 auto",
            padding: "0 10px",
          }}
        >
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    <Footer/>
    </>

);
}
