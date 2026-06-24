import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Beauty'];
const CAT_ICONS = { Electronics: '💻', Clothing: '👕', Books: '📚', 'Home & Kitchen': '🏠', Sports: '⚽', Beauty: '💄' };

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/products?limit=4')
      .then(({ data }) => setFeatured(data.products))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Shop Smart, <span>Live Better</span></h1>
          <p>Discover thousands of products at unbeatable prices. From electronics to fashion, we've got it all.</p>
          <div className="hero-search">
            <input
              type="text"
              placeholder="What are you looking for?"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/products?keyword=${search}`)}
            />
            <button className="btn btn-primary" onClick={() => navigate(`/products?keyword=${search}`)}>
              🔍 Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <Link to={`/products?category=${cat}`} key={cat} className="category-card">
                <span className="cat-icon">{CAT_ICONS[cat]}</span>
                <span>{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 className="section-title" style={{ margin: 0 }}>Featured Products</h2>
            <Link to="/products" className="btn btn-outline">View All →</Link>
          </div>
          {loading ? (
            <div className="spinner" />
          ) : (
            <div className="products-grid">
              {featured.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Banner */}
      <section className="promo-banner">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Free Shipping on Orders Above ₹999!</h2>
          <p>Use code <strong>FREESHIP</strong> at checkout</p>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: 16 }}>Shop Now</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
