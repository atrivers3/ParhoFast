import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
  const [formData, setFormData] = useState({ username: '', name: '', email: '', password: '', role: 'student' });
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.username, formData.name, formData.email, formData.password, formData.role);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 w-full max-w-md">
        <h2 className="text-headline-lg mb-6 text-center text-on-surface font-semibold">Create Account</h2>
        {error && <div className="mb-4 text-error bg-error/10 p-3 rounded-lg text-body-sm">{error}</div>}
        <div className="space-y-4">
          <div>
            <label className="block text-label-md uppercase text-on-surface-variant mb-2">Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required
                   className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:border-primary outline-none transition-all" />
          </div>
          <div>
            <label className="block text-label-md uppercase text-on-surface-variant mb-2">Username</label>
            <input type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required
                   className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:border-primary outline-none transition-all" />
          </div>
          <div>
            <label className="block text-label-md uppercase text-on-surface-variant mb-2">Email</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required
                   className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:border-primary outline-none transition-all" />
          </div>
          <div>
            <label className="block text-label-md uppercase text-on-surface-variant mb-2">Password</label>
            <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required
                   className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:border-primary outline-none transition-all" />
          </div>
          <div>
            <label className="block text-label-md uppercase text-on-surface-variant mb-2">Role</label>
            <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-on-surface outline-none">
              <option value="student">Student</option>
              <option value="teacher">Instructor</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-primary text-on-primary py-2 rounded-lg font-medium mt-4 hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)] transition-all">
            Sign Up
          </button>
        </div>
        <p className="mt-6 text-center text-body-sm text-on-surface-variant">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Log in</Link>
        </p>
      </form>
    </div>
  );
};
