// client/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import NewTaskForm from '../Authentication/NewTaskForm';
import TaskBoard from '../Authentication/TaskBoard';
import axios from 'axios';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    return (
        <div>
            <h1>Task Board</h1>
            <NewTaskForm onTaskAdded={handleTaskAdded} />
            <TaskBoard tasks={tasks} />
        </div>
    );
};

export default Dashboard;
