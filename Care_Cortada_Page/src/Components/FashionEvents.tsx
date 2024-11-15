import '../styles/FashionEvents.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Event } from '../Models/Events';
import { Model } from '../Models/Model';
import { Product } from '../Models/Product';

export const FashionEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const [eventsResponse, modelsResponse, productsResponse] = await Promise.all([
        axios.get('http://localhost:3000/events'),
        axios.get('http://localhost:3000/models'),
        axios.get('http://localhost:3000/products')
      ]);

      setEvents(eventsResponse.data);
      setModels(modelsResponse.data);
      setProducts(productsResponse.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const getModelNameById = (id: number) => {
    const model = models.find((model) => model.id === id);
    return model ? model.name : 'Unknown Model';
  };

  const getProductNameById = (id: number) => {
    const product = products.find((product) => product.id === id);
    return product ? product.name : 'Unknown Product';
  };

  return (
    <>
      <div className="fashion-events-container">
        <h1>Fashion Events</h1>
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h2>{event.name}</h2>
              <p className="event-date">{event.date}</p>
              <p className="event-location">{event.location}</p>
              <div className="event-details">
                <div className="event-models">
                  <h3>Participating Models</h3>
                  <ul>
                    {event.participatingModels.map((modelId, index) => (
                      <li key={index}>{getModelNameById(Number(modelId))}</li>
                    ))}
                  </ul>
                </div>
                <div className="event-products">
                  <h3>Products Showcased</h3>
                  <ul>
                    {event.productsShowcased.map((productId, index) => (
                      <li key={index}>{getProductNameById(Number(productId))}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
