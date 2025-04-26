import React, { useState } from 'react';
import { FaShoppingCart, FaStar,FaHeart, FaRegHeart  } from 'react-icons/fa';
import styled from 'styled-components';
import DashboardLayout from '../../client/accueil/DashboardLayout';
import { SectionTitle } from '../../../styles/StyledComponents';


// Styles
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

const ControlBar = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  padding: 0.5rem;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;


// Ajout du style pour le bouton favori
const FavoriteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  color: ${props => props.isFavorite ? 'red' : '#555'};
  z-index: 2;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: scale(1.1);
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
    vendeur: 'Mining Pro',
    stock: 15,
    description: 'Casque de sécurité pour travaux miniers avec protection intégrée'
  },
  {
    id: 2,
    nom: 'Gants de sécurité',
    prix: '15000',
    image: 'https://via.placeholder.com/200x150?text=Gants',
    rating: 5,
    vendeur: 'Safety Gear',
    stock: 30,
    description: 'Gants résistants pour protection des mains'
  },
  {
    id: 3,
    nom: 'Lunettes de protection',
    prix: '10000',
    image: 'https://via.placeholder.com/200x150?text=Lunettes',
    rating: 4,
    promotion: 'Offre spéciale !',
    vendeur: 'Eye Pro',
    stock: 22,
    description: 'Lunettes anti-rayures et anti-buée'
  },
];

const ProduitsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fonction pour basculer un produit en favori
  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter(id => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const filteredProduits = produits.filter(p => {
    const matchesSearch = p.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.vendeur.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                          p.nom.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  const sortedProduits = [...filteredProduits].sort((a, b) => {
    if (sortBy === 'prix') return parseInt(a.prix) - parseInt(b.prix);
    if (sortBy === 'popularite') return b.rating - a.rating;
   
    return 0;
  });

  return (
    <DashboardLayout>
      <SectionTitle>Nos Produits</SectionTitle>

      <ControlBar>
        <Input
          type="text"
          placeholder="Rechercher un produit, vendeur ou description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Toutes catégories</option>
            
          </Select>

          <Select onChange={(e) => setSortBy(e.target.value)}>
            <option value="none">Trier par...</option>
            <option value="prix">Prix croissant</option>
            <option value="popularite">Popularité</option>
          
          </Select>
        </div>
      </ControlBar>

      <Grid>
        {sortedProduits.map((produit) => (
          <Card key={produit.id}>
            <FavoriteButton 
              onClick={() => toggleFavorite(produit.id)}
              isFavorite={favorites.includes(produit.id)}
            >
              {favorites.includes(produit.id) ? <FaHeart /> : <FaRegHeart />}
            </FavoriteButton>
            
            <Image src={produit.image} alt={produit.nom} />
            <Info>
              <ProductName>{produit.nom}</ProductName>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                Vendeur: {produit.vendeur}
              </div>
              <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                {produit.description}
              </div>
              <Price>{parseInt(produit.prix).toLocaleString()} FCFA</Price>
              <div style={{ fontSize: '0.9rem', margin: '0.3rem 0' }}>
                Stock: {produit.stock} disponibles
              </div>
              {produit.promotion && <Promotion>{produit.promotion}</Promotion>}
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
    </DashboardLayout>
  );
};

export default ProduitsPage;