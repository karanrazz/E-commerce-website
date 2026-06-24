import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const STATUS_STEPS = ['Pending', 'Processing', 'Shipped', 'Delivered'];

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/orders/${id}`)
      .then(({ data }) => setOrder(data))
      .catch(() => navigate('/orders'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="spinner" style={{ minHeight: '60vh' }} />;
  if (!order) return null;

  const stepIndex = STATUS_STEPS.indexOf(order.status);

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 800 }}>
        <button onClick={() => navigate('/orders')} style={{ marginBottom: 20, background: 'none', border: 'none', cursor: 'pointer', color: '#FF6B35', fontSize: 15, fontWeight: 600 }}>
          ← Back to Orders
        </button>

        <h1 className="page-title">Order #{order._id.slice(-8).toUpperCase()}</h1>

        {/* Progress tracker */}
        {order.status !== 'Cancelled' && (
          <div className="card" style={{ padding: 30, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 20, left: '12.5%', right: '12.5%', height: 3, background: '#eee', zIndex: 0 }}>
                <div style={{ height: '100%', background: '#FF6B35', width: `${(stepIndex / (STATUS_STEPS.length - 1)) * 100}%`, transition: 'width 0.5s' }} />
              </div>
              {STATUS_STEPS.map((step, i) => (
                <div key={step} style={{ textAlign: 'center', zIndex: 1, flex: 1 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%', margin: '0 auto 8px',
                    background: i <= stepIndex ? '#FF6B35' : '#eee',
                    color: i <= stepIndex ? 'white' : '#999',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: 16
                  }}>
                    {i < stepIndex ? '✓' : i + 1}
                  </div>
                  <p style={{ fontSize: 12, color: i <= stepIndex ? '#FF6B35' : '#999', fontWeight: i === stepIndex ? 700 : 400 }}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          {/* Shipping */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ marginBottom: 12 }}>📦 Shipping Address</h3>
            <p>{order.shippingAddress.street}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
            <p>{order.shippingAddress.pincode}</p>
          </div>

          {/* Payment */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ marginBottom: 12 }}>💳 Payment</h3>
            <p style={{ marginBottom: 8 }}>Method: <strong>{order.paymentMethod}</strong></p>
            <span className={`badge ${order.isPaid ? 'badge-success' : 'badge-warning'}`}>
              {order.isPaid ? '✓ Paid' : 'Not Paid'}
            </span>
          </div>
        </div>

        {/* Items */}
        <div className="card" style={{ padding: 20, marginBottom: 20 }}>
          <h3 style={{ marginBottom: 16 }}>Order Items</h3>
          {order.orderItems.map((item) => (
            <div key={item._id} style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #eee' }}>
              <img src={item.image} alt={item.name} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600 }}>{item.name}</p>
                <p style={{ color: '#666', fontSize: 13 }}>₹{item.price.toLocaleString()} × {item.quantity}</p>
              </div>
              <p style={{ fontWeight: 700 }}>₹{(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}

          <div style={{ marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: '#666' }}>Subtotal</span><span>₹{order.itemsPrice.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: '#666' }}>Shipping</span>
              <span style={{ color: order.shippingPrice === 0 ? '#2e7d32' : '#333' }}>
                {order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice}`}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 20, borderTop: '1px solid #eee', paddingTop: 10, marginTop: 8 }}>
              <span>Total</span><span>₹{order.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
