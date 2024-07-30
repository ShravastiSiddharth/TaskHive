// components/TaskBoard.tsx
import React from 'react';
import TaskColumn from './TaskColumn';
import styles from '../styles/TaskBoard.module.css';

interface Task {
    _id: string;
    title: string;
    description?: string;
    status: string;
    priority?: string;
    deadline?: string;
}

interface TaskBoardProps {
    tasks: Task[];
    onTaskMoved: (task: Task, newStatus: string) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onTaskMoved }) => {
    const columns = [
        { title: 'To-Do', status: 'todo' },
        { title: 'In Progress', status: 'in-progress' },
        { title: 'Under Review', status: 'under-review' },
        { title: 'Finished', status: 'finished' },
    ];

    return (
        <div className={styles.taskBoard}>
            {columns.map(column => (
                <TaskColumn
                    key={column.status}
                    title={column.title}
                    status={column.status}
                    tasks={tasks.filter(task => task.status === column.status)}
                    onTaskMoved={onTaskMoved}
                />
            ))}
        </div>
    );
};

export default TaskBoard;
