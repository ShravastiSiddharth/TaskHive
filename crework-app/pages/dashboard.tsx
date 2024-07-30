import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import NewTaskForm from '../components/NewTaskForm';
import TaskBoard from '../components/TaskBoard';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return null; // or a loading spinner
    }

    return (
        <div className={styles.dashboard}>
            <Sidebar />
            <div className={styles.content}>
                <h1>Task Board</h1>
                <NewTaskForm onTaskAdded={() => {}} />
                <TaskBoard tasks={[]} />
            </div>
        </div>
    );
};

export default Dashboard;
