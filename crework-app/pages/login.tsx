import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Signup.module.css';
import { toast } from 'react-toastify';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const { login } = useAuth();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const errors: any = {};
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        return errors;
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {

            const response = await axios.post('http://localhost:5000/api/auth/login', formData);

            login(response.data.token);
            toast.success('Login successful!');
        } catch (error: any) {
            setErrors({ server: error.response?.data?.msg || 'An error occurred. Please try again.' });
        }
    };

    return (
        <div className={styles.signupCont}>
            <div className={styles.signupForm}>
                <h1>Welcome to <span >WorkFlow!</span></h1>
                <form onSubmit={onSubmit}>
                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={onChange} />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={onChange} />
                        {errors.password && <div className="error">{errors.password}</div>}
                    </div>
                    {errors.server && <div className="error">{errors.server}</div>}
                    <button className={styles.mybtn} type="submit">Login</button>
                </form>
                <br/>
               
               <div>Don't have an account? <a href='/signup'>SignUp</a></div>
            </div>
        </div>
    );
};

export default Login;
