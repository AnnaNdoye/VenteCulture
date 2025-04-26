import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUser, FaStore, FaTruck, FaSave, FaEdit, FaTimes } from 'react-icons/fa';

import { SectionTitle } from '../../../styles/StyledComponents';
import DashboardLayout from '../accueil/Dashboard';

const AccountContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 2rem;
  overflow-x: auto;
`;

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 500;
  color: ${props => props.$active ? '#4caf50' : '#6b7280'};
  border-bottom: 2px solid ${props => props.$active ? '#4caf50' : 'transparent'};
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: #4caf50;
  }
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
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
  background-color: ${props => props.readOnly ? '#f3f4f6' : 'white'};

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: ${props => props.readOnly ? '#f3f4f6' : 'white'};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: ${props => props.readOnly ? '#f3f4f6' : 'white'};
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SaveButton = styled.button`
  display: flex;
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

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

const CancelButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #dc2626;
  }
`;

const ReadOnlyValue = styled.div`
  padding: 0.75rem;
  background-color: #f3f4f6;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
`;

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    // Informations personnelles
    nom: 'Jean',
    prenom: 'Dupont',
    email: 'jean.dupont@example.com',
    telephone: '+221 77 123 45 67',
    
    // Informations boutique
    nomBoutique: 'Ma Boutique Bio',
    adresse: '123 Rue du Commerce, Dakar',
    description: 'Produits biologiques locaux de qualité',
    
    // Options livraison
    livraisonDomicile: true,
    retraitMagasin: false,
    fraisLivraison: 1500,
    delaiLivraison: '48h'
  });

  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    // Simuler un chargement des données depuis une API
    setOriginalData(formData);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données sauvegardées:', formData);
    setOriginalData(formData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const renderInput = (name, value, type = 'text', options = {}) => {
    if (!editMode) {
      if (type === 'checkbox') {
        return <ReadOnlyValue>{value ? 'Oui' : 'Non'}</ReadOnlyValue>;
      }
      return <ReadOnlyValue>{value}</ReadOnlyValue>;
    }

    switch (type) {
      case 'textarea':
        return (
          <TextArea
            name={name}
            value={value}
            onChange={handleChange}
            rows={4}
            {...options}
          />
        );
      case 'select':
        return (
          <Select
            name={name}
            value={value}
            onChange={handleChange}
            {...options}
          >
            {options.options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        );
      case 'checkbox':
        return (
          <CheckboxLabel>
            <input
              type="checkbox"
              name={name}
              checked={value}
              onChange={handleChange}
              {...options}
            />
            {options.label}
          </CheckboxLabel>
        );
      default:
        return (
          <Input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            {...options}
          />
        );
    }
  };

  return (
    <DashboardLayout>
      <AccountContainer>
        <SectionTitle>
          <FaUser /> Gestion du compte
        </SectionTitle>

        <Tabs>
          <Tab 
            $active={activeTab === 'personal'}
            onClick={() => setActiveTab('personal')}
          >
            <FaUser /> Informations personnelles
          </Tab>
          <Tab 
            $active={activeTab === 'shop'}
            onClick={() => setActiveTab('shop')}
          >
            <FaStore /> Ma boutique
          </Tab>
          <Tab 
            $active={activeTab === 'delivery'}
            onClick={() => setActiveTab('delivery')}
          >
            <FaTruck /> Livraison
          </Tab>
        </Tabs>

        <form onSubmit={handleSubmit}>
          {activeTab === 'personal' && (
            <FormSection>
              <h3>Informations personnelles</h3>
              <FormGroup>
                <Label>Nom</Label>
                {renderInput('nom', formData.nom)}
              </FormGroup>
              <FormGroup>
                <Label>Prénom</Label>
                {renderInput('prenom', formData.prenom)}
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                {renderInput('email', formData.email, 'email')}
              </FormGroup>
              <FormGroup>
                <Label>Téléphone</Label>
                {renderInput('telephone', formData.telephone, 'tel')}
              </FormGroup>
            </FormSection>
          )}

          {activeTab === 'shop' && (
            <FormSection>
              <h3>Informations de la boutique</h3>
              <FormGroup>
                <Label>Nom de la boutique</Label>
                {renderInput('nomBoutique', formData.nomBoutique)}
              </FormGroup>
              <FormGroup>
                <Label>Adresse</Label>
                {renderInput('adresse', formData.adresse)}
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                {renderInput('description', formData.description, 'textarea')}
              </FormGroup>
            </FormSection>
          )}

          {activeTab === 'delivery' && (
            <FormSection>
              <h3>Options de livraison</h3>
              <FormGroup>
                {renderInput('livraisonDomicile', formData.livraisonDomicile, 'checkbox', {
                  label: 'Livraison à domicile'
                })}
              </FormGroup>
              {formData.livraisonDomicile && (
                <>
                  <FormGroup>
                    <Label>Frais de livraison (FCFA)</Label>
                    {renderInput('fraisLivraison', formData.fraisLivraison, 'number')}
                  </FormGroup>
                  <FormGroup>
                    <Label>Délai de livraison</Label>
                    {renderInput('delaiLivraison', formData.delaiLivraison, 'select', {
                      options: [
                        { value: '24h', label: '24 heures' },
                        { value: '48h', label: '48 heures' },
                        { value: '72h', label: '72 heures' }
                      ]
                    })}
                  </FormGroup>
                </>
              )}
              <FormGroup>
                {renderInput('retraitMagasin', formData.retraitMagasin, 'checkbox', {
                  label: 'Retrait en magasin'
                })}
              </FormGroup>
            </FormSection>
          )}

          <ButtonGroup>
            {editMode ? (
              <>
                <SaveButton type="submit">
                  <FaSave /> Sauvegarder
                </SaveButton>
                <CancelButton type="button" onClick={handleCancel}>
                  <FaTimes /> Annuler
                </CancelButton>
              </>
            ) : (
              <EditButton type="button" onClick={handleEdit}>
                <FaEdit /> Modifier les informations
              </EditButton>
            )}
          </ButtonGroup>
        </form>
      </AccountContainer>
    </DashboardLayout>
  );
};

export default AccountSettings;