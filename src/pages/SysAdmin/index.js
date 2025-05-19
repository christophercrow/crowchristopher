import { useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import bgDesktop from '../../assets/images/server-room.jpg';
import { FaServer } from "react-icons/fa";
import { SiAmazonaws, SiAnsible } from "react-icons/si";
import { MdSettingsApplications } from "react-icons/md";
import { Link } from "react-router-dom";
import Cursor from "../../components/ui/Cursor";
import SysAdminCategoryCard from "../../components/features/SysAdminCategoryCard";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
};





export default function SysAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCardClick = (category) => {
    navigate(`/sysadmin/${category.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <PageWrapper
      as={motion.div}
      initial={{ scale: 1.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
        <Cursor />
      <Helmet>
        <title>System Administration | Christopher Crow</title>
        <meta name="description" content="System administration projects and skills of Christopher Crow." />
      </Helmet>

      <HeaderBar>
        <BackLink to="/">← Back to Home</BackLink>
      </HeaderBar>

      <HeroSection
        as={motion.div}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h1>System Administration</h1>
        <p>I manage and automate secure scalable systems. Below are some projects and tools I've used.</p>
      </HeroSection>

      <CardGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <SysAdminCategoryCard
            title="Server Monitoring"
            subtitle="Track and analyze server performance"
            icon="FaServer"
            onClick={() => handleCardClick("Server Monitoring")}
        />
        <SysAdminCategoryCard
            title="Ansible"
            subtitle="Provisioning and configuration"
            image="/path-to-ansible.jpg"
            onClick={() => handleCardClick("Ansible")}
        />
        <SysAdminCategoryCard
            title="AWS"
            subtitle="Cloud architecture and automation"
            image="/images/aws-thumbnail.jpg"
            onClick={() => handleCardClick("AWS")}
        />
        <SysAdminCategoryCard
            title="Configuration Management"
            subtitle="Manage infrastructure as code"
            image="/path-to-config.jpg"
            onClick={() => handleCardClick("Configuration Management")}
        />
      </CardGrid>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  background: url(${bgDesktop}) no-repeat center center fixed;
  background-size: cover;
  padding: 2rem;
  color: #fff;
  min-height: 100vh;
`;

const HeaderBar = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 2rem;
`;

const BackLink = styled(Link)`
  color: #fff;
  font-size: 1rem;
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const HeroSection = styled.div`
  text-align: center;
  margin: 5rem 0 3rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 2rem;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;

  h3 {
    margin-top: 1rem;
    font-size: 1.1rem;
  }

  &:hover {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
`;