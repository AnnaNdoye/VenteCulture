// PromoBanner.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { MdLocalOffer } from 'react-icons/md';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const BannerContainer = styled.div`
  background: linear-gradient(135deg, #4caf50, #8bc34a);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 30px rgba(76, 175, 80, 0.2);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 20%, rgba(255, 215, 0, 0.3) 50%, transparent 80%);
    background-size: 200% 200%;
    animation: ${shimmer} 10s linear infinite;
    z-index: 0;
  }
`;

const BannerContent = styled.div`
  z-index: 1;
  flex: 1;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    opacity: 0.9;
    max-width: 80%;
  }
  
  button {
    background-color: white;
    color: #4caf50;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 30px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      background: #FFD700;
    }
  }
`;

const BannerIcon = styled.div`
  z-index: 1;
  font-size: 8rem;
  margin-right: 2rem;
  opacity: 0.9;
  animation: ${float} 3s ease-in-out infinite;
  color: rgba(255, 255, 255, 0.9);
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
`;

const PromoBanner = () => {
  return (
    <BannerContainer>
      <BannerContent>
        <h2>Profitez de -15% sur notre sélection de produits frais</h2>
        <p>Offre spéciale pour soutenir les producteurs locaux - Découvrez notre gamme complète de produits agricoles de qualité.</p>
        <button>Voir les offres</button>
      </BannerContent>
      <BannerIcon>
        <MdLocalOffer />
      </BannerIcon>
    </BannerContainer>
  );
};

export default PromoBanner;