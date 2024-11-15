import '../styles/AdminDashboard.css';
import { useState } from 'react';
import { AdminCredentials } from '../Models/AdminCredentials';

import { Model } from '../Models/Model';
import { Event } from '../Models/Events';
import { Membership } from '../Models/Memberships';
import { Photo } from '../Models/Photos';
import { Product } from '../Models/Product';

import { ModelApiService } from '../Apis/ModelApiService';
import { EventApiService } from '../Apis/EventApiService';
import { MembershipApiService } from '../Apis/MembershipApiService';
import { PhotoApiService } from '../Apis/PhotoSaleApiService';
import { ProductApiService } from '../Apis/ProductApiService';

export const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<AdminCredentials>({ username: '', password: '' });

  const [models, setModels] = useState<Model[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Form states
  const [modelForm, setModelForm] = useState<Model>({ id: 0, name: '', photo: '', portfolio: '', bookingInfo: '' });
  const [eventForm, setEventForm] = useState<Event>({ id: 0, name: '', date: '', location: '', participatingModels: [], productsShowcased: [] });
  const [membershipForm, setMembershipForm] = useState<Membership>({ id: 0, tier: '', benefit: '', price: 0 });
  const [photoForm, setPhotoForm] = useState<Photo>({ id: 0, title: '', image: '', price: 0 });
  const [productForm, setProductForm] = useState<Product>({ id: 0, name: '', description: '', price: 0, category: '', image: '' });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'password') {
      setIsLoggedIn(true);
      fetchData();
    } else {
      alert('Invalid credentials');
    }
  };

  const fetchData = async () => {
    try {
      setModels(await ModelApiService.getModels());
      setEvents(await EventApiService.getEvents());
      setMemberships(await MembershipApiService.getMemberships());
      setPhotos(await PhotoApiService.getPhotos());
      setProducts(await ProductApiService.getProducts());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAddModel = async () => {
    try {
      const newModel = await ModelApiService.createModel(modelForm);
      setModels((prev) => [...prev, newModel]);
      setModelForm({ id: 0, name: '', photo: '', portfolio: '', bookingInfo: '' });
    } catch (error) {
      console.error('Error adding model:', error);
    }
  };

  const handleDeleteModel = async (id: number) => {
    try {
      await ModelApiService.deleteModel(id);
      setModels((prev) => prev.filter((model) => model.id !== id));
    } catch (error) {
      console.error('Error deleting model:', error);
    }
  };

  const handleAddEvent = async () => {
    try {
      const newEvent = await EventApiService.createEvent(eventForm);
      setEvents((prev) => [...prev, newEvent]);
      setEventForm({ id: 0, name: '', date: '', location: '', participatingModels: [], productsShowcased: [] });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await EventApiService.deleteEvent(id);
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleAddMembership = async () => {
    try {
      const newMembership = await MembershipApiService.createMembership(membershipForm);
      setMemberships((prev) => [...prev, newMembership]);
      setMembershipForm({ id: 0, tier: '', benefit: '', price: 0 });
    } catch (error) {
      console.error('Error adding membership:', error);
    }
  };

  const handleDeleteMembership = async (id: number) => {
    try {
      await MembershipApiService.deleteMembership(id);
      setMemberships((prev) => prev.filter((membership) => membership.id !== id));
    } catch (error) {
      console.error('Error deleting membership:', error);
    }
  };

  const handleAddPhoto = async () => {
    try {
      const newPhoto = await PhotoApiService.createPhoto(photoForm);
      setPhotos((prev) => [...prev, newPhoto]);
      setPhotoForm({ id: 0, title: '', image: '', price: 0 });
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  const handleDeletePhoto = async (id: number) => {
    try {
      await PhotoApiService.deletePhoto(id);
      setPhotos((prev) => prev.filter((photo) => photo.id !== id));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const newProduct = await ProductApiService.createProduct(productForm);
      setProducts((prev) => [...prev, newProduct]);
      setProductForm({ id: 0, name: '', description: '', price: 0, category: '', image: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await ProductApiService.deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-login-container">
        <h1>Admin Login</h1>
        <form onSubmit={handleLoginSubmit} className="admin-login-form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleLoginChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleLoginChange}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <h1>Admin Dashboard</h1>

      {/* Model Section */}
      <div className="manage-section">
        <h2>Manage Models</h2>
        <input
          type="text"
          value={modelForm.name}
          onChange={(e) => setModelForm({ ...modelForm, name: e.target.value })}
          placeholder="Model Name"
        />
        <input
          type="text"
          value={modelForm.photo}
          onChange={(e) => setModelForm({ ...modelForm, photo: e.target.value })}
          placeholder="Photo URL"
        />
        <input
          type="text"
          value={modelForm.portfolio}
          onChange={(e) => setModelForm({ ...modelForm, portfolio: e.target.value })}
          placeholder="Portfolio URL"
        />
        <input
          type="text"
          value={modelForm.bookingInfo}
          onChange={(e) => setModelForm({ ...modelForm, bookingInfo: e.target.value })}
          placeholder="Booking Info"
        />
        <button onClick={handleAddModel}>Add Model</button>

        <div className="models-list">
          {models.map((model) => (
            <div key={model.id}>
              <p>{model.name}</p>
              <button onClick={() => handleDeleteModel(model.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

       {/* Event Section */}
      <div className="manage-section">
        <h2>Manage Events</h2>
        <input
          type="text"
          value={eventForm.name}
          onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
          placeholder="Event Name"
        />
        <input
          type="date"
          value={eventForm.date}
          onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
          placeholder="Event Date"
        />
        <input
          type="text"
          value={eventForm.location}
          onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
          placeholder="Event Location"
        />

        {/* Participating Models Multi-select */}
        <select
          multiple
          value={eventForm.participatingModels}
          onChange={(e) => {
            const selectedModels = Array.from(e.target.selectedOptions, (option) => option.value);
            setEventForm({ ...eventForm, participatingModels: selectedModels });
          }}
        >
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>

        {/* Products Showcased Multi-select */}
        <select
          multiple
          value={eventForm.productsShowcased}
          onChange={(e) => {
            const selectedProducts = Array.from(e.target.selectedOptions, (option) =>   option.value);
            setEventForm({ ...eventForm, productsShowcased: selectedProducts });
          }}
        >
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <button onClick={handleAddEvent}>Add Event</button>

        <div className="events-list">
          {events.map((event) => (
            <div key={event.id}>
              <p>{event.name}</p>
              <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* Membership Section */}
      <div className="manage-section">
        <h2>Manage Memberships</h2>
        <input
          type="text"
          value={membershipForm.tier}
          onChange={(e) => setMembershipForm({ ...membershipForm, tier: e.target.value })}
          placeholder="Membership Tier"
        />
        <input
          type="text"
          value={membershipForm.benefit}
          onChange={(e) => setMembershipForm({ ...membershipForm, benefit: e.target.value })}
          placeholder="Benefit"
        />
        <input
          type="number"
          value={membershipForm.price}
          onChange={(e) => setMembershipForm({ ...membershipForm, price: +e.target.value })}
          placeholder="Price"
        />
        <button onClick={handleAddMembership}>Add Membership</button>

        <div className="memberships-list">
          {memberships.map((membership) => (
            <div key={membership.id}>
              <p>{membership.tier}</p>
              <button onClick={() => handleDeleteMembership(membership.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Section */}
      <div className="manage-section">
        <h2>Manage Photos</h2>
        <input
          type="text"
          value={photoForm.title}
          onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })}
          placeholder="Photo Title"
        />
        <input
          type="text"
          value={photoForm.image}
          onChange={(e) => setPhotoForm({ ...photoForm, image: e.target.value })}
          placeholder="Image URL"
        />
        <input
          type="number"
          value={photoForm.price}
          onChange={(e) => setPhotoForm({ ...photoForm, price: +e.target.value })}
          placeholder="Price"
        />
        <button onClick={handleAddPhoto}>Add Photo</button>

        <div className="photos-list">
          {photos.map((photo) => (
            <div key={photo.id}>
              <p>{photo.title}</p>
              <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      {/* Product Section */}
      <div className="manage-section">
        <h2>Manage Products</h2>
        <input
          type="text"
          value={productForm.name}
          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
          placeholder="Product Name"
        />
        <input
          type="text"
          value={productForm.description}
          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
          placeholder="Description"
        />
        <input
          type="number"
          value={productForm.price}
          onChange={(e) => setProductForm({ ...productForm, price: +e.target.value })}
          placeholder="Price"
        />
        <input
          type="text"
          value={productForm.category}
          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
          placeholder="Category"
        />
        <input
          type="text"
          value={productForm.image}
          onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
          placeholder="Image URL"
        />
        <button onClick={handleAddProduct}>Add Product</button>

        <div className="products-list">
          {products.map((product) => (
            <div key={product.id}>
              <p>{product.name}</p>
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
