import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ background: '#2C3E50', color: '#ccc', padding: '40px 0 20px', marginTop: '60px' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 30 }}>
      <div>
        <h3 style={{ color: '#FF6B35', marginBottom: 12 }}>🛍️ ShopEasy</h3>
        <p style={{ fontSize: 14, lineHeight: 1.6 }}>Your one-stop shop for everything you need. Quality products, great prices.</p>
      </div>
      <div>
        <h4 style={{ color: 'white', marginBottom: 12 }}>Quick Links</h4>
        {['/', '/products', '/cart', '/orders'].map((path, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <Link to={path} style={{ color: '#ccc', fontSize: 14 }}>
              {['Home', 'Products', 'Cart', 'My Orders'][i]}
            </Link>
          </div>
        ))}
      </div>
      <div>
        <h4 style={{ color: 'white', marginBottom: 12 }}>Categories</h4>
        {['Electronics', 'Clothing', 'Books', 'Sports', 'Home & Kitchen'].map((cat) => (
          <div key={cat} style={{ marginBottom: 8 }}>
            <Link to={`/products?category=${cat}`} style={{ color: '#ccc', fontSize: 14 }}>{cat}</Link>
          </div>
        ))}
      </div>
      <div>
        <h4 style={{ color: 'white', marginBottom: 12 }}>Contact</h4>
        <p style={{ fontSize: 14, marginBottom: 8 }}>📧 support@shopeasy.com</p>
        <p style={{ fontSize: 14, marginBottom: 8 }}>📞 +91 98765 43210</p>
        <p style={{ fontSize: 14 }}>🏢 Indore, MP, India</p>
      </div>
    </div>
    <div style={{ textAlign: 'center', marginTop: 30, paddingTop: 20, borderTop: '1px solid #34495e', fontSize: 13 }}>
      © 2024 ShopEasy. Built with React + Node.js
    </div>
  </footer>
);

export default Footer;
