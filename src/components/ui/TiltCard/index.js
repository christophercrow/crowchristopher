// src/components/ui/TiltCard/index.js
import { useRef } from "react";
import { motion } from "framer-motion";

const calcTransform = (x, y, rect) => {
  const rotateX = ((y - rect.top - rect.height / 2) / rect.height) * -20;
  const rotateY = ((x - rect.left - rect.width / 2) / rect.width) * 20;
  return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
};

export default function TiltCard({ children }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.transform = calcTransform(e.clientX, e.clientY, rect);
  };

  const handleMouseLeave = () => {
    ref.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.2s ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform",
        perspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
}