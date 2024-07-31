// components/TaskCard.tsx
import React from 'react';
import styles from '../styles/TaskCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart } from '@fortawesome/free-solid-svg-icons';


interface Task {
    _id: string;
    title: string;
    description?: string;
    status: string;
    priority?: string;
    deadline?: string;
}

interface TaskCardProps {
    task: Task;
    onTaskMoved: (task: Task, newStatus: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskMoved }) => {
    const priorityClass = task.priority ? styles[task.priority.toLowerCase()] : '';
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Format as MM/DD/YYYY or DD/MM/YYYY based on locale
    };
    return (
        <div className={styles.taskCard}>
            <div className={styles.cardHeader}>
                <h3 className={styles.title}>{task.title}</h3>
                {task.priority && (
                    <span className={`${styles.priority} ${priorityClass}`}>
                        {task.priority}
                    </span>
                )}
            </div>
            <p className={styles.description}>{task.description}</p>
            {task.deadline && (
                <div className={styles.deadline}>
                    <span className={styles.deadlineLabel}><FontAwesomeIcon icon={faHourglassStart} /></span> {formatDate(task.deadline)}
                </div>
            )}
        </div>
    );
};

export default TaskCard;
