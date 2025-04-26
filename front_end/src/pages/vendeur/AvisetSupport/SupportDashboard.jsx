import React, { useState } from 'react';
import styled from 'styled-components';
import { FaQuestionCircle, FaCommentAlt, FaBell, FaReply, FaCheck, FaStar } from 'react-icons/fa';

import DashboardLayout from '../accueil/Dashboard';
import { SectionTitle } from '../../../styles/StyledComponents';
import ReviewModal from './ReviewModal'; // Importez le composant ReviewModal
import QuestionReplyModal from './QuestionReplyModal'; // Importez le composant QuestionReplyModal

// Styles existants inchangés...
const SupportContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 2rem;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #4caf50;
  }
`;

const QuestionList = styled.div`
  display: grid;
  gap: 1rem;
`;

const QuestionCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const QuestionMeta = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const QuestionContent = styled.p`
  margin-bottom: 1rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s;

  &.reply {
    background-color: #4caf50;
    color: white;
    border: none;

    &:hover {
      background-color: #3d8b40;
    }
  }

  &.mark-resolved {
    background-color: #f3f4f6;
    color: #374151;
    border: 1px solid #d1d5db;

    &:hover {
      background-color: #e5e7eb;
    }
  }
`;

const NotificationBadge = styled.span`
  background-color: #ef4444;
  color: white;
  border-radius: 9999px;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  margin-left: 0.5rem;
`;

const SupportDashboard = () => {
  const [activeTab, setActiveTab] = useState('questions');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      product: 'Thé vert bio',
      customer: 'Marie Diop',
      question: 'Ce produit contient-il de la caféine ?',
      date: '2023-05-15',
      status: 'pending',
      isNew: true
    },
    {
      id: 2,
      product: 'Miel naturel',
      customer: 'Abdoulaye Ndiaye',
      question: 'Quelle est la durée de conservation ?',
      date: '2023-05-14',
      status: 'pending',
      isNew: false
    },
    {
      id: 3,
      product: 'Huile d\'argan',
      customer: 'Aïssatou Fall',
      question: 'Est-ce que cette huile peut être utilisée pour les cheveux ?',
      date: '2023-05-10',
      status: 'resolved',
      isNew: false,
      response: 'Oui, cette huile est excellente pour nourrir les cheveux secs.'
    }
  ]);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleReply = (questionId) => {
    const question = questions.find(q => q.id === questionId);
    setSelectedQuestion(question);
    setIsQuestionModalOpen(true);
  };
  const closeQuestionModal = () => {
    setIsQuestionModalOpen(false);
    setSelectedQuestion(null);
  };
  const submitQuestionResponse = (questionId, response) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, response: response, status: 'resolved', isNew: false } 
        : q
    ));
    console.log(`Réponse envoyée pour la question ${questionId}: ${response}`);
  };
  const markAsResolved = (questionId) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, status: 'resolved' } : q
    ));
  };

  return (
    <DashboardLayout>
      <SupportContainer>
        <SectionTitle>
          <FaQuestionCircle /> Support client
        </SectionTitle>

        <Tabs>
          <Tab 
            $active={activeTab === 'questions'}
            onClick={() => setActiveTab('questions')}
          >
            <FaQuestionCircle /> Questions clients
            {questions.filter(q => q.isNew).length > 0 && (
              <NotificationBadge>
                {questions.filter(q => q.isNew).length}
              </NotificationBadge>
            )}
          </Tab>
          <Tab 
            $active={activeTab === 'reviews'}
            onClick={() => setActiveTab('reviews')}
          >
            <FaCommentAlt /> Avis produits
          </Tab>
          <Tab 
            $active={activeTab === 'notifications'}
            onClick={() => setActiveTab('notifications')}
          >
            <FaBell /> Notifications
          </Tab>
        </Tabs>

        {activeTab === 'questions' && (
          <div>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
              Questions récentes
            </h3>
            
            <QuestionList>
              {questions.map(question => (
                <QuestionCard key={question.id}>
                  <QuestionHeader>
                    <div>
                      <strong>{question.product}</strong> - {question.customer}
                    </div>
                    <QuestionMeta>
                      {question.date} • {question.status === 'pending' ? 'En attente' : 'Résolue'}
                    </QuestionMeta>
                  </QuestionHeader>
                  
                  <QuestionContent>{question.question}</QuestionContent>
                  
                  {question.status === 'resolved' && question.response && (
                    <div style={{ 
                      backgroundColor: '#f0fdf4',
                      padding: '1rem',
                      borderRadius: '0.375rem',
                      marginBottom: '1rem'
                    }}>
                      <strong>Votre réponse :</strong> {question.response}
                    </div>
                  )}
                  
                  {question.status === 'pending' && (
                    <Actions>
                      <ActionButton 
                        className="reply"
                        onClick={() => handleReply(question.id)}
                      >
                        <FaReply /> Répondre
                      </ActionButton>
                      <ActionButton 
                        className="mark-resolved"
                        onClick={() => markAsResolved(question.id)}
                      >
                        <FaCheck /> Marquer comme résolu
                      </ActionButton>
                    </Actions>
                  )}
                </QuestionCard>
              ))}
            </QuestionList>
            
            {/* Modal de réponse aux questions */}
            {isQuestionModalOpen && selectedQuestion && (
              <QuestionReplyModal
                question={selectedQuestion}
                onClose={closeQuestionModal}
                onSubmit={submitQuestionResponse}
              />
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <ReviewsSection />
        )}

        {activeTab === 'notifications' && (
          <NotificationsSection />
        )}
      </SupportContainer>
    </DashboardLayout>
  );
};


const ReviewsSection = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      product: 'Thé vert bio',
      customer: 'Marie Diop',
      rating: 5,
      comment: 'Excellent produit, je recommande !',
      date: '2023-05-15',
      status: 'published'
    },
    {
      id: 2,
      product: 'Miel naturel',
      customer: 'Abdoulaye Ndiaye',
      rating: 4,
      comment: 'Très bon miel mais un peu cher',
      date: '2023-05-14',
      status: 'published'
    },
    {
      id: 3,
      product: 'Huile d\'argan',
      customer: 'Aïssatou Fall',
      rating: 3,
      comment: 'Qualité moyenne pour le prix',
      date: '2023-05-10',
      status: 'pending'
    }
  ]);
  
  // États pour gérer le modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const toggleReviewStatus = (reviewId) => {
    setReviews(reviews.map(r => 
      r.id === reviewId 
        ? { ...r, status: r.status === 'published' ? 'hidden' : 'published' } 
        : r
    ));
  };
  
  // Fonction pour ouvrir le modal
  const openReviewModal = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };
  
  // Fonction pour fermer le modal
  const closeReviewModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };
  
  // Fonction pour soumettre une réponse à un avis
  const handleReviewResponse = (reviewId, response) => {
    setReviews(reviews.map(r => 
      r.id === reviewId 
        ? { ...r, response: response, hasResponse: true } 
        : r
    ));
    // Vous pourriez aussi envoyer cette réponse à votre API
    console.log(`Réponse envoyée pour l'avis ${reviewId}: ${response}`);
  };

  return (
    <div>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
        Avis sur vos produits
      </h3>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        {reviews.map(review => (
          <div 
            key={review.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <strong>{review.product}</strong> - {review.customer}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                {review.date}
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  color={i < review.rating ? '#f59e0b' : '#d1d5db'} 
                />
              ))}
            </div>
            
            <p style={{ marginBottom: '1rem' }}>{review.comment}</p>
            
            {/* Afficher la réponse si elle existe */}
            {review.hasResponse && review.response && (
              <div style={{ 
                backgroundColor: '#f0fdf4',
                padding: '1rem',
                borderRadius: '0.375rem',
                marginBottom: '1rem'
              }}>
                <strong>Votre réponse :</strong> {review.response}
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {/* Bouton pour répondre à l'avis */}
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer'
                }}
                onClick={() => openReviewModal(review)}
              >
                <FaReply /> Répondre
              </button>
              
              {/* Bouton pour publier ou masquer l'avis */}
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: review.status === 'published' ? '#f3f4f6' : '#4caf50',
                  color: review.status === 'published' ? '#374151' : 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer'
                }}
                onClick={() => toggleReviewStatus(review.id)}
              >
                {review.status === 'published' ? (
                  <>
                    <FaCheck /> Masquer l'avis
                  </>
                ) : (
                  <>
                    <FaCheck /> Publier l'avis
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal de réponse aux avis */}
      {isModalOpen && selectedReview && (
        <ReviewModal 
          review={selectedReview}
          onClose={closeReviewModal}
          onSubmit={handleReviewResponse}
        />
      )}
    </div>
  );
};

const NotificationsSection = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      message: 'Nouvelle commande #1234',
      date: '2023-05-15 10:30',
      read: false
    },
    {
      id: 2,
      type: 'payment',
      message: 'Paiement reçu pour la commande #1234',
      date: '2023-05-15 11:45',
      read: false
    },
    {
      id: 3,
      type: 'review',
      message: 'Nouvel avis sur "Thé vert bio"',
      date: '2023-05-14 09:15',
      read: true
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <div>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
        Vos notifications
      </h3>
      
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {notifications.map(notification => (
          <div 
            key={notification.id}
            style={{
              padding: '1rem',
              backgroundColor: notification.read ? 'white' : '#f0fdf4',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontWeight: notification.read ? 'normal' : '600' }}>
                {notification.message}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                {notification.date}
              </div>
            </div>
            
            {!notification.read && (
              <button
                onClick={() => markAsRead(notification.id)}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Marquer comme lu
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportDashboard;