import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes, FaReply, FaStar } from 'react-icons/fa';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #6b7280;
`;

const ReviewContent = styled.div`
  margin-bottom: 1.5rem;
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  min-height: 120px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3d8b40;
  }
`;

const ReviewModal = ({ review, onClose, onSubmit }) => {
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(review.id, response);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Répondre à l'avis</h3>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ReviewContent>
          <div style={{ marginBottom: '0.5rem', fontWeight: '600' }}>
            {review.product} - {review.customer}
          </div>
          <StarsContainer>
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color={i < review.rating ? '#f59e0b' : '#d1d5db'} />
            ))}
          </StarsContainer>
          <p>{review.comment}</p>
        </ReviewContent>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Votre réponse</Label>
            <Textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Merci pour votre avis..."
              required
            />
          </FormGroup>

          <SubmitButton type="submit">
            <FaReply /> Publier la réponse
          </SubmitButton>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ReviewModal;