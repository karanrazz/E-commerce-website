import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();
  const navigate = useNavigate();
  const shipping = cartTotal >= 999 ? 0 : 99;

  if (cartItems.length === 0) {
    return (
      <div className="page" style={{ textAlign: 'center', paddingTop: 80 }}>
        <p style={{ fontSize: 60, marginBottom: 20 }}>🛒</p>
        <h2 style={{ marginBottom: 10 }}>Your cart is empty</h2>
        <p style={{ color: '#666', marginBottom: 24 }}>Add some products to continue shopping</p>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Shopping Cart ({cartItems.length} items)</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 30, alignItems: 'start' }}>
          {/* Cart Items */}
          <div className="card" style={{ overflow: 'hidden' }}>
            {cartItems.map((item, i) => (
              <div key={item._id} style={{
                display: 'flex', gap: 20, padding: 20, alignItems: 'center',
                borderBottom: i < cartItems.length - 1 ? '1px solid #eee' : 'none'
              }}>
                <img src={item.image} alt={item.name} style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 8 }} />

                <div style={{ flex: 1 }}>
                  <Link to={`/products/${item._id}`} style={{ fontWeight: 600, color: '#2C3E50', fontSize: 15 }}>{item.name}</Link>
                  <p style={{ color: '#FF6B35', fontWeight: 800, fontSize: 17, margin: '6px 0' }}>₹{item.price.toLocaleString()}</p>
                  <p style={{ color: '#666', fontSize: 13 }}>Subtotal: ₹{(item.price * item.qty).toLocaleString()}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button onClick={() => updateQty(item._id, item.qty - 1)} style={{ width: 30, height: 30, borderRadius: 6, border: '1px solid #ddd', cursor: 'pointer', background: 'white', fontSize: 16 }}>−</button>
                  <span style={{ fontWeight: 700, fontSize: 16, width: 24, textAlign: 'center' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item._id, item.qty + 1)} style={{ width: 30, height: 30, borderRadius: 6, border: '1px solid #ddd', cursor: 'pointer', background: 'white', fontSize: 16 }}>+</button>
                </div>

                <button onClick={() => removeFromCart(item._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#e74c3c', fontSize: 20 }}>🗑️</button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ marginBottom: 20 }}>Order Summary</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#666' }}>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#666' }}>Shipping</span>
                <span style={{ color: shipping === 0 ? '#2e7d32' : '#333' }}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p style={{ fontSize: 12, color: '#FF6B35' }}>
                  Add ₹{(999 - cartTotal).toLocaleString()} more for free shipping!
                </p>
              )}
              <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 18 }}>
                <span>Total</span>
                <span>₹{(cartTotal + shipping).toLocaleString()}</span>
              </div>
            </div>

            <button className="btn btn-primary btn-block" style={{ marginTop: 24, padding: 14, fontSize: 16 }} onClick={() => navigate('/checkout')}>
              Proceed to Checkout →
            </button>

            <Link to="/products" style={{ display: 'block', textAlign: 'center', marginTop: 12, color: '#666', fontSize: 14 }}>
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
