import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      return toast.error('Passwords do not match!');
    }
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created! Welcome to ShopEasy!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed. Is the backend server running?';
      toast.error(msg);
    }
  };

  return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: 420, padding: 40 }}>
        <h1 style={{ textAlign: 'center', marginBottom: 8, color: '#2C3E50' }}>Create Account</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>Join ShopEasy today</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Min 6 characters" required minLength={6} />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="Repeat password" required />
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ padding: 14, fontSize: 16, marginTop: 8 }} disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, color: '#666', fontSize: 14 }}>
          Already have an account? <Link to="/login" style={{ color: '#FF6B35', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
