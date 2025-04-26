import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { SectionTitle } from '../../../styles/StyledComponents';
import DashboardLayout from '../accueil/Dashboard';
import { FaPrint, FaFileDownload } from 'react-icons/fa';

// Styled Components
const FactureContainer = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const FactureHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const FactureTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #374151;

  &:hover {
    background-color: #f3f4f6;
  }

  &:first-child {
    background-color: #4caf50;
    color: white;
    border-color: #4caf50;

    &:hover {
      background-color: #3d8b40;
    }
  }
`;

const FactureContent = styled.div`
  margin-top: 2rem;
`;

const ClientInfo = styled.div`
  margin-bottom: 2rem;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const InfoLabel = styled.span`
  font-weight: 500;
  width: 120px;
  color: #6b7280;
`;

const InfoValue = styled.span`
  color: #374151;
`;

const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
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

const TotalSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const TotalContainer = styled.div`
  width: 300px;
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const GrandTotal = styled(TotalRow)`
  font-weight: 600;
  font-size: 1.125rem;
  margin-top: 1rem;
  color: #111827;
`;

const Facture = () => {
  const { id } = useParams();
  
  // Données simulées de la commande
  const commande = {
    id: id,
    date: '15/03/2023',
    client: {
      nom: 'Awa Diop',
      adresse: '123 Rue des Commerçants, Dakar',
      telephone: '+221 77 123 45 67',
      email: 'awa.diop@example.com'
    },
    produits: [
      { nom: 'Riz local (5kg)', quantité: 2, prix: 4500 },
      { nom: 'Bissap (200g)', quantité: 1, prix: 1200 }
    ],
    statut: 'payée'
  };

  // Calcul du total
  const sousTotal = commande.produits.reduce((sum, produit) => sum + (produit.prix * produit.quantité), 0);
  const taxe = 0; // Modifier selon votre pays
  const total = sousTotal + taxe;

  const generatePDF = () => {
    // Logique pour générer le PDF
    console.log('Génération du PDF en cours...');
  };

  return (
    <DashboardLayout>
      <FactureContainer>
        <FactureHeader>
          <FactureTitle>Facture #{commande.id}</FactureTitle>
          <ButtonGroup>
            <ActionButton onClick={() => window.print()}>
              <FaPrint /> Imprimer
            </ActionButton>
            <ActionButton onClick={generatePDF}>
              <FaFileDownload /> Télécharger PDF
            </ActionButton>
          </ButtonGroup>
        </FactureHeader>

        <FactureContent>
          <ClientInfo>
            <InfoRow>
              <InfoLabel>Date:</InfoLabel>
              <InfoValue>{commande.date}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Statut:</InfoLabel>
              <InfoValue>{commande.statut}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Client:</InfoLabel>
              <InfoValue>{commande.client.nom}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Adresse:</InfoLabel>
              <InfoValue>{commande.client.adresse}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Téléphone:</InfoLabel>
              <InfoValue>{commande.client.telephone}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Email:</InfoLabel>
              <InfoValue>{commande.client.email}</InfoValue>
            </InfoRow>
          </ClientInfo>

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

          <TotalSection>
            <TotalContainer>
              <TotalRow>
                <span>Sous-total:</span>
                <span>{sousTotal.toLocaleString()} FCFA</span>
              </TotalRow>
              <TotalRow>
                <span>Taxe:</span>
                <span>{taxe.toLocaleString()} FCFA</span>
              </TotalRow>
              <GrandTotal>
                <span>Total:</span>
                <span>{total.toLocaleString()} FCFA</span>
              </GrandTotal>
            </TotalContainer>
          </TotalSection>
        </FactureContent>
      </FactureContainer>
    </DashboardLayout>
  );
};

export default Facture;