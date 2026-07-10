import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Play, Plus, Trash2 } from 'lucide-react';

export const Dashboard = () => {
  const { user, viewMode } = useAuth();
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    if (!user) return;
    
    if (viewMode === 'instructor') {
      api.get('/courses/my-courses').then(res => setCourses(res.data));
    } else {
      api.get('/courses').then(res => setCourses(res.data));
      api.get('/enrollments/my-courses').then(res => setEnrolledCourses(res.data));
    }
  }, [viewMode, user]);

  const handleEnroll = async (courseId) => {
    try {
      await api.post('/enrollments/enroll', { courseId });
      const res = await api.get('/enrollments/my-courses');
      setEnrolledCourses(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Error enrolling');
    }
  };

  const handleUnenroll = async (courseId) => {
    try {
      await api.delete(`/enrollments/unenroll/${courseId}`);
      const res = await api.get('/enrollments/my-courses');
      setEnrolledCourses(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Error unenrolling');
    }
  };

  const isEnrolled = (courseId) => enrolledCourses.some(c => c.id === courseId);

  if (!user) {
    return <div className="p-8 text-center"><h1 className="text-headline-lg">Please login to view dashboard</h1></div>;
  }

  return (
    <div className="max-w-container-max mx-auto px-gutter py-margin-desktop">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-display-lg font-bold">
          {viewMode === 'instructor' ? 'Instructor Dashboard' : 'Student Dashboard'}
        </h1>
        {viewMode === 'instructor' && (
          <Link to="/courses/create" className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg hover:shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)] transition-all font-medium">
            <Plus size={20} /> Create Course
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="group bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 flex flex-col hover:-translate-y-1 hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.2)] transition-all duration-300">
            <h3 className="text-headline-md mb-1 text-on-surface">{course.title}</h3>
            
            {viewMode === 'student' && course.teacher_name && (
              <p className="text-label-md text-primary mb-3">By Instructor: {course.teacher_name}</p>
            )}

            <p className="text-body-sm text-on-surface-variant flex-1 mb-6 line-clamp-3 leading-relaxed">{course.description}</p>
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
              <Link to={`/courses/${course.id}`} className="text-primary font-medium hover:underline flex items-center gap-2">
                <Play size={16} /> View Details
              </Link>
              
              {viewMode === 'student' && !isEnrolled(course.id) && (
                <button 
                  onClick={() => handleEnroll(course.id)}
                  className="bg-secondary text-on-secondary px-4 py-1.5 rounded-full text-label-md uppercase font-medium hover:bg-secondary-container transition-colors"
                >
                  Enroll
                </button>
              )}
              {viewMode === 'student' && isEnrolled(course.id) && (
                <button 
                  onClick={() => handleUnenroll(course.id)}
                  className="flex items-center gap-1 bg-surface-variant text-on-surface-variant px-4 py-1.5 rounded-full text-label-md uppercase font-medium hover:bg-error/10 hover:text-error hover:border-error/20 border border-transparent transition-all"
                >
                  <Trash2 size={14} /> Unenroll
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {courses.length === 0 && (
        <div className="text-center py-12 text-on-surface-variant">
          No courses found.
        </div>
      )}
    </div>
  );
};
