import styled from "styled-components";
import { slideInFromLeft } from "../animations";

export const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`;

export const Title = styled.h1`
  color: #f7b731;
  text-align: center;
  margin-bottom: 3rem;
  animation: ${slideInFromLeft} 0.8s ease-out;
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;