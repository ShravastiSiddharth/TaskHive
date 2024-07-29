import logo from './logo.svg';
import './App.css';
import React from 'react'
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import { AuthProvider } from './Components/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import { useNavigate, Route, Routes, redirectDocument, BrowserRouter } from 'react-router-dom';

function App() {
  //const navigate = useNavigate();
  return (
    <>
    <AuthProvider>
   <BrowserRouter basename="/">
   <Routes>
            
                
                    <Route exact path="/" element={<SignUp/>} />
                    <Route path="/login" element={<Login/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
            
        </Routes>
        </BrowserRouter>
        </AuthProvider>
        </>
  );
}

export default App;
