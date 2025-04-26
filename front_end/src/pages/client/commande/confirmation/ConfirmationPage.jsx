import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Alert, Button } from 'react-bootstrap';
import { FaCheckCircle, FaShoppingBag } from 'react-icons/fa';

const ConfirmationPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) throw new Error('Commande non trouvée');
        
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [orderId]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-5 text-center">
      <FaCheckCircle size={64} className="text-success mb-4" />
      <h2>Merci pour votre commande !</h2>
      <p className="lead">Votre commande #${orderId} a été confirmée</p>
      
      <Card className="my-4">
        <Card.Body>
          <div className="d-flex justify-content-between mb-3">
            <span>Date:</span>
            <span>{new Date(order.date).toLocaleDateString()}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Total:</span>
            <span>{order.total.toFixed(2)} €</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Mode de paiement:</span>
            <span>{order.paymentMethod}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Statut:</span>
            <span className="text-capitalize">{order.status}</span>
          </div>
        </Card.Body>
      </Card>
      
      <p className="mb-4">
        Un email de confirmation a été envoyé à {order.email}.
        Vous pouvez suivre votre commande dans votre espace client.
      </p>
      
      <div className="d-flex justify-content-center gap-3">
        <Button variant="primary" href="/compte/commandes">
          <FaShoppingBag className="me-2" />
          Voir mes commandes
        </Button>
        <Button variant="outline-primary" href="/produits">
          Continuer vos achats
        </Button>
      </div>
    </Container>
  );
};

export default ConfirmationPage;