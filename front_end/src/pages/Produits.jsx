import styled from "styled-components";
import { fadeIn, slideInFromLeft } from "../styles/animations";
import { Container, Title, ProductsGrid } from "../styles/pages/Produits.styles";
import products from "../data/products"; // Vous pouvez créer ce fichier

const Produits = () => {
  return (
    <Container>
      <Title>Nos Produits Locaux</Title>
      
      <ProductsGrid>
        {products.map(product => (
          <ProductCard key={product.id} delay={`${0.1 * product.id}s`}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </ProductCard>
        ))}
      </ProductsGrid>
    </Container>
  );
};

const ProductCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease-out ${props => props.delay} both;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(247, 183, 49, 0.2);
  }
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  h3, p {
    padding: 1rem;
    margin: 0;
  }
  
  h3 {
    color: #f7b731;
  }
`;

export default Produits;