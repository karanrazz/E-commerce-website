import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const STATUS_COLORS = {
  Pending: 'badge-warning',
  Processing: 'badge-warning',
  Shipped: 'badge-success',
  Delivered: 'badge-success',
  Cancelled: 'badge-danger',
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/orders/myorders')
      .then(({ data }) => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" style={{ minHeight: '60vh' }} />;

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 800 }}>
        <h1 className="page-title">My Orders</h1>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <p style={{ fontSize: 50, marginBottom: 16 }}>📦</p>
            <h2 style={{ marginBottom: 10 }}>No orders yet</h2>
            <Link to="/products" className="btn btn-primary">Start Shopping</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {orders.map((order) => (
              <div key={order._id} className="card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <p style={{ fontSize: 13, color: '#666' }}>Order ID</p>
                    <p style={{ fontWeight: 600, fontSize: 15 }}>#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <span className={`badge ${STATUS_COLORS[order.status]}`}>{order.status}</span>
                </div>

                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  {order.orderItems.slice(0, 3).map((item) => (
                    <img key={item._id} src={item.image} alt={item.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 6 }} />
                  ))}
                  {order.orderItems.length > 3 && (
                    <div style={{ width: 50, height: 50, borderRadius: 6, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>
                      +{order.orderItems.length - 3}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 14, color: '#666' }}>
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {' · '}{order.orderItems.length} item{order.orderItems.length > 1 ? 's' : ''}
                    {' · '}₹{order.totalPrice.toLocaleString()}
                  </div>
                  <Link to={`/orders/${order._id}`} className="btn btn-outline" style={{ padding: '6px 16px', fontSize: 13 }}>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
