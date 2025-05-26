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
  techIcons: [
    { icon: SiPython, label: "Python" },
    { icon: SiPandas, label: "Pandas" },
    { icon: SiReact, label: "React" },
    { icon: SiStreamlit, label: "Streamlit" },
    { icon: SiPostgresql, label: "PostgreSQL" },
    { icon: SiDocker, label: "Docker" },
    { icon: SiLinux, label: "Linux" },
    { icon: SiTerraform, label: "Terraform" },
    { icon: SiGithub, label: "GitHub" },
  ],
  cardHeader: (
    <h2>About Me</h2>
  ),
  cardBodyContent: (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        textAlign: "left",
        gap: "1.15rem",
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
      <div
        style={{
          fontWeight: 700,
          fontSize: "1.19rem",
          letterSpacing: "0.01em",
          color: "#47ffe9",
          marginBottom: "-0.25rem",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span role="img" aria-label="wave">👋</span>
        Hi, I'm <span style={{ color: "#9af0ff", marginLeft: 4 }}>Chris Crow</span>
      </div>
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
        <li style={{ marginBottom: "2px", position: "relative" }}>
          <span style={{
            color: "#60fff8",
            marginRight: 8,
            fontSize: "1.12em",
            verticalAlign: "middle",
          }}>✦</span>
          Stellar evolution & galaxy simulation
        </li>
        <li style={{ marginBottom: "2px", position: "relative" }}>
          <span style={{
            color: "#60fff8",
            marginRight: 8,
            fontSize: "1.12em",
            verticalAlign: "middle",
          }}>✦</span>
          Machine learning for star classification
        </li>
        <li style={{ marginBottom: "2px", position: "relative" }}>
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
  techIcons: [
    { icon: SiReact, label: "React" },
    { icon: SiStreamlit, label: "Streamlit" },
    { icon: SiPython, label: "Python" },
    { icon: SiPostgresql, label: "PostgreSQL" },
    { icon: SiMongodb, label: "MongoDB" },
    { icon: SiSnowflake, label: "Snowflake" },
    { icon: SiDocker, label: "Docker" },
    { icon: SiTerraform, label: "Terraform" },
    { icon: SiGithub, label: "GitHub" },
  ],
  cardHeader: (
    <h2>Featured Project</h2>
  ),
  cardBodyContent: (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1.09rem",
        color: "#d7f9f3",
        fontSize: "1.08rem",
        lineHeight: 1.62,
        fontWeight: 400,
        padding: "24px 24px 10px 24px",
        minHeight: 240,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: "1.15rem",
          color: "#6fffe3",
          marginBottom: "-0.1rem",
          letterSpacing: "0.01em",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <span role="img" aria-label="rocket">🚀</span>
        Gaia DR3 Interactive Dashboard
      </div>
      <div style={{ color: "#b1faed" }}>
        Explore billions of stars with interactive plots and real-time analytics. This dashboard ingests Gaia DR3 data into PostgreSQL, powers main-sequence and HR diagrams, and supports custom filters and queries.
      </div>
      <ul
        style={{
          margin: 0,
          paddingLeft: "1.09rem",
          color: "#aafee8",
          fontSize: "1.01rem",
          listStyle: "none",
          lineHeight: 1.52,
        }}
      >
        <li style={{ marginBottom: "2px", position: "relative" }}>
          <span style={{
            color: "#47ffe9",
            marginRight: 8,
            fontSize: "1.08em",
            verticalAlign: "middle",
          }}>▣</span>
          Full ETL pipeline (Python &amp; Docker)
        </li>
        <li style={{ marginBottom: "2px", position: "relative" }}>
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
      <div style={{
        fontSize: "0.98rem",
        color: "#81f4ff",
        marginTop: 2,
        fontWeight: 500,
        letterSpacing: ".02em"
      }}>
        <strong>Stack:</strong> Python • PostgreSQL • Streamlit • Plotly
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
