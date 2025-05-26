import jeenTree from "../../assets/images/jeen-tree.png";
import physConf from "../../assets/images/phys-conf.png";
import nebulaImg from "../../assets/images/nebula.png";

import {
  SiPython,
  SiPostgresql,
  SiDocker,
  SiLinux,
  SiTerraform,
  SiGithub,
  SiMongodb,
  SiSnowflake,
  SiReact,
  SiPandas,
  SiStreamlit,
} from "react-icons/si";

// --- About Card Visual Content ---
// --- About Card Visual Content ---

// Tech stack for About Card with links
const aboutStack = [
  { icon: SiPython, label: "Python", url: "https://www.python.org/" },
  { icon: SiPandas, label: "Pandas", url: "https://pandas.pydata.org/" },
  { icon: SiReact, label: "React", url: "https://react.dev/" },
  { icon: SiStreamlit, label: "Streamlit", url: "https://streamlit.io/" },
  { icon: SiPostgresql, label: "PostgreSQL", url: "https://www.postgresql.org/" },
  { icon: SiDocker, label: "Docker", url: "https://www.docker.com/" },
  { icon: SiLinux, label: "Linux", url: "https://www.linux.org/" },
  { icon: SiTerraform, label: "Terraform", url: "https://www.terraform.io/" },
  { icon: SiGithub, label: "GitHub", url: "https://github.com/" },
];

export const aboutCardProps = {
  cardBody: {
    borderRadius: "26px",
    borderColor: "#28384c",
    borderHoverColor: "#47ffe9",
    backgroundColor: "rgba(36,41,59,0.99)",
    borderWidth: 4,
  },
  pin: {
    backgroundColor: "#47ffe9",
    textColor: "#1f6feb",
    lineColorPrimary: "#47ffe9",
    lineColorSecondary: "#1f6feb",
    font: { fontSize: "1.12em", fontWeight: "bold" },
    title: "More About Me",
  },
  techIcons: aboutStack.map(({ icon, label }) => ({ icon, label })), // for floating bar if you want
  cardHeader: (
    <h2 style={{ marginBottom: 0 }}>
      <span role="img" aria-label="wave" style={{ marginRight: 8 }}>👋</span>
      Hi, I'm <span style={{ color: "#47ffe9", marginLeft: 5 }}>Chris Crow</span>
    </h2>
  ),
  cardBodyContent: (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
        gap: "1.09rem",
        fontSize: "1.09rem",
        lineHeight: 1.68,
        color: "#eaf6fb",
        fontWeight: 400,
        padding: "24px 24px 10px 24px",
        minHeight: 240,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ color: "#b8e9ff" }}>
        Astrophysics student, developer, and data enthusiast.<br />
        I build tools and pipelines to make sense of cosmic data, turning complex science into interactive, visual experiences.
      </div>
      <ul
        style={{
          margin: 0,
          paddingLeft: "1.1rem",
          fontSize: "1.02rem",
          color: "#aafcff",
          listStyle: "none",
          lineHeight: 1.56,
        }}
      >
        <li style={{ marginBottom: "2px" }}>
          <span style={{
            color: "#60fff8",
            marginRight: 8,
            fontSize: "1.12em",
            verticalAlign: "middle",
          }}>✦</span>
          Stellar evolution & galaxy simulation
        </li>
        <li style={{ marginBottom: "2px" }}>
          <span style={{
            color: "#60fff8",
            marginRight: 8,
            fontSize: "1.12em",
            verticalAlign: "middle",
          }}>✦</span>
          Machine learning for star classification
        </li>
        <li style={{ marginBottom: "2px" }}>
          <span style={{
            color: "#60fff8",
            marginRight: 8,
            fontSize: "1.12em",
            verticalAlign: "middle",
          }}>✦</span>
          ETL pipelines for massive sky surveys
        </li>
        <li>
          <span style={{
            color: "#60fff8",
            marginRight: 8,
            fontSize: "1.12em",
            verticalAlign: "middle",
          }}>✦</span>
          Interactive dashboards & visualizations
        </li>
      </ul>
      <img
        src={nebulaImg}
        alt="Nebula"
        style={{
          width: 148,
          borderRadius: 13,
          boxShadow: "0 3px 18px #16254455",
          margin: "4px 0 0 0",
          border: "1px solid #243343",
        }}
      />
      <div style={{ marginTop: 14 }}>
        <strong style={{ color: "#7effff", fontWeight: 700, fontSize: "1.03em", letterSpacing: "0.01em" }}>
          Stack:
        </strong>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75em 1.2em",
          marginTop: 8,
          alignItems: "center",
        }}>
          {aboutStack.map(({ icon: Icon, label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#3efcff",
                fontWeight: 500,
                fontSize: "1.08em",
                textDecoration: "none",
                transition: "color 0.13s",
                opacity: 0.96,
                padding: "2.5px 8px",
                borderRadius: "7px",
                background: "rgba(30,44,51,0.13)",
              }}
              onMouseOver={e => e.currentTarget.style.color = "#fff"}
              onMouseOut={e => e.currentTarget.style.color = "#3efcff"}
              title={label}
            >
              <Icon size={23} style={{ filter: "drop-shadow(0 2px 7px #2cfad245)" }} />
              <span style={{
                fontSize: "0.99em",
                fontWeight: 500,
                letterSpacing: "0.03em",
                textShadow: "0 1px 5px #171a2390"
              }}>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  ),
  cardFooterContent: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 14,
        width: "100%",
        color: "#a4e6f7",
        fontSize: "0.99rem",
        opacity: 0.89,
        borderTop: "1px solid #23334177",
        padding: "14px 24px 7px 24px",
        marginTop: 8,
        boxSizing: "border-box",
      }}
    >
      <span>
        B.S. Astrophysics, UNC Chapel Hill &nbsp;•&nbsp; Portfolio v2
      </span>
      <a
        href="mailto:your@email.com"
        style={{
          color: "#47ffe9",
          fontWeight: 500,
          textDecoration: "none",
          borderBottom: "1.5px solid #47ffe9",
          paddingBottom: 1,
          transition: "border-color .15s",
        }}
        onMouseOver={e => (e.currentTarget.style.borderColor = "#fff")}
        onMouseOut={e => (e.currentTarget.style.borderColor = "#47ffe9")}
        target="_blank"
        rel="noopener noreferrer"
      >
        Contact
      </a>
    </div>
  ),
};
// --- Project Card Visual Content ---
// src/pages/Home/homeCardProps.jsx

// Rich tech stack display (icon, label, URL)
const techStack = [
  { icon: SiPython, label: "Python", url: "https://www.python.org/" },
  { icon: SiPostgresql, label: "PostgreSQL", url: "https://www.postgresql.org/" },
  { icon: SiStreamlit, label: "Streamlit", url: "https://streamlit.io/" },
  { icon: SiReact, label: "React", url: "https://react.dev/" },
  { icon: SiDocker, label: "Docker", url: "https://www.docker.com/" },
  { icon: SiTerraform, label: "Terraform", url: "https://www.terraform.io/" },
  { icon: SiMongodb, label: "MongoDB", url: "https://www.mongodb.com/" },
  { icon: SiSnowflake, label: "Snowflake", url: "https://www.snowflake.com/" },
  { icon: SiGithub, label: "GitHub", url: "https://github.com/" },
];

// --- Project Card Visual Content ---
export const projectCardProps = {
  cardBody: {
    borderRadius: "26px",
    borderColor: "#28384c",
    borderHoverColor: "#47ffe9",
    backgroundColor: "rgba(36,41,59,0.99)",
    borderWidth: 4,
  },
  pin: {
    backgroundColor: "#1f6feb",
    textColor: "#47ffe9",
    lineColorPrimary: "#1f6feb",
    lineColorSecondary: "#47ffe9",
    font: { fontSize: "1.12em", fontWeight: "bold" },
    title: "My Projects",
  },
  techIcons: techStack.map(({ icon, label }) => ({ icon, label })), // for floating bar
  cardHeader: (
    <h2 style={{ marginBottom: 0 }}>🚀 Gaia DR3 Interactive Dashboard</h2>
  ),
  cardBodyContent: (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1.12rem",
        color: "#d7f9f3",
        fontSize: "1.08rem",
        lineHeight: 1.62,
        fontWeight: 400,
        padding: "24px 24px 10px 24px",
        minHeight: 260,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ color: "#b1faed" }}>
        Explore billions of stars with interactive plots and real-time analytics. This dashboard ingests Gaia DR3 data into PostgreSQL, powers main-sequence and HR diagrams, and supports custom filters and queries.
      </div>
      <ul
        style={{
          margin: 0,
          paddingLeft: "1.05rem",
          color: "#aafee8",
          fontSize: "1.02rem",
          listStyle: "none",
          lineHeight: 1.52,
        }}
      >
        <li style={{ marginBottom: "2px" }}>
          <span style={{
            color: "#47ffe9",
            marginRight: 8,
            fontSize: "1.08em",
            verticalAlign: "middle",
          }}>▣</span>
          Full ETL pipeline (Python &amp; Docker)
        </li>
        <li style={{ marginBottom: "2px" }}>
          <span style={{
            color: "#47ffe9",
            marginRight: 8,
            fontSize: "1.08em",
            verticalAlign: "middle",
          }}>▣</span>
          Live HR diagrams &amp; sky maps (Streamlit, Plotly)
        </li>
        <li>
          <span style={{
            color: "#47ffe9",
            marginRight: 8,
            fontSize: "1.08em",
            verticalAlign: "middle",
          }}>▣</span>
          Fast SQL queries &amp; science-ready data
        </li>
      </ul>
      <div style={{ marginTop: 10, marginBottom: 3 }}>
        <strong style={{ color: "#7effff", fontWeight: 700, fontSize: "1.03em", letterSpacing: "0.01em" }}>
          Stack:
        </strong>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75em 1.2em",
          marginTop: 8,
          alignItems: "center",
        }}>
          {techStack.map(({ icon: Icon, label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "#3efcff",
                fontWeight: 500,
                fontSize: "1.08em",
                textDecoration: "none",
                transition: "color 0.13s",
                opacity: 0.96,
                padding: "2.5px 8px",
                borderRadius: "7px",
                background: "rgba(30,44,51,0.13)",
              }}
              onMouseOver={e => e.currentTarget.style.color = "#fff"}
              onMouseOut={e => e.currentTarget.style.color = "#3efcff"}
              title={label}
            >
              <Icon size={23} style={{ filter: "drop-shadow(0 2px 7px #2cfad245)" }} />
              <span style={{
                fontSize: "0.99em",
                fontWeight: 500,
                letterSpacing: "0.03em",
                textShadow: "0 1px 5px #171a2390"
              }}>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  ),
  cardFooterContent: (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 14,
        width: "100%",
        borderTop: "1px solid #23334177",
        padding: "14px 24px 7px 24px",
        marginTop: 8,
        boxSizing: "border-box",
      }}
    >
      <a
        href="https://github.com/yourusername/gaia-dr3-dashboard"
        style={{
          color: "#141f29",
          background: "linear-gradient(120deg, #47ffe9 75%, #1f6feb 110%)",
          padding: "6px 18px",
          borderRadius: 14,
          fontWeight: 700,
          textDecoration: "none",
          boxShadow: "0 2px 12px #47ffe933",
          transition: "background .15s",
          marginRight: 8,
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <a
        href="https://yourlivedemo.link"
        style={{
          color: "#141f29",
          background: "linear-gradient(120deg, #50ffe9 65%, #1faeb5 115%)",
          padding: "6px 18px",
          borderRadius: 14,
          fontWeight: 700,
          textDecoration: "none",
          boxShadow: "0 2px 12px #47ffe933",
          transition: "background .15s",
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        Live Demo
      </a>
    </div>
  ),
};
