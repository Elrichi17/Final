import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MakeupProducts.css';
import { Product } from '../Models/Product';

export const MakeupProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      console.log(response.data); 
      setProducts(response.data); 
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products', error);
      setError('Failed to load products.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product =>
        new RegExp(`^${selectedCategory}$`, 'i').test(product.category) 
      );

  return (
    <div className="makeup-products-container">
      <h1>Makeup Products</h1>
      <div className="filter-section">
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="all">All</option>
          <option value="Lipsticks">Lipsticks</option>
          <option value="Skin">Skin</option>
          <option value="Eye Shadows">Eye Shadows</option>
        </select>
      </div>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <h2>{product.name}</h2>
              <div className="product-image">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <p>{product.description}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};
