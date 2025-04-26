import React, { useState } from 'react';
import styled from 'styled-components';
import DashboardLayout from '../../client/accueil/DashboardLayout';
import { SectionTitle } from '../../../styles/StyledComponents';
import { FaHeart, FaEdit, FaSave } from 'react-icons/fa';

// Données fictives pour l'utilisateur
const utilisateur = {
  nom: 'Fatoumata Dial',
  email: 'fatoumata.dial@inclusiveit.sn',
  telephone: '772833359',
  adresse: 'Dakar, Sénégal',
};

const produitsFavoris = [
  { id: 1, nom: 'Casque Minier', prix: 25000 },
  { id: 2, nom: 'Gants de sécurité', prix: 15000 },
  { id: 3, nom: 'Lunettes de protection', prix: 10000 },
];

const ProfilPage = () => {
  const [userInfo, setUserInfo] = useState(utilisateur);
  const [isEditing, setIsEditing] = useState(false);
  const [favorites, setFavorites] = useState(produitsFavoris);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Ici, tu pourrais ajouter un appel API pour sauvegarder les modifications.
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  return (
    <DashboardLayout>
      <SectionTitle>Mon Profil</SectionTitle>

      <ProfileInfo>
        <h3>Informations personnelles</h3>
        <form>
          <Label>
            Nom :
            {isEditing ? (
              <Input
                type="text"
                value={userInfo.nom}
                onChange={(e) => setUserInfo({ ...userInfo, nom: e.target.value })}
              />
            ) : (
              <p>{userInfo.nom}</p>
            )}
          </Label>

          <Label>
            Email :
            {isEditing ? (
              <Input
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              />
            ) : (
              <p>{userInfo.email}</p>
            )}
          </Label>

          <Label>
            Téléphone :
            {isEditing ? (
              <Input
                type="tel"
                value={userInfo.telephone}
                onChange={(e) => setUserInfo({ ...userInfo, telephone: e.target.value })}
              />
            ) : (
              <p>{userInfo.telephone}</p>
            )}
          </Label>

          <Label>
            Adresse :
            {isEditing ? (
              <Input
                type="text"
                value={userInfo.adresse}
                onChange={(e) => setUserInfo({ ...userInfo, adresse: e.target.value })}
              />
            ) : (
              <p>{userInfo.adresse}</p>
            )}
          </Label>

          <ButtonContainer>
            {isEditing ? (
              <SaveButton onClick={handleSave}>
                <FaSave /> Enregistrer
              </SaveButton>
            ) : (
              <EditButton onClick={handleEdit}>
                <FaEdit /> Modifier
              </EditButton>
            )}
          </ButtonContainer>
        </form>
      </ProfileInfo>

      <FavoritesSection>
        <h3>Mes Produits Favoris</h3>
        <FavoriteList>
          {favorites.map((produit) => (
            <FavoriteItem key={produit.id}>
              <span>{produit.nom} - {produit.prix.toLocaleString()} FCFA</span>
              <RemoveButton onClick={() => removeFavorite(produit.id)}>
                Retirer
              </RemoveButton>
            </FavoriteItem>
          ))}
        </FavoriteList>
      </FavoritesSection>

      <Actions>
        <LinkToHistory href="/historique">Voir mon historique de commandes</LinkToHistory>
      </Actions>
    </DashboardLayout>
  );
};

export default ProfilPage;

// STYLES
const ProfileInfo = styled.div`
  background: #fff;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 0.5rem;
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
`;

const EditButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #388e3c;
  }
`;

const SaveButton = styled.button`
  background-color: #388e3c;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2e7d32;
  }
`;

const FavoritesSection = styled.div`
  background: #fff;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FavoriteList = styled.div`
  display: flex;
  flex-direction: column;
`;

const FavoriteItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
`;

const RemoveButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e60000;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const LinkToHistory = styled.a`
  color: #4caf50;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
