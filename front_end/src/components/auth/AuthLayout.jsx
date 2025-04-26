import styled, { keyframes } from 'styled-components';
import { FaLeaf } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Animation des feuilles
const leafFall = keyframes`
  0% {
    transform: translateY(-10vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AuthContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f8f9fa, #fff8e1, #f8f9fa);
  background-size: 200% 200%;
  animation: ${gradientFlow} 12s ease infinite;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;

const LeavesContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const Leaf = styled.div`
  position: absolute;
  font-size: 1.5rem;
  color: #2E7D32;
  animation: ${leafFall} linear infinite;
  opacity: 0;
  will-change: transform;
  
  &:nth-child(1) {
    left: 10%;
    animation-delay: 0s;
    animation-duration: 15s;
  }
  &:nth-child(2) {
    left: 25%;
    animation-delay: 2s;
    animation-duration: 12s;
  }
  &:nth-child(3) {
    left: 40%;
    animation-delay: 5s;
    animation-duration: 18s;
  }
  &:nth-child(4) {
    left: 65%;
    animation-delay: 3s;
    animation-duration: 14s;
  }
  &:nth-child(5) {
    left: 80%;
    animation-delay: 1s;
    animation-duration: 16s;
  }
`;

const FormCard = styled(motion.div)`
  width: 100%;
  max-width: 800px;  // Changé de 420px à 900px pour permettre des formulaires larges
  padding: 2.5rem 3rem;  // Padding horizontal augmenté
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(8px);
  border-top: 4px solid #FFD600;
  position: relative;
  z-index: 1;
  margin: 1rem;
  box-sizing: border-box;
  overflow: visible;

  @media (max-width: 768px) {  // Point de rupture ajusté
    padding: 2rem;
    max-width: 95%;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const LogoHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  
  svg {
    font-size: 3rem;
    color: #2E7D32;
    margin-bottom: 1rem;
    filter: drop-shadow(0 2px 4px rgba(46, 125, 50, 0.2));
  }

  h2 {
    font-size: 1.8rem;
    color: #333;
    font-weight: 700;
    margin: 0.5rem 0;
    background: linear-gradient(90deg, #2E7D32, #FFD600);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: #666;
    margin-top: 0.5rem;
    font-size: 1rem;
  }
`;

export default function AuthLayout({ children, title, subtitle, icon }) {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    // Créer des feuilles avec des positions et durées aléatoires
    const newLeaves = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 10,
      size: 1 + Math.random() * 1.5
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <AuthContainer>
      <LeavesContainer>
        {leaves.map(leaf => (
          <Leaf
            key={leaf.id}
            style={{
              left: `${leaf.left}%`,
              animationDelay: `${leaf.delay}s`,
              animationDuration: `${leaf.duration}s`,
              fontSize: `${leaf.size}rem`
            }}
          >
            <FaLeaf />
          </Leaf>
        ))}
      </LeavesContainer>

      <FormCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <LogoHeader>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {icon || <FaLeaf />}
          </motion.div>
          {title && <h2>{title}</h2>}
          {subtitle && <p>{subtitle}</p>}
        </LogoHeader>
        {children}
      </FormCard>
    </AuthContainer>
  );
}