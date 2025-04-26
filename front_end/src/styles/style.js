import styled, { keyframes } from 'styled-components';  // Add { keyframes } to the import
const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;
const fade = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const gradientBackground = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const wave = keyframes`
  0% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(25%) translateY(-20px); }
  100% { transform: translateX(0) translateY(0); }
`;

// Styles de base améliorés avec plus d'effets
const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  overflow-x: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 30%, rgba(46, 125, 50, 0.05) 0%, transparent 40%);
    z-index: -2;
  }
`;

const Section = styled.section`
  scroll-margin-top: 80px;
  width: 100%;
  padding: 6rem 0;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);

  &.show {
    opacity: 1;
    transform: translateY(0);
  }

  &:nth-child(even) {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9f5eb 100%);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232e7d32' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      z-index: -1;
    }
  }
`;

const FloatingLeaves = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: -1;
  
  span {
    position: absolute;
    display: block;
    width: 20px;
    height: 20px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232e7d32'%3E%3Cpath d='M17 8C8 10 5.9 16.8 4 18c1.1 1.9 2.3 2.7 4 2.9 3.5.5 6.7-1.9 7-5.5.3-3.9-3-6.5-6-7.5-1.6-.5-3.3-.5-5-.1-1.7.4-2.7 1.2-3 2.1.4-.8.8-1.6 1.6-2.1C9.9 6.5 13 6 16 7c2.4.8 4.3 2.4 5 4 .2.5.5 1 .5 1.5 0 .4-.1.9-.2 1.3-.2.5-.5 1-.8 1.4.3-.7.5-1.4.5-2.2C21 10.3 19 8 17 8z'/%3E%3C/svg%3E") no-repeat;
    opacity: 0.3;
    animation: ${float} 10s linear infinite;
    
    &:nth-child(1) {
      left: 20%;
      top: 10%;
      transform: scale(0.6);
      animation-delay: 0s;
      animation-duration: 15s;
    }
    
    &:nth-child(2) {
      left: 50%;
      top: 20%;
      transform: scale(1.2);
      animation-delay: 2s;
      animation-duration: 12s;
    }
    
    &:nth-child(3) {
      left: 70%;
      top: 30%;
      transform: scale(0.8);
      animation-delay: 4s;
      animation-duration: 18s;
    }
    
    &:nth-child(4) {
      left: 30%;
      top: 50%;
      transform: scale(1.5);
      animation-delay: 1s;
      animation-duration: 20s;
    }
    
    &:nth-child(5) {
      left: 80%;
      top: 60%;
      transform: scale(1);
      animation-delay: 3s;
      animation-duration: 14s;
    }
  }
`;

const TitleContainer = styled.div`
  text-align: center;
  padding: 1.5rem 1rem;
  margin: 0 auto;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 2.7rem;
  font-weight: 600;
  color: #2e7d32;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
  
  svg {
    color: #4caf50;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  line-height: 1.5;
  color: #555;
  margin: 0 auto;
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Highlight = styled.span`
  color: #2e7d32;
  font-weight: 500;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 4rem 0;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 1.2rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${props => props.primary 
    ? 'linear-gradient(135deg, #f7b731, #f5a623)'
    : 'linear-gradient(135deg, #f5f5f5, #e0e0e0)'};
  color: ${props => props.primary ? 'white' : '#333'};
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: ${props => props.primary 
    ? '0 6px 20px rgba(46, 125, 50, 0.3)' 
    : '0 6px 20px rgba(0,0,0,0.1)'};
  position: relative;
  overflow: hidden;
  z-index: 1;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  min-width: 250px;
  justify-content: center;

  &:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: ${props => props.primary 
      ? '0 12px 30px rgba(46, 125, 50, 0.4)' 
      : '0 12px 30px rgba(0,0,0,0.15)'};
    
    &::after {
      transform: translateY(0) scaleY(1);
    }
    
    svg {
      transform: translateX(5px);
    }
  }

  &:active {
    transform: translateY(0) scale(1);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.primary 
      ? 'linear-gradient(135deg, #4caf50, #2e7d32)' 
      : 'linear-gradient(135deg, #e0e0e0, #f5f5f5)'};
    z-index: -1;
    transform: translateY(100%) scaleY(0.5);
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    transform-origin: top;
  }

  svg {
    transition: transform 0.3s ease;
  }
`;


const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  background: linear-gradient(45deg, #2e7d32, #4caf50, #81c784);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 4rem;
  position: relative;
  padding-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: -1px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 5px;
    background: linear-gradient(90deg, #2e7d32, #4caf50);
    border-radius: 3px;
    animation: ${pulse} 3s ease infinite;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 4rem;
  padding: 0 2rem;
`;
// Définir d'abord FeatureIcon de manière indépendante
const FeatureIcon = styled.div`
  font-size: 4rem;
  color: #2e7d32;
  margin-bottom: 2rem;
  display: inline-block;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 60px;
    background: rgba(46,125,50,0.1);
    border-radius: 50%;
    z-index: -1;
    transition: all 0.5s ease;
  }
`;

// Puis définir FeatureCard
const FeatureCard = styled.div`
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  opacity: 0;
  transform: translateY(30px);
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: ${props => props.delay || '0s'};
  text-align: center;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: 1px solid rgba(0,0,0,0.05);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(46,125,50,0.1) 0%, rgba(255,255,255,0) 100%);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-15px) scale(1.03);
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);

    &::before {
      opacity: 1;
    }

    .feature-icon {
      transform: translateY(-10px) rotate(5deg);
      animation: ${float} 3s ease infinite;
      
      &::before {
        transform: translateX(-50%) scale(1.2);
        opacity: 0.8;
      }
    }
  }

  h3 {
    color: #2e7d32;
    margin: 2rem 0 1.5rem;
    font-size: 1.8rem;
    position: relative;
    display: inline-block;
    font-weight: 700;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #2e7d32, #4caf50);
      border-radius: 2px;
      transition: width 0.3s ease;
    }
  }

  &:hover h3::after {
    width: 100px;
  }

  p {
    color: #555;
    line-height: 1.8;
    font-size: 1.2rem;
    margin-top: 1.5rem;
  }
`;


const ProductCarousel = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 3rem;
  padding: 3rem;
  scrollbar-width: thin;
  scrollbar-color: #2e7d32 transparent;
  margin: 0 -2rem;
  position: relative;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    z-index: 2;
    pointer-events: none;
  }

  &::before {
    left: 0;
    background: linear-gradient(90deg, rgba(248,249,250,1) 0%, rgba(248,249,250,0) 100%);
  }

  &::after {
    right: 0;
    background: linear-gradient(90deg, rgba(248,249,250,0) 0%, rgba(248,249,250,1) 100%);
  }

  &::-webkit-scrollbar {
    height: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #2e7d32, #4caf50);
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
    margin: 0 100px;
  }
`;

const ProductCard = styled.div`
  min-width: 280px;
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  flex: 0 0 auto;
  border: 1px solid rgba(0,0,0,0.05);
  
  &:hover {
    transform: translateY(-15px) scale(1.03);
    box-shadow: 0 20px 50px rgba(0,0,0,0.2);
    
    img {
      transform: scale(1.1);
    }
    
    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(46,125,50,0.1) 0%, rgba(255,255,255,0) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
  }

  img {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 16px;
    margin-bottom: 1.5rem;
    transition: transform 0.5s ease;
    position: relative;
    z-index: 1;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }

  p {
    text-align: center;
    font-weight: 700;
    color: #333;
    font-size: 1.3rem;
    margin-top: 1.5rem;
    position: relative;
    padding-bottom: 1rem;
    z-index: 1;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 3px;
      background: linear-gradient(90deg, #2e7d32, #4caf50);
      border-radius: 2px;
      transition: width 0.3s ease;
    }
  }

  &:hover p::after {
    width: 120px;
  }
`;
const FooterImage = styled.div`
  background: linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url('/footer-bg.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 2.3rem 1.3rem; /* Version très compacte */
  text-align: center;
  border-radius: 20px; /* Bordure plus subtile */
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15); /* Ombre plus légère */
  margin-top: 2rem;
  min-height: 200px; /* Hauteur très réduite */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(46,125,50,0.25) 0%, rgba(0,0,0,0.65) 100%);
  }

  h3 {
    font-size: 2rem; /* Taille raisonnable */
    margin-bottom: 1rem;
    position: relative;
    z-index: 1;
    text-shadow: 1px 1px 4px rgba(0,0,0,0.5);

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 2px;
      background: white;
    }
  }

  p {
    max-width: 650px;
    margin: 0 auto 1.5rem;
    line-height: 1.6;
    font-size: 1.1rem;
    position: relative;
    z-index: 1;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    min-height: 240px;
    border-radius: 12px;
    
    h3 {
      font-size: 1.7rem;
      
      &::after {
        bottom: -6px;
        width: 50px;
      }
    }
    
    p {
      font-size: 0.95rem;
      margin-bottom: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    min-height: 220px;
    padding: 1.5rem 1rem;
    
    h3 {
      font-size: 1.5rem;
    }
  }
`;
const CTAButton = styled(Button)`
  margin: 2rem auto 0;
  animation: ${fadeIn} 1s ease forwards 0.6s;
  opacity: 0;
  display: flex;
  align-items: center;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    svg {
      transform: translateX(5px);
    }
  }
`;
// À la fin de style.js
export {
  fadeIn,
  fade,
  float,
  gradientBackground,
  pulse,
  rotate,
  wave,
  Container,
  Section,
  FloatingLeaves,
  TitleContainer,
  Title,
  Subtitle,
  Highlight,
  ButtonContainer,
  Button,
  SectionTitle,
  FeaturesGrid,
  FeatureIcon,
  FeatureCard,
  ProductCarousel,
  ProductCard,
  FooterImage,
  CTAButton
};