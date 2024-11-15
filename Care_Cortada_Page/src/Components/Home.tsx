import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import '../styles/Home.css';

export const Home = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className="home-container">
      <header>
        {!isAuthenticated ? (
          <button className="auth-btn login-btn" onClick={() => loginWithRedirect()}>Login</button>
        ) : (
          <button className="auth-btn logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </header>

      <section className="welcome-section">
        <h1>Welcome to La Care Cortada</h1>
        <p className="welcome-message">
          Andrea Mesa, also known as "La Care Cortada," welcomes you to her world of makeup, fashion, and more.
        </p>
      </section>

      <section className="overview-section">
        <h2>About Us</h2>
        <p>
          Our brand is a symbol of elegance and boldness. From high-quality makeup products to exclusive fashion events, we bring the best to those who dare to be different.
        </p>
      </section>

      <section className="highlights-section">
        <div className="highlight-item">
          <h3>Featured Models</h3>
          <p>Explore the profiles of our top models who represent our brand worldwide.</p>
          <Link to="/models" className="highlight-link">View Models</Link>
        </div>
        <div className="highlight-item">
          <h3>Makeup Products</h3>
          <p>Discover our exclusive range of makeup products.</p>
          <Link to="/makeup-products" className="highlight-link">Explore Products</Link>
        </div>
        <div className="highlight-item">
          <h3>Upcoming Events</h3>
          <p>Don't miss our upcoming fashion shows and events.</p>
          <Link to="/fashion-events" className="highlight-link">View Events</Link>
        </div>
        <div className="highlight-item">
          <h3>Exclusive Memberships</h3>
          <p>Gain access to behind-the-scenes content, special discounts, and invitations to VIP events.</p>
          <Link to="/memberships" className="highlight-link">Join Now</Link>
        </div>
        <div className="highlight-item">
          <h3>Photo Sales</h3>
          <p>Purchase high-quality photos from our fashion events and model portfolios.</p>
          <Link to="/photo-sales" className="highlight-link">Buy Photos</Link>
        </div>
      </section>

      <footer className="home-footer">
        <p>Join us and experience the allure of La Care Cortada.</p>
        <Link to="/contact-us" className="highlight-link">Contact Us</Link>
      </footer>
    </div>
  );
};
