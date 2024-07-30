// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import { AuthProvider } from './Authentication/AuthContext';
import ProtectedRoute from './Authentication/ProtectedRoute';
import './App.css';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
                    {/* Add more protected routes here */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
