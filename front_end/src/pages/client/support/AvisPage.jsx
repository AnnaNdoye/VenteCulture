import React from 'react';
import { ReviewForm } from '../../client/ReviewForm';

export default function AvisPage() {
  const router = useRouter();
  const { productId } = router.query;

  return (
    <div>
      <h1>Donner votre avis</h1>
      <ReviewForm productId={productId} />
    </div>
  );
}