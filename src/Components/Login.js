import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const validateForm = () => {
        const errors = {};
        if (!email) errors.email = 'Email is required';
        if (!password) errors.password = 'Password is required';
        return errors;
    };

    const onSubmit = async e => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            login(response.data.token);
            setSuccess('User logged in successfully!');
            setErrors({});
            navigate('/dashboard');
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'An error occurred. Please try again.';
            setErrors({ server: errorMsg });
            setSuccess('');
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            {success && <div className="success-message">{success}</div>}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>
                {errors.server && <div className="error">{errors.server}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
