import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(() => navigate('/products'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success('Added to cart!');
  };

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/products/${id}/reviews`, { rating, comment });
      toast.success('Review submitted!');
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
      setComment('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error submitting review');
    }
  };

  if (loading) return <div className="spinner" style={{ minHeight: '60vh' }} />;
  if (!product) return null;

  const renderStars = (r) => '★'.repeat(Math.round(r)) + '☆'.repeat(5 - Math.round(r));

  return (
    <div className="page">
      <div className="container">
        <button onClick={() => navigate(-1)} style={{ marginBottom: 20, background: 'none', border: 'none', cursor: 'pointer', color: '#FF6B35', fontSize: 15, fontWeight: 600 }}>
          ← Back
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 40 }}>
          {/* Image */}
          <div>
            <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 12, maxHeight: 420, objectFit: 'cover' }} />
          </div>

          {/* Info */}
          <div>
            <p style={{ color: '#FF6B35', fontWeight: 700, fontSize: 13, marginBottom: 8, textTransform: 'uppercase' }}>{product.category}</p>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#2C3E50', marginBottom: 12 }}>{product.name}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span className="stars" style={{ fontSize: 18 }}>{renderStars(product.rating)}</span>
              <span style={{ color: '#666', fontSize: 14 }}>{product.numReviews} reviews</span>
            </div>

            <p style={{ fontSize: 32, fontWeight: 800, color: '#2C3E50', marginBottom: 16 }}>₹{product.price.toLocaleString()}</p>

            <p style={{ color: '#555', lineHeight: 1.7, marginBottom: 24 }}>{product.description}</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontWeight: 600 }}>Status:</span>
              <span className={`badge ${product.stock > 0 ? 'badge-success' : 'badge-danger'}`}>
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
            </div>

            {product.stock > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <label style={{ fontWeight: 600 }}>Qty:</label>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }}
                >
                  {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => i + 1).map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-primary" onClick={handleAddToCart} disabled={product.stock === 0} style={{ flex: 1, padding: 14 }}>
                🛒 Add to Cart
              </button>
              <button className="btn btn-secondary" onClick={() => { handleAddToCart(); navigate('/cart'); }} disabled={product.stock === 0} style={{ flex: 1, padding: 14 }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="card" style={{ padding: 30 }}>
          <h2 style={{ marginBottom: 20, color: '#2C3E50' }}>Customer Reviews ({product.numReviews})</h2>

          {product.reviews.length === 0 ? (
            <p style={{ color: '#666' }}>No reviews yet. Be the first to review!</p>
          ) : (
            product.reviews.map((r) => (
              <div key={r._id} style={{ borderBottom: '1px solid #eee', paddingBottom: 16, marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <strong>{r.name}</strong>
                  <span className="stars">{renderStars(r.rating)}</span>
                </div>
                <p style={{ color: '#555', fontSize: 14 }}>{r.comment}</p>
              </div>
            ))
          )}

          {user && (
            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #eee' }}>
              <h3 style={{ marginBottom: 16 }}>Write a Review</h3>
              <form onSubmit={handleReview}>
                <div className="form-group">
                  <label>Rating</label>
                  <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Comment</label>
                  <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit Review</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
