// pages/add-task.tsx
import React from 'react';
import NewTaskForm from '../components/NewTaskForm';
import Layout from '../components/Layout';
import styles from '../styles/AddTask.module.css';

const AddTask: React.FC = () => {
    const handleTaskAdded = (task: any) => {
        console.log('New task added:', task);
    };

    return (
        <Layout>
            <div className={styles.addTask}>
                <NewTaskForm onTaskAdded={handleTaskAdded} />
            </div>
        </Layout>
    );
};

export default AddTask;
