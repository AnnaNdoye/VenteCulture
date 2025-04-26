import { NavLink } from "react-router-dom";
import { Container, NavList, NavItem } from "../styles/components/Header.styles";
import { FaLeaf, FaUser, FaStore, FaShoppingBasket, FaInfoCircle, FaEnvelope } from "react-icons/fa";

const Header = () => {
  return (
    <Container>
      <NavLink to="/" className="logo">
        <FaLeaf /> VenteCulture
      </NavLink>
      
      <NavList>
        <NavItem>
          <NavLink to="/" end>
            <FaLeaf /> Accueil
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/produits">
            <FaShoppingBasket /> Produits
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/producteurs">
            <FaStore /> Producteurs
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/a-propos">
            <FaInfoCircle /> À propos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/contact">
            <FaEnvelope /> Contact
          </NavLink>
          

        </NavItem>
      </NavList>
    </Container>
  );
};

export default Header;