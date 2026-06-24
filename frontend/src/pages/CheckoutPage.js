import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const shipping = cartTotal >= 999 ? 0 : 99;
  const total = cartTotal + shipping;

  const [address, setAddress] = useState({ street: '', city: '', state: '', pincode: '' });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const placeOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.qty,
        })),
        shippingAddress: address,
        paymentMethod,
        itemsPrice: cartTotal,
        shippingPrice: shipping,
        totalPrice: total,
      };

      const { data } = await axios.post('/api/orders', orderData);
      clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate(`/orders/${data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.street || !address.city || !address.state || !address.pincode) {
      return toast.error('Please fill in all address fields');
    }
    placeOrder();
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 30, alignItems: 'start' }}>
          <form onSubmit={handleSubmit}>
            {/* Shipping Address */}
            <div className="card" style={{ padding: 24, marginBottom: 20 }}>
              <h3 style={{ marginBottom: 20 }}>📦 Shipping Address</h3>
              <div className="form-group">
                <label>Street Address</label>
                <input name="street" value={address.street} onChange={handleChange} placeholder="123, Main Street" required />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label>City</label>
                  <input name="city" value={address.city} onChange={handleChange} placeholder="Indore" required />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input name="state" value={address.state} onChange={handleChange} placeholder="Madhya Pradesh" required />
                </div>
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input name="pincode" value={address.pincode} onChange={handleChange} placeholder="452001" required />
              </div>
            </div>

            {/* Payment Method */}
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ marginBottom: 20 }}>💳 Payment Method</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { value: 'COD', label: '💵 Cash on Delivery', desc: 'Pay when your order arrives' },
                  { value: 'Razorpay', label: '💳 Razorpay', desc: 'UPI, Cards, Net Banking, Wallets' },
                ].map(({ value, label, desc }) => (
                  <label key={value} style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: 16,
                    border: `2px solid ${paymentMethod === value ? '#FF6B35' : '#eee'}`,
                    borderRadius: 8, cursor: 'pointer', background: paymentMethod === value ? '#fff5f0' : 'white'
                  }}>
                    <input type="radio" value={value} checked={paymentMethod === value} onChange={() => setPaymentMethod(value)} />
                    <div>
                      <p style={{ fontWeight: 600 }}>{label}</p>
                      <p style={{ fontSize: 13, color: '#666' }}>{desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </form>

          {/* Order Summary */}
          <div>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ marginBottom: 20 }}>Order Summary</h3>

              {cartItems.map((item) => (
                <div key={item._id} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <img src={item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 6 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</p>
                    <p style={{ fontSize: 13, color: '#666' }}>x{item.qty}</p>
                  </div>
                  <p style={{ fontWeight: 600, fontSize: 14 }}>₹{(item.price * item.qty).toLocaleString()}</p>
                </div>
              ))}

              <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #eee' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#666' }}>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#666' }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? '#2e7d32' : '#333' }}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid #eee' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 20 }}>
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                className="btn btn-primary btn-block"
                style={{ marginTop: 24, padding: 14, fontSize: 16 }}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Placing Order...' : `Place Order - ₹${total.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
