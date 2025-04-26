import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
`;

// Composants communs
export const SectionTitle = styled.h2`
  font-size: 2rem;
  background: linear-gradient(to right, #2e7d32, #8bc34a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.8rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  svg {
    font-size: 1.8rem;
    padding: 10px;
    background: linear-gradient(135deg, #4caf50, #8bc34a);
    color: white;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.2);
  }
  
  &:after {
    content: '';
    flex-grow: 1;
    height: 2px;
    background: linear-gradient(to right, #8bc34a, transparent);
    margin-left: 1rem;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.8rem;
  margin-bottom: 3rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: white;
  padding: 1.8rem;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #4caf50, #8bc34a, #FFD700);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    
    &:before {
      transform: scaleX(1);
    }
    
    .icon {
      animation: ${float} 2s ease-in-out infinite;
      background: linear-gradient(135deg, #4caf50, #FFD700);
    }
    
    h3 {
      color: #4caf50;
    }
  }
  
  .icon {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #4caf50, #8bc34a);
    color: white;
    font-size: 1.8rem;
    margin-bottom: 1rem;
    transition: all 0.5s ease;
  }
  
  h3 {
    font-size: 2.2rem;
    margin: 0.5rem 0;
    color: #333;
    transition: color 0.3s ease;
  }
  
  p {
    color: #666;
    margin: 0;
    font-size: 1rem;
  }
`;