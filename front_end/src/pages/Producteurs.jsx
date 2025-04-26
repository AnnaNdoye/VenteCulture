import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaLeaf, FaUser, FaStore, FaSeedling, FaShoppingBasket, FaHandsHelping } from "react-icons/fa";
import Navigation from "../components/Navigation";
import { useEffect } from 'react';

// ========= Animations et Styles =========
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TitleContainer = styled.div`
  text-align: center;
  padding: 2rem 0;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #2e7d32;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-top: 1rem;
`;

const Highlight = styled.span`
  color: #2e7d32;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.primary ? '#2e7d32' : '#f5f5f5'};
  color: ${props => props.primary ? 'white' : '#333'};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
`;

const HeroImage = styled.div`
  height: 400px;
  background-image: url('/hero-image.jpg');
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin: 2rem 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: #2e7d32;
  margin-bottom: 2rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: ${props => props.delay || '0s'};
`;

const FeatureIcon = styled.div`
  font-size: 2rem;
  color: #2e7d32;
  margin-bottom: 1rem;
`;

const ProductCarousel = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 1rem;
`;

const ProductCard = styled.div`
  min-width: 200px;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const FooterImage = styled.div`
  background-image: url('/footer-bg.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 3rem;
  text-align: center;
  border-radius: 8px;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`;

// ========= Données des produits =========
const products = [
  { id: 1, name: "Légumes Bio", image: "/legumes.jpg" },
  { id: 2, name: "Fruits Frais", image: "/fruits.jpg" },
  { id: 3, name: "Fromages", image: "/fromages.jpg" },
  { id: 4, name: "Miels", image: "/miels.jpg" },
];

// ========= Composant Principal =========
const Accueil = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  return (
    <Container>
      <Navigation />

      <Section id="accueil">
        <TitleContainer>
          <Title>
            <FaLeaf /> VenteCulture
          </Title>
          <Subtitle>
            La plateforme qui connecte <Highlight>agriculteurs</Highlight> et <Highlight>consommateurs</Highlight> 
            pour une <Highlight>agriculture durable</Highlight> et des circuits courts
          </Subtitle>
        </TitleContainer>

        <ButtonContainer>
          <Button primary onClick={() => navigate("/connexion_client")}>
            <FaUser /> Je suis un Client
          </Button>
          <Button onClick={() => navigate("/connexion_vendeur")}>
            <FaStore /> Je suis un Vendeur
          </Button>
        </ButtonContainer>

        <HeroImage />
      </Section>

      <Section id="engagement">
        <SectionTitle>Nos Engagements</SectionTitle>
        <FeaturesGrid>
          <FeatureCard delay="0.4s">
            <FeatureIcon><FaSeedling /></FeatureIcon>
            <h3>Production Locale</h3>
            <p>Des produits cultivés près de chez vous avec des méthodes respectueuses de l'environnement</p>
          </FeatureCard>
          
          <FeatureCard delay="0.6s">
            <FeatureIcon><FaShoppingBasket /></FeatureIcon>
            <h3>Marché Direct</h3>
            <p>Achetez sans intermédiaires pour des prix justes et une rémunération équitable des producteurs</p>
          </FeatureCard>
          
          <FeatureCard delay="0.8s">
            <FeatureIcon><FaHandsHelping /></FeatureIcon>
            <h3>Communauté</h3>
            <p>Rejoignez un réseau de consommateurs engagés et de producteurs passionnés</p>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      <Section id="produits">
        <SectionTitle>Nos Produits Phares</SectionTitle>
        <ProductCarousel>
          {products.map(product => (
            <ProductCard key={product.id}>
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
            </ProductCard>
          ))}
        </ProductCarousel>
      </Section>

      <Section id="contact">
        <FooterImage>
          <h3>Rejoignez notre communauté</h3>
          <p>
            Découvrez des produits frais directement chez les producteurs engagés de votre région. 
            Ensemble, construisons une agriculture plus durable et plus juste.
          </p>
          <Button primary style={{ marginTop: '1rem' }} onClick={() => navigate("/inscription")}>
            S'inscrire maintenant
          </Button>
        </FooterImage>
      </Section>
    </Container>
  );
};

export default Accueil;