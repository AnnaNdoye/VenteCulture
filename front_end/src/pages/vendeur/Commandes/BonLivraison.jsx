import React from 'react';
import { useParams } from 'react-router-dom';
import { SectionTitle } from '../../../styles/StyledComponents';
import DashboardLayout from '../accueil/Dashboard';

const BonLivraison = () => {
  const { id } = useParams();
  // Récupérer les données de la commande
  
  return (
    <DashboardLayout>
      <div className="bon-livraison">
        <h1>Bon de Livraison #{id}</h1>
        {/* Détails du bon de livraison */}
        <button onClick={() => window.print()}>Imprimer</button>
      </div>
    </DashboardLayout>
  );
};

export default BonLivraison;