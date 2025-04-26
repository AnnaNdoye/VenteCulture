import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FaMapMarkerAlt, 
  FaMoneyBill, 
  FaTruck, 
  FaCheckCircle,
  FaShoppingCart,
  FaRegCreditCard,
  FaShippingFast,
  FaPlus,
  FaMinus,
  FaTrash
} from 'react-icons/fa';
import DashboardLayout from '../../client/accueil/DashboardLayout';
import { SectionTitle } from '../../../styles/StyledComponents';

const PanierPage = () => {
  // État du panier avec possibilité de modification
  const [panier, setPanier] = useState([
    { id: 1, nom: 'Casque Minier', prix: 25000, quantite: 1 },
    { id: 2, nom: 'Gants de sécurité', prix: 15000, quantite: 2 }
  ]);
  
  const [etatCommande, setEtatCommande] = useState(null);
  const [form, setForm] = useState({
    adresse: '',
    paiement: ''
  });
  const [confirmation, setConfirmation] = useState(false);
  const [fraisLivraison] = useState(2000); // Frais de livraison fixes ou calculés

  // Calcul du total
  const sousTotal = panier.reduce((acc, item) => acc + item.prix * item.quantite, 0);
  const total = sousTotal + (sousTotal > 50000 ? 0 : fraisLivraison); // Livraison gratuite si > 50,000 FCFA

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Modifier la quantité d'un produit
  const modifierQuantite = (id, nouvelleQuantite) => {
    if (nouvelleQuantite < 1) return;
    
    setPanier(panier.map(item => 
      item.id === id ? { ...item, quantite: nouvelleQuantite } : item
    ));
  };

  // Supprimer un produit du panier
  const supprimerProduit = (id) => {
    setPanier(panier.filter(item => item.id !== id));
  };

  // Valider la commande
  const validerCommande = () => {
    if (panier.length === 0) {
      alert('Votre panier est vide');
      return;
    }
    
    if (!form.adresse || !form.paiement) {
      alert('Veuillez compléter toutes les informations requises');
      return;
    }

    setEtatCommande('En attente');
    setConfirmation(true);
    
    // Ici vous pourriez ajouter un appel API pour enregistrer la commande
    console.log('Commande validée:', {
      produits: panier,
      adresse: form.adresse,
      paiement: form.paiement,
      total: total
    });
  };

  return (
    <DashboardLayout>
      <SectionTitle>{confirmation ? 'Confirmation de commande' : 'Votre panier'}</SectionTitle>
      
      {confirmation ? (
        <ConfirmationContainer>
          <ConfirmationMessage>
            <FaCheckCircle size={48} />
            <h3>Commande confirmée !</h3>
            <p>Nous avons bien reçu votre commande n°{Math.floor(Math.random() * 1000000)}</p>
            <p>Un email de confirmation vous a été envoyé.</p>
            
            <StatusBadge>
              <FaShippingFast />
              <span>Statut: {etatCommande}</span>
            </StatusBadge>
            
            <OrderSummary>
              <h4>Récapitulatif de commande</h4>
              {panier.map(item => (
                <ProductItem key={item.id}>
                  <span>{item.nom} × {item.quantite}</span>
                  <span>{(item.prix * item.quantite).toLocaleString()} FCFA</span>
                </ProductItem>
              ))}
              <Divider />
              <Total>
                <span>Total</span>
                <strong>{total.toLocaleString()} FCFA</strong>
              </Total>
            </OrderSummary>
          </ConfirmationMessage>
        </ConfirmationContainer>
      ) : (
        <GridContainer>
          {/* Colonne gauche - Panier et informations */}
          <LeftColumn>
            <StepCard>
              <StepHeader>
                <FaShoppingCart />
                <h3>Votre panier</h3>
              </StepHeader>
              
              {panier.length === 0 ? (
                <EmptyCart>
                  <p>Votre panier est vide</p>
                </EmptyCart>
              ) : (
                <>
                  {panier.map(item => (
                    <ProductItem key={item.id}>
                      <ProductInfo>
                        <ProductName>{item.nom}</ProductName>
                        <ProductPrice>{item.prix.toLocaleString()} FCFA</ProductPrice>
                      </ProductInfo>
                      <QuantityControls>
                        <QuantityButton 
                          onClick={() => modifierQuantite(item.id, item.quantite - 1)}
                          disabled={item.quantite <= 1}
                        >
                          <FaMinus />
                        </QuantityButton>
                        <span>{item.quantite}</span>
                        <QuantityButton onClick={() => modifierQuantite(item.id, item.quantite + 1)}>
                          <FaPlus />
                        </QuantityButton>
                        <DeleteButton onClick={() => supprimerProduit(item.id)}>
                          <FaTrash />
                        </DeleteButton>
                      </QuantityControls>
                    </ProductItem>
                  ))}
                  
                  <DeliveryInfo>
                    <span>Frais de livraison</span>
                    <span>{sousTotal > 50000 ? 'Gratuit' : fraisLivraison.toLocaleString() + ' FCFA'}</span>
                  </DeliveryInfo>
                  
                  <Total>
                    <span>Total</span>
                    <strong>{total.toLocaleString()} FCFA</strong>
                  </Total>
                </>
              )}
            </StepCard>

            {panier.length > 0 && (
              <>
                <StepCard>
                  <StepHeader>
                    <FaMapMarkerAlt />
                    <h3>Adresse de livraison</h3>
                  </StepHeader>
                  <Label>Adresse complète</Label>
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
                    <h3>Méthode de paiement</h3>
                  </StepHeader>
                  <Label>Choisissez votre moyen de paiement</Label>
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
              </>
            )}
          </LeftColumn>

          {/* Colonne droite - Récapitulatif */}
          {panier.length > 0 && (
            <RightColumn>
              <SummaryCard>
                <h3>Récapitulatif</h3>
                
                <SummarySection>
                  <SummaryItem>
                    <span>Articles ({panier.reduce((acc, item) => acc + item.quantite, 0)})</span>
                    <span>{sousTotal.toLocaleString()} FCFA</span>
                  </SummaryItem>
                  <SummaryItem>
                    <span>Livraison</span>
                    <span>{sousTotal > 50000 ? 'Gratuite' : fraisLivraison.toLocaleString() + ' FCFA'}</span>
                  </SummaryItem>
                  <Divider />
                  <SummaryItem total>
                    <span>Total</span>
                    <strong>{total.toLocaleString()} FCFA</strong>
                  </SummaryItem>
                </SummarySection>

                <ValidateButton onClick={validerCommande}>
                  Passer la commande
                </ValidateButton>

                <SecurePayment>
                  <FaCheckCircle />
                  <span>Paiement sécurisé</span>
                </SecurePayment>
              </SummaryCard>
            </RightColumn>
          )}
        </GridContainer>
      )}
    </DashboardLayout>
  );
};

export default PanierPage;

// Nouveaux styles
const ConfirmationContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const OrderSummary = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  text-align: left;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.span`
  font-weight: 500;
  display: block;
  margin-bottom: 0.3rem;
`;

const ProductPrice = styled.span`
  color: #4caf50;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    min-width: 20px;
    text-align: center;
  }
`;

const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #f5f5f5;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled.button`
  margin-left: 1rem;
  color: #f44336;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.3rem;
`;

const DeliveryInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  margin-top: 1rem;
`;

const SecurePayment = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: #4caf50;
  font-size: 0.9rem;
`;

// Styles existants (conservés)
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
  align-items: center;
  padding: 1rem 0;
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
  justify-content: center;
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

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

const ConfirmationMessage = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  
  svg {
    color: #4caf50;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: #2e7d32;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    margin-bottom: 0.5rem;
  }
`;