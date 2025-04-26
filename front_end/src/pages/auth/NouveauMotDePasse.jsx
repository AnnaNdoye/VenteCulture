import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from "../../components/auth/AuthLayout";
import { FaLock, FaCheck } from "react-icons/fa";

export default function NouveauMotDePasse() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulation de requête API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => navigate('/connexion'), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout title="Mot de passe mis à jour !" icon={<FaCheck size={40} color="#4CAF50" />}>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Votre mot de passe a été réinitialisé avec succès.
          </p>
          <p>Redirection vers la page de connexion...</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Nouveau mot de passe" 
      subtitle="Choisissez un mot de passe sécurisé"
    >
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Nouveau mot de passe</Label>
          <InputIcon><FaLock /></InputIcon>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength="8"
          />
        </InputGroup>

        <InputGroup>
          <Label>Confirmez le mot de passe</Label>
          <InputIcon><FaLock /></InputIcon>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength="8"
          />
        </InputGroup>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Enregistrement...' : 'Enregistrer le nouveau mot de passe'}
        </SubmitButton>
      </Form>
    </AuthLayout>
  );
}