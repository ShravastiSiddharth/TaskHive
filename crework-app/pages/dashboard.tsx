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
    const [tasks, setTasks] = useState<Task[]>([]); // Initialize as an empty array

    useEffect(() => {
        if (!user) {
            router.push('/');
        } else {
            // Fetch tasks for the logged-in user
            const fetchTasks = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/tasks');
                    setTasks(response.data.tasks); // Ensure tasks data is set correctly
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                }
            };
            fetchTasks();
        }
    }, [user, router]);

    const handleTaskMoved = async (task: Task, newStatus: string) => {
        try {
            await axios.put(`http://localhost:5000/api/tasks/${task._id}`, { status: newStatus });
            setTasks(prevTasks =>
                prevTasks.map(t => (t._id === task._id ? { ...t, status: newStatus } : t))
            );
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    if (!user) {
        return null; // or a loading spinner
    }

    return (
        <div className={styles.dashboard}>
            <div>
            <Sidebar />
            </div>
            <div className={styles.content}>
                <h1>Task Board</h1>
                <TaskBoard tasks={tasks} onTaskMoved={handleTaskMoved} />
            </div>
        </div>
    );
};

export default Dashboard;
