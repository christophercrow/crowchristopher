import { useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import sysAdminData from "../../data/sysAdminData.json";
import SysAdminCard from "../../components/features/SysAdminCard";
import bgDesktop from '../../assets/images/bg.jpg';
import DesktopNav from "../../components/layout/DesktopNav";

export default function SysAdmin() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageWrapper>
      <Helmet>
        <title>System Administration | Christopher Crow</title>
        <meta name="description" content="System administration projects and skills of Christopher Crow." />
      </Helmet>
      <BackgroundImage />
      <DesktopNav />
      <Content>
        <h1>System Administration</h1>
        <p>I manage and automate secure, scalable systems. Below are some projects and tools I’ve used.</p>
        <CardGrid>
          {sysAdminData.map((item, idx) => (
            <SysAdminCard key={idx} {...item} />
          ))}
        </CardGrid>
      </Content>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
  background-color: #000;
  overflow-x: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${bgDesktop}) no-repeat center center;
  background-size: cover;
  filter: brightness(95%);
  z-index: -1;
`;

const Content = styled.div`
  padding: 2rem 4rem;
  color: #fff;
  position: relative;
  z-index: 1;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }

  @media screen and (max-width: 767px) {
    padding: 2rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;
