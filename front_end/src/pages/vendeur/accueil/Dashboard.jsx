import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  FaBox, FaBoxOpen, FaMoneyBillWave, 
  FaUserEdit, FaComments, FaSignOutAlt, FaLeaf,
  FaStar, FaBell, FaUser
} from 'react-icons/fa';
import { MdDashboard, MdPayment } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../../client/accueil/SearchBar';

// Animations
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Conteneur principal avec barre de défilement stylisée
const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #f8f9fa;
  position: fixed;
  top: 0;
  left: 0;
`;

const Sidebar = styled.div`
  width: 280px;
  min-width: 280px;
  background: linear-gradient(135deg, #2e7d32, #4caf50, #8bc34a);
  color: white;
  padding: 2rem 1.5rem;
  box-shadow: 5px 0 25px rgba(0,0,0,0.15);
  height: 100vh;
  overflow-y: auto;
  position: relative;
  z-index: 10;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.3);
    border-radius: 3px;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 20%, rgba(255, 215, 0, 0.2) 50%, transparent 80%);
    background-size: 200% 200%;
    animation: ${shimmer} 10s linear infinite;
    z-index: -1;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, #2e7d32, #4caf50);
  z-index: 1;
  
  svg {
    font-size: 2.2rem;
    color: #FFD700;
    filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
  }
  
  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(to right, #fff, #FFD700);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 1px;
    margin: 0;
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 80% 10%, rgba(255, 215, 0, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2.5rem;
  position: relative;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0,0,0,0.2);
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2.5rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 5;
`;

const NavItem = styled.div`
  padding: 1rem 1.2rem;
  margin: 0.3rem 0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: ${props => props.active ? 'rgba(255,255,255,0.25)' : 'transparent'};
  font-weight: ${props => props.active ? '600' : 'normal'};
  
  &:hover {
    background-color: rgba(255,255,255,0.15);
    
    svg {
      color: #FFD700;
    }
  }
  
  svg {
    font-size: 1.3rem;
    transition: all 0.3s ease;
    color: ${props => props.active ? '#FFD700' : 'white'};
    min-width: 24px;
  }
`;

const UserActions = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  
  > div {
    position: relative;
    cursor: pointer;
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #f5f5f5;
    transition: all 0.3s ease;
    
    &:hover {
      background: #e0e0e0;
      transform: translateY(-2px);
      
      svg {
        color: #4caf50;
      }
    }
    
    svg {
      font-size: 1.3rem;
      color: #555;
      transition: all 0.3s ease;
    }
    
    span {
      position: absolute;
      top: -5px;
      right: -5px;
      background: linear-gradient(135deg, #f44336, #ff9800);
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.7rem;
      font-weight: bold;
      border: 2px solid white;
    }
  }
`;

const LogoutButton = styled.div`
  padding: 1rem 1.2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  margin-top: auto;
  position: sticky;
  bottom: 0;
  backdrop-filter: blur(5px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    
    svg {
      color: #FFD700;
    }
  }
  
  svg {
    font-size: 1.3rem;
    transition: all 0.3s ease;
  }
`;

const NavSectionTitle = styled.div`
  margin: 1.5rem 0 0.5rem 0;
  padding: 0 1.2rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255,255,255,0.7);
  font-weight: 600;
`;

const NotificationBadge = styled.span`
  margin-left: auto;
  background: linear-gradient(135deg, #f44336, #ff9800);
  color: white;
  border-radius: 50%;
  min-width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0 5px;
`;

const Dashboard = ({ children }) => {
  const [newOrders, setNewOrders] = useState(5);
  const [notifications, setNotifications] = useState(3);
  const [pendingReviews, setPendingReviews] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/products')) return 'products';
    if (path.includes('/categories')) return 'categories';
    if (path.includes('/orders')) return 'orders';
    if (path.includes('/payments')) return 'payments';
    if (path.includes('/shop')) return 'shop';
    if (path.includes('/delivery')) return 'delivery';
    if (path.includes('/reviews')) return 'reviews';
    if (path.includes('/support')) return 'support';
    if (path.includes('/notifications')) return 'notifications';
    if (path.includes('/account')) return 'account';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    console.log('Déconnexion...');
    navigate('/login');
  };

  return (
    <Container>
      <Sidebar>
        <LogoContainer>
          <FaLeaf />
          <h2>SmartGrain</h2>
        </LogoContainer>
        
        {/* Navigation principale */}
        <NavItem active={activeTab === 'dashboard'} onClick={() => handleNavigation('/vendeur')}>
          <MdDashboard /> Tableau de bord
        </NavItem>
        
        {/* Section Produits */}
        <NavSectionTitle>Gestion des Produits</NavSectionTitle>
        <NavItem active={activeTab === 'products'} onClick={() => handleNavigation('/vendeur/produits')}>
          <FaBox /> Mes Produits
        </NavItem>
        
        {/* Section Commandes */}
        <NavSectionTitle>Commandes</NavSectionTitle>
        <NavItem active={activeTab === 'orders'} onClick={() => handleNavigation('/vendeur/commande')}>
          <FaBoxOpen /> Commandes {newOrders > 0 && <NotificationBadge>{newOrders}</NotificationBadge>}
        </NavItem>
        
        {/* Section Paiements */}
        <NavSectionTitle>Paiements & Revenus</NavSectionTitle>
        <NavItem active={activeTab === 'payments'} onClick={() => handleNavigation('/vendeur/revenue')}>
          <FaMoneyBillWave /> Revenus et Retraits
        </NavItem>
        
        {/* Section Interactions */}
        <NavSectionTitle>Interactions</NavSectionTitle>
        <NavItem active={activeTab === 'reviews'} onClick={() => handleNavigation('/vendeur/support')}>
          <FaStar /> Avis et Support {pendingReviews > 0 && <NotificationBadge>{pendingReviews}</NotificationBadge>}
        </NavItem>
        
        {/* Section Compte */}
        <NavSectionTitle>Compte</NavSectionTitle>
        <NavItem active={activeTab === 'account'} onClick={() => handleNavigation('/vendeur/parametres')}>
          <FaUserEdit /> Mon compte
        </NavItem>
        
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt /> Déconnexion
        </LogoutButton>
      </Sidebar>
      
      <MainContent>
        <Header>
          <SearchBar placeholder="Rechercher parmi vos produits..." />
          
          <UserActions>
            <div onClick={() => handleNavigation('/vendeur/commandes')} title="Commandes">
              <FaBoxOpen />
              {newOrders > 0 && <span>{newOrders}</span>}
            </div>
            <div onClick={() => handleNavigation('/vendeur/notifications')} title="Notifications">
              <FaBell />
              {notifications > 0 && <span>{notifications}</span>}
            </div>
            <div onClick={() => handleNavigation('/vendeur/parametres')} title="Mon compte">
              <FaUser />
            </div>
          </UserActions>
        </Header>
        
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </MainContent>
    </Container>
  );
};

export default Dashboard;