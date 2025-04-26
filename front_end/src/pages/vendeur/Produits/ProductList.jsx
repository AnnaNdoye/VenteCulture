import React from 'react';
import { FaBox, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SectionTitle } from '../../../styles/StyledComponents';
import DashboardLayout from '../accueil/Dashboard';

// Styled Components
const ProductListContainer = styled.div`
  padding: 1.5rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const AddButton = styled(Link)`
  background-color: #16a34a;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #15803d;
  }
`;

const TableContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f9fafb;
`;

const TableHeaderCell = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  white-space: nowrap;
  font-size: 0.875rem;
`;

const ProductCell = styled(TableCell)`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  object-fit: cover;
  margin-right: 1rem;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductName = styled.div`
  font-weight: 500;
  color: #111827;
`;

const ProductCategory = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 9999px;
  display: inline-block;
  ${props => props.$active 
    ? 'background-color: #dcfce7; color: #166534;' 
    : 'background-color: #fee2e2; color: #991b1b;'
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditButton = styled(ActionButton)`
  color: #2563eb;
  background-color: rgba(37, 99, 235, 0.1);

  &:hover {
    color: #1e40af;
    background-color: rgba(37, 99, 235, 0.2);
  }
`;

const EditLink = styled(Link)`
  color: #2563eb;
  background-color: rgba(37, 99, 235, 0.1);
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:hover {
    color: #1e40af;
    background-color: rgba(37, 99, 235, 0.2);
  }
`;

const ToggleButton = styled(ActionButton)`
  color: #16a34a;
  background-color: rgba(22, 163, 74, 0.1);

  &:hover {
    color: #15803d;
    background-color: rgba(22, 163, 74, 0.2);
  }
`;

const DeleteButton = styled(ActionButton)`
  color: #dc2626;
  background-color: rgba(220, 38, 38, 0.1);

  &:hover {
    color: #b91c1c;
    background-color: rgba(220, 38, 38, 0.2);
  }
`;

const ProductList = () => {
  // Données simulées
  const products = [
    {
      id: 1,
      name: 'Riz local (5kg)',
      price: 4500,
      stock: 3,
      category: 'Céréales',
      isActive: true,
      image: '/images/riz-senegal.jpg'
    },
    {
      id: 2,
      name: 'Mangues Kent',
      price: 2000,
      stock: 15,
      category: 'Fruits',
      isActive: true,
      image: '/images/mangues-senegal.jpg'
    },
    {
      id: 3,
      name: 'Arachides torréfiées',
      price: 1800,
      stock: 0,
      category: 'Noix',
      isActive: false,
      image: '/images/arachides.jpg'
    },
  ];

  return (
    <DashboardLayout>
      <ProductListContainer>
        <SectionTitle>
          <FaBox /> Gestion des Produits
        </SectionTitle>

        <HeaderContainer>
          <AddButton to="/vendeur/produits/ajouter">
            <FaPlus style={{ marginRight: '0.5rem' }} /> Ajouter un produit
          </AddButton>
        </HeaderContainer>

        <TableContainer>
          <StyledTable>
            <TableHeader>
              <tr>
                <TableHeaderCell>Produit</TableHeaderCell>
                <TableHeaderCell>Prix (FCFA)</TableHeaderCell>
                <TableHeaderCell>Stock</TableHeaderCell>
                <TableHeaderCell>Statut</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </tr>
            </TableHeader>
            <tbody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <ProductCell>
                    <ProductImage src={product.image} alt={product.name} />
                    <ProductInfo>
                      <ProductName>{product.name}</ProductName>
                      <ProductCategory>{product.category}</ProductCategory>
                    </ProductInfo>
                  </ProductCell>
                  <TableCell>{product.price.toLocaleString()}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <StatusBadge $active={product.isActive}>
                      {product.isActive ? 'Actif' : 'Inactif'}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <ActionsContainer>
                      <EditLink to={`/vendeur/produits/modifier/${product.id}`}>
                        <FaEdit />
                      </EditLink>
                      <ToggleButton>
                        {product.isActive ? <FaToggleOn /> : <FaToggleOff />}
                      </ToggleButton>
                      <DeleteButton>
                        <FaTrash />
                      </DeleteButton>
                    </ActionsContainer>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      </ProductListContainer>
    </DashboardLayout>
  );
};

export default ProductList;