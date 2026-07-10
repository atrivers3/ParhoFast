import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md">
        <h2 className="text-headline-lg mb-6 text-center text-on-surface font-semibold">Welcome Back</h2>
        {error && <div className="mb-4 text-error bg-error/10 p-3 rounded-lg text-body-sm">{error}</div>}
        <div className="space-y-4">
          <div>
            <label className="block text-label-md uppercase text-on-surface-variant mb-2">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                   className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-on-surface focus:border-primary focus:shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)] outline-none transition-all" />
          </div>
          <div>
            <label className="block text-label-md uppercase text-on-surface-variant mb-2">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                   className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-on-surface focus:border-primary focus:shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)] outline-none transition-all" />
          </div>
          <button type="submit" className="w-full bg-primary text-on-primary py-2 rounded-lg font-medium mt-4 hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)] transition-all">
            Login
          </button>
        </div>
        <p className="mt-6 text-center text-body-sm text-on-surface-variant">
          Don't have an account? <Link to="/register" className="text-primary hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  );
};
