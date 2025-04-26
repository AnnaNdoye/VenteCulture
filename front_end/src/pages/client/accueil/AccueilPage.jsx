import React from 'react';
import { FaHome, FaSearch, FaShoppingCart, FaHistory, FaHeart } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';
import ProductGrid from './ProductGrid';
import PromoBanner from './PromoBanner';
import SearchBar from './SearchBar';
import DashboardLayout from './DashboardLayout';
import { SectionTitle, StatsGrid, StatCard } from '../../../styles/StyledComponents';

const AccueilPage = () => {
  const stats = [
    { icon: <FaShoppingCart />, count: 3, text: 'Produits dans le panier' },
    { icon: <FaHistory />, count: 5, text: 'Commandes en cours' },
    { icon: <FaHeart />, count: 8, text: 'Produits favoris' },
    { icon: <MdLocalOffer />, count: 12, text: 'Promotions actives' },
  ];

  // Produits locaux en promotion
  const promoProducts = [
    {
      id: 1,
      name: 'Riz local (5kg) - Vallée du Fleuve',
      price: 4500,
      discountPrice: 3800,
      currency: 'FCFA',
      image: '/images/riz-senegal.jpg',
      rating: 4.7,
      origin: 'Saint-Louis'
    },
    {
      id: 2,
      name: 'Mangues Kent (1kg)',
      price: 2000,
      discountPrice: 1500,
      currency: 'FCFA',
      image: '/images/mangues-senegal.jpg',
      rating: 4.5,
      origin: 'Niayes'
    },
    {
      id: 3,
      name: 'Arachides torréfiées (500g)',
      price: 1800,
      discountPrice: 1500,
      currency: 'FCFA',
      image: '/images/arachides.jpg',
      rating: 4.8,
      promotion: 'Spécial Ramadan'
    },
    {
      id: 4,
      name: 'Bissap séché (200g)',
      price: 1200,
      discountPrice: 1000,
      currency: 'FCFA',
      image: '/images/bissap.jpg',
      rating: 4.6,
      origin: 'Kaolack'
    },
  ];

  // Nouveaux produits locaux
  const newProducts = [
    {
      id: 5,
      name: 'Attiéké (1kg)',
      price: 2500,
      currency: 'FCFA',
      image: '/images/attieke.jpg',
      rating: 4.9,
      nouveau: true,
      origin: 'Thiès'
    },
    {
      id: 6,
      name: 'Lait caillé (Dakhar) - 1L',
      price: 1500,
      currency: 'FCFA',
      image: '/images/dakhar.jpg',
      rating: 4.7,
      nouveau: true,
      origin: 'Louga'
    },
    {
      id: 7,
      name: 'Noix de cajou (300g)',
      price: 3500,
      currency: 'FCFA',
      image: '/images/noix-cajou.jpg',
      rating: 4.5,
      origin: 'Casamance'
    },
    {
      id: 8,
      name: 'Pâte d\'arachide (Mafé)',
      price: 2000,
      currency: 'FCFA',
      image: '/images/pate-arachide.jpg',
      rating: 4.8,
      nouveau: true,
      origin: 'Diourbel'
    },
  ];

  return (
    <DashboardLayout>
      <SectionTitle>
        <FaHome /> Tableau de bord
      </SectionTitle>
      
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <div className="icon">{stat.icon}</div>
            <h3>{stat.count}</h3>
            <p>{stat.text}</p>
          </StatCard>
        ))}
      </StatsGrid>
      
      <SectionTitle>
        <MdLocalOffer />Nos  Produits 
      </SectionTitle>
      
      <ProductGrid products={promoProducts} promo={true} />
      
      <SectionTitle>
        <FaSearch /> Nouveaux produits agricoles
      </SectionTitle>
      
      <ProductGrid products={newProducts} />
    </DashboardLayout>
  );
};

export default AccueilPage;