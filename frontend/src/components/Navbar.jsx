import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, LogOut, UserCircle } from 'lucide-react';

export const Navbar = () => {
  const { user, logout, viewMode, toggleViewMode } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-slate-900/80 border-b border-slate-800 px-gutter py-unit">
      <div className="max-w-container-max mx-auto flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            <BookOpen size={24} />
          </div>
          <span className="text-headline-md text-on-surface font-semibold tracking-tight">
            Parho<span className="text-primary">Fast</span>
          </span>
        </Link>

        <div className="flex items-center gap-stack-md">
          {user ? (
            <>
              {user.role === 'teacher' && (
                <button
                  onClick={toggleViewMode}
                  className="px-4 py-2 text-label-md uppercase font-medium rounded-full bg-surface-variant text-on-surface-variant hover:bg-slate-700 transition-colors border border-outline-variant"
                >
                  {viewMode === 'instructor' ? 'Switch to Student' : 'Switch to Instructor'}
                </button>
              )}
              <div className="flex items-center gap-2 px-2">
                <UserCircle size={24} className="text-on-surface-variant" />
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="text-body-sm font-medium hover:text-primary transition-colors py-2 px-4">
                Login
              </Link>
              <Link to="/register" className="text-body-sm font-medium bg-primary text-on-primary rounded-lg py-2 px-4 hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)] transition-all">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
