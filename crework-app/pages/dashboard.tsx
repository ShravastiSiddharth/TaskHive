import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import NewTaskForm from '../components/NewTaskForm';
import TaskBoard from '../components/TaskBoard';
import styles from '../styles/Dashboard.module.css';
import axios from 'axios';

const Dashboard = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [tasks, setTasks] = useState([]); 

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            fetchTasks();
        }
    }, [user, router]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTasks(response.data.tasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleTaskMoved = async (task, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/tasks/${task._id}`, { status: newStatus }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            fetchTasks();
        } catch (error) {
            console.error('Error moving task:', error);
        }
    };
    if (!user) {
        return null;
    }
    const handleTaskUpdated = () => {
        fetchTasks();
    };
    return (
        <div className={styles.dashboard}>
            <div>
            <Sidebar />
            </div>
            <div className={styles.content}>
                <h1>Welcome, {user.name}!</h1>
                <TaskBoard tasks={tasks} onTaskMoved={handleTaskMoved} onTaskUpdated={handleTaskUpdated}  fetchTasks={fetchTasks} />
            </div>
        </div>
    );
};

export default Dashboard;
