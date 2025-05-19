// src/components/features/SysAdminCategoryCard/index.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Card = styled(motion.div)`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2rem;
  color: #fff;
  backdrop-filter: blur(8px);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 0 30px rgba(0,0,0,0.4);
  transform-style: preserve-3d;
  position: relative;

  &:hover {
    box-shadow: 0 0 40px rgba(255,255,255,0.2);
    transform: perspective(1000px) rotateX(5deg) rotateY(5deg) scale(1.02);
  }

  h3 {
    margin: 1rem 0 0.5rem;
  }

  p {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const PinLine = styled.div`
  position: absolute;
  top: -50px;
  left: 50%;
  width: 2px;
  height: 50px;
  background: linear-gradient(to bottom, transparent, rgba(255, 100, 0, 0.7));
  transform: translateX(-50%);
`;

export default function SysAdminCategoryCard({ title, subtitle, image, onClick }) {
  const [isHovered, setHovered] = useState(false);

  return (
    <Card
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isHovered && <PinLine />}
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </Card>
  );
}
