import axios from 'axios';
import { Model } from '../Models/Model';

const API_URL = import.meta.env.VITE_API_URL; 

export const ModelApiService = {
  getModels: async (): Promise<Model[]> => {
    const response = await axios.get(`${API_URL}/models`);
    return response.data;
  },

  createModel: async (modelData: Model): Promise<Model> => {
    const response = await axios.post(`${API_URL}/models`, modelData);
    return response.data;
  },

  deleteModel: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/models/${id}`);
  },
};
