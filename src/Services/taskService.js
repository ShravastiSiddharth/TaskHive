// client/src/services/taskService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks/';

const getTasks = () => {
    return axios.get(API_URL);
};

const createTask = (task) => {
    return axios.post(API_URL, task);
};

const updateTask = (taskId, task) => {
    return axios.put(`${API_URL}${taskId}`, task);
};

const deleteTask = (taskId) => {
    return axios.delete(`${API_URL}${taskId}`);
};

const taskService = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};

export default taskService;
