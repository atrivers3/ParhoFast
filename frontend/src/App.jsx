import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CreateCourse } from './pages/CreateCourse';
import { CourseDetails } from './pages/CourseDetails';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-surface flex flex-col font-sans">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/courses/create" element={<CreateCourse />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App;
