import axios from 'axios';
import { Membership } from '../Models/Memberships';
const API_URL = import.meta.env.VITE_API_URL; 

export const MembershipApiService = {
  getMemberships: async (): Promise<Membership[]> => {
    try {
      const response = await axios.get(`${API_URL}/memberships`);
      return response.data;
    } catch (error) {
      console.error('Error fetching memberships:', error);
      throw new Error('Failed to fetch memberships');
    }
  },

  createMembership: async (membershipData: Membership): Promise<Membership> => {
    try {
      const response = await axios.post(`${API_URL}/memberships`, membershipData);
      return response.data;
    } catch (error) {
      console.error('Error creating membership:', error);
      throw new Error('Failed to create membership');
    }
  },

  deleteMembership: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/memberships/${id}`);
    } catch (error) {
      console.error(`Error deleting membership with id ${id}:`, error);
      throw new Error('Failed to delete membership');
    }
  },
};
