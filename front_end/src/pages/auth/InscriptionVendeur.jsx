import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import AuthLayout from "../../components/auth/AuthLayout";
import { FaUser, FaEnvelope, FaLock, FaLeaf, FaTractor, FaMapMarkerAlt } from "react-icons/fa";

// Animations
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
  margin-bottom: 1.8rem;  // Marge augmentée
  
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

const LoginLink = styled.div`
  text-align: center;
  margin-top: 2.5rem;  // Marge augmentée
  font-size: 1rem;
  color: #718096;

  a {
    color: #2E7D32;
    font-weight: 600;
    text-decoration: none;
    margin-left: 0.5rem;
    transition: all 0.2s ease;
    
    &:hover {
      color: #1B5E20;
      text-decoration: underline;
    }
  }
`;
// Composant principal (identique)
export default function InscriptionAgriculteur() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    password: '',
    confirmPassword: '',
    superficie: '',
    typeCulture: '',
    localisation: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    console.log('Inscription agriculteur soumise', formData);
    navigate('/connexion_agriculteur');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AuthLayout 
      title="Inscription client" 
      subtitle="Rejoignez notre communauté de producteurs locaux"
      icon={<FaLeaf size={40} color="#2E7D32" />}
    >
      <Form onSubmit={handleSubmit}>
        {/* Ligne 1 - Nom et Email */}
        <Row>
          <InputGroup>
            <Label>Nom complet</Label>
            <InputIcon><FaUser /></InputIcon>
            <Input 
              type="text" 
              name="nom"
              placeholder="Jean Dupont" 
              required
              value={formData.nom}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>Adresse email</Label>
            <InputIcon><FaEnvelope /></InputIcon>
            <Input 
              type="email" 
              name="email"
              placeholder="email@exemple.com" 
              required
              value={formData.email}
              onChange={handleChange}
            />
          </InputGroup>
        </Row>

        {/* Ligne 2 - Mot de passe et Confirmation */}
        <Row>
          <InputGroup>
            <Label>Mot de passe</Label>
            <InputIcon><FaLock /></InputIcon>
            <Input 
              type="password" 
              name="password"
              placeholder="••••••••" 
              required
              minLength="8"
              value={formData.password}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>Confirmer le mot de passe</Label>
            <InputIcon><FaLock /></InputIcon>
            <Input 
              type="password" 
              name="confirmPassword"
              placeholder="••••••••" 
              required
              minLength="8"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </InputGroup>
        </Row>

       

       
    
        <SubmitButton type="submit">
          <FaLeaf /> S'inscrire comme client
        </SubmitButton>

        <LoginLink>
          Vous avez déjà un compte ?
          <Link to="/connexion_client">Connectez-vous</Link>
        </LoginLink>
      </Form>
    </AuthLayout>
  );
}