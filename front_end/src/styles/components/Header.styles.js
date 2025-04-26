import styled from "styled-components";
import { fadeIn } from "../animations";

export const Container = styled.header`
  background: linear-gradient(135deg, #f7b731 0%, #f8a51b 100%);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-out;

  .logo {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      opacity: 0.9;
    }
  }
`;

export const NavList = styled.ul`
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const NavItem = styled.li`
  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      background-color: rgba(255,255,255,0.2);
    }
    
    &.active {
      background-color: rgba(255,255,255,0.3);
      font-weight: bold;
    }
  }
`;