import{ useState } from 'react';
import '../styles/ContactUs.css';

export const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      };
  return (
    <>
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          required
        />
        
        <button type="submit" className="submit-button">Send Message</button>
      </form>
      <div className="contact-details">
        <h2>Business Contact Details</h2>
        <p>Email: contact@andreamesa.com</p>
        <p>Phone: (123) 456-7890</p>
        <div className="social-media-links">
          <a href="https://facebook.com/andreamesa" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com/andreamesa" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com/andreamesa" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </div>
    </>
  )
}
