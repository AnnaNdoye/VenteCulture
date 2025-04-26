import { Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil'
import ConnexionAgriculteur from './pages/auth/ConnexionAgriculteur'
import ConnexionVendeur from './pages/auth/ConnexionVendeur'
import InscriptionVendeur from './pages/auth/InscriptionVendeur'
import InscriptionAgriculteur from './pages/auth/InscriptionAgriculteur'
import MotDePasseOublieAgriculteur from './pages/auth/MotDePasseOublieAgriculteur'
import MotDePasseOublieVendeur from './pages/auth/MotDePasseOublieVendeur'
import NouveauMotDePasse from './pages/auth/NouveauMotDePasse'
import PageClientP from './pages/client/accueil/AccueilPage'
import ProduitPage from './pages/client/produits/id/ProduitPage'
import AvisPage from './pages/client/support/AvisPage'
import PageClientDashboard from './pages/client/produits/ListeProduitsPage'
import PageClientSupport from './pages/client/support/AvisPage'
import PageClientPanier from './pages/client/panier/PanierPage'
import PageClientProduitsPrmo from './pages/client/produits/Promotions'
import PageClientHistorique from './pages/client/commande/Historique'
import PageClientCompte from './pages/client/compte/ComptePage'
import PageVendeurP from './pages/vendeur/accueil/Accueil'

//import PageVendeurPay from './components/seller/Payments/RevenueStats'

import PageVendeurProduitsForm from './pages/vendeur/Produits/ProductForm'
import PageVendeurProduits from './pages/vendeur/Produits/ProductList'
import PageVendeurCommandes from './pages/vendeur/Commandes/CommandeList'
import PageVendeurCommandesDetail from './pages/vendeur/Commandes/CommandeDetail'
import PageVendeurCommandesBonLivraison from './pages/vendeur/Commandes/BonLivraison'
import PageVendeurCommandesFacture from './pages/vendeur/Commandes/Facture'
import PageVendeurSettings from './pages/vendeur/Compte/AccountSettings'
import PageVendeurRevenue from './pages/vendeur/paiment/RevenueStats'
import PageVendeurStatistique from './pages/vendeur/paiment/WithdrawalForm'
import PageVendeurAvisetSupport from './pages/vendeur/AvisetSupport/SupportDashboard'
//import PageVendeurAvisetSupportR from './pages/vendeur/AvisetSupport/ReviewModal'

// import PageClientCompte from "./pages/client/compte/ComptePage";
// import PageVendeurP from "./pages/vendeur/accueil/Accueil";
// import PageVendeurPay from "./components/seller/Payments/RevenueStats";
// import PageVendeurProduitsForm from "./pages/vendeur/Produits/ProductForm";
// import PageVendeurProduits from "./pages/vendeur/Produits/ProductList";









export default function App() {
  return (
    <Routes>
     <Route path="/" element={<Accueil />} />
<Route path="/connexion_Agriculteur" element={<ConnexionAgriculteur />} />
<Route path="/connexion_vendeur" element={<ConnexionVendeur />} />
<Route path="/inscription_vendeur" element={<InscriptionVendeur />} />
<Route path="/inscription_agriculteur" element={<InscriptionAgriculteur />} />
<Route path="/mot_de_passe_oublie_agriculteur" element={<MotDePasseOublieAgriculteur />} />
<Route path="/mot_de_passe_oublie_vendeur" element={<MotDePasseOublieVendeur />} />
<Route path="/nouveau_mot_de_passe/:token" element={<NouveauMotDePasse />} />
<Route path="/client" element={<PageClientP />} />
<Route path="/client/dashboard" element={<PageClientDashboard />} />
<Route path="/client/historique" element={<PageClientHistorique />} />

<Route path="/client/promotions" element={<PageClientProduitsPrmo />} />
<Route path="/client/support" element={<PageClientSupport />} />
<Route path="/client/panier" element={<PageClientPanier />} />
<Route path="/client/produits/:category/:id/avis" element={<AvisPage />} />
<Route path="/client/compte" element={< PageClientCompte/>} />
<Route path="/vendeur" element={<PageVendeurP/>} />
<Route path="/vendeur/produits" element={<PageVendeurProduits/>} />
<Route path="/vendeur/produits/ajouter" element={<PageVendeurProduitsForm/>} />
<Route path="/vendeur/commande" element={<PageVendeurCommandes/>} />
<Route path="/vendeur/commandes/details" element={<PageVendeurCommandesDetail/>} />
<Route path="/vendeur/commandes/livraison" element={<PageVendeurCommandesBonLivraison/>} />
<Route path="/vendeur/commandes/facture" element={<PageVendeurCommandesFacture/>} />
<Route path="/vendeur/parametres" element={<PageVendeurSettings/>} />
<Route path="/vendeur/statistiques" element={<PageVendeurStatistique/>} />
<Route path="/vendeur/revenue" element={<PageVendeurRevenue/>} />

<Route path="/vendeur/support" element={<PageVendeurAvisetSupport/>} />
<Route path="/vendeur/support/avis" element={<PageVendeurAvisetSupport/>} />

<Route path="/vendeur/payement" element={<PageVendeurPay/>} />


    
    </Routes>
  )
}