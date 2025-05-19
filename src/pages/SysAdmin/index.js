import { useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import sysAdminData from "../../data/sysAdminData.json";
import SysAdminCard from "../../components/features/SysAdminCard";

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
      <h1>System Administration</h1>
      <p>I manage and automate secure, scalable systems. Below are some projects and tools I’ve used.</p>
      <CardGrid>
        {sysAdminData.map((item, idx) => (
          <SysAdminCard key={idx} {...item} />
        ))}
      </CardGrid>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  padding: 2rem;
  color: #fff;

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;
