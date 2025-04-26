import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FaMapMarkerAlt, 
  FaMoneyBill, 
  FaTruck, 
  FaCheckCircle,
  FaShoppingCart,
  FaRegCreditCard,
  FaShippingFast
} from 'react-icons/fa';
import DashboardLayout from '../../client/accueil/DashboardLayout';
import { SectionTitle } from '../../../styles/StyledComponents';

const CommandePage = () => {
  // Données et état
  const [panier] = useState([
    { id: 1, nom: 'Casque Minier', prix: 25000, quantite: 1 },
    { id: 2, nom: 'Gants de sécurité', prix: 15000, quantite: 2 }
  ]);
  
  const [etatCommande] = useState('En préparation');
  const [form, setForm] = useState({
    adresse: '',
    paiement: ''
  });
  const [confirmation, setConfirmation] = useState(false);

  const total = panier.reduce((acc, item) => acc + item.prix * item.quantite, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const validerCommande = () => {
    if (form.adresse && form.paiement) {
      setConfirmation(true);
    } else {
      alert('Veuillez compléter toutes les informations requises');
    }
  };

  return (
    <DashboardLayout>
      <SectionTitle>Finaliser votre commande</SectionTitle>
      
      <GridContainer>
        {/* Colonne gauche - Processus de commande */}
        <LeftColumn>
          <StepCard>
            <StepHeader>
              <FaShoppingCart />
              <h3>Votre panier</h3>
            </StepHeader>
            {panier.map(item => (
              <ProductItem key={item.id}>
                <span>{item.nom} × {item.quantite}</span>
                <strong>{(item.prix * item.quantite).toLocaleString()} FCFA</strong>
              </ProductItem>
            ))}
            <Total>
              <span>Total à payer</span>
              <strong>{total.toLocaleString()} FCFA</strong>
            </Total>
          </StepCard>

          <StepCard>
            <StepHeader>
              <FaMapMarkerAlt />
              <h3>Livraison</h3>
            </StepHeader>
            <Label>Adresse de livraison</Label>
            <Input
              name="adresse"
              placeholder="Ex: Rue 12, Dakar"
              value={form.adresse}
              onChange={handleChange}
              required
            />
          </StepCard>

          <StepCard>
            <StepHeader>
              <FaRegCreditCard />
              <h3>Paiement</h3>
            </StepHeader>
            <Label>Méthode de paiement</Label>
            <Select 
              name="paiement"
              value={form.paiement}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez...</option>
              <option value="carte">Carte Bancaire</option>
              <option value="wave">Wave</option>
              <option value="orangeMoney">Orange Money</option>
              <option value="mtnMoney">MTN Mobile Money</option>
              <option value="livraison">Paiement à la livraison</option>
            </Select>
          </StepCard>
        </LeftColumn>

        {/* Colonne droite - Récapitulatif */}
        <RightColumn>
          <SummaryCard>
            <h3>Récapitulatif</h3>
            
            <SummarySection>
              <SummaryItem>
                <span>Articles ({panier.reduce((acc, item) => acc + item.quantite, 0)})</span>
                <span>{total.toLocaleString()} FCFA</span>
              </SummaryItem>
              <SummaryItem>
                <span>Livraison</span>
                <span>Gratuite</span>
              </SummaryItem>
              <Divider />
              <SummaryItem total>
                <span>Total</span>
                <strong>{total.toLocaleString()} FCFA</strong>
              </SummaryItem>
            </SummarySection>

            <StatusBadge>
              <FaShippingFast />
              <span>Statut: {etatCommande}</span>
            </StatusBadge>

            <ValidateButton onClick={validerCommande}>
              Confirmer la commande
            </ValidateButton>

            {confirmation && (
              <ConfirmationMessage>
                <FaCheckCircle />
                <div>
                  <strong>Commande confirmée !</strong>
                  <p>Un email de confirmation vous a été envoyé.</p>
                </div>
              </ConfirmationMessage>
            )}
          </SummaryCard>
        </RightColumn>
      </GridContainer>
    </DashboardLayout>
  );
};

export default CommandePage;

// Styles optimisés
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RightColumn = styled.div`
  position: sticky;
  top: 1rem;
  align-self: start;
`;

const StepCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  color: #2e7d32;

  svg {
    font-size: 1.2rem;
  }

  h3 {
    margin: 0;
    font-size: 1.2rem;
  }
`;

const ProductItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  font-weight: bold;
  font-size: 1.1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border 0.3s;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.8rem center;
  background-size: 1rem;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

const SummaryCard = styled(StepCard)`
  position: sticky;
  top: 1rem;
`;

const SummarySection = styled.div`
  margin: 1.5rem 0;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  font-size: ${props => props.total ? '1.1rem' : '1rem'};

  strong {
    color: #2e7d32;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
  margin: 1rem 0;
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem;
  background: #fff8e1;
  border-radius: 8px;
  color: #ff8f00;
  font-weight: 500;
  margin: 1.5rem 0;
`;

const ValidateButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #388e3c;
  }
`;

const ConfirmationMessage = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1.2rem;
  background: #e8f5e9;
  border-radius: 8px;
  color: #2e7d32;

  svg {
    font-size: 1.5rem;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  strong {
    display: block;
    margin-bottom: 0.3rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;