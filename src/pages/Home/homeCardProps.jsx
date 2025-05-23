import jeenTree from "../../assets/images/jeen-tree.png";
import physConf from "../../assets/images/phys-conf.png";

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
    text: "Physics, coding, and curiosity power everything I do.",
    color: "#aec2e6",
    font: { fontWeight: 400 },
  },
  image: {
    borderRadius: "24px",
    image: { src: jeenTree },
  },
  techIcons: [],
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
    text: "Production-ready, automated, and visually stunning solutions.",
    color: "#aec2e6",
    font: { fontWeight: 400 },
  },
  image: {
    borderRadius: "24px",
    image: { src: physConf },
  },
  techIcons: [],
};
