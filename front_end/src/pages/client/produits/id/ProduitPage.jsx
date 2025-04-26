import { useParams } from 'react-router-dom'; // Remplacez next/router

export default function ProduitPage() {
  const { id } = useParams(); 

  return (
    <div>
      <ProductDetails productId={id} />
      <SellerInfo productId={id} />
      <ReviewSection productId={id} />
    </div>
  );
}