import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plus } from 'lucide-react';

export const CourseDetails = () => {
  const { id } = useParams();
  const { user, viewMode } = useAuth();
  const [course, setCourse] = useState(null);
  
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  
  const loadCourse = async () => {
    try {
      const res = await api.get(`/courses/${id}/details`);
      setCourse(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCourse();
  }, [id]);

  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      await api.post('/course-content/video', { courseId: id, title: videoTitle, video_url: videoUrl });
      setVideoTitle('');
      setVideoUrl('');
      loadCourse();
    } catch(err) {
      alert('Error adding video');
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    // Handles standard watch links, shortened share links, and raw embed links
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}` 
      : url;
  };

  if (!course) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-container-max mx-auto px-gutter py-margin-desktop">
      <h1 className="text-display-lg font-bold mb-4">{course.title}</h1>
      <p className="text-body-lg text-on-surface-variant mb-8">{course.description}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-headline-lg font-semibold border-b border-slate-800 pb-2">Course Videos</h2>
          {course.videos?.length === 0 ? (
            <p className="text-on-surface-variant">No videos added yet.</p>
          ) : (
            course.videos?.map(vid => (
              <div key={vid.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="aspect-video bg-black">
                  <iframe 
                    src={getEmbedUrl(vid.video_url)} 
                    title={vid.title}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
                <div className="p-4 border-t border-slate-800">
                  <h3 className="text-headline-md">{vid.title}</h3>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {viewMode === 'instructor' && course.teacher_id === user?.id && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-headline-md mb-4 flex items-center gap-2"><Plus size={20} /> Add Video</h3>
              <form onSubmit={handleAddVideo} className="space-y-4">
                <div>
                  <label className="block text-label-md uppercase text-on-surface-variant mb-2">Video Title</label>
                  <input type="text" value={videoTitle} onChange={e => setVideoTitle(e.target.value)} required
                         className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-label-md uppercase text-on-surface-variant mb-2">Embed URL</label>
                  <input type="url" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} required
                         placeholder="https://youtube.com/embed/..."
                         className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <button type="submit" className="w-full bg-primary text-on-primary py-2 rounded-lg font-medium hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)] transition-all">
                  Add Video
                </button>
              </form>
            </div>
          )}

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-headline-md mb-4">Course Notes</h3>
            {course.notes?.length === 0 ? (
              <p className="text-on-surface-variant text-body-sm">No notes available.</p>
            ) : (
              <ul className="space-y-3">
                {course.notes?.map(note => (
                  <li key={note.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                    <h4 className="font-medium text-primary">{note.title}</h4>
                    <p className="text-body-sm text-on-surface-variant mt-1">{note.content}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
