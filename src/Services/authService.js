// client/src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const register = (email, password) => {
    return axios.post(API_URL + 'register', { email, password });
};

const login = (email, password) => {
    return axios.post(API_URL + 'login', { email, password });
};

const authService = {
    register,
    login,
};

export default authService;
