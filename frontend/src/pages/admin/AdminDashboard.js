import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('/api/orders'),
      axios.get('/api/products?limit=100'),
    ])
      .then(([ordersRes, productsRes]) => {
        setOrders(ordersRes.data);
        setProducts(productsRes.data.products);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" style={{ minHeight: '60vh' }} />;

  const totalRevenue = orders.filter((o) => o.isPaid).reduce((acc, o) => acc + o.totalPrice, 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;

  const stats = [
    { label: 'Total Orders', value: orders.length, icon: '📦', color: '#3498db' },
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: '💰', color: '#2ecc71' },
    { label: 'Total Products', value: products.length, icon: '🛍️', color: '#9b59b6' },
    { label: 'Pending Orders', value: pendingOrders, icon: '⏳', color: '#e74c3c' },
  ];

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Admin Dashboard</h1>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 30 }}>
          {stats.map(({ label, value, icon, color }) => (
            <div key={label} className="card" style={{ padding: 24, borderLeft: `4px solid ${color}` }}>
              <p style={{ fontSize: 30 }}>{icon}</p>
              <p style={{ fontSize: 26, fontWeight: 800, color, marginTop: 8 }}>{value}</p>
              <p style={{ color: '#666', fontSize: 14 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 30 }}>
          <Link to="/admin/products" className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}>
            <span style={{ fontSize: 40 }}>🛍️</span>
            <div>
              <h3>Manage Products</h3>
              <p style={{ color: '#666', fontSize: 14 }}>Add, edit, or delete products</p>
            </div>
          </Link>
          <Link to="/admin/orders" className="card" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}>
            <span style={{ fontSize: 40 }}>📦</span>
            <div>
              <h3>Manage Orders</h3>
              <p style={{ color: '#666', fontSize: 14 }}>View and update order status</p>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginBottom: 16 }}>Recent Orders</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee' }}>
                {['Order ID', 'Customer', 'Total', 'Status', 'Date'].map((h) => (
                  <th key={h} style={{ padding: '10px 8px', textAlign: 'left', color: '#666' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 600 }}>#{order._id.slice(-6).toUpperCase()}</td>
                  <td style={{ padding: '12px 8px' }}>{order.user?.name}</td>
                  <td style={{ padding: '12px 8px' }}>₹{order.totalPrice.toLocaleString()}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span className={`badge ${order.status === 'Delivered' ? 'badge-success' : order.status === 'Cancelled' ? 'badge-danger' : 'badge-warning'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', color: '#666' }}>
                    {new Date(order.createdAt).toLocaleDateString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
