import axios from 'axios';
import { Product } from '../Models/Product';

const API_URL = 'http://localhost:3000';

export const ProductApiService = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  },

  createProduct: async (productData: Product): Promise<Product> => {
    try {
      const response = await axios.post(`${API_URL}/products`, productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  },

  deleteProduct: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/products/${id}`);
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw new Error('Failed to delete product');
    }
  },
};
