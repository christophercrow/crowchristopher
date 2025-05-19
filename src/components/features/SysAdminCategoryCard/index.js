// src/components/features/SysAdminCategoryCard/index.js
import React from "react";
import TiltCard from "../../ui/TiltCard";
import data from "../../../data/sysAdminData.json";
import { motion } from "framer-motion";

const toolLogos = {
  UFW: "/assets/icons/ufw.svg",
  Fail2Ban: "/assets/icons/fail2ban.svg",
  SSH: "/assets/icons/ssh.svg",
  AIDE: "/assets/icons/aide.svg",
  Lynis: "/assets/icons/lynis.svg",
  Ansible: "/assets/icons/ansible.svg",
  YAML: "/assets/icons/yaml.svg",
  Git: "/assets/icons/git.svg",
  Docker: "/assets/icons/docker.svg",
  "Docker Compose": "/assets/icons/docker-compose.svg",
  Nginx: "/assets/icons/nginx.svg",
  PostgreSQL: "/assets/icons/postgresql.svg",
  Prometheus: "/assets/icons/prometheus.svg",
  Grafana: "/assets/icons/grafana.svg",
  "Node Exporter": "/assets/icons/node-exporter.svg",
};

const SysAdminCategoryCard = () => {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {data.map((item, index) => (
        <TiltCard key={index}>
          <motion.div
            className="relative bg-zinc-900 p-6 rounded-2xl text-zinc-100 w-full max-w-sm min-h-[420px] shadow-xl"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Glowing Pin */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-3 h-3 bg-orange-400 rounded-full shadow-[0_0_20px_5px_rgba(255,165,0,0.5)]"></div>
              <div className="w-0.5 h-20 bg-gradient-to-b from-transparent to-orange-400 mx-auto"></div>
            </div>
            <h3 className="text-xl font-bold text-center mt-6">{item.title}</h3>
            <p className="text-sm text-zinc-400 text-center mt-2">{item.description}</p>
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {item.tools.map((tool, idx) => (
                <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-zinc-800 rounded-full text-xs">
                  {toolLogos[tool] && (
                    <img src={toolLogos[tool]} alt={tool} className="w-4 h-4" />
                  )}
                  <span>{tool}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-500 text-center mt-4">{item.year}</p>
          </motion.div>
        </TiltCard>
      ))}
    </div>
  );
};

export default SysAdminCategoryCard;
