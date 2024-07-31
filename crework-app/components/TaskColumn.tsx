import React from 'react';
import TaskCard from './TaskCard';
import styles from '../styles/TaskColumn.module.css';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList} from '@fortawesome/free-solid-svg-icons';

interface Task {
    _id: string;
    title: string;
    description?: string;
    status: string;
    priority?: string;
    deadline?: string;
}

interface TaskColumnProps {
    title: string;
    status: string;
    tasks: Task[];
    onTaskMoved: (task: Task, newStatus: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, status, tasks, onTaskMoved }) => {
    const { user, logout } = useAuth();
    const titleClass = title ? styles[title.toLowerCase().replace(/\s+/g, '')] : '';

    return (
        <div className={`${styles.taskColumn} ${titleClass}`}>
            <div className={styles.bardiv}>
            <h3>{title}</h3>
            <FontAwesomeIcon icon={faList} /></div>
            {tasks && tasks.length > 0 ? (
                
                tasks.map(task => (
                    <TaskCard key={task._id} task={task} onTaskMoved={onTaskMoved} />
                ))
            ) : (
                <p>No tasks yet</p>
            )}
        </div>
    );
};

export default TaskColumn;
