import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaMoneyBillWave, FaClock, FaHistory, FaArrowRight } from 'react-icons/fa';

import DashboardLayout from '../accueil/Dashboard';
import { SectionTitle } from '../../../styles/StyledComponents';

const StatsContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border-left: 4px solid #4caf50;
`;

const StatTitle = styled.h3`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatValue = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
`;

const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  th {
    font-weight: 500;
    color: #6b7280;
    background: #f9fafb;
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;

  &.completed {
    background-color: #ecfdf5;
    color: #059669;
  }

  &.pending {
    background-color: #fef3c7;
    color: #d97706;
  }
`;

const WithdrawButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;

  &:hover {
    background-color: #3d8b40;
  }
`;

const RevenueStats = () => {
  const [stats, setStats] = useState({
    balance: 1250.50,
    pending: 320.75,
    total: 4570.25,
    transactions: []
  });

  useEffect(() => {
    // Simuler un appel API
    const mockTransactions = [
      { id: 1, amount: 59.97, date: '2023-05-15', status: 'completed' },
      { id: 2, amount: 29.99, date: '2023-05-14', status: 'pending' },
      { id: 3, amount: 120.00, date: '2023-05-12', status: 'completed' },
    ];
    
    setStats(prev => ({ ...prev, transactions: mockTransactions }));
  }, []);

  return (
    <DashboardLayout>
      <StatsContainer>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <SectionTitle>
            <FaMoneyBillWave /> Revenus et paiements
          </SectionTitle>
          <WithdrawButton to="/vendeur/statistiques">
            <FaArrowRight /> Demander un retrait
          </WithdrawButton>
        </div>

        <StatsGrid>
          <StatCard>
            <StatTitle>
              <FaMoneyBillWave /> Solde disponible
            </StatTitle>
            <StatValue>{stats.balance.toFixed(2)} €</StatValue>
          </StatCard>

          <StatCard>
            <StatTitle>
              <FaClock /> En attente
            </StatTitle>
            <StatValue>{stats.pending.toFixed(2)} €</StatValue>
          </StatCard>

          <StatCard>
            <StatTitle>
              <FaHistory /> Total gagné
            </StatTitle>
            <StatValue>{stats.total.toFixed(2)} €</StatValue>
          </StatCard>
        </StatsGrid>

        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
            <FaHistory /> Historique des transactions
          </h3>
          
          <TransactionsTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Montant</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {stats.transactions.map(tx => (
                <tr key={tx.id}>
                  <td>#{tx.id}</td>
                  <td>{tx.amount.toFixed(2)} €</td>
                  <td>{tx.date}</td>
                  <td>
                    <StatusBadge className={tx.status}>
                      {tx.status === 'completed' ? 'Complété' : 'En attente'}
                    </StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </TransactionsTable>
        </div>
      </StatsContainer>
    </DashboardLayout>
  );
};

export default RevenueStats;