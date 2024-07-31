import React from 'react';
import TaskColumn from './TaskColumn';
import styles from '../styles/TaskBoard.module.css';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import axios from 'axios';


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
    onTaskUpdated: () => void;
    fetchTasks: () => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks = [], onTaskMoved,  onTaskUpdated,fetchTasks  }) => {

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const task = tasks.find(task => task._id === draggableId);
        if (!task) return;


        try {
            await axios.put(`http://localhost:5000/api/tasks/${draggableId}`, {
                status: destination.droppableId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            fetchTasks();
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };
    const columns = [
        { title: 'To-Do', status: 'To-Do' },
        { title: 'In Progress', status: 'In Progress' },
        { title: 'Under Review', status: 'Under Review' },
        { title: 'Finished', status: 'Completed' },
    ];

    return (
        <DragDropContext onDragEnd={onDragEnd}>
      
          
            <div className={styles.taskBoard}>
                <TaskColumn title="To Do" status="To-Do" tasks={tasks.filter(task => task.status === 'To-Do')} fetchTasks={fetchTasks} />
                <TaskColumn title="In Progress" status="In Progress" tasks={tasks.filter(task => task.status === 'In Progress')} fetchTasks={fetchTasks} />
                <TaskColumn title="Under Review" status="Under Review" tasks={tasks.filter(task => task.status === 'Under Review')} fetchTasks={fetchTasks} />
                <TaskColumn title="Finished" status="Completed" tasks={tasks.filter(task => task.status === 'Completed')} fetchTasks={fetchTasks} />
          
      
        </div>
        </DragDropContext>
    );
};

export default TaskBoard;
