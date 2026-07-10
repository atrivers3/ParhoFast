import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, UserCircle, LayoutDashboard } from 'lucide-react';

export const Sidebar = () => {
  const { user, logout, viewMode, toggleViewMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  // Don't show sidebar on login/register
  if (['/login', '/register'].includes(location.pathname)) return null;

  return (
    <aside className="sticky top-0 h-screen w-64 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 flex flex-col p-6">
      <Link to="/" className="flex items-center gap-2 group mb-12">
        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
          <BookOpen size={24} />
        </div>
        <span className="text-headline-md text-on-surface font-semibold tracking-tight">
          Parho<span className="text-primary">Fast</span>
        </span>
      </Link>

      <div className="flex-1 flex flex-col gap-2">
        <Link 
          to="/" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${isActive('/') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-slate-800 hover:text-on-surface'}`}
        >
          <LayoutDashboard size={20} />
          {viewMode === 'instructor' ? 'Dashboard' : 'Explore Courses'}
        </Link>
        <Link 
          to="/profile" 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${isActive('/profile') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-slate-800 hover:text-on-surface'}`}
        >
          <UserCircle size={20} />
          Profile
        </Link>
      </div>

      <div className="mt-auto space-y-4">
        {user?.role === 'teacher' && (
          <button
            onClick={toggleViewMode}
            className="w-full px-4 py-3 text-label-md uppercase font-medium rounded-lg bg-surface-variant text-on-surface-variant hover:bg-slate-700 transition-colors border border-outline-variant"
          >
            Switch to {viewMode === 'instructor' ? 'Student' : 'Instructor'}
          </button>
        )}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error/10 rounded-lg transition-colors font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};
