import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes, FaBox, FaImage, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { SectionTitle } from '../../../styles/StyledComponents';
import DashboardLayout from '../accueil/Dashboard';

// Animations
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

// Styled Components
const ProductFormContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const FormHeader = styled.div`
  background-color:linear-gradient(135deg, #4caf50, #8bc34a);
  padding: 1.5rem;
`;

const ErrorAlert = styled.div`
  background-color: #fef2f2;
  border-left: 4px solid #ef4444;
  padding: 1rem;
  margin: 1.5rem;
  display: flex;
  align-items: center;
`;

const FormContent = styled.div`
  padding: 1.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormField = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
`;

const RequiredStar = styled.span`
  color: #ef4444;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  outline: none;

  &:focus {
    border-color: #16a34a;
    box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  outline: none;
  min-height: 6rem;

  &:focus {
    border-color: #16a34a;
    box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.2);
  }
`;

const ErrorText = styled.p`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #ef4444;
`;

const ImageUploadContainer = styled.div`
  margin-top: 0.25rem;
  border: 2px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #16a34a;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  margin-top: 0.5rem;
  border-radius: 0.5rem;
  overflow: hidden;
  height: 15rem;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: #ef4444;
  color: white;
  padding: 0.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  opacity: 0;

  ${ImagePreview}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: #dc2626;
  }
`;

const CheckboxContainer = styled.div`
  background-color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
`;

const CheckboxInput = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  color: #16a34a;
  border-color: #d1d5db;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SecondaryButton = styled(Button)`
  background-color: white;
  border: 1px solid #d1d5db;
  color: #374151;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #16a34a;
  color: white;
  border: none;

  &:hover {
    background-color:rgb(23, 170, 77);
  }

  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  animation: ${spin} 1s linear infinite;
  border-radius: 9999px;
  border-top: 2px solid transparent;
  border-right: 2px solid transparent;
  border-bottom: 2px solid transparent;
  border-left: 2px solid white;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16rem;
`;

const LoadingSpinner = styled.div`
  animation: ${spin} 1s linear infinite;
  border-radius: 9999px;
  border-top: 2px solid #16a34a;
  border-right: 2px solid #16a34a;
  border-bottom: 2px solid #16a34a;
  border-left: 2px solid transparent;
  width: 3rem;
  height: 3rem;
`;

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({
    name: id ? 'Riz local (5kg)' : '',
    price: id ? 4500 : '',
    stock: id ? 3 : '',
    description: id ? 'Riz de qualité supérieure cultivé dans la vallée du fleuve Sénégal' : '',
    isActive: true,
    image: id ? '/images/riz-senegal.jpg' : null
  });
  
  const [touched, setTouched] = useState({});
  
  useEffect(() => {
    if (id) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('Produit soumis:', product);
      navigate('/vendeur/produits');
    } catch (err) {
      setError("Une erreur s'est produite lors de l'enregistrement du produit");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
    
    setTouched({ ...touched, [name]: true });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setError("L'image est trop volumineuse. Taille maximale: 10MB");
        return;
      }
      
      setProduct({
        ...product,
        image: URL.createObjectURL(file)
      });
    }
  };
  
  const renderField = (label, name, type = "text", options = {}) => {
    const isRequired = options.required !== false;
    const { min, max, rows } = options;
    
    return (
      <FormField>
        <Label>
          {label} {isRequired && <RequiredStar>*</RequiredStar>}
        </Label>
        
        {type === 'textarea' ? (
          <TextArea
            name={name}
            rows={rows || 4}
            value={product[name] || ''}
            onChange={handleChange}
            required={isRequired}
            onBlur={() => setTouched({ ...touched, [name]: true })}
          />
        ) : (
          <Input
            type={type}
            name={name}
            value={product[name] || ''}
            onChange={handleChange}
            required={isRequired}
            min={min}
            max={max}
            onBlur={() => setTouched({ ...touched, [name]: true })}
          />
        )}
        
        {touched[name] && isRequired && !product[name] && (
          <ErrorText>Ce champ est requis</ErrorText>
        )}
      </FormField>
    );
  };

  if (loading && id) {
    return (
      <DashboardLayout>
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ProductFormContainer>
        <FormHeader>
          <SectionTitle className="text-white flex items-center">
            <FaBox className="mr-2" /> {id ? 'Modifier le Produit' : 'Ajouter un Nouveau Produit'}
          </SectionTitle>
        </FormHeader>

        {error && (
          <ErrorAlert>
            <FaExclamationCircle className="text-red-500 mr-3" />
            <p className="text-red-700">{error}</p>
          </ErrorAlert>
        )}

        <FormContent>
          <form onSubmit={handleSubmit}>
            <FormGrid>
              <div>
                {renderField('Nom du produit', 'name')}
                {renderField('Prix (FCFA)', 'price', 'number', { min: 0 })}
                {renderField('Stock disponible', 'stock', 'number', { min: 0 })}
                {renderField('Description', 'description', 'textarea')}
              </div>

              <div>
                <Label>Image du produit</Label>
                
                {product.image ? (
                  <ImagePreview>
                    <PreviewImage src={product.image} alt="Aperçu du produit" />
                    <RemoveImageButton
                      type="button"
                      onClick={() => setProduct({...product, image: null})}
                    >
                      <FaTimes />
                    </RemoveImageButton>
                  </ImagePreview>
                ) : (
                  <ImageUploadContainer>
                    <input 
                      type="file" 
                      className="sr-only" 
                      onChange={handleImageChange}
                      accept="image/*"
                      name="image"
                    />
                    <div>
                      <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4 flex text-sm justify-center">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500">
                          <span>Télécharger une image</span>
                        </label>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">PNG, JPG, JPEG jusqu'à 10MB</p>
                    </div>
                  </ImageUploadContainer>
                )}

                <CheckboxContainer>
                  <CheckboxInput
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    checked={product.isActive}
                    onChange={handleChange}
                  />
                  <CheckboxLabel htmlFor="isActive">
                    Produit visible dans la boutique
                  </CheckboxLabel>
                </CheckboxContainer>
              </div>
            </FormGrid>

            <FormActions>
              <SecondaryButton
                type="button"
                onClick={() => navigate('/vendeur/produits')}
              >
                Annuler
              </SecondaryButton>
              <PrimaryButton
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner />
                    Traitement...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" /> {id ? 'Mettre à jour' : 'Enregistrer'}
                  </>
                )}
              </PrimaryButton>
            </FormActions>
          </form>
        </FormContent>
      </ProductFormContainer>
    </DashboardLayout>
  );
};

export default ProductForm;