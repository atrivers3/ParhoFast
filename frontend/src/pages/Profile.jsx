import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { UserCircle, Calendar, Mail } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ created: 0, enrolled: 0 });

  useEffect(() => {
    if (!user) return;
    
    // Fetch profile
    api.get('/auth/me').then(res => setProfile(res.data)).catch(console.error);

    // Fetch stats
    if (user.role === 'teacher') {
      api.get('/courses/my-courses').then(res => setStats(s => ({ ...s, created: res.data.length })));
    }
    api.get('/enrollments/my-courses').then(res => setStats(s => ({ ...s, enrolled: res.data.length })));
  }, [user]);

  if (!profile) return <div className="p-8">Loading profile...</div>;

  const createdDate = new Date(profile.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto px-gutter py-margin-desktop">
      <h1 className="text-display-lg font-bold mb-8">Your Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="col-span-1 md:col-span-2 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-8 flex items-start gap-6">
          <div className="bg-primary/10 p-4 rounded-full text-primary">
            <UserCircle size={64} />
          </div>
          <div>
            <h2 className="text-headline-lg font-semibold">{profile.name}</h2>
            <p className="text-body-lg text-primary mb-4">@{profile.username}</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-on-surface-variant">
                <Mail size={18} />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <Calendar size={18} />
                <span>Joined {createdDate}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col items-center justify-center text-center">
            <h3 className="text-display-lg font-bold text-primary">{stats.enrolled}</h3>
            <p className="text-label-md uppercase text-on-surface-variant font-medium tracking-wide mt-2">Courses Enrolled</p>
          </div>
          
          {user.role === 'teacher' && (
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col items-center justify-center text-center">
              <h3 className="text-display-lg font-bold text-secondary">{stats.created}</h3>
              <p className="text-label-md uppercase text-on-surface-variant font-medium tracking-wide mt-2">Courses Created</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
