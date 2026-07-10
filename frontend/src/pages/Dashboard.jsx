import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { Play, Plus } from 'lucide-react';

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
      // Refresh enrolled
      const res = await api.get('/enrollments/my-courses');
      setEnrolledCourses(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Error enrolling');
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
          <div key={course.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <h3 className="text-headline-md mb-2">{course.title}</h3>
            <p className="text-body-sm text-on-surface-variant flex-1 mb-6 line-clamp-3">{course.description}</p>
            
            <div className="flex items-center justify-between mt-auto">
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
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-label-md uppercase font-medium">
                  Enrolled
                </span>
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
