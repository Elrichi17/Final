import axios from 'axios';
import { Photo } from '../Models/Photos';
const API_URL = 'http://localhost:3000';

export const PhotoApiService = {
  getPhotos: async (): Promise<Photo[]> => {
    try {
      const response = await axios.get(`${API_URL}/photos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching photos:', error);
      throw new Error('Failed to fetch photos');
    }
  },

  createPhoto: async (photoData: Photo): Promise<Photo> => {
    try {
      const response = await axios.post(`${API_URL}/photos`, photoData);
      return response.data;
    } catch (error) {
      console.error('Error creating photo:', error);
      throw new Error('Failed to create photo');
    }
  },

  deletePhoto: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/photos/${id}`);
    } catch (error) {
      console.error(`Error deleting photo with id ${id}:`, error);
      throw new Error('Failed to delete photo');
    }
  },
};
