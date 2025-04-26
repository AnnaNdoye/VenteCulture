// ./QuestionReplyModal.js
import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 500px;
`;

const QuestionReplyModal = ({ question, onClose, onSubmit }) => {
  const [response, setResponse] = useState('');

  const handleSubmit = () => {
    onSubmit(question.id, response);
    onClose();
  };

  return (
    <ModalBackdrop>
      <ModalContent>
        <h2>Répondre à {question.customer}</h2>
        <p>{question.question}</p>
        <textarea 
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          rows={4}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button onClick={onClose}>Annuler</button>
          <button onClick={handleSubmit} style={{ backgroundColor: '#4caf50', color: 'white' }}>Envoyer</button>
        </div>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default QuestionReplyModal;
