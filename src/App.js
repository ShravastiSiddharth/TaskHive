// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Authentication/AuthContext';
import ProtectedRoute from './Authentication/ProtectedRoute';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
