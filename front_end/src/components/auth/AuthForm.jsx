import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CompactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  padding: 1.5rem;
`;

const TightInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const CompactLabel = styled.label`
  font-size: 0.9rem;
  color: #555;
`;

const CompactInput = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.95rem;
  
  &:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const CompactButton = styled.button`
  padding: 0.8rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  margin-top: 0.5rem;
  
  &:hover {
    background: #3d8b40;
  }
`;

const CompactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.85rem;
`;

const CompactLink = styled(Link)`
  color: #2E7D32;
  text-decoration: none;
  text-align: center;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default function AuthForm({ isLoading, userType }) {  // Ajout de la prop userType
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(`Connexion ${userType} avec:`, formData);
    
    setTimeout(() => {
      navigate(userType === 'farmer' ? '/agriculteur/dashboard' : '/vendeur/dashboard');
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <CompactForm onSubmit={handleSubmit}>
      <TightInputGroup>
        <CompactLabel>Email</CompactLabel>
        <CompactInput 
          type="email" 
          name="email"
          placeholder="email@exemple.com" 
          required
          value={formData.email}
          onChange={handleChange}
        />
      </TightInputGroup>

      <TightInputGroup>
        <CompactLabel>Mot de passe</CompactLabel>
        <CompactInput 
          type="password" 
          name="password"
          placeholder="••••••••" 
          required 
          minLength="6"
          value={formData.password}
          onChange={handleChange}
        />
      </TightInputGroup>

      <CompactButton type="submit" disabled={isLoading}>
        {isLoading ? 'Connexion...' : 'Se connecter'}
      </CompactButton>

      <CompactLinks>
        {/* Lien d'inscription contextuel */}
        {userType === 'farmer' ? (
          <CompactLink to="/inscription_agriculteur">
             S'inscrire comme Agriculteur
          </CompactLink>
        ) : (
          <CompactLink to="/inscription_vendeur">
             S'inscrire comme Vendeur
          </CompactLink>
        )}
        
        {/* Lien mot de passe oublié commun */}
        <CompactLink to="/mot-de-passe-oublie">
          Mot de passe oublié ?
        </CompactLink>
      </CompactLinks>
    </CompactForm>
  );
}