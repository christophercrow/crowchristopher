import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo";
export default function NavBar() {
  const location = useLocation();
  return (
    <NavWrapper>
      <LogoWrap to="/" aria-label="Home">
      <Logo />
      </LogoWrap>
      <Links>
        <NavLink to="/" $active={location.pathname === "/"}>Home</NavLink>
        <NavLink to="/cybersecurity" $active={location.pathname.startsWith("/cyber")}>Cyber Security</NavLink>
        <NavLink to="/sysadmin" $active={location.pathname.startsWith("/sysadmin")}>SysAdmin</NavLink>
        <NavLink to="/me" $active={location.pathname.startsWith("/me")}>Me</NavLink>
      </Links>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  position: fixed; top: 0; left: 0;
  width: 100vw; height:75px;
  padding: 0 2.4vw;
  background: rgba(1, 8, 23, 0.608);
  backdrop-filter: blur(16px);
  display: flex; align-items: center; justify-content: space-between;
  z-index: 111;
  border-bottom: 1.2px solid rgba(71,255,233,0.03);
`;

const LogoWrap = styled(Link)`
  display: flex; align-items: center;
  height: 44px; width: 44px;
  border-radius: 50%;
  padding: 0.5em;
  background: rgba(71,255,233,0.11);
  justify-content: center;
  transition: background 0.15s;
  &:hover { background: rgba(71,255,233,0.21); }
`;

const Links = styled.div`
  display: flex; gap: 37px; align-items: center;
  @media (max-width: 900px) { gap: 17px; }
`;

const NavLink = styled(Link)`
  font-size: 18px; font-weight: 600;
  color: ${({ $active }) => ($active ? "#47ffe9" : "#f5faff")};
  letter-spacing: 0.03em;
  text-decoration: none;
  padding: 0.22em 0.33em 0.22em 0.33em;
  border-radius: 0.6em;
  transition: color 0.14s, background 0.19s, box-shadow 0.18s;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 0; bottom: -2.5px;
    width: 100%; height: 2.5px;
    background: linear-gradient(90deg,#47ffe9,#1f6feb);
    border-radius: 2px;
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transition: transform 0.28s cubic-bezier(.49,.16,.45,1.11);
    transform-origin: bottom left;
  }
  &:hover, &:focus {
    color: #47ffe9;
    background: rgba(71,255,233,0.10);
    &::after { transform: scaleX(1); }
  }
`;
