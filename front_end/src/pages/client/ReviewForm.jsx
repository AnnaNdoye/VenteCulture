import { useState } from 'react';

export const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, comment });
    // Envoyer les données à votre API ici
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Note :</label>
        <input 
          type="number" 
          min="1" 
          max="5" 
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <div>
        <label>Commentaire :</label>
        <textarea 
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button type="submit">Envoyer</button>
    </form>
  );
};