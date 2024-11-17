import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ExclusiveMembership.css';
import { Membership } from '../Models/Memberships';

export const ExclusiveMemberships = () => {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [selectedMembership, setSelectedMembership] = useState<Membership | null>(null);
  const API_URL = import.meta.env.VITE_API_URL;
 
  const fetchMemberships = async () => {
    try {
      const response = await axios.get(`${API_URL}/memberships`);
      console.log(response.data); 
      setMemberships(response.data); 
    } catch (error) {
      console.error('Error fetching memberships', error);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const handleMembershipClick = (membership: Membership) => {
    setSelectedMembership(membership);
  };

  return (
    <>
      <div className="exclusive-membership-container">
        <h1>Exclusive Memberships</h1>
        <div className="memberships-list">
          {memberships.map((membership) => (
            <div key={membership.id} className="membership-card" onClick={() => handleMembershipClick(membership)}>
              <h2>{membership.tier}</h2>
              <p className="membership-price">${membership.price.toFixed(2)} per month</p>
              <p className="membership-benefit">{membership.benefit}</p>
            </div>
          ))}
        </div>
        {selectedMembership && (
          <div className="membership-details">
            <h2>Details for {selectedMembership.tier} Membership</h2>
            <p className="membership-price-details">${selectedMembership.price.toFixed(2)} per month</p>
            <h3>Benefit:</h3>
            <p className="membership-benefit-details">{selectedMembership.benefit}</p>
        
          </div>
        )}
      </div>
    </>
  );
};
