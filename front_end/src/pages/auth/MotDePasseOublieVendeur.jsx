import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import AuthLayout from "../../components/auth/AuthLayout";
import { FaEnvelope, FaLeaf } from "react-icons/fa";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styles modernisés avec formulaire plus large
const Form = styled.form`
  width: 100%;
  max-width: 600px;  // Augmenté de 600px à 800px
  margin: 0 auto;
  padding: 2.1rem 3rem;  // Padding horizontal augmenté
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(31, 38, 135, 0.08);
  backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.6s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const Row = styled.div`
  display: flex;
  gap: 1.8rem;  // Espacement augmenté
  margin-bottom: 1.6rem;  // Marge augmentée
  
  @media (max-width: 900px) {  // Point de rupture ajusté
    flex-direction: column;
    gap: 1.2rem;
    margin-bottom: 1.2rem;
  }
`;

const InputGroup = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`
  font-size: 1rem;  // Taille de police légèrement augmentée
  color: #2e7d32;
  font-weight: 600;
  margin-left: 0.5rem;  // Marge augmentée
`;

const Input = styled.input`
  padding: 1.1rem 1.1rem 1.1rem 3.5rem;  // Padding augmenté
  border: 2px solid #e0f2e9;
  border-radius: 14px;  // Border-radius augmenté
  font-size: 1.05rem;  // Taille de police légèrement augmentée
  transition: all 0.3s ease;
  background-color: #f7fdf9;
  
  &:focus {
    border-color: #4CAF50;
    outline: none;
    box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.15);
    background-color: white;
  }

  &::placeholder {
    color: #a0aec0;
    font-size: 0.95rem;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: #4CAF50;
  font-size: 1.2rem;  // Taille des icônes augmentée
`;

const SubmitButton = styled.button`
  padding: 1.2rem;
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: white;
  border: none;
  border-radius: 14px;
  font-size: 1.15rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;  // Marge augmentée
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  
  &:hover {
    background: linear-gradient(135deg, #43A047, #1B5E20);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(46, 125, 50, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;
const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  font-size: 0.9rem;
`;

const StyledLink = styled(Link)`
  color: #2E7D32;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  
  &:hover {
    text-decoration: underline;
  }
`;


export default function MotDePasseOublieAgriculteur() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage('Instructions envoyées à votre email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Réinitialisation du mot de passe" 
      subtitle="Vendeur - Recevez votre lien de réinitialisation"
      icon={<FaLeaf size={40} color="#2E7D32" />}
    >
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Email enregistré</Label>
          <InputIcon><FaEnvelope /></InputIcon>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="agriculteur@exemple.com"
            required
          />
        </InputGroup>

        {message && <div style={{ color: '#2E7D32', margin: '1rem 0' }}>{message}</div>}

        <SubmitButton type="submit" disabled={isLoading}>
          <FaLeaf /> {isLoading ? 'Traitement...' : 'Demander un nouveau mot de passe'}
        </SubmitButton>

        <LinksContainer style={{ justifyContent: 'center' }}>
          <StyledLink to="/connexion_agriculteur">
            Retour à la page de connexion
          </StyledLink>
        </LinksContainer>
      </Form>
    </AuthLayout>
  );
}