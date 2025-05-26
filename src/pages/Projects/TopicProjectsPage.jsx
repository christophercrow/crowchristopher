import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { projects, PROJECT_TOPICS } from "./projectData";
import Animated3DPinCardFramer, { CardHeader, CardBody, CardFooter } from "../../components/framer/3dpin-card.jsx";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(410px, 1fr));
  gap: 3.2rem 2.1rem;
  justify-items: center;
  padding: 4.5rem 2vw 3.2rem 2vw;
  width: 100%;
  max-width: 1480px;
  margin: 0 auto;
`;

export default function TopicProjectsPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const topic = PROJECT_TOPICS.find(t => t.id === topicId);
  const topicProjects = projects
    .filter(p => p.topic === topicId)
    .sort((a, b) => new Date(b.updated) - new Date(a.updated));

  if (!topic) {
    return <div style={{ color: "#ff5a5a", padding: "4rem", fontSize: "1.4rem" }}>No such topic!</div>;
  }

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      background: "#181f2a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <h1 style={{
        marginTop: "2.5rem",
        color: "#47ffe9",
        fontWeight: 900,
        fontSize: "2.45rem",
        letterSpacing: "0.015em",
        textAlign: "center",
      }}>
        {topic.label} Projects
      </h1>
      <button
        onClick={() => navigate("/projects")}
        style={{
          margin: "0 0 1.9rem 0",
          fontSize: "1.07em",
          background: "none",
          color: "#47ffe9",
          border: "1.4px solid #47ffe9",
          borderRadius: 7,
          padding: "6px 18px",
          cursor: "pointer",
        }}
      >
        ← Back to All Projects
      </button>
      <Grid>
        {topicProjects.map(project => (
          <Animated3DPinCardFramer
            key={project.id}
            cardBody={{
              borderRadius: "26px",
              borderColor: "#28384c",
              borderHoverColor: "#47ffe9",
              backgroundColor: "rgba(36,41,59,0.99)",
              borderWidth: 4,
            }}
            pin={{
              backgroundColor: "#47ffe9",
              textColor: "#1f6feb",
              lineColorPrimary: "#47ffe9",
              lineColorSecondary: "#1f6feb",
              font: { fontSize: "1.12em", fontWeight: "bold" },
              title: "View Project",
            }}
            techIcons={project.tech}
            onPinClick={() => window.open(project.link, "_blank")}
          >
            <CardHeader>
              <div style={{
                fontWeight: 700,
                color: "#49ffe4",
                fontSize: "1.26rem",
                marginBottom: "0.18rem",
                letterSpacing: "0.01em",
              }}>{project.title}</div>
            </CardHeader>
            <CardBody>
              <div style={{
                fontSize: "1.11rem",
                color: "#eaf6fb",
                marginBottom: "0.9rem"
              }}>
                {project.description}
              </div>
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: 180,
                  borderRadius: 13,
                  boxShadow: "0 3px 18px #16254455",
                  margin: "0.7rem 0 0 0",
                  border: "1px solid #243343",
                }}
              />
            </CardBody>
            <CardFooter>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: "1.01rem",
                color: "#a4e6f7",
                fontWeight: 500,
                marginTop: "0.8rem"
              }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#141f29",
                    background: "linear-gradient(120deg, #47ffe9 75%, #1f6feb 110%)",
                    padding: "5px 14px",
                    borderRadius: 14,
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "0 2px 12px #47ffe933",
                    transition: "background .15s",
                  }}
                >
                  GitHub
                </a>
                {project.link && project.link !== project.github && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#141f29",
                      background: "linear-gradient(120deg, #50ffe9 65%, #1faeb5 115%)",
                      padding: "5px 14px",
                      borderRadius: 14,
                      fontWeight: 700,
                      textDecoration: "none",
                      boxShadow: "0 2px 12px #47ffe933",
                      transition: "background .15s",
                    }}
                  >
                    Live Demo
                  </a>
                )}
                <span style={{
                  fontSize: "0.95em",
                  color: "#7affd3",
                  opacity: 0.85,
                  marginLeft: "auto"
                }}>
                  Updated: {project.updated}
                </span>
              </div>
            </CardFooter>
          </Animated3DPinCardFramer>
        ))}
      </Grid>
      {!topicProjects.length && (
        <div style={{ color: "#baffff", margin: "2rem", fontSize: "1.2rem" }}>
          No projects in this category yet!
        </div>
      )}
    </div>
  );
}
