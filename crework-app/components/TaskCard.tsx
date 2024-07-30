// components/TaskCard.tsx
import React from 'react';
import styles from '../styles/TaskCard.module.css';

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
    return (
        <div className={styles.taskCard}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
        </div>
    );
};

export default TaskCard;
