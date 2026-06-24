import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const EMPTY_FORM = { name: '', description: '', price: '', category: '', image: '', stock: '' };
const CATEGORIES = ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Beauty'];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    axios.get('/api/products?limit=100')
      .then(({ data }) => setProducts(data.products))
      .finally(() => setLoading(false));
  };

  useEffect(fetchProducts, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/api/products/${editId}`, form);
        toast.success('Product updated!');
      } else {
        await axios.post('/api/products', form);
        toast.success('Product created!');
      }
      setForm(EMPTY_FORM);
      setEditId(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditId(product._id);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 className="page-title" style={{ margin: 0 }}>Manage Products</h1>
          <button className="btn btn-primary" onClick={() => { setForm(EMPTY_FORM); setEditId(null); setShowForm(!showForm); }}>
            {showForm ? '✕ Cancel' : '+ Add Product'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="card" style={{ padding: 24, marginBottom: 24 }}>
            <h3 style={{ marginBottom: 20 }}>{editId ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label>Product Name</label>
                <input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange} required>
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Price (₹)</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input name="stock" type="number" value={form.stock} onChange={handleChange} required />
              </div>
              <div className="form-group" style={{ gridColumn: '1/-1' }}>
                <label>Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." required />
              </div>
              <div className="form-group" style={{ gridColumn: '1/-1' }}>
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} required />
              </div>
              <div style={{ gridColumn: '1/-1', display: 'flex', gap: 12 }}>
                <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Create'} Product</button>
                <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="card" style={{ overflow: 'hidden' }}>
          {loading ? <div className="spinner" /> : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead style={{ background: '#f8f8f8' }}>
                <tr>
                  {['Image', 'Name', 'Category', 'Price', 'Stock', 'Actions'].map((h) => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600, color: '#555' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} style={{ borderTop: '1px solid #eee' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <img src={p.image} alt={p.name} style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 6 }} />
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{p.name}</td>
                    <td style={{ padding: '12px 16px', color: '#666' }}>{p.category}</td>
                    <td style={{ padding: '12px 16px' }}>₹{Number(p.price).toLocaleString()}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className={`badge ${p.stock > 0 ? 'badge-success' : 'badge-danger'}`}>{p.stock}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => handleEdit(p)}>Edit</button>
                        <button className="btn btn-danger" style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => handleDelete(p._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
