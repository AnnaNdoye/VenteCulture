import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { SectionTitle } from '../../../styles/StyledComponents';
import DashboardLayout from '../accueil/Dashboard';

// Styled Components
const DetailContainer = styled.div`
  padding: 2rem;
`;

const InfoSection = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const SectionTitleH3 = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const InfoText = styled.p`
  margin-bottom: 0.5rem;
  color: #374151;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
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
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;
`;

const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  color: #374151;
`;

const TotalText = styled.p`
  text-align: right;
  font-weight: 600;
  margin-top: 1rem;
  font-size: 1rem;
  color: #111827;
`;

const StatusSelect = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background-color: white;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const CommandeDetail = () => {
  const { id } = useParams();
  // Ici, vous récupéreriez la commande depuis votre API
  const commande = {
    id: id,
    client: 'Awa Diop',
    adresse: '123 Rue des Commerçants, Dakar',
    telephone: '+221 77 123 45 67',
    date: '15/03/2023',
    statut: 'en préparation',
    produits: [
      { nom: 'Riz local', quantité: 2, prix: 2000 },
      { nom: 'Bissap', quantité: 1, prix: 500 }
    ],
    total: 4500
  };

  const mettreAJourStatut = (nouveauStatut) => {
    // Logique pour mettre à jour le statut
    console.log(`Changement de statut pour la commande ${id}: ${nouveauStatut}`);
  };

  return (
    <DashboardLayout>
      <DetailContainer>
        <SectionTitle>
          Détails de la Commande #{commande.id}
        </SectionTitle>

        <InfoSection>
          <SectionTitleH3>Client</SectionTitleH3>
          <InfoText>{commande.client}</InfoText>
          <InfoText>{commande.adresse}</InfoText>
          <InfoText>{commande.telephone}</InfoText>
        </InfoSection>

        <InfoSection>
          <SectionTitleH3>Produits commandés</SectionTitleH3>
          <ProductTable>
            <TableHeader>
              <tr>
                <TableHeaderCell>Produit</TableHeaderCell>
                <TableHeaderCell>Quantité</TableHeaderCell>
                <TableHeaderCell>Prix unitaire</TableHeaderCell>
                <TableHeaderCell>Total</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody>
              {commande.produits.map((produit, index) => (
                <TableRow key={index}>
                  <TableCell>{produit.nom}</TableCell>
                  <TableCell>{produit.quantité}</TableCell>
                  <TableCell>{produit.prix.toLocaleString()} FCFA</TableCell>
                  <TableCell>{(produit.quantité * produit.prix).toLocaleString()} FCFA</TableCell>
                </TableRow>
              ))}
            </tbody>
          </ProductTable>
          <TotalText>Total: {commande.total.toLocaleString()} FCFA</TotalText>
        </InfoSection>

        <InfoSection>
          <SectionTitleH3>Statut de la commande</SectionTitleH3>
          <StatusSelect 
            value={commande.statut}
            onChange={(e) => mettreAJourStatut(e.target.value)}
          >
            <option value="en attente">En attente</option>
            <option value="en préparation">En préparation</option>
            <option value="expédiée">Expédiée</option>
            <option value="livrée">Livrée</option>
          </StatusSelect>
        </InfoSection>
      </DetailContainer>
    </DashboardLayout>
  );
};

export default CommandeDetail;