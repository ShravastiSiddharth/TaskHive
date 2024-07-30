// components/TaskColumn.tsx
import React from 'react';
import TaskCard from './TaskCard';
import styles from '../styles/TaskColumn.module.css';

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
    return (
        <div className={styles.taskColumn}>
            <h3>{title}</h3>
            {tasks.map(task => (
                <TaskCard key={task._id} task={task} onTaskMoved={onTaskMoved} />
            ))}
        </div>
    );
};

export default TaskColumn;
