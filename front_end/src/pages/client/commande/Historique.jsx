import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaClock, 
  FaSearch, 
  FaStar, 
  FaRegStar, 
  FaComment, 
  FaBell, 
  FaEnvelope,
  FaArrowLeft,
  FaBox
} from 'react-icons/fa';
import DashboardLayout from '../../client/accueil/DashboardLayout';
import { SectionTitle } from '../../../styles/StyledComponents';

// Données fictives des commandes
const commandes = [
  {
    id: 1,
    date: '2025-04-15',
    statut: 'Livrée',
    total: 45000,
    modePaiement: 'Carte bancaire',
    vendeur: 'MiningEquip Pro',
    produits: [
      { id: 101, nom: 'Casque Minier', quantite: 1, prix: 25000, note: 4, avis: 'Très bon produit, confortable et résistant.' },
      { id: 102, nom: 'Gants de sécurité', quantite: 2, prix: 10000, note: 3, avis: 'Correct mais pourrait être plus durable' },
    ],
    supportContacte: false,
    adresseLivraison: "123 Rue des Mineurs, Quartier Industriel, Dakar",
    numeroSuivi: "MIN-45678-XYZ",
    dateLivraison: "2025-04-15"
  },
  {
    id: 2,
    date: '2025-04-18',
    statut: 'En préparation',
    total: 60000,
    vendeur: 'SafetyFirst',
    modePaiement: 'Orange Money',
    produits: [
      { id: 103, nom: 'Lunettes de protection', quantite: 1, prix: 10000, note: 0, avis: '' },
      { id: 101, nom: 'Casque Minier', quantite: 1, prix: 25000, note: 0, avis: '' },
    ],
    supportContacte: false,
    adresseLivraison: "456 Avenue de la Sécurité, Zone Industrielle, Dakar",
    numeroSuivi: "SAF-78912-ABC",
    dateLivraisonEstimee: "2025-04-25"
  },
  {
    id: 3,
    date: '2025-04-20',
    statut: 'En attente',
    total: 30000,
    vendeur: 'MiningEquip Pro',
    modePaiement: 'Wave',
    produits: [
      { id: 101, nom: 'Casque Minier', quantite: 1, prix: 25000, note: 0, avis: '' },
    ],
    supportContacte: false,
    adresseLivraison: "789 Boulevard des Équipements, Dakar",
    numeroSuivi: null,
    dateLivraisonEstimee: "2025-04-30"
  },
];

const HistoriquePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCommandes, setFilteredCommandes] = useState(commandes);
  const [commandesData, setCommandesData] = useState(commandes);
  const [selectedProduit, setSelectedProduit] = useState(null);
  const [noteTemp, setNoteTemp] = useState(0);
  const [avisTemp, setAvisTemp] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedCommandeDetails, setSelectedCommandeDetails] = useState(null);

  const filtrerCommandes = () => {
    const commandesFiltrees = commandesData.filter((commande) =>
      commande.produits.some((produit) =>
        produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredCommandes(commandesFiltrees);
  };

  const afficherDetails = (commande) => {
    setSelectedCommandeDetails(commande);
    setShowDetailView(true);
  };

  const retourListeCommandes = () => {
    setShowDetailView(false);
    setSelectedCommandeDetails(null);
  };

  const ouvrirModalAvis = (commande, produit) => {
    if (commande.statut !== 'Livrée') {
      alert("Vous ne pouvez noter que les commandes livrées.");
      return;
    }
    setSelectedCommande(commande);
    setSelectedProduit(produit);
    setNoteTemp(produit.note || 0);
    setAvisTemp(produit.avis || '');
    setShowReviewModal(true);
  };

  const soumettreAvis = () => {
    if (selectedCommande.statut !== 'Livrée') {
      alert("Vous ne pouvez noter que les commandes livrées.");
      return;
    }

    const commandesUpdated = commandesData.map(commande => {
      if (commande.id === selectedCommande.id) {
        const produitsUpdated = commande.produits.map(produit => {
          if (produit.id === selectedProduit.id) {
            return { ...produit, note: noteTemp, avis: avisTemp };
          }
          return produit;
        });
        return { ...commande, produits: produitsUpdated };
      }
      return commande;
    });
    
    setCommandesData(commandesUpdated);
    setFilteredCommandes(commandesUpdated);
    
    if (selectedCommandeDetails) {
      const updatedCommandeDetails = commandesUpdated.find(c => c.id === selectedCommandeDetails.id);
      setSelectedCommandeDetails(updatedCommandeDetails);
    }
    
    setShowReviewModal(false);
    alert(`Merci! Votre avis pour ${selectedProduit.nom} a été enregistré.`);
  };

  const ouvrirModalSupport = (commande) => {
    setSelectedCommande(commande);
    setShowSupportModal(true);
    setSupportMessage('');
  };

  const envoyerMessageSupport = () => {
    const commandesUpdated = commandesData.map(commande => {
      if (commande.id === selectedCommande.id) {
        return { ...commande, supportContacte: true };
      }
      return commande;
    });
    
    setCommandesData(commandesUpdated);
    setFilteredCommandes(commandesUpdated);
    
    if (selectedCommandeDetails) {
      const updatedCommandeDetails = commandesUpdated.find(c => c.id === selectedCommandeDetails.id);
      setSelectedCommandeDetails(updatedCommandeDetails);
    }
    
    setShowSupportModal(false);
    alert(`Votre message concernant la commande #${selectedCommande.id} a été envoyé au support.`);
  };

  // Vue détaillée d'une commande
  if (showDetailView && selectedCommandeDetails) {
    return (
      <DashboardLayout>
        <TopBar>
          <RetourButton onClick={retourListeCommandes}>
            <FaArrowLeft /> Retour aux commandes
          </RetourButton>
        </TopBar>

        <CommandeDetailCard>
          <CommandeDetailHeader>
            <DetailTitle>Détails de la commande #{selectedCommandeDetails.id}</DetailTitle>
            <Status statut={selectedCommandeDetails.statut}>
              {selectedCommandeDetails.statut === 'Livrée' ? <FaCheckCircle /> : 
               selectedCommandeDetails.statut === 'En préparation' ? <FaClock /> : 
               <FaExclamationTriangle />}
              {selectedCommandeDetails.statut}
            </Status>
          </CommandeDetailHeader>

          <DetailSection>
            <DetailSectionTitle>Informations générales</DetailSectionTitle>
            <DetailGrid>
              <DetailItem>
                <DetailLabel>Date de commande:</DetailLabel>
                <DetailValue>{selectedCommandeDetails.date}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Vendeur:</DetailLabel>
                <DetailValue>{selectedCommandeDetails.vendeur}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Mode de paiement:</DetailLabel>
                <DetailValue>{selectedCommandeDetails.modePaiement}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Total:</DetailLabel>
                <DetailValue>{selectedCommandeDetails.total.toLocaleString()} FCFA</DetailValue>
              </DetailItem>
            </DetailGrid>
          </DetailSection>

          <DetailSection>
            <DetailSectionTitle>Livraison</DetailSectionTitle>
            <DetailGrid>
              <DetailItem>
                <DetailLabel>Adresse de livraison:</DetailLabel>
                <DetailValue>{selectedCommandeDetails.adresseLivraison}</DetailValue>
              </DetailItem>
              {selectedCommandeDetails.numeroSuivi && (
                <DetailItem>
                  <DetailLabel>Numéro de suivi:</DetailLabel>
                  <DetailValue>{selectedCommandeDetails.numeroSuivi}</DetailValue>
                </DetailItem>
              )}
              {selectedCommandeDetails.statut === 'Livrée' ? (
                <DetailItem>
                  <DetailLabel>Date de livraison:</DetailLabel>
                  <DetailValue>{selectedCommandeDetails.dateLivraison}</DetailValue>
                </DetailItem>
              ) : (
                <DetailItem>
                  <DetailLabel>Date de livraison estimée:</DetailLabel>
                  <DetailValue>{selectedCommandeDetails.dateLivraisonEstimee || 'Non définie'}</DetailValue>
                </DetailItem>
              )}
            </DetailGrid>
          </DetailSection>

          <DetailSection>
            <DetailSectionTitle>Produits</DetailSectionTitle>
            <ProduitsTable>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Prix unitaire</th>
                  <th>Total</th>
                  {selectedCommandeDetails.statut === 'Livrée' && <th>Note</th>}
                  {selectedCommandeDetails.statut === 'Livrée' && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {selectedCommandeDetails.produits.map((produit) => (
                  <tr key={produit.id}>
                    <td>{produit.nom}</td>
                    <td>{produit.quantite}</td>
                    <td>{produit.prix.toLocaleString()} FCFA</td>
                    <td>{(produit.prix * produit.quantite).toLocaleString()} FCFA</td>
                    {selectedCommandeDetails.statut === 'Livrée' && (
                      <td style={{ minWidth: '120px' }}>
                        {produit.note > 0 ? (
                          <ProduitRating>
                            {[1, 2, 3, 4, 5].map(star => (
                              <span key={star}>
                                {star <= produit.note ? <FaStar color="#FFD700" /> : <FaRegStar />}
                              </span>
                            ))}
                          </ProduitRating>
                        ) : (
                          "Pas d'avis"
                        )}
                      </td>
                    )}
                    {selectedCommandeDetails.statut === 'Livrée' && (
                      <td>
                        <ButtonAvis 
                          onClick={() => ouvrirModalAvis(selectedCommandeDetails, produit)}
                          rated={produit.note > 0}
                        >
                          <FaStar /> {produit.note > 0 ? "Modifier l'avis" : "Donner un avis"}
                        </ButtonAvis>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </ProduitsTable>
          </DetailSection>

          {selectedCommandeDetails.statut === 'Livrée' && (
            <DetailSection>
              <DetailSectionTitle>Avis des produits</DetailSectionTitle>
              <ProduitAvisList>
                {selectedCommandeDetails.produits.map((produit) => (
                  <ProduitAvisCard key={produit.id}>
                    <ProduitAvisHeader>
                      <h4>{produit.nom}</h4>
                      {produit.note > 0 && (
                        <ProduitRating>
                          {[1, 2, 3, 4, 5].map(star => (
                            <span key={star}>
                              {star <= produit.note ? <FaStar color="#FFD700" /> : <FaRegStar />}
                            </span>
                          ))}
                        </ProduitRating>
                      )}
                    </ProduitAvisHeader>
                    {produit.note > 0 ? (
                      <>
                        <ProduitAvisContent>
                          {produit.avis || <em>Aucun commentaire ajouté</em>}
                        </ProduitAvisContent>
                        <ButtonAvis 
                          onClick={() => ouvrirModalAvis(selectedCommandeDetails, produit)}
                          rated={true}
                        >
                          <FaComment /> Modifier l'avis
                        </ButtonAvis>
                      </>
                    ) : (
                      <div>
                        <p>Vous n'avez pas encore donné votre avis sur ce produit.</p>
                        <ButtonAvis 
                          onClick={() => ouvrirModalAvis(selectedCommandeDetails, produit)}
                          rated={false}
                        >
                          <FaStar /> Donner un avis
                        </ButtonAvis>
                      </div>
                    )}
                  </ProduitAvisCard>
                ))}
              </ProduitAvisList>
            </DetailSection>
          )}

          <DetailActions>
            <ButtonSupport onClick={() => ouvrirModalSupport(selectedCommandeDetails)}>
              <FaEnvelope /> {selectedCommandeDetails.supportContacte ? 'Contacter à nouveau' : 'Contacter le vendeur'}
            </ButtonSupport>
          </DetailActions>
        </CommandeDetailCard>

        {/* Modal pour laisser un avis */}
        {showReviewModal && (
          <Modal>
            <ModalContent>
              <ModalHeader>
                <h3>Donner votre avis sur {selectedProduit?.nom}</h3>
                <CloseButton onClick={() => setShowReviewModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <RatingSelector>
                  {[1, 2, 3, 4, 5].map(star => (
                    <StarButton 
                      key={star} 
                      onClick={() => setNoteTemp(star)}
                      active={star <= noteTemp}
                    >
                      {star <= noteTemp ? <FaStar size={24} /> : <FaRegStar size={24} />}
                    </StarButton>
                  ))}
                </RatingSelector>
                <TextArea 
                  placeholder="Partagez votre expérience avec ce produit..."
                  value={avisTemp}
                  onChange={(e) => setAvisTemp(e.target.value)}
                  rows={5}
                />
                <ModalButtons>
                  <ButtonCancel onClick={() => setShowReviewModal(false)}>Annuler</ButtonCancel>
                  <ButtonSubmit 
                    onClick={soumettreAvis}
                    disabled={noteTemp === 0}
                  >
                    Soumettre l'avis
                  </ButtonSubmit>
                </ModalButtons>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}

        {/* Modal pour contacter le support */}
        {showSupportModal && (
          <Modal>
            <ModalContent>
              <ModalHeader>
                <h3>Contacter le vendeur pour la commande #{selectedCommande?.id}</h3>
                <CloseButton onClick={() => setShowSupportModal(false)}>×</CloseButton>
              </ModalHeader>
              <ModalBody>
                <p>Vendeur: <strong>{selectedCommande?.vendeur}</strong></p>
                <TextArea 
                  placeholder="Décrivez votre problème ou votre question..."
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  rows={5}
                />
                <ModalButtons>
                  <ButtonCancel onClick={() => setShowSupportModal(false)}>Annuler</ButtonCancel>
                  <ButtonSubmit 
                    onClick={envoyerMessageSupport}
                    disabled={supportMessage.trim() === ''}
                  >
                    Envoyer le message
                  </ButtonSubmit>
                </ModalButtons>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </DashboardLayout>
    );
  }

  // Vue liste des commandes (vue par défaut)
  return (
    <DashboardLayout>
      <TopBar>
        <SectionTitle>Historique des Commandes</SectionTitle>
      </TopBar>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Rechercher une commande..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton onClick={filtrerCommandes}><FaSearch /></SearchButton>
      </SearchBar>

      {filteredCommandes.length === 0 ? (
        <Message>Aucune commande trouvée pour cette recherche.</Message>
      ) : (
        <CommandesList>
          {filteredCommandes.map((commande) => (
            <CommandeCard key={commande.id}>
              <Header>
                <CommandeInfo>
                  <span>Commande #{commande.id}</span>
                  <span>{commande.date}</span>
                </CommandeInfo>
                <Status statut={commande.statut}>
                  {commande.statut === 'Livrée' ? <FaCheckCircle /> : 
                   commande.statut === 'En préparation' ? <FaClock /> : 
                   <FaExclamationTriangle />}
                  {commande.statut}
                </Status>
              </Header>

              <VendeurInfo>
                <strong>Vendeur:</strong> {commande.vendeur}
              </VendeurInfo>

              <Detail>
                <span><strong>Total:</strong> {commande.total.toLocaleString()} FCFA</span>
                <span><strong>Mode de paiement:</strong> {commande.modePaiement}</span>
              </Detail>

              <Produits>
                {commande.produits.map((produit, index) => (
                  <Produit key={index}>
                    <div>
                      <span>{produit.nom} (x{produit.quantite})</span>
                      {commande.statut === 'Livrée' && produit.note > 0 && (
                        <ProduitRating>
                          {[1, 2, 3, 4, 5].map(star => (
                            <span key={star}>
                              {star <= produit.note ? <FaStar color="#FFD700" /> : <FaRegStar />}
                            </span>
                          ))}
                        </ProduitRating>
                      )}
                    </div>
                    <span>{(produit.prix * produit.quantite).toLocaleString()} FCFA</span>
                  </Produit>
                ))}
              </Produits>

              <Actions>
                <ButtonDetails onClick={() => afficherDetails(commande)}>
                  <FaBox /> Détails
                </ButtonDetails>
              </Actions>
            </CommandeCard>
          ))}
        </CommandesList>
      )}
    </DashboardLayout>
  );
};

export default HistoriquePage;

// STYLES
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  padding: 0.75rem;
  width: 80%;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const SearchButton = styled.button`
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #388e3c;
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #888;
`;

const CommandesList = styled.div`
  margin-top: 2rem;
`;

const CommandeCard = styled.div`
  background: #fff;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommandeInfo = styled.div`
  font-size: 1.1rem;
`;

const Status = styled.div`
  color: ${({ statut }) => (statut === 'Livrée' ? 'green' : statut === 'En préparation' ? 'orange' : 'red')};
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VendeurInfo = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const Detail = styled.div`
  margin-top: 1rem;
`;

const Produits = styled.div`
  margin-top: 1rem;
`;

const Produit = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ProduitRating = styled.div`
  margin-top: 3px;
`;

const Actions = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ButtonDetails = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    background-color: #388e3c;
  }
`;

const ButtonSupport = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    background-color: #2980b9;
  }
`;

const ButtonAvis = styled.button`
  padding: 0.4rem 0.75rem;
  background-color: ${props => props.rated ? '#f8c200' : '#3498db'};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  margin-bottom: 0.3rem;

  &:hover {
    background-color: ${props => props.rated ? '#e6b400' : '#2980b9'};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 0;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;

  h3 {
    margin: 0;
    font-size: 1.2rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #000;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const RatingSelector = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const StarButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.active ? '#FFD700' : '#ccc'};
  padding: 0 0.3rem;
  transition: 0.2s;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  font-family: inherit;
  margin-bottom: 1rem;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const ButtonCancel = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  
  &:hover {
    background-color: #999;
  }
`;

const ButtonSubmit = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  opacity: ${props => props.disabled ? 0.6 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  
  &:hover {
    background-color: #388e3c;
  }
`;

const RetourButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #4caf50;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem 0;
  font-size: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const CommandeDetailCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const CommandeDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;

const DetailTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

const DetailSection = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailSectionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #4caf50;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const DetailItem = styled.div`
  margin-bottom: 0.5rem;
`;

const DetailLabel = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.2rem;
`;

const DetailValue = styled.div`
  font-size: 1rem;
`;

const ProduitsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    font-weight: bold;
    color: #666;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
`;

const ProduitAvisList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
`;

const ProduitAvisCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const ProduitAvisHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  
  h4 {
    margin: 0;
    font-size: 1.1rem;
  }
`;

const ProduitAvisContent = styled.div`
  font-size: 0.95rem;
  margin-bottom: 1rem;
  line-height: 1.4;
  color: #444;
  min-height: 50px;
`;

const DetailActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;