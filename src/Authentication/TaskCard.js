// client/src/components/TaskCard.js
import React from 'react';

const TaskCard = ({ task }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData('taskId', task._id);
    };

    return (
        <div
            className="task-card"
            draggable
            onDragStart={handleDragStart}
        >
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <p>Status: {task.status}</p>
            {task.priority && <p>Priority: {task.priority}</p>}
            {task.deadline && <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>}
        </div>
    );
};

export default TaskCard;
