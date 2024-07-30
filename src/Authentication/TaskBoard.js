// client/src/components/TaskBoard.js
import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import TaskColumn from './TaskColumn';

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const { authAxios } = useAuth();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await authAxios.get('/api/tasks');
                setTasks(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTasks();
    }, [authAxios]);

    const updateTaskStatus = (taskId, status) => {
        setTasks(tasks.map(task => task._id === taskId ? { ...task, status } : task));
    };

    return (
        <div className="task-board">
            {['To-Do', 'In Progress', 'Under Review', 'Completed'].map(status => (
                <TaskColumn
                    key={status}
                    status={status}
                    tasks={tasks.filter(task => task.status === status)}
                    updateTaskStatus={updateTaskStatus}
                />
            ))}
        </div>
    );
};

export default TaskBoard;
