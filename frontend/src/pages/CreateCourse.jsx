import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/courses/create', { title, description, content });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error creating course');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-gutter py-margin-desktop">
      <h1 className="text-display-lg font-bold mb-8">Create New Course</h1>
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
        {error && <div className="mb-4 text-error bg-error/10 p-3 rounded-lg">{error}</div>}
        <div className="space-y-6">
          <div>
            <label className="block text-label-md uppercase text-on-surface-variant mb-2">Course Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required
                   className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-label-md uppercase text-on-surface-variant mb-2">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={4}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:border-primary outline-none"></textarea>
          </div>
          <div>
            <label className="block text-label-md uppercase text-on-surface-variant mb-2">Content (Optional)</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={6}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 focus:border-primary outline-none"></textarea>
          </div>
          <button type="submit" className="bg-primary text-on-primary px-6 py-2 rounded-lg font-medium hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)] transition-all">
            Publish Course
          </button>
        </div>
      </form>
    </div>
  );
};
