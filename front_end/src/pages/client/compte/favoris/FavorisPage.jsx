import React, { useState, useEffect } from 'react';
import ProductGrid from '../../../accueil/ProductGrid';

const FavorisPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorites', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) throw new Error('Erreur de chargement');
        
        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (productId) => {
    try {
      await fetch(`/api/favorites/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setFavorites(favorites.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  };

  return (
    <div className="favoris-page">
      <h2>Mes Produits Favoris</h2>
      
      {loading ? (
        <div>Chargement en cours...</div>
      ) : favorites.length === 0 ? (
        <div className="text-muted">Aucun produit favori pour le moment</div>
      ) : (
        <ProductGrid 
          products={favorites}
          isFavoritePage={true}
          onRemoveFavorite={handleRemoveFavorite}
        />
      )}
    </div>
  );
};

export default FavorisPage;