import React, { useState } from 'react';
import { FaBoxOpen, FaFileInvoice, FaTruck, FaEnvelope } from 'react-icons/fa';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { SectionTitle } from '../../../styles/StyledComponents';
import DashboardLayout from '../accueil/Dashboard';

// Styled Components
const Container = styled.div`
  padding: 2rem;
`;

const FiltresContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background-color: #f9fafb;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: #4caf50;
  cursor: pointer;
  padding: 0.5rem;
  margin-right: 0.5rem;
  transition: color 0.2s;
  display: inline-flex;
  align-items: center;

  &:hover {
    color: #388e3c;
  }

  svg {
    margin-right: 0.25rem;
  }
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-block;
  ${props => {
    switch(props.$status) {
      case 'expédiée': return 'background-color: #dcfce7; color: #166534;';
      case 'en préparation': return 'background-color: #fef9c3; color: #854d0e;';
      case 'annulée': return 'background-color: #fee2e2; color: #991b1b;';
      default: return 'background-color: #e0f2fe; color: #0369a1;';
    }
  }}
`;

const CommandeList = () => {
  const [commandes, setCommandes] = useState([
    {
      id: 1001,
      client: 'Awa Diop',
      date: '15/03/2023',
      montant: 12500,
      statut: 'en préparation',
      produits: ['Riz local (2kg)', 'Bissap (200g)']
    },
    {
      id: 1002,
      client: 'Moussa Fall',
      date: '16/03/2023',
      montant: 8500,
      statut: 'expédiée',
      produits: ['Mangues (3kg)', 'Attiéké (1kg)']
    },
    {
      id: 1003,
      client: 'Khadija Ndiaye',
      date: '17/03/2023',
      montant: 6500,
      statut: 'livrée',
      produits: ['Lait caillé (2L)', 'Noix de cajou (300g)']
    },
  ]);

  const [filtreStatut, setFiltreStatut] = useState('tous');

  const filtrerCommandes = () => {
    if (filtreStatut === 'tous') return commandes;
    return commandes.filter(cmd => cmd.statut === filtreStatut);
  };

  const changerStatut = (id, nouveauStatut) => {
    setCommandes(commandes.map(cmd => 
      cmd.id === id ? { ...cmd, statut: nouveauStatut } : cmd
    ));
  };

  return (
    <DashboardLayout>
      <Container>
        <SectionTitle>
          <FaBoxOpen /> Gestion des Commandes
        </SectionTitle>

        <FiltresContainer>
          <Select 
            value={filtreStatut}
            onChange={(e) => setFiltreStatut(e.target.value)}
          >
            <option value="tous">Toutes les commandes</option>
            <option value="en attente">En attente</option>
            <option value="en préparation">En préparation</option>
            <option value="expédiée">Expédiée</option>
            <option value="livrée">Livrée</option>
          </Select>
        </FiltresContainer>

        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>N° Commande</TableHeaderCell>
              <TableHeaderCell>Client</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Montant</TableHeaderCell>
              <TableHeaderCell>Statut</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            {filtrerCommandes().map(commande => (
              <TableRow key={commande.id}>
                <TableCell>{commande.id}</TableCell>
                <TableCell>{commande.client}</TableCell>
                <TableCell>{commande.date}</TableCell>
                <TableCell>{commande.montant.toLocaleString()} FCFA</TableCell>
                <TableCell>
                  <StatusBadge $status={commande.statut}>
                    {commande.statut}
                  </StatusBadge>
                </TableCell>
                <TableCell>
                  <ActionButton as={Link} to={`/vendeur/commandes/details`}>
                    Détails
                  </ActionButton>
                  <ActionButton as={Link} to={`/vendeur/commandes/facture`}>
                    <FaFileInvoice /> Facture
                  </ActionButton>
                  <ActionButton onClick={() => changerStatut(commande.id, 'expédiée')}>
                    <FaTruck /> Expédier
                  </ActionButton>
                  
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Container>
    </DashboardLayout>
  );
};

export default CommandeList;