// src/pages/Home/homeCardProps.js
import jeenTree from "../../assets/images/jeen-tree.png";
import physConf from "../../assets/images/phys-conf.png";
import {
  SiPython,
  SiPostgresql,
  SiDocker,
  SiLinux,
  SiTerraform,
  SiGithub,
  SiMongodb,
  SiSnowflake,
} from "react-icons/si";

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
    title: "About Chris",
  },
  title: {
    text: "Science & Life",
    color: "#e7f7ff",
    font: { fontWeight: "bold" },
  },
  subtitle: {
    text: "Astrophysics researcher, data wrangler, and technology enthusiast. Making science accessible, automating everything, and driven by curiosity.",
    color: "#aec2e6",
    font: { fontWeight: 400 },
  },
  image: {
    borderRadius: "24px",
    image: { src: jeenTree },
  },
  techIcons: [
    { icon: SiPython, label: "Python" },
    { icon: SiPostgresql, label: "PostgreSQL" },
    { icon: SiDocker, label: "Docker" },
    { icon: SiLinux, label: "Linux" },
    { icon: SiTerraform, label: "Terraform" },
    { icon: SiGithub, label: "GitHub" },
  ],
};

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
    title: "Project Demos",
  },
  title: {
    text: "Code & Projects",
    color: "#e7f7ff",
    font: { fontWeight: "bold" },
  },
  subtitle: {
    text: "Designed resilient ETL pipelines, parallel simulations, and monitoring stacks. Managed billion-row datasets, automated infra with Ansible & Terraform, and delivered data-driven insights.",
    color: "#aec2e6",
    font: { fontWeight: 400 },
  },
  image: {
    borderRadius: "24px",
    image: { src: physConf },
  },
  techIcons: [
    { icon: SiPostgresql, label: "PostgreSQL" },
    { icon: SiMongodb, label: "MongoDB" },
    { icon: SiSnowflake, label: "Snowflake" },
    { icon: SiPython, label: "Python" },
    { icon: SiTerraform, label: "Terraform" },
    { icon: SiDocker, label: "Docker" },
  ],
};
