import React from 'react';
import { FaBox, FaBoxOpen, FaMoneyBillWave, FaUsers, FaChartLine, FaStar } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';
import ProductGrid from '../../client/accueil/ProductGrid';
import PromoBanner from '../../client/accueil/PromoBanner';
import SearchBar from '../../client/accueil/SearchBar';
import DashboardLayout from './Dashboard';
import { SectionTitle, StatsGrid, StatCard } from '../../../styles/StyledComponents';

const AccueilVendeur = () => {
  const stats = [
    { icon: <FaBox />, count: 24, text: 'Produits en vente' },
    { icon: <FaBoxOpen />, count: 12, text: 'Commandes ce mois' },
    { icon: <FaMoneyBillWave />, count: '325,000', text: 'Revenus (FCFA)' },
    { icon: <FaUsers />, count: 8, text: 'Nouveaux clients' },
  ];

  // Produits nécessitant attention
  const produitsAttention = [
    {
      id: 1,
      name: 'Riz local (5kg) - Stock faible',
      price: 4500,
      stock: 3,
      currency: 'FCFA',
      image: '/images/riz-senegal.jpg',
      rating: 4.7,
      status: 'stock-faible'
    },
    {
      id: 2,
      name: 'Mangues Kent - Péremption proche',
      price: 2000,
      stock: 15,
      currency: 'FCFA',
      image: '/images/mangues-senegal.jpg',
      rating: 4.5,
      status: 'peremption'
    },
    {
      id: 3,
      name: 'Arachides torréfiées - Non renouvelé',
      price: 1800,
      stock: 0,
      currency: 'FCFA',
      image: '/images/arachides.jpg',
      rating: 4.8,
      status: 'rupture'
    },
  ];

  // Commandes récentes
  const recentOrders = [
    {
      id: 1001,
      customer: 'Awa Diop',
      amount: 12500,
      currency: 'FCFA',
      status: 'En préparation',
      date: '15/03/2023',
      items: ['Riz (2kg)', 'Bissap (200g)']
    },
    {
      id: 1000,
      customer: 'Moussa Fall',
      amount: 8500,
      currency: 'FCFA',
      status: 'Expédiée',
      date: '14/03/2023',
      items: ['Mangues (3kg)', 'Attiéké (1kg)']
    },
    {
      id: 999,
      customer: 'Khadija Ndiaye',
      amount: 6500,
      currency: 'FCFA',
      status: 'Livrée',
      date: '12/03/2023',
      items: ['Lait caillé (2L)', 'Noix de cajou (300g)']
    },
  ];

  // Avis récents
  const recentReviews = [
    {
      id: 1,
      product: 'Riz local (5kg)',
      customer: 'Ibrahima Sarr',
      rating: 5,
      comment: 'Excellent riz de très bonne qualité!',
      date: '14/03/2023'
    },
    {
      id: 2,
      product: 'Mangues Kent',
      customer: 'Aminata Diallo',
      rating: 4,
      comment: 'Délicieuses mais quelques fruits trop mûrs',
      date: '13/03/2023'
    },
  ];

  return (
    <DashboardLayout>
      <SectionTitle>
        Tableau de bord vendeur
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
        <FaChartLine /> Statistiques de vente
      </SectionTitle>
      
    </DashboardLayout>
  );
};

export default AccueilVendeur;