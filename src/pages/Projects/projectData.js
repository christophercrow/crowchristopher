import { SiPython, SiReact, SiDocker, SiStreamlit } from "react-icons/si";
import gaiaImg from "../../assets/images/phys-conf.png";
import dataSciImg from "../../assets/images/jeen-tree.png";
import fullStackImg from "../../assets/images/dorm-overalls.png";
import cyberImg from "../../assets/images/planetarium.png";
import Cursor from "../../components/ui/Cursor";

export const PROJECT_TOPICS = [
  { id: "astrophysics", label: "Astrophysics" },
  { id: "datascience", label: "Data Science" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "cybersecurity", label: "Cybersecurity" },
];

// Assign each project a topic ID:
export const projects = [
  {
    id: "astro1",
    topic: "astrophysics",
    title: "Gaia DR3 Dashboard",
    description: "Interactive dashboard for billions of Gaia stars. HR diagrams, sky maps, and advanced filtering built with Streamlit and PostgreSQL.",
    tech: [
      { icon: SiPython, label: "Python", url: "https://www.python.org/" },
      { icon: SiStreamlit, label: "Streamlit", url: "https://streamlit.io/" },
      { icon: SiDocker, label: "Docker", url: "https://www.docker.com/" },
    ],
    image: gaiaImg,
    link: "https://yourlivedemo.link",
    github: "https://github.com/yourusername/gaia-dr3-dashboard",
    updated: "2025-05-10",
  },
  {
    id: "datasci1",
    topic: "datascience",
    title: "Stellar Classification ML",
    description: "Machine learning pipeline for classifying stars using Gaia & WDS data. Includes uncertainty quantification and model interpretability.",
    tech: [
      { icon: SiPython, label: "Python", url: "https://www.python.org/" },
      { icon: SiReact, label: "React", url: "https://react.dev/" },
      { icon: SiStreamlit, label: "Streamlit", url: "https://streamlit.io/" },
    ],
    image: dataSciImg,
    link: "https://github.com/yourusername/stellar-ml",
    github: "https://github.com/yourusername/stellar-ml",
    updated: "2025-04-21",
  },
  {
    id: "fullstack1",
    topic: "fullstack",
    title: "Portfolio Platform v2",
    description: "A dynamic portfolio site with interactive physics UI and draggable elements, powered by React, Node.js, and PostgreSQL.",
    tech: [
      { icon: SiReact, label: "React", url: "https://react.dev/" },
      { icon: SiPython, label: "Node.js", url: "https://nodejs.org/" },
      { icon: SiDocker, label: "Docker", url: "https://www.docker.com/" },
    ],
    image: fullStackImg,
    link: "https://portfolio.yoursite.com",
    github: "https://github.com/yourusername/portfolio-v2",
    updated: "2025-04-02",
  },
  {
    id: "cyber1",
    topic: "cybersecurity",
    title: "Ansible Security Automation",
    description: "Automated playbooks for secure Linux provisioning and network hardening, with live monitoring and reporting.",
    tech: [
      { icon: SiPython, label: "Security", url: "https://www.ansible.com/" },
      { icon: SiPython, label: "Python", url: "https://www.python.org/" },
      { icon: SiDocker, label: "Docker", url: "https://www.docker.com/" },
    ],
    image: cyberImg,
    link: "https://github.com/yourusername/ansible-cyber",
    github: "https://github.com/yourusername/ansible-cyber",
    updated: "2025-03-14",
  },
  // Add more projects (with the appropriate topic) as desired!
];
