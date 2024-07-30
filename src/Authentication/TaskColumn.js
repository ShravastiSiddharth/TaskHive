// client/src/components/TaskColumn.js
import React from 'react';
import TaskCard from './TaskCard';
import { useAuth } from './AuthContext';

const TaskColumn = ({ status, tasks, updateTaskStatus }) => {
    const { authAxios } = useAuth();

    const handleDrop = async (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        updateTaskStatus(taskId, status);

        try {
            await authAxios.put(`/api/tasks/${taskId}`, { status });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div
            className="task-column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <h2>{status}</h2>
            {tasks.map(task => (
                <TaskCard key={task._id} task={task} />
            ))}
        </div>
    );
};

export default TaskColumn;
