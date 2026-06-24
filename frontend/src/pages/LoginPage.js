import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Login failed. Is the backend server running?';
      toast.error(msg);
    }
  };

  return (
    <div className="page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: 420, padding: 40 }}>
        <h1 style={{ textAlign: 'center', marginBottom: 8, color: '#2C3E50' }}>Welcome Back</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>Sign in to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>

          <button type="submit" className="btn btn-primary btn-block" style={{ padding: 14, fontSize: 16, marginTop: 8 }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, color: '#666', fontSize: 14 }}>
          Don't have an account? <Link to="/register" style={{ color: '#FF6B35', fontWeight: 600 }}>Sign Up</Link>
        </p>

        <div style={{ marginTop: 20, padding: 14, background: '#f8f8f8', borderRadius: 8, fontSize: 13, color: '#666' }}>
          <strong>Demo accounts:</strong><br />
          Admin: admin@shopeasy.com / admin123<br />
          User: john@example.com / john123
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
