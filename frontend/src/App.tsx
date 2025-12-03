import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import Home from './pages/Home'; 
import Navbar from './components/Navbar';
import './App.css';
import Footer from './components/Footer';

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          
          <Route path="/" element={<Home />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/admin" 
            element={isAuthenticated && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/instructor" 
            element={isAuthenticated && userRole === 'instructor' ? <InstructorDashboard /> : <Navigate to="/login" />} 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;