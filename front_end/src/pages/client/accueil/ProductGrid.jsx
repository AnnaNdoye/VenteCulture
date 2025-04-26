// ProductGrid.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaStar, FaHeart } from 'react-icons/fa';

// Animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styles
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.07);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  
  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    
    img {
      transform: scale(1.1);
    }
    
    .actions button.add-to-cart {
      background: linear-gradient(135deg, #4caf50, #FFD700);
    }
  }
  
  .product-image {
    height: 200px;
    overflow: hidden;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover:after {
      opacity: 1;
    }
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.6s ease;
    }
  }
  
  .product-info {
    padding: 1.5rem;
    
    h3 {
      margin: 0 0 0.8rem;
      color: #333;
      font-size: 1.3rem;
      font-weight: 600;
    }
    
    .price {
      font-weight: bold;
      color: #4caf50;
      font-size: 1.4rem;
      margin-bottom: 0.8rem;
      display: flex;
      align-items: center;
      
      &:before {
        content: '';
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #FFD700;
        border-radius: 50%;
        margin-right: 8px;
      }
    }
    
    .seller {
      color: #666;
      font-size: 1rem;
      margin-bottom: 0.8rem;
      display: flex;
      align-items: center;
      
      &:before {
        content: '👨‍🌾';
        margin-right: 8px;
        font-size: 1.1rem;
      }
    }
    
    .rating {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      svg {
        color: #FFD700;
        filter: drop-shadow(0 0 2px rgba(255, 215, 0, 0.5));
      }
      
      span {
        font-weight: 600;
        color: #555;
      }
    }
    
    .actions {
      display: flex;
      justify-content: space-between;
      margin-top: 1.5rem;
      
      button {
        padding: 0.8rem 1.2rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        
        &.add-to-cart {
          flex: 1;
          margin-right: 10px;
          background: linear-gradient(135deg, #2e7d32, #4caf50);
          color: white;
          
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
          }
        }
        
        &.favorite {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
          color: #ff5722;
          border-radius: 50%;
          
          &:hover {
            background: #ffebee;
            transform: scale(1.1);
            
            svg {
              animation: ${pulse} 1s infinite;
            }
          }
        }
      }
    }
  }
  
  .promo-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: linear-gradient(135deg, #FFD700, #ff9800);
    color: white;
    padding: 0.5rem 0.8rem;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: bold;
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
    z-index: 2;
    transform: rotate(5deg);
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
      background-size: 200% 100%;
      animation: ${shimmer} 2s infinite;
      z-index: -1;
    }
  }
`;

const ProductGrid = ({ products }) => {
  return (
    <Grid>
      {products.map((product) => (
        <ProductCard key={product.id} className="animated-item">
          {product.promo && <div className="promo-badge">{product.promo}</div>}
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h3>{product.name}</h3>
            <div className="price">{product.price}</div>
            <div className="seller">{product.seller}</div>
            <div className="rating">
              <FaStar />
              <span>{product.rating}</span>
            </div>
            <div className="actions">
              <button className="add-to-cart">Ajouter au panier</button>
              <button className="favorite">
                <FaHeart />
              </button>
            </div>
          </div>
        </ProductCard>
      ))}
    </Grid>
  );
};

export default ProductGrid;