import styled from "styled-components";
import logo from "../../../assets/icons/favicon.svg"; // adjust path if needed

export default function Footer() {
  return (
    <FooterOuter>
      <AccentBar />
      <FooterInner>
        <LogoWrap>
          <img src={logo} alt="Chris Crow logo" loading="lazy" />
        </LogoWrap>
        <FooterDetails>
          <SiteName>Chris Crow</SiteName>
          <Year>© {new Date().getFullYear()} All rights reserved.</Year>
        </FooterDetails>
        <Socials>
          <a
            href="https://github.com/christophercrow"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.77.5 12.26c0 5.2 3.29 9.6 7.86 11.16.58.1.79-.26.79-.58v-2.07c-3.2.71-3.87-1.54-3.87-1.54-.53-1.41-1.31-1.79-1.31-1.79-1.07-.77.08-.76.08-.76 1.19.09 1.82 1.26 1.82 1.26 1.06 1.87 2.79 1.33 3.47 1.02.11-.79.41-1.33.75-1.63-2.56-.3-5.25-1.34-5.25-5.94 0-1.31.46-2.38 1.22-3.22-.12-.3-.53-1.51.12-3.16 0 0 .99-.33 3.25 1.23a11.07 11.07 0 0 1 5.92 0c2.25-1.56 3.25-1.23 3.25-1.23.65 1.65.24 2.86.12 3.16.76.84 1.22 1.91 1.22 3.22 0 4.61-2.69 5.63-5.26 5.93.43.37.81 1.09.81 2.2v3.26c0 .33.21.68.8.58C20.22 21.86 23.5 17.46 23.5 12.26 23.5 5.77 18.35.5 12 .5z" />
            </GitHubIcon>
          </a>
        </Socials>
      </FooterInner>
    </FooterOuter>
  );
}

// --- Styled Components ---

const FooterOuter = styled.footer`
  width: 100vw;
  background: linear-gradient(180deg, #17182c 0%, #131427 100%);
  box-shadow: 0 -4px 32px #1f223433;
  position: relative;
  margin-top: 54px;
  padding: 0;
`;

const AccentBar = styled.div`
  width: 100vw;
  height: 6px;
  background: linear-gradient(90deg, #47ffe9 0%, #1f6feb 100%);
  opacity: 0.92;
`;

const FooterInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 26px 16px 18px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`;

const LogoWrap = styled.div`
  width: 48px;
  height: 48px;
  background: #181f36;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px #47ffe944;
  img {
    width: 32px;
    height: 32px;
    display: block;
  }
`;

const FooterDetails = styled.div`
  flex: 1;
  min-width: 0;
  color: #b3eaff;
  display: flex;
  flex-direction: column;
  gap: 0.15em;
  align-items: flex-start;
`;

const SiteName = styled.div`
  font-weight: bold;
  font-size: 1.22em;
  letter-spacing: 0.04em;
  color: #47ffe9;
  margin-bottom: 1px;
`;

const Year = styled.div`
  font-size: 0.99em;
  color: #7fa5bb;
  letter-spacing: 0.02em;
`;

const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  a {
    color: #47ffe9;
    transition: color 0.17s;
    &:hover { color: #1f6feb; }
  }
`;

const GitHubIcon = styled.svg`
  width: 28px;
  height: 28px;
  fill: currentColor;
`;

