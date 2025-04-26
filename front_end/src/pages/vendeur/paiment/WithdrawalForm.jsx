import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaMoneyBillWave, FaUniversity } from 'react-icons/fa';

import DashboardLayout from '../accueil/Dashboard';
import { SectionTitle } from '../../../styles/StyledComponents';

const FormContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const CancelButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3d8b40;
  }
`;

const WithdrawalForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    bankName: '',
    accountName: '',
    iban: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous feriez un appel API pour la demande de retrait
    console.log('Demande de retrait:', formData);
    navigate('/seller/payments');
  };

  return (
    <DashboardLayout>
      <FormContainer>
        <SectionTitle>
          <FaMoneyBillWave /> Demande de retrait
        </SectionTitle>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Montant à retirer (€)</Label>
            <Input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="10"
              step="0.01"
              placeholder="50.00"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>
              <FaUniversity /> Nom de la banque
            </Label>
            <Input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              placeholder="Ex: Banque Internationale"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Nom du titulaire du compte</Label>
            <Input
              type="text"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              placeholder="Ex: Jean Dupont"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>IBAN</Label>
            <Input
              type="text"
              name="iban"
              value={formData.iban}
              onChange={handleChange}
              placeholder="Ex: FR76 3000 1000 0100 0000 0000 123"
              required
            />
          </FormGroup>

          <ButtonGroup>
            <CancelButton to="/vendeur/revenue">
              <FaArrowLeft /> Annuler
            </CancelButton>
            <SubmitButton type="submit">
              <FaMoneyBillWave /> Demander le retrait
            </SubmitButton>
          </ButtonGroup>
        </form>
      </FormContainer>
    </DashboardLayout>
  );
};

export default WithdrawalForm;