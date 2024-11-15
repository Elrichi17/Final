import axios from 'axios';
import { Event } from '../Models/Events';

const API_URL = 'http://localhost:3000';

export const EventApiService = {
  getEvents: async (): Promise<Event[]> => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new Error('Failed to fetch events');
    }
  },

  createEvent: async (eventData: Event): Promise<Event> => {
    try {
      const response = await axios.post(`${API_URL}/events`, eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Failed to create event');
    }
  },

  deleteEvent: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/events/${id}`);
    } catch (error) {
      console.error(`Error deleting event with id ${id}:`, error);
      throw new Error('Failed to delete event');
    }
  },
};
