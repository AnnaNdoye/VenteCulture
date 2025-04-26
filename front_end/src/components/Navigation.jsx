import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaLeaf, FaShoppingBasket, FaStore, FaEnvelope } from 'react-icons/fa';
import logo from '../assets/logo.png';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  background: rgba(46, 125, 50, 0.1);
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  border: 2px solid rgba(46, 125, 50, 0.2);

  &:hover {
    transform: scale(1.03);
    background: rgba(46, 125, 50, 0.15);
  }

  img {
    height: 60px;
    width: auto;
    margin-right: 15px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  h1 {
    margin: 0;
    color: #2e7d32;
    font-size: 1.6rem;
    font-weight: 700;
    font-family: 'Montserrat', sans-serif;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavItem = styled.li`
  position: relative;

  a {
    color: #333;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.7rem;
    transition: all 0.3s ease;

    &:hover {
      color: #f7b731;
    }

    &.active {
      color: #f7b731;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: #f7b731;
    transition: width 0.3s ease;
    border-radius: 2px;
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }
`;

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['accueil', 'produits', 'engagement', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && 
            element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoWrapper>
          <img src={logo} alt="Logo Grenier Intelligent" />
          <h1>SmartGrain</h1>
        </LogoWrapper>

        <Nav>
          <NavList>
            <NavItem className={activeSection === 'accueil' ? 'active' : ''}>
              <a href="#accueil">
                <FaLeaf size={18} /> Accueil
              </a>
            </NavItem>
            <NavItem className={activeSection === 'produits' ? 'active' : ''}>
              <a href="#produits">
                <FaShoppingBasket size={18} /> Produits
              </a>
            </NavItem>
            <NavItem className={activeSection === 'engagement' ? 'active' : ''}>
              <a href="#engagement">
                <FaStore size={18} /> Engagements
              </a>
            </NavItem>
            <NavItem className={activeSection === 'contact' ? 'active' : ''}>
              <a href="#contact">
                <FaEnvelope size={18} /> Contact
              </a>
            </NavItem>
          </NavList>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Navigation;