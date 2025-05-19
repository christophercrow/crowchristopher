import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  SiDocker, SiAnsible, SiNginx, SiPostgresql, SiUbuntu,
  SiPrometheus, SiGrafana, SiYaml, SiLinux, SiGit
} from "react-icons/si";

const iconMap = {
  Docker: SiDocker,
  Ansible: SiAnsible,
  Nginx: SiNginx,
  PostgreSQL: SiPostgresql,
  Prometheus: SiPrometheus,
  Grafana: SiGrafana,
  YAML: SiYaml,
  Ubuntu: SiUbuntu,
  Linux: SiLinux,
  Git: SiGit
};

export default function SysAdminCard({ title, description, tools, year }) {
  return (
    <CardWrapper
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
    >
      <h2>{title}</h2>
      <p>{description}</p>
      <ToolList>
        {tools.map((tool, idx) => {
          const Icon = iconMap[tool];
          return (
            <span key={idx}>
              {Icon && <Icon size={16} style={{ marginRight: 6 }} />}{tool}
            </span>
          );
        })}
      </ToolList>
      <Year>{year}</Year>
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  background-color: #111;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
  p {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: #ccc;
  }
`;

const ToolList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  span {
    display: inline-flex;
    align-items: center;
    background: #333;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    color: #88f0ff;
  }
`;

const Year = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #777;
`;