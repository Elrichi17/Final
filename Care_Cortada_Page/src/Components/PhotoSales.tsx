import '../styles/PhotoScales.css';
import { Photo } from '../Models/Photos';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const PhotoSales = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [purchaseType, setPurchaseType] = useState<string>('digital');
  const [loading, setLoading] = useState(false); 
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`${API_URL}/photos`);
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handlePurchaseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPurchaseType(e.target.value);
  };

  const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
  
    const handleCheckout = async () => {
      if (!selectedPhoto || !stripe || !elements) return;
  
      setLoading(true);
  
 
      try {
        const response = await axios.post(`${API_URL}/payments/create-payment-intent`, {
          amount: selectedPhoto.price,
          currency: 'usd',
        });
  
        const { clientSecret } = response.data;
  
       
        const card = elements.getElement(CardElement);
  
        
        if (!card) {
          console.error('Card element is not available');
          setLoading(false);
          return;
        }
  
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,  
            billing_details: {
              name: 'Nombre del Cliente', 
            },
          },
        });
  
        if (error) {
          console.error('Error al completar el pago: ', error);
          setLoading(false);
        } else if (paymentIntent?.status === 'succeeded') {
        
          console.log('Pago completado');
          setLoading(false);
         
        }
      } catch (error) {
        console.error('Error al procesar el pago:', error);
        setLoading(false);
      }
    };
  
    return (
      <>
        <CardElement />
        <button
          className="purchase-button"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Proceed to Checkout'}
        </button>
      </>
    );
  };
  

  return (
    <div className="photo-sales-container">
      <h1>Photo Sales</h1>
      <div className="photos-gallery">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card" onClick={() => handlePhotoClick(photo)}>
            <img src={photo.image} alt={photo.title} className="photo-image" />
            <h2>{photo.title}</h2>
            <p className="photo-price">${photo.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="purchase-section">
          <h2>Purchase {selectedPhoto.title}</h2>
          <img src={selectedPhoto.image} alt={selectedPhoto.title} className="selected-photo" />
          <p className="selected-photo-price">${selectedPhoto.price.toFixed(2)}</p>
          <div className="purchase-options">
            <label htmlFor="purchase-type">Select Purchase Type:</label>
            <select
              id="purchase-type"
              value={purchaseType}
              onChange={handlePurchaseTypeChange}
              className="purchase-select"
            >
              <option value="digital">Digital Download</option>
              <option value="physical">Physical Print</option>
            </select>
          </div>

          {/* Envuelve toda la sección de pago con el Elements provider */}
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      )}
    </div>
  );
};
