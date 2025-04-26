import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import AuthLayout from "../../components/auth/AuthLayout";
import { FaUser, FaLock, FaStore } from "react-icons/fa";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styles
const Form = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 2.1rem 3rem;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  box-shadow: 0 12px 40px rgba(31, 38, 135, 0.08);
  backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.6s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #2e7d32;
  font-weight: 600;
  margin-left: 0.5rem;
`;

const Input = styled.input`
  padding: 1.1rem 1.1rem 1.1rem 3.5rem;
  border: 2px solid #e0f2e9;
  border-radius: 14px;
  font-size: 1.05rem;
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
  font-size: 1.2rem;
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
  margin-top: 2rem;
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

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem;
  font-size: 1rem;
`;

const StyledLink = styled(Link)`
  color: #2E7D32;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    color: #1B5E20;
    text-decoration: underline;
  }
`;

export default function Connexionclient() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/client/dashboard');
    } catch (error) {
      console.error('Erreur de connexion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Connexion client" 
      subtitle="Accédez à votre espace client"
      icon={<FaStore size={40} color="#2E7D32" />}
    >
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Adresse email</Label>
          <InputIcon><FaUser /></InputIcon>
          <Input
            type="email"
            name="email"
            placeholder="email@exemple.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <Label>Mot de passe</Label>
          <InputIcon><FaLock /></InputIcon>
          <Input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
          />
        </InputGroup>

        <SubmitButton type="submit" disabled={isLoading}>
          <FaStore /> {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </SubmitButton>

        <LinksContainer>
          <StyledLink to="/mot_de_passe_oublie_client">
            Mot de passe oublié ?
          </StyledLink>
          <StyledLink to="/inscription_client">
            Créer un compte
          </StyledLink>
        </LinksContainer>
      </Form>
    </AuthLayout>
  );
}