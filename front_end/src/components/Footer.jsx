import React from 'react';
import styled from 'styled-components';
import { FaLeaf } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: #f7b731;  // Couleur jaune principale
  padding: 1.5rem 1rem;
  color: #2d3436;       // Texte foncé pour meilleur contraste
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-top: 3px solid rgba(0, 0, 0, 0.1);
`;

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  svg {
    color: #2e7d32;      // Vert pour l'icône
    font-size: 1.1rem;
  }

  span {
    font-weight: 600;
    font-size: 1rem;
  }
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  flex-wrap: wrap;
  margin: 0.3rem 0;

  a {
    color: #2d3436;
    text-decoration: none;
    transition: all 0.2s ease;
    font-size: 0.85rem;
    font-weight: 500;
    padding: 0.2rem 0;

    &:hover {
      color: #000;
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }
`;

const Copyright = styled.div`
  font-size: 0.75rem;
  color: rgba(45, 52, 54, 0.8);
  margin-top: 0.5rem;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <Brand>
          <FaLeaf />
          <span>SmartGrain</span>
        </Brand>
        
        <Links>
          <a href="#">Accueil</a>
          <a href="#">Produits</a>
          <a href="#">Agriculteurs</a>
          <a href="#">Contact</a>
        </Links>
        
        <Copyright>
          © {new Date().getFullYear()} SmartGrain - Tous droits réservés
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
}