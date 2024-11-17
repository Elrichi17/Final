import { useState ,useEffect} from 'react';
import axios from 'axios';
import '../styles/Models.css';
import { Model } from '../Models/Model';
export const Models = () => {
  const [models, setModels] = useState<Model[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;
  
  const fetchModels = async () => {
    try {
      const response = await axios.get(`${API_URL}/models`); 
      console.log(response.data); 
      setModels(response.data); 
    } catch (error) {
      console.error('Error fetching models', error);
    }
  };
  useEffect(() => {
    fetchModels();
  }, []);
  return (
    <> 
    <div className="models-container">
      <h2>Our Models</h2>
      <div className="models-grid">
        {models.map((model) => (
          <div key={model.id} className="model-card">
            <img src={model.photo} alt={model.name} className="model-photo" />
            <h3>{model.name}</h3>
            <a href={model.portfolio} target="_blank" rel="noopener noreferrer">
            <p>{model.portfolio}</p>
            </a>
            <p>{model.bookingInfo}</p>
        
          </div>
        ))}
      </div>
    
    </div>
    </>
  );
}
