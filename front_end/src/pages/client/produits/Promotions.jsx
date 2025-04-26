import React from 'react';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import styled from 'styled-components';
import DashboardLayout from '../../client/accueil/DashboardLayout';
import { SectionTitle } from '../../../styles/StyledComponents';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 1rem;
  flex: 1;
`;

const ProductName = styled.h2`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  font-size: 1rem;
  color: #4caf50;
  font-weight: bold;
`;

const Promotion = styled.span`
  font-size: 0.9rem;
  color: red;
  font-weight: bold;
  display: block;
  margin-top: 0.3rem;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.5rem;

  svg {
    color: gold;
  }
`;

const AddToCartBtn = styled.button`
  background: #4caf50;
  color: white;
  border: none;
  border-top: 1px solid #eee;
  padding: 0.75rem;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s;

  &:hover {
    background: #388e3c;
  }

  svg {
    font-size: 1rem;
  }
`;

const produits = [
  {
    id: 1,
    nom: 'Casque Minier',
    prix: '25000',
    image: 'https://via.placeholder.com/200x150?text=Casque',
    rating: 4,
    promotion: '10% de réduction',
  },
  {
    id: 2,
    nom: 'Gants de sécurité',
    prix: '15000',
    image: 'https://via.placeholder.com/200x150?text=Gants',
    rating: 5,
  },
  {
    id: 3,
    nom: 'Lunettes de protection',
    prix: '10000',
    image: 'https://via.placeholder.com/200x150?text=Lunettes',
    rating: 4,
    promotion: 'Offre spéciale !',
  },
];

const PromotionsPage = () => {
  const produitsEnPromotion = produits.filter(p => p.promotion);

  return (
    <DashboardLayout>
      <SectionTitle>Promotions & Offres Spéciales</SectionTitle>

      {produitsEnPromotion.length === 0 ? (
        <p>Aucune promotion en cours.</p>
      ) : (
        <Grid>
          {produitsEnPromotion.map(produit => (
            <Card key={produit.id}>
              <Image src={produit.image} alt={produit.nom} />
              <Info>
                <ProductName>{produit.nom}</ProductName>
                <Price>{parseInt(produit.prix).toLocaleString()} FCFA</Price>
                <Promotion>{produit.promotion}</Promotion>
                <Rating>
                  {[...Array(produit.rating)].map((_, index) => (
                    <FaStar key={index} />
                  ))}
                </Rating>
              </Info>
              <AddToCartBtn>
                <FaShoppingCart /> Ajouter au panier
              </AddToCartBtn>
            </Card>
          ))}
        </Grid>
      )}
    </DashboardLayout>
  );
};

export default PromotionsPage;
